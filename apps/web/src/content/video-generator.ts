import { PRICES } from './features';
import type { PriceRow } from './pricing';
import type { Faq } from './pricing';

export const videoPage = {
  path: '/open-source-ai-video-generator',
  seoTitle: 'Open-Source AI Video Generator You Can Self-Host',
  h1: 'Open-Source AI Video Generator',
  description:
    'Open-source AI video generator for reels, promo videos and tutorials, built from your website and rendered on your own server with Chrome and FFmpeg.',
  lede: 'Reels, promo videos and tutorials built from your website, with AI voiceover, music and captions. Rendered on your own server, with code you can read.',
};

export const videoKinds = [
  {
    title: 'Reels',
    body: '9:16 videos for Instagram Reels, TikTok and YouTube Shorts, with a hook in the first two seconds and word-by-word captions.',
    href: '/features/ai-reel-generator',
    link: 'AI reel generator',
  },
  {
    title: 'Promo videos',
    body: '16:9, 1:1 or 9:16 videos about your business, written from your selling points and shown with your own screens.',
    href: '/features/url-to-video',
    link: 'URL to video',
  },
  {
    title: 'Tutorials',
    body: 'Getting-started videos with one step per scene, from your product’s own screenshots, narrated.',
    href: '/features/product-demo-video-maker',
    link: 'Product demo video maker',
  },
];

export const pipeline = [
  { title: 'A storyboard, not a black box', body: 'Each video is a list of scenes: layout, on-screen text, picture, narration and duration. You can edit every field.' },
  { title: 'Checks before rendering', body: 'A missing hook or call to action, voiceover pace, reading time, hype words and figures not found on your website are flagged.' },
  { title: 'Scenes as HTML and CSS', body: 'Ten scene layouts are rendered as web pages in headless Chrome, with your brand fonts and colors.' },
  { title: 'Video with Hyperframes and FFmpeg', body: 'Hyperframes (Apache-2.0) turns the scenes into frames, and FFmpeg adds voice, music and captions and writes the MP4.' },
  { title: 'Files you keep', body: 'Each render gives an MP4, a poster thumbnail and an SRT caption file, saved in your library.' },
];

export const aiLayers = {
  does: ['Reads your website and writes the script', 'Voiceover for each scene', 'A music bed', 'Optional backdrop pictures', 'Optional B-roll clips'],
  never: ['Draws your text: headlines and captions are real text in your fonts', 'Invents figures: claims not found on your site are flagged', 'Changes your logo or colors'],
};

export const selfHostRequirements = [
  'Docker and about 2 vCPU and 4 GB of memory for video rendering',
  'Media files in a Docker volume (MEDIA_DIR), backed up like any folder',
  'One render at a time by default; raise RENDER_CONCURRENCY on bigger servers',
];

export const videoCosts: PriceRow[] = [
  { action: 'Write a video', unit: 'Scenes, on-screen text and narration', price: PRICES.write },
  { action: 'Voiceover', unit: 'Per scene', price: PRICES.voice },
  { action: 'Music bed', unit: 'Per video', price: PRICES.music },
  { action: 'AI picture', unit: 'Only if used', price: `${PRICES.aiPicture} each` },
  { action: 'AI video clip', unit: 'Only if used, per second', price: PRICES.clip },
  { action: 'Rendering', unit: 'On your server or the hosted app', price: '$0' },
];

export const videoFaqs: Faq[] = [
  {
    question: 'Is OpenPromo really open source?',
    answer: [
      'Yes. The app is MIT licensed, and the video renderer it uses, Hyperframes, is Apache-2.0. Everything runs on your server: headless Chrome, FFmpeg, Postgres and the app itself.',
    ],
  },
  {
    question: 'Is it an open-source video generator without AI?',
    answer: [
      'Partly. The layouts, text and rendering are plain templates that need no AI. AI writes the script and makes the voice and music, and optional pictures and clips, through your own YepAPI key.',
    ],
  },
  {
    question: 'Which AI models does it use?',
    answer: ['Models for writing, voice, music, pictures and clips are called through YepAPI with your own key. Each call is logged with its price in Settings and usage.'],
  },
  {
    question: 'How long does a render take?',
    answer: ['It depends on the length of the video and your server’s CPU. Renders run in the background with a progress bar, so you can keep working.'],
  },
];
