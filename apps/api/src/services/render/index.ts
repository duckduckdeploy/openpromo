import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { captionCues, captionLimits, captionPreset, imageDocument, toSrt, videoDocument, type CaptionCue, type DocumentInput, type RenderAssets, type SpokenLine, type VoiceClip } from "@openpromo/render";
import { CREATION_TYPES, creationSpec, MEDIA_FORMATS, type BrandProfile, type CreationSpec, type MediaFormat, type MediaRef } from "@openpromo/shared";
import { nearestAspectRatio } from "@openpromo/yepapi";
import { eq, inArray } from "drizzle-orm";
import { dataDb, schema } from "../../db";
import { voicedSpans } from "../../lib/ffmpeg";
import { localFile, mediaRoot, saveAsset, type Asset } from "../../lib/media-store";
import { errorMessage } from "../../lib/yep";
import { withPage } from "../browser";
import { generateAsset } from "../media";

type Creation = typeof schema.creations.$inferSelect;
type Project = typeof schema.projects.$inferSelect;
type Render = typeof schema.renders.$inferSelect;

const require = createRequire(import.meta.url);

/** Hyperframes finds ffmpeg and ffprobe on the PATH; in development those come from npm packages. */
function ensureFfmpegOnPath() {
  if (process.env.FFMPEG_PATH) {
    process.env.PATH = [path.dirname(process.env.FFMPEG_PATH), process.env.PATH].join(path.delimiter);
    return;
  }
  const dirs: string[] = [];
  try {
    dirs.push(path.dirname(require("ffmpeg-static") as string));
    dirs.push(path.dirname((require("ffprobe-static") as { path: string }).path));
  } catch {
    // Not installed: the Docker image has ffmpeg and ffprobe on the PATH already.
  }
  if (dirs.length && !process.env.PATH?.includes(dirs[0]!)) process.env.PATH = [...dirs, process.env.PATH].join(path.delimiter);
}

// ── Generating what the spec still lacks ──────────────────────────────────

type Ctx = { project: Project; creation: Creation; brand: BrandProfile; spec: CreationSpec; format: MediaFormat };

/** Brand images every picture prompt may lean on: the logo, and a product photo when the scene names one. */
function referencesFor(ctx: Ctx): string[] {
  return [ctx.brand.visual.logoAssetId].filter((id): id is string => Boolean(id));
}

async function fillMedia(ctx: Ctx, ref: MediaRef | null, role: "background" | "broll" | "photo", target: string): Promise<void> {
  if (!ref?.generate || ref.assetId) return;
  const { width, height } = MEDIA_FORMATS[ctx.format];
  const kind = ref.generate.kind;
  const model = ref.generate.model ?? undefined;
  const style = ctx.brand.visual.imageryStyle.join(", ");
  const prompt = `${ref.generate.prompt}${style ? `. Visual style: ${style}` : ""}. No text, no letters, no logos.`;
  const asset = await generateAsset({
    projectId: ctx.project.id,
    userId: ctx.project.userId,
    creationId: ctx.creation.id,
    target,
    kind: kind === "video" ? "video" : "image",
    role: kind === "video" ? "broll" : role,
    model,
    prompt,
    options:
      kind === "video"
        ? { aspectRatio: width >= height ? "16:9" : "9:16", duration: "6", resolution: "720p" }
        : { aspectRatio: nearestAspectRatio(model ?? "google/nano-banana-3-flash", width, height) ?? "1:1" },
    referenceAssetIds:
      kind === "video" ? (ref.generate.sourceAssetId ? [ref.generate.sourceAssetId] : []) : role !== "background" ? referencesFor(ctx) : [],
    // A first frame must already have the clip's shape, or the model pads or crops it on its own.
    referenceSize: kind === "video" && ref.generate.sourceAssetId ? (width >= height ? { width: 1280, height: 720 } : { width: 720, height: 1280 }) : undefined,
    name: ref.generate.prompt.slice(0, 80),
  });
  ref.assetId = asset.id;
  ref.generate = null;
}

/** Generates every picture and clip the spec asks for but does not have yet, and stores the ids in it. */
export async function fillSceneMedia(ctx: Ctx): Promise<void> {
  for (const scene of ctx.spec.scenes) {
    await fillMedia(ctx, scene.media, "photo", `scene:${scene.id}:media`);
    await fillMedia(ctx, scene.background, "background", `scene:${scene.id}:background`);
  }
}

/** One voice line per scene with narration; their lengths decide the scene timings. */
async function fillVoice(ctx: Ctx): Promise<Map<string, Asset>> {
  const lines = new Map<string, Asset>();
  if (!ctx.spec.audio.voice.enabled) return lines;
  for (const scene of ctx.spec.scenes) {
    const text = scene.narration.trim();
    if (!text) continue;
    const asset = await generateAsset({
      projectId: ctx.project.id,
      userId: ctx.project.userId,
      creationId: ctx.creation.id,
      target: `scene:${scene.id}:voice`,
      kind: "speech",
      role: "voice",
      prompt: text,
      model: ctx.spec.audio.voice.model,
      options: ctx.spec.audio.voice.voice ? { voice: ctx.spec.audio.voice.voice } : {},
      name: `Voice: ${text.slice(0, 60)}`,
    });
    lines.set(scene.id, asset);
  }
  return lines;
}

async function fillMusic(ctx: Ctx): Promise<Asset | null> {
  const music = ctx.spec.audio.music;
  if (music.assetId) {
    const [asset] = await dataDb.select().from(schema.assets).where(eq(schema.assets.id, music.assetId)).limit(1);
    return asset ?? null;
  }
  if (!music.prompt.trim()) return null;
  const asset = await generateAsset({
    projectId: ctx.project.id,
    userId: ctx.project.userId,
    creationId: ctx.creation.id,
    target: "music",
    kind: "music",
    role: "music",
    prompt: `${music.prompt}. Instrumental, no vocals.`,
    name: `Music: ${music.prompt.slice(0, 60)}`,
  });
  music.assetId = asset.id;
  return asset;
}

// ── The render folder ─────────────────────────────────────────────────────

/** Every asset id a spec and brand point at. */
function assetIds(spec: CreationSpec, brand: BrandProfile, extra: string[] = []): string[] {
  const ids = new Set<string>(extra);
  if (brand.visual.logoAssetId) ids.add(brand.visual.logoAssetId);
  for (const scene of spec.scenes) {
    if (scene.media?.assetId) ids.add(scene.media.assetId);
    if (scene.background?.assetId) ids.add(scene.background.assetId);
  }
  if (spec.audio.music.assetId) ids.add(spec.audio.music.assetId);
  return [...ids];
}

/** A working folder with the assets copied in, so the page loads them as relative files. */
async function renderFolder(renderId: string, projectId: string, ids: string[]): Promise<{ dir: string; assets: RenderAssets; rows: Map<string, Asset> }> {
  const dir = path.join(mediaRoot(), ".render", renderId);
  await rm(dir, { recursive: true, force: true });
  await mkdir(path.join(dir, "assets"), { recursive: true });
  const rows = ids.length ? await dataDb.select().from(schema.assets).where(inArray(schema.assets.id, ids)) : [];
  const files: RenderAssets["files"] = {};
  const byId = new Map<string, Asset>();
  for (const row of rows) {
    if (row.projectId !== projectId) continue;
    const name = `assets/${row.id}${path.extname(row.path)}`;
    // A file that has gone (deleted by hand, a moved media folder) leaves its scene without that
    // picture rather than failing the whole render.
    const source = await localFile(row);
    if (!source) {
      console.warn(`render ${renderId}: asset ${row.id} has no file (${row.path}); left out`);
      continue;
    }
    await copyFile(source, path.join(dir, name));
    files[row.id] = { path: name, video: row.kind === "video" };
    byId.set(row.id, row);
  }
  return { dir, assets: { files }, rows: byId };
}

// ── Stills ────────────────────────────────────────────────────────────────

/** Renders one scene to PNG and reports how much its text had to shrink to fit. */
async function screenshotScene(dir: string, input: DocumentInput, sceneIndex: number, type: "png" | "jpeg" = "png"): Promise<{ bytes: Buffer; fit: number }> {
  const { width, height } = MEDIA_FORMATS[input.format];
  const file = path.join(dir, `scene-${sceneIndex}.html`);
  await writeFile(file, imageDocument(input, sceneIndex));
  return withPage({ width, height }, async (page) => {
    await page.goto(pathToFileURL(file).href, { waitUntil: "networkidle0", timeout: 60_000 });
    await page.waitForFunction("window.__openpromoReady === true", { timeout: 30_000 });
    const fit = Number(await page.$eval(".scene", (el) => el.getAttribute("data-fit") ?? "1"));
    const bytes = Buffer.from(await page.screenshot({ type, ...(type === "jpeg" ? { quality: 90 } : {}) }));
    return { bytes, fit };
  });
}

/** Carousel slides as one PDF, a page per slide (LinkedIn document posts). */
async function slidesPdf(dir: string, format: MediaFormat, slides: string[]): Promise<Buffer> {
  const { width, height } = MEDIA_FORMATS[format];
  const html = `<!doctype html><html><head><style>@page{size:${width}px ${height}px;margin:0}*{margin:0}img{display:block;width:${width}px;height:${height}px;page-break-after:always}</style></head><body>${slides.map((s) => `<img src="${s}">`).join("")}</body></html>`;
  const file = path.join(dir, "slides.html");
  await writeFile(file, html);
  return withPage({ width, height }, async (page) => {
    await page.goto(pathToFileURL(file).href, { waitUntil: "load" });
    return Buffer.from(await page.pdf({ width: `${width}px`, height: `${height}px`, printBackground: true, pageRanges: "" }));
  });
}

// ── The render job ────────────────────────────────────────────────────────

async function progress(renderId: string, value: number) {
  await dataDb.update(schema.renders).set({ progress: Math.max(0, Math.min(100, Math.round(value))) }).where(eq(schema.renders.id, renderId));
}

async function renderStills(ctx: Ctx, render: Render, folder: Awaited<ReturnType<typeof renderFolder>>) {
  const input: DocumentInput = { brand: ctx.brand, spec: ctx.spec, format: render.format, assets: folder.assets };
  const outputs: string[] = [];
  const slideFiles: string[] = [];
  const fits: number[] = [];
  const count = ctx.creation.type === "carousel" ? ctx.spec.scenes.length : 1;
  for (let i = 0; i < count; i++) {
    const { bytes, fit } = await screenshotScene(folder.dir, input, i);
    fits.push(fit);
    const slideName = `slide-${i}.png`;
    await writeFile(path.join(folder.dir, slideName), bytes);
    slideFiles.push(slideName);
    const asset = await saveAsset({
      projectId: ctx.project.id,
      source: "render",
      role: "output",
      name: count > 1 ? `${ctx.creation.title} (${i + 1}/${count})` : ctx.creation.title,
      bytes,
      mime: "image/png",
      creationId: ctx.creation.id,
      meta: { renderId: render.id, format: render.format, scene: ctx.spec.scenes[i]?.id },
    });
    outputs.push(asset.id);
    await progress(render.id, 30 + ((i + 1) / count) * 60);
  }
  if (count > 1) {
    const pdf = await slidesPdf(folder.dir, render.format, slideFiles);
    const asset = await saveAsset({ projectId: ctx.project.id, source: "render", role: "output", name: `${ctx.creation.title} (PDF)`, bytes: pdf, mime: "application/pdf", creationId: ctx.creation.id, meta: { renderId: render.id, format: render.format } });
    outputs.push(asset.id);
  }
  return { outputs, posterAssetId: outputs[0] ?? null, captionsAssetId: null, fits };
}

/** Scene timings: each scene lasts at least as long as its voice line plus a breath. */
export function sceneTimings(durations: number[], voiceMs: Array<number | null>): { starts: number[]; durations: number[] } {
  const starts: number[] = [];
  const out: number[] = [];
  let at = 0;
  durations.forEach((ms, i) => {
    const voice = voiceMs[i];
    const length = Math.max(ms, voice ? voice + 450 : 0);
    starts.push(at);
    out.push(length);
    at += length;
  });
  return { starts, durations: out };
}

async function renderVideo(ctx: Ctx, render: Render, voice: Map<string, Asset>, music: Asset | null) {
  ensureFfmpegOnPath();
  const ids = assetIds(ctx.spec, ctx.brand, [...[...voice.values()].map((a) => a.id), ...(music ? [music.id] : [])]);
  const folder = await renderFolder(render.id, ctx.project.id, ids);
  const gsap = require.resolve("gsap/dist/gsap.min.js");
  await copyFile(gsap, path.join(folder.dir, "gsap.min.js"));

  const timing = sceneTimings(
    ctx.spec.scenes.map((s) => s.durationMs),
    ctx.spec.scenes.map((s) => voice.get(s.id)?.durationMs ?? null),
  );
  const voiceClips: VoiceClip[] = [];
  const spoken: SpokenLine[] = [];
  for (const [i, scene] of ctx.spec.scenes.entries()) {
    const line = voice.get(scene.id);
    if (!line?.durationMs) continue;
    const startMs = timing.starts[i]! + 150;
    const file = path.join(folder.dir, folder.assets.files[line.id]!.path);
    voiceClips.push({ path: folder.assets.files[line.id]!.path, startMs, durationMs: line.durationMs });
    const voiced = ctx.spec.captions === "none" ? [] : await voicedSpans(file, line.durationMs);
    spoken.push({ text: scene.narration, startMs, durationMs: line.durationMs, voiced, emphasis: scene.emphasis });
  }
  const captions: CaptionCue[] = ctx.spec.captions === "none" ? [] : captionCues(spoken, captionLimits(captionPreset(ctx.spec.captions, ctx.spec.captionStyle)));

  const html = videoDocument({
    brand: ctx.brand,
    spec: ctx.spec,
    format: render.format,
    assets: folder.assets,
    voice: voiceClips,
    music: music?.durationMs ? { path: folder.assets.files[music.id]!.path, durationMs: music.durationMs, volume: ctx.spec.audio.music.volume } : null,
    captions,
    sceneStarts: timing.starts,
    sceneDurations: timing.durations,
  });
  await writeFile(path.join(folder.dir, "index.html"), html);

  const { createRenderJob, executeRenderJob } = await import("@hyperframes/producer");
  const out = path.join(folder.dir, "out.mp4");
  const job = createRenderJob({ fps: 30, quality: render.quality === "draft" ? "draft" : "standard" });
  await executeRenderJob(job, folder.dir, out, (current) => {
    void progress(render.id, 40 + (current.progress ?? 0) * 0.5);
  });

  const video = await saveAsset({
    projectId: ctx.project.id,
    source: "render",
    role: "output",
    name: ctx.creation.title,
    bytes: await readFile(out),
    mime: "video/mp4",
    creationId: ctx.creation.id,
    meta: { renderId: render.id, format: render.format, scenes: timing },
  });
  // The poster is the chosen scene drawn as a still, so thumbnails show a finished frame.
  const posterIndex = Math.max(0, ctx.spec.scenes.findIndex((s) => s.id === ctx.spec.posterSceneId));
  const poster = await screenshotScene(folder.dir, { brand: ctx.brand, spec: ctx.spec, format: render.format, assets: folder.assets }, posterIndex, "jpeg");
  const posterAsset = await saveAsset({ projectId: ctx.project.id, source: "render", role: "poster", name: `${ctx.creation.title} (poster)`, bytes: poster.bytes, mime: "image/jpeg", creationId: ctx.creation.id, meta: { renderId: render.id } });
  let captionsAssetId: string | null = null;
  if (captions.length) {
    const srt = await saveAsset({ projectId: ctx.project.id, source: "render", role: "captions", name: `${ctx.creation.title} (captions)`, bytes: Buffer.from(toSrt(captions)), mime: "application/x-subrip", creationId: ctx.creation.id, meta: { renderId: render.id } });
    captionsAssetId = srt.id;
  }
  await rm(folder.dir, { recursive: true, force: true });
  return { outputs: [video.id], posterAssetId: posterAsset.id, captionsAssetId };
}

/** Runs a queued render to the end; failures are recorded on the render and the creation. */
export async function runRender(renderId: string): Promise<void> {
  const [render] = await dataDb.select().from(schema.renders).where(eq(schema.renders.id, renderId));
  if (!render || render.status === "done") return;
  const [creation] = await dataDb.select().from(schema.creations).where(eq(schema.creations.id, render.creationId));
  const [project] = creation ? await dataDb.select().from(schema.projects).where(eq(schema.projects.id, creation.projectId)) : [];
  if (!creation || !project?.brand) return;

  await dataDb.update(schema.renders).set({ status: "running", startedAt: new Date(), progress: 2 }).where(eq(schema.renders.id, renderId));
  await dataDb.update(schema.creations).set({ status: "rendering", error: null }).where(eq(schema.creations.id, creation.id));
  const ctx: Ctx = { project, creation, brand: project.brand, spec: creationSpec.parse(structuredClone(creation.spec)), format: render.format };
  try {
    await fillSceneMedia(ctx);
    await progress(renderId, 20);
    const isVideo = CREATION_TYPES[creation.type].video;
    const voice = isVideo ? await fillVoice(ctx) : new Map<string, Asset>();
    const music = isVideo ? await fillMusic(ctx) : null;
    // Generated ids go back into the spec, so editing one scene never pays for the others again.
    await dataDb.update(schema.creations).set({ spec: ctx.spec }).where(eq(schema.creations.id, creation.id));
    await progress(renderId, 30);

    const result = isVideo
      ? await renderVideo(ctx, render, voice, music)
      : await (async () => {
          const folder = await renderFolder(renderId, project.id, assetIds(ctx.spec, ctx.brand));
          try {
            return await renderStills(ctx, render, folder);
          } finally {
            await rm(folder.dir, { recursive: true, force: true });
          }
        })();

    await dataDb
      .update(schema.renders)
      .set({ status: "done", progress: 100, outputAssetIds: result.outputs, posterAssetId: result.posterAssetId, captionsAssetId: result.captionsAssetId, finishedAt: new Date() })
      .where(eq(schema.renders.id, renderId));
    await dataDb.update(schema.creations).set({ status: "done" }).where(eq(schema.creations.id, creation.id));
  } catch (error) {
    const message = errorMessage(error);
    await dataDb.update(schema.renders).set({ status: "failed", error: message, finishedAt: new Date() }).where(eq(schema.renders.id, renderId));
    await dataDb.update(schema.creations).set({ status: "failed", error: message, spec: ctx.spec }).where(eq(schema.creations.id, creation.id));
    await rm(path.join(mediaRoot(), ".render", renderId), { recursive: true, force: true }).catch(() => {});
    throw error;
  }
}
