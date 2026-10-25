import { createHash } from "node:crypto";
import { DEFAULT_MEDIA_MODELS, mediaModel, runMediaJob, type MediaKind, type MediaOptions } from "@openpromo/yepapi";
import { and, desc, eq } from "drizzle-orm";
import { dataDb, schema } from "../db";
import type { AssetKind, AssetRole } from "../db/data-schema";
import sharp from "sharp";
import { readAsset, referenceSheet, saveAsset, type Asset } from "../lib/media-store";
import { getYep } from "../lib/yep";

/**
 * Generated media: one YepAPI job per picture, clip, voice line or music bed. Each job is a row
 * (media_jobs), so a restart picks up a job YepAPI is still working on instead of paying for it
 * again, and the same request made twice for a project reuses the first result.
 */

export type GenerateRequest = {
  projectId: string;
  userId: string;
  creationId?: string | null;
  /** Where the result goes, e.g. "scene:s2:background". */
  target?: string | null;
  kind: MediaKind;
  role: AssetRole;
  prompt: string;
  model?: string | null;
  options?: MediaOptions;
  /** Brand images (logo, product) to show the model; combined into one reference picture. */
  referenceAssetIds?: string[];
  /** Crop a single reference to this size first (a video's first frame). */
  referenceSize?: { width: number; height: number };
  /** A name for the library. */
  name?: string;
  /** Pay again even if the same request was made before. */
  fresh?: boolean;
};

const ASSET_KIND: Record<MediaKind, AssetKind> = { image: "image", video: "video", speech: "audio", music: "audio" };

function cacheKey(request: GenerateRequest, model: string): string {
  const payload = JSON.stringify([model, request.prompt, request.options ?? {}, [...(request.referenceAssetIds ?? [])].sort()]);
  return createHash("sha256").update(payload).digest("hex").slice(0, 40);
}

/** A picture cropped to a clip's shape, for image-to-video. */
async function firstFrame(image: Buffer, size: { width: number; height: number }) {
  const png = await sharp(image).resize(size.width, size.height, { fit: "cover", position: "attention" }).png().toBuffer();
  return { mimeType: "image/png", base64: png.toString("base64") };
}

async function loadReferences(projectId: string, ids: string[]): Promise<Buffer[]> {
  const out: Buffer[] = [];
  for (const id of ids.slice(0, 3)) {
    const [asset] = await dataDb
      .select()
      .from(schema.assets)
      .where(and(eq(schema.assets.id, id), eq(schema.assets.projectId, projectId)))
      .limit(1);
    if (asset?.kind === "image") out.push(await readAsset(asset));
  }
  return out;
}

/** Makes (or reuses) one generated asset. Throws on failure; failed jobs are not billed. */
export async function generateAsset(request: GenerateRequest): Promise<Asset> {
  const model = request.model ?? DEFAULT_MEDIA_MODELS[request.kind];
  const key = cacheKey(request, model);

  if (!request.fresh) {
    const [done] = await dataDb
      .select()
      .from(schema.mediaJobs)
      .where(and(eq(schema.mediaJobs.projectId, request.projectId), eq(schema.mediaJobs.cacheKey, key), eq(schema.mediaJobs.status, "done")))
      .orderBy(desc(schema.mediaJobs.createdAt))
      .limit(1);
    if (done?.assetId) {
      const [asset] = await dataDb.select().from(schema.assets).where(eq(schema.assets.id, done.assetId)).limit(1);
      if (asset) return asset;
    }
  }

  // A job submitted before a restart and still open is resumed rather than submitted again.
  const [open] = await dataDb
    .select()
    .from(schema.mediaJobs)
    .where(and(eq(schema.mediaJobs.projectId, request.projectId), eq(schema.mediaJobs.cacheKey, key), eq(schema.mediaJobs.status, "running")))
    .orderBy(desc(schema.mediaJobs.createdAt))
    .limit(1);

  const [job] = open
    ? [open]
    : await dataDb
        .insert(schema.mediaJobs)
        .values({
          projectId: request.projectId,
          userId: request.userId,
          creationId: request.creationId ?? null,
          target: request.target ?? null,
          kind: ASSET_KIND[request.kind],
          role: request.role,
          model,
          prompt: request.prompt,
          params: { options: request.options ?? {}, references: request.referenceAssetIds ?? [] },
          cacheKey: key,
          status: "running",
        })
        .returning();

  const yep = await getYep({ userId: request.userId, projectId: request.projectId, feature: `media.${request.kind}` });
  try {
    const references = request.referenceAssetIds?.length ? await loadReferences(request.projectId, request.referenceAssetIds) : [];
    const usable = references.length && mediaModel(model)?.acceptsImage !== false;
    const imageData = !usable
      ? undefined
      : request.referenceSize && references.length === 1
        ? await firstFrame(references[0]!, request.referenceSize)
        : await referenceSheet(references);
    const result = await runMediaJob(
      yep,
      { model, prompt: request.prompt, options: request.options, imageData },
      {
        jobId: open?.yepJobId ?? undefined,
        pollMs: request.kind === "video" ? 5000 : 2000,
        onSubmitted: async (jobId) => {
          await dataDb.update(schema.mediaJobs).set({ yepJobId: jobId }).where(eq(schema.mediaJobs.id, job!.id));
        },
      },
    );
    if (!result.file) throw new Error("The model returned no file");
    const asset = await saveAsset({
      projectId: request.projectId,
      source: "generated",
      role: request.role,
      name: request.name ?? request.prompt.slice(0, 80),
      bytes: result.file.bytes,
      mime: result.file.mimeType,
      model,
      prompt: request.prompt,
      costUsd: result.costUsd,
      meta: { options: request.options ?? {}, references: request.referenceAssetIds ?? [], ...(result.text ? { text: result.text } : {}) },
      creationId: request.creationId ?? null,
    });
    await dataDb
      .update(schema.mediaJobs)
      .set({ status: "done", assetId: asset.id, costUsd: result.costUsd, finishedAt: new Date() })
      .where(eq(schema.mediaJobs.id, job!.id));
    return asset;
  } catch (error) {
    await dataDb
      .update(schema.mediaJobs)
      .set({ status: "failed", error: (error as Error).message.slice(0, 1000), finishedAt: new Date() })
      .where(eq(schema.mediaJobs.id, job!.id));
    throw error;
  }
}
