/**
 * Development and test stand-in for YepAPI. Answers in the documented response shapes with
 * made-up content, so the app can be run and tested without a key or credits:
 *  - chat with a JSON schema gets JSON shaped by that schema (a schema-driven sample)
 *  - scrape returns a small page, screenshot a plain PNG
 *  - media jobs complete after one poll with real files: a coloured PNG at the requested aspect
 *    ratio, or silent MP3 / blank MP4 of a plausible length made with ffmpeg
 *
 * Any key starting with "yep_sk_" is accepted. Tests can read `requests` and queue `failures`.
 */
import { randomUUID } from "node:crypto";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
import { ffmpeg } from "../lib/ffmpeg";

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

type JsonSchema = {
  type?: string | string[];
  properties?: Record<string, JsonSchema>;
  items?: JsonSchema;
  enum?: unknown[];
  anyOf?: JsonSchema[];
  oneOf?: JsonSchema[];
  description?: string;
  minItems?: number;
  minimum?: number;
  maximum?: number;
};

/** A value that fits the schema: first enum value, two array items (three scenes, the least a video takes), words for strings. */
export function sampleFromSchema(schema: JsonSchema, key = "value", depth = 0): unknown {
  if (depth > 8) return null;
  const variant = schema.anyOf ?? schema.oneOf;
  if (variant) return sampleFromSchema(variant.find((s) => s.type !== "null") ?? variant[0]!, key, depth);
  if (schema.enum) return schema.enum[0];
  const type = Array.isArray(schema.type) ? (schema.type.find((t) => t !== "null") ?? "string") : schema.type;
  switch (type) {
    case "object":
      return Object.fromEntries(Object.entries(schema.properties ?? {}).map(([k, s]) => [k, sampleFromSchema(s, k, depth + 1)]));
    case "array":
      return Array.from({ length: Math.max(key === "scenes" ? 3 : 2, schema.minItems ?? 0) }, (_, i) => sampleFromSchema(schema.items ?? { type: "string" }, `${key}${i + 1}`, depth + 1));
    case "number":
    case "integer":
      return Math.min(schema.maximum ?? 50, Math.max(schema.minimum ?? 0, 50));
    case "boolean":
      return false;
    default:
      if (/url/i.test(key)) return "https://example.com/";
      if (/hex|color|colour/i.test(key)) return "#e5484d";
      return `Sample ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`;
  }
}

/** Pixel size for an aspect ratio, long side 1024. */
function sizeFor(ratio: string | undefined): { width: number; height: number } {
  const [w, h] = (ratio ?? "1:1").split(":").map(Number);
  if (!w || !h) return { width: 1024, height: 1024 };
  return w >= h ? { width: 1024, height: Math.round((1024 * h) / w) } : { width: Math.round((1024 * w) / h), height: 1024 };
}

async function fakeImage(prompt: string, ratio?: string): Promise<{ mimeType: string; base64: string }> {
  const { width, height } = sizeFor(ratio);
  const h = hash(prompt);
  const png = await sharp({ create: { width, height, channels: 3, background: { r: 60 + (h % 160), g: 60 + ((h >> 8) % 160), b: 60 + ((h >> 16) % 160) } } })
    .png()
    .toBuffer();
  return { mimeType: "image/png", base64: png.toString("base64") };
}

async function fakeFile(args: string[], ext: string, mimeType: string): Promise<{ mimeType: string; base64: string }> {
  const dir = await mkdtemp(path.join(tmpdir(), "fake-yep-"));
  const out = path.join(dir, `out.${ext}`);
  try {
    await ffmpeg([...args, "-y", out]);
    return { mimeType, base64: (await readFile(out)).toString("base64") };
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

const isSpeech = (model: string) => /voice|tts|eleven|aura|fish|speech|kokoro|orpheus/i.test(model);
const isMusic = (model: string) => /lyria|music/i.test(model);
const isVideo = (model: string) => /veo|kling|sora|seedance|hailuo|runway|wan|video/i.test(model);

/** Finishes a queued job: the file it would have made, and a price like the real one. */
async function completeJob(job: { model: string; prompt: string; options: Record<string, unknown> }) {
  if (isSpeech(job.model)) {
    // About 15 characters a second, like a natural read.
    const seconds = Math.max(1, Math.round((job.prompt.length / 15) * 10) / 10);
    const audio = await fakeFile(["-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", String(seconds), "-c:a", "libmp3lame", "-b:a", "48k"], "mp3", "audio/mpeg");
    return { costUsd: 0.01, result: { audio } };
  }
  if (isMusic(job.model)) {
    const audio = await fakeFile(["-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo", "-t", "30", "-c:a", "libmp3lame", "-b:a", "64k"], "mp3", "audio/mpeg");
    return { costUsd: 0.08, result: { audio, text: "<instrumental>" } };
  }
  if (isVideo(job.model)) {
    const seconds = Number(job.options.duration ?? 4) || 4;
    const vertical = job.options.aspectRatio === "9:16";
    const size = vertical ? "360x640" : job.options.aspectRatio === "1:1" ? "480x480" : "640x360";
    const color = `0x${(hash(job.prompt) & 0xffffff).toString(16).padStart(6, "0")}`;
    const video = await fakeFile(["-f", "lavfi", "-i", `color=c=${color}:s=${size}:r=24`, "-t", String(seconds), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "ultrafast"], "mp4", "video/mp4");
    return { costUsd: Math.round(0.11 * seconds * 100) / 100, result: { video } };
  }
  return { costUsd: 0.04, result: { image: await fakeImage(job.prompt, job.options.aspectRatio as string | undefined) } };
}

function handle(pathname: string, body: any): unknown {
  switch (pathname) {
    case "/v1/scrape":
    case "/v1/scrape/stealth":
      return {
        url: body.url,
        statusCode: 200,
        title: "Acme Bakery",
        markdown: "# Acme Bakery\nFresh sourdough baked every morning in Austin.\n## Why Acme\n- Baked before 6am, every day\n- Organic flour from Texas mills\n[button] Order for pickup",
        content: "# Acme Bakery\nFresh sourdough baked every morning in Austin.",
        format: "markdown",
      };
    case "/v1/scrape/js":
      return { url: body.url, statusCode: 200, content: "<html><head><title>Rendered</title></head><body><h1>Rendered</h1></body></html>", format: "html" };
    case "/v1/scrape/extract":
      return { url: body.url, extracted: {} };
    case "/v1/ai/chat": {
      const format = body.responseFormat as { type?: string; json_schema?: { name?: string; schema?: JsonSchema } } | undefined;
      const content = format?.json_schema?.schema ? JSON.stringify(sampleFromSchema(format.json_schema.schema, format.json_schema.name)) : "A short sample answer.";
      return { model: body.model, message: { role: "assistant", content }, usage: { promptTokens: 120, completionTokens: 80, totalTokens: 200 }, costUsd: 0.01 };
    }
    default:
      return null;
  }
}

export type FakeYepApi = {
  server: Server;
  url: string;
  /** Every authenticated request, in order. */
  requests: { path: string; body: any }[];
  /** Per-path queue of error replies; each entry answers one request, then is removed. */
  failures: Map<string, { status: number; code: string; message?: string }[]>;
  /** Media jobs by id. Set `failNext` to make the next submitted job fail. */
  jobs: Map<string, { model: string; prompt: string; options: Record<string, unknown>; polls: number; fail?: string }>;
  failNextJob: (message: string) => void;
  close(): Promise<void>;
};

export async function startFakeYepApi(port = 0): Promise<FakeYepApi> {
  const requests: FakeYepApi["requests"] = [];
  const failures: FakeYepApi["failures"] = new Map();
  const jobs: FakeYepApi["jobs"] = new Map();
  let failNext: string | undefined;

  const server = createServer((req, res) => {
    const send = (status: number, payload: unknown) => {
      res.writeHead(status, { "content-type": "application/json", "x-request-id": "fake" });
      res.end(JSON.stringify(payload));
    };
    const key = req.headers["x-api-key"];
    if (typeof key !== "string" || !key.startsWith("yep_sk_")) return send(401, { ok: false, error: { code: "INVALID_API_KEY", message: "Invalid API key" } });
    const pathname = (req.url ?? "").split("?")[0] ?? "";
    const queued = (name: string) => {
      const failure = failures.get(name)?.shift();
      if (failure) send(failure.status, { ok: false, error: { code: failure.code, message: failure.message ?? failure.code } });
      return Boolean(failure);
    };

    if (req.method === "GET") {
      requests.push({ path: pathname, body: null });
      const status = pathname.match(/^\/v1\/media\/status\/(.+)$/);
      if (status) {
        if (queued("/v1/media/status")) return;
        const job = jobs.get(decodeURIComponent(status[1]!));
        if (!job) return send(404, { ok: false, error: { code: "JOB_NOT_FOUND", message: "Job not found" } });
        job.polls += 1;
        const jobId = decodeURIComponent(status[1]!);
        // One "processing" answer first, as real jobs never finish instantly.
        if (job.polls < 2) return send(200, { ok: true, data: { jobId, model: job.model, status: "processing" } });
        if (job.fail) return send(200, { ok: true, data: { jobId, model: job.model, status: "failed", error: job.fail } });
        void completeJob(job).then(
          ({ costUsd, result }) => send(200, { ok: true, data: { jobId, model: job.model, status: "completed", costUsd, completedAt: new Date().toISOString(), result } }),
          (error: Error) => send(200, { ok: true, data: { jobId, model: job.model, status: "failed", error: `fake: ${error.message}` } }),
        );
        return;
      }
      const gets: Record<string, unknown> = {
        "/v1/account/balance": { balanceCents: 500, balanceUsd: 5, autoTopup: false },
        "/v1/ai/models": { models: [{ id: "openai/gpt-4o-mini", name: "GPT-4o mini", provider: "openai" }] },
      };
      if (pathname in gets) {
        if (queued(pathname)) return;
        return send(200, { ok: true, data: gets[pathname] });
      }
      return send(404, { ok: false, error: { code: "NOT_FOUND", message: `No fake for GET ${pathname}` } });
    }

    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      let body: any = {};
      try {
        body = raw ? JSON.parse(raw) : {};
      } catch {
        return send(400, { ok: false, error: { code: "VALIDATION_ERROR", message: "Invalid JSON" } });
      }
      requests.push({ path: pathname, body });
      if (queued(pathname)) return;
      if (pathname === "/v1/media/queue") {
        if (!body.model || !body.prompt) return send(400, { ok: false, error: { code: "VALIDATION_ERROR", message: "model and prompt are required" } });
        const jobId = randomUUID();
        jobs.set(jobId, { model: body.model, prompt: body.prompt, options: body.options ?? {}, polls: 0, fail: failNext });
        failNext = undefined;
        return send(200, { ok: true, data: { jobId, status: "pending", model: body.model, category: "text-to-image", createdAt: new Date().toISOString() } });
      }
      if (pathname === "/v1/scrape/screenshot") {
        void fakeImage(String(body.url), "16:10").then((image) => send(200, { ok: true, data: { url: body.url, image: image.base64, width: 1024, height: 640 } }));
        return;
      }
      try {
        const data = handle(pathname, body);
        if (data === null) return send(404, { ok: false, error: { code: "NOT_FOUND", message: `No fake for ${pathname}` } });
        send(200, { ok: true, data });
      } catch (error) {
        send(400, { ok: false, error: { code: "VALIDATION_ERROR", message: (error as Error).message } });
      }
    });
  });
  await new Promise<void>((resolve) => server.listen(port, "127.0.0.1", resolve));
  const { port: bound } = server.address() as AddressInfo;
  return {
    server,
    url: `http://127.0.0.1:${bound}`,
    requests,
    failures,
    jobs,
    failNextJob: (message) => {
      failNext = message;
    },
    close: () =>
      new Promise<void>((resolve) => {
        server.closeAllConnections();
        server.close(() => resolve());
      }),
  };
}
