import type { GlossaryTerm } from './types';

export const terms: GlossaryTerm[] = [
  {
    slug: 'content-marketing',
    term: 'Content marketing',
    aka: ['content creation', 'inbound content'],
    category: 'content',
    short: 'Content marketing is attracting and keeping customers by publishing useful posts, videos, articles and guides instead of only running ads.',
    definition: [
      'Content marketing is a way of winning customers by publishing useful, interesting material they actually want: blog posts, social posts, videos, guides, newsletters and podcasts. Instead of interrupting people with ads, it earns their attention, builds trust over time and leads some of that audience toward buying.',
      'The idea is old. Printed customer magazines and recipe booklets did the same job long before social media. What changed is cost: anyone can now publish to a large audience for free, so the bar has moved from "can we publish?" to "is this worth anyone’s time?".',
      'Content marketing sits next to, not against, paid advertising. Good content gives ads something to point at, and ads can push your best content to more people. Most programs are guided by a written [content strategy](/glossary/content-strategy) and a handful of [content pillars](/glossary/content-pillars).',
    ],
    why: [
      'Content keeps working after you publish it. A helpful guide or an [evergreen](/glossary/evergreen-content) video can bring visitors for years, while an ad stops the moment you stop paying. Over time that lowers what each new customer costs.',
      'It also answers questions before a sales conversation starts. People who have read your guides or watched your videos arrive knowing what you do and why it might suit them, which makes them easier to convert and more likely to stay.',
    ],
    how: {
      heading: 'How to start content marketing',
      steps: [
        'Write down who you are trying to reach and what they struggle with, in their words.',
        'Pick three to five topics you can speak about with authority and that connect to what you sell.',
        'Choose one or two channels where that audience already spends time.',
        'Set a publishing rhythm you can keep for months, and plan it in a [content calendar](/glossary/content-calendar).',
        'Turn each strong piece into several formats so one idea reaches more people.',
        'Review what gets saved, shared and clicked every month, and do more of that.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A bike shop publishes a short weekly video on basic repairs (fixing a puncture, adjusting brakes) plus a monthly guide to local rides. People who find the videos learn the shop knows its stuff, and some book a service when the job is beyond them.',
    },
    openpromo: {
      body: 'OpenPromo reads your website into a brand profile and turns it into posts, carousels, reels and promo videos, so the content you publish says what your site says.',
      href: '/features',
      label: 'See all features',
    },
    related: ['content-strategy', 'content-pillars', 'content-repurposing', 'evergreen-content', 'social-media-marketing', 'marketing-funnel'],
    faqs: [
      {
        question: 'What is an example of content marketing?',
        answer: ['A plumber’s video on how to stop a leaking tap, a software company’s guide to choosing an invoicing tool, or a bakery’s weekly recipe post. Each one helps the reader first and promotes the business second.'],
      },
      {
        question: 'Is content marketing the same as social media marketing?',
        answer: ['No, though they overlap. Content marketing covers any useful material on any channel, including blogs and email. [Social media marketing](/glossary/social-media-marketing) is everything a business does on social platforms, including ads and community replies.'],
      },
      {
        question: 'How long does content marketing take to work?',
        answer: ['Usually months, not weeks. Search traffic and a loyal audience build slowly. Short-form social content can get attention faster, but the steady results come from publishing consistently over time.'],
      },
    ],
  },
  {
    slug: 'content-strategy',
    term: 'Content strategy',
    aka: ['content plan', 'content marketing strategy'],
    category: 'content',
    short: 'A content strategy is the plan for what content you make, who it is for, where it goes and how you will judge whether it works.',
    definition: [
      'A content strategy is the written plan behind a business’s content: who it is for, what problems it addresses, which topics and formats you will use, where it will be published, how often, and how you will measure success. It turns random posting into a body of work that supports clear business goals.',
      'A strategy is different from a [content calendar](/glossary/content-calendar). The calendar lists what goes out on which day. The strategy explains why those pieces exist at all and what they should achieve, so it changes far less often.',
      'Most content strategies include a short description of the [target audience](/glossary/target-audience), a set of [content pillars](/glossary/content-pillars), the channels and formats in use, the brand voice, the publishing cadence and a few metrics to track.',
    ],
    why: [
      'Without a strategy, content tends to follow whatever feels urgent this week. The result is a feed with no clear message, uneven quality and no way to tell what is working. A strategy makes it obvious what to make next and what to skip.',
      'It also makes content cheaper to produce. When the audience, topics and formats are settled, a team or a single owner spends less time deciding and more time making, and each piece builds on the last.',
    ],
    how: {
      heading: 'How to create a content strategy',
      steps: [
        'State one or two business goals the content should support, such as more trial signups or more bookings.',
        'Describe the audience: who they are, what they want and what stops them buying.',
        'Choose three to five content pillars that connect those needs to what you sell.',
        'Pick channels and formats you can sustain, for example two reels and one carousel a week.',
        'Decide how you will measure progress, such as saves, link clicks or leads, and when you will review it.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A yoga studio’s strategy: goal, fill weekday morning classes. Audience, office workers nearby. Pillars: five-minute desk stretches, meet the teachers, student stories, class schedule offers. Channels: Instagram Reels twice a week and a monthly email. Measure: trial class bookings from social.',
    },
    openpromo: {
      body: 'The brand profile OpenPromo builds from your site records your audience, selling points and voice, and post ideas can be given a goal and a date, which covers the planning side of a simple strategy.',
      href: '/features/brand-kit-generator',
      label: 'See the brand kit generator',
    },
    related: ['content-marketing', 'content-pillars', 'content-calendar', 'target-audience', 'buyer-persona', 'brand-voice'],
    faqs: [
      {
        question: 'What should a content strategy include?',
        answer: ['Goals, audience, topics or pillars, channels and formats, publishing frequency, voice and the metrics you will use. A single page is enough for a small business.'],
      },
      {
        question: 'What is the difference between content strategy and content marketing?',
        answer: ['Content marketing is the activity of publishing content to attract customers. Content strategy is the plan that decides what that activity looks like and why.'],
      },
    ],
  },
  {
    slug: 'content-pillars',
    term: 'Content pillars',
    aka: ['content buckets', 'content themes', 'content pillar'],
    category: 'content',
    short: 'Content pillars are the three to five core topics a brand posts about again and again, giving its content a clear focus and variety.',
    definition: [
      'Content pillars are the small set of core topics, usually three to five, that a brand returns to in all of its content. Each pillar connects something the audience cares about with something the business offers. Together they keep a feed focused, varied and recognizable, and make it easier to decide what to post.',
      'Pillars are sometimes called content buckets or themes. A common mix is one educational pillar (tips and how-tos), one product pillar (features, offers, launches), one proof pillar ([testimonials](/glossary/testimonial), results) and one personality pillar (behind the scenes, team, values).',
      'On blogs, "pillar content" can also mean a long, central guide that links to shorter related articles. That is a related idea from SEO, but on social media the term almost always means the recurring topic groups.',
    ],
    why: [
      'Pillars stop the blank-page problem. When you know your four topics, planning a week of posts is a matter of filling slots, not inventing ideas from scratch. They also make it easy to batch work by topic.',
      'They help people understand what you are about. Someone who sees a few of your posts should be able to say what you do and why to follow you. A clear set of pillars makes that happen, and keeps a feed from drifting into pure promotion.',
    ],
    how: {
      heading: 'How to choose content pillars',
      steps: [
        'List the questions customers ask most often before and after they buy.',
        'List what makes your business different: your [value proposition](/glossary/value-proposition) and best selling points.',
        'Group both lists into three to five themes where audience interest and your offer meet.',
        'Check each pillar can supply at least a dozen post ideas without repeating itself.',
        'Give each pillar a rough share of your posting, for example 40% education, 20% product.',
      ],
    },
    example: {
      label: 'Example pillars',
      body: 'Crumb & Co, a bakery: 1) Baking know-how (why sourdough needs time, how to store bread). 2) This week’s bakes (new items, seasonal specials). 3) Regulars (customer photos and short quotes). 4) Behind the counter (4 a.m. shifts, the team). Every post fits one of the four.',
    },
    openpromo: {
      body: 'Post ideas in OpenPromo are grouped by goal (launch, offer, tip, social proof, feature, behind the scenes), and each idea cites the selling points it is based on, which maps neatly onto a set of pillars.',
      href: '/features/instagram-caption-generator',
      label: 'See the caption generator',
    },
    related: ['content-strategy', 'content-calendar', 'content-batching', 'content-marketing', 'brand-messaging'],
    faqs: [
      {
        question: 'How many content pillars should you have?',
        answer: ['Three to five is the usual range. Fewer than three gets repetitive; more than five dilutes the focus and makes planning harder.'],
      },
      {
        question: 'What are examples of content pillars?',
        answer: ['Education (tips and how-tos), product (features and offers), proof (reviews and case studies), community (customer content) and culture (team and behind the scenes). Most brands pick from these and make them specific.'],
      },
    ],
  },
  {
    slug: 'content-repurposing',
    term: 'Content repurposing',
    aka: ['repurpose content', 'content recycling', 'repurposing content'],
    category: 'content',
    short: 'Content repurposing is turning one piece of content into several formats, like a blog post into a carousel, a reel and an email.',
    definition: [
      'Content repurposing is taking one piece of content and reworking it into other formats for other channels. A blog post can become a carousel, a short reel, a quote graphic and a newsletter section. The core idea stays the same; the length, layout and wording change to suit each platform and audience.',
      'Repurposing is not copy and paste. Posting the same landscape video everywhere, or the same caption on LinkedIn and TikTok, usually performs poorly. Each format has its own [aspect ratio](/glossary/aspect-ratio), length and conventions, so the piece needs real adaptation.',
      'It works in both directions. A long piece (a webinar, a guide) can be cut into many short ones, and a set of short posts that did well can be gathered into a longer guide or video.',
    ],
    why: [
      'Most of the work in content is the thinking: the research, the angle, the examples. Repurposing gets more reach from that work. One good idea can fill a week of posts across several channels.',
      'People also need to see a message several times before it sticks. Different formats reach different people, and the same person may skip a long article but watch a 20-second [reel](/glossary/instagram-reels) on the same topic.',
    ],
    how: {
      heading: 'How to repurpose content',
      steps: [
        'Start with a piece that already performed well or that took real effort to make.',
        'Pull out the key points, quotes, numbers and steps.',
        'Match each point to a format: a list becomes a [carousel](/glossary/carousel-post), a single tip becomes a reel, a quote becomes an image.',
        'Rewrite for each platform’s length and tone instead of pasting the same text.',
        'Resize visuals to each platform’s format and keep text inside the safe areas.',
        'Spread the pieces out over days or weeks rather than posting them all at once.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A bike shop writes a guide, "Five checks before a long ride". It becomes a five-slide carousel, a 30-second reel showing each check, a LinkedIn post for local cycling clubs and a short section in the monthly email.',
    },
    openpromo: {
      body: 'In OpenPromo one scene can be rendered at any supported size, and the same idea can be made as a post, carousel, reel or video, all from the same brand profile.',
      href: '/features/instagram-post-generator',
      label: 'See the post generator',
    },
    related: ['content-batching', 'content-marketing', 'carousel-post', 'short-form-video', 'evergreen-content', 'social-media-image-sizes'],
    faqs: [
      {
        question: 'What is an example of repurposing content?',
        answer: ['Turning a 10-minute YouTube tutorial into three short vertical clips, a carousel of the key steps and a blog post with the transcript. One recording, five pieces.'],
      },
      {
        question: 'Is repurposing content bad for engagement?',
        answer: ['Not when each version is adapted to its platform. Cross-posting identical files with platform watermarks or the wrong size tends to do worse, which is why reworking matters.'],
      },
    ],
  },
  {
    slug: 'content-batching',
    term: 'Content batching',
    aka: ['batch content creation', 'batching content'],
    category: 'content',
    short: 'Content batching is making many pieces of content in one focused session, such as filming a month of reels in an afternoon.',
    definition: [
      'Content batching is the habit of creating content in large, focused blocks instead of one piece at a time. You might write all of next month’s captions in one sitting, film eight short videos in one afternoon, or design a week of graphics together. Grouping similar tasks saves setup time and keeps quality more consistent.',
      'Batching usually splits the work into stages: plan a batch of ideas, write or script them all, then shoot or design them all, then edit, then schedule. Each stage uses a different kind of focus, so doing it in blocks avoids constant switching.',
      'It pairs naturally with a [content calendar](/glossary/content-calendar) and scheduling tools. The batch fills the calendar; the scheduler publishes it on time.',
    ],
    why: [
      'For a small business, the hardest part of social media is consistency. Batching makes it realistic: a few hours a week or a day a month produces a steady stream of posts, so the feed does not go quiet when things get busy.',
      'It also improves quality. Lighting, setup and brand look stay the same across a batch, and you see posts side by side, which makes it easier to spot repetition or gaps in your [content pillars](/glossary/content-pillars).',
    ],
    how: {
      heading: 'How to batch content',
      steps: [
        'Block a fixed time each week or month only for content.',
        'Plan the batch first: pick ideas across your pillars and give each a date.',
        'Write all [hooks](/glossary/hook), scripts and captions in one session.',
        'Shoot or design everything that shares a setup together, changing outfits or props between pieces if needed.',
        'Edit and export in one pass, then load everything into a scheduler.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A yoga studio owner spends the first Monday of each month filming twelve short stretch videos in the empty studio, then writes captions for all twelve that evening. Three posts a week are covered for the month.',
    },
    openpromo: {
      body: 'OpenPromo can generate a list of post ideas at once and give each a date, and agents can create and render many pieces through the MCP tools or REST API.',
      href: '/docs/mcp-tools',
      label: 'See the MCP tools',
    },
    related: ['content-calendar', 'content-pillars', 'content-repurposing', 'content-creator', 'best-time-to-post'],
    faqs: [
      {
        question: 'How far ahead should you batch content?',
        answer: ['Two to four weeks is common. It is far enough to stay ahead but close enough to react to news, trends and what last month’s posts taught you.'],
      },
      {
        question: 'Does batching make content feel less timely?',
        answer: ['It can, so leave a few open slots each week for trends, replies and real-time posts. The batch covers the baseline; the open slots cover the moment.'],
      },
    ],
  },
  {
    slug: 'content-creator',
    term: 'Content creator',
    aka: ['creator', 'digital creator'],
    category: 'content',
    short: 'A content creator is a person who makes and publishes videos, posts, photos or writing for an online audience, often for brands too.',
    definition: [
      'A content creator is someone who makes and publishes material for an online audience: short videos, photos, posts, articles, podcasts or livestreams. Some create for their own following and earn from sponsorships, ads or products. Others work for businesses, either in-house or freelance, making content that the brand publishes under its own name.',
      'The term overlaps with influencer but is not the same. An influencer is defined by audience size and sway; a creator is defined by making things. Plenty of skilled creators have small followings and earn mainly by producing [user-generated content](/glossary/user-generated-content) style videos for brands.',
      'Creators are the workforce behind the [creator economy](/glossary/creator-economy). Their skills usually span scripting, filming, editing, writing captions and understanding how each platform rewards content.',
    ],
    why: [
      'Creators know what holds attention on each platform, which is a different skill from traditional advertising. Working with them, or thinking like one, tends to produce content that looks native to the feed instead of like an ad.',
      'For a small business, the owner is often the main content creator. Treating that as a real role, with time set aside and a plan, is usually what separates a quiet feed from one that brings customers.',
    ],
    how: {
      heading: 'How to work with a content creator',
      steps: [
        'Decide what you need: posts for your own accounts, ads, or posts on the creator’s channel.',
        'Look at creators’ past work for style and quality, not just follower counts.',
        'Write a short [content brief](/glossary/content-brief) with the goal, key message and must-say points.',
        'Agree usage rights, deadlines, revisions and payment in writing.',
        'Give feedback on substance and accuracy, and leave the delivery style to the creator.',
      ],
    },
    related: ['creator-economy', 'influencer-marketing', 'user-generated-content', 'ugc-ads', 'content-brief', 'micro-influencer'],
    faqs: [
      {
        question: 'What is the difference between a content creator and an influencer?',
        answer: ['A content creator is defined by making content. An influencer is defined by having an audience that trusts their recommendations. Many people are both, but a brand can hire a creator purely to make content it posts itself.'],
      },
      {
        question: 'How do content creators make money?',
        answer: ['Through brand deals, platform payouts and ad revenue, affiliate links, selling their own products or courses, and fees for making content that brands publish on their own channels.'],
      },
    ],
  },
  {
    slug: 'content-brief',
    term: 'Content brief',
    aka: ['creative brief', 'content outline'],
    category: 'content',
    short: 'A content brief is a short document telling a writer, designer or creator what a piece of content is for, who it is for and what it must say.',
    definition: [
      'A content brief is a short document that tells whoever makes a piece of content exactly what is needed. It covers the goal, the audience, the key message, the format and length, the points that must be included, the [call to action](/glossary/call-to-action), the deadline and any examples or brand rules to follow.',
      'Briefs exist for every format: a blog article, a reel, a carousel, a product video or an ad. An SEO brief adds the target keyword and headings; a video brief adds length, aspect ratio and shot ideas; a creator brief adds usage rights and do’s and don’ts.',
      'A good brief is short. One page is usually enough. Its job is to remove guesswork, not to write the piece for the creator.',
    ],
    why: [
      'Most bad content comes from a vague request, not a bad creator. A brief makes the goal clear before any time is spent, which cuts revision rounds and keeps the result on message.',
      'Briefs also create consistency. When every piece starts from the same template with the same audience and [brand voice](/glossary/brand-voice), the output from different writers, freelancers or AI tools stays recognizably yours.',
    ],
    how: {
      heading: 'How to write a content brief',
      steps: [
        'State the goal in one sentence: what should the viewer think, feel or do afterwards?',
        'Describe the audience and the problem or question the piece answers.',
        'List the key message and two or three supporting points, with any facts that must be accurate.',
        'Specify the format, length, size and channel.',
        'Add the call to action, deadline and one or two examples of the style you want.',
      ],
    },
    example: {
      label: 'Short video brief',
      code: 'Goal: get local riders to book a free bike fit\nAudience: road cyclists, 30-55, riding 3+ times a week\nKey message: a 30-minute fit fixes most knee and back pain\nFormat: 9:16 reel, 20-30 seconds, voiceover and captions\nMust show: the fitting rig, before/after saddle height\nCTA: "Book a free fit, link in bio"\nDue: Friday',
    },
    openpromo: {
      body: 'In OpenPromo you can start a post, reel or video from a sentence-long brief; the writer combines it with the selling points and voice in your brand profile.',
      href: '/docs/how-it-works',
      label: 'See how it works',
    },
    related: ['content-strategy', 'content-creator', 'copywriting', 'video-script', 'target-audience', 'brand-guidelines'],
    faqs: [
      {
        question: 'What is the difference between a content brief and a creative brief?',
        answer: ['A creative brief usually covers a whole campaign: the big idea, audience and message across many assets. A content brief covers one piece and gets more specific about format, length and must-have points.'],
      },
      {
        question: 'How long should a content brief be?',
        answer: ['One page or less for most social content. Longer briefs get skimmed; the essentials are the goal, audience, key message, format and call to action.'],
      },
    ],
  },
  {
    slug: 'copywriting',
    term: 'Copywriting',
    aka: ['social media copywriting', 'marketing copy', 'copy'],
    category: 'content',
    short: 'Copywriting is writing words meant to make people take an action: buy, sign up, click, book or remember a brand.',
    definition: [
      'Copywriting is the craft of writing words that persuade people to take an action, such as buying, signing up, booking or clicking. The text itself is called copy. It appears in ads, websites, emails, product pages, social captions, video scripts and packaging, and is judged by results rather than by how literary it sounds.',
      'Copywriting differs from content writing in purpose. Content writing informs or entertains and builds trust over time; copywriting asks for something now. In practice they blend: a helpful carousel still needs a sharp [headline](/glossary/headline) and a clear [call to action](/glossary/call-to-action).',
      'Copywriters rely on a few repeatable tools: knowing the reader’s [pain points](/glossary/pain-points), turning features into benefits, using frameworks such as [AIDA](/glossary/aida) or PAS, and cutting every word that does not earn its place.',
    ],
    why: [
      'The same product with different words can sell very differently. Copy is often the cheapest lever to test: changing a headline or a button costs almost nothing compared with changing a product or a price.',
      'On social media, copy decides whether anyone stops. The first line of a caption, the text on the first frame of a video and the headline on an ad all compete with everything else in the feed for a second of attention.',
    ],
    how: {
      heading: 'How to write good copy',
      steps: [
        'Know exactly who you are writing for and what they want.',
        'Lead with the benefit to the reader, not the feature or the company.',
        'Use the reader’s own words for their problem; reviews and support emails are a good source.',
        'Write short sentences and one idea per line, especially on mobile.',
        'End with one clear action and remove anything that distracts from it.',
        'Test variations of the headline or first line rather than guessing.',
      ],
    },
    example: {
      label: 'Before and after',
      body: 'Before: "Crumb & Co uses a 48-hour fermentation process." After: "Bread that stays soft for four days, because we let it rise for two." The fact is the same; the second version says what it means for the customer.',
    },
    openpromo: {
      body: 'OpenPromo writes post text, captions and scripts from your brand profile, then flags hype words, figures not found on your site, text too long to read in time and a missing call to action before anything renders.',
      href: '/features/instagram-caption-generator',
      label: 'See the caption generator',
    },
    related: ['headline', 'ad-copy', 'aida', 'pas-framework', 'features-vs-benefits', 'ai-copywriting'],
    faqs: [
      {
        question: 'What is the difference between copywriting and content writing?',
        answer: ['Copywriting aims to get a specific action now, like a click or a sale. Content writing aims to inform or entertain and build trust over time. Many marketers do both, often in the same piece.'],
      },
      {
        question: 'What is social media copywriting?',
        answer: ['Writing captions, on-screen text, hooks and ad copy for social platforms. It favors short lines, a strong first sentence that shows before "more", and a clear next step.'],
      },
      {
        question: 'Can AI do copywriting?',
        answer: ['AI tools can draft copy quickly, especially variations to test. They still need a clear brief, accurate facts about your business and a human check for claims and tone. See [AI copywriting](/glossary/ai-copywriting).'],
      },
    ],
  },
  {
    slug: 'headline',
    term: 'Headline',
    aka: ['heading', 'title'],
    category: 'content',
    short: 'A headline is the main line of text at the top of a post, ad, page or article, written to grab attention and make people read on.',
    definition: [
      'A headline is the main line of text that introduces a piece of content: the title of an article, the big text on an ad or social graphic, the top line of a landing page, or the words on a video’s first frame. Its job is to stop the right people and make them read, watch or click further.',
      'Headlines come in recognizable types: the benefit ("Bread that stays soft for four days"), the how-to ("How to fix a puncture in five minutes"), the number list ("7 stretches for desk workers"), the question, and the direct offer ("20% off bike services this week").',
      'On social media, the headline is often the first line of a caption or the text overlaid on an image. In video it plays the same role as a [hook](/glossary/hook). On ads and graphics it usually has a smaller supporting line beneath it, called a subheadline.',
    ],
    why: [
      'Far more people read headlines than read anything else. If the headline does not earn attention, the rest of the work goes unseen. That makes it the highest-value line in most marketing pieces.',
      'Headlines also shape [click-through rate](/glossary/click-through-rate) in ads, email subject lines and search results. Small wording changes can move results noticeably, which is why headlines are among the most commonly tested elements.',
    ],
    how: {
      heading: 'How to write a headline',
      steps: [
        'Say who it is for or what problem it solves, as specifically as you can.',
        'Lead with a benefit or a clear promise, not the brand name.',
        'Keep it short enough to read at a glance; on graphics, aim for under about eight words.',
        'Use concrete details: numbers, times, places, outcomes.',
        'Write five to ten versions, then pick or test the strongest.',
      ],
    },
    example: {
      label: 'Example',
      body: 'Weak: "Yoga at Lotus Studio." Stronger: "Ten minutes of yoga that undoes eight hours at a desk." The second names the reader, the problem and the payoff.',
    },
    openpromo: {
      body: 'OpenPromo sets headlines as real text in your brand fonts and shrinks them until they fit the format, so they never overflow or come out garbled.',
      href: '/features/instagram-post-generator',
      label: 'See the post generator',
    },
    related: ['copywriting', 'hook', 'click-through-rate', 'ad-copy', 'microcopy'],
    faqs: [
      {
        question: 'What makes a good headline?',
        answer: ['It is clear about who it is for and what they get, specific enough to be believable, and short enough to read instantly. Curiosity helps, but not at the cost of being understood.'],
      },
      {
        question: 'How long should a headline be?',
        answer: ['It depends on where it appears. Graphics and ads work best with a few words. Article titles that appear in search are usually trimmed at around 60 characters, so put the important words first.'],
      },
    ],
  },
  {
    slug: 'microcopy',
    term: 'Microcopy',
    aka: ['UX copy', 'UX writing', 'interface copy'],
    category: 'content',
    short: 'Microcopy is the small text in a product or page, like button labels, form hints and error messages, that guides people to act.',
    definition: [
      'Microcopy is the short, functional text that helps people use a website, app or form: button labels, form field hints, error messages, confirmation notes, tooltips and the line under a signup button saying "No card needed". Each piece is only a few words, but together they decide whether people finish what they started.',
      'Microcopy is part of UX writing, the wider practice of writing for interfaces. It focuses on clarity first and brand voice second. A friendly error message is nice; one that tells you exactly how to fix the problem is better.',
      'In marketing, microcopy shows up on [landing pages](/glossary/landing-page), checkout pages, email signup forms and [call to action](/glossary/call-to-action) buttons, where small reassurances can remove the last bit of hesitation.',
    ],
    why: [
      'People hesitate at the moment of commitment: entering an email, paying, signing up. Microcopy that answers the unspoken question ("Will I be spammed?", "Can I cancel?") right there reduces drop-off without changing anything else on the page.',
      'It is also cheap to improve. Rewriting a button from "Submit" to "Get my free guide" takes a minute, and testing a few versions of key microcopy can lift [conversion rate](/glossary/conversion-rate) with no design work.',
    ],
    how: {
      heading: 'How to write microcopy',
      steps: [
        'Name buttons by what happens next ("Book my class"), not by the action ("Submit").',
        'Answer the obvious worry near the point of action: price, spam, cancellation, time.',
        'Write error messages that say what went wrong and how to fix it.',
        'Keep it short, plain and consistent in wording across the site.',
        'Read the flow out loud as if you were a first-time visitor.',
      ],
    },
    example: {
      label: 'Signup form microcopy',
      code: 'Button: Send me the stretch guide\nBelow button: One email a week. Unsubscribe in one click.\nError: That email is missing an @. Try again?',
    },
    related: ['copywriting', 'call-to-action', 'landing-page', 'conversion-rate', 'objection-handling'],
    faqs: [
      {
        question: 'What is an example of microcopy?',
        answer: ['The "No credit card required" line under a free trial button, a password field hint like "At least 8 characters", or a confirmation that says "You’re in. Check your inbox for the guide."'],
      },
      {
        question: 'Is microcopy the same as UX writing?',
        answer: ['Microcopy is a part of UX writing. UX writing covers all the words in a product experience, including onboarding flows and empty states; microcopy usually refers to the smallest pieces.'],
      },
    ],
  },
  {
    slug: 'aida',
    term: 'AIDA model',
    aka: ['AIDA', 'AIDA framework', 'attention interest desire action'],
    category: 'content',
    short: 'The AIDA model is a copywriting framework: grab Attention, build Interest, create Desire, then ask for Action.',
    definition: [
      'The AIDA model is a classic framework for persuasive marketing that breaks a message into four stages: Attention, Interest, Desire and Action. First you get noticed, then you make the reader curious, then you make them want what you offer, and finally you tell them exactly what to do next. It shapes ads, emails, pages and videos.',
      'AIDA dates back to early 20th-century advertising and sales training and is usually credited to the American advertising pioneer E. St. Elmo Lewis. It has survived because it describes something real: people move from noticing to wanting to acting, and copy that skips a step tends to fail.',
      'Variations add stages, such as AIDCA (adding Conviction, often proof) or AIDAS (adding Satisfaction after purchase). The [marketing funnel](/glossary/marketing-funnel) is a broader cousin that applies the same idea to the whole customer journey rather than to a single message.',
    ],
    why: [
      'AIDA is a simple checklist for any piece of marketing. If a post gets views but no clicks, it often lacks Desire or a clear Action. If it gets no views at all, the Attention stage is the problem. Naming the stages makes problems easier to find.',
      'It also maps well onto short video. The [hook](/glossary/hook) is Attention, the next few seconds build Interest, the benefit or proof creates Desire, and the [call to action](/glossary/call-to-action) is Action.',
    ],
    how: {
      heading: 'How to use the AIDA model',
      steps: [
        'Attention: open with a bold headline, question, surprising fact or striking visual.',
        'Interest: show you understand the reader’s situation or add an intriguing detail.',
        'Desire: describe the benefit and back it with proof, such as a review or result.',
        'Action: give one specific, easy next step and a reason to take it now.',
      ],
    },
    example: {
      label: 'AIDA in a 20-second reel',
      code: 'Attention: "Your saddle might be why your knees hurt."\nInterest: "Most riders set saddle height by eye, and most are off by a few centimeters."\nDesire: "A 30-minute bike fit at Spoke & Chain sets it properly. Riders tell us the ache is gone in a week."\nAction: "Book a free fit this month. Link in bio."',
    },
    openpromo: {
      body: 'OpenPromo’s reel writer plans a hook, a few scenes and a call to action, and its checks warn when the hook or call to action is missing.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['pas-framework', 'copywriting', 'marketing-funnel', 'hook', 'call-to-action', 'storytelling'],
    faqs: [
      {
        question: 'What does AIDA stand for?',
        answer: ['Attention, Interest, Desire, Action. They are the four stages a reader moves through before responding to a marketing message.'],
      },
      {
        question: 'Is the AIDA model still relevant?',
        answer: ['Yes, as a checklist. Real buying is messier and often takes many touchpoints, but for a single ad, post or email, making sure each of the four stages is covered still helps.'],
      },
      {
        question: 'What is the difference between AIDA and PAS?',
        answer: ['AIDA starts by grabbing attention and builds toward desire. [PAS](/glossary/pas-framework) starts with the reader’s problem and makes it feel urgent before offering the solution. PAS suits problem-aware audiences; AIDA is more general.'],
      },
    ],
  },
  {
    slug: 'pas-framework',
    term: 'PAS framework',
    aka: ['problem agitate solution', 'PAS formula', 'PAS copywriting'],
    category: 'content',
    short: 'The PAS framework is a copywriting formula: name the Problem, Agitate it so it feels urgent, then present your Solution.',
    definition: [
      'The PAS framework is a copywriting formula with three steps: Problem, Agitate, Solution. You name a problem the reader already has, agitate it by describing why it is frustrating or costly, then present your product or service as the solution. It is short, direct and works well for ads, emails, captions and short videos.',
      'PAS works because people are usually more motivated to fix a problem than to gain something new. By starting with the reader’s situation rather than your product, the copy feels relevant from the first line.',
      'The agitate step needs care. The aim is to make a real problem feel concrete, not to invent fear or exaggerate. Overdone agitation reads as manipulative and can hurt trust, especially for sensitive topics like health or money.',
    ],
    why: [
      'PAS is one of the fastest ways to write copy that connects. If you know your customers’ [pain points](/glossary/pain-points), the framework almost writes itself, which makes it useful for busy owners and for testing many [ad copy](/glossary/ad-copy) variations.',
      'It suits short formats. A three-line caption or a 15-second video has room for exactly three beats, and PAS gives them a clear order.',
    ],
    how: {
      heading: 'How to write copy with the PAS framework',
      steps: [
        'Problem: state the problem in the customer’s own words, in one sentence.',
        'Agitate: add a specific, honest detail about what it costs them in time, money or stress.',
        'Solution: introduce your offer and show how it removes the problem.',
        'Close with a [call to action](/glossary/call-to-action) and, if you can, a piece of proof.',
      ],
    },
    example: {
      label: 'PAS caption',
      code: 'Problem: Sitting all day leaves your back stiff by 3 p.m.\nAgitate: You stretch for a minute, it helps for ten, and the ache is back before you leave work.\nSolution: Our 30-minute lunchtime class is built for desk workers. Two sessions a week and most students say mornings feel different.\nBook your first class free, link in bio.',
    },
    related: ['aida', 'copywriting', 'pain-points', 'ad-copy', 'storytelling'],
    faqs: [
      {
        question: 'What does PAS stand for in copywriting?',
        answer: ['Problem, Agitate, Solution. It is a three-step formula that starts with the reader’s problem, makes it feel urgent, then offers your solution.'],
      },
      {
        question: 'When should you use PAS instead of AIDA?',
        answer: ['Use PAS when your audience already feels the problem and you can name it clearly. Use [AIDA](/glossary/aida) when you need to grab attention first, for example with people who have not thought about the problem yet.'],
      },
    ],
  },
  {
    slug: 'storytelling',
    term: 'Storytelling',
    aka: ['brand storytelling', 'marketing storytelling'],
    category: 'content',
    short: 'Storytelling in marketing is using stories, with a character, a problem and a change, to make a brand’s message memorable.',
    definition: [
      'Storytelling in marketing is the practice of presenting a message as a story rather than a list of facts. A story has a character (often the customer), a problem or goal, a struggle, and a change at the end. Brands use it in videos, posts, case studies and about pages because people remember stories far better than claims.',
      'Brand storytelling usually puts the customer at the center, with the business as the guide that helps them succeed. That framing keeps the story relevant to the viewer instead of turning it into self-praise.',
      'Stories can be tiny. A three-scene reel (a frustrated customer, the fix, the happy result) is a story. So is a [testimonial](/glossary/testimonial) that explains what life was like before and after. The wider [brand story](/glossary/brand-story) is the bigger narrative of why the business exists.',
    ],
    why: [
      'Stories hold attention. A video that sets up a problem makes people want to see how it ends, which helps [watch time](/glossary/watch-time) and completion. Facts inside a story are also easier to recall later.',
      'Stories build trust and emotional connection in a way specs cannot. Two shops can sell the same bikes; the one whose content shows real riders and real fixes feels more human and more credible.',
    ],
    how: {
      heading: 'How to use storytelling in marketing',
      steps: [
        'Pick a real character: a customer, an employee or the founder.',
        'Start with a relatable problem or goal, stated in a single line.',
        'Show the turning point: what changed and how your product or service helped.',
        'End with the result in concrete terms, and an invitation for the viewer to get the same.',
        'Keep it short. Cut any scene that does not move the story forward.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A yoga studio’s reel: a nurse finishing a night shift, stiff and exhausted. She tries the 7 a.m. gentle class on a friend’s suggestion. Six weeks later she is shown sleeping better and laughing with classmates. Final frame: "Gentle Flow, weekdays at 7. First class free."',
    },
    openpromo: {
      body: 'OpenPromo’s promo videos follow a story arc built from your site: the problem, your solution, features shown with your screenshots, proof and a call to action.',
      href: '/features/url-to-video',
      label: 'See URL to video',
    },
    related: ['brand-story', 'case-study', 'testimonial', 'aida', 'video-script', 'hook'],
    faqs: [
      {
        question: 'What is brand storytelling?',
        answer: ['Brand storytelling is telling the story of why a business exists and how it helps customers, in a way people connect with. It shows up across the about page, videos, social posts and case studies.'],
      },
      {
        question: 'What are the elements of a good marketing story?',
        answer: ['A relatable character, a clear problem or goal, a turning point, a concrete result and a reason for the viewer to care. Short stories need all five, just compressed.'],
      },
    ],
  },
  {
    slug: 'features-vs-benefits',
    term: 'Features vs benefits',
    aka: ['features and benefits', 'feature vs benefit'],
    category: 'content',
    short: 'Features are what a product has or does; benefits are what the customer gains from them. Good marketing leads with benefits.',
    definition: [
      'Features vs benefits is the distinction between what a product is or does and what the customer gets out of it. A feature is a fact: "48-hour fermentation", "carbon frame", "rooftop studio". A benefit is the result for the buyer: bread that stays fresh longer, a bike that is easier to climb on, classes with a view.',
      'A quick test is to add "which means..." after a feature. "Carbon frame, which means the bike weighs less, which means hills feel easier." The last link in that chain is usually the benefit that matters to the customer.',
      'Benefits come in layers. Functional benefits are practical (saves time). Emotional benefits are how it feels (less stress, more confidence). Strong copy usually names the functional benefit and hints at the emotional one, then uses the feature as proof.',
    ],
    why: [
      'Customers do not buy features; they buy outcomes. Copy that lists specs makes the reader do the work of figuring out why they should care, and most will not bother. Leading with benefits makes the [value proposition](/glossary/value-proposition) obvious at a glance.',
      'Features still matter, as evidence. A benefit with no feature behind it sounds like an empty claim. The best [copywriting](/glossary/copywriting) pairs a clear benefit with the feature that makes it true.',
    ],
    how: {
      heading: 'How to turn features into benefits',
      steps: [
        'List every feature of your product or service.',
        'After each one, write "which means..." and keep going until you reach something the customer cares about.',
        'Check the benefit against your [target audience](/glossary/target-audience): would they say it matters?',
        'Lead with the benefit in headlines and hooks; use the feature as the supporting proof.',
      ],
    },
    example: {
      label: 'Features to benefits',
      code: 'Feature: Online booking 24/7\nBenefit: Book your class at midnight when you finally remember\n\nFeature: Same-day repair service\nBenefit: Drop your bike off in the morning, ride home after work',
    },
    related: ['value-proposition', 'copywriting', 'unique-selling-proposition', 'pain-points', 'ad-copy'],
    faqs: [
      {
        question: 'What is the difference between a feature and a benefit?',
        answer: ['A feature describes the product: what it has or does. A benefit describes the customer’s gain: what changes for them because of that feature.'],
      },
      {
        question: 'Should marketing ever lead with features?',
        answer: ['Sometimes. Expert buyers comparing technical products may search for specific features, and for them the spec is the benefit. For most consumer audiences, lead with the outcome.'],
      },
    ],
  },
  {
    slug: 'pain-points',
    term: 'Pain points',
    aka: ['customer pain points', 'pain point'],
    category: 'content',
    short: 'Pain points are the specific problems, frustrations and costs your customers face that your product or service can solve.',
    definition: [
      'Pain points are the specific problems, frustrations or needs that a customer experiences and wants solved. They can be about money (too expensive), time (too slow), effort (too complicated) or support (no one helps). Knowing your audience’s pain points tells you what to say in marketing and which benefits to put first.',
      'Pain points are usually grouped into a few types: financial, productivity, process and support. A bike owner might feel all four: repairs are pricey, the bike is out of action for days, booking is awkward, and nobody explains what was fixed.',
      'The most useful pain points are phrased in the customer’s own words. "My back aches by mid-afternoon" is more powerful in a caption than "musculoskeletal discomfort", and it is the kind of line people recognize instantly.',
    ],
    why: [
      'Marketing that names a real pain point feels relevant from the first line. It shows you understand the reader, which builds trust before you even mention your product. Frameworks like [PAS](/glossary/pas-framework) are built entirely around this.',
      'Pain points also guide what to make. Each one can become a post, a video or a section of a [landing page](/glossary/landing-page) that addresses it directly, giving your [content pillars](/glossary/content-pillars) a solid base.',
    ],
    how: {
      heading: 'How to find customer pain points',
      steps: [
        'Read reviews of your business and your competitors, especially the three-star ones.',
        'Look at the questions customers ask before buying, in messages, emails and calls.',
        'Ask a few recent customers what almost stopped them from buying.',
        'Browse forums, groups and comment sections where your audience talks.',
        'Write each pain point in the customer’s words and rank them by how often they come up.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A bakery’s pain point research finds that office managers ordering for meetings worry most about late delivery and not knowing what is allergen-free. Its next posts show the delivery window guarantee and a clearly labeled allergen menu.',
    },
    related: ['buyer-persona', 'pas-framework', 'objection-handling', 'target-audience', 'value-proposition'],
    faqs: [
      {
        question: 'What are the four types of customer pain points?',
        answer: ['A common grouping is financial (cost), productivity (time and effort), process (how hard something is to do) and support (lack of help). Many real problems mix several types.'],
      },
      {
        question: 'How do you use pain points in marketing?',
        answer: ['Name the pain point in the headline or hook, show you understand it, then present how your product removes it. Use customers’ own words wherever you can.'],
      },
    ],
  },
  {
    slug: 'objection-handling',
    term: 'Objection handling',
    aka: ['handling objections', 'sales objections'],
    category: 'content',
    short: 'Objection handling is answering the doubts that stop people buying, such as price, trust or timing, before or when they come up.',
    definition: [
      'Objection handling is the practice of answering the doubts and concerns that stop a potential customer from buying. Common objections are about price, trust, timing, need, and fit ("Is this for someone like me?"). In sales it happens in conversation; in marketing it happens through content, FAQs, guarantees and proof placed where the doubt arises.',
      'Good objection handling does not argue with the customer. It acknowledges the concern, then gives information or proof that resolves it. "Is it worth the price?" might be answered with a breakdown of what is included, a [testimonial](/glossary/testimonial) from a similar buyer, or a trial.',
      'In content marketing, objections are an excellent source of topics. Each frequent objection can become a post, a short video, an FAQ entry or a line of [microcopy](/glossary/microcopy) next to the buy button.',
    ],
    why: [
      'Most people who do not buy are not saying no; they are saying "not sure". Unanswered objections are one of the main reasons interested visitors leave a [landing page](/glossary/landing-page) without acting. Answering them raises conversions without needing more traffic.',
      'Addressing objections openly also builds trust. A business that says "here is who this is not for" or "here is what happens if it does not work" sounds more honest than one that only lists positives.',
    ],
    how: {
      heading: 'How to handle objections in marketing',
      steps: [
        'List the objections you hear most, from sales calls, messages and reviews.',
        'For each, write a short, honest answer backed by a fact, proof or guarantee.',
        'Place each answer where the doubt arises: near the price, the signup button or the booking form.',
        'Turn the biggest objections into posts or videos that tackle them head on.',
        'Add an FAQ section to key pages and update it as new questions come in.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A yoga studio hears "I’m not flexible enough" again and again. It posts a reel of a teacher saying "You don’t need to be flexible to start; that’s what the class is for", adds a beginners FAQ, and labels its gentle classes "No experience needed".',
    },
    related: ['pain-points', 'social-proof', 'testimonial', 'landing-page', 'conversion-rate', 'microcopy'],
    faqs: [
      {
        question: 'What are the most common customer objections?',
        answer: ['Price ("too expensive"), trust ("will it work?"), timing ("not now"), need ("I don’t need it") and fit ("not for someone like me"). Most other objections are variations of these.'],
      },
      {
        question: 'How do you handle a price objection?',
        answer: ['Show the value behind the price: what is included, what it saves, and what similar customers got. Payment plans, a smaller starter option or a guarantee can also lower the risk.'],
      },
    ],
  },
  {
    slug: 'target-audience',
    term: 'Target audience',
    aka: ['target market', 'audience'],
    category: 'content',
    short: 'A target audience is the specific group of people a business wants to reach with its marketing, defined by needs, traits and behavior.',
    definition: [
      'A target audience is the specific group of people a business most wants to reach with its marketing and content. It is defined by shared traits: demographics such as age and location, interests, needs, problems and buying behavior. Knowing the target audience shapes what you say, where you say it and how you say it.',
      'Target audience and target market are often used interchangeably, but there is a nuance. The target market is everyone who might buy; the target audience is the group a particular campaign or channel is aimed at. A bike shop’s market is local cyclists; one campaign’s audience might be commuters only.',
      'Teams often turn a target audience into one or more [buyer personas](/glossary/buyer-persona), fictional profiles that make the audience easier to picture. In B2B, an [ideal customer profile](/glossary/ideal-customer-profile) describes the target companies.',
    ],
    why: [
      'Marketing aimed at everyone usually reaches no one. A clear target audience makes it possible to write specific [hooks](/glossary/hook), pick the right platforms and choose examples people recognize, all of which improve engagement and conversions.',
      'It also saves money. Paid social targeting, content topics and even product decisions get sharper when you know who you are serving, so less budget goes to people who were never going to buy.',
    ],
    how: {
      heading: 'How to find your target audience',
      steps: [
        'Look at who already buys from you: age, location, job, how they found you.',
        'Find the common problems and goals among your best customers.',
        'Check platform analytics to see who engages with your content now.',
        'Look at who your competitors speak to, and where they leave gaps.',
        'Write a one-paragraph description and test it against real customers.',
      ],
    },
    example: {
      label: 'Example',
      body: 'Crumb & Co’s target audience: people aged 25-45 living or working within two miles of the shop, who care about quality food, buy bread several times a week and order cakes for family events. Its posts focus on fresh bakes, pre-ordering and celebration cakes.',
    },
    openpromo: {
      body: 'When OpenPromo reads your website, the brand profile records who your business is for, and every post, reel and video is written with that audience in mind.',
      href: '/features/brand-kit-generator',
      label: 'See the brand kit generator',
    },
    related: ['buyer-persona', 'ideal-customer-profile', 'customer-journey', 'brand-positioning', 'lookalike-audience', 'content-strategy'],
    faqs: [
      {
        question: 'What is the difference between a target audience and a target market?',
        answer: ['The target market is the whole group of potential customers. A target audience is the narrower group a specific campaign, channel or piece of content is aimed at.'],
      },
      {
        question: 'Can a business have more than one target audience?',
        answer: ['Yes. Many businesses have two or three distinct audiences, such as individual customers and corporate clients. It usually works best to make separate content for each instead of blending them.'],
      },
    ],
  },
  {
    slug: 'buyer-persona',
    term: 'Buyer persona',
    aka: ['customer persona', 'marketing persona', 'audience persona'],
    category: 'content',
    short: 'A buyer persona is a fictional profile of an ideal customer, based on research, that helps a business write and plan for real people.',
    definition: [
      'A buyer persona is a short, semi-fictional profile of a typical ideal customer, built from research and real customer data. It gives the persona a name, role, goals, frustrations, buying habits and the questions they ask. Marketers use personas to picture a specific person when writing copy, planning content and choosing channels.',
      'A persona is more detailed and more human than a [target audience](/glossary/target-audience) description. Instead of "women 30-45 interested in fitness", it reads like "Maya, 38, nurse on rotating shifts, wants low-impact exercise that fits an unpredictable schedule".',
      'Personas are only useful if they are grounded in evidence: interviews, reviews, sales conversations and analytics. Personas invented in a meeting room often describe who the team wishes would buy, not who actually does.',
    ],
    why: [
      'It is easier to write for one person than for a crowd. A persona helps keep tone, examples and offers specific, which tends to make content feel personal and relevant.',
      'Personas also align a team. When everyone (owner, designer, freelancer, AI tool) works from the same short profile, the content stays consistent and addresses the same [pain points](/glossary/pain-points).',
    ],
    how: {
      heading: 'How to create a buyer persona',
      steps: [
        'Gather data: talk to five to ten customers, read reviews, check analytics.',
        'Note patterns in roles, goals, problems, objections and where they spend time online.',
        'Write a one-page profile with a name, short background, goals, frustrations and buying triggers.',
        'Add a few real quotes from customers to keep it grounded.',
        'Review it once or twice a year as your customers change.',
      ],
    },
    example: {
      label: 'Short persona',
      code: 'Name: Commuter Chris\nAge: 34, office worker, rides 8 km to work daily\nGoals: reliable bike, no surprises on the way to work\nFrustrations: repairs that take days, jargon from mechanics\nWhere online: Instagram, local cycling group on Facebook\nQuote: "I just need it fixed by Monday."',
    },
    related: ['target-audience', 'ideal-customer-profile', 'pain-points', 'customer-journey', 'content-strategy'],
    faqs: [
      {
        question: 'How many buyer personas should a business have?',
        answer: ['Most small businesses do well with one to three. More than that becomes hard to act on; the point is focus, not a complete catalogue of every customer type.'],
      },
      {
        question: 'What is the difference between a buyer persona and an ICP?',
        answer: ['An [ideal customer profile](/glossary/ideal-customer-profile) describes the type of company or account that fits best, mainly in B2B. A buyer persona describes an individual person, such as the decision-maker inside that company.'],
      },
    ],
  },
  {
    slug: 'ideal-customer-profile',
    term: 'Ideal customer profile (ICP)',
    aka: ['ICP', 'ideal customer'],
    category: 'content',
    short: 'An ideal customer profile (ICP) describes the type of customer, usually a company, that gets the most value from you and is most valuable to you.',
    definition: [
      'An ideal customer profile (ICP) is a description of the kind of customer that gets the most value from your product and brings the most value to your business. In B2B it describes companies, by industry, size, location, budget, tools and challenges. In B2C it can describe the best-fit individual customers. It guides who you target and what you make.',
      'An ICP is usually built by looking at your best existing customers: the ones who stay longest, spend most, refer others and need the least support. What do they have in common? Those shared traits become the profile.',
      'The ICP sits above [buyer personas](/glossary/buyer-persona). The ICP says which companies to pursue; personas describe the people inside them, such as the owner who decides and the marketer who uses the tool.',
    ],
    why: [
      'An ICP keeps marketing and sales focused on customers who are likely to buy and stay. Content, ads and outreach aimed at the ICP tend to convert better and produce fewer customers who churn quickly.',
      'It also sharpens messaging. When you know your best customers are, say, independent cafes with one to three locations, you can use their language, their examples and their problems in every post, and build a better [lookalike audience](/glossary/lookalike-audience) for ads.',
    ],
    how: {
      heading: 'How to define an ideal customer profile',
      steps: [
        'List your ten best customers by value, loyalty and fit.',
        'Note what they share: industry, size, location, budget, tools, problems and how they found you.',
        'Also note traits of customers who were a poor fit, to know what to avoid.',
        'Write a short profile with the must-have and nice-to-have traits.',
        'Use it to filter ad targeting, content topics and which leads to follow up first.',
      ],
    },
    example: {
      label: 'Example ICP',
      body: 'A company selling booking software for fitness studios defines its ICP as independent studios with one to three locations, two to fifteen instructors, class-based schedules, located in English-speaking markets and currently managing bookings by spreadsheet or messaging apps.',
    },
    related: ['buyer-persona', 'target-audience', 'marketing-funnel', 'lookalike-audience', 'customer-journey'],
    faqs: [
      {
        question: 'What does ICP stand for in marketing?',
        answer: ['Ideal customer profile. It describes the type of customer (often a company) that is the best fit for your product and the most valuable to your business.'],
      },
      {
        question: 'Is an ICP only for B2B?',
        answer: ['The term is most common in B2B, where you target companies. B2C businesses use the same idea, though they often call it a [target audience](/glossary/target-audience) or customer profile.'],
      },
    ],
  },
  {
    slug: 'customer-journey',
    term: 'Customer journey',
    aka: ['buyer journey', 'buyer’s journey', 'customer journey map'],
    category: 'content',
    short: 'The customer journey is the full path a person takes with a brand, from first hearing about it to buying and coming back.',
    definition: [
      'The customer journey is the full set of steps and interactions a person has with a business, from first becoming aware of it through researching, buying, using the product and, ideally, buying again or recommending it. It includes every touchpoint: a social post, a review, a website visit, an email, a store visit or a support chat.',
      'Journeys are often split into stages such as awareness, consideration, decision, retention and advocacy. They look similar to the stages of a [marketing funnel](/glossary/marketing-funnel), but the journey is drawn from the customer’s point of view and includes what happens after the sale.',
      'A customer journey map is a visual of those stages, showing what the customer does, thinks and feels at each step, and where they get stuck. Real journeys are rarely linear; people jump between channels and stages.',
    ],
    why: [
      'Different stages need different content. Someone just discovering a problem needs education; someone comparing options needs proof and detail; a recent buyer needs onboarding. Mapping the journey shows which stages your content covers and which are empty.',
      'It also reveals friction. A journey map often uncovers points where people drop off, such as a confusing booking form or slow replies, and fixing those can matter more than making new content. [Retargeting](/glossary/retargeting) and email can then bring back people who stalled.',
    ],
    how: {
      heading: 'How to map the customer journey',
      steps: [
        'Pick one [buyer persona](/glossary/buyer-persona) and one goal, such as booking a first class.',
        'List every touchpoint from first hearing about you to becoming a regular.',
        'For each, note what the customer is doing, thinking and feeling.',
        'Mark the places where people hesitate or drop off.',
        'Assign content or fixes to each weak stage and review the map every few months.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A bike shop’s journey: a commuter sees a reel on fixing punctures (awareness), follows the account and reads reviews (consideration), books a service online (decision), gets a reminder for a six-month check (retention) and tags the shop when posting a weekend ride (advocacy).',
    },
    related: ['marketing-funnel', 'buyer-persona', 'target-audience', 'retargeting', 'content-strategy'],
    faqs: [
      {
        question: 'What are the stages of the customer journey?',
        answer: ['A common version has five: awareness, consideration, decision, retention and advocacy. Some models use three (awareness, consideration, decision) and stop at the purchase.'],
      },
      {
        question: 'What is the difference between the customer journey and the marketing funnel?',
        answer: ['The funnel shows how a business moves prospects toward a sale, narrowing at each stage. The customer journey shows the experience from the customer’s side and continues after the purchase.'],
      },
    ],
  },
  {
    slug: 'marketing-funnel',
    term: 'Marketing funnel',
    aka: ['top of funnel', 'TOFU', 'sales funnel', 'conversion funnel'],
    category: 'content',
    short: 'A marketing funnel models how people move from first hearing about a brand to buying, with fewer people at each stage.',
    definition: [
      'A marketing funnel is a model of the stages people pass through on the way from first hearing about a business to becoming a customer. It is drawn as a funnel because many people enter at the top and fewer remain at each stage. Common stages are awareness, interest, consideration, intent and purchase, often grouped as top, middle and bottom.',
      'Top of funnel (TOFU) content reaches new people: entertaining reels, helpful tips, broad educational posts. Middle of funnel (MOFU) content helps people compare and trust: guides, [case studies](/glossary/case-study), demos. Bottom of funnel (BOFU) content asks for the sale: offers, pricing, testimonials and a clear call to action.',
      'The funnel is a simplification. Real buyers loop back, skip stages and come in through referrals at the bottom. Still, it is a useful way to check that your content serves people at every stage rather than only shouting offers at strangers.',
    ],
    why: [
      'A funnel helps you match content to readiness. Showing a hard sell to someone who has never heard of you wastes money; giving a ready buyer another tip instead of a link wastes a sale. Planning by stage fixes both.',
      'It also makes problems measurable. If many people see your posts but few visit your site, the leak is between awareness and interest. If visitors come but do not buy, look at your [landing page](/glossary/landing-page) and [conversion rate](/glossary/conversion-rate).',
    ],
    how: {
      heading: 'How to build a marketing funnel',
      steps: [
        'Define the action at the bottom: a purchase, booking, signup or call.',
        'Plan top of funnel content that reaches new people in your audience.',
        'Plan middle of funnel content that builds trust: proof, comparisons, demos, a [lead magnet](/glossary/lead-magnet).',
        'Plan bottom of funnel content and pages that make the action easy.',
        'Track how many people move between stages and fix the biggest drop first.',
        'Use [retargeting](/glossary/retargeting) and email to bring back people who stalled.',
      ],
    },
    example: {
      label: 'Example funnel',
      body: 'A yoga studio: TOFU, short reels of desk stretches. MOFU, a free "7-day back care" email series and student stories. BOFU, an offer reel for a free first class, linking to a simple booking page. Each stage hands people to the next.',
    },
    related: ['customer-journey', 'conversion-rate', 'lead-magnet', 'landing-page', 'aida', 'retargeting'],
    faqs: [
      {
        question: 'What does top of funnel (TOFU) mean?',
        answer: ['The first stage of the funnel, where people become aware of a problem or a brand. TOFU content is broad and helpful or entertaining, aimed at reaching new people rather than selling.'],
      },
      {
        question: 'What is the difference between a marketing funnel and a sales funnel?',
        answer: ['They are often used as synonyms. When separated, the marketing funnel covers attracting and warming up prospects, and the sales funnel covers the steps from a qualified lead to a closed sale.'],
      },
    ],
  },
  {
    slug: 'testimonial',
    term: 'Testimonial',
    aka: ['customer testimonial', 'client testimonial'],
    category: 'content',
    short: 'A testimonial is a statement from a real customer about their experience with a business, used in marketing as proof.',
    definition: [
      'A testimonial is a statement from a real customer describing their experience with a product, service or business, shared with permission in marketing. It can be a written quote, a photo with a caption, or a short video. Testimonials are a form of [social proof](/glossary/social-proof): they show prospects that people like them were happy with the result.',
      'A testimonial differs from a review. A review is posted by the customer on a public platform such as Google or a marketplace, and the business does not control it. A testimonial is collected and chosen by the business to feature in its own marketing.',
      'The strongest testimonials are specific. "Great service!" says little. "They fixed my gears the same day and explained what was wrong in plain English" answers a real worry and sounds like a real person.',
    ],
    why: [
      'People trust other customers more than they trust brands. A good testimonial placed near a price, a signup form or in an ad can answer doubts that no amount of brand copy can, which makes it a powerful tool for [objection handling](/glossary/objection-handling).',
      'Testimonials also make good content. A single quote can become a graphic, a carousel slide or the closing scene of a [testimonial video](/glossary/testimonial-video), and customers often share posts that feature them.',
    ],
    how: {
      heading: 'How to get customer testimonials',
      steps: [
        'Ask at the right moment: just after a good result or a compliment.',
        'Make it easy: send two or three simple questions instead of asking for "a testimonial".',
        'Ask what they were worried about before, what happened, and what changed.',
        'Get written permission to use their name, photo and words in marketing.',
        'Use their exact words, trimmed for length but not rewritten into marketing language.',
      ],
    },
    example: {
      label: 'Example',
      body: '"I put off yoga for years because I thought I’d be the stiffest person in the room. The gentle class made me feel welcome from day one, and my back hasn’t hurt since spring." Priya, student at a neighborhood yoga studio.',
    },
    openpromo: {
      body: 'OpenPromo has a quote scene layout for putting a customer’s words in your brand fonts and colors, and its writer only uses claims that can be traced back to your website.',
      href: '/features/instagram-post-generator',
      label: 'See the post generator',
    },
    related: ['social-proof', 'testimonial-video', 'case-study', 'user-generated-content', 'objection-handling'],
    faqs: [
      {
        question: 'What is the difference between a testimonial and a review?',
        answer: ['A review is posted publicly by the customer on a platform the business does not control. A testimonial is collected by the business and used in its own marketing, with the customer’s permission.'],
      },
      {
        question: 'Can you edit a customer testimonial?',
        answer: ['You can shorten it for length or fix obvious typos, but you should not change its meaning or add claims. Showing the customer the final version before publishing is good practice, and advertising rules in many countries require testimonials to reflect genuine experiences.'],
      },
    ],
  },
  {
    slug: 'case-study',
    term: 'Case study',
    aka: ['customer case study', 'customer story', 'success story'],
    category: 'content',
    short: 'A case study is a detailed story of how a real customer used a product or service to solve a problem, with the results.',
    definition: [
      'A case study is a detailed account of how one customer used a product or service to solve a specific problem, and what happened as a result. It usually follows a clear structure: the customer, the challenge, the solution and the results, ideally with numbers and quotes. It goes deeper than a testimonial.',
      'Case studies are most common in B2B and in services with a considered purchase, such as agencies, software, consultants and contractors. They work in many formats: a web page, a PDF, a short video, a [carousel](/glossary/carousel-post) or a LinkedIn post.',
      'A good case study is a story, not a brochure. It shows the customer as the hero, includes the messy parts (what was hard, what was tried first) and uses real results the customer has agreed to share.',
    ],
    why: [
      'Case studies answer the question every serious buyer has: "Has this worked for someone like me?" They sit in the middle and bottom of the [marketing funnel](/glossary/marketing-funnel), helping people who are already interested decide.',
      'They also give sales and social teams lots of material. One case study can produce quote graphics, a short video, a results carousel and talking points for calls.',
    ],
    how: {
      heading: 'How to write a case study',
      steps: [
        'Pick a customer with a clear problem, a clear result and willingness to be featured.',
        'Interview them about the situation before, why they chose you and what changed.',
        'Write it as before, during and after, keeping their own words in quotes.',
        'Include specific results (time saved, sales, bookings) that the customer has confirmed.',
        'Add a headline that states the result and a call to action at the end.',
        'Get the customer’s approval before publishing.',
      ],
    },
    example: {
      label: 'Case study outline',
      code: 'Headline: How a two-location cafe cut morning queues by moving orders online\nCustomer: Corner Cup, two cafes, 14 staff\nChallenge: 8 a.m. queues out the door, lost walk-away customers\nSolution: pre-order app with pickup shelf\nResults: (figures confirmed by the customer)\nQuote: owner on what changed for staff\nCTA: Book a demo',
    },
    related: ['testimonial', 'social-proof', 'storytelling', 'thought-leadership', 'marketing-funnel'],
    faqs: [
      {
        question: 'What is the difference between a case study and a testimonial?',
        answer: ['A testimonial is a short quote about a customer’s experience. A case study tells the full story of their problem, the solution and the results, usually with numbers and several quotes.'],
      },
      {
        question: 'How long should a marketing case study be?',
        answer: ['Web case studies are often 500 to 1,500 words, with a short summary at the top for skimmers. Social versions can be a five to ten slide carousel or a one-minute video.'],
      },
    ],
  },
  {
    slug: 'lead-magnet',
    term: 'Lead magnet',
    aka: ['opt-in incentive', 'gated content', 'freebie'],
    category: 'content',
    short: 'A lead magnet is something free and useful, like a guide, checklist or discount, offered in exchange for a person’s email address.',
    definition: [
      'A lead magnet is a free, useful item offered in exchange for a person’s contact details, usually an email address. Common examples are checklists, guides, templates, mini-courses, quizzes, free trials and discount codes. It turns an anonymous visitor or follower into a lead you can contact again, which is why it sits in the middle of the [marketing funnel](/glossary/marketing-funnel).',
      'A good lead magnet solves one specific problem quickly. A one-page "pre-ride safety checklist" often works better than a 40-page ebook, because people can see the value at a glance and use it right away.',
      'Lead magnets are usually promoted on social media and in ads, and delivered through a simple [landing page](/glossary/landing-page) with a short form. After signup, an email sequence delivers the item and introduces the business.',
    ],
    why: [
      'Most people who see your content will not buy today. A lead magnet gives them a reason to stay in touch, so you can keep helping them until they are ready. An email list is also an audience no platform algorithm can take away.',
      'It qualifies interest. Someone who downloads a guide to choosing a road bike is telling you exactly what they care about, which makes follow-up content and offers far more relevant.',
    ],
    how: {
      heading: 'How to create a lead magnet',
      steps: [
        'Pick one specific problem your [target audience](/glossary/target-audience) wants solved fast.',
        'Choose a simple format: checklist, template, short guide, quiz or discount.',
        'Make it genuinely useful on its own, even if they never buy.',
        'Build a short landing page with a clear headline and a one or two field form.',
        'Promote it with posts, a link in bio and ads, then follow up with a short email sequence.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A bike shop offers a free printable "10-minute bike check before your first spring ride". It promotes it with a reel showing three of the checks and a link in bio. Each signup gets the PDF, then a few emails with seasonal tips and a service booking offer.',
    },
    related: ['landing-page', 'marketing-funnel', 'conversion-rate', 'call-to-action', 'link-in-bio', 'content-marketing'],
    faqs: [
      {
        question: 'What are examples of lead magnets?',
        answer: ['Checklists, templates, short guides, email courses, quizzes, calculators, webinars, free samples, trials and first-order discounts. The best format depends on what your audience needs most.'],
      },
      {
        question: 'Do lead magnets still work?',
        answer: ['Yes, when they are specific and useful. Generic ebooks have lost appeal because people have seen many of them. A quick, practical tool that solves a real problem still converts well.'],
      },
    ],
  },
  {
    slug: 'landing-page',
    term: 'Landing page',
    aka: ['lead capture page', 'squeeze page'],
    category: 'content',
    short: 'A landing page is a web page built for one goal, like a signup or booking, that visitors reach from an ad, post or email.',
    definition: [
      'A landing page is a standalone web page designed around a single goal, such as booking, buying, signing up or downloading. Visitors usually arrive from an ad, a social post, an email or a link in bio. Unlike a homepage, which serves many purposes, a landing page has one message and one [call to action](/glossary/call-to-action), with few distractions.',
      'Typical parts are a clear [headline](/glossary/headline), a short explanation of the benefit, supporting proof such as testimonials or logos, answers to common objections, and a form or button. Many remove or reduce the main site navigation so attention stays on the action.',
      'In a looser sense, "landing page" also means any page where a visitor first lands on a site. In marketing it nearly always means the focused, single-goal kind.',
    ],
    why: [
      'Sending ad or social traffic to a general homepage makes people search for what they came for, and many give up. A landing page that matches the promise in the ad picks up exactly where the ad left off, which usually lifts [conversion rate](/glossary/conversion-rate).',
      'Landing pages are also easy to measure and test. With one goal per page, you can see clearly how many visitors act and run [A/B tests](/glossary/ab-testing) on headlines, images or offers.',
    ],
    how: {
      heading: 'How to make a landing page that converts',
      steps: [
        'Match the headline to the ad or post that sends people there.',
        'State the main benefit and who it is for above the fold.',
        'Add proof near the action: testimonials, reviews or results.',
        'Answer the top two or three objections briefly.',
        'Use one clear call to action and keep forms as short as possible.',
        'Check it loads fast and reads well on a phone, where most social traffic arrives.',
      ],
    },
    example: {
      label: 'Example',
      body: 'Crumb & Co runs an ad for celebration cakes. The ad links to a page headed "Custom cakes, ready in 48 hours", with photos of past cakes, three customer quotes, an allergen note, and a short order form. There is no menu or blog link to wander off to.',
    },
    openpromo: {
      body: 'OpenPromo makes 1200×628 link and ad banners that can point to a landing page, written from the same brand profile so the message on the banner matches your site.',
      href: '/features/banner-maker',
      label: 'See the banner maker',
    },
    related: ['conversion-rate', 'call-to-action', 'lead-magnet', 'ab-testing', 'microcopy', 'open-graph-image'],
    faqs: [
      {
        question: 'What is the difference between a landing page and a homepage?',
        answer: ['A homepage introduces the whole business and links to everything. A landing page focuses on one offer and one action, built to convert visitors from a specific campaign.'],
      },
      {
        question: 'Do you need a landing page for social media ads?',
        answer: ['You do not strictly need one; some platforms offer in-app forms. But a dedicated page that matches the ad usually converts better than sending people to a general homepage.'],
      },
    ],
  },
  {
    slug: 'conversion-rate',
    term: 'Conversion rate',
    aka: ['conversion', 'CVR', 'conversion ratio'],
    category: 'content',
    short: 'Conversion rate is the percentage of people who take a desired action, like buying or signing up, out of everyone who could have.',
    definition: [
      'Conversion rate is the percentage of visitors, viewers or recipients who complete a desired action, called a conversion. That action might be a purchase, a booking, a signup, a download or a click. It is calculated by dividing conversions by the total number of visitors or interactions, then multiplying by 100. It shows how well something persuades.',
      'Conversion rate can be measured almost anywhere: a [landing page](/glossary/landing-page), a whole website, an email, an ad or a checkout step. Each needs a clear definition of what counts as a conversion and what counts as a visitor, or the numbers are not comparable.',
      'There is no universal "good" conversion rate. It varies widely by industry, price, traffic source and what you are asking for. A free download converts far more people than a large purchase. The useful comparison is your own rate over time and across versions.',
    ],
    why: [
      'Conversion rate turns attention into revenue. Doubling it has the same effect on sales as doubling traffic, and it is often cheaper to achieve. That makes it one of the most important numbers for any business that sells online.',
      'It also shows where marketing is breaking. Plenty of [reach](/glossary/reach) but low conversion points to a mismatch between the promise and the page, a weak offer, or unanswered objections.',
    ],
    how: {
      heading: 'How to calculate conversion rate',
      body: [
        'Divide the number of conversions by the number of visitors (or sessions, clicks or recipients, as long as you are consistent) and multiply by 100. Then improve it by matching the page to the ad, sharpening the offer, adding proof and removing friction such as long forms.',
      ],
    },
    example: {
      label: 'Formula',
      code: 'Conversion rate = (conversions / visitors) x 100\n\nExample: 36 class bookings / 1,200 landing page visitors\n= 0.03 x 100 = 3% conversion rate',
    },
    related: ['click-through-rate', 'landing-page', 'marketing-funnel', 'ab-testing', 'cpa', 'call-to-action'],
    faqs: [
      {
        question: 'What is a good conversion rate?',
        answer: ['It depends heavily on industry, price and the action asked. Compare against your own past results and against similar pages, rather than a single benchmark figure.'],
      },
      {
        question: 'How can I improve my conversion rate?',
        answer: ['Make the page match the source of traffic, lead with a clear benefit, add proof near the action, answer objections, shorten forms and make sure it works well on mobile. Test one change at a time.'],
      },
      {
        question: 'What is the difference between conversion rate and click-through rate?',
        answer: ['[Click-through rate](/glossary/click-through-rate) measures how many people click a link after seeing it. Conversion rate measures how many take the final desired action, which usually happens after the click.'],
      },
    ],
  },
  {
    slug: 'click-through-rate',
    term: 'Click-through rate (CTR)',
    aka: ['CTR', 'clickthrough rate'],
    category: 'content',
    short: 'Click-through rate (CTR) is the percentage of people who click a link, ad or button after seeing it: clicks divided by impressions.',
    definition: [
      'Click-through rate (CTR) is the percentage of people who click on a link, ad, button or search result after seeing it. It is calculated by dividing clicks by [impressions](/glossary/impressions) and multiplying by 100. CTR measures how well a headline, image, thumbnail or call to action earns a click from the people who saw it.',
      'CTR is reported almost everywhere: ad platforms, email tools (often as click rate), Google Search Console, and YouTube, where thumbnail CTR shows how often an impression turns into a view.',
      'A high CTR is good only if the clicks are relevant. A misleading headline can raise CTR while lowering [conversion rate](/glossary/conversion-rate) and annoying the people who clicked. The goal is the right clicks, not just more of them.',
    ],
    why: [
      'CTR is the bridge between being seen and getting results. A post or ad can reach many people, but if nobody clicks, no one reaches your site or offer. It is often the first metric to improve when traffic is low.',
      'On ad platforms, CTR can also affect cost. Ads that people engage with are generally treated as more relevant, which can lower what you pay for each click, so creative that earns clicks saves budget too.',
    ],
    how: {
      heading: 'How to calculate and improve CTR',
      body: [
        'Divide clicks by impressions and multiply by 100. To improve it, test stronger [headlines](/glossary/headline), clearer thumbnails and images, a specific call to action and better audience targeting. Compare CTR only between similar placements, because rates differ a lot between search, social, email and display.',
      ],
    },
    example: {
      label: 'Formula',
      code: 'CTR = (clicks / impressions) x 100\n\nExample: 84 clicks / 6,000 ad impressions\n= 0.014 x 100 = 1.4% CTR',
    },
    openpromo: {
      body: 'Every OpenPromo reel comes with a poster thumbnail, and the banner maker makes link preview images, two things that shape whether people click.',
      href: '/features/banner-maker',
      label: 'See the banner maker',
    },
    related: ['conversion-rate', 'impressions', 'headline', 'thumbnail', 'cpc', 'call-to-action'],
    faqs: [
      {
        question: 'What is a good click-through rate?',
        answer: ['It varies by channel, industry and placement. Search ads, social ads, emails and display banners all have very different typical ranges, so compare against your own results in the same placement.'],
      },
      {
        question: 'Why is my CTR high but conversions low?',
        answer: ['Usually the ad or headline promises something the landing page does not deliver, the page is slow or confusing, or the targeting reaches curious people who are not ready to buy.'],
      },
    ],
  },
  {
    slug: 'thought-leadership',
    term: 'Thought leadership',
    aka: ['thought leader', 'thought leadership content'],
    category: 'content',
    short: 'Thought leadership is content that shares original expertise, opinions or insights to make a person or brand a trusted voice in its field.',
    definition: [
      'Thought leadership is content that shares original expertise, informed opinions and practical insight on topics in your industry, with the aim of becoming a trusted, go-to voice. It goes beyond basic tips: it offers a point of view, lessons from experience or new data. It is usually published under a founder’s or expert’s name, often on LinkedIn, blogs or podcasts.',
      'What separates thought leadership from ordinary [content marketing](/glossary/content-marketing) is originality. Repeating common advice is not thought leadership. Explaining why the common advice is wrong in your experience, with examples, is.',
      'It works for small businesses too. A bike mechanic explaining what twenty years of repairs taught them about which parts fail first is thought leadership for local cyclists, even without a big platform.',
    ],
    why: [
      'People prefer to buy from experts they trust. Thought leadership builds that trust before any sales conversation, and it tends to attract better-fit customers who already share your view of the problem.',
      'It also creates opportunities that ads cannot buy: invitations to speak, press mentions, partnerships and referrals. Over time it can make a business the default name people think of in its niche.',
    ],
    how: {
      heading: 'How to create thought leadership content',
      steps: [
        'Pick a narrow topic where you have real experience or data.',
        'Find a clear point of view, especially where you disagree with common advice.',
        'Back it with specific examples, stories or numbers from your own work.',
        'Publish consistently under a real person’s name on one or two channels.',
        'Join conversations: comment, reply and share others’ work, not only your own.',
      ],
    },
    example: {
      label: 'Example',
      body: 'The owner of a small accounting firm writes a weekly LinkedIn post on mistakes she sees in freelancers’ tax filings, each based on a real (anonymized) case. Over a year, other professionals start tagging her when the topic comes up.',
    },
    related: ['content-marketing', 'case-study', 'brand-awareness', 'employee-advocacy', 'storytelling'],
    faqs: [
      {
        question: 'What is an example of thought leadership?',
        answer: ['A founder sharing lessons from a failed product launch, an expert publishing original survey data, or a practitioner explaining why a popular method does not work for small teams. Each offers insight others do not.'],
      },
      {
        question: 'Is thought leadership only for big companies?',
        answer: ['No. Anyone with real experience in a niche can build it. Small, local and specialist businesses often have an advantage, because their knowledge is specific and hard to copy.'],
      },
    ],
  },
  {
    slug: 'newsjacking',
    term: 'Newsjacking',
    aka: ['trendjacking', 'reactive marketing'],
    category: 'content',
    short: 'Newsjacking is creating content that ties your brand to a breaking news story or trend while people are actively paying attention to it.',
    definition: [
      'Newsjacking is the practice of creating timely content that connects your brand to a breaking news story, trend or cultural moment while public attention is high. The idea is to join a conversation people are already having, with a relevant angle, so your content gets more reach than it would on an ordinary day. Speed and relevance matter most.',
      'The term was popularized by marketer David Meerman Scott in the early 2010s. On social media, the related term trendjacking covers jumping on viral memes, formats and [trending audio](/glossary/trending-audio) rather than news.',
      'Newsjacking carries risk. Jumping on tragedies, political events or stories you do not understand can look tone-deaf and damage trust. The safest newsjacking adds something useful or light, and only when the link to your business is genuine.',
    ],
    why: [
      'Timely content can travel further because people are actively searching and sharing on the topic. A small business with a smart, quick angle can get attention that would otherwise cost a lot in ads.',
      'It also shows a brand is current and human. Reacting to local news, weather or a big sporting event in a relevant way makes a business feel part of its community.',
    ],
    how: {
      heading: 'How to newsjack safely',
      steps: [
        'Watch news, trends and your industry daily so you spot moments early.',
        'Ask whether your business has a genuine, useful connection to the story.',
        'Skip tragedies, divisive politics and anything you would need to explain away.',
        'Move fast: post while the topic is rising, not after it has peaked.',
        'Keep it on-brand and check facts before posting.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A city announces a new network of protected bike lanes. That morning, a local bike shop posts a carousel: "New bike lanes open Monday: three checks before you ride them", with a small offer on safety checks for the first week.',
    },
    related: ['viral-video', 'trending-audio', 'brand-safety', 'social-listening', 'content-calendar'],
    faqs: [
      {
        question: 'What is an example of newsjacking?',
        answer: ['A gym posting a quick home workout on the morning a snowstorm closes roads, or a bakery making a cake shaped like the trophy on the day of a local team’s big win. Both tie a real moment to what the business does.'],
      },
      {
        question: 'Is newsjacking risky?',
        answer: ['It can be. Tying a brand to sensitive news, or getting facts wrong in the rush, can cause backlash. Stick to moments where your link is genuine and the tone fits.'],
      },
    ],
  },
];
