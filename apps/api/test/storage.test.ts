import { rm } from "node:fs/promises";
import { afterAll, describe, expect, it, vi } from "vitest";

// A minimal S3 stand-in: PUT, GET, DELETE and ListObjectsV2 on one bucket, in memory. It is started
// and wired into the environment before the app (and its env) is imported.
const s3 = await vi.hoisted(async () => {
  const { createServer: create } = await import("node:http");
  const objects = new Map<string, { body: Buffer; type: string }>();
  const server = create((req, res) => {
    const url = new URL(req.url ?? "/", "http://s3.local");
    const [, bucket, ...rest] = url.pathname.split("/");
    const key = rest.map(decodeURIComponent).join("/");
    if (bucket !== "media" || !req.headers.authorization?.startsWith("AWS4-HMAC-SHA256")) return void res.writeHead(403).end();
    if (req.method === "GET" && !key && url.searchParams.get("list-type") === "2") {
      const prefix = url.searchParams.get("prefix") ?? "";
      const keys = [...objects.keys()].filter((k) => k.startsWith(prefix));
      return void res.writeHead(200, { "content-type": "application/xml" }).end(`<ListBucketResult>${keys.map((k) => `<Contents><Key>${k}</Key></Contents>`).join("")}<IsTruncated>false</IsTruncated></ListBucketResult>`);
    }
    if (req.method === "PUT") {
      const chunks: Buffer[] = [];
      req.on("data", (c) => chunks.push(c)).on("end", () => {
        objects.set(key, { body: Buffer.concat(chunks), type: String(req.headers["content-type"]) });
        res.writeHead(200).end();
      });
      return;
    }
    if (req.method === "GET") {
      const object = objects.get(key);
      return void (object ? res.writeHead(200, { "content-type": object.type }).end(object.body) : res.writeHead(404).end());
    }
    if (req.method === "DELETE") {
      objects.delete(key);
      return void res.writeHead(204).end();
    }
    res.writeHead(405).end();
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const url = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
  Object.assign(process.env, {
    S3_ENDPOINT: url,
    S3_BUCKET: "media",
    S3_ACCESS_KEY_ID: "test-access",
    S3_SECRET_ACCESS_KEY: "test-secret",
    MEDIA_PUBLIC_URL: "https://cdn.example.test",
  });
  return { server, objects };
});

const { absolutePath, saveAsset } = await import("../src/lib/media-store");
const { readyUser } = await import("./client");

afterAll(() => new Promise<void>((resolve) => s3.server.close(() => resolve())));

describe("object storage and CDN", () => {
  it("uploads files on save, sends viewers to the CDN, streams downloads and refills a lost local copy", async () => {
    const { api, project } = await readyUser();
    const bytes = Buffer.from("RIFF fake video bytes");
    const asset = await saveAsset({ projectId: project.id, source: "upload", role: "broll", name: "Clip", bytes, mime: "video/webm" });
    expect(s3.objects.get(asset.path)?.body.equals(bytes)).toBe(true);
    expect(s3.objects.get(asset.path)?.type).toBe("video/webm");

    const view = await api.request("GET", `/api/assets/${asset.id}/file`);
    expect(view.status).toBe(302);
    expect(view.headers.location).toBe(`https://cdn.example.test/${asset.path}`);

    // This server lost its copy (a new server, a cleaned cache): the download comes from the bucket.
    await rm(absolutePath(asset.path), { force: true });
    const download = await api.request("GET", `/api/assets/${asset.id}/file?download=1`);
    expect(download.status).toBe(200);
    expect(download.headers["content-disposition"]).toContain("attachment");

    await api.ok("DELETE", `/projects/${project.id}`);
    expect([...s3.objects.keys()].some((k) => k.startsWith(`${project.id}/`))).toBe(false);
  });
});
