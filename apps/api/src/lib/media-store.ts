import { randomUUID } from "node:crypto";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { eq } from "drizzle-orm";
import sharp from "sharp";
import { dataDb, schema } from "../db";
import type { AssetKind, AssetRole, AssetSource } from "../db/data-schema";
import { env } from "../env";
import { mediaDurationMs, videoSize } from "./ffmpeg";
import { deleteObject, getObject, listObjects, objectStorageEnabled, putObject } from "./object-storage";

/**
 * Files live on disk under MEDIA_DIR, one folder per project: "<projectId>/<assetId>.<ext>".
 * The assets table holds what each file is. Paths in rows are relative, so the folder can move.
 * With object storage configured (lib/object-storage.ts), every file is also uploaded under the
 * same key; the bucket is the copy that counts and the disk is a cache that refills on demand.
 */

export const mediaRoot = () => path.resolve(env.MEDIA_DIR);

/** Absolute path of a stored file. Refuses paths that would leave MEDIA_DIR. */
export function absolutePath(relative: string): string {
  const root = mediaRoot();
  const full = path.resolve(root, relative);
  if (full !== root && !full.startsWith(root + path.sep)) throw new Error("Path outside the media folder");
  return full;
}

const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "image/gif": "gif",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/mp4": "m4a",
  "application/pdf": "pdf",
  "application/zip": "zip",
  "text/vtt": "vtt",
  "application/x-subrip": "srt",
};

export const extensionFor = (mime: string) => EXTENSIONS[mime.split(";")[0]!.trim()] ?? "bin";

export function kindFor(mime: string): AssetKind {
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("audio/")) return "audio";
  return "document";
}

/**
 * PCM speech (Gemini TTS and others return headerless audio/pcm;rate=24000;channels=1) gets a
 * WAV header so players and ffmpeg can read it.
 */
function normalise(bytes: Uint8Array, mime: string): { bytes: Uint8Array; mime: string } {
  const [base, ...params] = mime.split(";").map((s) => s.trim());
  if (base !== "audio/pcm" && base !== "audio/L16") return { bytes, mime: base! };
  const read = (key: string, fallback: number) => Number(params.find((p) => p.startsWith(`${key}=`))?.split("=")[1] ?? fallback);
  const rate = read("rate", 24000);
  const channels = read("channels", 1);
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + bytes.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(rate, 24);
  header.writeUInt32LE(rate * channels * 2, 28);
  header.writeUInt16LE(channels * 2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(bytes.length, 40);
  return { bytes: Buffer.concat([header, bytes]), mime: "audio/wav" };
}

export type NewAsset = {
  projectId: string;
  source: AssetSource;
  role: AssetRole;
  name: string;
  bytes: Uint8Array;
  mime: string;
  model?: string | null;
  prompt?: string | null;
  costUsd?: number;
  meta?: Record<string, unknown>;
  creationId?: string | null;
};

/** Writes a file and records it. Image sizes and media durations are read from the file itself. */
export async function saveAsset(input: NewAsset) {
  const id = randomUUID();
  const { bytes, mime } = normalise(input.bytes, input.mime);
  const relative = `${input.projectId}/${id}.${extensionFor(mime)}`;
  const full = absolutePath(relative);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, bytes);

  const kind = kindFor(mime);
  let width: number | null = null;
  let height: number | null = null;
  let durationMs: number | null = null;
  if (kind === "image" && mime !== "image/svg+xml") {
    const info = await sharp(full).metadata().catch(() => null);
    width = info?.width ?? null;
    height = info?.height ?? null;
  } else if (kind === "video" || kind === "audio") {
    durationMs = await mediaDurationMs(full);
    if (kind === "video") ({ width, height } = (await videoSize(full)) ?? { width: null, height: null });
  }

  if (objectStorageEnabled()) await putObject(relative, bytes, mime);

  const [row] = await dataDb
    .insert(schema.assets)
    .values({
      id,
      projectId: input.projectId,
      kind,
      source: input.source,
      role: input.role,
      name: input.name.slice(0, 200),
      path: relative,
      mime,
      bytes: bytes.length,
      width,
      height,
      durationMs,
      model: input.model ?? null,
      prompt: input.prompt ?? null,
      costUsd: input.costUsd ?? 0,
      meta: input.meta ?? {},
      creationId: input.creationId ?? null,
    })
    .returning();
  return row!;
}

export type Asset = typeof schema.assets.$inferSelect;

/**
 * The file on local disk, fetched from object storage first when this server has no copy (a new
 * server, a cleaned cache). Returns null when the file exists nowhere.
 */
export async function localFile(asset: Pick<Asset, "path">): Promise<string | null> {
  const full = absolutePath(asset.path);
  if (await stat(full).then(() => true, () => false)) return full;
  if (!objectStorageEnabled()) return null;
  const bytes = await getObject(asset.path);
  if (!bytes) return null;
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, bytes);
  return full;
}

export async function readAsset(asset: Pick<Asset, "path">): Promise<Buffer> {
  const file = await localFile(asset);
  if (!file) throw new Error(`The file for this asset is missing (${asset.path})`);
  return readFile(file);
}

export async function assetExists(asset: Pick<Asset, "path">): Promise<boolean> {
  return (await localFile(asset)) !== null;
}

export async function deleteAsset(asset: Pick<Asset, "id" | "path">): Promise<void> {
  await dataDb.delete(schema.assets).where(eq(schema.assets.id, asset.id));
  await rm(absolutePath(asset.path), { force: true });
  if (objectStorageEnabled()) await deleteObject(asset.path);
}

/** Removes a project's whole folder (after its rows are gone with the project). */
export async function deleteProjectFiles(projectId: string): Promise<void> {
  if (!/^[0-9a-f-]{36}$/i.test(projectId)) return;
  await rm(absolutePath(projectId), { recursive: true, force: true });
  if (objectStorageEnabled()) for (const key of await listObjects(`${projectId}/`)) await deleteObject(key);
}

/**
 * A reference image for a model, which takes exactly one: the given images side by side on a
 * white sheet, each scaled to fit, at most `max` pixels on the long side. YepAPI has no way to
 * send a logo and a product as two images, so the prompt names their positions instead.
 */
export async function referenceSheet(images: Buffer[], max = 1536): Promise<{ mimeType: string; base64: string }> {
  if (images.length === 1) {
    const one = await sharp(images[0]).resize(max, max, { fit: "inside", withoutEnlargement: true }).png().toBuffer();
    return { mimeType: "image/png", base64: one.toString("base64") };
  }
  const cell = Math.floor(max / images.length);
  const tiles = await Promise.all(
    images.map((image) =>
      sharp(image).resize(cell - 32, cell - 32, { fit: "contain", background: "#ffffff" }).flatten({ background: "#ffffff" }).png().toBuffer(),
    ),
  );
  const sheet = await sharp({ create: { width: cell * images.length, height: cell, channels: 3, background: "#ffffff" } })
    .composite(tiles.map((input, i) => ({ input, left: i * cell + 16, top: 16 })))
    .png()
    .toBuffer();
  return { mimeType: "image/png", base64: sheet.toString("base64") };
}
