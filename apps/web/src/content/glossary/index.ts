import { terms as ads } from './ads';
import { terms as ai } from './ai';
import { terms as branding } from './branding';
import { terms as content } from './content';
import { terms as social } from './social';
import { terms as videoMaking } from './video-making';
import { terms as videoTech } from './video-tech';
import { glossaryCategories, type GlossaryCategory, type GlossaryTerm } from './types';

export * from './types';

/** Every glossary entry, A to Z. */
export const glossary: GlossaryTerm[] = [...social, ...videoMaking, ...videoTech, ...branding, ...content, ...ads, ...ai].sort((a, b) =>
  sortKey(a.term).localeCompare(sortKey(b.term), 'en'),
);

const bySlug = new Map(glossary.map((term) => [term.slug, term]));

export const getTerm = (slug: string) => bySlug.get(slug);

export const termsIn = (category: GlossaryCategory) => glossary.filter((term) => term.category === category);

export const categoryName = (category: GlossaryCategory) => glossaryCategories.find((c) => c.id === category)?.name ?? category;

/** Sort and A-Z letter key: ignores quotes. */
function sortKey(term: string) {
  return term.replace(/^["“]/, '').toLowerCase();
}

/** The A-Z letter a term is filed under: "#" for terms starting with a digit. */
export function letterOf(term: GlossaryTerm) {
  const first = sortKey(term.term).charAt(0).toUpperCase();
  return /[A-Z]/.test(first) ? first : '#';
}

/** The term without its expansion: "Call to action (CTA)" becomes "Call to action". Acronym-led names keep the acronym: "CPM (cost per mille)" becomes "CPM". */
export function shortName(term: GlossaryTerm) {
  return NAME_OVERRIDES[term.slug] ?? term.term.replace(/\s*\([^)]*\)\s*$/, '');
}

/** Names whose parenthesis is part of the name. */
const NAME_OVERRIDES: Record<string, string> = {
  'twitter-header-size': 'X (Twitter) header size',
};

/** Plural names take "are" and "matter": "What are pain points?". */
export function isPlural(term: GlossaryTerm) {
  if (SINGULAR.has(term.slug)) return false;
  const last = shortName(term).split(/\s+/).pop() ?? '';
  return /[^su]s$/i.test(last) || PLURAL.has(term.slug);
}

/** Names ending in "s" that are singular, and plurals that do not end in "s". */
const SINGULAR = new Set<string>(['impressions', 'social-media-image-sizes', 'features-vs-benefits', 'instagram-reels', 'youtube-shorts', 'ai-hallucination', 'analytics', 'social-commerce']);
const PLURAL = new Set<string>([]);

/** Section heading on why the term matters. */
export function whyHeading(term: GlossaryTerm) {
  if (isPlural(term)) return `Why ${nameInSentence(term)} matter`;
  // "Why a hook matters": the question's article, without the "What is".
  const subject = whatIs(term).replace(/^What is /, '').replace(/\?$/, '');
  return `Why ${subject} matters`;
}

const SMALL_WORDS = /^(a|an|and|or|of|to|in|on|for|by|vs|the|with)$/;

/** Title Case for title tags: "Ken Burns effect" becomes "Ken Burns Effect". Acronyms stay as they are. */
export function titleCaseName(term: GlossaryTerm) {
  return shortName(term)
    .split(' ')
    .map((word, index) =>
      index > 0 && SMALL_WORDS.test(word) ? word : word.replace(/(^|-)([a-z])/g, (_, dash: string, letter: string) => `${dash}${letter.toUpperCase()}`),
    )
    .join(' ');
}

/** The name inside a sentence: lower-cases the first letter unless the word is an acronym or a proper name. */
export function nameInSentence(term: GlossaryTerm) {
  const name = shortName(term);
  return /^[A-Z][a-z]/.test(name) && !PROPER.test(name) ? name.charAt(0).toLowerCase() + name.slice(1) : name;
}

const PROPER = /^(Instagram|TikTok|YouTube|Facebook|LinkedIn|Spark Ads|Ken Burns|Open Graph|Model Context|Generative AI|X \()/;

/** "What is a hook?" / "What is engagement?": countable singular terms take an article. */
export function whatIs(term: GlossaryTerm, name = nameInSentence(term)) {
  if (isPlural(term)) return `What are ${name}?`;
  if (term.slug === 'social-media-image-sizes') return `What are ${name}?`;
  if (/size$/.test(term.slug) || THE.has(term.slug)) return `What is the ${name}?`;
  const article = COUNTABLE.has(term.slug) ? (/^([aeiou]|MP4|SRT|LLM|MCP|AI|A\/B|ROAS|A-roll)/i.test(name) && !/^(user|UGC|usp|unique)/i.test(name) ? 'an ' : 'a ') : '';
  return `What is ${article}${name}?`;
}

/** Terms read with "the": "What is the AIDA model?". */
const THE = new Set<string>(['aida', 'best-time-to-post', 'creator-economy', 'instagram-grid', 'ken-burns-effect']);

/** Terms whose question form takes "a" or "an". Uncountable and plural terms are left out. */
const COUNTABLE = new Set<string>([
  'social-media-manager', 'content-calendar', 'social-media-algorithm', 'hashtag', 'caption', 'call-to-action', 'link-in-bio', 'micro-influencer', 'brand-ambassador',
  'instagram-story', 'carousel-post', 'tiktok-stitch', 'tiktok-duet', 'instagram-remix', 'collab-post', 'pinned-post', 'instagram-grid', 'viral-video', 'social-media-audit',
  'hook', 'video-script', 'storyboard', 'shot-list', 'talking-head-video', 'faceless-video', 'screen-recording', 'transition', 'jump-cut', 'lower-third', 'loop-video',
  'vertical-video', 'explainer-video', 'promo-video', 'product-demo-video', 'tutorial-video', 'testimonial-video',
  'aspect-ratio', 'codec', 'thumbnail', 'voiceover', 'srt-file', 'safe-zone',
  'brand-kit', 'brand-archetype', 'positioning-statement', 'value-proposition', 'unique-selling-proposition', 'color-palette', 'font-pairing', 'logo', 'wordmark', 'logomark',
  'mood-board', 'brand-story', 'tagline', 'slogan', 'mission-statement', 'rebrand',
  'content-creator', 'content-brief', 'headline', 'buyer-persona', 'ideal-customer-profile', 'customer-journey', 'marketing-funnel', 'testimonial', 'case-study', 'lead-magnet', 'landing-page',
  'ad-creative', 'banner-ad', 'display-ad', 'pattern-interrupt', 'lookalike-audience', 'open-graph-image',
  'ai-image-generator', 'diffusion-model', 'prompt', 'negative-prompt', 'ai-voice-generator', 'ai-music-generator', 'ai-avatar', 'llm', 'deepfake', 'ai-watermark', 'ai-agent',
]);
