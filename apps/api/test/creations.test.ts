import { brandProfile } from "@openpromo/shared";
import { eq } from "drizzle-orm";
import { describe, expect, it } from "vitest";
import { dataDb, schema } from "../src/db";
import { getApp, readyUser } from "./client";
import { harness } from "./harness";

const log = { info: () => {}, warn: () => {}, error: () => {} };

const BRAND = brandProfile.parse({
  identity: { name: "Crumb & Co", tagline: "Sourdough baked before sunrise", description: "A sourdough bakery in Austin.", url: "https://crumbandco.example" },
  audience: {},
  positioning: {
    points: [
      { id: "p1", title: "Baked before 6am", detail: "Every loaf is baked before 6am.", kind: "benefit", source: { quote: "baked before 6am, every day", url: "https://crumbandco.example/" } },
      { id: "p2", title: "Bread subscription", detail: "A loaf a week for $36 a month.", kind: "offer", source: null },
    ],
    ctas: ["Order for pickup"],
  },
  voice: { sampleLines: ["Bread worth waking up for."] },
  visual: {
    colors: { background: "#fffaf3", text: "#2b1d12", primary: "#c2410c", onPrimary: "#ffffff", accent: "#1d4ed8", muted: "#7c6a5a" },
    fonts: { heading: { family: "Fraunces", google: true }, body: { family: "Work Sans", google: true } },
  },
});

/** A user with a project whose brand profile is ready (no website read needed). */
async function brandedProject() {
  const user = await readyUser();
  await dataDb.update(schema.projects).set({ brand: BRAND, brandStatus: "ready" }).where(eq(schema.projects.id, user.project.id));
  return user;
}

async function runQueued(name: string) {
  if (!harness.jobs.has(name)) await import(name === "render.run" ? "../src/jobs/render" : "../src/jobs/brand");
  const job = [...harness.enqueued].reverse().find((j) => j.name === name)!;
  await harness.jobs.get(name)!(job.data, log);
}

describe("ideas and creations", () => {
  it("refuses to write before the brand profile is ready", async () => {
    const { api, project } = await readyUser();
    const res = await api.post(`/projects/${project.id}/ideas`, { count: 3 });
    expect(res.status).toBe(409);
  });

  it("writes ideas and turns one into an image, with checks and a live preview", async () => {
    const { api, project } = await brandedProject();
    const ideas = await api.ok<{ id: string; title: string; status: string }[]>("POST", `/projects/${project.id}/ideas`, { count: 2 });
    expect(ideas.length).toBe(2);
    expect((await api.ok<unknown[]>("GET", `/projects/${project.id}/ideas`)).length).toBe(2);

    const creation = await api.ok("POST", `/projects/${project.id}/creations`, { type: "image", ideaId: ideas[0]!.id });
    expect(creation).toMatchObject({ type: "image", format: "square", status: "ready" });
    expect(creation.spec.scenes).toHaveLength(1);
    expect((await api.ok<{ status: string }[]>("GET", `/projects/${project.id}/ideas`)).find((i: any) => i.id === ideas[0]!.id)?.status).toBe("used");

    // Edits are validated and checked again: hype words and invented figures are flagged.
    const spec = structuredClone(creation.spec);
    spec.scenes[0].layout = "statement";
    spec.scenes[0].text.headline = "Revolutionize breakfast: 50% off";
    const edited = await api.ok("PUT", `/creations/${creation.id}`, { spec });
    const ids = edited.checks.map((c: { id: string }) => c.id);
    expect(ids).toContain("generic-phrase");
    expect(ids).toContain("figure-unverified");

    const app = await getApp();
    // Signed out, the preview is refused like any other route.
    expect((await app.inject({ method: "GET", url: `/api/creations/${creation.id}/preview` })).statusCode).toBe(401);
    const html = await api.request("GET", `/api/creations/${creation.id}/preview?scene=0`);
    expect(html.status).toBe(200);
    expect(html.body.raw).toContain("Revolutionize breakfast");
    expect(html.headers["content-security-policy"]).toContain("default-src 'none'");
  });

  it("renders an image to PNG and a carousel to PNG slides plus a PDF", { timeout: 120_000 }, async () => {
    const { api, project } = await brandedProject();
    const image = await api.ok("POST", `/projects/${project.id}/creations`, { type: "image", format: "portrait", brief: "Morning bread", allowGenerated: false });
    const render = await api.ok("POST", `/creations/${image.id}/renders`, {});
    expect(render.status).toBe("queued");
    expect((await api.post(`/creations/${image.id}/renders`, {})).status).toBe(409);
    await runQueued("render.run");
    const done = await api.ok("GET", `/renders/${render.id}`);
    expect(done).toMatchObject({ status: "done", progress: 100 });
    const [png] = await dataDb.select().from(schema.assets).where(eq(schema.assets.id, done.outputAssetIds[0]));
    expect(png).toMatchObject({ mime: "image/png", width: 1080, height: 1350, role: "output" });
    const file = await api.request("GET", `/api/assets/${png!.id}/file`);
    expect(file.status).toBe(200);
    expect(file.headers["content-type"]).toBe("image/png");

    const carousel = await api.ok("POST", `/projects/${project.id}/creations`, { type: "carousel", brief: "Why our bread", allowGenerated: false });
    const slides = await api.ok("POST", `/creations/${carousel.id}/renders`, {});
    await runQueued("render.run");
    const finished = await api.ok("GET", `/renders/${slides.id}`);
    const outputs = await dataDb.select().from(schema.assets).where(eq(schema.assets.creationId, carousel.id));
    expect(finished.outputAssetIds).toHaveLength(carousel.spec.scenes.length + 1);
    expect(outputs.filter((a) => a.mime === "image/png")).toHaveLength(carousel.spec.scenes.length);
    expect(outputs.find((a) => a.mime === "application/pdf")).toBeTruthy();
  });

  it("refuses to render while a check reports an error", async () => {
    const { api, project } = await brandedProject();
    const image = await api.ok("POST", `/projects/${project.id}/creations`, { type: "image", brief: "x", allowGenerated: false });
    const spec = structuredClone(image.spec);
    spec.scenes[0].layout = "screenshot";
    spec.scenes[0].media = null;
    await api.ok("PUT", `/creations/${image.id}`, { spec });
    const res = await api.post(`/creations/${image.id}/renders`, {});
    expect(res.status).toBe(400);
    expect(res.body.error?.message).toMatch(/no picture/);
  });

  it("renders a reel with generated backdrop, voiceover, music and captions", { timeout: 300_000 }, async () => {
    const { api, project } = await brandedProject();
    const reel = await api.ok("POST", `/projects/${project.id}/creations`, { type: "reel", brief: "Morning bread reel" });
    expect(reel.format).toBe("story");
    // Keep it short and ask for one generated backdrop.
    const spec = structuredClone(reel.spec);
    spec.scenes = spec.scenes.slice(0, 2).map((s: any, i: number) => ({ ...s, layout: "statement", durationMs: 1500, narration: i === 0 ? "Bread baked before six." : "Order for pickup today.", background: null, media: null }));
    spec.scenes[0].background = { assetId: null, generate: { kind: "image", prompt: "warm bakery counter at dawn", model: null }, fit: "cover", focus: null };
    spec.scenes[1].text.cta = "Order for pickup";
    await api.ok("PUT", `/creations/${reel.id}`, { spec });

    const render = await api.ok("POST", `/creations/${reel.id}/renders`, { quality: "draft" });
    await runQueued("render.run");
    const done = await api.ok("GET", `/renders/${render.id}`);
    expect(done.status, done.error).toBe("done");
    const [video] = await dataDb.select().from(schema.assets).where(eq(schema.assets.id, done.outputAssetIds[0]));
    expect(video).toMatchObject({ mime: "video/mp4", width: 1080, height: 1920 });
    expect(video!.durationMs).toBeGreaterThan(2500);
    expect(done.posterAssetId).toBeTruthy();
    expect(done.captionsAssetId).toBeTruthy();

    // Generated pieces went back into the spec, so rendering again pays for nothing new.
    const after = await api.ok("GET", `/creations/${reel.id}`);
    expect(after.spec.scenes[0].background.assetId).toBeTruthy();
    expect(after.spec.audio.music.assetId).toBeTruthy();
    const queued = harness.fake.requests.filter((r) => r.path === "/v1/media/queue").length;
    await api.ok("POST", `/creations/${reel.id}/renders`, { quality: "draft" });
    await runQueued("render.run");
    expect(harness.fake.requests.filter((r) => r.path === "/v1/media/queue").length).toBe(queued);
  });

  it("animates a picture into a clip, sending it as the clip's first frame", { timeout: 300_000 }, async () => {
    const { api, project } = await brandedProject();
    const { saveAsset } = await import("../src/lib/media-store");
    const sharp = (await import("sharp")).default;
    const photo = await saveAsset({
      projectId: project.id,
      source: "upload",
      role: "photo",
      name: "Counter",
      bytes: await sharp({ create: { width: 1200, height: 900, channels: 3, background: "#c2410c" } }).png().toBuffer(),
      mime: "image/png",
    });
    const reel = await api.ok("POST", `/projects/${project.id}/creations`, { type: "reel", brief: "Counter" });
    const spec = structuredClone(reel.spec);
    spec.scenes = [{ ...spec.scenes[0], layout: "statement", durationMs: 1500, narration: "", text: { ...spec.scenes[0].text, cta: "Order" }, media: null }];
    spec.scenes[0].background = { assetId: null, generate: { kind: "video", prompt: "gentle push-in", model: null, sourceAssetId: photo.id }, fit: "cover", focus: null };
    spec.audio.voice.enabled = false;
    spec.audio.music.prompt = "";
    await api.ok("PUT", `/creations/${reel.id}`, { spec });

    await api.ok("POST", `/creations/${reel.id}/renders`, { quality: "draft" });
    await runQueued("render.run");
    const submit = harness.fake.requests.filter((r) => r.path === "/v1/media/queue").at(-1)!;
    expect(submit.body).toMatchObject({ model: "google/veo-3-lite", options: { aspectRatio: "9:16", duration: "6" } });
    const frame = await sharp(Buffer.from(submit.body.imageData.base64, "base64")).metadata();
    expect([frame.width, frame.height]).toEqual([720, 1280]);

    const after = await api.ok("GET", `/creations/${reel.id}`);
    expect(after.renders[0].status, after.renders[0].error).toBe("done");
    const [clip] = await dataDb.select().from(schema.assets).where(eq(schema.assets.id, after.spec.scenes[0].background.assetId));
    expect(clip).toMatchObject({ kind: "video", role: "broll", source: "generated" });
  });
});
