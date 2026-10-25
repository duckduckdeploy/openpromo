import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import multipart from "@fastify/multipart";
import { and, desc, eq, inArray } from "drizzle-orm";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { dataDb, schema } from "../db";
import type { AssetRole } from "../db/data-schema";
import { requireProject, requireUser } from "../lib/context";
import { badRequest, notFound, parse, uuidParam } from "../lib/errors";
import { absolutePath, deleteAsset, saveAsset } from "../lib/media-store";

const UPLOAD_ROLES = ["logo", "product", "photo", "screenshot", "background", "broll", "music", "voice"] as const satisfies readonly AssetRole[];
const UPLOAD_TYPES = /^(image\/(png|jpeg|webp|svg\+xml|gif)|video\/(mp4|webm)|audio\/(mpeg|wav|mp4))$/;
const MAX_UPLOAD = 200 * 1024 * 1024;

async function requireAsset(userId: string, assetId: string) {
  const [asset] = await dataDb
    .select({ asset: schema.assets, userId: schema.projects.userId })
    .from(schema.assets)
    .innerJoin(schema.projects, eq(schema.projects.id, schema.assets.projectId))
    .where(eq(schema.assets.id, uuidParam(assetId, "Asset")))
    .limit(1);
  if (!asset || asset.userId !== userId) throw notFound("Asset");
  return asset.asset;
}

export async function assetRoutes(app: FastifyInstance) {
  await app.register(multipart, { limits: { fileSize: MAX_UPLOAD, files: 1 } });

  app.get<{ Params: { projectId: string } }>("/projects/:projectId/assets", async (request) => {
    const user = await requireUser(request);
    const project = await requireProject(user.id, request.params.projectId);
    const query = parse(
      z.object({ role: z.string().optional(), creationId: z.string().uuid().optional(), limit: z.coerce.number().int().min(1).max(500).default(200) }),
      request.query,
    );
    const roles = query.role?.split(",").filter(Boolean);
    const rows = await dataDb
      .select()
      .from(schema.assets)
      .where(
        and(
          eq(schema.assets.projectId, project.id),
          roles?.length ? inArray(schema.assets.role, roles as AssetRole[]) : undefined,
          query.creationId ? eq(schema.assets.creationId, query.creationId) : undefined,
        ),
      )
      .orderBy(desc(schema.assets.createdAt))
      .limit(query.limit);
    return { ok: true, data: rows };
  });

  // The file itself. Range requests are answered so videos can seek in the browser.
  app.get<{ Params: { assetId: string } }>("/assets/:assetId/file", async (request, reply) => {
    const user = await requireUser(request);
    const asset = await requireAsset(user.id, request.params.assetId);
    const file = absolutePath(asset.path);
    const size = (await stat(file).catch(() => null))?.size;
    if (size == null) throw notFound("File");
    const download = (request.query as { download?: string }).download === "1";
    reply.header("content-type", asset.mime);
    reply.header("accept-ranges", "bytes");
    // Files never change once written: a new version is a new asset.
    reply.header("cache-control", "private, max-age=31536000, immutable");
    if (asset.mime === "image/svg+xml") reply.header("content-security-policy", "default-src 'none'; style-src 'unsafe-inline'; sandbox");
    if (download) reply.header("content-disposition", `attachment; filename="${asset.name.replace(/[^\w.\- ]+/g, "_")}.${asset.path.split(".").pop()}"`);
    const range = request.headers.range?.match(/^bytes=(\d*)-(\d*)$/);
    if (range && (range[1] || range[2])) {
      const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
      const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
      if (start >= size || start > end) return reply.status(416).header("content-range", `bytes */${size}`).send();
      reply.status(206).header("content-range", `bytes ${start}-${end}/${size}`).header("content-length", end - start + 1);
      return reply.send(createReadStream(file, { start, end }));
    }
    reply.header("content-length", size);
    return reply.send(createReadStream(file));
  });

  // Upload a logo, product photo, clip or track of your own: multipart, one "file" field.
  app.post<{ Params: { projectId: string } }>("/projects/:projectId/assets", async (request, reply) => {
    const user = await requireUser(request);
    const project = await requireProject(user.id, request.params.projectId);
    const part = await request.file();
    if (!part) throw badRequest("Send the file as multipart form data in a field named file.");
    const role = (part.fields.role as { value?: string } | undefined)?.value ?? "photo";
    if (!(UPLOAD_ROLES as readonly string[]).includes(role)) throw badRequest(`role must be one of ${UPLOAD_ROLES.join(", ")}`);
    if (!UPLOAD_TYPES.test(part.mimetype)) throw badRequest("Upload PNG, JPEG, WebP, SVG or GIF images, MP4 or WebM video, or MP3, WAV or M4A audio.");
    const bytes = await part.toBuffer();
    const asset = await saveAsset({
      projectId: project.id,
      source: "upload",
      role: role as AssetRole,
      name: part.filename.replace(/\.[a-z0-9]+$/i, "").slice(0, 120) || "Upload",
      bytes,
      mime: part.mimetype,
    });
    return reply.status(201).send({ ok: true, data: asset });
  });

  app.patch<{ Params: { assetId: string } }>("/assets/:assetId", async (request) => {
    const user = await requireUser(request);
    const asset = await requireAsset(user.id, request.params.assetId);
    const input = parse(z.object({ name: z.string().trim().min(1).max(200).optional(), role: z.enum(UPLOAD_ROLES).optional() }), request.body);
    const [updated] = await dataDb.update(schema.assets).set(input).where(eq(schema.assets.id, asset.id)).returning();
    return { ok: true, data: updated };
  });

  app.delete<{ Params: { assetId: string } }>("/assets/:assetId", async (request) => {
    const user = await requireUser(request);
    const asset = await requireAsset(user.id, request.params.assetId);
    await deleteAsset(asset);
    return { ok: true };
  });
}
