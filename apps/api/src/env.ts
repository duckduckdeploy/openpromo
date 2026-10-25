import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1),
  // Project data (trackers, rankings, audits, AI runs…) lives in its own database. Unset: the same
  // server and credentials as DATABASE_URL, database name + "_data", created if missing.
  DATA_DATABASE_URL: z.string().min(1).optional(),
  API_PORT: z.coerce.number().default(4100),
  API_URL: z.string().url().default("http://localhost:4100"),
  APP_URL: z.string().url().default("http://localhost:3200"),
  WEB_URL: z.string().url().default("http://localhost:3101"),
  AUTH_SECRET: z
    .string()
    .min(32, "AUTH_SECRET must be at least 32 characters")
    .refine((v) => !/change-me/i.test(v), "AUTH_SECRET is still the example value. Set your own random string"),
  ENCRYPTION_KEY: z
    .string()
    .refine((v) => Buffer.from(v, "base64").length === 32, "ENCRYPTION_KEY must be 32 bytes, base64-encoded"),
  YEPAPI_BASE_URL: z.string().url().default("https://api.yepapi.com"),
  // Set to "false" to run the HTTP server without the background worker.
  RUN_WORKER: z.enum(["true", "false"]).default("true"),
  // Proxies in front of the API whose X-Forwarded-For is trusted for the client's address. 0 by
  // default: Next's /api rewrite passes on whatever X-Forwarded-For the visitor sent, so trusting
  // it would let anyone choose their own address.
  TRUST_PROXY_HOPS: z.coerce.number().int().min(0).max(5).default(0),
  // A header your edge proxy sets to the visitor's address and visitors cannot set themselves,
  // e.g. cf-connecting-ip behind Cloudflare or x-real-ip from nginx. Sign-in rate limits use it.
  CLIENT_IP_HEADER: z.string().regex(/^[a-z0-9-]+$/i).optional(),
  // Where generated and uploaded files are kept: a folder (a Docker volume in production).
  MEDIA_DIR: z.string().min(1).default("./data/media"),
  // Renders at once (Chromium + FFmpeg are CPU and memory heavy), and AI media jobs at once.
  RENDER_CONCURRENCY: z.coerce.number().int().min(1).max(8).default(1),
  MEDIA_JOB_CONCURRENCY: z.coerce.number().int().min(1).max(32).default(4),
  // A Chrome or Chromium binary for ingest screenshots and rendering. Unset: the one Puppeteer installed.
  CHROME_PATH: z.string().min(1).optional(),
  // FFmpeg for muxing, posters and durations. Unset: the bundled ffmpeg-static binary, else "ffmpeg" on the PATH.
  FFMPEG_PATH: z.string().min(1).optional(),
  // Lets the website reader open private and local addresses (an intranet site, or tests). Off by
  // default: anyone who can add a project could otherwise make the server fetch internal services.
  INGEST_ALLOW_PRIVATE_NETWORK: z.enum(["true", "false"]).default("false"),
  // Optional S3-compatible object storage for media (Cloudflare R2, AWS S3, MinIO). Unset: local
  // disk only. R2: S3_ENDPOINT=https://<account id>.r2.cloudflarestorage.com, S3_REGION=auto.
  S3_ENDPOINT: z.string().url().optional(),
  S3_BUCKET: z.string().min(1).optional(),
  S3_ACCESS_KEY_ID: z.string().min(1).optional(),
  S3_SECRET_ACCESS_KEY: z.string().min(1).optional(),
  S3_REGION: z.string().min(1).default("auto"),
  // Where the bucket is served publicly (a CDN domain such as https://cdn.example.com). Set: the
  // app and agents get media from there instead of through the API.
  MEDIA_PUBLIC_URL: z.string().url().optional(),
  // Pages read when building a brand profile.
  INGEST_MAX_PAGES: z.coerce.number().int().min(1).max(50).default(8),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  const lines = parsed.error.issues.map((i) => `  ${i.path.join(".")}: ${i.message}`);
  console.error(`Invalid environment:\n${lines.join("\n")}\nSee .env.example.`);
  process.exit(1);
}

export const env = parsed.data;
