import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { eq } from "drizzle-orm";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { dataDb, schema } from "../src/db";
import { readyUser, signUp, YEP_KEY } from "./client";
import { harness } from "./harness";

/** A small bakery website: a logo, brand colours, a Google font, nav links and product data. */
const PAGES: Record<string, string> = {
  "/": `<!doctype html><html lang="en"><head><title>Crumb & Co — Sourdough bakery in Austin</title>
    <meta name="description" content="Naturally leavened bread, baked before 6am every day.">
    <meta name="theme-color" content="#c2410c">
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600&family=Work+Sans&display=swap" rel="stylesheet">
    <style>
      body { margin: 0; background: #fffaf3; color: #2b1d12; font-family: "Work Sans", sans-serif; }
      header { display: flex; justify-content: space-between; padding: 20px; }
      h1, h2 { font-family: "Fraunces", serif; }
      .btn { background: #c2410c; color: #ffffff; padding: 14px 22px; border-radius: 999px; text-decoration: none; display: inline-block; }
      main { padding: 40px; min-height: 900px; }
    </style>
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"Product","name":"Country Sourdough","description":"Our everyday loaf.","image":"/loaf.svg","offers":{"@type":"Offer","price":"9","priceCurrency":"USD"}}</script>
    </head><body>
    <header><a href="/" class="logo"><svg width="140" height="40" viewBox="0 0 140 40"><rect width="40" height="40" rx="8" fill="#c2410c"/><text x="50" y="27" font-size="18" fill="currentColor">Crumb</text></svg></a>
      <nav><a href="/about">About us</a> <a href="/pricing">Pricing</a> <a href="/login">Log in</a></nav></header>
    <main><h1>Sourdough baked before sunrise</h1>
      <p>Every loaf is naturally leavened for 36 hours and baked before 6am, every day.</p>
      <a class="btn" href="/order">Order for pickup</a>
      <h2>Why Crumb & Co</h2><ul><li>Organic flour milled in Texas</li><li>Free pickup in East Austin</li></ul>
      <blockquote>“The best bread in Austin, hands down.” — Austin Chronicle</blockquote>
    </main></body></html>`,
  "/about": `<!doctype html><html><head><title>About Crumb & Co</title></head><body><main><h1>Our story</h1><p>We started baking in a garage in 2019 and opened our East Austin bakery in 2021.</p><p>Our team of six bakes around 400 loaves a day.</p></main></body></html>`,
  "/pricing": `<!doctype html><html><head><title>Pricing</title></head><body><main><h1>Bread subscription</h1><p>Get a fresh loaf every week for $36 a month. Pause or cancel any time.</p></main></body></html>`,
  "/loaf.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="#e9c46a"/></svg>`,
};

let site: Server;
let siteUrl = "";

beforeAll(async () => {
  site = createServer((req, res) => {
    const page = PAGES[(req.url ?? "/").split("?")[0]!];
    if (!page) return void res.writeHead(404).end("not found");
    res.writeHead(200, { "content-type": req.url?.endsWith(".svg") ? "image/svg+xml" : "text/html; charset=utf-8" });
    res.end(page);
  });
  await new Promise<void>((resolve) => site.listen(0, "127.0.0.1", resolve));
  siteUrl = `http://127.0.0.1:${(site.address() as AddressInfo).port}/`;
});
afterAll(() => new Promise<void>((resolve) => site.close(() => resolve())));

async function ingest(projectId: string) {
  const handler = harness.jobs.get("brand.ingest");
  if (!handler) {
    await import("../src/jobs/brand");
  }
  await harness.jobs.get("brand.ingest")!({ projectId }, { info: () => {}, warn: () => {}, error: () => {} });
}

describe("brand profile", () => {
  it("needs a YepAPI key before a website can be added", async () => {
    const { api } = await signUp();
    const res = await api.post("/projects", { url: siteUrl });
    expect(res.status).toBe(400);
    expect(res.body.error?.code).toBe("yepapi_key_missing");
  });

  it("refuses addresses that are not websites", async () => {
    const { api } = await readyUser();
    expect((await api.post("/projects", { url: "ftp://files.example.com" })).status).toBe(400);
    expect((await api.post("/projects", { url: "not a site at all" })).status).toBe(400);
  });

  it("reads a website into a brand profile: colours, fonts, logo, pages, screenshots and grounded points", { timeout: 120_000 }, async () => {
    const { api } = await signUp();
    await api.ok("PUT", "/settings/yepapi-key", { apiKey: YEP_KEY });
    const created = await api.ok<{ id: string; brandStatus: string }>("POST", "/projects", { url: siteUrl });
    expect(created.brandStatus).toBe("ingesting");
    expect(harness.enqueued.at(-1)).toEqual({ name: "brand.ingest", data: { projectId: created.id } });

    await ingest(created.id);
    const project = await api.ok("GET", `/projects/${created.id}`);
    expect(project.brandStatus).toBe("ready");
    const brand = project.brand;

    // Visual identity comes from the page itself.
    expect(brand.visual.colors.primary).toBe("#c2410c");
    expect(brand.visual.colors.onPrimary).toBe("#ffffff");
    expect(brand.visual.colors.background).toBe("#fffaf3");
    expect(brand.visual.fonts.heading).toMatchObject({ family: "Fraunces", google: true });
    expect(brand.visual.fonts.body).toMatchObject({ family: "Work Sans", google: true });
    expect(brand.visual.logoAssetId).toBeTruthy();

    // The pages it read: the homepage plus the linked about and pricing pages, never the login page.
    const pages = await api.ok<{ url: string; markdown: string }[]>("GET", `/projects/${created.id}/pages`);
    const paths = pages.map((p) => new URL(p.url).pathname).sort();
    expect(paths).toEqual(["/", "/about", "/pricing"]);
    expect(pages.find((p) => new URL(p.url).pathname === "/")!.markdown).toContain("# Sourdough baked before sunrise");

    const assets = await api.ok<{ role: string; mime: string; width: number }[]>("GET", `/projects/${created.id}/assets`);
    expect(assets.filter((a) => a.role === "screenshot").length).toBeGreaterThanOrEqual(3);
    expect(assets.find((a) => a.role === "logo")).toMatchObject({ mime: "image/png" });
    expect(assets.find((a) => a.role === "product")).toBeTruthy();

    // The fake model quotes nothing that is on the site, so no selling point keeps a source.
    expect(brand.positioning.points.length).toBeGreaterThan(0);
    expect(brand.positioning.points.every((p: { source: unknown }) => p.source === null)).toBe(true);

    // The chat request carried the page text and a screenshot.
    const chat = harness.fake.requests.filter((r) => r.path === "/v1/ai/chat").at(-1)!;
    const parts = chat.body.messages[1].content as { type: string; text?: string }[];
    expect(parts.find((p) => p.type === "text")?.text).toContain("baked before 6am");
    expect(parts.some((p) => p.type === "image_url")).toBe(true);
  });

  it("keeps fields edited by hand when the site is read again", { timeout: 120_000 }, async () => {
    const { api } = await signUp();
    await api.ok("PUT", "/settings/yepapi-key", { apiKey: YEP_KEY });
    const created = await api.ok<{ id: string }>("POST", "/projects", { url: siteUrl });
    await ingest(created.id);
    const { brand } = await api.ok("GET", `/projects/${created.id}`);

    const edited = { ...brand, identity: { ...brand.identity, tagline: "Bread worth waking up for" }, voice: { ...brand.voice, tone: "playful" } };
    const saved = await api.ok("PUT", `/projects/${created.id}/brand`, { brand: edited });
    expect(saved.brand.edited).toEqual(expect.arrayContaining(["identity.tagline", "voice.tone"]));

    await api.ok("POST", `/projects/${created.id}/brand/refresh`, {});
    expect((await api.post(`/projects/${created.id}/brand/refresh`, {})).status).toBe(409);
    await ingest(created.id);
    const again = await api.ok("GET", `/projects/${created.id}`);
    expect(again.brand.identity.tagline).toBe("Bread worth waking up for");
    expect(again.brand.voice.tone).toBe("playful");
  });

  it("records a failure on the project instead of losing it", { timeout: 60_000 }, async () => {
    const { api } = await signUp();
    await api.ok("PUT", "/settings/yepapi-key", { apiKey: YEP_KEY });
    const created = await api.ok<{ id: string }>("POST", "/projects", { url: siteUrl });
    harness.fake.failures.set("/v1/ai/chat", [{ status: 402, code: "NO_CREDITS" }]);
    await expect(ingest(created.id)).rejects.toBeTruthy();
    const [row] = await dataDb.select().from(schema.projects).where(eq(schema.projects.id, created.id));
    expect(row?.brandStatus).toBe("failed");
    expect(row?.brandError).toMatch(/out of credits/);
  });
});
