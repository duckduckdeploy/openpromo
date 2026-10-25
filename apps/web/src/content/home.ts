import { Bot, Code2, Server, ShieldCheck, type LucideIcon } from 'lucide-react';
import { MCP_TOOLS } from './mcp-tools';
import type { Faq } from './pricing';

export const ledger = [
  { value: 'MIT', label: 'Open-source license' },
  { value: '1', label: 'Docker command to self-host' },
  { value: '7', label: 'Image and video sizes' },
  { value: String(MCP_TOOLS.length), label: 'MCP tools for your AI agent' },
];

export const howSteps = [
  {
    title: 'Add your website',
    body: 'OpenPromo opens a handful of pages in headless Chrome, takes screenshots and reads what your business says about itself.',
  },
  {
    title: 'Check your brand profile',
    body: 'What you do, who it is for, your voice and selling points, each with the sentence it came from. Plus colors, fonts, logo and products. Edit anything.',
  },
  {
    title: 'Pick an idea',
    body: 'Post ideas with a hook, caption and hashtags, each based on your selling points. Click "Make it", or write your own brief.',
  },
  {
    title: 'Check, edit and render',
    body: 'Checks flag hype words, invented figures and missing calls to action. Edit with a live preview, then render images, carousels, reels or videos.',
  },
];

export const makes = [
  { title: 'Posts and stories', body: 'Square 1:1, portrait 4:5 and story 9:16 for Instagram, Facebook and LinkedIn.', href: '/features/instagram-post-generator' },
  { title: 'Carousels', body: 'PNG slides for Instagram and a PDF for LinkedIn.', href: '/features/carousel-maker' },
  { title: 'Banners', body: 'Link and ad banners, X headers and LinkedIn banners at exact sizes.', href: '/features/banner-maker' },
  { title: 'Reels', body: '9:16 videos with a hook, voiceover, music and word-by-word captions.', href: '/features/ai-reel-generator' },
  { title: 'Promo videos', body: '16:9, 1:1 or 9:16 videos about your business, from your website.', href: '/features/url-to-video' },
  { title: 'Tutorials', body: 'One step per scene, from your own screenshots, narrated.', href: '/features/product-demo-video-maker' },
];

export const control: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Code2,
    title: 'Open source, all of it',
    body: 'The app, the API, the renderer and the agent server are MIT licensed. Read every line, change what you need and keep your changes.',
  },
  {
    icon: Server,
    title: 'Your server, your data',
    body: 'Run it on your own computer or server with Docker. Brand profiles stay in your database and media files in your own folder.',
  },
  {
    icon: ShieldCheck,
    title: 'No surprise bills',
    body: 'AI calls go to your own YepAPI key. Every call is logged with its price, and a monthly limit refuses any call that would cross it.',
  },
  {
    icon: Bot,
    title: 'Real text, real claims',
    body: 'Text is always real text in your fonts, never drawn by an AI model. Figures that are not on your website are flagged before you render.',
  },
];

export const selfHostPoints = [
  'One compose file: database, API with the renderer, dashboard and site',
  'Any machine with Docker and about 2 vCPU and 4 GB of memory',
  'Automatic HTTPS for your own domain',
];

export const homeFaqs: Faq[] = [
  {
    question: 'What is OpenPromo?',
    answer: [
      'OpenPromo is an open-source AI marketing tool. You add your website, it builds a brand profile, and every tool uses that profile to make posts, carousels, banners, reels, promo videos and tutorials.',
    ],
  },
  {
    question: 'Is it one of the free AI tools for marketing?',
    answer: [
      'The software is free: open source under the MIT license, and free to self-host. The hosted app costs nothing today. AI work runs on your own YepAPI key, so you pay YepAPI only for what you use. See [pricing](/pricing).',
    ],
  },
  {
    question: 'What does the AI do, and what does it not do?',
    answer: [
      'AI reads your website, writes ideas, captions and scripts, and can make backdrop pictures, B-roll clips, voiceovers and music. It never draws your text: headlines and captions are real text set in your brand fonts by templates.',
    ],
  },
  {
    question: 'Can my AI agent use it?',
    answer: [
      'Yes. OpenPromo has a [marketing MCP server](/docs/mcp), a REST API and a Claude plugin with skills for brand checks, content plans, social posts, promo reels and tutorial videos.',
    ],
  },
  {
    question: 'Does it publish to social networks?',
    answer: ['Not yet. You download the files with their captions and post them yourself or with your scheduler.'],
  },
];
