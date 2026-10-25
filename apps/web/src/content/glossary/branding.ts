import type { GlossaryTerm } from './types';

export const terms: GlossaryTerm[] = [
  {
    slug: "brand-kit",
    term: "Brand kit",
    aka: ["brand pack", "brand toolkit", "media kit"],
    category: "branding",
    short: "A brand kit is a compact set of a brand's core assets: logo files, colors, fonts and voice notes, ready for anyone making content.",
    definition: [
      "A brand kit is a small, ready-to-use package of the assets that make a brand recognizable: logo files, color codes, fonts, and often a few lines on voice and image style. It sits between a full brand book and nothing at all, giving designers, freelancers and tools what they need to make on-brand content quickly.",
      "A kit is practical, not philosophical. Where [brand guidelines](/glossary/brand-guidelines) explain rules and reasoning across many pages, a brand kit hands over the files: the logo in light and dark versions, hex codes for the [brand colors](/glossary/brand-colors), the font names, and maybe templates for common post sizes.",
      "Design apps and social schedulers often have a brand kit feature that stores these values so every new design starts with the right colors and fonts. The idea is the same everywhere: decide once, reuse everywhere.",
    ],
    why: [
      "Most small businesses make content in many places: a phone app, a design tool, an agency, a freelancer. Without a shared kit, each one guesses the colors and grabs whatever logo file it finds, and the brand slowly drifts. A kit is the cheapest way to get [brand consistency](/glossary/brand-consistency).",
      "It also saves time. Nobody has to hunt for the right logo file or ask for the hex code again, so new posts, banners and videos get made faster.",
    ],
    how: {
      heading: "How to make a brand kit",
      steps: [
        "Export your logo as SVG and PNG, in a full-color version plus versions for light and dark backgrounds.",
        "List your brand colors with hex codes (and RGB or CMYK if you print), marking primary, secondary and text colors.",
        "Name your heading and body fonts, with links to where they can be downloaded or licensed.",
        "Write three to five lines on your [brand voice](/glossary/brand-voice): how you sound and words you avoid.",
        "Add a few example images or templates, then put everything in one shared folder with a clear name.",
      ],
    },
    example: {
      label: "A small brand kit",
      code: "Crumb & Co brand kit\nLogo: crumb-logo.svg, crumb-logo-white.svg, crumb-icon.png\nColors: Crust #C8743A (primary), Flour #F7F1E8 (background), Rye #2B211B (text)\nFonts: Fraunces (headings), Inter (body)\nVoice: warm, plain, a little playful. No \"artisanal\".",
    },
    openpromo: {
      body: "OpenPromo builds a brand profile from your website, with your colors, fonts, logo, voice and selling points, and every post and video it makes uses that profile.",
      href: "/features/brand-kit-generator",
      label: "See the brand kit generator",
    },
    related: ["brand-guidelines", "brand-assets", "brand-colors", "typography", "logo", "visual-identity"],
    faqs: [
      {
        question: "What should be included in a brand kit?",
        answer: ["At minimum: logo files in a few versions, color codes, font names and a short note on voice. Many kits also add templates, example photos and a one-line description of the business."],
      },
      {
        question: "What is the difference between a brand kit and brand guidelines?",
        answer: ["A brand kit is the set of files and values you use. Brand guidelines are the document that explains how and when to use them, with rules, examples and reasoning."],
      },
    ],
  },
  {
    slug: "brand-identity",
    term: "Brand identity",
    category: "branding",
    short: "Brand identity is everything a business controls about how it presents itself: name, logo, colors, fonts, voice, values and messaging.",
    definition: [
      "Brand identity is the full set of elements a business chooses and controls to present itself: its name, logo, colors, typography, imagery, voice, values and core messages. It is how the company wants to be seen, expressed consistently enough that customers recognize it and attach meaning to it over time.",
      "Brand identity is often confused with [visual identity](/glossary/visual-identity), which is only the visual part: logo, colors, type and image style. Identity also covers the verbal side, such as [brand voice](/glossary/brand-voice), [brand messaging](/glossary/brand-messaging) and the story you tell.",
      "Identity is also different from brand image or reputation. Identity is what you put out. Image is what people actually think. A strong identity, used consistently, is how a business narrows the gap between the two.",
    ],
    why: [
      "People buy from businesses they remember and trust. A clear identity gives every post, ad, package and email the same signature, so each one adds to recognition instead of starting from zero.",
      "It also makes decisions easier. When the identity is defined, choosing a photo, writing a caption or briefing a designer is a matter of checking against it rather than debating taste.",
    ],
    how: {
      heading: "How to build a brand identity",
      steps: [
        "Define who you serve, what you offer and how you are different (your [brand positioning](/glossary/brand-positioning)).",
        "Choose personality traits and turn them into a voice with clear do's and don'ts.",
        "Design the visual system: logo, color palette, fonts and image style.",
        "Write your core messages: tagline, value proposition and a short brand story.",
        "Document it all in brand guidelines and apply it everywhere, starting with your most-seen channels.",
      ],
    },
    openpromo: {
      body: "OpenPromo reads your website into a brand profile covering identity, audience, positioning, voice, colors, fonts and logo, which you can edit before making anything.",
      href: "/features/brand-kit-generator",
      label: "See the brand kit generator",
    },
    related: ["visual-identity", "brand-guidelines", "brand-voice", "brand-positioning", "brand-personality", "logo"],
    faqs: [
      {
        question: "What are the elements of brand identity?",
        answer: ["The usual list is name, logo, color palette, typography, imagery, voice, tagline and core messages. Some definitions also include values, mission and personality."],
      },
      {
        question: "Is brand identity the same as branding?",
        answer: ["Not quite. Branding is the ongoing work of shaping how people see you. Brand identity is the set of tools you use to do that work."],
      },
    ],
  },
  {
    slug: "visual-identity",
    term: "Visual identity",
    aka: ["visual brand identity", "visual branding"],
    category: "branding",
    short: "Visual identity is the visible side of a brand: logo, colors, typography, imagery, icons and layout rules applied the same way everywhere.",
    definition: [
      "Visual identity is the set of visual elements that make a brand recognizable at a glance: its logo, color palette, typography, photography or illustration style, icons, and layout patterns. It is the part of brand identity people see, and it works best when the same rules are applied across every post, page and package.",
      "A visual identity is a system, not a single logo. The [logo](/glossary/logo) is one piece. The [color palette](/glossary/color-palette), [typography](/glossary/typography), spacing and image style do much of the daily work, because many posts and ads show the logo small or not at all.",
      "Good visual identities are simple enough to repeat. Two or three colors, one or two typefaces and a consistent image treatment are easier to apply correctly than a large set of options.",
    ],
    why: [
      "On a busy feed, people decide in a fraction of a second whether to stop. A familiar look tells followers it is you before they read a word, which helps [brand recognition](/glossary/brand-recognition) and makes each post count toward the next.",
      "A defined visual system also speeds up production. Templates built on fixed colors and fonts let anyone make a new post that looks like it belongs.",
    ],
    how: {
      heading: "How to create a visual identity",
      steps: [
        "Collect references in a [mood board](/glossary/mood-board) that matches your brand personality.",
        "Pick a primary color, one or two supporting colors and neutral text and background colors.",
        "Choose a heading font and a body font that pair well and work on screens.",
        "Design or refine the logo, with versions for light and dark backgrounds and small sizes.",
        "Set image rules (photo style, filters, illustration) and build templates for your common formats.",
      ],
    },
    openpromo: {
      body: "OpenPromo measures your brand colors, fonts and logo from your rendered website, then sets every post, carousel and video in them, in a clean, bold or photo look.",
      href: "/features/brand-kit-generator",
      label: "See the brand kit generator",
    },
    related: ["brand-identity", "color-palette", "typography", "logo", "brand-guidelines", "instagram-grid"],
    faqs: [
      {
        question: "What is the difference between brand identity and visual identity?",
        answer: ["Visual identity is the visual part only: logo, colors, fonts and imagery. Brand identity also includes voice, messaging, values and story."],
      },
      {
        question: "How many colors should a visual identity have?",
        answer: ["Most work well with one primary color, one or two accents and a couple of neutrals. More than that becomes hard to apply consistently."],
      },
    ],
  },
  {
    slug: "brand-guidelines",
    term: "Brand guidelines",
    aka: ["brand style guide", "brand book", "style guide", "brand standards"],
    category: "branding",
    short: "Brand guidelines are a document of rules for using a brand's logo, colors, fonts, imagery and voice so everyone presents it the same way.",
    definition: [
      "Brand guidelines are a document that explains how to present a brand correctly: how to use the logo, which colors and fonts to apply, what imagery fits, and how the brand writes and speaks. Also called a brand book or brand style guide, they give designers, writers and partners one shared reference so content stays consistent.",
      "Guidelines range from a two-page PDF to a large website. A typical set covers the logo (clear space, minimum size, versions and misuse), [brand colors](/glossary/brand-colors) with codes, [typography](/glossary/typography), photography and illustration style, and a section on [tone of voice](/glossary/tone-of-voice) with example copy.",
      "In writing and publishing, \"style guide\" can also mean an editorial guide for grammar, spelling and formatting. Many brand guidelines include a short editorial section for this.",
    ],
    why: [
      "As soon as more than one person makes content, small inconsistencies creep in: a stretched logo, a slightly different blue, a caption that sounds like another company. Guidelines prevent that drift, which protects [brand consistency](/glossary/brand-consistency) and the recognition it builds.",
      "They also make it easier to work with freelancers, agencies and new hires, and to brief AI tools, because the answers to most design and writing questions are already written down.",
    ],
    how: {
      heading: "How to write brand guidelines",
      steps: [
        "Open with a short summary: who you are, who you serve and your positioning.",
        "Document the logo: versions, clear space, minimum size and examples of what not to do.",
        "List colors with hex, RGB and CMYK values, plus approved text and background pairs.",
        "Name fonts with sizes and weights for headings, body text and captions.",
        "Describe voice with do and don't examples, and add sample posts or layouts.",
        "Keep it short, store it where everyone can find it, and update it when something changes.",
      ],
    },
    openpromo: {
      body: "The brand profile OpenPromo builds works as machine-readable guidelines: the app, its templates and connected agents (over MCP) all read the same colors, fonts, voice and claims.",
      href: "/docs/mcp",
      label: "Read about the MCP server",
    },
    related: ["brand-kit", "brand-identity", "visual-identity", "brand-voice", "brand-consistency", "logo"],
    faqs: [
      {
        question: "What is the difference between a brand book and brand guidelines?",
        answer: ["Usually nothing: the terms are used interchangeably. Some teams use \"brand book\" for a longer document that also covers mission, story and values, and \"guidelines\" for the practical rules."],
      },
      {
        question: "How long should brand guidelines be?",
        answer: ["As short as possible while answering the common questions. A small business can cover logo, colors, fonts and voice in a few pages. Long documents often go unread."],
      },
      {
        question: "Do small businesses need brand guidelines?",
        answer: ["A simple version helps as soon as anyone besides the owner makes content. Even one page with logo files, color codes, fonts and voice notes prevents most mistakes."],
      },
    ],
  },
  {
    slug: "brand-voice",
    term: "Brand voice",
    aka: ["brand tone", "verbal identity"],
    category: "branding",
    short: "Brand voice is the consistent personality a business shows in its words: the vocabulary, rhythm and attitude that make its writing recognizable.",
    definition: [
      "Brand voice is the consistent personality a business expresses through words. It covers vocabulary, sentence length, humor, formality and point of view, so that a caption, an email and a product page all sound like the same company. Voice stays steady over time, while tone shifts to suit each situation.",
      "Voice is usually described with three or four traits, such as \"warm, plain and a little cheeky\", each with a note on what it means and what it does not. \"Confident, not arrogant\" is a classic pattern. Good voice guides include before-and-after examples, because adjectives alone are easy to misread.",
      "Voice and [tone of voice](/glossary/tone-of-voice) are often used as synonyms. A useful distinction: voice is who you are, tone is how you adjust for the moment. A brand can have one voice and many tones, from playful on Instagram to careful in a refund email.",
    ],
    why: [
      "Most brand contact is written: captions, ads, emails, replies. A recognizable voice makes a small business feel like a person, which builds trust and makes [brand messaging](/glossary/brand-messaging) stick.",
      "A clear voice also lets more people write for the brand, including AI tools, without everything sounding generic. When the voice is written down, edits are about fit, not personal taste.",
    ],
    how: {
      heading: "How to define your brand voice",
      steps: [
        "Read your best-performing posts and emails and note what they have in common.",
        "Pick three or four traits that match your [brand personality](/glossary/brand-personality) and audience.",
        "For each trait, write what it means, what it does not mean, and one example sentence.",
        "List words and phrases you use and ones you avoid.",
        "Rewrite a few real pieces in the new voice and share them as the reference.",
      ],
    },
    example: {
      label: "Same message, two voices",
      body: "A yoga studio announcing a new class. Formal: \"We are pleased to announce a new beginner class on Tuesday evenings.\" Warm and plain: \"New to yoga? Our Tuesday 6pm class starts slow, and nobody will be watching your downward dog.\" Both are fine. The point is to pick one and keep it.",
    },
    openpromo: {
      body: "OpenPromo writes down your voice as part of the brand profile it reads from your site, and its writers use that voice for post ideas, captions and video scripts.",
      href: "/features/brand-kit-generator",
      label: "See the brand kit generator",
    },
    related: ["tone-of-voice", "brand-personality", "brand-messaging", "copywriting", "brand-guidelines", "caption"],
    faqs: [
      {
        question: "What is the difference between brand voice and tone?",
        answer: ["Voice is your consistent personality in writing. Tone is how that personality adapts to the situation, such as lighter on social media and more serious in a support reply."],
      },
      {
        question: "What are examples of brand voice traits?",
        answer: ["Common traits include friendly, expert, playful, direct, calm, bold and warm. They work best with a note on limits, like \"playful, but never at the customer's expense\"."],
      },
    ],
  },
  {
    slug: "tone-of-voice",
    term: "Tone of voice",
    aka: ["brand tone", "tone"],
    category: "branding",
    short: "Tone of voice is how a brand's writing sounds in a given moment: more formal, playful, urgent or gentle, depending on channel and situation.",
    definition: [
      "Tone of voice is the way a brand's words sound in a particular piece of communication: formal or casual, playful or serious, urgent or calm. It adapts to the channel, the audience and the moment, while the underlying [brand voice](/glossary/brand-voice) stays the same. Many companies use the term for their whole writing style.",
      "Writers often map tone along a few scales, such as formal to casual, serious to funny, respectful to irreverent, and matter-of-fact to enthusiastic. A brand picks a home position on each scale and notes when to move: a launch post can be more excited, an apology should be plainer and more serious.",
      "In the UK and Europe, \"tone of voice guidelines\" is the common name for what US teams often call a voice and tone guide. They cover the same ground.",
    ],
    why: [
      "The wrong tone can undo a good message. A jokey reply to a complaint or a stiff, corporate caption on TikTok tells people you are not listening. Matching tone to the situation keeps the brand human and appropriate.",
      "Consistent tone also helps [brand recognition](/glossary/brand-recognition) in places where visuals are absent, such as emails, comments and DMs.",
    ],
    how: {
      heading: "How to set a tone of voice",
      steps: [
        "Choose where your brand sits on scales like formal-casual and serious-funny.",
        "List the situations you write for: social posts, ads, support, announcements, bad news.",
        "For each, note how far the tone should move from the default and why.",
        "Add one short example per situation.",
        "Review a sample of real posts each quarter to check they still match.",
      ],
    },
    related: ["brand-voice", "brand-personality", "copywriting", "brand-guidelines", "community-management"],
    faqs: [
      {
        question: "What are the four dimensions of tone of voice?",
        answer: ["A widely used model rates tone on four scales: funny to serious, formal to casual, respectful to irreverent, and enthusiastic to matter-of-fact."],
      },
      {
        question: "Can a brand have more than one tone?",
        answer: ["Yes. A brand should have one voice but adjust its tone. A support reply and a launch post can sound like the same company while carrying different energy."],
      },
    ],
  },
  {
    slug: "brand-personality",
    term: "Brand personality",
    category: "branding",
    short: "Brand personality is the set of human traits people associate with a brand, such as warm, bold, playful or dependable.",
    definition: [
      "Brand personality is the set of human characteristics a brand expresses and that people associate with it, such as friendly, sophisticated, rugged, playful or dependable. It shapes the visual style, the [brand voice](/glossary/brand-voice) and even which jokes a brand will make, giving customers something closer to a relationship than a transaction.",
      "A well-known academic framework, Jennifer Aaker's 1997 brand personality model, groups traits into five dimensions: sincerity, excitement, competence, sophistication and ruggedness. Many teams also use [brand archetypes](/glossary/brand-archetype) as a shortcut for describing personality.",
      "Personality is chosen, then shown. Saying \"we're fun\" in a bio does little. Fun shows up in word choice, color, imagery and how the brand replies to comments.",
    ],
    why: [
      "Many small businesses sell similar products at similar prices. Personality is often what people remember and why they choose one bakery or bike shop over another. It gives [brand messaging](/glossary/brand-messaging) a point of view.",
      "A defined personality also keeps content coherent across many makers, because everyone can ask: would our brand say this?",
    ],
    how: {
      heading: "How to define brand personality",
      steps: [
        "Ask: if the brand were a person, how would customers describe them? Pick three to five adjectives.",
        "Check the traits against your audience and price point.",
        "Translate each trait into choices: colors, fonts, image style, words and humor.",
        "Write the traits into your brand guidelines with examples.",
      ],
    },
    example: {
      label: "Example",
      body: "A neighborhood bike shop picks \"knowledgeable, unpretentious, outdoorsy\". That means plain explanations instead of jargon, photos of real local rides rather than studio shots, earthy colors and a relaxed, helpful tone in replies.",
    },
    related: ["brand-archetype", "brand-voice", "brand-identity", "tone-of-voice", "visual-identity"],
    faqs: [
      {
        question: "What are the 5 dimensions of brand personality?",
        answer: ["In Aaker's model: sincerity, excitement, competence, sophistication and ruggedness. Each dimension has traits under it, such as honest and cheerful for sincerity."],
      },
      {
        question: "Is brand personality the same as brand voice?",
        answer: ["Personality is the character. Voice is how that character sounds in words. Personality also shows in visuals and behavior."],
      },
    ],
  },
  {
    slug: "brand-archetype",
    term: "Brand archetype",
    aka: ["brand archetypes", "12 brand archetypes"],
    category: "branding",
    short: "A brand archetype is one of 12 character types, like the Hero, Sage or Caregiver, used to describe and keep a brand's personality consistent.",
    definition: [
      "A brand archetype is a recurring character type, drawn from Carl Jung's idea of archetypes, used to describe a brand's personality and motivations. The common marketing set has twelve: Innocent, Everyman, Hero, Outlaw, Explorer, Creator, Ruler, Magician, Lover, Caregiver, Jester and Sage. Each suggests a voice, values and visual style.",
      "The twelve-archetype model for brands was popularized by Margaret Mark and Carol Pearson's 2001 book The Hero and the Outlaw. Each archetype has a core desire: the Caregiver wants to protect, the Explorer wants freedom, the Sage wants understanding.",
      "Most brands blend a primary archetype with a secondary one. Archetypes are a shortcut for [brand personality](/glossary/brand-personality), not a rule. They help a team agree quickly on a direction for [brand voice](/glossary/brand-voice) and imagery.",
    ],
    why: [
      "Archetypes give a team shared language. Saying \"we're a Caregiver with a bit of Jester\" is faster than a page of adjectives, and it helps designers and writers make consistent choices.",
      "They also tie personality to a customer motivation, which makes [brand messaging](/glossary/brand-messaging) more focused.",
    ],
    how: {
      heading: "How to choose a brand archetype",
      steps: [
        "List what your customers want most: safety, freedom, mastery, belonging, fun.",
        "Match that desire to the archetype that serves it.",
        "Check the fit against how you already talk and what you sell.",
        "Pick one primary and at most one secondary archetype.",
        "Turn the choice into concrete voice and visual rules.",
      ],
    },
    example: {
      label: "Example",
      body: "A yoga studio aimed at stressed office workers might choose the Caregiver (calm, reassuring, soft colors), while a climbing gym might choose the Explorer (adventurous, outdoor imagery, short energetic copy).",
    },
    related: ["brand-personality", "brand-voice", "brand-identity", "brand-story", "storytelling"],
    faqs: [
      {
        question: "What are the 12 brand archetypes?",
        answer: ["Innocent, Everyman (or Regular Guy), Hero, Outlaw (or Rebel), Explorer, Creator, Ruler, Magician, Lover, Caregiver, Jester and Sage."],
      },
      {
        question: "Can a brand have two archetypes?",
        answer: ["Yes. Most brands have a main archetype and a secondary one that adds nuance. More than two usually makes the personality blurry."],
      },
    ],
  },
  {
    slug: "brand-positioning",
    term: "Brand positioning",
    aka: ["market positioning", "positioning"],
    category: "branding",
    short: "Brand positioning is the place a brand aims to hold in customers' minds: who it is for, what it offers and why it beats the alternatives.",
    definition: [
      "Brand positioning is the distinct place a brand aims to occupy in its customers' minds compared with alternatives. It defines who the brand is for, what need it meets, which category it competes in, and why it is the better choice. Positioning guides messaging, pricing, design and which channels and audiences to focus on.",
      "The idea was popularized by Al Ries and Jack Trout in the 1970s and 80s. Their point was that markets are crowded, so a brand wins by owning one clear idea, not by being slightly good at everything.",
      "Positioning is usually captured in a [positioning statement](/glossary/positioning-statement), an internal sentence that feeds the public-facing [value proposition](/glossary/value-proposition), tagline and ads.",
    ],
    why: [
      "Without clear positioning, marketing tries to speak to everyone and ends up memorable to no one. A clear position tells your [target audience](/glossary/target-audience) quickly whether you are for them, which makes ads and posts more efficient.",
      "It also helps with pricing and product decisions, because you know which customers you are serving and what they value.",
    ],
    how: {
      heading: "How to position a brand",
      steps: [
        "Define your target customer and the problem they want solved.",
        "List the real alternatives they consider, including doing nothing.",
        "Find what you do differently that this customer cares about.",
        "Write a positioning statement and test it with a few customers.",
        "Apply it to your website headline, bio, ads and content pillars.",
      ],
    },
    openpromo: {
      body: "Positioning is one of the sections in the brand profile OpenPromo builds from your website, alongside selling points that each cite the sentence and page they came from.",
      href: "/features/brand-kit-generator",
      label: "See the brand kit generator",
    },
    related: ["positioning-statement", "value-proposition", "unique-selling-proposition", "target-audience", "brand-messaging", "ideal-customer-profile"],
    faqs: [
      {
        question: "What are the types of brand positioning?",
        answer: ["Common approaches position on price, quality, a specific customer group, a use case, convenience or a contrast with a competitor. Most brands combine two of these."],
      },
      {
        question: "What is the difference between positioning and a value proposition?",
        answer: ["Positioning is the internal strategy: where you sit in the market and for whom. The value proposition is the customer-facing promise that expresses it."],
      },
    ],
  },
  {
    slug: "positioning-statement",
    term: "Positioning statement",
    category: "branding",
    short: "A positioning statement is a short internal sentence naming a brand's target customer, category, key benefit and reason to believe.",
    definition: [
      "A positioning statement is a short internal sentence that sums up a brand's positioning: who the target customer is, what category the product is in, the main benefit it offers, and why customers should believe it. It is written for the team, not the public, and acts as a test for messaging and marketing decisions.",
      "The classic template comes from Geoffrey Moore's Crossing the Chasm: For (target customer) who (need), our (product) is a (category) that (key benefit). Unlike (competitor), we (main difference).",
      "A positioning statement is not a [tagline](/glossary/tagline) or a [mission statement](/glossary/mission-statement). It is usually too long and plain to publish. Its job is to keep the public-facing words pointed in one direction.",
    ],
    why: [
      "A written statement settles arguments about what to say. When a new ad, landing page or [content pillar](/glossary/content-pillars) is proposed, the team can check whether it supports the statement.",
      "It also makes briefing easier, for agencies, freelancers and AI tools alike, because the core facts fit in two sentences.",
    ],
    how: {
      heading: "How to write a positioning statement",
      steps: [
        "Name your target customer specifically, not \"everyone\".",
        "State the need or problem they have.",
        "Name the category your product competes in.",
        "State the single most important benefit.",
        "Give the reason to believe: proof, method or a real difference from alternatives.",
      ],
    },
    example: {
      label: "Template and example",
      code: "For [target customer] who [need], [brand] is the [category] that [key benefit] because [reason to believe].\n\nFor busy commuters who want to ride to work without sweat, Spoke & Chain is the local e-bike shop that gets you on the right bike in one visit, because every fitting includes a free 30-minute test ride on your actual route.",
    },
    related: ["brand-positioning", "value-proposition", "unique-selling-proposition", "target-audience", "brand-messaging"],
    faqs: [
      {
        question: "What is the difference between a positioning statement and a mission statement?",
        answer: ["A positioning statement describes how your product wins with a specific customer. A mission statement describes why the company exists and what it aims to do."],
      },
      {
        question: "Should a positioning statement be public?",
        answer: ["Usually not word for word. It is an internal tool. Its ideas show up publicly in your value proposition, headlines and tagline."],
      },
    ],
  },
  {
    slug: "value-proposition",
    term: "Value proposition",
    aka: ["customer value proposition", "UVP", "unique value proposition"],
    category: "branding",
    short: "A value proposition is a clear statement of the benefit a customer gets from a product, and why it is better for them than the alternatives.",
    definition: [
      "A value proposition is a clear, customer-facing statement of the benefit someone gets from a product or service and why it is a better choice than the alternatives. It usually takes the form of a headline plus a sentence or two, and it answers the visitor's main question: what's in it for me?",
      "A strong value proposition is specific and about outcomes. It focuses on [benefits rather than features](/glossary/features-vs-benefits), speaks to a defined [target audience](/glossary/target-audience), and avoids empty claims like \"best quality\" that every competitor could make.",
      "It overlaps with the [unique selling proposition](/glossary/unique-selling-proposition). A USP stresses the one thing only you offer. A value proposition describes the overall value, which may include things competitors also offer.",
    ],
    why: [
      "Visitors decide in seconds whether a page or post is for them. A clear value proposition at the top of a [landing page](/glossary/landing-page) or in the first line of an ad gives them a reason to keep reading, which directly affects conversion.",
      "It also becomes the backbone of content: most posts, ads and videos are a way of proving one part of the value proposition.",
    ],
    how: {
      heading: "How to write a value proposition",
      steps: [
        "List your customer's main pain points and desired outcomes.",
        "Match each to what your product does to relieve or deliver it.",
        "Pick the outcome that matters most and that you can prove.",
        "Write a headline that states it plainly, then a subheading that explains how.",
        "Add proof nearby: reviews, numbers from your own records or a short demo.",
      ],
    },
    example: {
      label: "Example",
      body: "Crumb & Co, a bakery offering a bread subscription: \"Fresh sourdough on your doorstep every Saturday. Pick your loaves, skip any week, cancel in two clicks.\" The headline gives the outcome, the second line removes the usual objections to subscriptions.",
    },
    openpromo: {
      body: "OpenPromo pulls your selling points from your own site, each with the sentence and page it came from, and its checks flag figures in a post or script that are not on your site.",
      href: "/features/brand-kit-generator",
      label: "See the brand kit generator",
    },
    related: ["unique-selling-proposition", "positioning-statement", "brand-positioning", "features-vs-benefits", "landing-page", "pain-points"],
    faqs: [
      {
        question: "What makes a good value proposition?",
        answer: ["It is specific, about a customer outcome, easy to understand in a few seconds, and different from what competitors say. It should also be true and provable."],
      },
      {
        question: "Where should a value proposition go?",
        answer: ["At the top of your homepage and key landing pages, in your social bios, and in the opening line of ads and promo videos."],
      },
    ],
  },
  {
    slug: "unique-selling-proposition",
    term: "Unique selling proposition (USP)",
    aka: ["USP", "unique selling point"],
    category: "branding",
    short: "A unique selling proposition (USP) is the one benefit or feature that sets a product apart from competitors and gives buyers a reason to choose it.",
    definition: [
      "A unique selling proposition (USP) is the specific benefit or feature that makes a product different from its competitors and gives buyers a reason to choose it. It answers the question \"why you and not them?\" in one clear idea, such as a guarantee, a method, a niche focus or a level of speed.",
      "The term was coined by advertising executive Rosser Reeves in the 1940s and 50s. His rule was that each ad should make one proposition, unique to the brand, strong enough to move people.",
      "In everyday use, \"unique selling point\" means the same thing. A business can have several selling points, but the USP is the one it leads with. It is narrower than the [value proposition](/glossary/value-proposition), which describes the overall value.",
    ],
    why: [
      "When products look alike, customers fall back on price. A clear USP gives them another reason to choose you and makes [ad copy](/glossary/ad-copy), headlines and [hooks](/glossary/hook) much easier to write.",
      "It also helps people remember and recommend you, because one sharp idea is easier to repeat than a list.",
    ],
    how: {
      heading: "How to find your unique selling proposition",
      steps: [
        "List what customers say they love about you in reviews and messages.",
        "List what your top competitors promise.",
        "Cross out anything competitors also claim.",
        "From what is left, pick the point your best customers value most.",
        "Phrase it as a customer benefit in one sentence and use it consistently.",
      ],
    },
    example: {
      label: "Examples",
      body: "A bike shop: \"Repairs done in 24 hours, or the next one is free.\" A yoga studio: \"Classes capped at eight people, so the teacher actually corrects your form.\" Each is specific, checkable and hard for a typical competitor to copy.",
    },
    related: ["value-proposition", "brand-positioning", "positioning-statement", "features-vs-benefits", "ad-copy", "tagline"],
    faqs: [
      {
        question: "What is the difference between a USP and a value proposition?",
        answer: ["A USP is the single thing that makes you different. A value proposition is the overall benefit you promise, which can include things competitors also offer."],
      },
      {
        question: "Does every business need a USP?",
        answer: ["It helps a lot. If you cannot name one, that is a sign to narrow your audience or offer until something about you is clearly different."],
      },
    ],
  },
  {
    slug: "brand-colors",
    term: "Brand colors",
    aka: ["brand color palette", "primary color", "secondary color"],
    category: "branding",
    short: "Brand colors are the specific colors a business uses consistently, defined by hex, RGB and CMYK codes, so its content is recognizable.",
    definition: [
      "Brand colors are the specific colors a business chooses to represent itself and uses consistently across its logo, website, social posts, ads and packaging. They are defined with exact codes (hex and RGB for screens, CMYK or Pantone for print) and usually split into primary, secondary and neutral colors, each with a role.",
      "The primary color is the one people should associate with you. Secondary or accent colors add variety for buttons, highlights and charts. Neutrals (off-whites, grays, near-blacks) carry most text and backgrounds. Together they form the brand [color palette](/glossary/color-palette).",
      "Color choice is part psychology and part practicality. Associations like blue for trust or green for nature are cultural and loose, so it matters more that colors fit your [brand personality](/glossary/brand-personality), stand out from competitors, and stay readable when text sits on them.",
    ],
    why: [
      "Color is often the first thing people notice and one of the fastest cues for [brand recognition](/glossary/brand-recognition). A consistent palette lets followers spot your posts in a feed before they see the logo.",
      "Fixed colors also make production faster and accessible: when text and background pairs are agreed in advance, every post stays readable.",
    ],
    how: {
      heading: "How to choose brand colors",
      steps: [
        "Write down your personality traits and look at what colors competitors use.",
        "Pick one primary color that fits and stands out in your category.",
        "Add one or two accents and two or three neutrals.",
        "Test text and background pairs for contrast (WCAG AA asks for at least 4.5:1 for normal text).",
        "Record hex, RGB and CMYK codes in your brand kit.",
      ],
    },
    example: {
      label: "A brand color spec",
      code: "Primary   Coral   #E8573F  rgb(232, 87, 63)\nAccent    Sand    #F2C879  rgb(242, 200, 121)\nText      Ink     #1E1B18  rgb(30, 27, 24)\nBackground Cream  #FBF6EF  rgb(251, 246, 239)",
    },
    openpromo: {
      body: "OpenPromo measures your brand colors, including your logo's main color, from your rendered website, and fixes color pairs below WCAG AA contrast before rendering.",
      href: "/features/brand-kit-generator",
      label: "See the brand kit generator",
    },
    related: ["color-palette", "visual-identity", "brand-kit", "brand-guidelines", "brand-recognition", "logo"],
    faqs: [
      {
        question: "How many brand colors should you have?",
        answer: ["A common setup is one primary color, one or two secondary colors and a few neutrals. Fewer colors are easier to use consistently."],
      },
      {
        question: "What is a primary brand color?",
        answer: ["It is the main color people should associate with your brand, used in the logo and key elements like buttons and headers."],
      },
      {
        question: "How do I find a brand's hex codes?",
        answer: ["Check the brand guidelines first. Otherwise, a browser's developer tools or a color picker can read colors from the website or logo file."],
      },
    ],
  },
  {
    slug: "color-palette",
    term: "Color palette",
    aka: ["colour palette", "color scheme"],
    category: "branding",
    short: "A color palette is a defined set of colors chosen to work together in a design or brand, usually with set roles and exact color codes.",
    definition: [
      "A color palette is a defined set of colors chosen to work together in a design, a brand or a piece of content. A brand palette usually lists each color with exact codes (hex, RGB, CMYK) and a role, such as primary, accent, background or text, so anyone can apply it the same way across formats.",
      "Palettes are often built from color-wheel relationships. Monochromatic palettes use shades of one hue. Analogous palettes use neighbors on the wheel. Complementary palettes pair opposites for contrast. Triadic palettes use three evenly spaced hues.",
      "A common design guideline is the 60-30-10 rule: about 60 percent of a layout in a dominant (often neutral) color, 30 percent in a secondary color and 10 percent in an accent. It is a starting point, not a law.",
    ],
    why: [
      "A defined palette keeps content looking like it comes from one brand, which builds [brand recognition](/glossary/brand-recognition) and makes an [Instagram grid](/glossary/instagram-grid) look coherent.",
      "It also saves decisions. Designers and tools pick from a short list instead of the whole spectrum, and readable text and background pairs can be agreed once.",
    ],
    how: {
      heading: "How to create a color palette",
      steps: [
        "Start from your primary [brand color](/glossary/brand-colors) or a reference image from your mood board.",
        "Choose a palette type (analogous, complementary, monochromatic) that fits the mood you want.",
        "Add a light and a dark neutral for backgrounds and text.",
        "Check contrast for every text and background pair you plan to use.",
        "Test the palette on a real post, a banner and a slide before you commit.",
      ],
    },
    openpromo: {
      body: "OpenPromo reads your site's brand, text and background colors into the brand profile, and its templates apply them across posts, carousels, banners and videos.",
      href: "/features/instagram-post-generator",
      label: "See the Instagram post generator",
    },
    related: ["brand-colors", "visual-identity", "mood-board", "typography", "brand-guidelines"],
    faqs: [
      {
        question: "How many colors should be in a color palette?",
        answer: ["Most brand palettes have three to six colors: one or two main colors, an accent and a few neutrals."],
      },
      {
        question: "What is the 60-30-10 color rule?",
        answer: ["A guideline for balance: roughly 60 percent dominant color, 30 percent secondary color and 10 percent accent. It helps a layout feel calm with a clear focal point."],
      },
    ],
  },
  {
    slug: "typography",
    term: "Typography",
    aka: ["brand typography", "brand fonts", "type"],
    category: "branding",
    short: "Typography is the art of choosing and arranging type: fonts, sizes, spacing and hierarchy that make text readable and give a brand its feel.",
    definition: [
      "Typography is the craft of choosing and arranging type so text is readable and expresses a mood. It covers the choice of typefaces, sizes, weights, line spacing, letter spacing and hierarchy. In branding, typography means the specific fonts a brand uses and the rules for headings, body text and captions across every format.",
      "Typefaces fall into broad families. Serif faces have small strokes at the ends of letters and often feel traditional. Sans serif faces feel clean and modern and read well on screens. Display and script faces are expressive and best kept for short headlines.",
      "Strictly, a typeface is the design and a font is a specific file or style of it (such as Inter Bold), though most people use the words interchangeably. Brand fonts also need the right license for web, apps and video.",
    ],
    why: [
      "Type is on almost everything a brand makes, so it does a lot of quiet work for [visual identity](/glossary/visual-identity). Consistent fonts make posts and videos recognizable even without a logo.",
      "Typography also decides whether people read at all. On a phone, in a feed, text that is too small, too long or too low in contrast gets skipped. Clear hierarchy gets the main message across in a glance.",
    ],
    how: {
      heading: "How to choose brand typography",
      steps: [
        "Pick a heading typeface that matches your personality and a body face that is easy to read on screens.",
        "Limit yourself to two families (see [font pairing](/glossary/font-pairing)).",
        "Set a size scale and weights for headings, subheadings, body and captions.",
        "Check licenses cover web, social media and video use.",
        "Test on a phone at real sizes, including text over images.",
      ],
    },
    openpromo: {
      body: "OpenPromo detects the fonts your website loads and sets all text in posts and videos as real text in those fonts, shrinking it until it fits rather than letting AI draw letters.",
      href: "/features/brand-kit-generator",
      label: "See the brand kit generator",
    },
    related: ["font-pairing", "visual-identity", "brand-guidelines", "wordmark", "kinetic-typography", "brand-kit"],
    faqs: [
      {
        question: "What is the difference between a font and a typeface?",
        answer: ["A typeface is the overall design, like Helvetica. A font is one specific style or file of it, like Helvetica Bold. In everyday use the terms are interchangeable."],
      },
      {
        question: "How many fonts should a brand use?",
        answer: ["Usually two: one for headings and one for body text. Some brands use a single family with several weights."],
      },
    ],
  },
  {
    slug: "font-pairing",
    term: "Font pairing",
    aka: ["font combinations", "font pairs"],
    category: "branding",
    short: "Font pairing is choosing two or more typefaces that work well together, usually one for headings and one for body text.",
    definition: [
      "Font pairing is the practice of choosing typefaces that look good together in one design, usually a heading font and a body font. A good pair has enough contrast to create clear hierarchy, such as a serif headline over sans serif text, while sharing enough proportions and mood to feel like one coherent system.",
      "Common approaches are serif plus sans serif, a bold display face with a neutral body face, or a single superfamily that includes both serif and sans versions. Pairing two similar but not identical sans serifs is a frequent mistake, because the difference looks accidental.",
      "Free libraries such as Google Fonts make pairing easy to test, and many sites show tried pairings. The final test is always your real content at real sizes.",
    ],
    why: [
      "Two well-paired fonts give a brand character and make content easy to scan: the headline grabs attention, the body is comfortable to read. That matters on small screens and in [carousel posts](/glossary/carousel-post), where each slide has seconds to land.",
      "A fixed pair also supports [brand consistency](/glossary/brand-consistency). Everyone uses the same two fonts instead of picking a new one for each design.",
    ],
    how: {
      heading: "How to pair fonts",
      steps: [
        "Choose the heading font first, based on your brand personality.",
        "Pick a body font with a contrasting style but similar x-height and proportions.",
        "Use weight and size, not more fonts, for extra hierarchy.",
        "Test the pair on a post, a banner and a long paragraph.",
        "Write the pair, weights and sizes into your [typography](/glossary/typography) rules.",
      ],
    },
    example: {
      label: "Example pairs",
      body: "A bakery might pair a warm serif like Fraunces for headlines with Inter for body text. A yoga studio might use a light, rounded sans for headings with a classic serif like Lora for longer descriptions.",
    },
    related: ["typography", "visual-identity", "brand-guidelines", "brand-kit", "carousel-post"],
    faqs: [
      {
        question: "How many fonts should you pair?",
        answer: ["Two is the usual limit. A third font is sometimes added for accents, but it rarely improves a design."],
      },
      {
        question: "Can you pair two serif fonts?",
        answer: ["Yes, if they are clearly different, such as a high-contrast display serif with a sturdy text serif. Similar serifs side by side usually look like a mistake."],
      },
    ],
  },
  {
    slug: "logo",
    term: "Logo",
    aka: ["brand logo", "logo design"],
    category: "branding",
    short: "A logo is the graphic mark, name or symbol that identifies a business. It can be a wordmark, a symbol, or both combined.",
    definition: [
      "A logo is a graphic mark, emblem or styled name that identifies a business, product or organization. It is the most compact piece of a visual identity and appears on everything from the website header to social profile pictures and video end cards. A good logo is simple, distinctive and readable at very small sizes.",
      "Logos come in a few main types. A [wordmark](/glossary/wordmark) is the name set in distinctive type. A [logomark](/glossary/logomark) is a symbol or icon without words. A combination mark puts the two together. An emblem places the name inside a shape, like a badge, and a lettermark uses initials.",
      "Most brands need several versions of their logo: a full version, a compact or square version for profile pictures and favicons, and single-color versions for light and dark backgrounds.",
    ],
    why: [
      "The logo is the signature on your content. It ties posts, ads, packaging and videos back to one business and builds [brand recognition](/glossary/brand-recognition) over time.",
      "It is also a practical asset. Profile pictures, watermarks, end cards and [Open Graph images](/glossary/open-graph-image) all need a logo that works small and on different backgrounds.",
    ],
    how: {
      heading: "How to design a logo",
      steps: [
        "Write a short brief: name, audience, personality and the competitors you must not look like.",
        "Sketch many rough ideas in black and white before thinking about color.",
        "Pick the strongest two or three and test them at small sizes, like a 32-pixel favicon.",
        "Choose the final design and refine spacing and type.",
        "Export SVG and PNG files in full-color, white and black versions, plus a square icon.",
      ],
    },
    openpromo: {
      body: "OpenPromo picks your logo out of your website, saves it to your library with its main color, and its templates place it on a contrasting background.",
      href: "/features/brand-kit-generator",
      label: "See the brand kit generator",
    },
    related: ["wordmark", "logomark", "visual-identity", "brand-assets", "brand-kit", "brand-recognition"],
    faqs: [
      {
        question: "What are the main types of logos?",
        answer: ["Wordmarks (the name in styled type), lettermarks (initials), logomarks or symbols, combination marks (symbol plus name) and emblems (name inside a shape). Some lists also include abstract marks and mascots."],
      },
      {
        question: "What file formats should a logo be in?",
        answer: ["SVG for web and scaling, PNG with a transparent background for most apps and social media, and PDF or EPS for print. Keep light, dark and single-color versions."],
      },
      {
        question: "What makes a good logo?",
        answer: ["It is simple, distinctive, readable at small sizes, works in one color, and fits the brand's personality. It does not need to explain everything the business does."],
      },
    ],
  },
  {
    slug: "wordmark",
    term: "Wordmark",
    aka: ["logotype", "word mark"],
    category: "branding",
    short: "A wordmark is a logo made only of the brand's name, set in distinctive type or custom lettering, with no separate symbol.",
    definition: [
      "A wordmark is a logo made entirely of the brand's name, set in a distinctive typeface or custom lettering, without a separate symbol. Also called a logotype, it puts the name itself in front of people every time, which helps them remember it. Wordmarks work best for short, distinctive names that are easy to read.",
      "The look of a wordmark comes from [typography](/glossary/typography): letter shapes, weight, spacing and sometimes a small custom detail, like a joined pair of letters or an altered character. Many wordmarks start from an existing typeface and are adjusted by hand.",
      "A lettermark (or monogram) is a close cousin that uses only initials. Brands with a wordmark often add a [logomark](/glossary/logomark) or a single-letter icon for small spaces like profile pictures.",
    ],
    why: [
      "For a new business, the name is what people need to remember and search for. A wordmark repeats the name every time the logo appears, which helps [brand awareness](/glossary/brand-awareness) in a way an abstract symbol cannot at first.",
      "Wordmarks are also simple to produce and apply, which suits small teams.",
    ],
    how: {
      heading: "How to design a wordmark",
      steps: [
        "Shortlist typefaces that match your brand personality and test your name in each.",
        "Adjust letter spacing (kerning) by eye, especially in tricky pairs.",
        "Add at most one custom detail that makes it ownable.",
        "Test it very small, in one color, and on light and dark backgrounds.",
        "Create a compact version or icon for square spaces.",
      ],
    },
    related: ["logo", "logomark", "typography", "visual-identity", "brand-recognition"],
    faqs: [
      {
        question: "What is the difference between a wordmark and a logotype?",
        answer: ["They are the same thing. Both describe a logo made of the brand's name in styled type."],
      },
      {
        question: "When should you use a wordmark?",
        answer: ["When your name is short, distinctive and easy to read, and when getting people to remember the name is the priority."],
      },
    ],
  },
  {
    slug: "logomark",
    term: "Logomark",
    aka: ["brand mark", "logo symbol", "pictorial mark"],
    category: "branding",
    short: "A logomark is a logo symbol or icon with no words, which comes to stand for the brand on its own once people know it.",
    definition: [
      "A logomark is a logo that uses a symbol or icon without any words. It can be pictorial, showing a recognizable object, or abstract, using a shape that only means something through association. Logomarks work well in small square spaces, like app icons and profile pictures, once people already connect the symbol with the brand.",
      "Logomarks are often paired with a [wordmark](/glossary/wordmark) to form a combination mark. Over years, some brands drop the name and use the symbol alone, but that only works after a lot of exposure.",
      "\"Brand mark\" is a common synonym, though some designers use it more loosely for any logo. In trademark law, a mark is any sign that identifies the source of goods, words included.",
    ],
    why: [
      "A logomark scales down well, works across languages and fits the square spaces social platforms give you. It is ideal for profile pictures, watermarks on videos and favicons.",
      "On its own, though, a new symbol carries no meaning. Small businesses usually get more from showing the symbol next to the name until [brand recognition](/glossary/brand-recognition) is built.",
    ],
    how: {
      heading: "How to design a logomark",
      steps: [
        "Pick one idea to represent: an initial, an object tied to your trade, or a shape that fits your personality.",
        "Reduce it to the simplest shape that still reads.",
        "Check it works in one color and at 16 to 32 pixels.",
        "Make sure it does not look like a competitor's or a common stock icon.",
        "Pair it with your wordmark in a combination version for most uses.",
      ],
    },
    related: ["logo", "wordmark", "visual-identity", "brand-recognition", "brand-assets"],
    faqs: [
      {
        question: "What is the difference between a logo and a logomark?",
        answer: ["Logo is the general term for any brand mark. A logomark is the specific type that is a symbol with no text."],
      },
      {
        question: "Should a small business use a logomark alone?",
        answer: ["Usually not at first. A symbol only means something after people have seen it with your name many times. Use a combination mark and keep the symbol for small spaces."],
      },
    ],
  },
  {
    slug: "brand-assets",
    term: "Brand assets",
    aka: ["brand elements", "digital brand assets"],
    category: "branding",
    short: "Brand assets are the reusable files and elements that make up a brand: logos, colors, fonts, photos, icons, templates and sounds.",
    definition: [
      "Brand assets are the distinctive, reusable elements that identify a brand and the files that carry them: logos, color codes, fonts, photography, icons, illustrations, templates, product shots, sounds and jingles. They are what designers, marketers and tools pull from to make content, and together they make a brand recognizable across channels.",
      "Marketers sometimes separate brand assets in general from distinctive brand assets: the specific cues, such as a color, a shape or a sound, that people actually link to one brand without seeing the name. Not every asset becomes distinctive. Repetition and consistency make it so.",
      "Teams usually keep assets in a shared folder or a digital asset management (DAM) system, with the [brand kit](/glossary/brand-kit) as the short list of the most-used items.",
    ],
    why: [
      "Organized assets save time and prevent errors. When the right logo version, product photos and templates are easy to find, nobody uses an old file or a blurry screenshot.",
      "Used consistently, assets become shortcuts in people's memory, which supports [brand recognition](/glossary/brand-recognition) and [brand equity](/glossary/brand-equity).",
    ],
    how: {
      heading: "How to organize brand assets",
      steps: [
        "Gather every logo, font, photo and template you currently use.",
        "Delete outdated versions and keep one source file for each asset.",
        "Name files clearly (brand-logo-white.svg, not final-final2.png).",
        "Group them in folders by type and store them in one shared place.",
        "Link the folder from your brand guidelines and review it twice a year.",
      ],
    },
    openpromo: {
      body: "OpenPromo keeps a library per brand with site screenshots and photos, your logo, uploads, AI pictures, voice, music and finished media, so every tool draws from the same files.",
      href: "/features",
      label: "See all features",
    },
    related: ["brand-kit", "logo", "brand-guidelines", "visual-identity", "brand-recognition", "brand-equity"],
    faqs: [
      {
        question: "What are examples of brand assets?",
        answer: ["Logos, color palettes, fonts, taglines, product photos, icons, illustration styles, video intros, templates, mascots and audio such as a jingle or sound logo."],
      },
      {
        question: "What is a distinctive brand asset?",
        answer: ["An element people link to your brand on its own, without seeing the name, such as a particular color or shape. It becomes distinctive through long, consistent use."],
      },
    ],
  },
  {
    slug: "mood-board",
    term: "Mood board",
    aka: ["moodboard", "inspiration board"],
    category: "branding",
    short: "A mood board is a collage of images, colors, type and textures used to agree on the look and feel of a brand or project before design starts.",
    definition: [
      "A mood board is a collage of images, colors, typography, textures and words that shows the intended look and feel of a brand, campaign or piece of content. Designers use it early, before real design work, to agree on a visual direction with clients or teammates. It can be physical or digital, built in tools like Pinterest, Canva or Figma.",
      "A mood board is about direction, not final assets. It helps answer vague briefs like \"modern but warm\" with something concrete everyone can point at: this photo style, these colors, not that.",
      "Mood boards are common in branding, photography, video production and interior design. In video work they often sit alongside a [storyboard](/glossary/storyboard), which plans the sequence of shots, while the mood board sets the look.",
    ],
    why: [
      "Misunderstood briefs are expensive. A mood board shows a direction in minutes and catches disagreements before anyone designs a logo or shoots a video.",
      "It is also a lasting reference. Once agreed, it guides the [color palette](/glossary/color-palette), photo style and typography across a brand's content.",
    ],
    how: {
      heading: "How to make a mood board",
      steps: [
        "Write three to five words that describe the feeling you want.",
        "Collect 20 to 40 images, color swatches, fonts and textures that match those words.",
        "Cut it down to the 10 to 15 strongest items that agree with each other.",
        "Arrange them on one page with short notes on what each shows.",
        "Share it, gather feedback and adjust until everyone agrees.",
      ],
    },
    example: {
      label: "Example",
      body: "For a yoga studio refresh: morning light through big windows, natural linen textures, sage green and warm white swatches, a rounded sans serif, and close-up photos of hands and breath rather than advanced poses. The note: calm, real, beginner-friendly.",
    },
    related: ["visual-identity", "color-palette", "brand-identity", "storyboard", "brand-personality"],
    faqs: [
      {
        question: "What should be included in a mood board?",
        answer: ["Images, color swatches, font samples, textures, and a few keywords. Some include example layouts or competitor references marked as \"not this\"."],
      },
      {
        question: "Is a mood board the same as a storyboard?",
        answer: ["No. A mood board sets the look and feel. A storyboard plans the sequence of shots or scenes in a video."],
      },
    ],
  },
  {
    slug: "brand-consistency",
    term: "Brand consistency",
    category: "branding",
    short: "Brand consistency is presenting a brand the same way everywhere: same logo, colors, fonts, voice and promise across every channel and post.",
    definition: [
      "Brand consistency is the practice of presenting a brand the same way across every channel and touchpoint: the same logo, colors, fonts, voice, messages and level of quality. It means a customer who sees an Instagram post, a website, an email and a shop sign recognizes them all as the same business without having to think about it.",
      "Consistency is not sameness. Posts can vary in topic, format and energy while still sharing the visual system and [brand voice](/glossary/brand-voice). The rule is: vary the content, keep the signature.",
      "The usual enemies of consistency are many hands, no written rules, and quick one-off designs. [Brand guidelines](/glossary/brand-guidelines), a [brand kit](/glossary/brand-kit) and templates are the usual fixes.",
    ],
    why: [
      "Every consistent exposure adds to [brand recognition](/glossary/brand-recognition) and trust. Inconsistent content resets the count, because people do not connect the pieces to one business.",
      "Consistency also signals professionalism. A small business with tidy, consistent content looks established, which helps when people compare options.",
    ],
    how: {
      heading: "How to keep your brand consistent",
      steps: [
        "Write short brand guidelines covering logo, colors, fonts and voice.",
        "Build templates for your most common formats: posts, stories, banners and video end cards.",
        "Give everyone access to the same asset folder and brand kit.",
        "Review new content against a short checklist before it goes out.",
        "Audit your profiles and website a few times a year and fix drift.",
      ],
    },
    openpromo: {
      body: "Every OpenPromo template reads the same brand profile, so posts, carousels, banners, reels and promo videos share your fonts, colors, logo and voice.",
      href: "/features",
      label: "See all features",
    },
    related: ["brand-guidelines", "brand-kit", "brand-recognition", "visual-identity", "brand-voice", "social-media-audit"],
    faqs: [
      {
        question: "Why is brand consistency important?",
        answer: ["It helps people recognize and remember you, builds trust, and makes every piece of content add to the last instead of starting over."],
      },
      {
        question: "How do you measure brand consistency?",
        answer: ["Most teams audit it: collect recent content from every channel and check it against the guidelines for logo use, colors, fonts and voice."],
      },
    ],
  },
  {
    slug: "brand-awareness",
    term: "Brand awareness",
    category: "branding",
    short: "Brand awareness is how familiar your target audience is with your brand: whether they know it exists and can recall or recognize it.",
    definition: [
      "Brand awareness is the extent to which people in your target audience know your brand exists and can recognize or recall it. It ranges from vague familiarity with a logo to being the first name someone thinks of in a category. Awareness sits at the top of the [marketing funnel](/glossary/marketing-funnel) and comes before consideration and purchase.",
      "Marketers often split awareness into two levels. Aided awareness, or [brand recognition](/glossary/brand-recognition), means people recognize the brand when they see it. Unaided awareness, or recall, means they name it without a prompt. Top-of-mind awareness is the first brand named.",
      "Awareness is measured with surveys and indirect signals: branded search volume, direct website traffic, [reach](/glossary/reach) and mentions in social listening.",
    ],
    why: [
      "People rarely buy from a business they have never heard of. Awareness fills the funnel, and when someone needs what you sell, being already familiar makes you more likely to be chosen.",
      "It also makes other marketing cheaper. Ads and posts from a familiar brand tend to get more clicks and trust than ones from an unknown name.",
    ],
    how: {
      heading: "How to increase brand awareness",
      steps: [
        "Post regularly on the one or two channels where your audience spends time.",
        "Use short video formats like Reels and Shorts, which can reach non-followers.",
        "Keep your visuals and voice consistent so each exposure builds on the last.",
        "Partner with local businesses or creators who share your audience.",
        "Track branded search and direct traffic over time to see if it is working.",
      ],
    },
    openpromo: {
      body: "OpenPromo turns your website into reels, posts and promo videos in your own brand, which helps a small team publish often enough to build awareness.",
      href: "/features/ai-reel-generator",
      label: "See the reel generator",
    },
    related: ["brand-recognition", "reach", "marketing-funnel", "brand-equity", "share-of-voice", "impressions"],
    faqs: [
      {
        question: "How do you measure brand awareness?",
        answer: ["Through surveys (aided and unaided recall), and through signals like branded search volume, direct traffic, social reach, mentions and share of voice."],
      },
      {
        question: "What is the difference between brand awareness and brand recognition?",
        answer: ["Brand recognition is one level of awareness: knowing the brand when you see it. Awareness also includes recall, naming the brand without a prompt."],
      },
    ],
  },
  {
    slug: "brand-recognition",
    term: "Brand recognition",
    aka: ["brand recall", "aided awareness"],
    category: "branding",
    short: "Brand recognition is people's ability to identify a brand from cues like its logo, colors or sound, even without seeing the name.",
    definition: [
      "Brand recognition is the ability of people to identify a brand from its cues, such as its logo, colors, packaging, typography or a sound, when they see or hear them. It is a form of aided awareness: the cue is shown, and the person connects it to the brand. Strong recognition works even when the name is hidden.",
      "Brand recall is the harder test. Recognition asks \"have you seen this before?\" Recall asks \"which brands come to mind for bike repair?\" with no prompt. Recognition usually comes first and recall follows with more exposure.",
      "Recognition is built from repetition of the same distinctive cues, which is why [brand consistency](/glossary/brand-consistency) and a stable [visual identity](/glossary/visual-identity) matter so much.",
    ],
    why: [
      "In a fast feed, people do not read the account name before deciding to stop. If your colors and style are familiar, followers spot your post instantly, which helps [engagement](/glossary/engagement) and keeps your content from blending in.",
      "Recognition also builds trust at the moment of choice, on a shelf, in search results or in a list of local businesses.",
    ],
    how: {
      heading: "How to build brand recognition",
      steps: [
        "Choose two or three distinctive cues, such as a color, a font and a layout style.",
        "Use them on every post, video, banner and profile image.",
        "Keep your logo and profile picture the same across platforms.",
        "Use the same intro or end card style on videos.",
        "Change cues rarely and deliberately, not on a whim.",
      ],
    },
    related: ["brand-awareness", "brand-consistency", "visual-identity", "logo", "brand-colors", "brand-equity"],
    faqs: [
      {
        question: "What is the difference between brand recognition and brand recall?",
        answer: ["Recognition is identifying a brand when you see a cue. Recall is naming the brand from memory without a cue. Recall is harder and more valuable."],
      },
      {
        question: "How long does it take to build brand recognition?",
        answer: ["There is no fixed time. It depends on how often your audience sees you and how consistent your cues are. Regular posting with a stable look speeds it up."],
      },
    ],
  },
  {
    slug: "brand-equity",
    term: "Brand equity",
    category: "branding",
    short: "Brand equity is the extra value a brand name adds to a product, from awareness and trust, beyond the product's features and price.",
    definition: [
      "Brand equity is the extra value a well-known brand name adds to a product or service, beyond what its features alone would justify. It comes from awareness, positive associations, perceived quality and loyalty built over time. High brand equity lets a business charge more, win customers more easily and launch new products with less effort.",
      "Two widely taught models describe it. David Aaker's model lists brand awareness, brand associations, perceived quality and brand loyalty. Kevin Lane Keller's customer-based model builds from identity and meaning up to response and resonance.",
      "Equity can be negative too. A brand linked with poor service or a scandal can make an identical product harder to sell.",
    ],
    why: [
      "For a small business, brand equity shows up as repeat customers, word of mouth, people choosing you over a cheaper option and higher response to your posts and ads.",
      "It is built slowly through consistent, honest marketing and good experiences, and it is the main reason [brand consistency](/glossary/brand-consistency) and [brand awareness](/glossary/brand-awareness) are worth the effort.",
    ],
    how: {
      heading: "How to build brand equity",
      steps: [
        "Deliver on your promise every time, because experience shapes associations most.",
        "Keep your identity and messaging consistent so recognition can grow.",
        "Collect and share real reviews and testimonials.",
        "Reward loyal customers and make them feel seen.",
        "Avoid claims you cannot back up.",
      ],
    },
    related: ["brand-awareness", "brand-recognition", "brand-consistency", "social-proof", "brand-positioning", "brand-assets"],
    faqs: [
      {
        question: "How is brand equity measured?",
        answer: ["With a mix of surveys (awareness, perception, loyalty) and business signals, such as price premium over competitors, repeat purchase rate and branded search."],
      },
      {
        question: "What is an example of brand equity?",
        answer: ["When two bakeries sell similar loaves, but people happily pay more and travel further for one because they know and trust it, that difference is brand equity."],
      },
    ],
  },
  {
    slug: "brand-story",
    term: "Brand story",
    aka: ["brand narrative", "origin story"],
    category: "branding",
    short: "A brand story is the narrative of why a business exists, the problem it solves and the people behind it, told to connect with customers.",
    definition: [
      "A brand story is the narrative that explains why a business exists, who it serves, what problem it solves and what it believes. It often includes an origin story and the people behind the brand. Told well, it turns a list of products into something people can relate to, remember and repeat to others.",
      "Good brand stories put the customer at the center. A common structure, borrowed from classic [storytelling](/glossary/storytelling), casts the customer as the hero with a problem and the brand as the guide that helps them succeed.",
      "The story is not one piece of text. It appears in the About page, social bios, founder posts, videos and packaging, in short and long versions.",
    ],
    why: [
      "Facts tell people what you sell. A story gives them a reason to care, which helps them remember you and choose you over a near-identical competitor.",
      "Stories also make great content. Behind-the-scenes posts, founder videos and customer stories all draw from the brand story and tend to feel more personal than product posts.",
    ],
    how: {
      heading: "How to write a brand story",
      steps: [
        "Start with the problem your customers had and why it mattered.",
        "Explain how and why you started, in a few honest sentences.",
        "Show what you do differently and what you believe.",
        "Bring it back to the customer: what changes for them.",
        "Write a long version for your About page and a two-sentence version for bios and videos.",
      ],
    },
    example: {
      label: "Short version",
      body: "Spoke & Chain started when its founder spent three weeks waiting for a simple repair at a chain store. The shop promises 24-hour repairs and plain explanations, because commuters cannot wait weeks without their bike.",
    },
    related: ["storytelling", "brand-messaging", "mission-statement", "brand-personality", "brand-archetype"],
    faqs: [
      {
        question: "What makes a good brand story?",
        answer: ["It is true, short, focused on the customer's problem, and shows what the brand believes. It should sound like the brand's voice, not a press release."],
      },
      {
        question: "Where should you tell your brand story?",
        answer: ["On your About page, in social bios, in founder or behind-the-scenes posts and videos, on packaging and in onboarding emails."],
      },
    ],
  },
  {
    slug: "brand-messaging",
    term: "Brand messaging",
    aka: ["messaging framework", "key messages"],
    category: "branding",
    short: "Brand messaging is the set of core messages a brand repeats: what it offers, for whom, why it is different and what proof backs it up.",
    definition: [
      "Brand messaging is the set of core messages a brand uses to explain what it offers, who it is for, why it is different and why people should believe it. It includes the value proposition, key benefits, proof points and the tagline, all written in the brand voice. It keeps every piece of copy saying the same important things.",
      "Teams often capture messaging in a messaging framework or house: one core message at the top, three or four supporting messages (pillars) underneath, and proof points under each. The framework then feeds websites, ads, posts and sales conversations.",
      "Messaging is what you say. [Brand voice](/glossary/brand-voice) is how you say it. Both should follow from your [brand positioning](/glossary/brand-positioning).",
    ],
    why: [
      "People need to hear the same idea several times before it sticks. Consistent messaging makes sure your posts, ads and pages repeat your main points instead of scattering in many directions.",
      "Clear messaging also speeds up writing. Captions, scripts and [ad copy](/glossary/ad-copy) can start from approved messages and proof rather than a blank page.",
    ],
    how: {
      heading: "How to create a brand messaging framework",
      steps: [
        "Write one core message that sums up your value proposition.",
        "Add three or four supporting messages, each about a key benefit.",
        "Under each, list proof points: facts, reviews, numbers from your own records.",
        "Adapt the messages for each audience segment if you have several.",
        "Share the framework with everyone who writes for the brand.",
      ],
    },
    openpromo: {
      body: "OpenPromo's post ideas, captions and scripts cite the selling points from your brand profile, and checks flag figures and claims that are not on your website.",
      href: "/docs/how-it-works",
      label: "Read how it works",
    },
    related: ["brand-voice", "value-proposition", "brand-positioning", "content-pillars", "tagline", "copywriting"],
    faqs: [
      {
        question: "What is the difference between brand messaging and brand voice?",
        answer: ["Messaging is the content: what you say about your offer. Voice is the style: how you say it."],
      },
      {
        question: "What are messaging pillars?",
        answer: ["The three or four main supporting messages under your core message, each backed by proof points. They often map to content pillars on social media."],
      },
    ],
  },
  {
    slug: "tagline",
    term: "Tagline",
    aka: ["brand tagline", "strapline", "endline"],
    category: "branding",
    short: "A tagline is a short, lasting phrase that sits with a brand's name or logo and sums up what it stands for or promises.",
    definition: [
      "A tagline is a short, memorable phrase that sits alongside a brand's name or logo and sums up what the brand stands for, offers or promises. Taglines are meant to last for years, appearing on the website, packaging, profiles and video end cards. In the UK the same thing is often called a strapline or endline.",
      "Taglines and [slogans](/glossary/slogan) are often used interchangeably. A common distinction: a tagline represents the whole brand and changes rarely, while a slogan is tied to a specific campaign or product and may change often.",
      "Good taglines are short (often under seven words), easy to say, and specific enough that a competitor could not use them word for word.",
    ],
    why: [
      "A tagline gives people a quick handle on what you do, especially when the name alone does not explain it. It works hard in small spaces: social bios, profile banners, [lower thirds](/glossary/lower-third) and end cards.",
      "Repeated consistently, it becomes one of your [brand assets](/glossary/brand-assets) and supports recall.",
    ],
    how: {
      heading: "How to write a tagline",
      steps: [
        "Start from your positioning and value proposition.",
        "Write 30 or more options: benefit-led, descriptive, playful, imperative.",
        "Cut anything a competitor could say, and anything longer than about seven words.",
        "Read the best few aloud, next to your logo, at small sizes.",
        "Test the top two with a few customers before committing.",
      ],
    },
    example: {
      label: "Examples for fictional brands",
      body: "Crumb & Co (bakery): \"Baked this morning.\" Spoke & Chain (bike shop): \"Back on the road tomorrow.\" A beginner yoga studio: \"Yoga for real bodies.\" Each is short and says something specific about the offer.",
    },
    related: ["slogan", "brand-messaging", "value-proposition", "positioning-statement", "mission-statement", "logo"],
    faqs: [
      {
        question: "What is the difference between a tagline and a slogan?",
        answer: ["A tagline represents the brand as a whole and lasts for years. A slogan usually belongs to one campaign or product and changes more often."],
      },
      {
        question: "How long should a tagline be?",
        answer: ["Short enough to read in a glance and say in one breath, usually three to seven words."],
      },
    ],
  },
  {
    slug: "slogan",
    term: "Slogan",
    aka: ["advertising slogan", "campaign slogan"],
    category: "branding",
    short: "A slogan is a short, catchy phrase used in advertising to make a product, campaign or idea memorable, often changed between campaigns.",
    definition: [
      "A slogan is a short, catchy phrase used in advertising and marketing to make a product, campaign or idea memorable. Slogans often use rhythm, rhyme, repetition or a strong verb so they stick in people's heads. Unlike a long-term brand tagline, a slogan is frequently tied to a specific campaign and can change from one to the next.",
      "The word comes from the Scottish Gaelic sluagh-ghairm, meaning a battle cry. Political movements and protests use slogans too, which hints at their job: a phrase short enough to repeat and spread.",
      "In practice, many people use slogan and [tagline](/glossary/tagline) as synonyms. What matters is knowing whether the phrase is meant to last for the whole brand or for one push.",
    ],
    why: [
      "A good slogan helps a campaign be remembered and talked about. It gives ads, posts, [hashtags](/glossary/hashtag) and videos a common thread, so a series of pieces feels like one campaign.",
      "Short, repeatable lines also work well as on-screen text and [hooks](/glossary/hook) in short videos.",
    ],
    how: {
      heading: "How to write a slogan",
      steps: [
        "Decide what the campaign must make people remember or do.",
        "Write many short options using rhythm, contrast or a clear verb.",
        "Remove clichés and anything that needs explaining.",
        "Check it is not already a trademark in your field.",
        "Test it on a few people a day later: do they remember it?",
      ],
    },
    example: {
      label: "Campaign example",
      body: "A bike shop running a spring tune-up campaign uses the slogan \"Spring clean your ride\" across posts, a short reel and a window poster, while its tagline \"Back on the road tomorrow\" stays on the logo.",
    },
    related: ["tagline", "brand-messaging", "copywriting", "headline", "hook"],
    faqs: [
      {
        question: "What makes a good slogan?",
        answer: ["It is short, easy to say, memorable, specific to the brand or campaign, and suggests a benefit or feeling."],
      },
      {
        question: "Can you trademark a slogan?",
        answer: ["In many countries, yes, if it is distinctive and used to identify your goods or services. Check with a trademark professional in your country."],
      },
    ],
  },
  {
    slug: "mission-statement",
    term: "Mission statement",
    aka: ["company mission", "mission"],
    category: "branding",
    short: "A mission statement is a short description of what a company does, who it serves and why, used to guide decisions and explain its purpose.",
    definition: [
      "A mission statement is a short description of what an organization does, who it does it for and why it matters. It explains the company's purpose in the present tense and guides everyday decisions about products, hiring and marketing. Most mission statements are one or two sentences and appear on the About page and in internal documents.",
      "A mission statement is often paired with a vision statement. The mission describes what the company does now. The vision describes the future it is working toward. Values describe how it behaves along the way.",
      "Many mission statements fail because they are vague (\"to deliver excellence to stakeholders\"). The useful ones are concrete enough to rule some things out.",
    ],
    why: [
      "A clear mission keeps a small team focused and helps it say no to off-brand ideas. It also gives content a backbone: posts that show the mission in action are often the most authentic a brand can publish.",
      "Customers increasingly want to know why a business exists, and a specific mission supports the [brand story](/glossary/brand-story).",
    ],
    how: {
      heading: "How to write a mission statement",
      steps: [
        "State what you do in plain words.",
        "Name who you do it for.",
        "Say why it matters or what changes for them.",
        "Cut jargon and anything that could apply to any business.",
        "Keep it to one or two sentences and check the team agrees with it.",
      ],
    },
    example: {
      label: "Example",
      body: "A beginner yoga studio: \"We help people who feel out of place in fitness spaces build a calm, regular yoga practice, with small classes and patient teachers.\"",
    },
    related: ["brand-story", "positioning-statement", "tagline", "brand-identity", "brand-messaging"],
    faqs: [
      {
        question: "What is the difference between a mission statement and a vision statement?",
        answer: ["A mission statement describes what the company does now and for whom. A vision statement describes the future it wants to create."],
      },
      {
        question: "How long should a mission statement be?",
        answer: ["One or two sentences. If it needs a paragraph, it is probably trying to cover too much."],
      },
    ],
  },
  {
    slug: "rebrand",
    term: "Rebrand",
    aka: ["rebranding", "brand refresh"],
    category: "branding",
    short: "A rebrand is a deliberate change to a brand's identity, from refreshed logo and colors to a new name, positioning and messaging.",
    definition: [
      "A rebrand is a deliberate change to how a business presents itself, ranging from a light refresh of the logo, colors and fonts to a full overhaul of the name, positioning, voice and messaging. Businesses rebrand when they outgrow their original identity, change audience or offer, merge with another company, or need to escape a poor reputation.",
      "A brand refresh, or evolutionary rebrand, updates the look while keeping the recognizable core. A full or revolutionary rebrand changes the strategy itself and often the name. Refreshes are far more common and lower risk.",
      "A rebrand is more than a new logo. Positioning, [brand messaging](/glossary/brand-messaging), [brand guidelines](/glossary/brand-guidelines) and every customer touchpoint need to change together, or the result looks inconsistent.",
    ],
    why: [
      "A well-timed rebrand can make a business look as good as it has become and open up new customers. A badly handled one throws away years of [brand recognition](/glossary/brand-recognition) and confuses existing customers.",
      "That is why most small businesses are better off with careful refreshes than dramatic changes, unless the strategy itself has changed.",
    ],
    how: {
      heading: "How to rebrand a business",
      steps: [
        "Write down why you are rebranding and what must stay recognizable.",
        "Revisit positioning and audience before touching visuals.",
        "Update the visual identity and voice, then write new guidelines.",
        "List every touchpoint (profiles, website, signage, templates) and plan the switch.",
        "Announce the change to customers with a short story of why.",
        "Update everything within a short window so old and new do not mix for long.",
      ],
    },
    openpromo: {
      body: "After a rebrand, OpenPromo can read your updated website again; it refreshes the brand profile while keeping the edits you made, and new posts and videos use the new colors and fonts.",
      href: "/features/brand-kit-generator",
      label: "See the brand kit generator",
    },
    related: ["brand-identity", "visual-identity", "brand-guidelines", "brand-positioning", "brand-recognition", "social-media-audit"],
    faqs: [
      {
        question: "What is the difference between a rebrand and a brand refresh?",
        answer: ["A refresh updates the look (logo, colors, fonts) while keeping the strategy. A rebrand can change the strategy, positioning and even the name."],
      },
      {
        question: "When should a business rebrand?",
        answer: ["When the identity no longer fits what the business does or who it serves, after a merger, or when the name or reputation is holding it back. Boredom with the logo is not a good reason."],
      },
      {
        question: "How long does a rebrand take?",
        answer: ["A small refresh can take a few weeks. A full rebrand with new strategy, name and rollout often takes several months."],
      },
    ],
  },
];
