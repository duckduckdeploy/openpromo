import { PRICES } from './features';

export interface PriceRow {
  action: string;
  /** What one call returns or covers. */
  unit: string;
  /** YepAPI's price at the time of writing. */
  price: string;
  /** The feature page this action belongs to. */
  href?: string;
}

/** Typical prices for common actions, at the time of writing. */
export const priceRows: PriceRow[] = [
  { action: 'Read a website', unit: 'A handful of pages, screenshots and the brand profile', price: PRICES.readSite, href: '/features/brand-kit-generator' },
  { action: 'Write post ideas', unit: 'Up to 20 ideas with hooks, captions and hashtags', price: PRICES.write, href: '/features/instagram-caption-generator' },
  { action: 'Write a creation', unit: 'A post, carousel, banner, reel or video script', price: PRICES.write, href: '/features/instagram-post-generator' },
  { action: 'Render an image or carousel', unit: 'PNG files and a PDF, from templates', price: '$0', href: '/features/carousel-maker' },
  { action: 'AI picture', unit: 'Only when a scene uses one', price: `${PRICES.aiPicture} each` },
  { action: 'Voiceover', unit: 'Per video scene', price: PRICES.voice, href: '/features/ai-reel-generator' },
  { action: 'Music bed', unit: 'Per video', price: PRICES.music },
  { action: 'AI video clip', unit: 'Only when used, per second', price: PRICES.clip },
  { action: '30-second reel', unit: 'Script, voice and music, no AI clips', price: PRICES.reel, href: '/features/ai-reel-generator' },
];

export interface CreditExample {
  amount: string;
  what: string;
  detail: string;
}

/** What $5 of YepAPI credit covers. Each line is an alternative, not a bundle. */
export const creditExamples: CreditExample[] = [
  { amount: '30+', what: 'websites read', detail: 'at $0.05 – $0.15 each' },
  { amount: '60+', what: 'posts or batches of ideas written', detail: 'at $0.02 – $0.08 each' },
  { amount: '10+', what: '30-second reels', detail: 'at $0.15 – $0.50 each' },
];

export interface Faq {
  question: string;
  answer: string[];
}

export const pricingFaqs: Faq[] = [
  {
    question: 'Is OpenPromo free?',
    answer: [
      'The software is open source under the MIT license and free to self-host. The hosted app at openpromo.gg costs nothing today, and every feature is unlimited.',
      'The AI work (reading your website, writing, voices, music and AI pictures) runs on your own YepAPI key. You pay YepAPI per use. OpenPromo adds nothing on top.',
    ],
  },
  {
    question: 'Will the hosted app always be unlimited?',
    answer: [
      'We cannot promise that, and would rather say so now. Running openpromo.gg costs servers, storage and video rendering time. Depending on how the project is funded, the hosted app may get limits later. If that happens, we will announce it well in advance, and nothing you have saved is lost.',
      'The self-hosted version is not affected: it has every feature with no limits.',
    ],
  },
  {
    question: 'Is the self-hosted version limited in any way?',
    answer: ['No. Every feature is in the open-source code, with no feature gates, license keys or usage caps. Your server sets the only limits.'],
  },
  {
    question: 'Who do I pay for AI usage?',
    answer: [
      'YepAPI, directly. You add your own key in Settings, and each AI call is billed to it at YepAPI’s price. OpenPromo never handles that payment.',
    ],
  },
  {
    question: 'How do I keep spending under control?',
    answer: [
      'Set a monthly spending limit in Settings. Before any paid call, OpenPromo checks what it would cost and refuses it if it would cross the limit. Every call is logged with its cost under Settings and usage.',
    ],
  },
  {
    question: 'Does rendering cost anything?',
    answer: [
      'Rendering images and carousels from templates costs nothing. Videos pay for voiceover and music, and any AI pictures or clips you use. Generated pieces are cached, so rendering again after an edit only pays for what is new.',
    ],
  },
  {
    question: 'Can an AI agent overspend?',
    answer: [
      'Agents use the same key and the same monthly limit as you. A call that would cross the limit is refused, whether it comes from you, the REST API or an agent over MCP.',
    ],
  },
];
