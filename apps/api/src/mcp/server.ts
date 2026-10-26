import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { resolveUser } from "../lib/context";
import { issuer, SCOPE } from "../services/oauth";

type Json = Record<string, unknown>;
type Shape = Record<string, z.ZodType>;
type ToolResult = { content: { type: "text"; text: string }[]; isError?: boolean };

const MAX_RESULT_CHARS = 120_000;

const projectId = z.string().uuid().optional().describe("Project ID from list_projects. Optional when the account has exactly one project.");

const text = (value: unknown): ToolResult => {
  let body = typeof value === "string" ? value : JSON.stringify(value, null, 1);
  if (body.length > MAX_RESULT_CHARS) body = `${body.slice(0, MAX_RESULT_CHARS)}
… truncated.`;
  return { content: [{ type: "text", text: body }] };
};

const rows = (value: unknown) => (Array.isArray(value) ? (value as Json[]) : []);
const pick = (row: Json, keys: string[]) => Object.fromEntries(keys.filter((key) => row[key] != null && row[key] !== "").map((key) => [key, row[key]]));

const withoutUserIds = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(withoutUserIds)
    : value && typeof value === "object"
      ? Object.fromEntries(Object.entries(value as Json).filter(([key]) => key !== "userId").map(([key, inner]) => [key, withoutUserIds(inner)]))
      : value;
const fail = (message: string): ToolResult => ({ content: [{ type: "text", text: message }], isError: true });

/**
 * MCP tools are thin wrappers over the REST API: each one calls a route in-process with the
 * caller's own API key, so agents and the web app share validation, pricing and limits.
 */
function buildServer(app: FastifyInstance, authorization: string): McpServer {
  const server = new McpServer(
    { name: "openpromo", version: "0.1.0" },
    {
      instructions:
        "OpenPromo makes on-brand promo media (social images, carousels, reels, promo and tutorial videos) for the user's businesses. Each project is a website with a brand profile that every tool builds from. Paid tools spend the user's own YepAPI credits: state the price before you run them. Start with list_projects, then read the brand with get_brand.",
    },
  );

  async function rest(method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", url: string, body?: unknown): Promise<unknown> {
    const response = await app.inject({ method, url: `/api${url}`, headers: { authorization }, payload: body === undefined ? undefined : (body as Json) });
    const json = response.json() as { ok?: boolean; data?: unknown; error?: { message?: string } };
    if (response.statusCode >= 400 || json.ok === false) throw new Error(json.error?.message ?? `Request failed (${response.statusCode})`);
    return json.data ?? json;
  }

  async function resolveProject(id: string | undefined): Promise<string> {
    if (id) return id;
    const projects = (await rest("GET", "/projects")) as { id: string }[];
    if (projects.length === 1 && projects[0]) return projects[0].id;
    throw new Error(projects.length ? "This account has several projects. Pass project_id (see list_projects)." : "No projects yet. Create one with create_project.");
  }

  function tool<S extends Shape>(name: string, description: string, shape: S, handler: (args: z.infer<z.ZodObject<S>>) => Promise<unknown>, readOnly = false) {
    server.registerTool(name, { description, inputSchema: shape, annotations: { readOnlyHint: readOnly } }, (async (args: unknown) => {
      try {
        return text(withoutUserIds(await handler(args as z.infer<z.ZodObject<S>>)));
      } catch (error) {
        return fail(error instanceof Error ? error.message : "Tool failed");
      }
    }) as never);
  }

  // ── Account ─────────────────────────────────────────────────────────────
  tool("whoami", "The signed-in user and whether a YepAPI key is connected. Free.", {}, () => rest("GET", "/me"), true);
  tool("get_balance", "Remaining YepAPI balance, and this month's spend and limit. Free.", {}, () => rest("GET", "/balance"), true);
  tool(
    "get_usage",
    "What OpenPromo has spent with the user's YepAPI key this month, by feature and by day, with the 10 latest calls. Free.",
    {},
    async () => {
      const usage = (await rest("GET", "/usage")) as Json;
      return { ...usage, recent: rows(usage.recent).slice(0, 10).map((call) => pick(call, ["endpoint", "feature", "ok", "status", "costUsd", "createdAt"])) };
    },
    true,
  );

  // ── Projects and brand ──────────────────────────────────────────────────
  tool("list_projects", "The user's projects: one per website, with whether its brand profile is ready. Free.", {}, () => rest("GET", "/projects"), true);
  tool(
    "create_project",
    "Add a website as a project. OpenPromo reads the site in the background (about a minute, roughly $0.10 of YepAPI credit) and builds the brand profile every tool uses. Poll get_brand until status is ready.",
    { url: z.string().min(3).describe("The website, e.g. acme.com"), name: z.string().max(120).optional() },
    (a) => rest("POST", "/projects", { url: a.url, name: a.name }),
  );
  tool(
    "get_brand",
    "A project's brand profile: identity, audience, selling points (each with the quote and page it came from), voice, colours, fonts, products and getting-started flows. Also the read status. Free.",
    { project_id: projectId },
    async (a) => {
      const project = (await rest("GET", `/projects/${await resolveProject(a.project_id)}`)) as Json;
      return pick(project, ["id", "name", "url", "brandStatus", "brandError", "brandProgress", "brandUpdatedAt", "brand", "context"]);
    },
    true,
  );
  tool(
    "update_brand",
    "Replace the brand profile with an edited copy. Read it with get_brand first and send the whole brand object back with your changes. Edited fields are kept when the site is read again. Free.",
    { project_id: projectId, brand: z.record(z.string(), z.unknown()) },
    async (a) => rest("PUT", `/projects/${await resolveProject(a.project_id)}/brand`, { brand: a.brand }),
  );
  tool(
    "refresh_brand",
    "Read the website again and rebuild the brand profile (about $0.10). Fields edited by hand are kept unless reset is true.",
    { project_id: projectId, reset: z.boolean().optional() },
    async (a) => rest("POST", `/projects/${await resolveProject(a.project_id)}/brand/refresh`, { reset: a.reset ?? false }),
  );
  tool(
    "update_project_context",
    "Replace the project's shared notes for agents (campaigns, goals, things to avoid). Read them with get_brand first and send back the full object. Free.",
    { project_id: projectId, context: z.record(z.string(), z.unknown()) },
    async (a) => rest("PATCH", `/projects/${await resolveProject(a.project_id)}`, { context: a.context }),
  );

  // ── Ideas ───────────────────────────────────────────────────────────────
  const TYPES = ["image", "carousel", "reel", "promo", "tutorial"] as const;
  const FORMATS = ["square", "portrait", "story", "landscape", "link", "x_header", "linkedin_banner"] as const;
  tool(
    "list_ideas",
    "Post ideas saved for a project, newest first, with hook, caption and hashtags. Free.",
    { project_id: projectId },
    async (a) =>
      rows(await rest("GET", `/projects/${await resolveProject(a.project_id)}/ideas`)).map((i) =>
        pick(i, ["id", "type", "channel", "goal", "title", "hook", "caption", "hashtags", "cta", "pointIds", "status"]),
      ),
    true,
  );
  tool(
    "generate_ideas",
    "Write new post ideas from the brand profile (one writing call, about $0.02–0.06). Each idea says which format suits it and which selling points it uses.",
    {
      project_id: projectId,
      count: z.number().int().min(1).max(20).optional(),
      goal: z.enum(["launch", "promo", "education", "proof", "feature", "story"]).optional(),
      channel: z.enum(["instagram", "tiktok", "youtube", "linkedin", "facebook", "x"]).optional(),
      type: z.enum(TYPES).optional(),
      notes: z.string().max(2000).optional().describe("Anything to steer the ideas: a campaign, a season, a product"),
    },
    async (a) => {
      const { project_id, ...body } = a;
      return rows(await rest("POST", `/projects/${await resolveProject(project_id)}/ideas`, body)).map((i) => pick(i, ["id", "type", "channel", "title", "hook", "caption", "hashtags"]));
    },
  );

  // ── Creations and renders ───────────────────────────────────────────────
  tool(
    "list_creations",
    "Images, carousels, reels, promo videos and tutorials in a project, with their status and latest render. Free.",
    { project_id: projectId, type: z.enum(TYPES).optional() },
    async (a) =>
      rows(await rest("GET", `/projects/${await resolveProject(a.project_id)}/creations`))
        .filter((c) => !a.type || c.type === a.type)
        .map((c) => ({ ...pick(c, ["id", "type", "title", "format", "status", "updatedAt"]), latestRender: c.latestRender })),
    true,
  );
  tool(
    "list_templates",
    "The template gallery: styles for images, carousels, reels, promo videos and tutorials (UGC reviews, mascots, comics, cinematic product films, motion type, screen demos), each with what it is, when to use it, its beats, typical price and an example. Pick one before create_creation. Free.",
    { type: z.enum(TYPES).optional() },
    async (a) => {
      const data = (await rest("GET", "/templates")) as { templates: Array<Record<string, unknown> & { type: string; previews?: Array<{ poster: string; video?: string }> }> };
      return data.templates
        .filter((t) => !a.type || t.type === a.type)
        .map((t) => ({ ...pick(t, ["id", "type", "group", "recipe", "name", "summary", "when", "bestFor", "duration", "formats", "estimateUsd"]), beats: (t.beats as Array<{ role: string }>).map((b) => b.role), example: t.previews?.[0]?.video ?? t.previews?.[0]?.poster ?? null }));
    },
    true,
  );
  tool(
    "create_creation",
    "Write a new image, carousel, reel, promo video or tutorial from a template, an idea or a brief (one writing call, about $0.03–0.10; nothing is rendered yet). Returns the scenes, the checks and the id to render.",
    {
      project_id: projectId,
      type: z.enum(TYPES),
      format: z.enum(FORMATS).optional().describe("Size. Default: square for images and carousels, story for reels, landscape for videos"),
      template_id: z.string().max(60).optional().describe("A template id from list_templates; its type must match"),
      idea_id: z.string().uuid().optional(),
      brief: z.string().max(4000).optional().describe("What it should say, when not made from an idea. With a template it is optional: an angle, product or offer"),
      voice: z.boolean().optional().describe("Videos: add a voiceover (default true)"),
      allow_generated: z.boolean().optional().describe("Let the writer ask for AI pictures where the brand's own photos and screenshots do not fit (they cost credits when rendered)"),
    },
    async (a) =>
      rest("POST", `/projects/${await resolveProject(a.project_id)}/creations`, {
        type: a.type,
        format: a.format,
        ideaId: a.idea_id,
        brief: a.brief,
        voice: a.voice,
        allowGenerated: a.allow_generated,
        templateId: a.template_id,
      }),
  );
  tool("get_creation", "A creation's scenes, post caption, checks and renders. Free.", { creation_id: z.string().uuid() }, (a) => rest("GET", `/creations/${a.creation_id}`), true);
  tool(
    "update_creation",
    "Save edits to a creation: the full spec (scenes with layout, text, media, narration, duration; style; audio; captions), its title or post caption. Read it with get_creation first and send back the whole spec. The checks run again. Free.",
    { creation_id: z.string().uuid(), spec: z.record(z.string(), z.unknown()).optional(), title: z.string().max(200).optional(), caption: z.string().max(5000).optional() },
    (a) => rest("PUT", `/creations/${a.creation_id}`, { spec: a.spec, title: a.title, caption: a.caption }),
  );
  tool(
    "chat_edit_creation",
    "Change a creation in plain words (\"make the colours blue\", \"the owl should wear glasses\", \"shorter voiceover\"). The edits are applied and saved; only the pictures and clips they touch are made again on the next render. About $0.01. Returns the reply, the changes and the likely price of the next render.",
    { creation_id: z.string().uuid(), message: z.string().min(1).max(2000) },
    (a) => rest("POST", `/creations/${a.creation_id}/chat`, { message: a.message }),
  );
  tool(
    "render_creation",
    "Render a creation to files. Images and carousels cost nothing unless scenes ask for AI pictures ($0.04–0.20 each). Videos: voiceover about $0.01 a scene, music $0.08, AI pictures as above, AI clips about $0.11 a second. Generated pieces are kept, so rendering again costs nothing more. Runs in the background: poll get_render.",
    { creation_id: z.string().uuid(), format: z.enum(FORMATS).optional().describe("Render another size of the same creation"), quality: z.enum(["draft", "final"]).optional() },
    (a) => rest("POST", `/creations/${a.creation_id}/renders`, { format: a.format, quality: a.quality }),
  );
  tool(
    "get_render",
    "A render's status and progress; when done, its output, thumbnail and caption file ids. Files download from /api/assets/{id}/file with the same API key. Free.",
    { render_id: z.string().uuid() },
    (a) => rest("GET", `/renders/${a.render_id}`),
    true,
  );
  tool(
    "list_assets",
    "Files in a project's library: website screenshots, logo, product photos, uploads, AI pictures, voice, music and finished media. Use an asset's id in a scene's media or background. Free.",
    { project_id: projectId, role: z.string().optional().describe("Comma-separated roles: screenshot, logo, product, photo, background, broll, voice, music, output, poster, captions") },
    async (a) =>
      rows(await rest("GET", `/projects/${await resolveProject(a.project_id)}/assets${a.role ? `?role=${encodeURIComponent(a.role)}` : ""}`)).map((x) =>
        pick(x, ["id", "role", "kind", "source", "name", "mime", "width", "height", "durationMs", "createdAt"]),
      ),
    true,
  );

  return server;
}

export async function registerMcp(app: FastifyInstance) {
  app.route({
    method: ["POST", "GET", "DELETE"],
    url: "/mcp",
    async handler(request, reply) {
      if (request.method !== "POST") {
        return reply.status(405).header("allow", "POST").send({ jsonrpc: "2.0", error: { code: -32000, message: "Method not allowed. This server is stateless; use POST." }, id: null });
      }
      const user = await resolveUser(request);
      if (!user || user.via === "session") {
        const metadata = `${issuer()}/.well-known/oauth-protected-resource`;
        return reply
          .status(401)
          .header("www-authenticate", `Bearer realm="OpenPromo", resource_metadata="${metadata}", scope="${SCOPE}"`)
          .send({ jsonrpc: "2.0", error: { code: -32001, message: "Sign in with OAuth, or send an OpenPromo API key: Authorization: Bearer opro_… (create one in Settings)." }, id: null });
      }
      const server = buildServer(app, request.headers.authorization as string);
      const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
      reply.hijack();
      reply.raw.on("close", () => {
        void transport.close();
        void server.close();
      });
      await server.connect(transport);
      await transport.handleRequest(request.raw, reply.raw, request.body);
    },
  });
}
