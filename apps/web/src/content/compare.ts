import type { Faq } from './pricing';

export interface CompareRow {
  label: string;
  openpromo: string;
  them: string;
}

export interface Comparison {
  slug: string;
  /** The other product's name, as written in sentences. */
  name: string;
  /** Page H1: the exact head keyword. */
  h1: string;
  /** Title tag, keyword first. The " · OpenPromo" suffix is added by the template. */
  seoTitle: string;
  /** Meta description, 120 to 155 characters. */
  description: string;
  /** One sentence for cards, the footer and llms.txt. */
  summary: string;
  /** Short line under the H1. */
  headline: string;
  /** What the other product is, in general and cautious terms. */
  intro: string[];
  rows: CompareRow[];
  /** Where OpenPromo differs. */
  differences: { title: string; body: string }[];
  /** When the other product is the better choice, said plainly. */
  theirFit: string[];
  faqs: Faq[];
}

/** Rows every comparison shares: what OpenPromo is, whoever it is compared with. */
const SOURCE = 'Open source, MIT license';
const RUNS = 'Your own server with Docker, or the hosted app';
const PAYS = 'Free software; you pay your own YepAPI usage, under a monthly limit you set';
const FILES = 'Your database and media folder when self-hosted';

/** The differences that hold against every closed, hosted tool. */
const OPEN = {
  title: 'Open source and self-hostable',
  body: 'The whole app is MIT licensed. Run it on your own server with one Docker command, read the code, change it and keep your changes.',
};
const SPEND = {
  title: 'You control the spending',
  body: 'There is no plan to outgrow. AI calls are billed to your own YepAPI key, every call is logged with its price, and a monthly limit refuses any call that would cross it.',
};
const GROUNDED = {
  title: 'Built from your website, with sources',
  body: 'OpenPromo reads your site into a brand profile first. Each selling point keeps the sentence it came from, and figures that are not on your website are flagged before you render.',
};
const REAL_TEXT = {
  title: 'Real text, never drawn by AI',
  body: 'Headlines and captions are real text in your brand fonts, rendered from templates. AI only makes backdrop pictures, B-roll, voice and music, so there is no garbled lettering.',
};
const AGENTS = {
  title: 'Made for agents too',
  body: 'An MCP server, a REST API and a Claude plugin let your AI agent read the brand, write ideas and render media with the same limits as you.',
};

export const comparisons: Comparison[] = [
  {
    slug: 'canva-alternative',
    name: 'Canva',
    h1: 'Canva Alternative',
    seoTitle: 'Canva Alternative: Open-Source and Self-Hosted',
    description:
      'An open-source Canva alternative for brand media: OpenPromo reads your website and writes on-brand posts, banners and videos. Free to self-host.',
    summary: 'OpenPromo compared with Canva: a self-hosted tool that writes brand media from your website, next to a hosted design editor.',
    headline: 'Less time in an editor. More posts that sound like you.',
    intro: [
      'Canva is an online design platform with a large template library, a drag-and-drop editor, stock media and AI features. It is closed source, runs in the cloud and has a free plan and paid subscription plans.',
      'In Canva you usually start from a template and fill in your own text and brand. OpenPromo starts from your website: it reads it, builds a brand profile and writes the first draft of each post or video for you.',
    ],
    rows: [
      { label: 'Main focus', openpromo: 'Brand media written from your website', them: 'General design editor with templates' },
      { label: 'Starts from', openpromo: 'Your website address', them: 'A template or a blank canvas' },
      { label: 'Source code', openpromo: SOURCE, them: 'Closed source' },
      { label: 'Where it runs', openpromo: RUNS, them: 'Hosted only' },
      { label: 'How you pay', openpromo: PAYS, them: 'Free plan and subscription plans' },
      { label: 'Where your files live', openpromo: FILES, them: 'In the provider’s cloud' },
    ],
    differences: [GROUNDED, OPEN, SPEND, AGENTS],
    theirFit: [
      'You want to design by hand, with full control of every element on the page.',
      'You need a large stock library, print products or presentations.',
      'Your team already works together in one shared design editor.',
    ],
    faqs: [
      {
        question: 'Is OpenPromo a free Canva alternative?',
        answer: [
          'OpenPromo is open source and free to self-host, and the hosted app costs nothing today. AI work runs on your own YepAPI key, billed per use, so you pay only for what you make.',
        ],
      },
      {
        question: 'Is there an open-source Canva alternative?',
        answer: [
          'For brand social media and promo videos, yes: OpenPromo is MIT licensed. It is not a general design editor; it writes and renders posts, carousels, banners and videos from your brand profile.',
        ],
      },
      {
        question: 'Can I edit the designs?',
        answer: ['Yes. Edit text, layout, pictures and timing in the editor with a live preview, then render again.'],
      },
    ],
  },
  {
    slug: 'invideo-alternative',
    name: 'InVideo',
    h1: 'InVideo Alternative',
    seoTitle: 'InVideo Alternative: Open-Source AI Video Maker',
    description:
      'An open-source InVideo alternative: OpenPromo turns your website into reels and promo videos with voiceover and captions. Self-host it with Docker.',
    summary: 'OpenPromo compared with InVideo AI: brand videos built from your website, self-hosted, next to a hosted prompt-to-video tool.',
    headline: 'Videos about your business, built from what your website says.',
    intro: [
      'InVideo AI is an online video maker that turns a text prompt into a video with stock footage, an AI voice and subtitles. It is closed source, runs in the cloud and is sold as subscription plans.',
      'OpenPromo makes short brand videos instead: reels, promo videos and tutorials built from your brand profile, your own screenshots and your fonts and colors.',
    ],
    rows: [
      { label: 'Main focus', openpromo: 'Reels, promo videos and tutorials for your brand', them: 'Videos from a text prompt' },
      { label: 'Starts from', openpromo: 'Your website address', them: 'A prompt or script' },
      { label: 'Source code', openpromo: SOURCE, them: 'Closed source' },
      { label: 'Where it runs', openpromo: RUNS, them: 'Hosted only' },
      { label: 'How you pay', openpromo: PAYS, them: 'Subscription plans' },
      { label: 'Where your files live', openpromo: FILES, them: 'In the provider’s cloud' },
    ],
    differences: [GROUNDED, REAL_TEXT, OPEN, SPEND],
    theirFit: [
      'You want long videos on any topic, not only about your own business.',
      'You want a large stock footage library to build videos from.',
      'You prefer to type a prompt and get a finished video with nothing to set up.',
    ],
    faqs: [
      {
        question: 'Is OpenPromo an InVideo AI alternative?',
        answer: [
          'For marketing videos about your own business, yes. OpenPromo makes 9:16 reels, 16:9, 1:1 and 9:16 promo videos and tutorials from your website, with AI voiceover, music and captions.',
        ],
      },
      {
        question: 'Does OpenPromo use stock footage?',
        answer: ['It uses your website screenshots and uploads first. It can make AI pictures and short AI clips as B-roll when you allow it.'],
      },
    ],
  },
  {
    slug: 'arcads-alternative',
    name: 'Arcads',
    h1: 'Arcads Alternative',
    seoTitle: 'Arcads Alternative: Open-Source Promo Videos',
    description:
      'An open-source Arcads alternative for brands that want promo videos without AI actors: reels and ads from your website, with voiceover. Self-hosted.',
    summary: 'OpenPromo compared with Arcads: scene-based promo videos from your website, next to AI-actor video ads.',
    headline: 'Promo videos that show your product, not an actor.',
    intro: [
      'Arcads makes UGC-style video ads in which AI actors read your script to camera. It is closed source, runs in the cloud and is sold as subscription plans.',
      'OpenPromo takes another route: scene-based videos with your own screens, your selling points as on-screen text, an AI voiceover and music. There are no avatars or actors.',
    ],
    rows: [
      { label: 'Main focus', openpromo: 'Reels and promo videos with on-screen text', them: 'Video ads with AI actors' },
      { label: 'Starts from', openpromo: 'Your website address', them: 'A script and an actor' },
      { label: 'Source code', openpromo: SOURCE, them: 'Closed source' },
      { label: 'Where it runs', openpromo: RUNS, them: 'Hosted only' },
      { label: 'How you pay', openpromo: PAYS, them: 'Subscription plans' },
      { label: 'Where your files live', openpromo: FILES, them: 'In the provider’s cloud' },
    ],
    differences: [GROUNDED, REAL_TEXT, OPEN, SPEND],
    theirFit: [
      'You want a person talking to camera in your ads.',
      'You test many actor and hook variations for paid social.',
    ],
    faqs: [
      {
        question: 'Does OpenPromo have AI actors?',
        answer: ['No. OpenPromo makes scene-based videos: text, your screenshots and pictures, an AI voiceover and music.'],
      },
      {
        question: 'Creatify vs Arcads: where does OpenPromo fit?',
        answer: [
          'Both are hosted tools for video ads with AI people on screen. OpenPromo is open source and self-hostable, and makes brand posts and promo videos from your website without avatars. See also the [Creatify alternative](/compare/creatify-alternative) page.',
        ],
      },
    ],
  },
  {
    slug: 'creatify-alternative',
    name: 'Creatify',
    h1: 'Creatify Alternative',
    seoTitle: 'Creatify Alternative: Open-Source URL to Video',
    description:
      'An open-source Creatify alternative: OpenPromo turns your website into promo videos, reels and posts with AI voiceover. Pay per use with your own key.',
    summary: 'OpenPromo compared with Creatify: open-source URL-to-video and brand posts, next to a hosted video ad platform.',
    headline: 'From your website to a promo video, on your own server.',
    intro: [
      'Creatify makes video ads from a product link, with AI avatars and ad templates. It is closed source, runs in the cloud and is sold as subscription plans with credits.',
      'OpenPromo also starts from a link, but reads the whole website into an editable brand profile and makes posts, carousels, banners, reels, promo videos and tutorials from it.',
    ],
    rows: [
      { label: 'Main focus', openpromo: 'Brand posts, reels, promo videos and tutorials', them: 'Video ads, with AI avatars' },
      { label: 'Starts from', openpromo: 'Your website address', them: 'A product link' },
      { label: 'Source code', openpromo: SOURCE, them: 'Closed source' },
      { label: 'Where it runs', openpromo: RUNS, them: 'Hosted only' },
      { label: 'How you pay', openpromo: PAYS, them: 'Subscription plans with credits' },
      { label: 'Where your files live', openpromo: FILES, them: 'In the provider’s cloud' },
    ],
    differences: [SPEND, OPEN, GROUNDED, AGENTS],
    theirFit: [
      'You want AI avatars presenting your product.',
      'Your work is mostly paid video ads and you want ad-focused tooling in one place.',
    ],
    faqs: [
      {
        question: 'How does OpenPromo pricing compare with Creatify pricing?',
        answer: [
          'OpenPromo has no plans or credits of its own. The software is free to self-host, and the hosted app costs nothing today. AI work is billed per use to your own YepAPI key: a 30-second reel is about $0.15 to $0.50. See [pricing](/pricing).',
        ],
      },
      {
        question: 'Can OpenPromo make video ads?',
        answer: ['It makes promo videos and 9:16 reels you can use as ads, plus 1200×628 ad banners. It does not run or buy ads.'],
      },
    ],
  },
  {
    slug: 'predis-ai-alternative',
    name: 'Predis.ai',
    h1: 'Predis AI Alternative',
    seoTitle: 'Predis AI Alternative: Open-Source Post Maker',
    description:
      'An open-source Predis AI alternative: on-brand posts, carousels, captions and reels from your website. Self-host it, and pay only your own AI usage.',
    summary: 'OpenPromo compared with Predis.ai: open-source brand posts, carousels and reels, next to a hosted post generator with scheduling.',
    headline: 'Posts, carousels and reels from your website, without a plan.',
    intro: [
      'Predis.ai generates social media posts, carousels and short videos with captions and hashtags, and can schedule them to social networks. It is closed source, runs in the cloud and is sold as subscription plans.',
      'OpenPromo covers the making part: ideas, captions, posts, carousels, banners, reels and videos, built from a brand profile of your website. It does not publish or schedule.',
    ],
    rows: [
      { label: 'Main focus', openpromo: 'Brand posts, carousels, reels and videos', them: 'Posts, carousels and videos, with scheduling' },
      { label: 'Starts from', openpromo: 'Your website address', them: 'A prompt' },
      { label: 'Source code', openpromo: SOURCE, them: 'Closed source' },
      { label: 'Where it runs', openpromo: RUNS, them: 'Hosted only' },
      { label: 'How you pay', openpromo: PAYS, them: 'Subscription plans' },
      { label: 'Where your files live', openpromo: FILES, them: 'In the provider’s cloud' },
    ],
    differences: [GROUNDED, OPEN, SPEND, REAL_TEXT],
    theirFit: ['You want posting and scheduling to social networks in the same tool.', 'You prefer a hosted service with nothing to set up.'],
    faqs: [
      {
        question: 'How does OpenPromo pricing compare with Predis AI pricing?',
        answer: [
          'OpenPromo is free to self-host. The hosted app costs nothing today (limits may come later, depending on funding), and AI work is billed per use to your own YepAPI key. Writing a post costs about $0.02 to $0.08 and rendering it from a template is free.',
        ],
      },
      {
        question: 'Does OpenPromo post to social media?',
        answer: ['Not yet. You download the files and captions and post them yourself or with your scheduler.'],
      },
    ],
  },
  {
    slug: 'pomelli-alternative',
    name: 'Google Pomelli',
    h1: 'Google Pomelli Alternative',
    seoTitle: 'Google Pomelli Alternative You Can Self-Host',
    description:
      'What Google Pomelli is, and an open-source Pomelli AI alternative that reads your website into a brand profile and makes posts and videos.',
    summary: 'What Google Pomelli is, and how OpenPromo differs: open source, self-hosted, with reels and videos as well as posts.',
    headline: 'The same first step, your website. Then it is yours to run.',
    intro: [
      'Pomelli is an AI marketing experiment from Google Labs. It reads your website to build a profile of your business, which it calls Business DNA, and suggests on-brand social media campaigns from it. As a Labs experiment, it is free to try where it is available, and its features and availability can change.',
      'OpenPromo starts the same way, from your website, but it is open-source software you can run yourself. It makes posts, carousels and banners, and also reels, promo videos and tutorials with voiceover.',
    ],
    rows: [
      { label: 'Main focus', openpromo: 'Posts, carousels, banners, reels, promo videos and tutorials', them: 'Social media campaigns' },
      { label: 'Starts from', openpromo: 'Your website address', them: 'Your website address' },
      { label: 'Source code', openpromo: SOURCE, them: 'Closed source' },
      { label: 'Where it runs', openpromo: RUNS, them: 'Hosted by Google' },
      { label: 'How you pay', openpromo: PAYS, them: 'Free experiment, at the time of writing' },
      { label: 'Where your files live', openpromo: FILES, them: 'In Google’s cloud' },
    ],
    differences: [OPEN, REAL_TEXT, GROUNDED, AGENTS],
    theirFit: ['You want a free hosted experiment with nothing to set up and no API key.', 'You only need social posts and are happy with a tool that may change.'],
    faqs: [
      {
        question: 'What is Google Pomelli?',
        answer: [
          'Pomelli is an experiment from Google Labs that builds a profile of your business from your website and suggests on-brand social media content from it.',
        ],
      },
      {
        question: 'Is Pomelli AI open source?',
        answer: ['No. Pomelli is a hosted Google Labs experiment. OpenPromo is open source under the MIT license and runs on your own server.'],
      },
      {
        question: 'Does OpenPromo make videos?',
        answer: ['Yes. Reels for Instagram, TikTok and Shorts, promo videos in 16:9, 1:1 and 9:16, and narrated tutorials.'],
      },
    ],
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((comparison) => comparison.slug === slug);
}
