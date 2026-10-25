import { z } from "zod";

/**
 * A project's brand profile: what the ingest learned from the website, plus the user's edits.
 * Every tool builds from it, so nothing is generated from a blank prompt.
 *
 * Selling points keep the sentence they came from and its page, so a claim on screen can be
 * traced back to the site (see checks/grounding).
 */

export const sourceRef = z.object({
  /** The sentence on the site this was taken from, verbatim. */
  quote: z.string().max(600),
  url: z.string().max(2000),
});
export type SourceRef = z.infer<typeof sourceRef>;

export const sellingPoint = z.object({
  id: z.string().max(40),
  /** Short, on-screen ready: "Ships in 24 hours". */
  title: z.string().max(120),
  detail: z.string().max(600).default(""),
  kind: z.enum(["benefit", "feature", "proof", "offer"]).default("benefit"),
  source: sourceRef.nullable().default(null),
});
export type SellingPoint = z.infer<typeof sellingPoint>;

export const audienceSegment = z.object({
  who: z.string().max(200),
  pain: z.string().max(400).default(""),
  outcome: z.string().max(400).default(""),
});

export const product = z.object({
  name: z.string().max(200),
  description: z.string().max(1000).default(""),
  price: z.string().max(80).nullable().default(null),
  url: z.string().max(2000).nullable().default(null),
  imageAssetIds: z.array(z.string()).default([]),
});
export type Product = z.infer<typeof product>;

export const userFlow = z.object({
  /** "Create your first invoice". */
  title: z.string().max(160),
  startUrl: z.string().max(2000),
  steps: z.array(z.string().max(300)).max(12).default([]),
  /** Needs an account: tutorials can only narrate it over screenshots, not replay it. */
  needsLogin: z.boolean().default(false),
});
export type UserFlow = z.infer<typeof userFlow>;

const hex = z.string().regex(/^#[0-9a-f]{6}$/i);

export const brandColors = z.object({
  background: hex,
  text: hex,
  primary: hex,
  /** Text that sits on the primary colour. */
  onPrimary: hex,
  accent: hex,
  muted: hex,
  /** Every distinct colour found, most used first. */
  palette: z.array(hex).max(16).default([]),
});
export type BrandColors = z.infer<typeof brandColors>;

export const brandFont = z.object({
  family: z.string().max(120),
  /** A Google Fonts family we can load by name; otherwise a system fallback is used. */
  google: z.boolean().default(false),
  weights: z.array(z.number().int().min(100).max(900)).default([400, 700]),
});

export const VOICE_TONES = ["friendly", "bold", "playful", "premium", "technical", "calm", "urgent"] as const;
export type VoiceTone = (typeof VOICE_TONES)[number];

export const brandProfile = z.object({
  identity: z.object({
    name: z.string().max(120),
    tagline: z.string().max(200).default(""),
    description: z.string().max(2000).default(""),
    category: z.string().max(120).default(""),
    url: z.string().max(2000),
    socials: z.record(z.string(), z.string().max(500)).default({}),
  }),
  audience: z.object({
    segments: z.array(audienceSegment).max(6).default([]),
    objections: z.array(z.string().max(300)).max(8).default([]),
  }),
  positioning: z.object({
    points: z.array(sellingPoint).max(20).default([]),
    ctas: z.array(z.string().max(80)).max(6).default([]),
    offers: z.array(z.string().max(200)).max(6).default([]),
  }),
  voice: z.object({
    tone: z.enum(VOICE_TONES).default("friendly"),
    /** 0 formal … 100 casual. */
    casual: z.number().int().min(0).max(100).default(50),
    /** 0 serious … 100 playful. */
    playful: z.number().int().min(0).max(100).default(40),
    sampleLines: z.array(z.string().max(300)).max(6).default([]),
    avoid: z.array(z.string().max(80)).max(30).default([]),
  }),
  visual: z.object({
    colors: brandColors,
    fonts: z.object({ heading: brandFont, body: brandFont }),
    logoAssetId: z.string().nullable().default(null),
    /** A light version for dark backgrounds, when the site has one. */
    logoLightAssetId: z.string().nullable().default(null),
    radius: z.number().int().min(0).max(48).default(12),
    imageryStyle: z.array(z.string().max(60)).max(8).default([]),
  }),
  products: z.array(product).max(24).default([]),
  flows: z.array(userFlow).max(8).default([]),
  /** Dotted paths the user changed by hand ("voice.tone"); a new ingest keeps these. */
  edited: z.array(z.string()).default([]),
});
export type BrandProfile = z.infer<typeof brandProfile>;

/** Phrases that make promo copy sound generic. The writers avoid them and the checks flag them. */
export const GENERIC_PHRASES = [
  "revolutionize",
  "revolutionise",
  "game-changer",
  "game changer",
  "seamless",
  "seamlessly",
  "unlock",
  "unleash",
  "elevate",
  "supercharge",
  "next-level",
  "cutting-edge",
  "in today's fast-paced world",
  "look no further",
  "take it to the next level",
  "best-in-class",
  "world-class",
  "synergy",
];
