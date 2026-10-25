import {
  Clapperboard,
  GalleryHorizontal,
  Globe,
  Image,
  MessageSquareText,
  MonitorPlay,
  Palette,
  RectangleHorizontal,
  type LucideIcon,
} from 'lucide-react';
import type { Faq } from './pricing';

export interface FeatureCapability {
  title: string;
  body: string;
}

export interface FeatureCost {
  action: string;
  /** What one call returns or covers. */
  unit: string;
  /** YepAPI's price at the time of writing. `null` means it is not listed on this site. */
  price: string | null;
}

export interface FeatureStep {
  title: string;
  body: string;
}

export interface Feature {
  slug: string;
  /** Short name used in navigation, cards and tables. */
  name: string;
  /** Title tag, keyword first. The " · OpenPromo" suffix is added by the template. */
  seoTitle: string;
  /** Use seoTitle as the whole title tag, without the suffix (when the suffix would pass 60 characters). */
  absoluteTitle?: boolean;
  /** Page H1: the exact head keyword, 2 to 5 words. */
  h1: string;
  /** Short line under the H1, in the product's voice. */
  headline: string;
  /** One sentence, used on cards and under the headline. */
  summary: string;
  /** Meta description, 120 to 155 characters. */
  description: string;
  icon: LucideIcon;
  /** Example images (ids in content/examples.ts) and the H2 above them. */
  examples: string[];
  examplesTitle: string;
  examplesNote: string;
  /** H2 of the "how it works" section, keyword-led. */
  howTitle: string;
  steps: FeatureStep[];
  /** H2 of the capabilities section, keyword-led. */
  capabilitiesTitle: string;
  capabilities: FeatureCapability[];
  /** H2 of the cost section, keyword-led. */
  costsTitle: string;
  costs: FeatureCost[];
  costNote?: string;
  /** Two other feature pages this one links to. */
  related: [string, string];
  /** Questions answered on the page, also published as FAQPage structured data. */
  faqs: Faq[];
}

export const UNLISTED_PRICE_LABEL = 'Listed in Settings and usage';

/** Prices that several features share, at the time of writing. */
export const PRICES = {
  readSite: '$0.05 – $0.15',
  write: '$0.02 – $0.08',
  aiPicture: '$0.04 – $0.20',
  voice: 'about $0.01',
  music: '$0.08',
  clip: 'about $0.11',
  reel: '$0.15 – $0.50',
} as const;

export const features: Feature[] = [
  {
    slug: 'brand-kit-generator',
    name: 'Brand kit generator',
    seoTitle: 'Brand Kit Generator: Your Brand DNA from a URL',
    h1: 'Brand Kit Generator',
    headline: 'Paste your website. Get your brand back, with sources.',
    summary:
      'OpenPromo reads your website and builds a brand profile: what you do, who it is for, your voice, selling points, colors, fonts, logo and products.',
    description:
      'Open-source brand kit generator: paste your website and get colors, fonts, logo, voice and selling points, each with the sentence and page it came from.',
    icon: Palette,
    examples: ['square-hero-clean', 'square-list-bold', 'link-hero-clean'],
    examplesTitle: 'Brand kit generator output in use',
    examplesNote: 'One brand profile, three formats: the colors, fonts and selling points all come from the profile.',
    howTitle: 'How the brand kit generator works',
    steps: [
      {
        title: 'Add your website',
        body: 'Type your address. OpenPromo opens a handful of pages in headless Chrome and takes screenshots of each.',
      },
      {
        title: 'It reads what is there',
        body: 'An AI model reads the page text and writes the profile: what the business does, its audience, voice and selling points. Colors, fonts and the logo are measured from the page itself.',
      },
      {
        title: 'Every claim keeps its source',
        body: 'Each selling point keeps the exact sentence and the page it came from, so you can check it in one click.',
      },
      {
        title: 'You edit, it remembers',
        body: 'Change anything. When you read the site again later, your edits are kept unless you ask for a reset.',
      },
    ],
    capabilitiesTitle: 'Brand kit generator features',
    capabilities: [
      { title: 'Brand DNA in one profile', body: 'Identity, audience, positioning, voice, visual style, products and getting-started flows in one editable profile.' },
      { title: 'Selling points with quotes', body: 'Each point links to the sentence and page it came from. Nothing on your posts is made up from thin air.' },
      { title: 'Colors and fonts from the page', body: 'Brand colors, text and background colors and the fonts your site loads, measured from the rendered page.' },
      { title: 'Logo and its color', body: 'The logo is picked out and saved to your library, with its main color, so templates can place it on a contrasting background.' },
      { title: 'Products and flows', body: 'Products and the steps a new customer takes, ready for product posts and tutorial videos.' },
      { title: 'Brand guidelines your agent can read', body: 'Agents read and update the same profile over MCP, so every tool and every agent works from one source.' },
    ],
    costsTitle: 'Brand kit generator cost',
    costs: [
      { action: 'Read a website', unit: 'A handful of pages, screenshots and the written profile', price: PRICES.readSite },
      { action: 'Read it again', unit: 'Rebuilds the profile; your edits are kept', price: PRICES.readSite },
      { action: 'Edit the profile', unit: 'Any field, as often as you like', price: '$0' },
      { action: 'Upload logos and photos', unit: 'Stored in your library', price: '$0' },
    ],
    related: ['instagram-post-generator', 'product-demo-video-maker'],
    faqs: [
      {
        question: 'What is a brand kit generator?',
        answer: [
          'A brand kit generator collects the parts of your brand that every design needs: colors, fonts, logo and voice. OpenPromo builds it from your live website, so you do not start from a blank form.',
        ],
      },
      {
        question: 'What does "brand DNA" mean here?',
        answer: [
          'It is the short version of what makes your business yours: what you do, who it is for, how you talk and why people buy. In OpenPromo it is the brand profile, and every tool reads from it.',
        ],
      },
      {
        question: 'What if the profile gets something wrong?',
        answer: [
          'Edit it. Every field is editable, and your edits survive when the site is read again. Selling points show their source, so you can see why a point is there before you keep it.',
        ],
      },
      {
        question: 'Does it work for any website?',
        answer: [
          'It works for public websites it can open in a browser. A site with very little text gives a thinner profile, so add what is missing by hand.',
        ],
      },
    ],
  },
  {
    slug: 'instagram-post-generator',
    name: 'Instagram post generator',
    seoTitle: 'Instagram Post Generator That Knows Your Brand',
    h1: 'Instagram Post Generator',
    headline: 'Posts in your fonts and colors, written from your own website.',
    summary:
      'Make Instagram, Facebook and LinkedIn posts in square 1:1, portrait 4:5 and story 9:16, from an idea or a short brief.',
    description:
      'Open-source Instagram post generator: on-brand square, portrait and story posts written from your website, with real text in your own fonts and colors.',
    icon: Image,
    examples: ['square-hero-clean', 'portrait-statement-clean', 'story-stat-bold', 'square-offer-bold', 'portrait-list-bold', 'story-cta-clean'],
    examplesTitle: 'Instagram post examples by format',
    examplesNote: 'Square, portrait and story posts from the same brand profile, in the clean and bold looks.',
    howTitle: 'How the Instagram post generator works',
    steps: [
      { title: 'Pick an idea or write a brief', body: 'Start from a post idea or a sentence about what to say. The writer uses your selling points and voice.' },
      { title: 'It picks a layout', body: 'Hero, statement, big number, list, quote, product, offer or call to action, in the clean, bold or photo look.' },
      { title: 'Checks run before you render', body: 'Hype words, figures not found on your website, reading time and a missing call to action are flagged.' },
      { title: 'Render and download', body: 'Edit the text with a live preview, then render a PNG. Re-render another size from the same post.' },
    ],
    capabilitiesTitle: 'AI Instagram post generator features',
    capabilities: [
      { title: 'Real text, never drawn by AI', body: 'Headlines are real text set in your brand fonts, so there is no garbled lettering. AI only makes backdrop pictures, when you want one.' },
      { title: 'Text that always fits', body: 'A fit pass shrinks text until nothing overflows, in every format.' },
      { title: 'Readable colors', body: 'Color pairs below WCAG AA contrast are fixed automatically.' },
      { title: 'Every feed size', body: 'Square 1:1 and portrait 4:5 for the feed, story 9:16, and the same post for Facebook and LinkedIn.' },
      { title: 'Caption and hashtags', body: 'Each post comes with a caption and hashtags you can edit and copy.' },
      { title: 'Your pictures first', body: 'Website screenshots, product photos and uploads come before AI pictures. AI pictures are optional.' },
    ],
    costsTitle: 'Instagram post generator cost',
    costs: [
      { action: 'Write a post', unit: 'One writing call: text, layout and caption', price: PRICES.write },
      { action: 'Render the image', unit: 'PNG from the template, any size', price: '$0' },
      { action: 'AI backdrop picture', unit: 'Only if a scene asks for one', price: `${PRICES.aiPicture} each` },
      { action: 'Edit and render again', unit: 'Only new AI pieces are paid', price: '$0' },
    ],
    related: ['carousel-maker', 'instagram-caption-generator'],
    faqs: [
      {
        question: 'Is this an AI social media post generator?',
        answer: [
          'Yes. AI writes the post from your brand profile and picks a layout. The design itself is a template rendered in a browser, so text is sharp and in your own fonts.',
        ],
      },
      {
        question: 'Can I use my own photos?',
        answer: ['Yes. Upload them to the library, or use the screenshots taken from your website. They are used before any AI picture.'],
      },
      {
        question: 'Does it post to Instagram for me?',
        answer: ['Not yet. You download the image and caption and post them yourself, or hand them to your scheduler.'],
      },
    ],
  },
  {
    slug: 'carousel-maker',
    name: 'Carousel maker',
    seoTitle: 'Carousel Maker for Instagram and LinkedIn',
    h1: 'Carousel Maker',
    headline: 'One idea, a few slides, every slide on brand.',
    summary: 'Make Instagram carousels as PNG slides and LinkedIn carousels as a PDF, written from your brand profile.',
    description:
      'Open-source carousel maker for Instagram and LinkedIn: slides written from your website, in your fonts and colors, as PNG files and a PDF for LinkedIn.',
    icon: GalleryHorizontal,
    examples: ['square-hero-bold', 'square-stat-bold', 'square-list-bold', 'square-cta-bold'],
    examplesTitle: 'Instagram carousel maker example',
    examplesNote: 'Four slides of one carousel: hook, figure, list and call to action.',
    howTitle: 'How the carousel maker works',
    steps: [
      { title: 'Start from an idea', body: 'A tip list, a launch or a how-to. The writer plans one point per slide.' },
      { title: 'Slides get layouts', body: 'The first slide is the hook, the last is the call to action, and the middle ones use list, big-number or picture layouts.' },
      { title: 'Edit slide by slide', body: 'Change text, layout or picture on any slide with a live preview. Add or remove slides.' },
      { title: 'Render PNGs and a PDF', body: 'You get one PNG per slide for Instagram and one PDF for a LinkedIn document post.' },
    ],
    capabilitiesTitle: 'AI carousel generator features',
    capabilities: [
      { title: 'LinkedIn carousel generator', body: 'The PDF is ready to upload as a LinkedIn document post.' },
      { title: 'Square or portrait', body: 'Slides in 1:1 or 4:5. Switch size and render again.' },
      { title: 'One look across slides', body: 'Every slide uses the same style, fonts and colors, so the set reads as one.' },
      { title: 'Grounded claims', body: 'Figures that cannot be found on your website are flagged before you render.' },
    ],
    costsTitle: 'Carousel maker cost',
    costs: [
      { action: 'Write a carousel', unit: 'One writing call for every slide', price: PRICES.write },
      { action: 'Render slides and PDF', unit: 'PNG per slide and one PDF', price: '$0' },
      { action: 'AI backdrop picture', unit: 'Only on slides that ask for one', price: `${PRICES.aiPicture} each` },
    ],
    related: ['instagram-post-generator', 'banner-maker'],
    faqs: [
      {
        question: 'How many slides can a carousel have?',
        answer: ['Usually 4 to 8 work best. The writer picks a number that fits the idea, and you can add or remove slides.'],
      },
      {
        question: 'Can I make a LinkedIn carousel?',
        answer: ['Yes. Every carousel render includes a PDF, which LinkedIn shows as a swipeable document post.'],
      },
      {
        question: 'Is the carousel maker free?',
        answer: [
          'OpenPromo is open source and free to self-host. Writing a carousel uses one AI call on your own YepAPI key, about $0.02 to $0.08. Rendering costs nothing unless you add AI pictures.',
        ],
      },
    ],
  },
  {
    slug: 'banner-maker',
    name: 'Banner maker',
    seoTitle: 'Banner Maker: Ad, X and LinkedIn Banners',
    h1: 'Banner Maker',
    headline: 'Link banners, ad banners and profile headers in your brand.',
    summary: 'Make link and ad banners (1200×628), X headers (1500×500) and LinkedIn banners (1584×396) from the same brand profile.',
    description:
      'Open-source AI banner maker: link and ad banners, X headers and LinkedIn banners written from your website, in your own fonts and colors, at exact sizes.',
    icon: RectangleHorizontal,
    examples: ['link-hero-clean', 'link-offer-bold', 'x_header-statement-clean', 'linkedin_banner-hero-bold'],
    examplesTitle: 'Banner maker examples at exact sizes',
    examplesNote: 'A link banner, an ad banner, an X header and a LinkedIn banner for the same brand.',
    howTitle: 'How the AI banner generator works',
    steps: [
      { title: 'Say what the banner is for', body: 'An offer, a launch or your profile header. Or start from a post you already made.' },
      { title: 'It fits the wide format', body: 'Wide layouts keep the headline short and leave room around the logo.' },
      { title: 'Check and edit', body: 'Hype words and figures not found on your website are flagged. Edit with a live preview.' },
      { title: 'Render the sizes you need', body: 'Render the same banner at another size in one click.' },
    ],
    capabilitiesTitle: 'Banner maker features',
    capabilities: [
      { title: 'Link and ad banners', body: '1200×628 for Facebook and LinkedIn ads and link previews.' },
      { title: 'X header', body: '1500×500, with the text kept clear of the profile picture area.' },
      { title: 'LinkedIn banner maker', body: '1584×396 for a profile or company page.' },
      { title: 'Offers that stand out', body: 'The offer layout puts the deal in large type with a clear call to action.' },
    ],
    costsTitle: 'Banner maker cost',
    costs: [
      { action: 'Write a banner', unit: 'One writing call', price: PRICES.write },
      { action: 'Render', unit: 'PNG at any banner size', price: '$0' },
      { action: 'AI backdrop picture', unit: 'Optional', price: `${PRICES.aiPicture} each` },
    ],
    related: ['instagram-post-generator', 'carousel-maker'],
    faqs: [
      {
        question: 'Which banner sizes are supported?',
        answer: ['1200×628 for link and ad banners, 1500×500 for an X header and 1584×396 for a LinkedIn banner. Posts and stories have their own sizes.'],
      },
      {
        question: 'Can I make ads with it?',
        answer: ['You can make ad images at the common link-ad size. OpenPromo does not run or buy ads; you upload the image to your ad account.'],
      },
    ],
  },
  {
    slug: 'ai-reel-generator',
    name: 'AI reel generator',
    seoTitle: 'AI Reel Generator for Reels, TikTok and Shorts',
    h1: 'AI Reel Generator',
    headline: 'Vertical videos with a hook, a voice and captions you can read.',
    summary:
      'Make 9:16 videos for Instagram Reels, TikTok and YouTube Shorts: a hook in the first two seconds, AI voiceover, music and word-by-word captions.',
    description:
      'Open-source AI reel generator for Reels, TikTok and Shorts: 9:16 videos from your website with a hook, AI voiceover, music and word-by-word captions.',
    icon: Clapperboard,
    examples: ['story-hero-bold', 'story-stat-clean', 'story-list-bold', 'story-cta-clean'],
    examplesTitle: 'AI reel generator scenes',
    examplesNote: 'Stills from four scenes of one reel. In the video, captions appear word by word over each scene.',
    howTitle: 'How the AI reel generator works',
    steps: [
      { title: 'One idea per reel', body: 'Pick an idea or write a brief. The writer plans a hook, a few scenes and a call to action.' },
      { title: 'Scenes, narration and timing', body: 'Each scene gets a layout, on-screen text and a line of narration. Timing follows the voice.' },
      { title: 'Checks before rendering', body: 'A missing hook or call to action, voiceover pace, reading time and invented figures are flagged.' },
      { title: 'Render the reel', body: 'You get an MP4, a poster thumbnail and an SRT caption file.' },
    ],
    capabilitiesTitle: 'AI reel generator features',
    capabilities: [
      { title: 'Hook in two seconds', body: 'The first scene is written to stop the scroll, and the check warns when it is missing.' },
      { title: 'AI voiceover and music', body: 'A natural voice reads the script over a music bed. Turn either off.' },
      { title: 'Word-by-word captions', body: 'Captions follow the voice word by word, and an SRT file comes with every render.' },
      { title: 'YouTube Shorts maker too', body: 'The same 9:16 file works for Reels, TikTok and Shorts.' },
      { title: 'Poster thumbnail', body: 'A poster frame is made for each reel, so the cover in the grid looks right.' },
      { title: 'Optional B-roll', body: 'AI pictures and short clips can fill scenes when your own pictures do not fit.' },
    ],
    costsTitle: 'AI reel generator cost',
    costs: [
      { action: 'Write a reel', unit: 'Scenes, text and narration', price: PRICES.write },
      { action: 'Voiceover', unit: 'Per scene', price: PRICES.voice },
      { action: 'Music bed', unit: 'Per reel', price: PRICES.music },
      { action: 'AI picture', unit: 'Only if used', price: `${PRICES.aiPicture} each` },
      { action: 'AI video clip', unit: 'Only if used, per second', price: PRICES.clip },
      { action: 'Typical 30-second reel', unit: 'Voice and music, no AI clips', price: PRICES.reel },
    ],
    costNote: 'Generated pieces are kept. After an edit, rendering again only pays for what is new.',
    related: ['url-to-video', 'instagram-caption-generator'],
    faqs: [
      {
        question: 'Is this an AI TikTok video generator?',
        answer: ['Yes. Reels are 9:16 MP4 files, which TikTok, Instagram Reels and YouTube Shorts all accept.'],
      },
      {
        question: 'How long can a reel be?',
        answer: ['Reels are short: usually 15 to 40 seconds. For longer videos, use a promo video or a tutorial.'],
      },
      {
        question: 'Is there a watermark?',
        answer: ['No. OpenPromo adds no watermark, hosted or self-hosted.'],
      },
      {
        question: 'Are AI avatars included?',
        answer: ['No. OpenPromo makes scene-based videos with text, pictures, voice and music, not talking avatars.'],
      },
    ],
  },
  {
    slug: 'url-to-video',
    name: 'URL to video',
    seoTitle: 'URL to Video: Promo Videos from Your Website',
    h1: 'URL to Video',
    headline: 'Your website in, a promo video out.',
    summary: 'Turn a website address into a narrated promo video in 16:9, 1:1 or 9:16, built from the brand profile OpenPromo reads from the site.',
    description:
      'Open-source URL to video tool: paste your website and get a narrated promo video in 16:9, 1:1 or 9:16, in your brand fonts and colors, with captions.',
    icon: Globe,
    examples: ['landscape-hero-clean', 'landscape-screenshot-clean', 'landscape-list-bold', 'landscape-cta-bold'],
    examplesTitle: 'Website to video example scenes',
    examplesNote: 'Stills from a 16:9 promo video: opening, list, big number and call to action.',
    howTitle: 'How URL to video works',
    steps: [
      { title: 'Paste your website', body: 'OpenPromo reads a handful of pages, takes screenshots and builds the brand profile.' },
      { title: 'A script from your selling points', body: 'The writer plans a problem, the answer, the main features, proof and a call to action.' },
      { title: 'Scenes with your own screens', body: 'Screenshots of your website appear in device frames. Other scenes use your pictures or optional AI ones.' },
      { title: 'Voice, music, render', body: 'Narration and music are added and the video is rendered as an MP4 with captions.' },
    ],
    capabilitiesTitle: 'Promo video maker features',
    capabilities: [
      { title: 'Three sizes', body: '16:9 for YouTube and websites, 1:1 for feeds, 9:16 for stories.' },
      { title: 'Ten scene layouts', body: 'Hero, statement, big number, list, quote, screenshot in a device frame, product, picture and text, offer and call to action.' },
      { title: 'Real screenshots', body: 'Show the product as it is, from the screenshots taken when your site was read.' },
      { title: 'Edit any scene', body: 'Change text, layout, picture, narration or duration, then render again.' },
    ],
    costsTitle: 'URL to video cost',
    costs: [
      { action: 'Read the website', unit: 'Once per project', price: PRICES.readSite },
      { action: 'Write the video', unit: 'Script, scenes and narration', price: PRICES.write },
      { action: 'Voiceover', unit: 'Per scene', price: PRICES.voice },
      { action: 'Music bed', unit: 'Per video', price: PRICES.music },
      { action: 'AI pictures and clips', unit: 'Only if used', price: `${PRICES.aiPicture} a picture, ${PRICES.clip} a clip second` },
    ],
    costNote: 'Generated pieces are kept. After an edit, rendering again only pays for what is new.',
    related: ['ai-reel-generator', 'product-demo-video-maker'],
    faqs: [
      {
        question: 'What is URL to video?',
        answer: ['You give a website address and get a video about that business. OpenPromo reads the site first, so the video uses its real claims, colors and screens.'],
      },
      {
        question: 'Is it an AI promo video generator?',
        answer: ['Yes. AI writes the script and the voice, and can make optional pictures and clips. The text and layout are templates, so they stay sharp and on brand.'],
      },
      {
        question: 'Can I use a site I do not own?',
        answer: ['Only make videos about businesses you have the right to promote. OpenPromo reads public pages, but what you publish is your responsibility.'],
      },
    ],
  },
  {
    slug: 'product-demo-video-maker',
    name: 'Product demo video maker',
    seoTitle: 'Product Demo Video Maker with AI Voiceover',
    h1: 'Product Demo Video Maker',
    headline: 'Show how your product works, one step at a time.',
    summary: 'Make getting-started tutorials and product demos: one step per scene, from your own product screenshots, narrated.',
    description:
      'Open-source product demo video maker: getting-started tutorials with one step per scene, built from your own screenshots, with AI voiceover and captions.',
    icon: MonitorPlay,
    examples: ['landscape-screenshot-clean', 'landscape-list-clean', 'story-screenshot-bold'],
    examplesTitle: 'Tutorial video maker example scenes',
    examplesNote: 'Stills from a tutorial in 16:9 and 9:16. Scenes with screenshots show your product in a device frame.',
    howTitle: 'How the product demo video maker works',
    steps: [
      { title: 'Pick a flow', body: 'The brand profile lists getting-started flows read from your website. Pick one or describe your own.' },
      { title: 'One step per scene', body: 'Each step gets a scene with a short instruction and the matching screenshot.' },
      { title: 'Narration explains each step', body: 'The voiceover says what to do in plain words, and captions follow it.' },
      { title: 'Render in 16:9 or 9:16', body: 'Landscape for help pages and YouTube, vertical for social.' },
    ],
    capabilitiesTitle: 'Tutorial video maker features',
    capabilities: [
      { title: 'Your own screenshots', body: 'Uses screenshots from your website and any you upload, in a device frame.' },
      { title: 'Explainer video maker', body: 'Works for short explainers too: what it is, how it helps, how to start.' },
      { title: 'Reading-time checks', body: 'Each step stays on screen long enough to read, and the voice pace is checked.' },
      { title: 'Captions and SRT', body: 'Every render comes with captions and an SRT file for your video host.' },
    ],
    costsTitle: 'Product demo video cost',
    costs: [
      { action: 'Write the tutorial', unit: 'Steps, scenes and narration', price: PRICES.write },
      { action: 'Voiceover', unit: 'Per scene', price: PRICES.voice },
      { action: 'Music bed', unit: 'Optional, per video', price: PRICES.music },
      { action: 'Screenshots', unit: 'From reading your site, or your uploads', price: '$0' },
    ],
    related: ['url-to-video', 'brand-kit-generator'],
    faqs: [
      {
        question: 'Does it record my screen?',
        answer: ['No. It builds the video from screenshots: the ones taken when your website was read and any you upload. Upload screenshots of logged-in screens yourself.'],
      },
      {
        question: 'Can I change a step later?',
        answer: ['Yes. Edit the scene text, picture or narration and render again. Unchanged voice lines are reused, so only new pieces cost anything.'],
      },
    ],
  },
  {
    slug: 'instagram-caption-generator',
    name: 'Instagram caption generator',
    seoTitle: 'Instagram Caption Generator and Post Ideas',
    h1: 'Instagram Caption Generator',
    headline: 'Post ideas with hooks, captions and hashtags, in your voice.',
    summary: 'Get post ideas from your brand profile, each with a hook, caption and hashtags, and the selling points it is based on. Make any of them in one click.',
    description:
      'Open-source Instagram caption generator: post ideas from your website with a hook, caption and hashtags, each citing your selling points.',
    icon: MessageSquareText,
    examples: ['portrait-statement-bold', 'square-list-clean', 'story-offer-bold'],
    examplesTitle: 'Content ideas generator results',
    examplesNote: 'Ideas turned into posts with "Make it". Each came with its own caption and hashtags.',
    howTitle: 'How the Instagram caption generator works',
    steps: [
      { title: 'Choose a goal', body: 'A launch, an offer, a tip, social proof, a feature or a look behind the scenes. Or leave it open.' },
      { title: 'Ideas from your selling points', body: 'Each idea has a hook, a caption and hashtags, and lists the selling points it uses.' },
      { title: 'Keep the good ones', body: 'Edit, archive or plan an idea for a date.' },
      { title: 'Make it', body: 'One click turns an idea into a post, carousel, reel or video, with the caption attached.' },
    ],
    capabilitiesTitle: 'Content ideas generator features',
    capabilities: [
      { title: 'Captions in your voice', body: 'Written from the voice in your brand profile, without hype words.' },
      { title: 'Hashtags per idea', body: 'Hashtags that match the idea, not one fixed list.' },
      { title: 'Grounded in your site', body: 'Ideas cite the selling points they use, so you can see where each claim came from.' },
      { title: 'A plan by date', body: 'Give ideas a date to build a simple social media content calendar.' },
    ],
    costsTitle: 'Instagram caption generator cost',
    costs: [
      { action: 'Write a batch of ideas', unit: 'Up to 20 ideas in one writing call', price: PRICES.write },
      { action: 'Edit ideas and captions', unit: 'As often as you like', price: '$0' },
      { action: 'Make it', unit: 'Writes the post or video from the idea', price: PRICES.write },
    ],
    related: ['instagram-post-generator', 'ai-reel-generator'],
    faqs: [
      {
        question: 'Can it write captions for posts I already have?',
        answer: ['Every creation has an editable caption. To get new ones, write ideas with a note about your post, or edit the caption by hand.'],
      },
      {
        question: 'Does it schedule posts?',
        answer: ['No. You can give ideas a date to plan your month, then post them yourself or with your scheduler.'],
      },
    ],
  },
];

export function getFeature(slug: string): Feature | undefined {
  return features.find((feature) => feature.slug === slug);
}
