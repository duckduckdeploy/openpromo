import {
  type CaptionPreset,
  CHANNELS,
  CREATION_TYPES,
  creationSpec,
  GENERIC_PHRASES,
  IDEA_GOALS,
  MEDIA_FORMATS,
  SCENE_LAYOUTS,
  type BrandProfile,
  type CreationSpec,
  type CreationType,
  type IdeaGoal,
  type MediaFormat,
} from "@openpromo/shared";
import { readingSeconds } from "@openpromo/render";
import type { YepApi } from "@openpromo/yepapi";
import { z } from "zod";
import { chatJson, TEXT_MODELS } from "../lib/ai";
import { AppError } from "../lib/errors";

/**
 * The writers: post ideas, and the scenes of an image, carousel, reel, promo video or tutorial,
 * all from the brand profile. They only use what the profile says, pick real assets (screenshots,
 * product photos) before asking for generated ones, and follow the creative rules below.
 */

const CREATIVE_RULES = `Creative rules:
- Hook first: the first scene (or slide) must stop the scroll within 2 seconds with a specific, concrete line.
- One idea per scene. Short lines: headlines under 8 words, body under 20.
- Show the real product: prefer the business's own screenshots and product photos over generated pictures.
- Every claim must come from the brand profile. Never invent numbers, prices, reviews, customers or features. Reference the selling points you use by id.
- Speak like the brand (tone and sample lines). Never use: ${GENERIC_PHRASES.slice(0, 12).join(", ")}.
- End with one clear call to action, using the brand's own CTA wording when it has one.`;

export type AssetSummary = { id: string; role: string; name: string; url?: string; device?: string; width?: number | null; height?: number | null };

/** The brand profile as a compact brief for a writer. */
export function brandBrief(brand: BrandProfile): string {
  const points = brand.positioning.points.map((p) => `  [${p.id}] (${p.kind}) ${p.title}${p.detail ? `: ${p.detail}` : ""}${p.source ? "" : " (unverified)"}`).join("\n");
  return [
    `Business: ${brand.identity.name}. ${brand.identity.tagline}`,
    `What it is: ${brand.identity.description} (${brand.identity.category})`,
    `Website: ${brand.identity.url}`,
    brand.audience.segments.length ? `Audience:\n${brand.audience.segments.map((s) => `  - ${s.who}: wants ${s.outcome}; struggles with ${s.pain}`).join("\n")}` : "",
    brand.audience.objections.length ? `Objections to answer: ${brand.audience.objections.join("; ")}` : "",
    `Selling points (cite by id):\n${points || "  (none yet)"}`,
    brand.positioning.offers.length ? `Current offers: ${brand.positioning.offers.join("; ")}` : "",
    brand.positioning.ctas.length ? `Their CTAs: ${brand.positioning.ctas.join(" | ")}` : "",
    brand.products.length ? `Products:\n${brand.products.map((p) => `  - ${p.name}${p.price ? ` (${p.price})` : ""}: ${p.description}`).join("\n")}` : "",
    `Voice: ${brand.voice.tone}; ${brand.voice.casual > 60 ? "casual" : brand.voice.casual < 40 ? "formal" : "neutral"}, ${brand.voice.playful > 60 ? "playful" : "serious"}. Sample lines: ${brand.voice.sampleLines.map((l) => `"${l}"`).join(" ")}`,
    brand.voice.avoid.length ? `Never say: ${brand.voice.avoid.join(", ")}` : "",
    brand.flows.length ? `Getting-started flows:\n${brand.flows.map((f) => `  - ${f.title}: ${f.steps.join(" → ")}`).join("\n")}` : "",
    `Look: a ${brand.visual.theme} site; brand colour ${brand.visual.colors.primary}${brand.visual.typography ? `; type: ${brand.visual.typography}` : ""}.`,
    brand.visual.imageryStyle.length ? `Imagery style: ${brand.visual.imageryStyle.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

// ── Ideas ─────────────────────────────────────────────────────────────────

const ideasSchema = z.object({
  ideas: z.array(
    z.object({
      title: z.string().min(3).describe("Working title, under 8 words"),
      goal: z.enum(Object.keys(IDEA_GOALS) as [IdeaGoal, ...IdeaGoal[]]),
      type: z.enum(["image", "carousel", "reel", "promo", "tutorial"]),
      channel: z.enum(CHANNELS),
      hook: z.string().min(5).describe("The opening line or headline that stops the scroll"),
      body: z.string().describe("What the post shows, in 1–3 sentences"),
      caption: z.string().min(10).describe("The post caption, ready to paste, in the brand's voice, 1–4 short lines"),
      hashtags: z.array(z.string()).describe("3–8 relevant hashtags without #"),
      cta: z.string(),
      pointIds: z.array(z.string()).describe("Ids of the selling points this idea relies on"),
    }),
  ).min(1),
});
export type DraftIdea = z.infer<typeof ideasSchema>["ideas"][number];

export async function writeIdeas(
  yep: YepApi,
  input: { brand: BrandProfile; count: number; goal?: IdeaGoal; channel?: string; type?: CreationType; notes?: string; avoidTitles?: string[] },
): Promise<{ ideas: DraftIdea[]; costUsd: number }> {
  const asks = [
    `Write ${input.count} distinct social media post ideas for this business.`,
    input.goal ? `Goal: ${IDEA_GOALS[input.goal]}.` : "Mix goals: launches, offers, education, social proof, feature spotlights and behind the scenes, as the profile supports.",
    input.channel ? `Channel: ${input.channel}.` : "Spread them over Instagram, TikTok, LinkedIn and YouTube Shorts as suits each idea.",
    input.type ? `Every idea is made as a ${CREATION_TYPES[input.type].label.toLowerCase()}.` : "Choose the best format for each: image, carousel, reel, promo video or tutorial.",
    input.notes ? `Notes from the business: ${input.notes}` : "",
    input.avoidTitles?.length ? `Do not repeat these existing ideas: ${input.avoidTitles.slice(0, 40).join("; ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const { data, costUsd } = await chatJson(yep, {
    model: TEXT_MODELS.write,
    system: `You are a social media strategist who writes specific, scroll-stopping posts for small businesses.\n\n${CREATIVE_RULES}`,
    user: `${brandBrief(input.brand)}\n\n${asks}`,
    schema: ideasSchema,
    name: "post_ideas",
    temperature: 0.8,
  });
  const known = new Set(input.brand.positioning.points.map((p) => p.id));
  return {
    ideas: data.ideas.filter((idea) => idea.title.trim() && idea.hook.trim()).slice(0, input.count).map((idea) => ({ ...idea, hashtags: idea.hashtags.map((h) => h.replace(/^#/, "")).slice(0, 10), pointIds: idea.pointIds.filter((id) => known.has(id)) })),
    costUsd,
  };
}

// ── Creations ─────────────────────────────────────────────────────────────

const STRUCTURES: Record<CreationType, string> = {
  image: "Exactly 1 scene. Pick the layout that sells the idea best (hero with a product or screenshot, stat, quote, offer, list or statement).",
  carousel:
    "5 to 8 slides. Slide 1 is a cover with a strong hook (statement or hero). Middle slides each make one point (list, stat, screenshot, quote, split). The last slide is a cta. Slides read as a sequence; keep text short.",
  reel: "5 to 8 scenes, 15 to 35 seconds in total, vertical. Scene 1 is the hook (on screen in the first 2 seconds, 1.5–2.5 s long). Then reveal, 2–4 quick highlights (2.5–4 s each), proof if available, and a cta scene. Every scene has narration that sounds natural spoken aloud; narration and on-screen text say the same thing in different words.",
  promo:
    "6 to 10 scenes, 30 to 60 seconds. Structure: problem → solution → 2–4 features or benefits (show the product: screenshots, product photos) → proof → offer if any → cta. Narration for every scene, conversational, about 2.3 words per second.",
  tutorial:
    "A getting-started walkthrough of 5 to 10 scenes. Scene 1 says what the viewer will be able to do. Then one scene per step using the screenshot layout with the most relevant screenshot, eyebrow 'Step N', a short headline naming the action, narration explaining the step plainly. End with a cta scene. Use the brand's getting-started flow when one exists.",
};

const mediaChoice = z
  .string()
  .describe('"" for none; "asset:<id>" to use one of the listed assets; or "generate:<visual description>" for a new picture with no text in it');

const writtenScene = z.object({
  layout: z.enum(SCENE_LAYOUTS),
  eyebrow: z.string(),
  headline: z.string(),
  body: z.string(),
  stat: z.string().describe("A big figure from the profile (price, number), or empty"),
  bullets: z.array(z.string()),
  cta: z.string(),
  attribution: z.string(),
  media: mediaChoice.describe("The main picture: required for screenshot, product and split layouts"),
  background: mediaChoice.describe("A full-bleed photo behind the text (makes white text on a dark scrim), or empty"),
  narration: z.string().describe("Voiceover for this scene (videos only; empty for images)"),
  durationSeconds: z.number().describe("Seconds on screen (videos only)"),
  transition: z.enum(["cut", "fade", "slide", "zoom"]),
  pointIds: z.array(z.string()),
  emphasis: z.array(z.string()).describe("Videos: 1 or 2 key words copied exactly from this scene's narration (a product, price or result) that the captions show in colour; empty for images"),
});

const writtenCreation = z.object({
  title: z.string(),
  style: z.enum(["clean", "bold"]).describe("clean: brand background; bold: every scene on the brand colour"),
  scenes: z.array(writtenScene).min(1),
  caption: z.string().describe("The post caption with hashtags at the end"),
  musicPrompt: z.string().describe("Videos: a short description of fitting background music (mood, tempo, instruments); empty for images"),
});

function toMediaRef(choice: string, known: Set<string>) {
  const value = choice.trim();
  if (value.startsWith("asset:")) {
    const id = value.slice(6).trim();
    return known.has(id) ? { assetId: id, generate: null, fit: "cover" as const, focus: null } : null;
  }
  if (value.startsWith("generate:")) {
    const prompt = value.slice(9).trim();
    return prompt ? { assetId: null, generate: { kind: "image" as const, prompt, model: null }, fit: "cover" as const, focus: null } : null;
  }
  return null;
}

/** A music bed that suits the brand's voice, for when the writer gives none. */
function defaultMusic(brand: BrandProfile): string {
  const mood: Record<string, string> = {
    friendly: "warm, upbeat acoustic pop, light percussion, 100 bpm",
    bold: "confident modern electronic beat, punchy drums, 118 bpm",
    playful: "bright, bouncy ukulele and claps, 120 bpm",
    premium: "minimal, elegant piano and soft strings, 80 bpm",
    technical: "clean ambient electronic pulse, 105 bpm",
    calm: "calm lo-fi with soft piano and gentle vinyl texture, 75 bpm",
    urgent: "driving energetic synth beat, 128 bpm",
  };
  return mood[brand.voice.tone] ?? mood.friendly!;
}

/** A caption look that suits the video and the brand's voice. */
function defaultCaptionPreset(type: CreationType, brand: BrandProfile): CaptionPreset {
  if (type === "tutorial") return "karaoke-pill-dark";
  const byTone: Record<string, CaptionPreset> = { premium: "minimal", calm: "minimal", technical: "karaoke-pill-dark", friendly: "box-highlight" };
  return byTone[brand.voice.tone] ?? "bold-pop";
}

export type DraftInput = {
  brand: BrandProfile;
  type: CreationType;
  format: MediaFormat;
  assets: AssetSummary[];
  brief: string;
  /** Let the writer ask for generated pictures (costs credits at render time). */
  allowGenerated?: boolean;
  voice?: boolean;
};

export async function writeCreation(yep: YepApi, input: DraftInput): Promise<{ title: string; caption: string; spec: CreationSpec; costUsd: number }> {
  const { width, height } = MEDIA_FORMATS[input.format];
  const isVideo = CREATION_TYPES[input.type].video;
  const assetList = input.assets.length
    ? input.assets.map((a) => `  asset:${a.id} — ${a.role}: ${a.name}${a.device ? ` (${a.device})` : ""}${a.width && a.height ? `, ${a.width}×${a.height}` : ""}${a.url ? ` from ${a.url}` : ""}`).join("\n")
    : "  (none)";
  const user = [
    brandBrief(input.brand),
    `Available pictures (use their ids exactly):\n${assetList}`,
    `Make a ${CREATION_TYPES[input.type].label.toLowerCase()} at ${width}×${height} (${MEDIA_FORMATS[input.format].label}).`,
    STRUCTURES[input.type],
    input.allowGenerated === false ? "Do not use generate: pictures; only the listed assets or none." : "Use generate: only when no listed asset fits, e.g. a mood photo for a background.",
    isVideo && input.voice === false ? "No voiceover: leave narration empty and let on-screen text carry the story." : "",
    `Brief: ${input.brief}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  const { data, costUsd } = await chatJson(yep, {
    model: TEXT_MODELS.write,
    system: `You are a senior creative director who makes on-brand social media posts and short promo videos from a business's own website content.\n\nLayouts: hero (headline + text + optional picture), statement (one big line), stat (a big figure), list (2–5 bullets), quote (a testimonial in headline + attribution), screenshot (a website screenshot in a device frame), product (product photo + price), split (picture beside text), offer (a badge with the offer), cta (logo + closing line + button).\n\n${CREATIVE_RULES}`,
    user,
    schema: writtenCreation,
    name: "creation",
    temperature: 0.7,
    maxTokens: 12000,
  });

  const known = new Set(input.assets.map((a) => a.id));
  const points = new Set(input.brand.positioning.points.map((p) => p.id));
  const limit = input.type === "image" ? 1 : input.type === "carousel" ? 10 : 14;
  const scenes = data.scenes.slice(0, limit).map((s, i) => ({
    id: `s${i + 1}`,
    layout: s.layout,
    text: { eyebrow: s.eyebrow, headline: s.headline, body: s.body, stat: s.stat, bullets: s.bullets.slice(0, 5), cta: s.cta, attribution: s.attribution },
    media: toMediaRef(s.media, known),
    background: toMediaRef(s.background, known),
    durationMs: isVideo ? Math.round(Math.min(12, Math.max(1.5, s.durationSeconds || 3)) * 1000) : 3000,
    narration: isVideo && input.voice !== false ? s.narration : "",
    transition: s.transition,
    pointIds: s.pointIds.filter((id) => points.has(id)),
    // Only words the voice actually says can be highlighted.
    emphasis: isVideo ? (s.emphasis ?? []).filter((w) => w.trim() && w.length <= 40 && s.narration.toLowerCase().includes(w.toLowerCase())).slice(0, 3) : [],
  }));
  // Writers pick lengths that are too short to read or say; stretch each scene to fit both.
  if (isVideo) {
    for (const scene of scenes) {
      const spoken = scene.narration.split(/\s+/).filter(Boolean).length;
      const needed = Math.max(readingSeconds(scene), spoken ? spoken / 2.6 + 0.5 : 0);
      scene.durationMs = Math.round(Math.min(15, Math.max(scene.durationMs / 1000, needed)) * 1000);
    }
  }
  if (!scenes.length) throw new AppError(502, "ai_bad_output", "The writer returned no scenes. Try again.");

  const spec = creationSpec.parse({
    style: data.style,
    scenes,
    audio: {
      voice: { enabled: isVideo && input.voice !== false, model: null, voice: null, assetId: null },
      music: { assetId: null, prompt: isVideo ? data.musicPrompt.trim() || defaultMusic(input.brand) : "", volume: 0.18 },
    },
    captions: isVideo ? "word" : "none",
    captionStyle: { preset: defaultCaptionPreset(input.type, input.brand), position: "lower", accent: null },
    posterSceneId: scenes[0]!.id,
  });
  return { title: data.title.slice(0, 120) || "Untitled", caption: data.caption, spec, costUsd };
}
