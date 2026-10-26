/** Output sizes. Each creation has one; variants of a creation are re-rendered at another. */
export const MEDIA_FORMATS = {
  square: { label: "Square post", width: 1080, height: 1080, ratio: "1:1", use: "Instagram, Facebook, LinkedIn feed" },
  portrait: { label: "Portrait post", width: 1080, height: 1350, ratio: "4:5", use: "Instagram feed" },
  story: { label: "Story / reel", width: 1080, height: 1920, ratio: "9:16", use: "Stories, Reels, TikTok, Shorts" },
  landscape: { label: "Landscape video", width: 1920, height: 1080, ratio: "16:9", use: "YouTube, websites" },
  link: { label: "Link / ad banner", width: 1200, height: 628, ratio: "1.91:1", use: "Facebook and LinkedIn ads, link previews" },
  x_header: { label: "X header", width: 1500, height: 500, ratio: "3:1", use: "X / Twitter header" },
  linkedin_banner: { label: "LinkedIn banner", width: 1584, height: 396, ratio: "4:1", use: "LinkedIn profile or page banner" },
} as const;

export type MediaFormat = keyof typeof MEDIA_FORMATS;
export const FORMAT_KEYS = Object.keys(MEDIA_FORMATS) as MediaFormat[];

/** What a creation is. Images and carousels render to pictures; the rest to video. */
export const CREATION_TYPES = {
  image: { label: "Image", video: false, formats: ["square", "portrait", "story", "landscape", "link", "x_header", "linkedin_banner"] },
  carousel: { label: "Carousel", video: false, formats: ["square", "portrait"] },
  reel: { label: "Reel", video: true, formats: ["story"] },
  promo: { label: "Promo video", video: true, formats: ["landscape", "square", "story"] },
  tutorial: { label: "Tutorial", video: true, formats: ["landscape", "story"] },
} as const satisfies Record<string, { label: string; video: boolean; formats: readonly MediaFormat[] }>;

export type CreationType = keyof typeof CREATION_TYPES;

export const IDEA_GOALS = {
  launch: "Launch or announcement",
  promo: "Offer or promotion",
  education: "Teach something useful",
  proof: "Social proof",
  feature: "Feature spotlight",
  story: "Behind the scenes",
} as const;
export type IdeaGoal = keyof typeof IDEA_GOALS;

export const CHANNELS = ["instagram", "tiktok", "youtube", "linkedin", "facebook", "x"] as const;
export type Channel = (typeof CHANNELS)[number];
