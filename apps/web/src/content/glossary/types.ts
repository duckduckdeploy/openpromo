import type { Faq } from '../pricing';

export type GlossaryCategory = 'social' | 'video-making' | 'video-tech' | 'branding' | 'content' | 'ads' | 'ai';

/** `heading` is the H1 of the category page and its H2 on the hub. */
export const glossaryCategories: { id: GlossaryCategory; name: string; heading: string; summary: string }[] = [
  { id: 'social', name: 'Social media', heading: 'Social media marketing terms', summary: 'Reach, engagement, hashtags, Reels, Stories, carousels, UGC and the algorithms that decide who sees a post.' },
  { id: 'video-making', name: 'Making videos', heading: 'Video production terms', summary: 'Hooks, scripts, storyboards, B-roll, cuts, transitions and the kinds of promo and tutorial video.' },
  { id: 'video-tech', name: 'Video formats and captions', heading: 'Video formats, captions and metrics', summary: 'Aspect ratios, resolution, frame rate, codecs, captions, voiceover and retention metrics.' },
  { id: 'branding', name: 'Branding', heading: 'Branding terms', summary: 'Brand kits, identity, voice, positioning, colors, fonts, logos and brand guidelines.' },
  { id: 'content', name: 'Content and copywriting', heading: 'Content marketing and copywriting terms', summary: 'Content pillars, repurposing, copywriting formulas, audiences, funnels and conversion.' },
  { id: 'ads', name: 'Ads and image sizes', heading: 'Paid social and ad creative terms', summary: 'Ad creative, testing, CPM, ROAS, retargeting and the image sizes every platform asks for.' },
  { id: 'ai', name: 'AI media', heading: 'AI marketing and generative media terms', summary: 'Generative AI, prompts, image and video models, AI voices, hallucinations and content credentials.' },
];

/** Where the term is put to work in OpenPromo. `href` is a path on this site. */
export interface GlossaryInOpenPromo {
  body: string;
  href: string;
  /** Link text, e.g. "See the reel generator". */
  label: string;
}

export interface GlossaryTerm {
  /** URL slug under /glossary, e.g. "b-roll". */
  slug: string;
  /** The term as people search for it, e.g. "B-roll". Used in the H1 and title. */
  term: string;
  /** Other names and abbreviations, e.g. ["B roll"]. */
  aka?: string[];
  category: GlossaryCategory;
  /** One-sentence definition, at most 155 characters. The meta description and the A-Z card. */
  short: string;
  /** "What is X?": the first paragraph is a 40-60 word definition that starts with the term. */
  definition: string[];
  /** "Why X matters": for marketing, reach or sales. */
  why: string[];
  /** A practical section with its own keyword-led heading, e.g. "How to write a video hook". */
  how?: { heading: string; steps?: string[]; body?: string[] };
  /** A short example: prose, or a block of text when `code` is set. */
  example?: { body?: string; code?: string; label?: string };
  openpromo?: GlossaryInOpenPromo;
  /** Slugs of related terms. Every one must exist in the glossary. */
  related: string[];
  faqs?: Faq[];
}
