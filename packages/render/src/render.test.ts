import { brandProfile, contrast, creationSpec } from "@openpromo/shared";
import { describe, expect, it } from "vitest";
import { captionCues, checkCreation, ensureContrast, imageDocument, toSrt, videoDocument } from "./index";

const brand = brandProfile.parse({
  identity: { name: "Acme <Bakery>", url: "https://acme.example" },
  audience: {},
  positioning: { points: [{ id: "p1", title: "Baked by 6am", detail: "Fresh every morning.", kind: "benefit", source: { quote: "Baked by 6am", url: "https://acme.example" } }], offers: ["20% off your first box"] },
  voice: { avoid: ["cheap"] },
  visual: {
    colors: { background: "#ffffff", text: "#222222", primary: "#ffd400", onPrimary: "#ffffff", accent: "#0044cc", muted: "#888888" },
    fonts: { heading: { family: "Fraunces", google: true }, body: { family: "Work Sans", google: true } },
  },
});

describe("captions", () => {
  it("splits narration into short cues that cover the line in order", () => {
    const cues = captionCues([{ text: "Fresh bread every single morning. Order before noon today.", startMs: 1000, durationMs: 4000 }]);
    expect(cues.length).toBeGreaterThan(1);
    for (const cue of cues) expect(cue.words.length).toBeLessThanOrEqual(4);
    expect(cues[0]!.startMs).toBeGreaterThanOrEqual(1000);
    expect(cues.at(-1)!.endMs).toBeLessThanOrEqual(5000);
    const words = cues.flatMap((c) => c.words);
    for (let i = 1; i < words.length; i++) expect(words[i]!.startMs).toBeGreaterThanOrEqual(words[i - 1]!.endMs);
    // A sentence end closes its cue.
    expect(cues.some((c) => c.words.at(-1)!.text === "morning.")).toBe(true);
  });

  it("writes SubRip with comma milliseconds", () => {
    const srt = toSrt([{ startMs: 1500, endMs: 3250, words: [{ text: "Hello", startMs: 1500, endMs: 2000 }, { text: "there", startMs: 2000, endMs: 3250 }] }]);
    expect(srt).toBe("1\n00:00:01,500 --> 00:00:03,250\nHello there\n");
  });
});

describe("theme", () => {
  it("fixes text that would be unreadable on its background", () => {
    const fixed = ensureContrast("#ffffff", "#ffd400", 4.5);
    expect(contrast(fixed, "#ffd400")).toBeGreaterThanOrEqual(4.5);
  });
});

describe("documents", () => {
  const spec = creationSpec.parse({
    scenes: [
      { id: "a", layout: "hero", text: { headline: "<script>alert(1)</script> & more" } },
      { id: "b", layout: "cta", text: { headline: "Visit us", cta: "Order" }, narration: "Visit us today." },
    ],
  });

  it("escapes every piece of text", () => {
    const html = imageDocument({ brand, spec, format: "square", assets: { files: {} } });
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt; &amp; more");
    expect(html).toContain("Acme &lt;Bakery&gt;");
  });

  it("builds a Hyperframes composition with timed clips, audio and a registered timeline", () => {
    const html = videoDocument({
      brand,
      spec,
      format: "story",
      assets: { files: { v: { path: "assets/v.mp3", video: false } } },
      voice: [{ path: "assets/v.mp3", startMs: 3150, durationMs: 1200 }],
      captions: captionCues([{ text: "Visit us today.", startMs: 3150, durationMs: 1200 }]),
      sceneStarts: [0, 3000],
      sceneDurations: [3000, 2000],
    });
    expect(html).toContain('data-composition-id="openpromo"');
    expect(html).toContain('id="scene-1" data-start="3.000" data-duration="2.000" data-track-index="1"');
    expect(html).toContain('<audio id="vo-0" data-start="3.150"');
    expect(html).toContain('window.__timelines["openpromo"] = tl;');
    expect(html).toContain("tl.set({}, {}, 5.000);");
    expect(html).toContain('class="clip caption"');
  });
});

describe("checks", () => {
  it("flags hype words, unverified figures, missing pictures and a missing hook", () => {
    const spec = creationSpec.parse({
      scenes: [
        { id: "a", layout: "screenshot", text: { headline: "" }, durationMs: 1000 },
        { id: "b", layout: "statement", text: { headline: "Not cheap, 50% better" }, durationMs: 3000, pointIds: ["nope"] },
      ],
    });
    const ids = checkCreation({ type: "reel", spec, brand }).map((c) => c.id);
    expect(ids).toEqual(expect.arrayContaining(["media-missing", "generic-phrase", "figure-unverified", "point-unknown", "hook-missing", "cta-missing"]));
  });

  it("accepts figures that are on the site", () => {
    const spec = creationSpec.parse({ scenes: [{ id: "a", layout: "offer", text: { stat: "20% off", headline: "your first box" } }] });
    expect(checkCreation({ type: "image", spec, brand }).filter((c) => c.id === "figure-unverified")).toEqual([]);
  });
});
