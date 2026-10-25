import { MEDIA_FORMATS, type MediaFormat } from '@openpromo/shared';

/**
 * Example images in public/examples: OpenPromo's own templates rendered for Crumb & Co, a fictional
 * bakery (apps/api/scripts/preview-templates.ts), converted to WebP. No real brand appears in them.
 */
type Layout = 'hero' | 'statement' | 'stat' | 'list' | 'offer' | 'cta' | 'screenshot';

interface ExampleImage {
  format: MediaFormat;
  layout: Layout;
  look: 'clean' | 'bold';
  width: number;
  height: number;
}

const EXAMPLES = {
  'square-hero-clean': { format: 'square', layout: 'hero', look: 'clean', width: 720, height: 720 },
  'square-hero-bold': { format: 'square', layout: 'hero', look: 'bold', width: 720, height: 720 },
  'square-list-bold': { format: 'square', layout: 'list', look: 'bold', width: 720, height: 720 },
  'square-list-clean': { format: 'square', layout: 'list', look: 'clean', width: 720, height: 720 },
  'square-offer-bold': { format: 'square', layout: 'offer', look: 'bold', width: 720, height: 720 },
  'square-stat-bold': { format: 'square', layout: 'stat', look: 'bold', width: 720, height: 720 },
  'square-cta-bold': { format: 'square', layout: 'cta', look: 'bold', width: 720, height: 720 },
  'portrait-statement-clean': { format: 'portrait', layout: 'statement', look: 'clean', width: 720, height: 900 },
  'portrait-statement-bold': { format: 'portrait', layout: 'statement', look: 'bold', width: 720, height: 900 },
  'portrait-list-bold': { format: 'portrait', layout: 'list', look: 'bold', width: 720, height: 900 },
  'story-stat-bold': { format: 'story', layout: 'stat', look: 'bold', width: 540, height: 960 },
  'story-cta-clean': { format: 'story', layout: 'cta', look: 'clean', width: 540, height: 960 },
  'story-hero-bold': { format: 'story', layout: 'hero', look: 'bold', width: 540, height: 960 },
  'story-stat-clean': { format: 'story', layout: 'stat', look: 'clean', width: 540, height: 960 },
  'story-list-bold': { format: 'story', layout: 'list', look: 'bold', width: 540, height: 960 },
  'story-list-clean': { format: 'story', layout: 'list', look: 'clean', width: 540, height: 960 },
  'story-offer-bold': { format: 'story', layout: 'offer', look: 'bold', width: 540, height: 960 },
  'link-hero-clean': { format: 'link', layout: 'hero', look: 'clean', width: 960, height: 502 },
  'link-offer-bold': { format: 'link', layout: 'offer', look: 'bold', width: 960, height: 502 },
  'x_header-statement-clean': { format: 'x_header', layout: 'statement', look: 'clean', width: 1200, height: 400 },
  'linkedin_banner-hero-bold': { format: 'linkedin_banner', layout: 'hero', look: 'bold', width: 1200, height: 300 },
  'landscape-hero-clean': { format: 'landscape', layout: 'hero', look: 'clean', width: 960, height: 540 },
  'landscape-list-bold': { format: 'landscape', layout: 'list', look: 'bold', width: 960, height: 540 },
  'landscape-stat-clean': { format: 'landscape', layout: 'stat', look: 'clean', width: 960, height: 540 },
  'landscape-cta-bold': { format: 'landscape', layout: 'cta', look: 'bold', width: 960, height: 540 },
  'landscape-list-clean': { format: 'landscape', layout: 'list', look: 'clean', width: 960, height: 540 },
  'landscape-screenshot-clean': { format: 'landscape', layout: 'screenshot', look: 'clean', width: 960, height: 540 },
  'story-screenshot-bold': { format: 'story', layout: 'screenshot', look: 'bold', width: 540, height: 960 },
} as const satisfies Record<string, ExampleImage>;

export type ExampleId = keyof typeof EXAMPLES;

/** What each layout shows, for alt text. */
const SHOWS: Record<Layout, string> = {
  hero: '"Sourdough baked before sunrise" with an "Order for pickup" button',
  statement: '"Bread worth waking up for"',
  stat: '"36h" in large type over "Slow fermentation"',
  list: '"Why Crumb & Co" with three numbered reasons',
  offer: '"20% off your first subscription" with a "Claim the offer" button',
  cta: '"Fresh bread, every morning" with an "Order for pickup" button',
  screenshot: '"Pick your loaves in two taps" with the bakery’s order page in a device frame',
};

export interface Example extends ExampleImage {
  id: string;
  src: string;
  /** "Square post · 1:1 · 1080×1080". */
  label: string;
  alt: string;
}

export function getExample(id: string): Example {
  const image: ExampleImage | undefined = (EXAMPLES as Record<string, ExampleImage>)[id];
  if (!image) throw new Error(`Unknown example image: ${id}`);
  const format = MEDIA_FORMATS[image.format];
  return {
    ...image,
    id,
    src: `/examples/${id}.webp`,
    label: `${format.label} · ${format.ratio} · ${format.width}×${format.height}`,
    alt: `${format.label} for Crumb & Co, a fictional bakery, in the ${image.look} look: ${SHOWS[image.layout]}`,
  };
}

/** Example rows used on the home page and the video page. */
export const HOME_EXAMPLES: ExampleId[] = ['square-hero-clean', 'portrait-list-bold', 'story-stat-clean', 'square-offer-bold'];
export const BANNER_EXAMPLES: ExampleId[] = ['link-hero-clean', 'x_header-statement-clean', 'linkedin_banner-hero-bold'];
export const VIDEO_EXAMPLES: ExampleId[] = ['story-hero-bold', 'story-screenshot-bold', 'story-list-clean', 'story-cta-clean'];
export const LANDSCAPE_EXAMPLES: ExampleId[] = ['landscape-hero-clean', 'landscape-screenshot-clean', 'landscape-stat-clean', 'landscape-cta-bold'];
/** The hero collage on the home page: a story between two feed posts. */
export const HERO_EXAMPLES: ExampleId[] = ['square-hero-clean', 'story-hero-bold', 'portrait-list-bold'];
