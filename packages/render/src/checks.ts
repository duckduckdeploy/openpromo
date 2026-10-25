import { CREATION_TYPES, GENERIC_PHRASES, type BrandProfile, type CreationSpec, type CreationType, type Scene } from "@openpromo/shared";

/**
 * Checks a creation before it is rendered: things that make promo media worse or untrue. Errors
 * should be fixed; warnings are worth a look. Overflowing text is measured by the renderer
 * itself (the fit pass) and reported from there.
 */

export type Check = { id: string; level: "error" | "warning"; message: string; target?: string };

const sceneWords = (s: Pick<Scene, "text">) =>
  [s.text.eyebrow, s.text.headline, s.text.body, s.text.stat, s.text.cta, s.text.attribution, ...s.text.bullets].join(" ").split(/\s+/).filter(Boolean).length;

/** Seconds a viewer needs to read a scene: about 4 words a second plus a beat to notice it. */
export const readingSeconds = (s: Pick<Scene, "text">) => 0.8 + sceneWords(s) / 4;

/** Narration speed above this (words per second) sounds rushed. */
const MAX_WORDS_PER_SECOND = 3.1;

/** Figures (prices, percentages, counts) that a claim depends on. */
const FIGURE = /(?:[$€£]\s?\d[\d,.]*|\d[\d,.]*\s?(?:%|x\b|k\b|\+|hours?|days?|minutes?|mins?|years?|customers?|users?|stars?))/gi;

/** All the text the brand profile was built from, for grounding checks. */
export function groundingText(brand: BrandProfile, pages: string[] = []): string {
  return [
    brand.identity.tagline,
    brand.identity.description,
    ...brand.positioning.points.flatMap((p) => [p.title, p.detail, p.source?.quote ?? ""]),
    ...brand.positioning.offers,
    ...brand.positioning.ctas,
    ...brand.products.flatMap((p) => [p.name, p.description, p.price ?? ""]),
    ...brand.voice.sampleLines,
    ...pages,
  ]
    .join("\n")
    .toLowerCase()
    // "four days" on the site backs "4 days" on screen.
    .replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty|thirty|forty|fifty|sixty|hundred)\b/g, (word) => String(NUMBER_WORDS[word]));
}

const NUMBER_WORDS: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
  fifteen: 15, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, hundred: 100,
};

const normaliseFigure = (s: string) => s.toLowerCase().replace(/[\s,]/g, "");

export function checkCreation(input: { type: CreationType; spec: CreationSpec; brand: BrandProfile; pages?: string[] }): Check[] {
  const { spec, brand } = input;
  const checks: Check[] = [];
  const isVideo = CREATION_TYPES[input.type].video;
  const pointIds = new Set(brand.positioning.points.map((p) => p.id));
  const source = groundingText(brand, input.pages).replace(/[\s,]/g, "");
  const avoid = [...GENERIC_PHRASES, ...brand.voice.avoid.map((w) => w.toLowerCase())];

  spec.scenes.forEach((scene, i) => {
    const target = scene.id;
    const label = `Scene ${i + 1}`;
    const visible = [scene.text.eyebrow, scene.text.headline, scene.text.body, scene.text.stat, scene.text.cta, ...scene.text.bullets].join(" ");

    if (!scene.text.headline.trim() && !["screenshot", "product"].includes(scene.layout) && !(scene.layout === "offer" && scene.text.stat)) {
      checks.push({ id: "headline-missing", level: "error", message: `${label} has no headline.`, target });
    }
    if (["screenshot", "product", "split"].includes(scene.layout) && !scene.media?.assetId && !scene.media?.generate) {
      checks.push({ id: "media-missing", level: "error", message: `${label} is a ${scene.layout} layout but has no picture.`, target });
    }
    if (scene.layout === "list" && scene.text.bullets.length < 2) {
      checks.push({ id: "list-short", level: "warning", message: `${label} is a list with fewer than two points.`, target });
    }

    for (const phrase of avoid) {
      if (phrase && new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(`${visible} ${scene.narration}`)) {
        checks.push({ id: "generic-phrase", level: "warning", message: `${label} says “${phrase}”, which reads as generic or off-brand. Say what it actually does.`, target });
      }
    }

    for (const id of scene.pointIds) {
      if (!pointIds.has(id)) checks.push({ id: "point-unknown", level: "error", message: `${label} refers to a selling point that is not in the brand profile.`, target });
    }
    // A figure on screen should come from the site; invented numbers are the riskiest claims.
    for (const figure of `${visible} ${scene.narration}`.match(FIGURE) ?? []) {
      if (!source.includes(normaliseFigure(figure))) {
        checks.push({ id: "figure-unverified", level: "warning", message: `${label} says “${figure.trim()}”, which is not on the website. Check it is true.`, target });
      }
    }

    if (isVideo) {
      const seconds = scene.durationMs / 1000;
      const needed = readingSeconds(scene);
      if (seconds < needed) {
        checks.push({ id: "reading-time", level: "warning", message: `${label} is on screen for ${seconds.toFixed(1)}s but needs about ${needed.toFixed(1)}s to read.`, target });
      }
      const spoken = scene.narration.split(/\s+/).filter(Boolean).length;
      if (spoken && spoken / seconds > MAX_WORDS_PER_SECOND && spec.audio.voice.enabled) {
        checks.push({ id: "narration-fast", level: "warning", message: `${label}'s voiceover (${spoken} words) is too fast for ${seconds.toFixed(1)}s; it will be stretched or should be shortened.`, target });
      }
    }
  });

  if (isVideo) {
    const first = spec.scenes[0];
    if (first && !first.text.headline.trim() && !first.narration.trim()) {
      checks.push({ id: "hook-missing", level: "error", message: "The first scene needs a hook: a headline or a spoken line in the first two seconds.", target: first.id });
    }
    const last = spec.scenes.at(-1);
    if (last && !last.text.cta.trim() && last.layout !== "cta") {
      checks.push({ id: "cta-missing", level: "warning", message: "The video ends without a call to action.", target: last.id });
    }
    if (spec.audio.voice.enabled && !spec.scenes.some((s) => s.narration.trim())) {
      checks.push({ id: "voice-empty", level: "warning", message: "Voiceover is on but no scene has narration." });
    }
  }

  // The same message for the same scene once is enough.
  const seen = new Set<string>();
  return checks.filter((c) => {
    const key = `${c.id}|${c.target}|${c.message}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
