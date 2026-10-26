import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { backdropOf, captionCues, captionLimits, captionPreset, imageDocument, toSrt, videoDocument, type CaptionCue, type DocumentInput, type RenderAssets, type SpokenLine, type VoiceClip } from "@openpromo/render";
import { CREATION_TYPES, creationSpec, getTemplate, MEDIA_FORMATS, type BrandProfile, type CreationSpec, type MediaFormat, type MediaRef } from "@openpromo/shared";
import { DEFAULT_MEDIA_MODELS, mediaModel, nearestAspectRatio } from "@openpromo/yepapi";
import { eq, inArray } from "drizzle-orm";
import { dataDb, schema } from "../../db";
import { env } from "../../env";
import { ffmpeg, mediaDurationMs, voicedSpans } from "../../lib/ffmpeg";
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

/** The art direction for every picture and clip: the template's look, else the brand's imagery style. */
function styleOf(ctx: Ctx): string {
  const template = ctx.spec.templateId ? getTemplate(ctx.spec.templateId) : undefined;
  return template?.look || ctx.brand.visual.imageryStyle.join(", ");
}

/** The shortest clip length the model makes that covers the scene. */
function clipSeconds(model: string, sceneMs: number): string {
  const lengths = mediaModel(model)?.durations ?? [4, 6, 8];
  const wanted = sceneMs / 1000;
  return String(lengths.find((s) => s >= wanted) ?? lengths[lengths.length - 1]);
}

/** Draws each cast member's reference sheet once; every scene they appear in is drawn from it. */
async function fillCast(ctx: Ctx): Promise<void> {
  const style = styleOf(ctx);
  for (const member of ctx.spec.cast) {
    if (member.sheetAssetId) continue;
    const model = DEFAULT_MEDIA_MODELS.image;
    const asset = await generateAsset({
      projectId: ctx.project.id,
      userId: ctx.project.userId,
      creationId: ctx.creation.id,
      target: `cast:${member.id}`,
      kind: "image",
      role: "photo",
      model,
      prompt: `Character reference sheet for ${member.name}: ${member.description}. Full body, facing the camera, then a close-up of the face, on a plain light background. ${style ? `Style: ${style}. ` : ""}No text, no letters, no logos.`,
      options: { aspectRatio: nearestAspectRatio(model, 3, 2) ?? "3:2" },
      name: `Cast: ${member.name}`,
    });
    member.sheetAssetId = asset.id;
  }
}

async function fillMedia(ctx: Ctx, ref: MediaRef | null, role: "background" | "broll" | "photo", target: string, sceneMs = 6000, dialogue = ""): Promise<void> {
  if (!ref?.generate || ref.assetId) return;
  const { width, height } = MEDIA_FORMATS[ctx.format];
  const kind = ref.generate.kind;
  const style = styleOf(ctx);
  const cast = ref.generate.castIds
    .map((id) => ctx.spec.cast.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c?.sheetAssetId));
  const castRefs = [...cast.map((c) => c.sheetAssetId!), ...ref.generate.referenceAssetIds].slice(0, 4);
  // A reference sheet has several views side by side; without this the model copies that layout.
  const single = " One single full-frame shot: not a collage, no panels, no split screen, no borders.";
  const castNote = cast.length ? ` Keep ${cast.map((c) => c.name).join(" and ")} exactly as in the reference sheet (same face, body, clothes and colours).${single}` : castRefs.length ? single : "";
  const noText = ref.generate.allowText ? "" : " No text, no letters, no logos.";

  // A clip that starts from a drawn keyframe: draw it first, so the cast and the product look right.
  if (kind === "video" && !ref.generate.sourceAssetId && ref.generate.keyframe) {
    const imageModel = DEFAULT_MEDIA_MODELS.image;
    const frame = await generateAsset({
      projectId: ctx.project.id,
      userId: ctx.project.userId,
      creationId: ctx.creation.id,
      target: `${target}:keyframe`,
      kind: "image",
      role: "photo",
      model: imageModel,
      prompt: `${ref.generate.keyframe}${style ? `. Visual style: ${style}` : ""}.${castNote || single}${noText}`,
      options: { aspectRatio: nearestAspectRatio(imageModel, width, height) ?? "1:1" },
      referenceAssetIds: castRefs.length ? castRefs : referencesFor(ctx),
      name: `Keyframe: ${ref.generate.keyframe.slice(0, 70)}`,
    });
    ref.generate.sourceAssetId = frame.id;
  }

  const template = ctx.spec.templateId ? getTemplate(ctx.spec.templateId) : undefined;
  const model = ref.generate.model ?? (kind === "video" ? template?.models?.video : template?.models?.image) ?? DEFAULT_MEDIA_MODELS[kind === "video" ? "video" : "image"];
  const speech = dialogue.trim() ? ` The person says, clearly and naturally: "${dialogue.trim()}"` : "";
  const sound = kind === "video" ? (ref.keepAudio ? (speech ? "" : " Natural ambient sound only, no speech.") : " No dialogue, no speech.") : "";
  const prompt = kind === "video" ? `${ref.generate.prompt}${style ? `. Visual style: ${style}` : ""}.${speech}${sound}${noText}` : `${ref.generate.prompt}${style ? `. Visual style: ${style}` : ""}.${castNote}${noText}`;
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
        ? {
            aspectRatio: width >= height ? "16:9" : "9:16",
            duration: clipSeconds(model, sceneMs),
            resolution: "720p",
            ...(ref.keepAudio ? { generateAudio: true } : {}),
          }
        : { aspectRatio: nearestAspectRatio(model, width, height) ?? "1:1" },
    referenceAssetIds:
      kind === "video"
        ? ref.generate.sourceAssetId
          ? [ref.generate.sourceAssetId]
          : []
        : castRefs.length
          ? castRefs
          : role !== "background"
            ? referencesFor(ctx)
            : [],
    // A first frame must already have the clip's shape, or the model pads or crops it on its own.
    referenceSize: kind === "video" && ref.generate.sourceAssetId ? (width >= height ? { width: 1280, height: 720 } : { width: 720, height: 1280 }) : undefined,
    name: ref.generate.prompt.slice(0, 80),
  });
  ref.assetId = asset.id;
  ref.made = ref.generate;
  ref.generate = null;
}

/** Runs `work` over `items`, at most `limit` at a time. */
async function eachLimit<T>(items: T[], limit: number, work: (item: T) => Promise<void>): Promise<void> {
  const queue = [...items];
  await Promise.all(Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length) await work(queue.shift()!);
  }));
}

/** Scenes whose pictures and clips are made at the same time. AI clips take minutes each. */
const MEDIA_PARALLEL = 4;

/**
 * Generates every picture and clip the spec asks for but does not have yet, and stores the ids in
 * it. Cast sheets come first, since the scenes are drawn from them; then the scenes in parallel.
 */
export async function fillSceneMedia(ctx: Ctx): Promise<void> {
  await fillCast(ctx);
  await eachLimit(ctx.spec.scenes, MEDIA_PARALLEL, async (scene) => {
    await fillMedia(ctx, scene.media, "photo", `scene:${scene.id}:media`, scene.durationMs, scene.dialogue);
    await fillMedia(ctx, scene.background, "background", `scene:${scene.id}:background`, scene.durationMs);
  });
}

/** One voice line per scene with narration; their lengths decide the scene timings. */
async function fillVoice(ctx: Ctx): Promise<Map<string, Asset>> {
  const lines = new Map<string, Asset>();
  if (!ctx.spec.audio.voice.enabled) return lines;
  await eachLimit(ctx.spec.scenes, MEDIA_PARALLEL, async (scene) => {
    const text = scene.narration.trim();
    if (!text) return;
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
  });
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
  // Hyperframes allows a page 60 s to load; a reel with a dozen AI clips needs longer on a busy server.
  process.env.PRODUCER_PAGE_NAVIGATION_TIMEOUT_MS ??= "240000";
  process.env.PRODUCER_PLAYER_READY_TIMEOUT_MS ??= "180000";
  const ids = assetIds(ctx.spec, ctx.brand, [...[...voice.values()].map((a) => a.id), ...(music ? [music.id] : [])]);
  const folder = await renderFolder(render.id, ctx.project.id, ids);
  const gsap = require.resolve("gsap/dist/gsap.min.js");
  await copyFile(gsap, path.join(folder.dir, "gsap.min.js"));

  // Clips that keep their own sound (on-camera speech, close-up sound) play it as a track of their
  // own, and the scene lasts as long as the clip.
  const clipAudio = new Map<string, { path: string; durationMs: number }>();
  for (const scene of ctx.spec.scenes) {
    const ref = backdropOf(scene);
    const file = ref?.assetId ? folder.assets.files[ref.assetId] : undefined;
    if (!ref?.keepAudio || !file?.video) continue;
    const audioPath = `clip-audio-${scene.id}.m4a`;
    try {
      await ffmpeg(["-y", "-i", path.join(folder.dir, file.path), "-vn", "-ac", "2", "-ar", "44100", "-c:a", "aac", "-b:a", "160k", path.join(folder.dir, audioPath)]);
      const durationMs = await mediaDurationMs(path.join(folder.dir, audioPath));
      if (durationMs) clipAudio.set(scene.id, { path: audioPath, durationMs });
    } catch {
      // A clip without an audio stream simply stays silent.
    }
  }

  const timing = sceneTimings(
    ctx.spec.scenes.map((s) => (clipAudio.has(s.id) ? Math.min(s.durationMs, clipAudio.get(s.id)!.durationMs) : s.durationMs)),
    ctx.spec.scenes.map((s) => voice.get(s.id)?.durationMs ?? (clipAudio.has(s.id) ? clipAudio.get(s.id)!.durationMs - 450 : null)),
  );
  const voiceClips: VoiceClip[] = [];
  const spoken: SpokenLine[] = [];
  for (const [i, scene] of ctx.spec.scenes.entries()) {
    const own = clipAudio.get(scene.id);
    if (own) {
      const startMs = timing.starts[i]!;
      voiceClips.push({ path: own.path, startMs, durationMs: Math.min(own.durationMs, timing.durations[i]!) });
      if (scene.dialogue.trim() && ctx.spec.captions !== "none") {
        const voiced = await voicedSpans(path.join(folder.dir, own.path), own.durationMs);
        spoken.push({ text: scene.dialogue, startMs, durationMs: own.durationMs, voiced, emphasis: scene.emphasis });
      }
      continue;
    }
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

/**
 * Chrome and ffmpeg are the heavy part of a render; making the media is mostly waiting on YepAPI.
 * Renders are taken from the queue several at a time, and only the drawing waits for a slot.
 */
let drawing = 0;
const waitingToDraw: Array<() => void> = [];
async function withDrawSlot<T>(work: () => Promise<T>): Promise<T> {
  if (drawing >= env.RENDER_CONCURRENCY) await new Promise<void>((resolve) => waitingToDraw.push(resolve));
  drawing++;
  try {
    return await work();
  } finally {
    drawing--;
    waitingToDraw.shift()?.();
  }
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

    const result = await withDrawSlot<{ outputs: string[]; posterAssetId: string | null; captionsAssetId: string | null }>(() => isVideo
      ? renderVideo(ctx, render, voice, music)
      : (async () => {
          const folder = await renderFolder(renderId, project.id, assetIds(ctx.spec, ctx.brand));
          try {
            return await renderStills(ctx, render, folder);
          } finally {
            await rm(folder.dir, { recursive: true, force: true });
          }
        })());

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
