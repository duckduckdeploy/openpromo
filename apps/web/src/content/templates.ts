import { CREATION_TYPES, estimateTemplateUsd, type PromoTemplate, RECIPES, TEMPLATE_GROUPS, TEMPLATE_PREVIEWS, TEMPLATES, type TemplateGroup } from '@openpromo/shared';

/**
 * The public template gallery: every template in the app, with a page each. Titles follow
 * keyword research (US, October 2026; private notes): "comic strip template" 8.1k a month,
 * "POV meme" 3.6k, "quote template" 3.6k, "90s commercial" 2.4k, "AI UGC" 1.9k, "brand mascot" 1.6k.
 * Kept to about 50 characters, since the layout adds " · OpenPromo".
 */
export const templateTitles: Record<string, string> = {
  'bold-headline': 'Bold Headline Post Template',
  'product-spotlight': 'Product Spotlight Post Template',
  'lifestyle-photo': 'AI Lifestyle Photo Template for Brands',
  'quote-card': 'Customer Quote Template for Instagram',
  'big-number': 'Big Number Stat Post Template',
  'offer-banner': 'Sale and Offer Post Template',
  'ai-poster': 'AI Poster Generator From Your Website',
  'mascot-post': 'Brand Mascot Post Template',
  'comic-panel': 'Comic Panel Template for Brands',
  'before-after': 'Before and After Post Template',
  'event-announcement': 'Event Announcement Post Template',
  'luxury-minimal': 'Minimalist Luxury Post Template',
  'youtube-thumbnail': 'AI YouTube Thumbnail Template',
  'tips-carousel': 'Instagram Carousel Template for Tips',
  'product-carousel': 'Product Carousel Template',
  'comic-carousel': 'Comic Strip Template for Brands',
  'ugc-testimonial': 'AI UGC Video Template',
  'street-interview': 'Street Interview Video Template',
  'founder-story': 'Founder Story Video Template',
  'pov-meme': 'POV Meme Video Template',
  'day-in-the-life': 'Day in the Life Video Template',
  'cinematic-product': 'Cinematic Product Video Template',
  'asmr-product': 'ASMR Product Video Template',
  'mascot-skit': 'Brand Mascot Video Template',
  claymation: 'Claymation Video Template',
  'anime-short': 'Anime Ad Template',
  'comic-story': 'Animated Comic Video Template',
  'retro-ad': '90s Commercial Template',
  'kinetic-type': 'Kinetic Typography Reel Template',
  listicle: 'Top 3 Tips Reel Template',
  transformation: 'Transformation Video Template',
  'app-demo-reel': 'App Demo Video Template',
  'offer-countdown': 'Countdown Sale Video Template',
  'brand-film': 'Brand Film Template',
  'mascot-explainer': 'Mascot Explainer Video Template',
  'whiteboard-explainer': 'Whiteboard and Doodle Explainer Template',
  'customer-story': 'Customer Testimonial Video Template',
  'presenter-promo': 'Spokesperson Video Template',
  'feature-tour': 'Feature Video Template',
  'retro-commercial': 'Retro TV Commercial Template',
  'getting-started': 'Tutorial Video Template',
  'faq-video': 'FAQ Video Template',
  'how-to-animated': 'Animated How-To Video Template',
};

/** The three gallery sections, each with its own hub page. */
export const templateKinds = [
  {
    id: 'images',
    types: ['image', 'carousel'],
    name: 'Image templates',
    title: 'Instagram Post and Carousel Templates',
    heading: 'Instagram post and carousel templates',
    summary: 'Posts, carousels, banners and thumbnails, written from your website and set in your brand fonts and colours.',
  },
  {
    id: 'reels',
    types: ['reel'],
    name: 'Reel templates',
    title: 'Reel and TikTok Video Templates',
    heading: 'Reel, TikTok and Shorts templates',
    summary: 'Vertical videos with real people, characters, comics and motion type, with voiceover, music and captions.',
  },
  {
    id: 'videos',
    types: ['promo', 'tutorial'],
    name: 'Video templates',
    title: 'Promo, Explainer and Tutorial Video Templates',
    heading: 'Promo, explainer and tutorial video templates',
    summary: 'Longer videos for websites, YouTube and ads: brand films, explainers, testimonials and walkthroughs.',
  },
] as const;
export type TemplateKind = (typeof templateKinds)[number]['id'];

export const kindOf = (t: PromoTemplate): TemplateKind => templateKinds.find((k) => (k.types as readonly string[]).includes(t.type))!.id;
export const templatesOfKind = (kind: TemplateKind) => TEMPLATES.filter((t) => kindOf(t) === kind);
export const getTemplateById = (id: string) => TEMPLATES.find((t) => t.id === id);
export const previewOf = (t: PromoTemplate) => TEMPLATE_PREVIEWS[t.id]?.[0];
export const isVideoTemplate = (t: PromoTemplate) => CREATION_TYPES[t.type].video;
export const groupName = (g: TemplateGroup) => TEMPLATE_GROUPS[g].label;
export const recipeName = (t: PromoTemplate) => RECIPES[t.recipe].label;

export function priceText(t: PromoTemplate): string {
  const usd = estimateTemplateUsd(t);
  return usd < 1 ? `about $${usd.toFixed(2)}` : `about $${Number.isInteger(usd) ? usd : usd.toFixed(1)}`;
}

/** Plain-language names of the models a template uses, for the "made with" line. */
const MODEL_NAMES: Record<string, string> = {
  'openai/gpt-image-2': 'GPT Image 2',
  'google/veo-3-lite': 'Veo 3.1 Lite',
  'x-ai/grok-imagine-video-1.5': 'Grok Imagine Video 1.5',
  'elevenlabs/eleven-v4': 'ElevenLabs v4',
  'google/lyria-3-clip': 'Lyria 3',
};

export function modelsOf(t: PromoTemplate): string[] {
  const r = RECIPES[t.recipe];
  const video = isVideoTemplate(t);
  const ids = [
    t.models?.image ?? (t.recipe === 'layout' && !t.look ? undefined : r.image),
    video ? (t.models?.video ?? r.video) : undefined,
    video && t.narration === 'voiceover' ? r.speech : undefined,
    video && t.music ? r.music : undefined,
  ].filter((id): id is string => Boolean(id));
  return [...new Set(ids)].map((id) => MODEL_NAMES[id] ?? id);
}

/** Questions every template page answers. */
export function templateFaqs(t: PromoTemplate) {
  const video = isVideoTemplate(t);
  const models = modelsOf(t);
  return [
    {
      question: `How much does the ${t.name.toLowerCase()} template cost to make?`,
      answer: [
        `Each one costs ${priceText(t)} in AI credits, paid at cost with your own key. OpenPromo adds no markup. Writing the script is a few cents, and you see it before anything is made.`,
        video ? 'Rendering again after an edit only pays for the scenes you changed.' : 'Changing the text and rendering again costs nothing.',
      ],
    },
    {
      question: 'Do I have to write the script?',
      answer: [
        'No. Add your website and OpenPromo reads it: what you sell, your prices, your reviews, your colours and fonts. The writer fills the template from that, and you can edit every scene, or give it an angle such as a product or an offer.',
      ],
    },
    {
      question: 'Which AI models make it?',
      answer: [
        models.length
          ? `${models.join(', ')}. They were picked in a side-by-side test of the image, video and voice models available, on quality for the price.`
          : 'No AI pictures are needed: the template is drawn in your brand fonts and colours.',
        t.recipe === 'cast-story' || t.cast === 'mascot' ? 'A reference sheet of each character is drawn first and every scene is drawn from it, so they look the same throughout.' : '',
      ].filter(Boolean),
    },
  ];
}
