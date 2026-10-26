import { z } from "zod";

/**
 * A creation's spec: the source of truth for one image, carousel, reel, promo video or tutorial.
 * Writers fill it, people edit it, the checks read it and the renderer draws it. Text is always
 * real text set in the brand's fonts; models only make pictures, clips and sound.
 *
 * An image has one scene, a carousel one per slide, and a video one per shot.
 */

export const CAMERA_MOVES = ["none", "push-in", "pull-out", "pan-left", "pan-right", "pan-up", "pan-down"] as const;
export type CameraMove = (typeof CAMERA_MOVES)[number];

/** How a picture or clip is (or was) made. */
const generateSpec = z.object({
      kind: z.enum(["image", "video"]),
      prompt: z.string().max(2000),
      model: z.string().max(120).nullable().default(null),
      /** Video only: animate this picture (it becomes the first frame) instead of starting from words. */
      sourceAssetId: z.string().nullable().default(null),
      /** Video only: draw this first frame before animating it (when sourceAssetId is empty). */
      keyframe: z.string().max(2000).nullable().default(null),
      /** Cast members (spec.cast ids) whose sheets are passed as the reference, so they look the same in every scene. */
      castIds: z.array(z.string().max(40)).max(4).default([]),
      /** Other references for the picture or keyframe, such as the product photo. */
      referenceAssetIds: z.array(z.string()).max(3).default([]),
      /** Picture only: the model may draw lettering (designed posters); the words are checked afterwards. */
      allowText: z.boolean().default(false),
});
export type GenerateSpec = z.infer<typeof generateSpec>;

/** A picture or clip in a scene: an existing asset, or one still to be generated. */
export const mediaRef = z.object({
  assetId: z.string().nullable().default(null),
  /** Set while the asset is still to be made; cleared once assetId points at the result. */
  generate: generateSpec.nullable().default(null),
  /** The recipe of the asset in assetId once made, so an edit can make it again differently. */
  made: generateSpec.nullable().default(null),
  fit: z.enum(["cover", "contain"]).default("cover"),
  /** For screenshots: where to zoom, as fractions of the image (0–1). */
  focus: z.object({ x: z.number(), y: z.number(), zoom: z.number().min(1).max(4) }).nullable().default(null),
  /** Video only: play the clip's own sound (speech and lip-sync for on-camera scenes, natural sound for close-ups). */
  keepAudio: z.boolean().default(false),
  /** Video only: a camera move over a still picture. */
  motion: z.enum(CAMERA_MOVES).default("none"),
});
export type MediaRef = z.infer<typeof mediaRef>;

export const sceneText = z.object({
  eyebrow: z.string().max(60).default(""),
  headline: z.string().max(160).default(""),
  body: z.string().max(400).default(""),
  /** A big figure ("3x", "24h", "$0") with its label in body. */
  stat: z.string().max(24).default(""),
  bullets: z.array(z.string().max(90)).max(5).default([]),
  cta: z.string().max(60).default(""),
  /** For testimonials: who said it. */
  attribution: z.string().max(120).default(""),
});
export type SceneText = z.infer<typeof sceneText>;

export const SCENE_LAYOUTS = [
  "hero",
  "statement",
  "stat",
  "list",
  "quote",
  "screenshot",
  "product",
  "split",
  "offer",
  "cta",
  /** The picture or clip fills the frame; any text is a short overlay. */
  "full",
] as const;
export type SceneLayout = (typeof SCENE_LAYOUTS)[number];

export const scene = z.object({
  id: z.string().max(40),
  layout: z.enum(SCENE_LAYOUTS),
  text: sceneText,
  /** The main picture (product, screenshot, photo). */
  media: mediaRef.nullable().default(null),
  /** Behind everything; brand colours when empty. */
  background: mediaRef.nullable().default(null),
  /** Video only. */
  durationMs: z.number().int().min(500).max(30_000).default(3000),
  /** Video only: what the voiceover says during this scene. */
  narration: z.string().max(600).default(""),
  transition: z.enum(["cut", "fade", "slide", "zoom"]).default("fade"),
  /** Selling points (brand.positioning.points ids) this scene claims; grounding checks them. */
  pointIds: z.array(z.string()).default([]),
  /** Video only: words from the narration that captions show in the accent colour. */
  emphasis: z.array(z.string().max(40)).max(4).default([]),
  /** Video only: what the person in the clip says on camera (the clip's own audio). Captions use it. */
  dialogue: z.string().max(600).default(""),
});
export type Scene = z.infer<typeof scene>;

export const CAPTION_STYLES = ["word", "line", "none"] as const;

/** How burned-in captions look. The recipes are in @openpromo/render (caption-styles.ts). */
export const CAPTION_PRESETS = {
  "bold-pop": { label: "Bold pop", description: "Big uppercase words with a thick outline; each word pops as it is spoken." },
  "box-highlight": { label: "Box highlight", description: "A colored box slides behind each word as it is spoken." },
  "karaoke-pill": { label: "Karaoke, light", description: "A light pill; words fill in dark as they are spoken." },
  "karaoke-pill-dark": { label: "Karaoke, dark", description: "A dark pill; words light up as they are spoken." },
  "word-slam": { label: "One word at a time", description: "One huge word at a time, slamming in from alternating sides." },
  minimal: { label: "Minimal", description: "Clean sentence-case lines with a soft shadow, for calm or corporate videos." },
  "word-reveal": { label: "Word reveal", description: "Words appear one by one as they are spoken and the line builds up." },
} as const;
export type CaptionPreset = keyof typeof CAPTION_PRESETS;
export const CAPTION_PRESET_KEYS = Object.keys(CAPTION_PRESETS) as [CaptionPreset, ...CaptionPreset[]];

export const captionStyle = z.object({
  preset: z.enum(CAPTION_PRESET_KEYS).default("bold-pop"),
  /** Lower sits just above the platform buttons and text on 9:16; upper sits below the top bar. */
  position: z.enum(["lower", "upper"]).default("lower"),
  /** Highlight colour; each preset has its own default. */
  accent: z.string().regex(/^#[0-9a-f]{6}$/i).nullable().default(null),
});
export type CaptionStyle = z.infer<typeof captionStyle>;

/** A character or person who appears in several scenes. The sheet is drawn once and reused as a reference. */
export const castMember = z.object({
  id: z.string().max(40),
  name: z.string().max(80),
  /** How they look, in enough detail to draw them the same way every time. */
  description: z.string().max(1000),
  sheetAssetId: z.string().nullable().default(null),
});
export type CastMember = z.infer<typeof castMember>;

export const creationSpec = z.object({
  version: z.literal(1).default(1),
  /** The gallery template this was written from (templates/). */
  templateId: z.string().max(60).nullable().default(null),
  cast: z.array(castMember).max(4).default([]),
  /** Visual style the scenes are drawn in (templates in @openpromo/render). */
  style: z.string().max(40).default("clean"),
  /** Optional colour overrides on top of the brand's. */
  colors: z.record(z.string(), z.string()).default({}),
  scenes: z.array(scene).min(1).max(40),
  audio: z
    .object({
      voice: z
        .object({
          enabled: z.boolean().default(true),
          model: z.string().max(120).nullable().default(null),
          voice: z.string().max(120).nullable().default(null),
          /** The generated track, with word timings in its meta. */
          assetId: z.string().nullable().default(null),
        })
        .default({ enabled: true, model: null, voice: null, assetId: null }),
      music: z
        .object({
          assetId: z.string().nullable().default(null),
          /** A prompt for a generated track when no asset is chosen. */
          prompt: z.string().max(400).default(""),
          volume: z.number().min(0).max(1).default(0.18),
        })
        .default({ assetId: null, prompt: "", volume: 0.18 }),
    })
    .default({
      voice: { enabled: true, model: null, voice: null, assetId: null },
      music: { assetId: null, prompt: "", volume: 0.18 },
    }),
  captions: z.enum(CAPTION_STYLES).default("word"),
  captionStyle: captionStyle.default({ preset: "bold-pop", position: "lower", accent: null }),
  /** The scene whose first frame becomes the poster and thumbnail. */
  posterSceneId: z.string().nullable().default(null),
});
export type CreationSpec = z.infer<typeof creationSpec>;

export const totalDurationMs = (spec: Pick<CreationSpec, "scenes">) => spec.scenes.reduce((sum, s) => sum + s.durationMs, 0);
