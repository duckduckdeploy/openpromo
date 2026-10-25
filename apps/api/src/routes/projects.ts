import { brandProfile, type BrandProfile } from "@openpromo/shared";
import { and, asc, desc, eq } from "drizzle-orm";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { dataDb, db, schema } from "../db";
import { dispatch } from "../jobs/dispatch";
import { requireProject, requireUser } from "../lib/context";
import { AppError, badRequest, conflict, parse } from "../lib/errors";
import { deleteProjectFiles } from "../lib/media-store";
import { ingestGuardOptions } from "../lib/ingest-guard";
import { assertSafeUrl, SsrfError } from "../lib/ssrf";
import { withScheme } from "../lib/url";

/** A website address as typed ("acme.com", "https://www.acme.com/en") to a URL and its domain. */
async function websiteOf(input: string): Promise<{ url: string; domain: string }> {
  let url: URL;
  try {
    url = new URL(withScheme(input.trim()));
  } catch {
    throw badRequest("That does not look like a website address.");
  }
  url.hash = "";
  try {
    await assertSafeUrl(url.href, ingestGuardOptions());
  } catch (error) {
    if (error instanceof SsrfError) throw badRequest("Use a public website address (http or https).");
    throw badRequest(`Could not find ${url.hostname}. Check the address.`);
  }
  return { url: url.href, domain: url.hostname.replace(/^www\./, "") };
}

/** Section.field paths that differ between two profiles: what the user changed by hand. */
export function editedPaths(before: BrandProfile, after: BrandProfile): string[] {
  const paths: string[] = [];
  for (const section of ["identity", "audience", "positioning", "voice", "visual"] as const) {
    const a = before[section] as Record<string, unknown>;
    const b = after[section] as Record<string, unknown>;
    for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) paths.push(`${section}.${key}`);
    }
  }
  for (const section of ["products", "flows"] as const) {
    if (JSON.stringify(before[section]) !== JSON.stringify(after[section])) paths.push(section);
  }
  return paths;
}

/** Reading the site spends from the user's key straight away, so a project needs one first. */
async function requireYepKey(userId: string) {
  const [settings] = await db.select({ key: schema.userSettings.yepapiKeyEnc }).from(schema.userSettings).where(eq(schema.userSettings.userId, userId)).limit(1);
  if (!settings?.key) throw new AppError(400, "yepapi_key_missing", "Add your YepAPI key in Settings before adding a website.");
}

async function startIngest(projectId: string) {
  await dataDb
    .update(schema.projects)
    .set({ brandStatus: "ingesting", brandError: null, brandProgress: { step: "Queued", percent: 0 } })
    .where(eq(schema.projects.id, projectId));
  await dispatch("brand.ingest", { projectId }, (message) =>
    dataDb.update(schema.projects).set({ brandStatus: "failed", brandError: message, brandProgress: null }).where(eq(schema.projects.id, projectId)),
  );
}

export async function projectRoutes(app: FastifyInstance) {
  app.get("/projects", async (request) => {
    const user = await requireUser(request);
    const rows = await dataDb
      .select({
        id: schema.projects.id,
        name: schema.projects.name,
        url: schema.projects.url,
        domain: schema.projects.domain,
        brandStatus: schema.projects.brandStatus,
        brand: schema.projects.brand,
        createdAt: schema.projects.createdAt,
      })
      .from(schema.projects)
      .where(eq(schema.projects.userId, user.id))
      .orderBy(desc(schema.projects.createdAt));
    // The list needs only enough of the brand to draw a card.
    return {
      ok: true,
      data: rows.map(({ brand, ...row }) => ({
        ...row,
        tagline: brand?.identity.tagline ?? null,
        colors: brand ? { primary: brand.visual.colors.primary, background: brand.visual.colors.background, text: brand.visual.colors.text } : null,
        logoAssetId: brand?.visual.logoAssetId ?? null,
      })),
    };
  });

  // A project is a website: creating one starts reading it straight away.
  app.post("/projects", async (request, reply) => {
    const user = await requireUser(request);
    const input = parse(z.object({ url: z.string().trim().min(3).max(2000), name: z.string().trim().max(120).optional() }), request.body);
    await requireYepKey(user.id);
    const { url, domain } = await websiteOf(input.url);
    const [project] = await dataDb
      .insert(schema.projects)
      .values({ userId: user.id, name: input.name || domain, url, domain })
      .returning();
    await startIngest(project!.id);
    return reply.status(201).send({ ok: true, data: { ...project!, brandStatus: "ingesting" } });
  });

  app.get<{ Params: { projectId: string } }>("/projects/:projectId", async (request) => {
    const user = await requireUser(request);
    return { ok: true, data: await requireProject(user.id, request.params.projectId) };
  });

  app.patch<{ Params: { projectId: string } }>("/projects/:projectId", async (request) => {
    const user = await requireUser(request);
    const project = await requireProject(user.id, request.params.projectId);
    const input = parse(
      z.object({ name: z.string().trim().min(1).max(120).optional(), context: z.record(z.string(), z.unknown()).optional() }),
      request.body,
    );
    const [updated] = await dataDb.update(schema.projects).set(input).where(eq(schema.projects.id, project.id)).returning();
    return { ok: true, data: updated };
  });

  // Saves the user's edits to the brand profile. Changed fields are remembered, so reading the
  // website again later does not overwrite them.
  app.put<{ Params: { projectId: string } }>("/projects/:projectId/brand", async (request) => {
    const user = await requireUser(request);
    const project = await requireProject(user.id, request.params.projectId);
    if (!project.brand) throw conflict("The brand profile is not ready yet.");
    const { brand } = parse(z.object({ brand: brandProfile }), request.body);
    const edited = [...new Set([...project.brand.edited, ...brand.edited, ...editedPaths(project.brand, brand)])];
    const next = { ...brand, edited };
    const [updated] = await dataDb.update(schema.projects).set({ brand: next }).where(eq(schema.projects.id, project.id)).returning();
    return { ok: true, data: updated };
  });

  // Reads the website again. `reset: true` also forgets manual edits.
  app.post<{ Params: { projectId: string } }>("/projects/:projectId/brand/refresh", async (request) => {
    const user = await requireUser(request);
    const project = await requireProject(user.id, request.params.projectId);
    const { reset } = parse(z.object({ reset: z.boolean().default(false) }), request.body ?? {});
    if (project.brandStatus === "ingesting") throw conflict("The website is already being read.");
    if (reset && project.brand) {
      await dataDb.update(schema.projects).set({ brand: { ...project.brand, edited: [] } }).where(eq(schema.projects.id, project.id));
    }
    await startIngest(project.id);
    return { ok: true, data: { brandStatus: "ingesting" } };
  });

  // The pages the profile was built from, for checking where a claim came from.
  app.get<{ Params: { projectId: string } }>("/projects/:projectId/pages", async (request) => {
    const user = await requireUser(request);
    const project = await requireProject(user.id, request.params.projectId);
    const rows = await dataDb
      .select()
      .from(schema.brandPages)
      .where(eq(schema.brandPages.projectId, project.id))
      .orderBy(asc(schema.brandPages.fetchedAt));
    return { ok: true, data: rows };
  });

  app.delete<{ Params: { projectId: string } }>("/projects/:projectId", async (request) => {
    const user = await requireUser(request);
    const project = await requireProject(user.id, request.params.projectId);
    await dataDb.delete(schema.projects).where(and(eq(schema.projects.id, project.id), eq(schema.projects.userId, user.id)));
    await deleteProjectFiles(project.id);
    return { ok: true };
  });
}
