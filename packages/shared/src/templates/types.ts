import type { CaptionPreset } from "../creation";
import type { CreationType, MediaFormat } from "../formats";

/**
 * Templates are the starting point of every creation: a style, a structure and a production
 * recipe that has been tried on real models. The writer fills a template from the brand profile,
 * so two businesses using the same template get different stories in their own colours and voice.
 */

/** Gallery groups, so people can browse by look. */
export const TEMPLATE_GROUPS = {
  "real-people": { label: "Real people", description: "Customers, founders and staff on camera, talking or in action." },
  characters: { label: "Characters and mascots", description: "A cast that stays the same from scene to scene: 3D, clay, anime and more." },
  illustrated: { label: "Illustrated and comic", description: "Comic panels, doodles and hand-drawn styles with a sense of humour." },
  cinematic: { label: "Cinematic and product", description: "Slow, polished shots of the product, the place and the details." },
  "motion-design": { label: "Motion design and text", description: "Bold type, stats and lists in the brand's fonts and colours." },
  screens: { label: "Product screens", description: "Real screenshots of the website or app, with zooms and callouts." },
} as const;
export type TemplateGroup = keyof typeof TEMPLATE_GROUPS;

/**
 * How a template's scenes get made. Each recipe is a pipeline the renderer knows; the models for
 * each step are in RECIPES (catalog.ts), so changing a model is one edit.
 */
export const RECIPE_KEYS = [
  /** Brand-designed HTML scenes. AI is optional (a background picture). */
  "layout",
  /** An AI photo or scene, using the product photo as a reference when there is one, with real text on top. */
  "ai-photo",
  /** A complete AI-designed graphic, text included; the text is read back and checked before it is kept. */
  "ai-poster",
  /** A cast sheet first, then a keyframe per scene drawn from it, then each keyframe animated. Narrated. */
  "cast-story",
  /** A person speaks to camera with the model's own voice and lip-sync. */
  "on-camera",
  /** AI video clips of the product and the place, with text, voiceover and music. */
  "broll",
  /** AI illustrations with camera moves (pan, zoom, parallax), narrated. Cheapest AI video. */
  "stills-motion",
  /** Animated type, stats and lists only. */
  "motion-text",
  /** Screenshots of the site or app with zooms, a cursor and callouts. */
  "screens",
] as const;
export type RecipeKey = (typeof RECIPE_KEYS)[number];

/** Who appears on screen. */
export type TemplateCast = "none" | "presenter" | "customer" | "people" | "mascot" | "characters";

export type TemplateBeat = {
  /** What this part does in the story: hook, problem, reveal, proof, offer, cta… */
  role: string;
  /** What the scene shows and says, written for the writer model. */
  direction: string;
  /** Typical length in seconds (video only). */
  seconds?: number;
};

export type PromoTemplate = {
  id: string;
  type: CreationType;
  group: TemplateGroup;
  recipe: RecipeKey;
  name: string;
  /** One line for the gallery card. */
  summary: string;
  /** What it is, when to use it and why it works: shown on the template page. */
  what: string;
  when: string;
  why: string;
  /** Kinds of business it suits best, for sorting the gallery per project. */
  bestFor: string[];
  /** Art direction added to every picture and clip prompt. Empty for layout recipes. */
  look: string;
  cast: TemplateCast;
  beats: TemplateBeat[];
  /** The hook formula the writer follows. */
  hook: string;
  /** Writing rules on top of the general creative rules. */
  rules: string[];
  avoid: string[];
  /** Video only. */
  narration?: "voiceover" | "on-camera" | "none";
  /** Video only: how the voice should sound. */
  voice?: string;
  /** Video only: the music prompt. */
  music?: string;
  captions?: CaptionPreset | "none";
  /**
   * Video only: on-screen text over full-frame footage stays up for the whole scene, because the
   * text is the format (a POV meme). Otherwise a title shows briefly and gets out of the way.
   */
  textStays?: boolean;
  /** Video only: length range in seconds. */
  duration?: [number, number];
  formats: MediaFormat[];
  tags: string[];
  /** Model overrides for this template, when it needs something other than the recipe's default. */
  models?: { image?: string; video?: string };
};
