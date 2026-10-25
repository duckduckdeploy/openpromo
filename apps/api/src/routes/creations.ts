import { checkCreation, imageDocument } from "@openpromo/render";
import { CREATION_TYPES, creationSpec, FORMAT_KEYS, IDEA_GOALS, type CreationType, type IdeaGoal, type MediaFormat } from "@openpromo/shared";
import { and, desc, eq, inArray } from "drizzle-orm";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { dataDb, schema } from "../db";
import { dispatch } from "../jobs/dispatch";
import { requireProject, requireUser } from "../lib/context";
import { badRequest, conflict, notFound, parse, uuidParam } from "../lib/errors";
import { getYep } from "../lib/yep";
import { writeCreation, writeIdeas, type AssetSummary } from "../services/writer";

type Project = typeof schema.projects.$inferSelect;

const TYPES = Object.keys(CREATION_TYPES) as [CreationType, ...CreationType[]];
const GOALS = Object.keys(IDEA_GOALS) as [IdeaGoal, ...IdeaGoal[]];
const FORMATS = FORMAT_KEYS as [MediaFormat, ...MediaFormat[]];

function readyBrand(project: Project) {
  if (!project.brand) throw conflict(project.brandStatus === "failed" ? `The website could not be read: ${project.brandError ?? "unknown error"}. Read it again first.` : "The brand profile is still being built. Try again in a minute.");
  return project.brand;
}

async function requireCreation(userId: string, creationId: string) {
  const [row] = await dataDb
    .select({ creation: schema.creations, project: schema.projects })
    .from(schema.creations)
    .innerJoin(schema.projects, eq(schema.projects.id, schema.creations.projectId))
    .where(eq(schema.creations.id, uuidParam(creationId, "Creation")))
    .limit(1);
  if (!row || row.project.userId !== userId) throw notFound("Creation");
  return row;
}

/** The pictures a writer may use: website screenshots, product photos, uploads, earlier generations. */
async function assetSummaries(projectId: string): Promise<AssetSummary[]> {
  const rows = await dataDb
    .select()
    .from(schema.assets)
    .where(and(eq(schema.assets.projectId, projectId), inArray(schema.assets.role, ["screenshot", "product", "photo", "background", "broll"])))
    .orderBy(desc(schema.assets.createdAt))
    .limit(40);
  return rows.map((a) => ({
    id: a.id,
    role: a.role,
    name: a.name,
    url: typeof a.meta.url === "string" ? a.meta.url : undefined,
    device: typeof a.meta.device === "string" ? a.meta.device : undefined,
    width: a.width,
    height: a.height,
  }));
}

/** The text of the pages the brand was read from, for grounding checks. */
async function pageTexts(projectId: string): Promise<string[]> {
  const rows = await dataDb.select({ markdown: schema.brandPages.markdown }).from(schema.brandPages).where(eq(schema.brandPages.projectId, projectId));
  return rows.map((r) => r.markdown);
}

export async function creationRoutes(app: FastifyInstance) {
  // ── Ideas ──────────────────────────────────────────────────────────────
  app.get<{ Params: { projectId: string } }>("/projects/:projectId/ideas", async (request) => {
    const user = await requireUser(request);
    const project = await requireProject(user.id, request.params.projectId);
    const rows = await dataDb.select().from(schema.ideas).where(eq(schema.ideas.projectId, project.id)).orderBy(desc(schema.ideas.createdAt)).limit(300);
    return { ok: true, data: rows };
  });

  app.post<{ Params: { projectId: string } }>("/projects/:projectId/ideas", async (request, reply) => {
    const user = await requireUser(request);
    const project = await requireProject(user.id, request.params.projectId);
    const brand = readyBrand(project);
    const input = parse(
      z.object({
        count: z.number().int().min(1).max(20).default(8),
        goal: z.enum(GOALS).optional(),
        channel: z.string().max(40).optional(),
        type: z.enum(TYPES).optional(),
        notes: z.string().max(2000).optional(),
      }),
      request.body ?? {},
    );
    const existing = await dataDb.select({ title: schema.ideas.title }).from(schema.ideas).where(eq(schema.ideas.projectId, project.id)).limit(60);
    const yep = await getYep({ userId: user.id, projectId: project.id, feature: "ideas" });
    const { ideas, costUsd } = await writeIdeas(yep, { brand, ...input, avoidTitles: existing.map((e) => e.title) });
    const rows = ideas.length
      ? await dataDb
          .insert(schema.ideas)
          .values(ideas.map((idea) => ({ projectId: project.id, goal: idea.goal, channel: idea.channel, type: idea.type, title: idea.title, hook: idea.hook, body: idea.body, caption: idea.caption, hashtags: idea.hashtags, cta: idea.cta, pointIds: idea.pointIds })))
          .returning()
      : [];
    return reply.status(201).send({ ok: true, data: rows, costUsd });
  });

  app.patch<{ Params: { ideaId: string } }>("/ideas/:ideaId", async (request) => {
    const user = await requireUser(request);
    const [row] = await dataDb.select({ idea: schema.ideas, userId: schema.projects.userId }).from(schema.ideas).innerJoin(schema.projects, eq(schema.projects.id, schema.ideas.projectId)).where(eq(schema.ideas.id, uuidParam(request.params.ideaId, "Idea")));
    if (!row || row.userId !== user.id) throw notFound("Idea");
    const input = parse(
      z.object({
        title: z.string().trim().min(1).max(200).optional(),
        hook: z.string().max(400).optional(),
        body: z.string().max(2000).optional(),
        caption: z.string().max(4000).optional(),
        hashtags: z.array(z.string().max(80)).max(30).optional(),
        status: z.enum(["new", "used", "archived"]).optional(),
        plannedFor: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
      }),
      request.body,
    );
    const [updated] = await dataDb.update(schema.ideas).set(input).where(eq(schema.ideas.id, row.idea.id)).returning();
    return { ok: true, data: updated };
  });

  app.delete<{ Params: { ideaId: string } }>("/ideas/:ideaId", async (request) => {
    const user = await requireUser(request);
    const [row] = await dataDb.select({ id: schema.ideas.id, userId: schema.projects.userId }).from(schema.ideas).innerJoin(schema.projects, eq(schema.projects.id, schema.ideas.projectId)).where(eq(schema.ideas.id, uuidParam(request.params.ideaId, "Idea")));
    if (!row || row.userId !== user.id) throw notFound("Idea");
    await dataDb.delete(schema.ideas).where(eq(schema.ideas.id, row.id));
    return { ok: true };
  });

  // ── Creations ──────────────────────────────────────────────────────────
  app.get<{ Params: { projectId: string } }>("/projects/:projectId/creations", async (request) => {
    const user = await requireUser(request);
    const project = await requireProject(user.id, request.params.projectId);
    const { type } = parse(z.object({ type: z.enum(TYPES).optional() }), request.query);
    const rows = await dataDb
      .select()
      .from(schema.creations)
      .where(and(eq(schema.creations.projectId, project.id), type ? eq(schema.creations.type, type) : undefined))
      .orderBy(desc(schema.creations.updatedAt))
      .limit(200);
    const renders = rows.length
      ? await dataDb.select().from(schema.renders).where(inArray(schema.renders.creationId, rows.map((r) => r.id))).orderBy(desc(schema.renders.createdAt))
      : [];
    return {
      ok: true,
      data: rows.map((row) => {
        const latest = renders.find((r) => r.creationId === row.id);
        return { ...row, latestRender: latest ? { id: latest.id, status: latest.status, progress: latest.progress, posterAssetId: latest.posterAssetId, outputAssetIds: latest.outputAssetIds, format: latest.format } : null };
      }),
    };
  });

  // Writes a new creation from an idea or a brief. Takes 10–30 seconds (one writing call).
  app.post<{ Params: { projectId: string } }>("/projects/:projectId/creations", async (request, reply) => {
    const user = await requireUser(request);
    const project = await requireProject(user.id, request.params.projectId);
    const brand = readyBrand(project);
    const input = parse(
      z.object({
        type: z.enum(TYPES),
        format: z.enum(FORMATS).optional(),
        ideaId: z.string().uuid().optional(),
        brief: z.string().max(4000).optional(),
        voice: z.boolean().default(true),
        allowGenerated: z.boolean().default(true),
      }),
      request.body,
    );
    const formats = CREATION_TYPES[input.type].formats as readonly MediaFormat[];
    const format = input.format ?? formats[0]!;
    if (!formats.includes(format)) throw badRequest(`A ${CREATION_TYPES[input.type].label.toLowerCase()} can be ${formats.join(", ")}.`);
    let brief = input.brief?.trim() ?? "";
    let idea: typeof schema.ideas.$inferSelect | undefined;
    if (input.ideaId) {
      [idea] = await dataDb.select().from(schema.ideas).where(and(eq(schema.ideas.id, input.ideaId), eq(schema.ideas.projectId, project.id)));
      if (!idea) throw notFound("Idea");
      brief = `${idea.title}. Hook: ${idea.hook}. ${idea.body} CTA: ${idea.cta ?? ""}. Selling points: ${idea.pointIds.join(", ")}. ${brief}`;
    }
    if (!brief) throw badRequest("Give a brief or pick an idea.");

    const yep = await getYep({ userId: user.id, projectId: project.id, feature: `write.${input.type}` });
    const written = await writeCreation(yep, { brand, type: input.type, format, assets: await assetSummaries(project.id), brief, voice: input.voice, allowGenerated: input.allowGenerated });
    const checks = checkCreation({ type: input.type, spec: written.spec, brand, pages: await pageTexts(project.id) });
    const caption = idea && !written.caption.trim() ? `${idea.caption}\n\n${idea.hashtags.map((h) => `#${h}`).join(" ")}` : written.caption;
    const [creation] = await dataDb
      .insert(schema.creations)
      .values({ projectId: project.id, ideaId: idea?.id ?? null, type: input.type, title: written.title, format, spec: written.spec, checks, caption, status: "ready" })
      .returning();
    if (idea) await dataDb.update(schema.ideas).set({ status: "used" }).where(eq(schema.ideas.id, idea.id));
    return reply.status(201).send({ ok: true, data: creation, costUsd: written.costUsd });
  });

  app.get<{ Params: { creationId: string } }>("/creations/:creationId", async (request) => {
    const user = await requireUser(request);
    const { creation } = await requireCreation(user.id, request.params.creationId);
    const renders = await dataDb.select().from(schema.renders).where(eq(schema.renders.creationId, creation.id)).orderBy(desc(schema.renders.createdAt)).limit(20);
    return { ok: true, data: { ...creation, renders } };
  });

  // Saves edits (text, layouts, pictures, timing, audio). The checks run again on every save.
  app.put<{ Params: { creationId: string } }>("/creations/:creationId", async (request) => {
    const user = await requireUser(request);
    const { creation, project } = await requireCreation(user.id, request.params.creationId);
    const input = parse(
      z.object({ spec: creationSpec.optional(), title: z.string().trim().min(1).max(200).optional(), caption: z.string().max(5000).optional(), format: z.enum(FORMATS).optional() }),
      request.body,
    );
    if (input.format && !(CREATION_TYPES[creation.type].formats as readonly string[]).includes(input.format)) throw badRequest(`This ${creation.type} cannot be ${input.format}.`);
    if (creation.status === "rendering") throw conflict("Wait for the render to finish before editing.");
    const spec = input.spec ?? creation.spec;
    if (creation.type === "image" && spec.scenes.length > 1) throw badRequest("An image has one scene.");
    const checks = project.brand ? checkCreation({ type: creation.type, spec, brand: project.brand, pages: await pageTexts(project.id) }) : creation.checks;
    const [updated] = await dataDb
      .update(schema.creations)
      .set({ ...input, spec, checks, status: creation.status === "failed" || creation.status === "done" ? "ready" : creation.status })
      .where(eq(schema.creations.id, creation.id))
      .returning();
    return { ok: true, data: updated };
  });

  app.delete<{ Params: { creationId: string } }>("/creations/:creationId", async (request) => {
    const user = await requireUser(request);
    const { creation } = await requireCreation(user.id, request.params.creationId);
    await dataDb.delete(schema.creations).where(eq(schema.creations.id, creation.id));
    return { ok: true };
  });

  // A live preview of one scene as HTML, for the editor (no render, nothing spent). Assets load from the API.
  app.get<{ Params: { creationId: string } }>("/creations/:creationId/preview", async (request, reply) => {
    const user = await requireUser(request);
    const { creation, project } = await requireCreation(user.id, request.params.creationId);
    const query = parse(z.object({ scene: z.coerce.number().int().min(0).default(0), format: z.enum(FORMATS).optional() }), request.query);
    const brand = readyBrand(project);
    const ids = new Set<string>();
    if (brand.visual.logoAssetId) ids.add(brand.visual.logoAssetId);
    for (const s of creation.spec.scenes) for (const ref of [s.media, s.background]) if (ref?.assetId) ids.add(ref.assetId);
    const rows = ids.size ? await dataDb.select({ id: schema.assets.id, kind: schema.assets.kind }).from(schema.assets).where(and(eq(schema.assets.projectId, project.id), inArray(schema.assets.id, [...ids]))) : [];
    const files = Object.fromEntries(rows.map((r) => [r.id, { path: `/api/assets/${r.id}/file`, video: r.kind === "video" }]));
    const html = imageDocument({ brand, spec: creation.spec, format: query.format ?? creation.format, assets: { files } }, query.scene);
    // The preview runs no script of ours beyond the text fit; it must never reach other origins.
    reply.header("content-security-policy", "default-src 'none'; img-src 'self' data:; media-src 'self'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'unsafe-inline'; frame-ancestors 'self'");
    return reply.type("text/html; charset=utf-8").send(html);
  });

  // ── Renders ────────────────────────────────────────────────────────────
  app.post<{ Params: { creationId: string } }>("/creations/:creationId/renders", async (request, reply) => {
    const user = await requireUser(request);
    const { creation, project } = await requireCreation(user.id, request.params.creationId);
    readyBrand(project);
    const input = parse(z.object({ format: z.enum(FORMATS).optional(), quality: z.enum(["draft", "final"]).default("final") }), request.body ?? {});
    const format = input.format ?? creation.format;
    if (!(CREATION_TYPES[creation.type].formats as readonly string[]).includes(format)) throw badRequest(`This ${creation.type} cannot be ${format}.`);
    const errors = creation.checks.filter((c) => c.level === "error");
    if (errors.length) throw badRequest(`Fix these first: ${errors.map((e) => e.message).join(" ")}`, { checks: errors });
    const [active] = await dataDb.select({ id: schema.renders.id }).from(schema.renders).where(and(eq(schema.renders.creationId, creation.id), inArray(schema.renders.status, ["queued", "running"]))).limit(1);
    if (active) throw conflict("This creation is already rendering.");
    // Spend happens in the job; a key is needed before queuing anything.
    await getYep({ userId: user.id, projectId: project.id, feature: "render", freeOnly: true });
    const [render] = await dataDb.insert(schema.renders).values({ projectId: project.id, creationId: creation.id, format, quality: input.quality }).returning();
    await dataDb.update(schema.creations).set({ status: "rendering", error: null }).where(eq(schema.creations.id, creation.id));
    await dispatch("render.run", { renderId: render!.id }, async (message) => {
      await dataDb.update(schema.renders).set({ status: "failed", error: message }).where(eq(schema.renders.id, render!.id));
      await dataDb.update(schema.creations).set({ status: "failed", error: message }).where(eq(schema.creations.id, creation.id));
    });
    return reply.status(202).send({ ok: true, data: render });
  });

  app.get<{ Params: { renderId: string } }>("/renders/:renderId", async (request) => {
    const user = await requireUser(request);
    const [row] = await dataDb.select({ render: schema.renders, userId: schema.projects.userId }).from(schema.renders).innerJoin(schema.projects, eq(schema.projects.id, schema.renders.projectId)).where(eq(schema.renders.id, uuidParam(request.params.renderId, "Render")));
    if (!row || row.userId !== user.id) throw notFound("Render");
    return { ok: true, data: row.render };
  });
}
