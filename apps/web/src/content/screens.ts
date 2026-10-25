/**
 * Dashboard screenshots in public/screens, taken from the real app with a fictional bakery
 * (Crumb & Co). Balance and spend in the sidebar are demo figures.
 */
export interface Screen {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

const shot = (name: string, alt: string, caption: string): Screen => ({ src: `/screens/${name}.webp`, alt, caption, width: 1440, height: 900 });

export const SCREENS = {
  brandProfile: shot(
    'brand-profile',
    'The OpenPromo brand profile for Crumb & Co: name, tagline, description, selling points with the sentence each came from, brand colors, logo and fonts',
    'The brand profile OpenPromo built from a website: selling points with their source, colors, logo and fonts.',
  ),
  postIdeas: shot(
    'post-ideas',
    'Post ideas for Crumb & Co, each with a format, channel, hook, ready caption and hashtags, and a Make it button',
    'Post ideas with hooks, captions and hashtags, each one click from a finished post.',
  ),
  carouselEditor: shot(
    'carousel-editor',
    'The OpenPromo editor showing a five-slide Instagram carousel for Crumb & Co with a live preview, the rendered slides and the slide settings',
    'The editor: slides on the left, a live preview in the brand’s fonts, every field on the right.',
  ),
  reelEditor: shot(
    'reel-editor',
    'The OpenPromo editor showing a six-scene reel for Crumb & Co with scene timings, a live preview and voiceover settings',
    'A reel in the editor: scenes with timings, a live preview, voiceover and backdrop for each scene.',
  ),
  mediaLibrary: shot(
    'media-library',
    'The OpenPromo media library for Crumb & Co with website screenshots, photos, AI pictures, voiceover, music and finished media',
    'The library: website screenshots and photos, AI pictures, voice, music and finished media.',
  ),
} as const;

export type ScreenId = keyof typeof SCREENS;

/** The example reel in public/examples, made for the same fictional bakery. */
export const EXAMPLE_REEL = {
  src: '/examples/reel-crumb.mp4',
  poster: '/examples/reel-crumb-poster.webp',
  width: 540,
  height: 960,
  caption: 'A 32-second reel made by OpenPromo for Crumb & Co, a fictional bakery: voiceover, music and word-by-word captions.',
};
