import type { CreationSpec } from "../creation";
import type { CreationType } from "../formats";
import { IMAGE_TEMPLATES } from "./images";
import { REEL_TEMPLATES } from "./reels";
import type { PromoTemplate, RecipeKey, TemplateGroup } from "./types";
import { VIDEO_TEMPLATES } from "./videos";

export * from "./types";

/**
 * The models each recipe uses, chosen from a side-by-side test of 18 image, 17 video and 16 voice
 * models on the same prompts (October 2026; private notes). Prices are typical, per unit:
 * images per picture, video per second, speech per 1,000 characters.
 */
export const RECIPES: Record<
  RecipeKey,
  { label: string; image?: string; video?: string; speech?: string; music?: string; note: string }
> = {
  layout: { label: "Brand design", image: "openai/gpt-image-2", speech: "elevenlabs/eleven-v4", music: "google/lyria-3-clip", note: "Pictures are optional; text is set in the brand's fonts." },
  "ai-photo": { label: "AI photo", image: "openai/gpt-image-2", note: "The product photo is passed as a reference so it stays the real product." },
  "ai-poster": { label: "AI-designed poster", image: "openai/gpt-image-2", note: "Lettering is read back by a vision model and the picture is redone if a word is wrong." },
  "cast-story": {
    label: "Animated cast",
    image: "openai/gpt-image-2",
    video: "google/veo-3-lite",
    speech: "elevenlabs/eleven-v4",
    music: "google/lyria-3-clip",
    note: "One cast sheet, then every keyframe is drawn from it, so characters stay the same.",
  },
  "on-camera": {
    label: "On camera",
    image: "openai/gpt-image-2",
    video: "google/veo-3-lite",
    music: "google/lyria-3-clip",
    note: "Speech and lip-sync come from the video model; the person is fixed by a first frame.",
  },
  broll: { label: "AI footage", image: "openai/gpt-image-2", video: "google/veo-3-lite", speech: "elevenlabs/eleven-v4", music: "google/lyria-3-clip", note: "Clips start from a keyframe so the product looks right." },
  "stills-motion": { label: "Illustrations in motion", image: "openai/gpt-image-2", speech: "elevenlabs/eleven-v4", music: "google/lyria-3-clip", note: "Camera moves are rendered locally, so only pictures and voice are paid for." },
  "motion-text": { label: "Motion type", speech: "elevenlabs/eleven-v4", music: "google/lyria-3-clip", note: "No pictures needed." },
  screens: { label: "Real screens", speech: "elevenlabs/eleven-v4", music: "google/lyria-3-clip", note: "Uses screenshots taken when the site was read." },
};

export const TEMPLATES: PromoTemplate[] = [...IMAGE_TEMPLATES, ...REEL_TEMPLATES, ...VIDEO_TEMPLATES];

export const TEMPLATE_IDS = TEMPLATES.map((t) => t.id);

export function getTemplate(id: string): PromoTemplate | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function templatesFor(type: CreationType, group?: TemplateGroup): PromoTemplate[] {
  return TEMPLATES.filter((t) => t.type === type && (!group || t.group === group));
}
export * from "./previews";

/** Typical USD per output for a model, from the side-by-side test (video per second, others per item). */
const TYPICAL_USD: Record<string, number> = {
  "openai/gpt-image-2": 0.05,
  "google/veo-3-lite": 0.11,
  "x-ai/grok-imagine-video-1.5": 0.3,
  "elevenlabs/eleven-v4": 0.05,
  "google/lyria-3-clip": 0.08,
};

/**
 * A rough price for one output of a template, for the gallery. Writing adds a few cents; renders
 * of the same spec reuse what was already made.
 */
export function estimateTemplateUsd(t: PromoTemplate): number {
  const recipe = RECIPES[t.recipe];
  const image = TYPICAL_USD[t.models?.image ?? recipe.image ?? ""] ?? 0.05;
  const cast = t.cast === "mascot" || t.cast === "characters" || t.cast === "presenter" || t.cast === "customer" ? 1 : 0;
  const scenes = t.type === "image" ? 1 : t.type === "carousel" ? 6 : Math.max(3, Math.round(((t.duration?.[0] ?? 20) + (t.duration?.[1] ?? 30)) / 2 / 5));
  const writing = 0.04;
  if (t.type === "image" || t.type === "carousel") {
    const pictures = t.recipe === "layout" ? (t.look ? 1 : 0) : scenes;
    return round(writing + (pictures + cast) * image);
  }
  const seconds = ((t.duration?.[0] ?? 20) + (t.duration?.[1] ?? 30)) / 2;
  const sound = (t.narration === "voiceover" ? 0.05 : 0) + (t.music ? 0.08 : 0);
  switch (t.recipe) {
    case "cast-story":
    case "on-camera":
    case "broll": {
      const perSecond = TYPICAL_USD[t.models?.video ?? recipe.video ?? ""] ?? 0.11;
      // Clips come in 4, 6 or 8 second lengths, so a little more is made than is shown.
      return round(writing + seconds * 1.25 * perSecond + (scenes + cast) * image + sound);
    }
    case "stills-motion":
      return round(writing + (scenes + cast) * image + sound);
    default:
      return round(writing + (t.look ? scenes * image : 0) + sound);
  }
}

const round = (usd: number) => (usd < 1 ? Math.ceil(usd * 20) / 20 : Math.ceil(usd * 2) / 2);

/**
 * What rendering a spec will cost, roughly: pictures, first frames and clips still to make, cast
 * sheets, voice lines and music. Things already made are reused and cost nothing.
 */
export function estimateSpecUsd(spec: CreationSpec): number {
  const template = spec.templateId ? getTemplate(spec.templateId) : undefined;
  const image = TYPICAL_USD[template?.models?.image ?? "openai/gpt-image-2"] ?? 0.05;
  let usd = spec.cast.filter((c) => !c.sheetAssetId).length * image;
  for (const scene of spec.scenes) {
    for (const ref of [scene.media, scene.background]) {
      const g = ref?.generate;
      if (!g) continue;
      if (g.kind === "image") {
        usd += image;
        continue;
      }
      const model = g.model ?? template?.models?.video ?? "google/veo-3-lite";
      const seconds = Math.max(4, Math.ceil(scene.durationMs / 2000) * 2);
      usd += (g.keyframe && !g.sourceAssetId ? image : 0) + seconds * (TYPICAL_USD[model] ?? 0.11);
    }
    if (spec.audio.voice.enabled && scene.narration.trim()) usd += Math.max(0.01, (scene.narration.length / 1000) * 0.17);
  }
  if (spec.audio.music.prompt.trim() && !spec.audio.music.assetId) usd += 0.08;
  return Math.round(usd * 100) / 100;
}
