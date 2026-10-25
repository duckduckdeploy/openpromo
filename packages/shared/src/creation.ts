import { z } from "zod";

/**
 * A creation's spec: the source of truth for one image, carousel, reel, promo video or tutorial.
 * Writers fill it, people edit it, the checks read it and the renderer draws it. Text is always
 * real text set in the brand's fonts; models only make pictures, clips and sound.
 *
 * An image has one scene, a carousel one per slide, and a video one per shot.
 */

/** A picture or clip in a scene: an existing asset, or one still to be generated. */
export const mediaRef = z.object({
  assetId: z.string().nullable().default(null),
  /** Set while the asset is still to be made; cleared once assetId points at the result. */
  generate: z
    .object({
      kind: z.enum(["image", "video"]),
      prompt: z.string().max(2000),
      model: z.string().max(120).nullable().default(null),
      /** Video only: animate this picture (it becomes the first frame) instead of starting from words. */
      sourceAssetId: z.string().nullable().default(null),
    })
    .nullable()
    .default(null),
  fit: z.enum(["cover", "contain"]).default("cover"),
  /** For screenshots: where to zoom, as fractions of the image (0–1). */
  focus: z.object({ x: z.number(), y: z.number(), zoom: z.number().min(1).max(4) }).nullable().default(null),
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
});
export type Scene = z.infer<typeof scene>;

export const CAPTION_STYLES = ["word", "line", "none"] as const;

export const creationSpec = z.object({
  version: z.literal(1).default(1),
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
  /** The scene whose first frame becomes the poster and thumbnail. */
  posterSceneId: z.string().nullable().default(null),
});
export type CreationSpec = z.infer<typeof creationSpec>;

export const totalDurationMs = (spec: Pick<CreationSpec, "scenes">) => spec.scenes.reduce((sum, s) => sum + s.durationMs, 0);
