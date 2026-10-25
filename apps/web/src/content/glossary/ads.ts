import type { GlossaryTerm } from './types';

export const terms: GlossaryTerm[] = [
  {
    slug: 'paid-social',
    term: 'Paid social',
    aka: ['social media advertising', 'social ads', 'paid social media'],
    category: 'ads',
    short: 'Paid social is advertising on social platforms like Instagram, TikTok, Facebook and LinkedIn, where you pay to show posts to a chosen audience.',
    definition: [
      'Paid social is advertising on social media platforms, where a business pays to show its posts or videos to people it chooses. It includes Meta ads on Facebook and Instagram, TikTok ads, LinkedIn ads, YouTube ads and X ads. You set a budget, an audience and a goal, and the platform delivers the ad.',
      'Paid social sits next to organic social. Organic posts reach the people the [social media algorithm](/glossary/social-media-algorithm) decides to show them to, mostly your followers. Paid posts reach whoever you target and pay for, including people who have never heard of you. Many ads look like normal posts, with a small "Sponsored" label.',
      'Most platforms sell ads in an auction. You pick an objective (awareness, traffic, leads, sales), and you are charged by [CPM](/glossary/cpm), [CPC](/glossary/cpc) or per result. Targeting can use interests, demographics, your own customer lists, [retargeting](/glossary/retargeting) and [lookalike audiences](/glossary/lookalike-audience).',
    ],
    why: [
      'Organic reach on most platforms is limited, especially for new accounts. Paid social lets a small business put an offer in front of a precise audience the same day, test messages quickly and measure what each sale cost.',
      'It also gives fast feedback on creative. An ad that wins in paid tests often makes a strong organic post, and the reverse is true too, so the two channels feed each other.',
    ],
    how: {
      heading: 'How to start with paid social',
      steps: [
        'Pick one goal for the campaign, such as sales, leads or site visits, and one platform where your customers already spend time.',
        'Define the audience: location, age range, interests, or a customer list you upload.',
        'Make 3-5 pieces of [ad creative](/glossary/ad-creative) in the sizes the platform asks for, each with a clear hook and [call to action](/glossary/call-to-action).',
        'Set a small daily budget and let the campaign run for at least several days before judging it.',
        'Compare results by [CPA](/glossary/cpa) or [ROAS](/glossary/roas), pause the weak ads and put more budget behind the winners.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A yoga studio called Still Point runs an Instagram ad for a first-class-free offer, shown to people aged 25-45 within 5 miles. It spends $20 a day for a week, gets 31 sign-ups and keeps the two ads with the lowest cost per sign-up.',
    },
    openpromo: {
      body: 'OpenPromo makes the creative for paid social from your website: feed posts, stories, 1.91:1 ad banners, reels and promo videos in your brand fonts and colors. You run the ads in each platform\'s own ad manager.',
      href: '/features',
      label: 'See all OpenPromo tools',
    },
    related: ['ad-creative', 'cpm', 'roas', 'retargeting', 'social-media-marketing', 'organic-reach'],
    faqs: [
      {
        question: 'What is the difference between paid social and organic social?',
        answer: ['Organic social is what you post for free, shown mainly to followers. Paid social is posts you pay to show to an audience you choose, including people who do not follow you.'],
      },
      {
        question: 'How much should a small business spend on social media ads?',
        answer: ['There is no fixed rule. Many start with a small daily budget they can afford to lose while testing, then raise it only on ads that bring customers at a cost that leaves a profit.'],
      },
      {
        question: 'Which platform is best for paid social?',
        answer: ['The one your customers use. Meta (Facebook and Instagram) suits most local and consumer businesses, TikTok suits younger audiences and video, and LinkedIn suits B2B, usually at a higher cost per click.'],
      },
    ],
  },
  {
    slug: 'ad-creative',
    term: 'Ad creative',
    aka: ['performance creative', 'creative', 'ad assets'],
    category: 'ads',
    short: 'Ad creative is the visible part of an ad: the image, video, headline and text people actually see, as opposed to targeting and budget.',
    definition: [
      'Ad creative is the part of an advertisement that people actually see and hear: the image or video, the headline, the text and the call to action. In paid social, "creative" is everything except the settings behind the ad, such as targeting, bidding and budget. One campaign usually runs several creatives at once.',
      'Performance creative is ad creative made and judged by results such as [click-through rate](/glossary/click-through-rate), [CPA](/glossary/cpa) and [ROAS](/glossary/roas), rather than by looks alone. Teams that work this way make many variations, test them against each other and keep only what sells.',
      'Platforms now automate much of the targeting, so the creative does more of the work of finding the right people. A video that speaks clearly to busy parents tends to get shown to busy parents. That is why many marketers say creative is the biggest lever left in paid social.',
    ],
    why: [
      'Two ads with the same budget and audience can differ several times over in cost per sale, and the difference is usually the creative. A strong [hook](/glossary/hook), a clear offer and a visual that fits the platform decide whether people stop scrolling.',
      'Creative also wears out. Audiences get tired of seeing the same ad, so businesses that can produce fresh, on-brand variations quickly keep their costs lower for longer.',
    ],
    how: {
      heading: 'How to make ad creative that performs',
      steps: [
        'Lead with the problem or result your customer cares about, in the first second or the headline.',
        'Make it native to the platform: vertical video for Reels and TikTok, a clean square or 4:5 image for the feed.',
        'Show the product, the person using it or proof such as a review.',
        'Keep text short and readable on a phone, in your [brand colors](/glossary/brand-colors) and fonts.',
        'End with one clear [call to action](/glossary/call-to-action).',
        'Make several versions that change one thing (hook, image, offer) so you can learn which part works.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A bike shop called Spoke & Chain tests three creatives for a winter tune-up: a photo of a muddy bike with "Your bike after winter?", a 9:16 video of a mechanic at work, and a square image with the price in large type. Same audience, same budget; the video gets the most bookings.',
    },
    openpromo: {
      body: 'OpenPromo writes and renders ad creative from your brand profile: posts, stories, 1200×628 ad banners, reels and promo videos. Checks flag hype words, figures not on your site and a missing call to action before anything renders.',
      href: '/features/banner-maker',
      label: 'See the banner maker',
    },
    related: ['creative-testing', 'creative-fatigue', 'ad-copy', 'thumb-stopping', 'hook', 'dynamic-creative'],
    faqs: [
      {
        question: 'What does creative mean in advertising?',
        answer: ['It means the ad itself: the visuals, words and audio people see, as opposed to the targeting, budget and bidding settings.'],
      },
      {
        question: 'How many ad creatives should I run at once?',
        answer: ['Enough to compare, but not so many that each gets too little spend to judge. Three to six per ad set is a common starting point for a small budget.'],
      },
    ],
  },
  {
    slug: 'ad-copy',
    term: 'Ad copy',
    aka: ['advertising copy', 'ad text'],
    category: 'ads',
    short: 'Ad copy is the written text of an ad: the headline, primary text, description and call to action that persuade people to click or buy.',
    definition: [
      'Ad copy is the written part of an advertisement: the headline, the main text, any description line and the call-to-action button. On social platforms it sits above or below the image or video. Its job is to make the right person stop, understand the offer and take one action, usually a click.',
      'Ad copy is a branch of [copywriting](/glossary/copywriting) with tight limits. Platforms truncate long text behind a "See more" link, so the first line has to carry the message. Frameworks such as [AIDA](/glossary/aida) and [PAS](/glossary/pas-framework) help structure longer copy, while short copy often follows a simple problem, benefit, action pattern.',
      'Copy inside the image or video (on-screen text) counts too. Many viewers watch with the sound off, so a short line of text on screen often does more than the caption below it.',
    ],
    why: [
      'Copy decides whether the people who stop at your visual go on to click. Clear, specific copy that names a [pain point](/glossary/pain-points) and a result tends to bring cheaper clicks and better-qualified visitors than vague slogans.',
      'Copy is also the cheapest part of an ad to test. Changing a headline costs nothing to produce, and a better one can lower your [CPC](/glossary/cpc) across every creative that uses it.',
    ],
    how: {
      heading: 'How to write ad copy',
      steps: [
        'Write the first line as a hook: a problem, a result or a question your customer would recognize.',
        'Say what you offer in plain words, with one specific detail such as a price, a time or a feature.',
        'Add proof if you have it: a review, a customer count or a guarantee that is true.',
        'Close with one action, matching the button: "Book a class", "Shop the sale".',
        'Cut every word that does not help, then read it on a phone screen to check the truncation point.',
      ],
    },
    example: {
      label: 'Facebook ad copy',
      code: 'Primary text: Sourdough sold out by 10am again? Pre-order tonight and pick up warm at 8.\nHeadline: Fresh sourdough, held for you\nButton: Order now',
    },
    related: ['copywriting', 'headline', 'call-to-action', 'ad-creative', 'ab-testing', 'ai-copywriting'],
    faqs: [
      {
        question: 'How long should ad copy be?',
        answer: ['Short enough that the key message fits before the "See more" cut, often one or two lines. Longer copy can work for expensive or complex products, as long as the first line earns the click to expand.'],
      },
      {
        question: 'What makes good ad copy?',
        answer: ['It speaks to one audience, names a problem or desire they have, makes a specific offer and asks for one action. Specific beats clever.'],
      },
    ],
  },
  {
    slug: 'creative-fatigue',
    term: 'Creative fatigue',
    aka: ['ad fatigue', 'audience fatigue'],
    category: 'ads',
    short: 'Creative fatigue is when an ad stops performing because the audience has seen it too often, so clicks fall and costs per result rise.',
    definition: [
      'Creative fatigue, also called ad fatigue, is the drop in an ad\'s performance after the same audience has seen it many times. People start scrolling past it, so [click-through rate](/glossary/click-through-rate) falls, costs per click and per sale rise, and the platform may show it less. Every ad fatigues eventually; the question is how fast.',
      'Fatigue is closely tied to [ad frequency](/glossary/frequency), the average number of times each person has seen the ad. Small audiences and big budgets push frequency up quickly, so a [retargeting](/glossary/retargeting) campaign aimed at a few thousand site visitors can tire within days, while a broad campaign may run for weeks.',
      'Some fatigue comes from the creative itself and some from the offer. If a fresh image with the same message also fails, the audience may be tired of the offer, not the picture.',
    ],
    why: [
      'Fatigue quietly raises what you pay for each customer. A campaign that was profitable last month can lose money this month with no change in settings, simply because the same ads have been shown too often.',
      'Spotting it early and rotating in new creative keeps costs stable. That is why teams that run ads plan a steady supply of new variations rather than one big batch.',
    ],
    how: {
      heading: 'How to spot and fix ad fatigue',
      steps: [
        'Watch frequency, CTR and cost per result together over time, not just on one day.',
        'Treat rising frequency plus falling CTR and rising CPA as the classic sign of fatigue.',
        'Refresh the creative: a new hook, a new image or a new format, keeping what worked about the message.',
        'Widen the audience or cap frequency if the audience is small.',
        'Keep a queue of tested variations ready so you can swap ads before results slide far.',
      ],
    },
    openpromo: {
      body: 'OpenPromo can re-render a post in another format and make new variations from the same brand profile, and generated pieces are kept so you only pay for what is new.',
      href: '/features/instagram-post-generator',
      label: 'See the post generator',
    },
    related: ['frequency', 'creative-testing', 'ad-creative', 'click-through-rate', 'cpa', 'retargeting'],
    faqs: [
      {
        question: 'How do I know if my ad has creative fatigue?',
        answer: ['Look for frequency climbing while click-through rate drops and cost per result rises over a week or two. Comments like "I keep seeing this" are another sign.'],
      },
      {
        question: 'How often should I refresh ad creative?',
        answer: ['It depends on budget and audience size. Small audiences with high spend may need new creative every week or two; broad campaigns can run the same ads much longer. Let the numbers tell you.'],
      },
    ],
  },
  {
    slug: 'creative-testing',
    term: 'Creative testing',
    aka: ['ad creative testing', 'ad testing'],
    category: 'ads',
    short: 'Creative testing is running several versions of an ad against each other to learn which image, video, hook or copy brings results most cheaply.',
    definition: [
      'Creative testing is the practice of running several versions of an ad at the same time to find out which one performs best. Each version changes something, such as the hook, the image, the format or the offer, and you compare them on a metric like cost per sale. Winners get more budget; losers get paused.',
      'Creative testing can be a strict [A/B test](/glossary/ab-testing) that changes one element at a time, or a looser approach where many different concepts run together and the platform\'s delivery picks the strongest. Meta\'s [dynamic creative](/glossary/dynamic-creative) and similar features automate part of this by mixing headlines, images and text for you.',
      'Good tests separate concepts (the big idea, such as "save time" versus "save money") from executions (the colors, the opening shot). Testing concepts first tends to teach you more about your customers.',
    ],
    why: [
      'You cannot reliably guess which ad will win. Testing replaces opinion with data and finds the creative that brings customers at the lowest cost.',
      'The lessons carry over. A hook that wins in an ad test often works as a post caption, a landing page headline or the opening of a [promo video](/glossary/promo-video).',
    ],
    how: {
      heading: 'How to run a creative test',
      steps: [
        'Write a hypothesis: "A price in the headline will beat a benefit headline."',
        'Make 3-5 variations that differ in the element you are testing.',
        'Run them to the same audience with equal budgets, or use the platform\'s testing tool.',
        'Wait until each has enough spend and results to judge, not just a few clicks.',
        'Pick the winner on your main metric ([CPA](/glossary/cpa) or [ROAS](/glossary/roas)), then test the next element on top of it.',
      ],
    },
    openpromo: {
      body: 'OpenPromo can make several posts or banners from the same brand profile in different layouts and looks, which gives you variations to test without starting each from scratch.',
      href: '/features/instagram-post-generator',
      label: 'See the post generator',
    },
    related: ['ab-testing', 'dynamic-creative', 'ad-creative', 'creative-fatigue', 'hook', 'cpa'],
    faqs: [
      {
        question: 'How long should a creative test run?',
        answer: ['Long enough for each version to get meaningful spend and results, often at least several days to a week. Ending a test after a handful of clicks usually picks a winner by luck.'],
      },
      {
        question: 'What should I test first in an ad?',
        answer: ['Start with the biggest differences: the concept or the hook. Small changes like button color matter far less than what the ad says in its first second.'],
      },
    ],
  },
  {
    slug: 'ab-testing',
    term: 'A/B testing',
    aka: ['split testing', 'A/B test', 'split test'],
    category: 'ads',
    short: 'A/B testing compares two versions of an ad, page or post that differ in one thing, to see which performs better on a chosen metric.',
    definition: [
      'A/B testing, also called split testing, is a method of comparing two versions of something, such as an ad, an email or a [landing page](/glossary/landing-page), that differ in one element. The audience is split at random, each half sees one version, and you measure which gets more clicks, sign-ups or sales.',
      'Changing only one element is what makes an A/B test useful: if version B wins, you know why. Tests with more than two versions are sometimes called A/B/n tests, and tests that change several elements at once in combinations are multivariate tests, which need much more traffic.',
      'Results need enough data to be trusted. A version that leads after 20 clicks may lose after 2,000. Most ad platforms and testing tools report a confidence level or a "winner" once the difference is unlikely to be chance.',
    ],
    why: [
      'A/B testing turns marketing guesses into evidence. Over time, small proven improvements to headlines, images and offers add up to a lower [CPA](/glossary/cpa) and a higher [conversion rate](/glossary/conversion-rate).',
      'It also settles debates inside a team. Instead of arguing over which headline is better, you run both and let customers decide.',
    ],
    how: {
      heading: 'How to run an A/B test',
      steps: [
        'Choose one metric that matters, such as cost per purchase or sign-up rate.',
        'Pick one element to change: the headline, the image, the offer or the call to action.',
        'Split the audience randomly so each version reaches similar people at the same time.',
        'Run the test until you have enough results for the difference to be reliable.',
        'Keep the winner, record what you learned, and test the next element.',
      ],
    },
    example: {
      label: 'Example',
      body: 'Crumb & Co, a bakery, tests two Instagram ad headlines with the same photo: "Fresh sourdough every morning" versus "Pre-order sourdough, skip the line". After a week, the second gets noticeably more orders at a lower cost per order, so it becomes the new control.',
    },
    related: ['creative-testing', 'conversion-rate', 'click-through-rate', 'ad-copy', 'landing-page', 'dynamic-creative'],
    faqs: [
      {
        question: 'What is the difference between A/B testing and split testing?',
        answer: ['They usually mean the same thing. Some people use "split testing" for comparing two whole different pages or campaigns, and "A/B testing" for changing one element, but most use them interchangeably.'],
      },
      {
        question: 'How much traffic do I need for an A/B test?',
        answer: ['Enough for each version to collect a meaningful number of conversions, not just views. The smaller the difference between versions, the more data you need to tell them apart.'],
      },
    ],
  },
  {
    slug: 'dynamic-creative',
    term: 'Dynamic creative',
    aka: ['dynamic creative optimization', 'DCO', 'flexible creative'],
    category: 'ads',
    short: 'Dynamic creative is an ad feature that mixes your images, videos, headlines and text into combinations and shows each person the ones likely to work.',
    definition: [
      'Dynamic creative is an ad platform feature that takes several images or videos, headlines, text options and calls to action, and automatically combines them into many ad versions. The platform then shows each person the combination it predicts will perform best for them. Meta, Google and other networks offer versions of it.',
      'In display advertising, dynamic creative optimization (DCO) goes further and builds the ad in real time from a template and a data feed, for example showing the exact product someone viewed. On social platforms the term usually means the simpler mix-and-match approach. Meta has folded much of it into its "flexible" and Advantage+ creative options, and names change often.',
      'Dynamic creative is not a strict [A/B test](/glossary/ab-testing). Because delivery is optimized, it tells you which combinations got results, but not cleanly why one element beat another.',
    ],
    why: [
      'It lets a small team test many combinations without building each ad by hand, and it helps delay [creative fatigue](/glossary/creative-fatigue) because people see more variety.',
      'It still depends on the inputs. Weak images and vague headlines combined a hundred ways are still weak, so the quality of the assets you upload matters most.',
    ],
    how: {
      heading: 'How to use dynamic creative',
      steps: [
        'Prepare several distinct images or videos in the sizes the platform needs.',
        'Write 3-5 headlines and primary texts that each make sense with any of the visuals.',
        'Turn on the dynamic or flexible creative option at the ad level.',
        'Let it run, then check the asset breakdown to see which pieces got the most delivery and results.',
        'Use the winning elements as the base for your next round of creative.',
      ],
    },
    related: ['creative-testing', 'ab-testing', 'ad-creative', 'paid-social', 'creative-fatigue'],
    faqs: [
      {
        question: 'Is dynamic creative better than manual ads?',
        answer: ['Not always. It saves time and finds good combinations, but manual ads give you cleaner tests and full control over which message each person sees.'],
      },
      {
        question: 'What is DCO in advertising?',
        answer: ['Dynamic creative optimization: ads assembled automatically from templates and data, so each viewer can see a different version, such as products they looked at.'],
      },
    ],
  },
  {
    slug: 'ugc-ads',
    term: 'UGC ads',
    aka: ['UGC-style ads', 'creator ads', 'user-generated content ads'],
    category: 'ads',
    short: 'UGC ads are paid ads that use user-generated content, or content made to look like it: real customers or creators talking about a product on camera.',
    definition: [
      'UGC ads are paid social ads built from [user-generated content](/glossary/user-generated-content): photos, reviews or videos made by customers or creators rather than by the brand. Many are vertical selfie-style videos of a person showing and talking about a product. Brands also hire creators to make "UGC-style" content for ads.',
      'UGC ads work because they look like the posts around them. A handheld video of a real person reads as a recommendation, not a commercial, which suits feeds like TikTok and Instagram Reels. On TikTok, brands can run creators\' own posts as ads through [Spark Ads](/glossary/spark-ads).',
      'Using someone\'s content in an ad needs their permission, and usually a written license that covers paid use, platforms and duration. Paid creators must disclose the partnership where platform rules and advertising law require it.',
    ],
    why: [
      'UGC ads add [social proof](/glossary/social-proof) to paid reach. People trust other customers more than brands, so a genuine review on video can outperform a polished studio ad for the same product.',
      'They are also relatively cheap to produce in volume, which helps with testing and with replacing tired creative.',
    ],
    how: {
      heading: 'How to make UGC ads',
      steps: [
        'Collect content from happy customers, or brief creators who match your audience.',
        'Ask for a strong first line: a problem, a surprising result or a reaction.',
        'Get written permission for paid use on the platforms and for the period you need.',
        'Add [open captions](/glossary/open-captions) and a clear call to action in the edit.',
        'Test several creators and hooks against each other, and keep the best performers running.',
      ],
    },
    related: ['user-generated-content', 'spark-ads', 'influencer-marketing', 'social-proof', 'testimonial-video', 'ad-creative'],
    faqs: [
      {
        question: 'Do I need permission to use customer content in ads?',
        answer: ['Yes. Get explicit permission, ideally in writing, that covers paid advertising. Reposting organically with credit is different from putting someone\'s face in a paid ad.'],
      },
      {
        question: 'What is a UGC creator?',
        answer: ['A person paid to make content in the style of a customer review, for the brand to use in its own ads and posts. Unlike an influencer, they may not post it on their own account at all.'],
      },
    ],
  },
  {
    slug: 'spark-ads',
    term: 'Spark Ads',
    aka: ['TikTok Spark Ads'],
    category: 'ads',
    short: 'Spark Ads are TikTok ads that promote existing organic TikTok posts, from your account or a creator\'s, keeping their likes, comments and profile link.',
    definition: [
      'Spark Ads are a TikTok ad format that turns existing organic TikTok videos into ads. The post can come from your own account or from a creator who gives you an authorization code. The ad keeps the original poster\'s handle, likes, comments and shares, and engagement on the ad counts toward the original post.',
      'Normal TikTok in-feed ads are uploaded to the ad manager and run under the advertiser\'s name. Spark Ads instead boost a real post, so they look and behave like any other video in the For You feed. Viewers can tap through to the creator\'s profile, follow them or watch more of their videos.',
      'Creators control access. They generate a code in the app for a set period, and the brand enters it in TikTok Ads Manager. TikTok updates these steps and options from time to time.',
    ],
    why: [
      'Spark Ads let a brand put money behind content that already works organically, with the social proof of real comments intact. They suit [UGC ads](/glossary/ugc-ads) and creator partnerships in particular.',
      'Because engagement lands on the original post, a Spark Ad from your own account can also grow followers, not just clicks.',
    ],
    how: {
      heading: 'How to run TikTok Spark Ads',
      steps: [
        'Pick an organic post that already has good watch time or comments, yours or a creator\'s.',
        'If it is a creator\'s post, ask them to generate an ad authorization code for the period you need.',
        'In TikTok Ads Manager, create an ad and choose to use an existing TikTok post.',
        'Add a call-to-action button and destination link.',
        'Monitor results and comments, and renew or replace the code when it expires.',
      ],
    },
    related: ['ugc-ads', 'paid-social', 'influencer-marketing', 'short-form-video', 'social-proof'],
    faqs: [
      {
        question: 'What is the difference between Spark Ads and regular TikTok ads?',
        answer: ['Regular in-feed ads are uploaded videos run under the advertiser\'s name. Spark Ads boost a real organic post, keeping its handle, likes and comments, and engagement adds to that post.'],
      },
      {
        question: 'How do I get a Spark Ads code?',
        answer: ['The account that posted the video generates it in the TikTok app, in the post\'s ad settings, and shares it with the advertiser. The exact menu path changes as TikTok updates the app.'],
      },
    ],
  },
  {
    slug: 'cpm',
    term: 'CPM (cost per mille)',
    aka: ['cost per thousand impressions', 'cost per mille', 'CPM'],
    category: 'ads',
    short: 'CPM, or cost per mille, is what an advertiser pays for 1,000 ad impressions. It is the standard way to compare the price of reach across platforms.',
    definition: [
      'CPM, or cost per mille, is the price an advertiser pays for 1,000 [impressions](/glossary/impressions) of an ad. "Mille" is Latin for thousand. It is calculated as total spend divided by impressions, times 1,000. If you spend $50 and your ad is shown 10,000 times, your CPM is $5.',
      'Some campaigns are billed by CPM, especially awareness and [reach](/glossary/reach) campaigns. Even when you pay per click or per result, CPM is still reported, because it shows how expensive it was to get in front of your audience.',
      'CPM varies with the platform, the audience, the season and the ad\'s quality. Narrow or high-value audiences cost more, and prices usually climb around big shopping periods in the fourth quarter. Platforms also reward ads people engage with, so better creative can lower CPM.',
    ],
    why: [
      'CPM is the first link in the chain that ends in cost per sale. If CPM rises and nothing else changes, every customer costs more. Watching it helps you tell whether a campaign got worse because of the auction or because of your ad.',
      'It is also the fairest way to compare the cost of attention between platforms and audiences before looking at clicks and sales.',
    ],
    how: {
      heading: 'How to calculate CPM',
      body: [
        'Divide total ad spend by the number of impressions, then multiply by 1,000. To lower CPM, broaden the audience, improve the creative so people engage, avoid the most competitive dates if you can, and test placements.',
      ],
    },
    example: {
      label: 'CPM formula',
      code: 'CPM = (ad spend / impressions) × 1,000\n\n$120 spend / 30,000 impressions × 1,000 = $4.00 CPM',
    },
    related: ['cpc', 'cpa', 'impressions', 'reach', 'roas', 'paid-social'],
    faqs: [
      {
        question: 'What does CPM stand for?',
        answer: ['Cost per mille, meaning cost per thousand impressions. "Mille" is Latin for thousand.'],
      },
      {
        question: 'What is a good CPM?',
        answer: ['It depends on the platform, country, audience and time of year, so there is no single number. Compare your CPM against your own past campaigns and judge it alongside CPC and CPA, not alone.'],
      },
      {
        question: 'Is a low CPM always better?',
        answer: ['No. Cheap impressions to the wrong people are wasted. A higher CPM to a well-matched audience can still give a lower cost per sale.'],
      },
    ],
  },
  {
    slug: 'cpc',
    term: 'CPC (cost per click)',
    aka: ['cost per click', 'CPC', 'pay per click'],
    category: 'ads',
    short: 'CPC, or cost per click, is what you pay on average each time someone clicks your ad. It equals ad spend divided by the number of clicks.',
    definition: [
      'CPC, or cost per click, is the average amount an advertiser pays each time someone clicks an ad. It is calculated as total ad spend divided by the number of clicks. If you spend $100 and get 250 clicks, your CPC is $0.40. It is used in search, social and display advertising.',
      'CPC can be a billing model (you are charged only when someone clicks, often called pay per click or PPC) or just a reported metric on campaigns billed by impressions. Either way, it connects two other numbers: [CPM](/glossary/cpm) and [click-through rate](/glossary/click-through-rate). A cheaper audience or a more clickable ad lowers CPC.',
      'On social platforms, check which clicks are counted. "Link clicks" go to your site; "all clicks" also include likes, profile taps and expanding the text, which makes CPC look lower than it really is.',
    ],
    why: [
      'CPC tells you what a visit to your site or offer costs. Combined with your [conversion rate](/glossary/conversion-rate), it gives you cost per customer, which decides whether a campaign is profitable.',
      'A rising CPC is often an early sign of [creative fatigue](/glossary/creative-fatigue) or a crowded auction, before sales drop.',
    ],
    how: {
      heading: 'How to calculate and lower CPC',
      steps: [
        'Divide ad spend by link clicks (not all clicks) to get a true CPC.',
        'Improve click-through rate with a sharper hook, clearer offer and stronger call to action.',
        'Test broader or different audiences if CPM is the problem.',
        'Refresh tired creative when CPC climbs over time.',
        'Judge CPC alongside conversion rate: a cheap click that never buys is not a bargain.',
      ],
    },
    example: {
      label: 'CPC formula',
      code: 'CPC = ad spend / clicks\n\n$90 spend / 300 link clicks = $0.30 CPC',
    },
    related: ['cpm', 'cpa', 'click-through-rate', 'conversion-rate', 'roas', 'ad-copy'],
    faqs: [
      {
        question: 'What is the difference between CPC and CPM?',
        answer: ['CPC is the cost of one click; CPM is the cost of 1,000 impressions. CPC equals CPM divided by (CTR × 1,000), so a better click-through rate turns the same CPM into a cheaper click.'],
      },
      {
        question: 'What is a good cost per click?',
        answer: ['One that leaves a profit after your conversion rate and margin. Benchmarks vary widely by platform and industry; B2B audiences on LinkedIn usually cost far more per click than consumer audiences on Meta.'],
      },
    ],
  },
  {
    slug: 'cpa',
    term: 'CPA (cost per acquisition)',
    aka: ['cost per action', 'cost per acquisition', 'cost per result', 'CPA'],
    category: 'ads',
    short: 'CPA, or cost per acquisition, is what you pay in ads for each conversion, such as a sale, sign-up or lead. It equals spend divided by conversions.',
    definition: [
      'CPA, or cost per acquisition, is the average ad spend it takes to get one conversion, such as a purchase, a sign-up or a lead. It is calculated as total spend divided by the number of conversions. If $300 of ads brings 15 orders, your CPA is $20. It is also called cost per action or cost per result.',
      'What counts as the "acquisition" is up to you: a first purchase, a free trial, a booked call, an app install. Name it clearly, because a $5 cost per email sign-up and a $5 cost per sale are very different results.',
      'CPA sits at the end of a chain: [CPM](/glossary/cpm) sets the cost of reach, [click-through rate](/glossary/click-through-rate) turns that into [CPC](/glossary/cpc), and your [conversion rate](/glossary/conversion-rate) turns clicks into customers. Improving any link lowers CPA.',
    ],
    why: [
      'CPA is the number that tells you whether advertising makes money. If a customer is worth $60 in profit and your CPA is $20, you can scale. If CPA is $70, every sale loses money unless customers come back to buy again.',
      'It also lets you compare channels and creatives on the same basis, regardless of how they are billed.',
    ],
    how: {
      heading: 'How to calculate CPA',
      body: [
        'Divide ad spend by conversions over the same period. Set a target CPA from your numbers: the most you can pay for a customer and still profit, based on margin and how often customers buy again. Then pause ads and audiences that sit above the target and move budget to those below it.',
      ],
    },
    example: {
      label: 'CPA formula',
      code: 'CPA = ad spend / conversions\n\n$450 spend / 18 class bookings = $25 CPA',
    },
    related: ['roas', 'cpc', 'cpm', 'conversion-rate', 'ab-testing', 'landing-page'],
    faqs: [
      {
        question: 'What is the difference between CPA and CAC?',
        answer: ['CPA usually counts only ad spend per conversion in a campaign. Customer acquisition cost (CAC) usually includes all sales and marketing costs per new customer, such as salaries and tools, so it is higher.'],
      },
      {
        question: 'What is a good CPA?',
        answer: ['Any CPA below what a customer is worth to you in profit. Work it out from your margin and repeat purchase rate rather than from industry averages.'],
      },
    ],
  },
  {
    slug: 'roas',
    term: 'ROAS (return on ad spend)',
    aka: ['return on ad spend', 'ROAS'],
    category: 'ads',
    short: 'ROAS, or return on ad spend, is the revenue earned for each dollar spent on ads. A ROAS of 4 means $4 in sales for every $1 of ad spend.',
    definition: [
      'ROAS, or return on ad spend, measures how much revenue an ad campaign brings in for every dollar spent on it. It is calculated as revenue from ads divided by ad spend. If $500 of ads produces $2,000 in sales, ROAS is 4, often written as 4x or 400%. It is a core metric for ecommerce advertising.',
      'ROAS uses revenue, not profit. A ROAS of 3 can be very profitable for a product with high margins and a loss for one with thin margins. The ROAS where you break even is 1 divided by your profit margin: with a 25% margin, you need a ROAS of 4 just to cover the ads.',
      'Reported ROAS depends on attribution: which sales the platform credits to the ad and over what window. Platforms tend to count generously, so many businesses also track blended ROAS (total revenue divided by total ad spend) to sanity-check.',
    ],
    why: [
      'ROAS tells you whether advertising pays for itself and which campaigns deserve more budget. It is the simplest way to compare channels that bill in different ways.',
      'Knowing your break-even ROAS stops you scaling campaigns that look busy but lose money on every order.',
    ],
    how: {
      heading: 'How to calculate ROAS',
      steps: [
        'Add up the revenue attributed to the campaign over a period.',
        'Divide it by the ad spend for the same period.',
        'Work out break-even ROAS as 1 / profit margin (as a decimal).',
        'Compare: above break-even is profitable on the first order; below it needs repeat purchases to pay off.',
        'Check platform ROAS against blended ROAS from your own sales data.',
      ],
    },
    example: {
      label: 'ROAS formula',
      code: 'ROAS = revenue from ads / ad spend\n\n$3,600 revenue / $900 spend = 4.0 ROAS\nBreak-even ROAS at a 30% margin = 1 / 0.30 = 3.33',
    },
    related: ['cpa', 'cpc', 'cpm', 'conversion-rate', 'paid-social', 'retargeting'],
    faqs: [
      {
        question: 'What is a good ROAS?',
        answer: ['A ROAS above your break-even point, which depends on your margin. Many ecommerce businesses aim for 3 to 4 or more, but a high-margin product can be profitable at a lower ROAS.'],
      },
      {
        question: 'What is the difference between ROAS and ROI?',
        answer: ['ROAS compares revenue to ad spend only. ROI compares profit to the total investment, including product costs, fees and other expenses, so it shows true profitability.'],
      },
    ],
  },
  {
    slug: 'frequency',
    term: 'Ad frequency',
    aka: ['frequency', 'frequency cap'],
    category: 'ads',
    short: 'Ad frequency is the average number of times each person in your audience has seen your ad. It equals impressions divided by reach.',
    definition: [
      'Ad frequency is the average number of times each person who saw an ad has seen it over a period. It is calculated as [impressions](/glossary/impressions) divided by [reach](/glossary/reach). If an ad got 30,000 impressions across 10,000 people, its frequency is 3. Ad platforms report it for every campaign, ad set and ad.',
      'Frequency is an average, so it hides a spread: some people may have seen the ad once and others ten times. It rises fastest when the audience is small and the budget is large, as in [retargeting](/glossary/retargeting) campaigns.',
      'A frequency cap is a limit you set on how often one person can see an ad in a given time. Some campaign types, such as reach campaigns, let you set one directly; others manage frequency automatically.',
    ],
    why: [
      'People rarely act the first time they see an ad, so some repetition helps memory and [brand awareness](/glossary/brand-awareness). Too much repetition causes [creative fatigue](/glossary/creative-fatigue): results drop, costs rise and people may hide the ad or comment negatively.',
      'Watching frequency next to click-through rate tells you when to refresh creative or widen your audience before money is wasted.',
    ],
    how: {
      heading: 'How to manage ad frequency',
      steps: [
        'Calculate it as impressions divided by reach, for the same date range.',
        'Track it over time alongside CTR and cost per result.',
        'If frequency climbs while CTR falls, rotate in new creative.',
        'For small audiences, lower the budget, widen the audience or set a frequency cap where available.',
        'Accept higher frequency for warm audiences such as recent site visitors, who expect to see you again.',
      ],
    },
    example: {
      label: 'Frequency formula',
      code: 'Frequency = impressions / reach\n\n48,000 impressions / 12,000 people = 4.0',
    },
    related: ['creative-fatigue', 'impressions', 'reach', 'retargeting', 'cpm'],
    faqs: [
      {
        question: 'What is a good ad frequency?',
        answer: ['There is no universal number. Cold audiences often tire sooner than warm ones. Instead of a fixed target, watch for the point where more frequency stops bringing results and starts raising costs.'],
      },
      {
        question: 'What is the difference between reach and frequency?',
        answer: ['Reach is how many different people saw the ad. Frequency is how many times, on average, each of them saw it.'],
      },
    ],
  },
  {
    slug: 'retargeting',
    term: 'Retargeting',
    aka: ['remarketing', 'retargeting ads'],
    category: 'ads',
    short: 'Retargeting shows ads to people who already interacted with your business, such as site visitors or video viewers, to bring them back to buy.',
    definition: [
      'Retargeting is showing ads to people who have already interacted with your business, such as visiting your website, adding a product to the cart, watching a video or engaging with your profile. Because these people already know you, retargeting ads usually convert better and cost less per sale than ads to strangers. It is also called remarketing.',
      'Retargeting relies on tracking: a pixel or tag on your site, an app SDK, engagement data inside the platform, or a customer list you upload. Privacy changes, such as Apple\'s App Tracking Transparency and browser limits on third-party cookies, have made website audiences smaller and less precise, so platform engagement audiences matter more than they used to.',
      'Some people draw a line between the terms: retargeting for ads based on site or app behavior, remarketing for email to past customers. In practice most marketers use them interchangeably.',
    ],
    why: [
      'Most people do not buy on their first visit. Retargeting reminds them, answers objections and offers a reason to come back, often at a much lower [CPA](/glossary/cpa) than prospecting.',
      'It also lets you match the message to where someone is in the [customer journey](/glossary/customer-journey): a product reminder for cart abandoners, a [testimonial](/glossary/testimonial) for people who watched a demo.',
    ],
    how: {
      heading: 'How to set up retargeting',
      steps: [
        'Install the platform\'s pixel or tag on your site, or connect your store, and check that events fire.',
        'Build audiences by behavior: all visitors, product viewers, cart abandoners, video viewers.',
        'Write creative for each stage, such as a reminder, proof or a limited offer.',
        'Exclude people who already bought, so you do not pay to show them the same product.',
        'Keep an eye on [frequency](/glossary/frequency), since small audiences tire quickly.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A bike shop shows people who viewed its e-bike page in the last 14 days a short video of a test ride with "Book a free test ride this weekend". People who already booked are excluded.',
    },
    related: ['lookalike-audience', 'frequency', 'customer-journey', 'cpa', 'display-ad', 'paid-social'],
    faqs: [
      {
        question: 'What is the difference between retargeting and remarketing?',
        answer: ['Usually nothing; the words are used interchangeably. Some people use remarketing for email to past customers and retargeting for ads to past visitors.'],
      },
      {
        question: 'Does retargeting still work without cookies?',
        answer: ['Yes, with smaller audiences. Server-side tracking, first-party customer lists and audiences built from engagement inside the platform (video views, profile visits) still work.'],
      },
    ],
  },
  {
    slug: 'lookalike-audience',
    term: 'Lookalike audience',
    aka: ['lookalikes', 'similar audience'],
    category: 'ads',
    short: 'A lookalike audience is a group of new people an ad platform finds because they resemble a source audience you provide, such as your customers.',
    definition: [
      'A lookalike audience is a group of new people that an ad platform builds because they share traits with a source audience you supply, such as your customer list, site visitors or top video viewers. Meta made the term popular; TikTok, LinkedIn and others offer similar tools. You pick the source and the country.',
      'On Meta you also choose a size, from 1% (the closest match in a country) to 10% (broader, less similar). The platform uses its own data to find matches, so you never see who is in the audience.',
      'As platforms have moved toward broad, automated targeting, lookalikes matter less than they used to. Broad targeting with good creative often performs as well, and Meta may expand a lookalike beyond the size you set. Still, a strong source list remains a useful signal.',
    ],
    why: [
      'Lookalikes help you find new customers who resemble the ones you already have, instead of guessing at interests. For a small business with a few hundred good customers, that can be a quicker path to profitable prospecting.',
      'The quality of the source decides the quality of the lookalike. A list of your best repeat buyers usually beats a list of everyone who ever clicked.',
    ],
    how: {
      heading: 'How to create a lookalike audience',
      steps: [
        'Choose a source: your best customers, purchasers in the last 180 days or engaged video viewers.',
        'Upload or select it in the ad manager as a custom audience (respect privacy law and platform terms).',
        'Create a lookalike from it, choosing the country and size.',
        'Run it against broad targeting with the same creative to see which performs better.',
        'Refresh the source list every few months.',
      ],
    },
    related: ['retargeting', 'target-audience', 'ideal-customer-profile', 'paid-social', 'buyer-persona'],
    faqs: [
      {
        question: 'What size lookalike audience should I use?',
        answer: ['Smaller percentages are closer matches but limit reach; larger ones reach more people with a weaker match. Testing a 1% lookalike against a broader one is a common starting point.'],
      },
      {
        question: 'How big does the source audience need to be?',
        answer: ['Meta requires at least 100 people from one country, but a source of 1,000 or more of your best customers usually gives a better result.'],
      },
    ],
  },
  {
    slug: 'banner-ad',
    term: 'Banner ad',
    aka: ['web banner', 'banner advertising'],
    category: 'ads',
    short: 'A banner ad is a rectangular image or animated ad shown on websites and apps, in standard sizes like 300×250, 728×90 and 320×50.',
    definition: [
      'A banner ad is a rectangular advertisement, usually an image or short animation, placed on websites and in apps. Clicking it takes the viewer to the advertiser\'s site. Banner ads are the oldest form of [display advertising](/glossary/display-ad) and come in standard sizes, so one design can run across thousands of sites through ad networks.',
      'The common sizes come from the IAB (Interactive Advertising Bureau): 300×250 (medium rectangle), 728×90 (leaderboard), 160×600 (wide skyscraper), 300×600 (half page), 320×50 (mobile leaderboard) and 970×250 (billboard). Google Display Network and other networks also accept responsive ads that adapt to the space.',
      'In social media, "banner" often means something else: a wide image such as a [LinkedIn banner](/glossary/linkedin-banner-size), an [X header](/glossary/twitter-header-size) or a 1.91:1 link ad.',
    ],
    why: [
      'Banner ads are cheap per impression and reach people across the web, which makes them useful for [retargeting](/glossary/retargeting) and for awareness. Click-through rates are low, so they work best with a clear offer and a recognizable brand.',
      'Because space is tiny, banners force clarity: one message, one image, one action. That discipline helps all your ad creative.',
    ],
    how: {
      heading: 'How to design a banner ad',
      steps: [
        'Make the main sizes first: 300×250, 728×90 and 320×50 cover a large share of inventory.',
        'Put the logo, one short headline and a button-style call to action in every size.',
        'Use high contrast and large text so it reads at small sizes.',
        'Keep files small (networks set limits, often around 150 KB for static banners).',
        'Make the landing page match the banner\'s message and offer.',
      ],
    },
    openpromo: {
      body: 'OpenPromo\'s banner maker renders 1200×628 link and ad banners, X headers and LinkedIn banners from your brand profile. It does not make IAB display sizes like 300×250.',
      href: '/features/banner-maker',
      label: 'See the banner maker',
    },
    related: ['display-ad', 'social-media-image-sizes', 'ad-creative', 'click-through-rate', 'retargeting'],
    faqs: [
      {
        question: 'What is the most common banner ad size?',
        answer: ['The 300×250 medium rectangle is the most widely used, followed by the 728×90 leaderboard on desktop and the 320×50 mobile leaderboard.'],
      },
      {
        question: 'Do banner ads still work?',
        answer: ['They work for cheap reach and retargeting, but click-through rates are low. Judge them on conversions and cost per result, not clicks alone.'],
      },
    ],
  },
  {
    slug: 'display-ad',
    term: 'Display ad',
    aka: ['display advertising', 'display ads'],
    category: 'ads',
    short: 'A display ad is a visual ad (image, animation or video) shown on websites, apps and video platforms, as opposed to text ads in search results.',
    definition: [
      'A display ad is a visual advertisement, such as an image, animation or video, shown on websites, apps and video platforms rather than in search results. Display ads are usually bought through networks like the Google Display Network or programmatic exchanges, which place them across many publishers and charge by impression or click.',
      'Display covers several formats: [banner ads](/glossary/banner-ad) in fixed sizes, responsive ads that the network assembles from your images and headlines, native ads styled to look like the surrounding content, and video ads. Social feed ads are technically display too, but marketers usually treat paid social as its own channel.',
      'Display is mostly an interruption: people did not search for you. That makes it better for awareness and [retargeting](/glossary/retargeting) than for capturing ready-to-buy demand, which search ads do better.',
    ],
    why: [
      'Display ads reach large audiences at low [CPM](/glossary/cpm) and keep your brand in front of people who visited your site but did not buy.',
      'They also bring risks: ads can appear next to content you would not choose, so [brand safety](/glossary/brand-safety) settings and placement exclusions matter.',
    ],
    how: {
      heading: 'How to run display ads',
      steps: [
        'Decide the job: awareness, retargeting or prospecting.',
        'Prepare images in the standard sizes plus square and landscape assets for responsive ads.',
        'Write short headlines and descriptions the network can mix.',
        'Set placement exclusions and brand safety controls.',
        'Measure by conversions and view-through results, not just clicks.',
      ],
    },
    related: ['banner-ad', 'retargeting', 'cpm', 'brand-safety', 'paid-social'],
    faqs: [
      {
        question: 'What is the difference between display ads and search ads?',
        answer: ['Search ads are text ads shown to people searching for something. Display ads are visual ads shown while people browse sites and apps, whether or not they were looking for you.'],
      },
      {
        question: 'Are social media ads display ads?',
        answer: ['Technically they are visual ads, but most marketers call them paid social and manage them separately from display networks.'],
      },
    ],
  },
  {
    slug: 'thumb-stopping',
    term: 'Thumb-stopping content',
    aka: ['scroll-stopping', 'thumb-stopping', 'scroll-stopping content'],
    category: 'ads',
    short: 'Thumb-stopping content is a post or ad that makes people stop scrolling on their phone, usually through a striking first frame or hook.',
    definition: [
      'Thumb-stopping content is a post, image or video that makes people stop scrolling through their feed. The phrase comes from mobile users flicking past posts with their thumb. It usually depends on the first frame or first second: a bold visual, a surprising line, a face, motion or a question that creates curiosity.',
      'Being thumb-stopping is only the first step. Content that stops people but does not deliver on its promise gets skipped a second later, which hurts [audience retention](/glossary/audience-retention) and tells the algorithm the post is weak. The best examples stop the right people and keep them.',
      'Common techniques include a strong [hook](/glossary/hook), a [pattern interrupt](/glossary/pattern-interrupt), high contrast colors, big readable text, a person looking at the camera and a result shown before the explanation.',
    ],
    why: [
      'Feeds move fast. If a post does not stop someone in about a second, nothing else in it matters, however good the offer. Thumb-stopping creative lowers [CPM](/glossary/cpm) and CPC in ads and raises reach organically.',
      'It also forces you to lead with what matters most to the customer, which improves the whole message.',
    ],
    how: {
      heading: 'How to make thumb-stopping content',
      steps: [
        'Put the most interesting thing in the first frame or the first second.',
        'Use large text, strong contrast and a clear focal point that reads on a small screen.',
        'Open with a question, a bold claim you can back up, or the end result.',
        'Use motion, a face or an unexpected visual to break the pattern of the feed.',
        'Check the opening with the sound off, since many people scroll muted.',
      ],
    },
    openpromo: {
      body: 'OpenPromo reels open with a hook in the first two seconds, and its checks flag a missing hook before anything renders.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['hook', 'pattern-interrupt', 'ad-creative', 'audience-retention', 'short-form-video'],
    faqs: [
      {
        question: 'What makes content scroll-stopping?',
        answer: ['A first frame or line that is clearly different from the posts around it and speaks to something the viewer cares about: a problem, a result, a face, motion or a surprising fact.'],
      },
      {
        question: 'Is thumb-stopping the same as clickbait?',
        answer: ['No. Clickbait promises something the content does not deliver. Thumb-stopping content earns the stop and then keeps the promise.'],
      },
    ],
  },
  {
    slug: 'pattern-interrupt',
    term: 'Pattern interrupt',
    aka: ['pattern interruption'],
    category: 'ads',
    short: 'A pattern interrupt is anything unexpected in a video, ad or post that breaks the viewer\'s autopilot and wins their attention back.',
    definition: [
      'A pattern interrupt is a deliberate break from what the viewer expects, used to grab or regain attention. In marketing videos and ads it can be a sudden sound, an odd visual, a quick cut, a change of angle or a surprising line. The idea comes from psychology, where interrupting a habit makes people briefly pay closer attention.',
      'In social media, the "pattern" is the feed itself: similar posts flowing past. A pattern interrupt at the start of a video stops the scroll. Inside a video, regular small interrupts (a [jump cut](/glossary/jump-cut), on-screen text, a zoom, a new shot every few seconds) keep people watching.',
      'Interrupts need to serve the message. A random loud noise may stop people, but if it has nothing to do with the product it can annoy them and teach them nothing.',
    ],
    why: [
      'Attention drops fast in short videos. Pattern interrupts help keep viewers past the first few seconds, which improves [watch time](/glossary/watch-time) and makes platforms show the video to more people.',
      'In ads, a well-chosen interrupt can make the creative memorable, so people recognize the brand next time.',
    ],
    how: {
      heading: 'How to use a pattern interrupt in a video',
      steps: [
        'Open with something unexpected: an odd angle, a bold line of text or the end result first.',
        'Change something every few seconds: a cut, zoom, new scene or text overlay.',
        'Use sound changes, such as a pause or a beat drop, at key moments.',
        'Tie each interrupt to the point you are making.',
        'Watch the retention graph to see where people leave, and add an interrupt just before that point.',
      ],
    },
    related: ['thumb-stopping', 'hook', 'jump-cut', 'audience-retention', 'watch-time'],
    faqs: [
      {
        question: 'What is an example of a pattern interrupt?',
        answer: ['A cooking video that opens with the finished dish being dropped on the floor, or a talking-head ad where the speaker suddenly cuts to a close-up and asks a direct question.'],
      },
      {
        question: 'How often should a video have a pattern interrupt?',
        answer: ['In short-form video, many editors change something every 2-4 seconds. Longer videos can pace them out more. Your retention data is the best guide.'],
      },
    ],
  },
  {
    slug: 'social-media-image-sizes',
    term: 'Social media image sizes',
    aka: ['ad sizes', 'social media image dimensions', 'social media sizes'],
    category: 'ads',
    short: 'Social media image sizes are the pixel dimensions and aspect ratios each platform recommends for posts, stories, ads, profile banners and link previews.',
    definition: [
      'Social media image sizes are the pixel dimensions and [aspect ratios](/glossary/aspect-ratio) each platform recommends for posts, stories, ads, headers and link previews. Common ones are 1080×1080 (1:1) and 1080×1350 (4:5) for feed posts, 1080×1920 (9:16) for stories and reels, and 1200×630 (about 1.91:1) for link and ad images.',
      'Platforms accept other sizes but crop or shrink them to fit, which can cut off text or a logo. Profile headers are the trickiest, because they display differently on desktop and phone and are partly covered by the profile picture, so you need a [safe zone](/glossary/safe-zone) for anything important.',
      'These values change. Instagram, for example, moved its profile grid to taller 3:4 previews in 2025. The table below lists widely published sizes as of 2026; check each platform\'s help pages before a big campaign.',
    ],
    why: [
      'The right size makes a post look native and sharp. The wrong one gets cropped, blurred or surrounded by empty bars, which looks careless and can hide your headline or [call to action](/glossary/call-to-action).',
      'Ads placed across several platforms need several sizes of the same creative. Planning for them up front saves redesigning each one later.',
    ],
    how: {
      heading: 'How to choose the right social media image size',
      steps: [
        'Decide where the image will appear: feed, story, ad placement, header or link preview.',
        'Use the recommended aspect ratio first, then the recommended pixel size (higher is fine, lower looks soft).',
        'Keep text and logos away from the edges and from areas covered by buttons or profile pictures.',
        'Export as PNG for text-heavy graphics and JPG for photos, within the platform\'s file size limit.',
        'Preview on a phone before posting.',
      ],
    },
    example: {
      label: 'Common sizes (2026, subject to change)',
      code: 'Instagram feed      1080 × 1080 (1:1), 1080 × 1350 (4:5), 1080 × 1440 (3:4)\nStories / Reels     1080 × 1920 (9:16)\nTikTok / Shorts     1080 × 1920 (9:16)\nLink / ad image     1200 × 628 or 1200 × 630 (about 1.91:1)\nYouTube thumbnail   1280 × 720 (16:9)\nFacebook cover      851 × 315 minimum upload\nLinkedIn banner     1584 × 396 (4:1)\nX header            1500 × 500 (3:1)',
    },
    openpromo: {
      body: 'OpenPromo renders the same post or scene at 1080×1080, 1080×1350, 1080×1920, 1920×1080, 1200×628, 1500×500 and 1584×396, and shrinks text until it fits each one.',
      href: '/features/instagram-post-generator',
      label: 'See the post generator',
    },
    related: ['aspect-ratio', 'instagram-post-size', 'instagram-story-size', 'open-graph-image', 'safe-zone', 'banner-ad'],
    faqs: [
      {
        question: 'What is the best image size for all social media?',
        answer: ['No single size fits everywhere. A 1080×1350 (4:5) image works well in most feeds, but stories need 9:16 and link previews need about 1.91:1, so plan a few versions.'],
      },
      {
        question: 'What size should ad images be?',
        answer: ['For Meta feed ads, 1080×1080 or 1080×1350; for stories and reels, 1080×1920; for link-style ads on Facebook and LinkedIn, 1200×628. Upload the largest recommended size so ads stay sharp.'],
      },
    ],
  },
  {
    slug: 'instagram-post-size',
    term: 'Instagram post size',
    aka: ['Instagram image size', 'Instagram post dimensions'],
    category: 'ads',
    short: 'The Instagram post size is 1080 px wide, at 1080×1080 (square), 1080×1350 (portrait 4:5) or 1080×1440 (3:4); portrait fills the most screen.',
    definition: [
      'Instagram post size is the recommended pixel dimensions for images in the Instagram feed. As of 2026, the standard width is 1080 pixels, at 1080×1080 for square (1:1), 1080×1350 for portrait (4:5), 1080×1440 for the taller 3:4 format, and 1080×566 for landscape (1.91:1). Instagram changes these from time to time.',
      'Portrait posts take up the most space on a phone screen, which is why many brands use 4:5 or 3:4 for feed posts and [carousels](/glossary/carousel-post). In 2025 Instagram switched the profile grid to 3:4 thumbnails, so square posts are cropped at the sides on your profile, while feed display is unchanged.',
      'Instagram resizes anything wider than 1080 pixels down to 1080, and anything smaller up, which can look blurry. Every slide in a carousel uses the aspect ratio of the first one.',
    ],
    why: [
      'Using the right size stops Instagram from cropping off your headline, logo or product. Taller posts also hold more attention in the feed simply by taking up more screen.',
      'Planning for the 3:4 grid crop keeps your profile tidy, which matters because people often check a profile before following or buying.',
    ],
    how: {
      heading: 'How to size an Instagram post',
      steps: [
        'Choose portrait (1080×1350 or 1080×1440) for most feed posts, square (1080×1080) where a square design matters.',
        'Keep text and key details in the center so the 3:4 grid crop does not cut them.',
        'Export at 1080 px wide, as JPG for photos or PNG for text graphics.',
        'For carousels, set every slide to the same size as the first.',
        'Check the post on your profile grid after publishing.',
      ],
    },
    openpromo: {
      body: 'OpenPromo makes Instagram posts at 1080×1080 (1:1) and 1080×1350 (4:5), plus 1080×1920 stories, in your brand fonts and colors.',
      href: '/features/instagram-post-generator',
      label: 'See the Instagram post generator',
    },
    related: ['social-media-image-sizes', 'instagram-story-size', 'carousel-post', 'aspect-ratio', 'instagram-grid'],
    faqs: [
      {
        question: 'What is the best size for an Instagram post?',
        answer: ['A portrait post at 1080×1350 (4:5) is the most common choice, and 1080×1440 (3:4) matches the newer profile grid. Both fill more of the screen than a square post.'],
      },
      {
        question: 'Is 1080×1080 still good for Instagram?',
        answer: ['Yes, square posts display fully in the feed. On your profile grid they are shown as 3:4 previews, so the left and right edges are cropped there.'],
      },
      {
        question: 'Why does Instagram crop my photo?',
        answer: ['Feed images must fall between 1.91:1 (landscape) and 4:5 or 3:4 (portrait). Anything outside that range is cropped to fit.'],
      },
    ],
  },
  {
    slug: 'instagram-story-size',
    term: 'Instagram story size',
    aka: ['Instagram story dimensions', 'Instagram Reels size', 'story size'],
    category: 'ads',
    short: 'The Instagram story size is 1080×1920 pixels, a 9:16 vertical frame. Keep text and buttons out of the top and bottom edges, where the app overlays UI.',
    definition: [
      'Instagram story size is the recommended dimensions for Instagram Stories: 1080×1920 pixels, a 9:16 vertical [aspect ratio](/glossary/aspect-ratio) that fills a phone screen. Reels use the same size. Stories can be images or videos, and story videos are split into segments of up to about 60 seconds each, a limit Instagram has changed before.',
      'The app covers parts of the frame: the profile name and progress bar at the top, and the reply bar, link sticker area or ad call-to-action at the bottom. A common guideline is to keep important text and logos out of roughly the top 250 pixels and the bottom 340 pixels, a [safe zone](/glossary/safe-zone) that also suits Reels, TikTok and Shorts.',
      'Images in other ratios are allowed, but Instagram adds a colored background or crops them, which looks less polished than a full-screen design.',
    ],
    why: [
      'Stories and Reels are full-screen, so a correctly sized design feels native and holds attention. Wrong sizes leave bars or crop the message.',
      'Story ads and [Reels](/glossary/instagram-reels) ads use the same 9:16 frame, so one well-sized design can serve organic stories, ads and short-form video placements.',
    ],
    how: {
      heading: 'How to make an Instagram story the right size',
      steps: [
        'Design at 1080×1920 (9:16).',
        'Keep text, logos and faces in the central area, away from the top and bottom edges.',
        'Use large text, since stories are viewed quickly.',
        'Leave space for stickers, links or the ad button at the bottom.',
        'Preview on a phone before posting.',
      ],
    },
    openpromo: {
      body: 'OpenPromo renders stories and reels at 1080×1920 (9:16). Reels come with burned-in word-by-word captions and an SRT file.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['instagram-story', 'safe-zone', 'vertical-video', 'instagram-post-size', 'social-media-image-sizes'],
    faqs: [
      {
        question: 'What is the size of an Instagram story in pixels?',
        answer: ['1080 pixels wide by 1920 pixels tall, a 9:16 ratio.'],
      },
      {
        question: 'Are Instagram Reels and Stories the same size?',
        answer: ['Yes, both are 1080×1920 (9:16). Reels show as a 3:4 crop on your profile grid and as a 4:5 crop in parts of the main feed, so keep the key content near the center.'],
      },
    ],
  },
  {
    slug: 'youtube-thumbnail-size',
    term: 'YouTube thumbnail size',
    aka: ['YouTube thumbnail dimensions'],
    category: 'ads',
    short: 'The YouTube thumbnail size is 1280×720 pixels (16:9), at least 640 px wide, as JPG, PNG or GIF, within YouTube\'s file size limit (long 2 MB).',
    definition: [
      'YouTube thumbnail size is the recommended dimensions for the custom image that represents a video: 1280×720 pixels, a 16:9 ratio, with a minimum width of 640 pixels. YouTube accepts JPG, PNG and non-animated GIF files, and has long capped thumbnails at 2 MB. These limits come from YouTube\'s help pages and can change.',
      'A custom [thumbnail](/glossary/thumbnail) needs a verified account. Thumbnails display at many sizes, from a large preview on a TV to a tiny image in search results on a phone, so designs need to read when shrunk. The timestamp covers the bottom right corner.',
      'YouTube Shorts are vertical, but their thumbnails in feeds come from a frame you pick in the app. A 16:9 custom thumbnail mainly applies to standard videos.',
    ],
    why: [
      'The thumbnail is often the main reason someone clicks a video. A clear, high-contrast thumbnail at the right size improves click-through rate from search and recommendations, which in turn helps the video get shown more.',
      'Using the exact 16:9 size avoids black bars and blurry upscaling, which look unprofessional next to competing videos.',
    ],
    how: {
      heading: 'How to make a YouTube thumbnail',
      steps: [
        'Design at 1280×720 (16:9).',
        'Use one focal point: a face, the product or the result.',
        'Add three to five words of large text at most.',
        'Keep important content away from the bottom right, where the timestamp sits.',
        'Shrink it to phone size to check it still reads, then export under the size limit.',
      ],
    },
    openpromo: {
      body: 'OpenPromo reels come with a thumbnail image alongside the video, captions and SRT file.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['thumbnail', 'click-through-rate', 'aspect-ratio', 'resolution', 'social-media-image-sizes'],
    faqs: [
      {
        question: 'What size is a YouTube thumbnail?',
        answer: ['1280×720 pixels (16:9), at least 640 pixels wide, in JPG, PNG or GIF, within YouTube\'s file size limit.'],
      },
      {
        question: 'Why can\'t I upload a custom thumbnail?',
        answer: ['Custom thumbnails require a verified YouTube account. Verify with a phone number in YouTube Studio, and check that the file is within the size limit.'],
      },
    ],
  },
  {
    slug: 'facebook-cover-photo-size',
    term: 'Facebook cover photo size',
    aka: ['Facebook cover size', 'Facebook banner size'],
    category: 'ads',
    short: 'The Facebook cover photo displays at about 820×312 on desktop and 640×360 on phones. Upload at least 851×315, and keep key content centered.',
    definition: [
      'Facebook cover photo size is the recommended dimensions for the wide image at the top of a Facebook profile or Page. As of 2026, covers display at about 820×312 pixels on desktop and 640×360 on phones, and Facebook asks for an upload of at least 851×315. Many designers upload at twice that size for sharpness.',
      'Because desktop and mobile crop differently, the sides are cut off on phones and the top and bottom on desktop. The profile picture and Page buttons also overlap the lower part. The safest approach is to keep text and logos in the center of the image.',
      'Facebook recommends an sRGB JPG under 100 KB for fastest loading, and PNG for covers with logos or text. Facebook updates its layout, so check the current display in both views after uploading.',
    ],
    why: [
      'The cover photo is the largest image on your Page and often the first thing visitors see. A sharp, well-cropped cover with your [brand colors](/glossary/brand-colors) and a short message makes the business look active and trustworthy.',
      'A badly sized cover gets cropped through faces or text on one of the two layouts, which is easy to miss if you only check one.',
    ],
    how: {
      heading: 'How to make a Facebook cover photo',
      steps: [
        'Design at 851×315 or larger in the same ratio (for example 1702×630).',
        'Keep text and logos within a central area of about 640 px wide so mobile does not crop them.',
        'Leave the lower left clear where the profile picture overlaps on some layouts.',
        'Export as JPG for photos or PNG for text and logos.',
        'Check the result on both desktop and phone.',
      ],
    },
    related: ['social-media-image-sizes', 'linkedin-banner-size', 'twitter-header-size', 'safe-zone', 'brand-consistency'],
    faqs: [
      {
        question: 'What size is a Facebook cover photo in 2026?',
        answer: ['Upload at least 851×315 pixels. It displays at about 820×312 on desktop and 640×360 on phones, so keep important content centered.'],
      },
      {
        question: 'Why is my Facebook cover photo blurry?',
        answer: ['It may be too small, or compressed. Upload at least 851×315 (larger in the same ratio is better), and use PNG if it has text or a logo.'],
      },
    ],
  },
  {
    slug: 'linkedin-banner-size',
    term: 'LinkedIn banner size',
    aka: ['LinkedIn background photo size', 'LinkedIn cover photo size'],
    category: 'ads',
    short: 'The LinkedIn banner size is 1584×396 pixels (4:1) for a personal profile. Company Page covers are 1128×191. Keep text clear of the profile photo.',
    definition: [
      'LinkedIn banner size is the recommended dimensions for the background image at the top of a LinkedIn profile: 1584×396 pixels, a 4:1 ratio, as JPG or PNG up to 8 MB. Company Pages use a different cover size, 1128×191 pixels. These are LinkedIn\'s published values as of 2026, and LinkedIn adjusts its layout from time to time.',
      'The profile photo overlaps the lower left of a personal banner, more so on phones, where the banner is also cropped at the sides. Text placed in the right half or center tends to survive both layouts.',
      'For B2B businesses and founders, the banner works like a small billboard: a tagline, the product, a URL or an upcoming event.',
    ],
    why: [
      'A LinkedIn profile is often the first thing a prospect, partner or hire checks. A banner in your [brand colors](/glossary/brand-colors) with a clear line about what you do turns empty space into a pitch.',
      'The wrong size gets stretched or cropped through your text, which looks careless on a professional network.',
    ],
    how: {
      heading: 'How to make a LinkedIn banner',
      steps: [
        'Design at 1584×396 for a profile, or 1128×191 for a company Page.',
        'Keep the lower left clear for the profile photo.',
        'Place text toward the center or right, in large type.',
        'Stick to one message: what you do, for whom, or one call to action.',
        'Upload and check on both desktop and the phone app.',
      ],
    },
    openpromo: {
      body: 'OpenPromo\'s banner maker renders LinkedIn banners at 1584×396 from your brand profile, in your fonts and colors.',
      href: '/features/banner-maker',
      label: 'See the banner maker',
    },
    related: ['social-media-image-sizes', 'twitter-header-size', 'facebook-cover-photo-size', 'brand-kit', 'tagline'],
    faqs: [
      {
        question: 'What is the LinkedIn banner size in pixels?',
        answer: ['1584×396 pixels for a personal profile (4:1), and 1128×191 for a company Page cover.'],
      },
      {
        question: 'What should I put on my LinkedIn banner?',
        answer: ['A short line about what you do and for whom, your brand colors or logo, and optionally a URL or call to action. Keep it simple and readable on a phone.'],
      },
    ],
  },
  {
    slug: 'twitter-header-size',
    term: 'X (Twitter) header size',
    aka: ['Twitter header size', 'X header size', 'Twitter banner size'],
    category: 'ads',
    short: 'The X (Twitter) header size is 1500×500 pixels, a 3:1 ratio, as JPG or PNG up to 5 MB. Keep text clear of the profile picture in the lower left.',
    definition: [
      'X (Twitter) header size is the recommended dimensions for the banner image at the top of an X profile: 1500×500 pixels, a 3:1 ratio, as a JPG, PNG or GIF up to 5 MB. These are the widely published values as of 2026. X has kept this size through its rebrand from Twitter, but can change it.',
      'The profile picture overlaps the lower left of the header, and different screens crop the top and bottom slightly. Keeping text and logos in the center, and away from the lower left, avoids having them hidden.',
      'Like other profile banners, the header is free advertising space: a tagline, a product shot, a launch date or a link.',
    ],
    why: [
      'Your header is seen by everyone who checks your profile, often after one of your posts gets attention. A clear, on-brand header turns that moment into a reason to follow or click.',
      'A wrong-sized upload is cropped through text or stretched, which looks unprofessional next to a polished bio.',
    ],
    how: {
      heading: 'How to make an X header',
      steps: [
        'Design at 1500×500 (3:1).',
        'Keep the lower left clear for the profile picture.',
        'Place text in the center band, since the top and bottom may be cropped.',
        'Use your [brand colors](/glossary/brand-colors) and one short message.',
        'Check it on desktop and mobile after uploading.',
      ],
    },
    openpromo: {
      body: 'OpenPromo\'s banner maker renders X headers at 1500×500 from your brand profile, in your fonts and colors.',
      href: '/features/banner-maker',
      label: 'See the banner maker',
    },
    related: ['social-media-image-sizes', 'linkedin-banner-size', 'facebook-cover-photo-size', 'safe-zone', 'brand-consistency'],
    faqs: [
      {
        question: 'What size is the X header?',
        answer: ['1500×500 pixels, a 3:1 ratio, up to 5 MB.'],
      },
      {
        question: 'Why is my Twitter header cut off?',
        answer: ['X crops the header differently on different screens, and the profile picture covers the lower left. Keep important content in the center band.'],
      },
    ],
  },
  {
    slug: 'open-graph-image',
    term: 'Open Graph image (OG image)',
    aka: ['OG image', 'og:image', 'link preview image', 'social share image'],
    category: 'ads',
    short: 'An Open Graph image is the picture shown when a link is shared on social media or in chat apps, set with the og:image tag. Use 1200×630 pixels.',
    definition: [
      'An Open Graph image, or OG image, is the picture that appears when a web page link is shared on social media, in messaging apps or in Slack. It is set in the page\'s HTML with the og:image meta tag, part of the Open Graph protocol Facebook introduced in 2010. The recommended size is 1200×630 pixels, about 1.91:1.',
      'Facebook, LinkedIn, WhatsApp, iMessage, Discord and many other apps read Open Graph tags (og:title, og:description, og:image). X reads its own Twitter Card tags but falls back to Open Graph; its large card uses a 2:1 crop, so keep important content in the center.',
      'Without an OG image, apps pick an image from the page or show none, and the link looks bare. Some platforms cache the image, so after changing it you may need to refresh the cache with their debugging tools.',
    ],
    why: [
      'A link with a clear, branded preview image gets noticed in a feed or chat far more easily than a plain text link, which helps [click-through rate](/glossary/click-through-rate) on everything you share.',
      'OG images are also the default creative for link posts and some link ads, so a good one does double duty for organic and paid sharing.',
    ],
    how: {
      heading: 'How to add an Open Graph image',
      steps: [
        'Make an image at 1200×630 pixels with a short headline, your logo and brand colors.',
        'Keep text in the center so 2:1 and square crops do not cut it.',
        'Host it at a public URL and add <meta property="og:image" content="https://..."> to the page head, plus og:title and og:description.',
        'Add twitter:card set to summary_large_image for a big preview on X.',
        'Test the link with Facebook\'s Sharing Debugger or LinkedIn\'s Post Inspector, which also refresh the cache.',
      ],
    },
    example: {
      label: 'OG tags',
      code: '<meta property="og:title" content="Winter tune-up: $49" />\n<meta property="og:description" content="Book a full service at Spoke & Chain." />\n<meta property="og:image" content="https://example.com/og/tune-up.png" />\n<meta property="og:image:width" content="1200" />\n<meta property="og:image:height" content="630" />\n<meta name="twitter:card" content="summary_large_image" />',
    },
    openpromo: {
      body: 'OpenPromo\'s banner maker renders 1200×628 link banners in your brand, a size made for link previews and link ads.',
      href: '/features/banner-maker',
      label: 'See the banner maker',
    },
    related: ['social-media-image-sizes', 'banner-ad', 'click-through-rate', 'thumbnail', 'landing-page'],
    faqs: [
      {
        question: 'What size should an OG image be?',
        answer: ['1200×630 pixels (about 1.91:1) is the standard. Facebook asks for at least 600×315, and smaller images may show as a small thumbnail instead of a large card.'],
      },
      {
        question: 'Why is my link preview image not showing?',
        answer: ['Common causes are a missing or relative og:image URL, an image behind a login, a file that is too large, or a cached old preview. Use the platform\'s debugging tool to see what it reads and refresh it.'],
      },
    ],
  },
];
