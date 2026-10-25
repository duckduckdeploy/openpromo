import { AwsClient } from "aws4fetch";
import { env } from "../env";

/**
 * S3-compatible object storage (Cloudflare R2, AWS S3, MinIO…) for media files. Optional: without
 * S3_BUCKET, files live on the local disk only. With it, every file is uploaded on save, the local
 * copy is a cache (renders read files from disk), and MEDIA_PUBLIC_URL, when set, serves files
 * from a CDN such as an R2 bucket on a custom Cloudflare domain.
 *
 * Object keys are "<projectId>/<assetId>.<ext>": two random UUIDs, so a public CDN URL cannot be
 * guessed, only shared.
 */

let client: AwsClient | null = null;

export const objectStorageEnabled = () => Boolean(env.S3_BUCKET && env.S3_ENDPOINT && env.S3_ACCESS_KEY_ID && env.S3_SECRET_ACCESS_KEY);

function s3(): AwsClient {
  client ??= new AwsClient({
    accessKeyId: env.S3_ACCESS_KEY_ID!,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY!,
    region: env.S3_REGION,
    service: "s3",
  });
  return client;
}

const objectUrl = (key: string) =>
  `${env.S3_ENDPOINT!.replace(/\/+$/, "")}/${encodeURIComponent(env.S3_BUCKET!)}/${key.split("/").map(encodeURIComponent).join("/")}`;

async function check(response: Response, what: string): Promise<Response> {
  if (response.ok) return response;
  const body = await response.text().catch(() => "");
  throw new Error(`Object storage ${what} failed: HTTP ${response.status} ${body.slice(0, 200)}`);
}

/** Uploads a file. Files never change once written, so caches may keep them for a year. */
export async function putObject(key: string, bytes: Uint8Array, mime: string): Promise<void> {
  await check(
    await s3().fetch(objectUrl(key), {
      method: "PUT",
      body: bytes,
      headers: { "content-type": mime, "cache-control": "public, max-age=31536000, immutable" },
    }),
    `upload of ${key}`,
  );
}

export async function getObject(key: string): Promise<Uint8Array | null> {
  const response = await s3().fetch(objectUrl(key));
  if (response.status === 404) return null;
  await check(response, `download of ${key}`);
  return new Uint8Array(await response.arrayBuffer());
}

export async function deleteObject(key: string): Promise<void> {
  const response = await s3().fetch(objectUrl(key), { method: "DELETE" });
  if (response.status !== 404) await check(response, `delete of ${key}`);
}

/** Every key under a prefix (a project's folder), page by page. */
export async function listObjects(prefix: string): Promise<string[]> {
  const keys: string[] = [];
  let token: string | undefined;
  do {
    const url = new URL(`${env.S3_ENDPOINT!.replace(/\/+$/, "")}/${encodeURIComponent(env.S3_BUCKET!)}`);
    url.searchParams.set("list-type", "2");
    url.searchParams.set("prefix", prefix);
    if (token) url.searchParams.set("continuation-token", token);
    const xml = await (await check(await s3().fetch(url.href), `listing of ${prefix}`)).text();
    for (const match of xml.matchAll(/<Key>([^<]+)<\/Key>/g)) keys.push(match[1]!.replace(/&amp;/g, "&"));
    token = /<IsTruncated>true<\/IsTruncated>/.test(xml) ? xml.match(/<NextContinuationToken>([^<]+)<\/NextContinuationToken>/)?.[1] : undefined;
  } while (token);
  return keys;
}

/** The CDN address of a file, when MEDIA_PUBLIC_URL is set. */
export function publicUrl(key: string): string | null {
  if (!env.MEDIA_PUBLIC_URL || !objectStorageEnabled()) return null;
  return `${env.MEDIA_PUBLIC_URL.replace(/\/+$/, "")}/${key.split("/").map(encodeURIComponent).join("/")}`;
}
