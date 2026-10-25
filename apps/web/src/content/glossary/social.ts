import type { GlossaryTerm } from './types';

export const terms: GlossaryTerm[] = [
  {
    slug: 'social-media-marketing',
    term: 'Social media marketing',
    aka: ['SMM', 'social marketing'],
    category: 'social',
    short: 'Social media marketing is using platforms like Instagram, TikTok, LinkedIn and YouTube to build an audience, earn attention and drive sales.',
    definition: [
      "Social media marketing is the practice of using social platforms such as Instagram, TikTok, Facebook, LinkedIn, YouTube and X to promote a business. It covers posting organic content, talking with followers, working with creators and running paid ads, all aimed at building awareness, trust and, in the end, sales.",
      "Most social media marketing splits into two halves. Organic work is what you post for free: feed posts, [Reels](/glossary/instagram-reels), Stories, replies and comments. [Paid social](/glossary/paid-social) is advertising on the same platforms, where you pay to reach people who do not follow you yet. The two feed each other, because posts that do well organically often make the best ads.",
      "A working plan usually includes a [content calendar](/glossary/content-calendar), a few recurring content themes, a posting rhythm per platform and a short list of numbers to watch, such as [reach](/glossary/reach), [engagement rate](/glossary/engagement-rate) and clicks to the website.",
    ],
    why: [
      "Social platforms are where many customers discover new businesses, check whether a brand is real and ask friends for recommendations. A business with a steady, recognizable presence is easier to find and easier to trust than one with an empty profile.",
      "It is also one of the few marketing channels a small business can start with almost no budget. Good posts can reach people beyond your followers, and the comments and messages you get back are direct feedback on what customers care about.",
    ],
    how: {
      heading: 'How to start social media marketing',
      steps: [
        'Pick one or two platforms where your customers already spend time, rather than trying to be everywhere.',
        'Decide what you want from them: awareness, website visits, leads or direct sales.',
        'Choose three to five content themes you can post about again and again.',
        'Set a realistic posting rhythm and plan it in a calendar.',
        'Reply to comments and messages quickly, because conversation is part of the job.',
        'Review your numbers every month and do more of what works.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A bakery called Crumb & Co posts a short Reel of the morning bake three times a week, shares customer photos in Stories and runs a small local ad before holidays. Its goal is simple: more people walking in on weekends.',
    },
    openpromo: {
      body: 'OpenPromo reads your website into a brand profile and turns it into posts, carousels, reels and promo videos for Instagram, TikTok, YouTube, LinkedIn, Facebook and X.',
      href: '/features',
      label: 'See all features',
    },
    related: ['content-calendar', 'paid-social', 'engagement-rate', 'social-media-manager', 'content-strategy', 'organic-reach'],
    faqs: [
      {
        question: 'What does social media marketing include?',
        answer: ['Planning and posting content, replying to comments and messages, running ads, working with creators and measuring results. Small businesses often do the first three and add the rest later.'],
      },
      {
        question: 'Which social media platform is best for a small business?',
        answer: ['The one your customers use. Visual local businesses often do well on Instagram and TikTok, while B2B companies usually get more from LinkedIn. Start with one platform and do it well.'],
      },
      {
        question: 'How long does social media marketing take to work?',
        answer: ['Expect a few months of steady posting before growth becomes clear. Paid ads can bring traffic faster, but organic results build slowly as the platform and your audience learn what you post.'],
      },
    ],
  },
  {
    slug: 'social-media-manager',
    term: 'Social media manager',
    aka: ['social media specialist', 'community manager'],
    category: 'social',
    short: 'A social media manager plans, creates, posts and measures a brand\'s social content, and handles comments, messages and community.',
    definition: [
      "A social media manager is the person responsible for a brand's presence on social platforms. They plan content, write captions, create or brief visuals and videos, schedule posts, reply to comments and messages, and report on results. In small businesses the owner often does this job alongside everything else.",
      "The role varies a lot by company size. At a small business it is a generalist job that covers strategy, design, video, [community management](/glossary/community-management) and reporting. At a larger company it may be split between a strategist, content creators, a community team and a [paid social](/glossary/paid-social) specialist.",
      "Freelance social media managers often look after several small clients at once, which makes planning tools, templates and [content batching](/glossary/content-batching) a big part of the work.",
    ],
    why: [
      "Social media rewards consistency, and consistency needs an owner. Without someone responsible, posting tends to stop when things get busy, comments go unanswered and the profile starts to look abandoned.",
      "A good social media manager also turns platform data into decisions: which topics bring followers, which posts drive website visits and which formats are worth more effort.",
    ],
    how: {
      heading: 'What a social media manager does each week',
      steps: [
        'Plans the coming week or month in a content calendar.',
        'Writes captions and creates or briefs images, carousels and short videos.',
        'Schedules posts at the times the audience is most active.',
        'Replies to comments, mentions and direct messages.',
        'Checks analytics and reports what worked to the team or client.',
      ],
    },
    openpromo: {
      body: 'OpenPromo writes post ideas with a hook, caption and hashtags from your brand profile, and lets you give ideas a date to build a simple content plan.',
      href: '/features/instagram-caption-generator',
      label: 'See the caption and ideas generator',
    },
    related: ['social-media-marketing', 'content-calendar', 'community-management', 'content-creator', 'social-media-audit'],
    faqs: [
      {
        question: 'What skills does a social media manager need?',
        answer: ['Clear writing, a good eye for visuals, basic video editing, comfort with analytics and patience with customers. Knowing how each platform works and keeping up with changes matters too.'],
      },
      {
        question: 'Is a social media manager the same as a content creator?',
        answer: ['Not quite. A content creator focuses on making posts and videos. A social media manager also owns the plan, the posting schedule, the community and the reporting, and may brief creators.'],
      },
    ],
  },
  {
    slug: 'content-calendar',
    term: 'Content calendar',
    aka: ['social media calendar', 'editorial calendar', 'posting schedule', 'content plan'],
    category: 'social',
    short: 'A content calendar is a schedule of what you will post, where and when, so social content is planned ahead instead of made at the last minute.',
    definition: [
      "A content calendar is a planned schedule of the posts, videos and other content a business will publish, showing what goes out, on which platform and on which date. It can be a spreadsheet, a shared document or a scheduling tool, and it turns a vague intention to post more into a concrete plan.",
      "A social media calendar usually lists the date and time, the platform, the format (post, [carousel](/glossary/carousel-post), Reel or Story), the topic or [content pillar](/glossary/content-pillars), the caption and the status of each piece. An editorial calendar is the same idea for blogs, newsletters and longer content.",
      "Calendars also hold the fixed dates in a business's year: launches, sales, holidays, events and seasonal moments. Planning around them early leaves time to make better content than a rushed post on the day.",
    ],
    why: [
      "Posting regularly is one of the few things almost every platform rewards, and a calendar is how regular posting actually happens. It shows gaps before they appear and spreads topics so the feed does not repeat itself.",
      "It also makes [content batching](/glossary/content-batching) possible. When you know the next month's posts, you can write, shoot and design them in a few focused sessions instead of every day.",
    ],
    how: {
      heading: 'How to make a social media content calendar',
      steps: [
        'Choose how often you will post on each platform, based on the time you really have.',
        'Pick three to five content pillars and rotate them through the week.',
        'Add key dates: launches, offers, holidays and local events.',
        'Fill each slot with a topic, a format and a short caption idea.',
        'Batch-create the content, then schedule it.',
        'Review at the end of the month and adjust the plan using what performed.',
      ],
    },
    example: {
      label: 'A week for a yoga studio',
      code: 'Mon  Reel      Pillar: tips      "3 stretches for desk workers"\nWed  Carousel  Pillar: classes   "Which class is right for you?"\nFri  Story     Pillar: community "Member of the week"\nSat  Post      Pillar: offer     "First class free this month"',
    },
    openpromo: {
      body: 'In OpenPromo you can give each post idea a date, which builds a simple social media content calendar from ideas written from your brand profile.',
      href: '/features/instagram-caption-generator',
      label: 'See the ideas generator',
    },
    related: ['content-batching', 'content-pillars', 'best-time-to-post', 'content-strategy', 'social-media-manager', 'evergreen-content'],
    faqs: [
      {
        question: 'What should a content calendar include?',
        answer: ['At least the date, platform, format, topic and status of each post. Many teams also add the caption, the visual, a link and the goal of the post.'],
      },
      {
        question: 'How far ahead should you plan social media content?',
        answer: ['Two to four weeks is common for regular posts, with key campaigns and launches planned a few months ahead. Leave some open slots for timely posts and trends.'],
      },
    ],
  },
  {
    slug: 'best-time-to-post',
    term: 'Best time to post',
    aka: ['best time to post on Instagram', 'best time to post on TikTok', 'posting time'],
    category: 'social',
    short: 'The best time to post is when your own followers are most active, so a new post gets early engagement. It differs by audience and platform.',
    definition: [
      "The best time to post is the day and hour when a business's own audience is most likely to be online and see a new post. Posting then helps a post collect early views and [engagement](/glossary/engagement), which many platforms use as a signal to show it to more people.",
      "Generic advice such as weekday mornings or lunchtime comes from averages across many accounts, and it rarely fits every business. A nightclub, a B2B software company and a parenting brand have very different audiences, and their best times differ too.",
      "Timing matters less than it used to. Feeds are ranked by the [social media algorithm](/glossary/social-media-algorithm) rather than shown in time order, so a strong post can find viewers for days. Good timing gives a post a better start; it does not rescue a weak one.",
    ],
    why: [
      "The first hour or so after posting is when a platform tests a post with a small group. If more of your followers are online then, the post has a better chance of earning the reactions that push it further.",
      "Knowing your audience's active hours also helps you plan replies. Being around to answer comments soon after posting keeps the conversation going.",
    ],
    how: {
      heading: 'How to find your best time to post',
      steps: [
        'Open your platform analytics and find the audience or followers section, which usually shows active hours by day.',
        'Note the two or three busiest windows in your audience\'s time zone.',
        'Post at those times for a few weeks and record reach and engagement for each post.',
        'Try one or two other slots as a test.',
        'Compare results and settle on the windows that work best, then check again every few months.',
      ],
    },
    related: ['social-media-algorithm', 'engagement', 'organic-reach', 'content-calendar', 'reach'],
    faqs: [
      {
        question: 'What is the best time to post on Instagram?',
        answer: ['There is no single answer. Published studies often point to weekday mornings and early evenings, but your own follower activity in Instagram Insights is a much better guide.'],
      },
      {
        question: 'Does posting time really matter?',
        answer: ['Somewhat. It helps a post get early engagement, but content quality matters far more. A great post at an odd hour usually beats a weak post at the perfect time.'],
      },
    ],
  },
  {
    slug: 'engagement',
    term: 'Engagement',
    aka: ['social media engagement', 'post engagement'],
    category: 'social',
    short: 'Engagement is how people interact with a post: likes, comments, shares, saves, replies and clicks. It shows content is landing, not just being seen.',
    definition: [
      "Engagement is the set of actions people take on social media content beyond simply seeing it: liking, commenting, sharing, saving, replying, clicking a link or sending a post to a friend. It is a sign that content caught someone's attention enough to react, and it is one of the main signals platforms use to rank posts.",
      "Not all engagement is equal. A like takes a second, while a comment, a save or a share takes more intent. Many marketers treat shares and saves as stronger signals, because they mean someone found a post useful enough to keep or worth passing on. Platforms do not publish exact weightings, but they say these deeper actions matter.",
      "Engagement is often turned into a ratio called [engagement rate](/glossary/engagement-rate), which makes accounts and posts of different sizes comparable. Raw engagement counts on their own mostly grow with [reach](/glossary/reach).",
    ],
    why: [
      "Engagement is how a post spreads. Posts that get early reactions are shown to more people, both followers and non-followers, which grows [organic reach](/glossary/organic-reach) without paying for it.",
      "It is also a direct line to customers. Comments and messages tell you what people want, what confuses them and what makes them buy, which is useful well beyond social media.",
    ],
    how: {
      heading: 'How to increase engagement on social media',
      steps: [
        'Open with a strong [hook](/glossary/hook) so people stop scrolling.',
        'Post content people want to save or send: tips, checklists, answers and honest opinions.',
        'Ask a specific question in the caption rather than a generic one.',
        'Reply to comments quickly, which often brings more replies.',
        'Use formats that suit each platform, such as carousels and short videos.',
      ],
    },
    related: ['engagement-rate', 'reach', 'social-media-algorithm', 'community-management', 'call-to-action', 'hook'],
    faqs: [
      {
        question: 'What counts as engagement on social media?',
        answer: ['Likes, comments, shares, saves, replies, link clicks, profile visits and sometimes video views. Each platform defines its own engagement metric, so check what is included.'],
      },
      {
        question: 'Is engagement more important than followers?',
        answer: ['For most businesses, yes. A smaller audience that comments, shares and buys is worth more than a large one that ignores your posts.'],
      },
    ],
  },
  {
    slug: 'engagement-rate',
    term: 'Engagement rate',
    aka: ['ER', 'engagement rate formula'],
    category: 'social',
    short: 'Engagement rate is the share of people who interacted with a post, usually engagements divided by reach or followers, shown as a percentage.',
    definition: [
      "Engagement rate is a social media metric that shows how many people interacted with content compared with how many could have. It is usually calculated as total engagements (likes, comments, shares, saves) divided by reach, impressions or follower count, then multiplied by 100 to give a percentage that compares posts and accounts.",
      "There is no single standard formula, which is why engagement rates from different tools often disagree. Dividing by [reach](/glossary/reach) shows how engaging a post was for the people who actually saw it. Dividing by followers is easier to compare between accounts, because follower counts are public. Dividing by [impressions](/glossary/impressions) gives a lower number, because one person can see a post several times.",
      "Engagement rate tends to fall as accounts grow, so a small account with a high rate and a large account with a lower one can both be healthy. Compare an account mainly against its own past results.",
    ],
    why: [
      "Engagement rate tells you whether content is working, independent of how big your audience is. It is the fairest way to compare one post with another and to spot which topics and formats your audience prefers.",
      "Brands also use it to judge creators. In [influencer marketing](/glossary/influencer-marketing), a creator's engagement rate is often a better guide to their real influence than follower count.",
    ],
    how: {
      heading: 'How to calculate engagement rate',
      steps: [
        'Add up the engagements on a post: likes, comments, shares and saves.',
        'Pick a denominator and stick to it: reach (most common for your own posts) or followers (for comparing accounts).',
        'Divide engagements by that number.',
        'Multiply by 100 to get a percentage.',
        'Average it over many posts before drawing conclusions.',
      ],
    },
    example: {
      label: 'Engagement rate formula',
      code: 'Engagement rate by reach = (likes + comments + shares + saves) / reach x 100\n\nExample: (180 + 22 + 15 + 33) / 5,000 x 100 = 5%',
    },
    related: ['engagement', 'reach', 'impressions', 'influencer-marketing', 'social-media-audit', 'click-through-rate'],
    faqs: [
      {
        question: 'What is a good engagement rate?',
        answer: ['It depends on the platform, the formula and the account size. Rather than chasing a published benchmark, track your own average and aim to beat it over time.'],
      },
      {
        question: 'Should I calculate engagement rate by reach or by followers?',
        answer: ['Use reach for your own posts, because it measures the people who actually saw them. Use followers when comparing accounts, since you cannot see other accounts\' reach.'],
      },
    ],
  },
  {
    slug: 'reach',
    term: 'Reach',
    aka: ['post reach', 'accounts reached'],
    category: 'social',
    short: 'Reach is the number of unique people who saw a post or ad at least once. Impressions count every view, including repeats.',
    definition: [
      "Reach is the number of unique people or accounts that saw a piece of content at least once during a given period. If one person views a post three times, that counts as a reach of one. It shows how far content traveled and how many different people had a chance to notice your brand.",
      "Reach is usually split into [organic reach](/glossary/organic-reach), from unpaid posts, and paid reach, from ads. Platforms also show how much reach came from followers and how much from non-followers, which tells you whether a post is growing your audience or only reaching people who already know you.",
      "Reach is easily confused with [impressions](/glossary/impressions). Impressions count every time content was shown, including repeat views, so impressions are always equal to or higher than reach. The two together tell you how often each person saw something, which in ads is called [frequency](/glossary/frequency).",
    ],
    why: [
      "No one can buy, follow or remember a brand they never saw. Reach is the top of the funnel for social media: the bigger the right audience you reach, the more chances you have to win attention and customers.",
      "Reach from non-followers is especially valuable, because it is how new people discover a business. A post that reaches far beyond your follower count is a sign the format or topic is worth repeating.",
    ],
    how: {
      heading: 'How to increase reach on social media',
      steps: [
        'Post short vertical videos, which most platforms now push to non-followers.',
        'Make content people want to share or send to a friend.',
        'Post consistently so the platform has more chances to test your content.',
        'Use relevant keywords in captions and a few targeted hashtags so posts can be found.',
        'Collaborate with other accounts through collab posts or creator partnerships.',
      ],
    },
    related: ['impressions', 'organic-reach', 'engagement-rate', 'frequency', 'social-media-algorithm', 'brand-awareness'],
    faqs: [
      {
        question: 'What is the difference between reach and impressions?',
        answer: ['Reach counts unique people who saw content. Impressions count total views, including repeats. A post seen twice by 100 people has a reach of 100 and 200 impressions.'],
      },
      {
        question: 'Why is my reach going down?',
        answer: ['Common reasons are posting less often, a change in format, topics your audience cares less about, or platform changes that favor other content types. Compare recent posts with your best ones to find the difference.'],
      },
    ],
  },
  {
    slug: 'impressions',
    term: 'Impressions',
    aka: ['views', 'impression count'],
    category: 'social',
    short: 'Impressions are the total number of times content was shown on screen, counting repeat views by the same person. Reach counts people.',
    definition: [
      "Impressions are the total number of times a post, ad or video was displayed on someone's screen. Every display counts, so if one person sees the same post four times, that adds four impressions. Impressions measure how often content was delivered, while [reach](/glossary/reach) measures how many different people saw it.",
      "Platforms define and label impressions differently, and some have replaced the word with views. On several platforms a view now counts each time content appears or starts playing, which works much like an impression. Check the platform's own definition before comparing numbers across apps.",
      "In advertising, impressions are the unit many ads are priced on. [CPM](/glossary/cpm) is the cost per thousand impressions, and dividing impressions by reach gives ad [frequency](/glossary/frequency).",
    ],
    why: [
      "Impressions show the total exposure a brand got, which matters because people often need to see a message several times before they act. A high impressions-to-reach ratio means your audience is seeing you repeatedly.",
      "They are also the base for other metrics, such as [click-through rate](/glossary/click-through-rate), which divides clicks by impressions.",
    ],
    example: {
      label: 'Worked example',
      body: 'A bike shop\'s Reel is shown to 2,000 different people. Some watch it more than once, so the platform records 2,600 impressions. Reach is 2,000, impressions are 2,600, and each person saw it 1.3 times on average.',
    },
    related: ['reach', 'cpm', 'frequency', 'click-through-rate', 'engagement-rate'],
    faqs: [
      {
        question: 'Are impressions the same as views?',
        answer: ['Often close, but not always. Each platform defines views in its own way. On many, a view of a photo or video is counted each time it appears, which is similar to an impression.'],
      },
      {
        question: 'Are more impressions always better?',
        answer: ['Not on their own. Impressions with little engagement or few clicks may mean the content is shown but ignored. Look at impressions alongside engagement and clicks.'],
      },
    ],
  },
  {
    slug: 'organic-reach',
    term: 'Organic reach',
    aka: ['unpaid reach', 'organic social'],
    category: 'social',
    short: 'Organic reach is the number of unique people who see your content without paid promotion, through feeds, search, shares and recommendations.',
    definition: [
      "Organic reach is the number of unique people who see a business's content without it being paid for. It comes from followers' feeds, recommendation feeds such as For You and Explore, hashtag and keyword search, profile visits and shares. It is the free counterpart to paid reach from ads and boosted posts.",
      "Organic reach on traditional feed posts has generally fallen as platforms grew, because there is far more content than time to see it. Platforms now rely heavily on recommendation systems that show posts from accounts people do not follow, which means a small account can still reach a large audience if a post performs well.",
      "Short-form video has become one of the main sources of organic reach, as [Reels](/glossary/instagram-reels), TikTok and [YouTube Shorts](/glossary/youtube-shorts) are built to surface content from accounts you do not follow.",
    ],
    why: [
      "Organic reach is the cheapest way to get in front of new customers. Every person reached without paying lowers the cost of building awareness and makes later ads more effective, because people already know the brand.",
      "It is also a test lab. Posts that earn strong organic reach show which messages work, and those posts are often the best candidates to put money behind as [paid social](/glossary/paid-social) ads.",
    ],
    how: {
      heading: 'How to improve organic reach',
      steps: [
        'Post short vertical video regularly, since recommendation feeds favor it.',
        'Hook viewers in the first second or two so they keep watching.',
        'Write captions with the words people would search for.',
        'Make content worth saving or sharing, not just liking.',
        'Avoid watermarks from other apps and low-quality reposts, which platforms say they may show less.',
      ],
    },
    openpromo: {
      body: 'OpenPromo makes 9:16 reels for Reels, TikTok and Shorts with a hook in the first two seconds, voiceover, music and word-by-word captions.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['reach', 'paid-social', 'social-media-algorithm', 'short-form-video', 'engagement', 'hook'],
    faqs: [
      {
        question: 'Why is organic reach declining?',
        answer: ['There is more content than people have time to see, and platforms rank feeds rather than show everything. Many also prioritize content types they want to grow, such as short video.'],
      },
      {
        question: 'Is organic reach still worth it?',
        answer: ['Yes. It costs only time, it builds a following you own the relationship with, and it shows which messages deserve ad money.'],
      },
    ],
  },
  {
    slug: 'social-media-algorithm',
    term: 'Social media algorithm',
    aka: ['Instagram algorithm', 'TikTok algorithm', 'YouTube algorithm', 'feed algorithm'],
    category: 'social',
    short: 'A social media algorithm is the system a platform uses to decide which posts each person sees, and in what order, based on predicted interest.',
    definition: [
      "A social media algorithm is the set of ranking systems a platform uses to decide which posts appear in each person's feed and in what order. It predicts how likely someone is to watch, like, comment, share or follow, using signals about the content, the creator and that person's past behavior, then shows the posts it scores highest.",
      "Platforms do not run one algorithm. Instagram, for example, says it ranks Feed, Stories, Explore and Reels with different systems, because people use each surface differently. TikTok's For You feed leans heavily on how people interact with videos, such as watch time and rewatches, more than on follower count.",
      "Common signals across platforms include watch time and [completion rate](/glossary/completion-rate) for videos, shares and saves, comments, how often a viewer interacts with an account, and how recent a post is. The exact weightings are not public and change often.",
    ],
    why: [
      "The algorithm decides how many people see each post, so it shapes [organic reach](/glossary/organic-reach) more than anything else. Understanding what it rewards helps a business make content that platforms are willing to show.",
      "The practical lesson is simple: platforms want people to stay and enjoy their time. Content that holds attention, earns shares and sparks real conversation tends to travel further than content written to game the system.",
    ],
    how: {
      heading: 'How to work with the Instagram and TikTok algorithm',
      steps: [
        'Grab attention in the first one to two seconds with a clear [hook](/glossary/hook).',
        'Keep videos tight so more viewers watch to the end.',
        'Make posts people want to share privately or save for later.',
        'Post consistently so the platform has more data on who likes your content.',
        'Stay on a few clear topics so it can learn who to show you to.',
      ],
    },
    related: ['organic-reach', 'engagement', 'watch-time', 'audience-retention', 'best-time-to-post', 'viral-video'],
    faqs: [
      {
        question: 'How does the Instagram algorithm work?',
        answer: ['Instagram uses separate ranking systems for Feed, Stories, Explore and Reels. Each predicts what you are likely to engage with, using your activity, the post\'s performance and your history with the account.'],
      },
      {
        question: 'Can you beat the algorithm?',
        answer: ['Not with tricks for long. Platforms change their systems often. Content that people genuinely watch, share and talk about is the approach that keeps working.'],
      },
    ],
  },
  {
    slug: 'hashtag',
    term: 'Hashtag',
    aka: ['hashtag strategy', 'branded hashtag', 'hashtags'],
    category: 'social',
    short: 'A hashtag is a word or phrase after a # sign that groups posts by topic, so people can find them by tapping or searching the tag.',
    definition: [
      "A hashtag is a word or phrase written after the # symbol, such as #veganbaking, that tags a social media post with a topic. Platforms turn hashtags into clickable links, so tapping one shows other posts using it. They help people find content about a subject and help platforms understand what a post is about.",
      "There are a few common kinds. Broad hashtags like #food are used by millions of posts, so a single post is quickly buried. Niche hashtags like #sourdoughstarter are smaller but more targeted. Branded hashtags are unique to one business or campaign and are often used to collect [user-generated content](/glossary/user-generated-content). Community and location hashtags connect posts to a group or a place.",
      "Hashtags matter less than they did in the early days of Instagram and X. Platforms now read captions, on-screen text, audio and images to understand posts, and search works with ordinary keywords. A few relevant hashtags still help with discovery and categorization, but piles of generic tags rarely do.",
    ],
    why: [
      "Hashtags are a cheap way to tell a platform and its users what a post is about. Used well, they put content in front of people browsing a specific topic, which can bring followers who genuinely care about what you do.",
      "Branded hashtags also build community. When customers tag their own posts with your hashtag, you get social proof and a ready-made pool of content you can reshare with permission.",
    ],
    how: {
      heading: 'How to choose hashtags',
      steps: [
        'Pick tags that describe the post honestly, not ones that are merely popular.',
        'Mix one or two broader tags with a few niche and local ones.',
        'Look at what accounts in your niche use and what results each tag shows.',
        'Keep the number modest. Instagram has recommended a small number of relevant tags, and it caps the total per post.',
        'Create one branded hashtag for your business or a campaign and put it in your bio.',
      ],
    },
    example: {
      label: 'Hashtags for a bike shop post',
      code: '#bikerepair #cyclingportland #gravelbike #commutebybike #spokeandchainshop',
    },
    openpromo: {
      body: 'Each post idea in OpenPromo comes with hashtags chosen for that idea, alongside a hook and a caption written from your brand profile.',
      href: '/features/instagram-caption-generator',
      label: 'See the caption and hashtag generator',
    },
    related: ['caption', 'organic-reach', 'user-generated-content', 'social-media-algorithm', 'social-listening'],
    faqs: [
      {
        question: 'How many hashtags should I use on Instagram?',
        answer: ['Instagram allows up to 30 on a post, but it has suggested using a handful of relevant ones. Three to five specific tags usually work better than a long generic list.'],
      },
      {
        question: 'Do hashtags still work?',
        answer: ['They still help platforms categorize posts and help people browsing a topic find you. They matter less than strong content and clear captions with searchable keywords.'],
      },
      {
        question: 'What is a branded hashtag?',
        answer: ['A hashtag unique to your business or campaign, such as your brand name plus a word. Customers use it on their posts, which makes it easy to find and reshare their content.'],
      },
    ],
  },
  {
    slug: 'caption',
    term: 'Caption',
    aka: ['post caption', 'Instagram caption', 'social media caption'],
    category: 'social',
    short: 'A caption is the text that goes with a social media post. It adds context, tells a story, invites action and helps the post be found in search.',
    definition: [
      "A caption is the written text that accompanies a social media post, photo or video. It sits below or beside the image and can include a short message, a story, details, a question, a [call to action](/glossary/call-to-action), hashtags and mentions. A caption explains what the visual cannot and gives people a reason to react.",
      "On most platforms only the first line or two shows before a more link, so the opening works like a [headline](/glossary/headline). Captions can be short and punchy or long and story-led; both can work, as long as the first line earns the tap.",
      "Do not confuse post captions with video captions. Video captions, also called [subtitles](/glossary/subtitles) or [closed captions](/glossary/closed-captions), are the words of the audio shown on screen. A post caption is the text you write in the description field.",
    ],
    why: [
      "The image stops the scroll, but the caption often decides what happens next: a comment, a save, a click or a purchase. It is where you add your voice, answer the obvious questions and tell people what to do.",
      "Captions are also searchable. Instagram, TikTok and other platforms use caption text to understand posts and surface them in search, so clear keywords help people find you.",
    ],
    how: {
      heading: 'How to write an Instagram caption',
      steps: [
        'Write a first line that makes people want to read on: a question, a bold claim or a promise.',
        'Add the useful part: the story, the tip or the details of the offer.',
        'Use words your customers would search for, naturally.',
        'End with one clear call to action.',
        'Add a few relevant hashtags at the end.',
      ],
    },
    example: {
      label: 'Caption for a yoga studio',
      code: 'Tight shoulders after a day at the desk?\n\nTry these three stretches before bed. Hold each for 30 seconds and breathe slowly.\n\nSave this for tonight, and book a beginner class from the link in our bio.\n\n#deskstretches #yogaforbeginners #eastsideyoga',
    },
    openpromo: {
      body: 'OpenPromo writes captions in the voice from your brand profile, without hype words, and attaches them to each post, carousel or reel you make from an idea.',
      href: '/features/instagram-caption-generator',
      label: 'See the caption generator',
    },
    related: ['call-to-action', 'hashtag', 'hook', 'copywriting', 'brand-voice', 'subtitles'],
    faqs: [
      {
        question: 'How long should an Instagram caption be?',
        answer: ['Instagram allows up to 2,200 characters. Short captions suit simple posts, while longer, story-led captions can work for loyal audiences. The first line matters most because it shows before the cut.'],
      },
      {
        question: 'What makes a good caption?',
        answer: ['A first line that earns attention, something useful or personal in the middle, and a clear next step at the end, written in your brand\'s voice.'],
      },
    ],
  },
  {
    slug: 'call-to-action',
    term: 'Call to action (CTA)',
    aka: ['CTA', 'call-to-action'],
    category: 'social',
    short: 'A call to action (CTA) tells people exactly what to do next, such as Shop now, Book a class or Save this post. It turns attention into action.',
    definition: [
      "A call to action (CTA) is a short instruction that tells someone what to do next, such as Shop now, Book a table, Download the guide or Comment below. It appears in captions, at the end of videos, on buttons, in ads and on landing pages. A good CTA is specific, easy to follow and connected to the content.",
      "CTAs come in two strengths. Soft CTAs ask for small actions like save, share, follow or comment, and suit organic posts meant to build an audience. Hard CTAs ask for a purchase, booking or sign-up and suit ads, offers and [landing pages](/glossary/landing-page).",
      "On social platforms, CTAs also take the form of built-in buttons, such as the Shop Now or Learn More buttons on ads, link stickers in Stories and the [link in bio](/glossary/link-in-bio). Video CTAs usually appear in the last few seconds as on-screen text and narration.",
    ],
    why: [
      "People rarely take an action they were not asked to take. Without a CTA, even a well-liked post leaves viewers with no next step, and the attention you earned goes nowhere.",
      "A clear CTA also makes results measurable. When each post asks for one thing, you can tell which content drives clicks, sign-ups and sales, and track it as a [conversion rate](/glossary/conversion-rate).",
    ],
    how: {
      heading: 'How to write a call to action',
      steps: [
        'Decide on one action per post or video. Several CTAs compete with each other.',
        'Start with a verb: book, shop, try, save, get, join.',
        'Say what the person gets, such as Get your free class or Save this for later.',
        'Make it easy: tell people where the link is or how to reply.',
        'Repeat it on screen and in the caption for videos.',
      ],
    },
    example: {
      label: 'Soft and hard CTAs for a bakery',
      body: 'Soft: "Save this post for your next weekend brunch." Hard: "Order your holiday cake by Friday from the link in our bio."',
    },
    openpromo: {
      body: 'OpenPromo flags a missing call to action before anything renders, and promo videos and carousels end on a call to action scene.',
      href: '/docs/how-it-works',
      label: 'See how it works',
    },
    related: ['caption', 'link-in-bio', 'landing-page', 'conversion-rate', 'ad-copy', 'copywriting'],
    faqs: [
      {
        question: 'What are examples of a call to action?',
        answer: ['Shop now, Book a free consultation, Get the guide, Start your free trial, Comment your favorite, Save this post, Send this to a friend and Tap the link in our bio.'],
      },
      {
        question: 'Where should a CTA go in a video?',
        answer: ['Usually at the end, after the viewer has seen the value. Short videos can also include a quick CTA early or on screen throughout, as many people drop off before the end.'],
      },
    ],
  },
  {
    slug: 'link-in-bio',
    term: 'Link in bio',
    aka: ['bio link', 'link in bio page'],
    category: 'social',
    short: 'Link in bio is the single clickable link in a social profile, often pointing to a landing page that lists several links, offers or products.',
    definition: [
      "Link in bio refers to the clickable website link in a social media profile, most often on Instagram and TikTok, where links in regular post captions are not clickable. Posts tell viewers to tap the link in bio to shop, book or read more. Many businesses point it at a simple page listing several links.",
      "Instagram now allows up to five links in a profile, and TikTok offers bio links to eligible accounts, but the habit of a single link to a hub page remains common. Those hub pages are often called link-in-bio pages and can be built with a dedicated tool or as a page on your own site.",
      "Building the page on your own website has a benefit: visitors land on your domain, you can track them in your analytics, and the page can carry your branding and a clear [call to action](/glossary/call-to-action).",
    ],
    why: [
      "On platforms that do not make caption links clickable, the bio link is the main route from social media to a sale. Every post that ends with link in bio depends on that link being useful and up to date.",
      "A focused link page also improves [conversion rate](/glossary/conversion-rate). Sending people straight to the product, offer or booking page they just saw works better than dropping them on a generic homepage.",
    ],
    how: {
      heading: 'How to set up a link in bio page',
      steps: [
        'Decide what you most want visitors to do and put that link first.',
        'Keep the page short: three to six links is plenty.',
        'Match the labels to your recent posts, such as Holiday menu or Spring class schedule.',
        'Add tracking parameters so you can see social traffic in your analytics.',
        'Update it whenever a post promotes something new.',
      ],
    },
    related: ['call-to-action', 'landing-page', 'conversion-rate', 'social-commerce', 'caption'],
    faqs: [
      {
        question: 'Why do people say link in bio?',
        answer: ['Because Instagram does not make links in post captions clickable. The profile link is the main way to send followers to a website, so posts point to it.'],
      },
      {
        question: 'Do I need a link-in-bio tool?',
        answer: ['No. A simple page on your own website works and keeps visitors on your domain. Tools are convenient if you want quick setup without editing your site.'],
      },
    ],
  },
  {
    slug: 'user-generated-content',
    term: 'User-generated content (UGC)',
    aka: ['UGC', 'customer content'],
    category: 'social',
    short: 'User-generated content (UGC) is content made by customers or fans, not the brand: photos, videos, reviews and posts about a product.',
    definition: [
      "User-generated content (UGC) is any content about a brand that was made by its customers, fans or users rather than by the brand itself. It includes photos, videos, reviews, unboxings, testimonials and social posts. Brands often reshare UGC, with permission, because it shows real people using the product.",
      "The term has stretched in recent years. Alongside organic customer posts, there is now paid UGC: content made by creators who are paid to film in a natural, customer-like style, often for ads. These [UGC ads](/glossary/ugc-ads) look like posts from a regular person but are planned and licensed by the brand.",
      "Whether organic or paid, the appeal is the same: it looks and sounds like a peer, not an advertisement. That makes it a strong form of [social proof](/glossary/social-proof).",
    ],
    why: [
      "People tend to trust other customers more than brands. A real photo of someone enjoying a product often answers questions and doubts better than polished brand content, and it shows the product in everyday settings.",
      "UGC also eases the content workload. A steady stream of customer posts gives a small team more to share, and it makes customers feel noticed, which encourages more of them to post.",
    ],
    how: {
      heading: 'How to get user-generated content',
      steps: [
        'Ask: put a note in packaging, emails and your bio inviting customers to tag you.',
        'Create a branded hashtag so posts are easy to find.',
        'Feature customer posts often so others want to be featured too.',
        'Run occasional photo or video contests with a clear theme.',
        'Always ask permission and credit the creator before resharing.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A yoga studio asks members to tag their post-class photos with its branded hashtag. Each Friday it reshares one, with permission, as Member of the Week in Stories, and uses the best ones on its class schedule page.',
    },
    related: ['ugc-ads', 'social-proof', 'testimonial', 'hashtag', 'influencer-marketing', 'brand-ambassador'],
    faqs: [
      {
        question: 'What does UGC mean?',
        answer: ['User-generated content: posts, photos, videos and reviews about a brand made by its customers or fans. It also now refers to paid creators who make content in that style.'],
      },
      {
        question: 'Can I repost customer content?',
        answer: ['Ask permission first and credit the creator. For use in ads or on your website, get clear written permission, because a social repost and an ad license are not the same thing.'],
      },
    ],
  },
  {
    slug: 'social-proof',
    term: 'Social proof',
    aka: ['social validation'],
    category: 'social',
    short: 'Social proof is the tendency to follow what others do. In marketing it means reviews, testimonials, customer counts and endorsements that build trust.',
    definition: [
      "Social proof is the psychological tendency to look at what other people do and think when deciding what to do ourselves. In marketing it means showing evidence that others already use, like and recommend a product, such as reviews, star ratings, testimonials, customer logos, follower counts, case studies and posts from real customers.",
      "Social proof comes from several sources. Customers provide reviews, [testimonials](/glossary/testimonial) and [user-generated content](/glossary/user-generated-content). Experts and creators provide endorsements. Numbers such as customers served or years in business give a sense of scale. Press mentions and awards add outside credibility.",
      "It only works when it is real and specific. Vague praise and invented figures erode trust quickly, and in many places misleading endorsements or fake reviews break advertising and consumer protection rules.",
    ],
    why: [
      "Buying from an unknown business feels risky. Social proof reduces that risk by showing that people like the buyer already took the step and were happy. It often turns interest into a purchase.",
      "On social media it works at every stage: comments and shares make a post look worth watching, customer stories make an offer believable, and reviews make an ad less of a gamble.",
    ],
    how: {
      heading: 'How to use social proof in marketing',
      steps: [
        'Collect reviews and testimonials as a habit, right after a good customer experience.',
        'Use specifics: names (with permission), details and results, not generic praise.',
        'Reshare customer posts and tag them.',
        'Put proof near the decision: on product pages, ads and landing pages.',
        'Never invent numbers or reviews.',
      ],
    },
    openpromo: {
      body: 'Social proof is one of the post idea goals in OpenPromo, and its checks flag figures in a draft that cannot be found on your website.',
      href: '/features/instagram-caption-generator',
      label: 'See the ideas generator',
    },
    related: ['testimonial', 'user-generated-content', 'case-study', 'testimonial-video', 'influencer-marketing', 'objection-handling'],
    faqs: [
      {
        question: 'What are examples of social proof?',
        answer: ['Customer reviews, star ratings, testimonials, case studies, customer counts, logos of well-known clients, creator endorsements, press mentions and posts from real customers.'],
      },
      {
        question: 'Why does social proof work?',
        answer: ['When people are unsure, they look to others for cues. Seeing that people like them chose a product makes the decision feel safer.'],
      },
    ],
  },
  {
    slug: 'influencer-marketing',
    term: 'Influencer marketing',
    aka: ['creator marketing', 'influencer partnerships'],
    category: 'social',
    short: 'Influencer marketing is paying or partnering with creators who have an engaged audience to promote a product in their own content and voice.',
    definition: [
      "Influencer marketing is a form of marketing where a brand partners with social media creators who have an engaged audience to promote its product or service. The creator features the product in their own content and voice, and the brand gains reach and credibility with an audience that already trusts that person.",
      "Partnerships take many forms: paid sponsored posts, free products in exchange for honest reviews, affiliate deals that pay a commission per sale, long-term [brand ambassador](/glossary/brand-ambassador) roles and paid usage rights to run a creator's content as ads. Creators range from [micro-influencers](/glossary/micro-influencer) with a few thousand followers to celebrities with millions.",
      "Paid partnerships must be disclosed. Platforms provide paid partnership labels, and advertising regulators such as the FTC in the US require clear disclosure that a post is sponsored.",
    ],
    why: [
      "A recommendation from a trusted creator often carries more weight than a brand's own ad. It puts a product in front of a ready-made, relevant audience and borrows the creator's credibility.",
      "Influencer content can also be reused. With the right rights, a strong creator video can become an ad, a website asset or [UGC ads](/glossary/ugc-ads), stretching the value of one partnership.",
    ],
    how: {
      heading: 'How to start influencer marketing',
      steps: [
        'Define the goal: awareness, content, sales or a launch.',
        'Find creators whose audience matches your customers, not just those with big numbers.',
        'Check their engagement rate and the quality of comments.',
        'Agree in writing on deliverables, dates, disclosure, payment and usage rights.',
        'Give a short brief, then let them speak in their own voice.',
        'Track results with codes or links and keep working with those who perform.',
      ],
    },
    related: ['micro-influencer', 'brand-ambassador', 'creator-economy', 'user-generated-content', 'engagement-rate', 'social-proof'],
    faqs: [
      {
        question: 'How much does influencer marketing cost?',
        answer: ['It varies enormously by audience size, platform, niche and usage rights. Small creators may work for product or modest fees, while large creators charge much more. Agree on rates per deliverable.'],
      },
      {
        question: 'Do influencer posts need to be disclosed?',
        answer: ['Yes. In the US the FTC requires clear disclosure of paid or gifted partnerships, and platforms offer paid partnership labels. Other countries have similar rules.'],
      },
    ],
  },
  {
    slug: 'micro-influencer',
    term: 'Micro-influencer',
    aka: ['micro influencer', 'nano-influencer'],
    category: 'social',
    short: 'A micro-influencer is a creator with a smaller, focused following, often about 10,000 to 100,000, and usually close ties with their audience.',
    definition: [
      "A micro-influencer is a social media creator with a relatively small but engaged following, commonly described as about 10,000 to 100,000 followers. They usually focus on one niche, such as local food, running or skincare, and often have closer relationships with their audience than large creators, which makes their recommendations feel personal.",
      "The tiers are informal and definitions vary. Nano-influencers are smaller still, often under 10,000 followers. Mid-tier, macro and mega influencers sit above micro, with audiences in the hundreds of thousands or millions. There is no official cutoff, so agencies and tools use slightly different numbers.",
      "Micro-influencers are often more affordable and more open to product-for-content deals or small fees, which makes them a common starting point for small businesses in [influencer marketing](/glossary/influencer-marketing).",
    ],
    why: [
      "For a small business, reaching 20,000 people who care about exactly your niche is often worth more than reaching a million who do not. Micro-influencers offer that focus at a price a small budget can handle.",
      "Working with several micro-influencers also spreads risk and produces a variety of content, which can be reused as [UGC ads](/glossary/ugc-ads) with the right rights.",
    ],
    how: {
      heading: 'How to find micro-influencers',
      steps: [
        'Search niche and local hashtags and keywords on the platforms your customers use.',
        'Look at who your existing customers and followers already follow.',
        'Check engagement, comment quality and whether the audience matches your location.',
        'Reach out personally with a short, specific offer.',
        'Start with one small collaboration before committing to more.',
      ],
    },
    related: ['influencer-marketing', 'brand-ambassador', 'engagement-rate', 'creator-economy', 'ugc-ads'],
    faqs: [
      {
        question: 'How many followers does a micro-influencer have?',
        answer: ['Most definitions put micro-influencers at about 10,000 to 100,000 followers, though some start the range lower. Nano-influencers usually have fewer than 10,000.'],
      },
      {
        question: 'Are micro-influencers worth it?',
        answer: ['Often, especially for niche or local businesses. They tend to cost less and their audiences are focused. Judge each one by audience fit and engagement, not tier alone.'],
      },
    ],
  },
  {
    slug: 'brand-ambassador',
    term: 'Brand ambassador',
    aka: ['ambassador program'],
    category: 'social',
    short: 'A brand ambassador is a person who represents and promotes a brand over time, often a customer, creator or employee with a long-term arrangement.',
    definition: [
      "A brand ambassador is a person who represents and promotes a brand over an extended period, rather than for a single campaign. Ambassadors can be loyal customers, creators, athletes, experts or employees. They talk about the brand regularly, use its products in public and often get perks, discounts, commissions or a fee in return.",
      "The difference from a one-off influencer post is commitment. An ambassador relationship builds familiarity, because the audience sees the same person use the product over months. Many brands run ambassador programs with tiers, referral codes and community events.",
      "Ambassadors who are paid or receive free products must disclose that relationship in their posts, just like any sponsored creator.",
    ],
    why: [
      "Repeated, genuine recommendations from the same trusted person build more trust than one sponsored post. Ambassadors also give a brand a steady supply of authentic content and [social proof](/glossary/social-proof).",
      "Customer ambassador programs are a low-cost option for small businesses. A handful of enthusiastic regulars with referral codes can bring in new customers through word of mouth.",
    ],
    how: {
      heading: 'How to start a brand ambassador program',
      steps: [
        'Look first at customers who already post about you.',
        'Decide what ambassadors get: discounts, free products, commission or a fee.',
        'Write simple guidelines covering disclosure, tone and what not to say.',
        'Give each ambassador a referral code or link to track results.',
        'Check in regularly and feature their content on your own channels.',
      ],
    },
    related: ['influencer-marketing', 'micro-influencer', 'employee-advocacy', 'user-generated-content', 'social-proof'],
    faqs: [
      {
        question: 'What is the difference between a brand ambassador and an influencer?',
        answer: ['An influencer partnership is often a single campaign. A brand ambassador represents the brand over a longer period and usually has a deeper, ongoing relationship with it.'],
      },
      {
        question: 'Do brand ambassadors get paid?',
        answer: ['Some do, some receive products, discounts or commission instead. It depends on the program and the person\'s reach.'],
      },
    ],
  },
  {
    slug: 'creator-economy',
    term: 'Creator economy',
    aka: ['creator industry'],
    category: 'social',
    short: 'The creator economy is the industry of independent creators who earn money from content, audiences and brand deals, plus the tools that serve them.',
    definition: [
      "The creator economy is the market built around independent content creators who earn a living from their audiences. It includes YouTubers, TikTokers, streamers, podcasters, newsletter writers and Instagram creators, along with the platforms, brand deals, subscriptions, tips, courses and tools that support them. Creators act as small media businesses of their own.",
      "Creators earn in several ways: platform revenue sharing (such as YouTube's Partner Program), brand sponsorships, affiliate commissions, fan subscriptions and memberships, selling their own products and paid communities. Most rely on a mix rather than one source.",
      "For brands, the creator economy changed how marketing works. Creators are now media channels, production studios and sales partners at once, which is why [influencer marketing](/glossary/influencer-marketing) and [UGC ads](/glossary/ugc-ads) have become standard budget lines.",
    ],
    why: [
      "Audiences increasingly follow people rather than publications. Understanding the creator economy helps a business decide whether to partner with creators, build its own creator-style presence, or both.",
      "It also sets the style audiences expect. Casual, personal, phone-shot video is often what performs on short-form platforms, and businesses that adopt it tend to fit in better than those posting only polished ads.",
    ],
    related: ['influencer-marketing', 'content-creator', 'micro-influencer', 'user-generated-content', 'short-form-video'],
    faqs: [
      {
        question: 'How do creators make money?',
        answer: ['Through platform payouts, brand sponsorships, affiliate links, subscriptions, tips, selling their own products and courses, and licensing their content to brands.'],
      },
      {
        question: 'Can a business be part of the creator economy?',
        answer: ['Yes. A business can work with creators, and its founder or staff can act as creators themselves by posting regular, personal content about their work.'],
      },
    ],
  },
  {
    slug: 'instagram-reels',
    term: 'Instagram Reels',
    aka: ['Reels', 'Instagram Reel', 'Facebook Reels'],
    category: 'social',
    short: 'Instagram Reels are short vertical videos on Instagram, shown in a full-screen feed that recommends them to people who do not follow you.',
    definition: [
      "Instagram Reels are short, vertical, full-screen videos on Instagram, usually with music, voiceover, text and captions. They appear in a dedicated Reels feed, in the main feed, on Explore and on your profile. Reels are Instagram's main format for reaching people who do not follow you yet, because the Reels feed recommends videos from any account.",
      "Reels use a 9:16 [aspect ratio](/glossary/aspect-ratio), typically 1080 by 1920 pixels. Instagram has raised the maximum length several times, and it now allows Reels of up to a few minutes, though most successful Reels are much shorter. The profile grid crops the cover to a portrait shape, and on-screen text should stay inside the [safe zone](/glossary/safe-zone) so buttons and captions do not cover it.",
      "Reels can be shared to Facebook as well, and the same vertical file usually works on TikTok and [YouTube Shorts](/glossary/youtube-shorts), which is why many businesses make one [vertical video](/glossary/vertical-video) for all three.",
    ],
    why: [
      "Reels are often the format with the most [organic reach](/glossary/organic-reach) on Instagram, because they are pushed to non-followers. For a small account, a good Reel can reach far more people than its follower count.",
      "Short video also shows a business in motion: the product being made, used or unboxed, the people behind it and the result a customer gets. That builds familiarity faster than still images.",
    ],
    how: {
      heading: 'How to make an Instagram Reel that gets views',
      steps: [
        'Open with a [hook](/glossary/hook) in the first one to two seconds: movement, a bold line or the end result.',
        'Keep it short and focused on one idea.',
        'Add on-screen captions, since many people watch with the sound off.',
        'Keep important text away from the top, bottom and right edges where buttons sit.',
        'Choose a clear cover image so the Reel looks good in your grid.',
        'End with a simple call to action.',
      ],
    },
    openpromo: {
      body: 'OpenPromo makes 9:16 reels from your brand profile with a hook, voiceover, music, word-by-word captions, a poster thumbnail and an SRT file. The same file works for Reels, TikTok and Shorts.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['youtube-shorts', 'short-form-video', 'vertical-video', 'hook', 'safe-zone', 'trending-audio'],
    faqs: [
      {
        question: 'What size is an Instagram Reel?',
        answer: ['1080 by 1920 pixels, a 9:16 vertical aspect ratio. The profile grid shows a cropped portrait version of the cover, so keep the important part in the center.'],
      },
      {
        question: 'How long can an Instagram Reel be?',
        answer: ['Instagram has extended the limit to a few minutes, and it changes from time to time. Many effective Reels are well under a minute.'],
      },
      {
        question: 'Do Reels get more reach than posts?',
        answer: ['Often, because the Reels feed recommends videos to non-followers. Carousels and photos can still perform well, especially for engagement and saves.'],
      },
    ],
  },
  {
    slug: 'youtube-shorts',
    term: 'YouTube Shorts',
    aka: ['Shorts', 'YouTube Short'],
    category: 'social',
    short: 'YouTube Shorts are vertical videos of up to about three minutes on YouTube, shown in a swipeable Shorts feed alongside long-form videos.',
    definition: [
      "YouTube Shorts are short vertical videos on YouTube, shown in a swipeable full-screen Shorts feed, on channel pages, in search results and on the home page. YouTube currently allows Shorts of up to three minutes in a square or vertical format. They let channels reach new viewers quickly and feed interest into longer videos.",
      "Shorts are typically 1080 by 1920 pixels at a 9:16 [aspect ratio](/glossary/aspect-ratio). They can use licensed music from YouTube's library, link to a related long video and earn money through the Shorts revenue share for channels in the YouTube Partner Program.",
      "Because the format matches [Instagram Reels](/glossary/instagram-reels) and TikTok, many creators post the same [vertical video](/glossary/vertical-video) to all three, adjusting captions and titles for each platform.",
    ],
    why: [
      "YouTube is also a search engine, so Shorts can keep being found long after posting. A Short with a clear title and topic can bring steady views and subscribers.",
      "Shorts are also a low-effort way into YouTube for a business without time for long videos. They can test topics cheaply and point viewers to longer tutorials or product demos.",
    ],
    how: {
      heading: 'How to make a YouTube Short',
      steps: [
        'Film or render a vertical 9:16 video of up to three minutes.',
        'Hook the viewer immediately, since the Shorts feed is easy to swipe.',
        'Write a clear title with the words people would search for.',
        'Add captions and keep text inside the safe zone.',
        'Link a related long video if you have one.',
      ],
    },
    openpromo: {
      body: 'OpenPromo reels are 9:16 MP4 files with captions and an SRT file, ready to upload as YouTube Shorts as well as Reels and TikTok.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['instagram-reels', 'short-form-video', 'vertical-video', 'watch-time', 'thumbnail', 'loop-video'],
    faqs: [
      {
        question: 'How long can a YouTube Short be?',
        answer: ['Up to three minutes, since YouTube extended the limit from 60 seconds in late 2024. Platforms change these limits, so check YouTube\'s current guidance.'],
      },
      {
        question: 'Can I post the same video to Shorts, Reels and TikTok?',
        answer: ['Yes. All three use 9:16 vertical video. Remove watermarks from other apps first, because platforms say they may show watermarked reposts less.'],
      },
    ],
  },
  {
    slug: 'instagram-story',
    term: 'Instagram Story',
    aka: ['Stories', 'Instagram Stories', 'story highlights'],
    category: 'social',
    short: 'An Instagram Story is a full-screen vertical photo or video that disappears after 24 hours, unless saved to a Highlight on your profile.',
    definition: [
      "An Instagram Story is a full-screen vertical photo or short video shared to Instagram that disappears after 24 hours. Stories appear in a row of circles at the top of the app and play one after another. They support stickers for polls, questions, links, countdowns and product tags, which makes them good for quick, casual updates.",
      "Stories use a 9:16 format at 1080 by 1920 pixels, with the top and bottom of the screen covered by the profile name, reply bar and stickers. Keeping text inside a central [safe zone](/glossary/safe-zone) avoids it being hidden. Video Stories are split into segments of up to about a minute each.",
      "Story Highlights let you save Stories permanently on your profile in named collections, such as Menu, Reviews or FAQ. Facebook, WhatsApp and other apps offer similar disappearing formats.",
    ],
    why: [
      "Stories are seen mostly by existing followers, so they are a way to stay top of mind and build a relationship rather than reach new people. Their casual nature suits behind-the-scenes moments, daily specials and quick announcements.",
      "Interactive stickers create direct conversation, and the link sticker gives every account a clickable link, making Stories one of the easiest ways to send followers to a website.",
    ],
    how: {
      heading: 'How to use Instagram Stories for business',
      steps: [
        'Post a few Stories most days to stay visible at the top of followers\' apps.',
        'Use polls and question stickers to start conversations.',
        'Add a link sticker when you want people to visit a page.',
        'Keep text in the middle of the frame, away from the top and bottom bars.',
        'Save your most useful Stories to Highlights such as Reviews, Prices or How to book.',
      ],
    },
    openpromo: {
      body: 'OpenPromo renders posts in the 9:16 story format (1080 by 1920) as well as square and portrait, from the same brand profile.',
      href: '/features/instagram-post-generator',
      label: 'See the Instagram post generator',
    },
    related: ['instagram-story-size', 'instagram-reels', 'safe-zone', 'vertical-video', 'link-in-bio', 'community-management'],
    faqs: [
      {
        question: 'How long do Instagram Stories last?',
        answer: ['24 hours, unless you add them to a Highlight on your profile, where they stay until you remove them. Archived Stories stay visible to you privately.'],
      },
      {
        question: 'What are Story Highlights?',
        answer: ['Collections of past Stories saved on your profile below the bio. Businesses use them for menus, prices, reviews, FAQs and how-to guides.'],
      },
    ],
  },
  {
    slug: 'carousel-post',
    term: 'Carousel post',
    aka: ['Instagram carousel', 'LinkedIn carousel', 'swipe post', 'document post'],
    category: 'social',
    short: 'A carousel post is a single social post with several images or videos that viewers swipe through, often used for tips, steps and stories.',
    definition: [
      "A carousel post is a single social media post that contains several images or videos people swipe through, one slide at a time. Instagram allows up to 20 slides per carousel. On LinkedIn, carousels are often uploaded as a PDF document post. Carousels suit content with steps, lists, comparisons, before-and-after stories and product ranges.",
      "Instagram carousels can be square (1:1) or portrait (4:5), and every slide in one post uses the same shape. A LinkedIn carousel is usually a PDF where each page is a slide, displayed as a swipeable document. TikTok also offers photo carousels with music.",
      "A good carousel works like a short story: the first slide is the [hook](/glossary/hook) that earns the swipe, the middle slides deliver one point each, and the last slide gives the [call to action](/glossary/call-to-action).",
    ],
    why: [
      "Carousels hold attention longer than a single image, and their swipeable, useful format makes them popular to save and share. Instagram may also show a carousel again with a later slide to people who did not swipe the first time.",
      "They are also an efficient way to teach. A tip list, a short guide or a set of products fits naturally into slides, which makes carousels a strong format for [content pillars](/glossary/content-pillars) like education and proof.",
    ],
    how: {
      heading: 'How to make a carousel post',
      steps: [
        'Pick one idea that breaks into steps or points.',
        'Write a first slide that promises a clear payoff, such as 5 mistakes new runners make.',
        'Give each middle slide one point, with large readable text.',
        'Keep the same fonts, colors and layout across slides so it reads as one piece.',
        'End with a slide asking people to save, share or visit your link.',
        'Export as images for Instagram and as a PDF for LinkedIn.',
      ],
    },
    openpromo: {
      body: 'OpenPromo makes carousels from your brand profile: a hook slide, one point per slide and a call to action, rendered as PNG slides for Instagram and a PDF for a LinkedIn document post.',
      href: '/features/carousel-maker',
      label: 'See the carousel maker',
    },
    related: ['instagram-post-size', 'hook', 'content-pillars', 'call-to-action', 'instagram-grid', 'engagement'],
    faqs: [
      {
        question: 'How many slides can an Instagram carousel have?',
        answer: ['Up to 20 photos or videos per post, after Instagram raised the limit from 10. Most carousels work well with 5 to 10 slides.'],
      },
      {
        question: 'What size should carousel slides be?',
        answer: ['1080 by 1080 pixels for square or 1080 by 1350 for portrait. Portrait takes up more screen space in the feed. All slides in one post share the same shape.'],
      },
      {
        question: 'How do I post a carousel on LinkedIn?',
        answer: ['Export your slides as a PDF and upload it as a document post. LinkedIn shows each page as a swipeable slide.'],
      },
    ],
  },
  {
    slug: 'tiktok-stitch',
    term: 'TikTok Stitch',
    aka: ['Stitch', 'stitch video'],
    category: 'social',
    short: 'A TikTok Stitch clips a few seconds of another person\'s video and plays it before your own, so you can react, answer or continue it.',
    definition: [
      "A TikTok Stitch is a feature that lets you take a short clip of up to five seconds from another person's TikTok and place it at the start of your own video. The original clip plays first, then your response follows. Stitches are used to answer questions, react to claims, add expertise or continue a trend.",
      "Stitch differs from a [Duet](/glossary/tiktok-duet), which shows your video side by side with the original as it plays. A Stitch plays the clips in sequence, so your video gets the full screen after the borrowed moment.",
      "Creators can turn Stitch off for their own videos, and the stitched video credits and links to the original creator. Instagram and YouTube offer similar remix and reply features.",
    ],
    why: [
      "Stitches let a business join conversations already happening on the platform. Answering a popular question or myth in your niche puts your expertise in front of people already interested in the topic.",
      "They are also an easy content idea when you are stuck: find a common customer question in a video and answer it with a Stitch.",
    ],
    how: {
      heading: 'How to stitch on TikTok',
      steps: [
        'Find a video with a question or claim relevant to your business.',
        'Tap Share, then Stitch (if the creator allows it).',
        'Trim the clip to the moment you want, up to five seconds.',
        'Record your reply, adding captions and text.',
        'Post with a caption that explains your answer.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A bike shop stitches a clip of someone asking whether expensive tires are worth it, then a mechanic explains in 30 seconds when they make a difference and when they do not.',
    },
    related: ['tiktok-duet', 'instagram-remix', 'trending-audio', 'short-form-video', 'user-generated-content'],
    faqs: [
      {
        question: 'What is the difference between a Stitch and a Duet?',
        answer: ['A Stitch plays a short clip of the original video first, then your video. A Duet shows your video next to the original at the same time.'],
      },
      {
        question: 'Can I stop people stitching my videos?',
        answer: ['Yes. TikTok lets you turn off Stitch for all your videos in privacy settings or for a single video when you post it.'],
      },
    ],
  },
  {
    slug: 'tiktok-duet',
    term: 'TikTok Duet',
    aka: ['Duet', 'duet video'],
    category: 'social',
    short: 'A TikTok Duet puts your video side by side with someone else\'s as it plays, so you can react, sing along, compare or collaborate.',
    definition: [
      "A TikTok Duet is a feature that places your video next to another creator's video so both play at the same time. It is used for reactions, sing-alongs, side-by-side comparisons, tutorials and collaborations. The original creator is credited and linked, and the audio from their video plays with yours unless you change the mix.",
      "Duets come in several layouts, including side by side, top and bottom, and picture in picture. Unlike a [Stitch](/glossary/tiktok-stitch), which plays a short clip of the original before your video, a Duet keeps both visible for the whole length.",
      "Creators can turn off Duets on their videos. Instagram's [Remix](/glossary/instagram-remix) feature works in a similar way for Reels.",
    ],
    why: [
      "Duets put a business next to popular content in its niche, borrowing some of that attention. They suit live reactions, demonstrations and showing a product doing what someone in the original video was struggling with.",
      "They also invite participation. A business can post a video designed to be dueted, such as a challenge or a sing-along, and let customers create the content.",
    ],
    how: {
      heading: 'How to duet on TikTok',
      steps: [
        'Open the video you want to duet and tap Share.',
        'Choose Duet and pick a layout.',
        'Record your part while the original plays.',
        'Adjust volume levels so both can be heard if needed.',
        'Add captions and post.',
      ],
    },
    related: ['tiktok-stitch', 'instagram-remix', 'collab-post', 'trending-audio', 'short-form-video'],
    faqs: [
      {
        question: 'Does a Duet credit the original creator?',
        answer: ['Yes. TikTok tags the original creator and links to their video in your Duet.'],
      },
      {
        question: 'Why can I not duet a video?',
        answer: ['The creator may have turned Duets off, the account may be private, or the video may use audio that cannot be reused.'],
      },
    ],
  },
  {
    slug: 'instagram-remix',
    term: 'Instagram Remix',
    aka: ['Remix', 'Reels Remix'],
    category: 'social',
    short: 'Instagram Remix lets you create a Reel alongside or after another person\'s Reel, to react, respond, compare or build on it.',
    definition: [
      "Instagram Remix is a feature that lets you make a new Reel using another person's Reel. You can play your video side by side with the original, show it as a picture in picture, use it as a green-screen background or add your clip after theirs. It is Instagram's answer to TikTok's [Duet](/glossary/tiktok-duet) and [Stitch](/glossary/tiktok-stitch).",
      "The remixed Reel credits the original creator. Accounts can turn remixing on or off for their content, and the available layouts change as Instagram updates the feature.",
      "Remix also covers a sequential mode, where your clip plays after the original, which works much like a Stitch.",
    ],
    why: [
      "Remixing puts your brand into existing conversations on Instagram. Reacting to a relevant Reel or answering a common question with a Remix shows expertise and can reach the original Reel's audience.",
      "It is also a low-effort content format. You do not need a fully original idea, just a useful or entertaining response.",
    ],
    how: {
      heading: 'How to remix a Reel on Instagram',
      steps: [
        'Open the Reel and tap the share or more menu.',
        'Choose Remix and pick a layout.',
        'Record or upload your part.',
        'Add text, captions and audio adjustments.',
        'Post it as a Reel with a caption.',
      ],
    },
    related: ['tiktok-duet', 'tiktok-stitch', 'instagram-reels', 'collab-post', 'trending-audio'],
    faqs: [
      {
        question: 'Can anyone remix my Reels?',
        answer: ['Only if remixing is allowed. You can turn it off for all your Reels in settings or for individual Reels.'],
      },
      {
        question: 'Is Instagram Remix the same as a TikTok Duet?',
        answer: ['It is similar. Remix includes side-by-side layouts like a Duet and a sequential mode like a Stitch.'],
      },
    ],
  },
  {
    slug: 'collab-post',
    term: 'Collab post',
    aka: ['Instagram Collab', 'collaborative post', 'co-authored post'],
    category: 'social',
    short: 'A collab post is one Instagram post or Reel shared by two or more accounts, appearing on each profile with combined likes and comments.',
    definition: [
      "A collab post is an Instagram post, carousel or Reel co-authored by two or more accounts. One account creates it and invites the others; once accepted, it appears on every collaborator's profile and in their followers' feeds, showing all names at the top. Likes, comments and views are shared and counted once.",
      "Collabs are common between brands and creators, between two complementary businesses, and between a business and a customer or partner. Because the post shows up for both audiences, each account can reach people who follow the other.",
      "Paid creator collabs should still use the paid partnership label, since a collab post on its own does not count as a sponsorship disclosure.",
    ],
    why: [
      "A collab post is one of the simplest ways to reach a new, relevant audience on Instagram. Two small businesses with overlapping customers can share each other's followers without spending money on ads.",
      "Combined engagement also helps the post perform, because comments and likes from both audiences add up on a single post.",
    ],
    how: {
      heading: 'How to make a collab post on Instagram',
      steps: [
        'Agree the idea and the content with your partner first.',
        'Create the post or Reel as usual.',
        'Before sharing, tap Tag people, then Invite collaborator, and choose the account.',
        'Share it. It appears on their profile once they accept.',
        'Reply to comments from both audiences.',
      ],
    },
    example: {
      label: 'Example',
      body: 'Crumb & Co bakery and a nearby coffee roaster post a joint Reel about pairing their pastries with a new single-origin coffee. It appears on both profiles, and each business picks up followers from the other.',
    },
    related: ['influencer-marketing', 'instagram-reels', 'organic-reach', 'tiktok-duet', 'brand-ambassador'],
    faqs: [
      {
        question: 'How many collaborators can an Instagram post have?',
        answer: ['Instagram has raised the limit over time and now allows several collaborators per post. Check the current number in the app, as it changes.'],
      },
      {
        question: 'Do both accounts get the likes on a collab post?',
        answer: ['Yes. It is one post shown on each profile, so likes, comments and views are shared.'],
      },
    ],
  },
  {
    slug: 'pinned-post',
    term: 'Pinned post',
    aka: ['pinned tweet', 'pinned comment', 'pin to profile'],
    category: 'social',
    short: 'A pinned post is a post fixed to the top of your profile or feed so visitors see it first, no matter how many newer posts you share.',
    definition: [
      "A pinned post is a post fixed to the top of a social profile so it stays there even as newer posts are added. Instagram lets you pin up to three posts or Reels to the top of your grid, TikTok lets you pin a few videos, and X, Facebook and LinkedIn allow pinning or featuring posts too.",
      "You can also pin comments on many platforms, which keeps a chosen comment, such as an answer to a common question or a link reminder, at the top of the comment section.",
      "Pinned posts act like a shop window for new visitors. Someone arriving at your profile from a Reel or a search sees them before anything else.",
    ],
    why: [
      "Most people decide whether to follow an account within a few seconds of landing on its profile. Pinned posts let you control what they see first: who you are, what you sell, your best proof or a current offer.",
      "They also give your strongest content a longer life. A Reel that explains your business or a carousel of reviews keeps working long after it would have scrolled out of view.",
    ],
    how: {
      heading: 'How to choose posts to pin',
      steps: [
        'Pin one post that explains who you are and what you offer.',
        'Pin one piece of proof: reviews, results or a customer story.',
        'Pin one timely post, such as a current offer or launch, and swap it when things change.',
        'Check that the covers look clear and consistent at grid size.',
      ],
    },
    related: ['instagram-grid', 'link-in-bio', 'evergreen-content', 'social-proof', 'instagram-reels'],
    faqs: [
      {
        question: 'How many posts can I pin on Instagram?',
        answer: ['Up to three posts or Reels at the top of your profile grid.'],
      },
      {
        question: 'What should I pin on my profile?',
        answer: ['An introduction to your business, your best social proof and a current offer or popular post. Update them every few months.'],
      },
    ],
  },
  {
    slug: 'instagram-grid',
    term: 'Instagram grid',
    aka: ['grid layout', 'feed aesthetic', 'profile grid', 'Instagram feed layout'],
    category: 'social',
    short: 'The Instagram grid is the layout of post thumbnails on your profile. A consistent grid helps visitors understand your brand at a glance.',
    definition: [
      "The Instagram grid is the layout of post and Reel thumbnails shown on an Instagram profile, displayed in rows of three. It is often the first impression a visitor gets of a business, so many brands plan it for a consistent look: shared colors, fonts, styles and a mix of content types that reads as one brand.",
      "In 2025 Instagram switched profile grids from square thumbnails to taller portrait thumbnails, close to 4:5 (some sources cite 3:4). Square posts are cropped at the sides on the grid, while portrait 4:5 posts fit it more closely. Reel covers are also cropped, so the important part should sit in the middle.",
      "Some brands plan elaborate grids where several posts form one larger image. Most businesses do better with simple consistency: the same [brand colors](/glossary/brand-colors), [typography](/glossary/typography) and photo style, which supports [brand recognition](/glossary/brand-recognition).",
    ],
    why: [
      "When someone taps through to your profile, the grid tells them in seconds what you do and whether you look trustworthy. A messy, inconsistent grid can lose a follower who liked the post that brought them there.",
      "A consistent look also helps people recognize your posts in their feed before they see your name.",
    ],
    how: {
      heading: 'How to plan an Instagram grid',
      steps: [
        'Pick a small set of brand colors and fonts and use them on every graphic.',
        'Use portrait 4:5 images where possible, since they fit the current grid.',
        'Keep text and faces in the center so grid cropping does not cut them.',
        'Alternate content types: photos, graphics, carousels and Reels.',
        'Preview new posts next to your recent ones before publishing.',
      ],
    },
    openpromo: {
      body: 'OpenPromo renders square and portrait posts in your brand fonts and colors from one brand profile, so every post shares the same look.',
      href: '/features/instagram-post-generator',
      label: 'See the Instagram post generator',
    },
    related: ['instagram-post-size', 'brand-consistency', 'visual-identity', 'pinned-post', 'carousel-post', 'brand-colors'],
    faqs: [
      {
        question: 'What size are Instagram grid thumbnails?',
        answer: ['Since 2025 the grid shows taller portrait thumbnails, close to 4:5 (some sources cite 3:4). Square posts are cropped on the grid, so 1080 by 1350 posts fit best. Instagram may change this again.'],
      },
      {
        question: 'Does a consistent grid matter?',
        answer: ['It helps first impressions and recognition, but content quality still matters more. Aim for a recognizable style rather than a perfect pattern.'],
      },
    ],
  },
  {
    slug: 'trending-audio',
    term: 'Trending audio',
    aka: ['trending sounds', 'trending songs', 'viral sounds'],
    category: 'social',
    short: 'Trending audio is a song, sound or voice clip being used in many short videos at once, which can help new videos get discovered.',
    definition: [
      "Trending audio is a song, sound effect or voice clip that many creators are using in their short videos at the same time on platforms like TikTok, Instagram Reels and YouTube Shorts. Platforms let you tap a sound to see every video that uses it, and they often mark rising sounds with a trending label or arrow.",
      "Trends can be a popular song, a line from a show, a voice memo someone recorded or a format tied to a sound. Many trends last only days or weeks, so timing matters. Using a sound early in its rise tends to help more than joining once it is everywhere.",
      "Businesses need to watch music rights. Business accounts usually have access only to commercially licensed music libraries, such as TikTok's Commercial Music Library or Meta's sound collection, and using popular songs in ads or branded content without a license can break platform rules and copyright law.",
    ],
    why: [
      "A trending sound gives a video a ready-made reason to be shown: people engaging with that sound may see your video too. It can be a shortcut to [organic reach](/glossary/organic-reach) for a small account.",
      "Trends also give you content ideas that already fit the platform's culture. The key is relevance: a trend that connects to your business works much better than one forced onto it.",
    ],
    how: {
      heading: 'How to find trending audio on Instagram and TikTok',
      steps: [
        'Scroll Reels or the For You feed and note sounds that appear repeatedly.',
        'Look for the trending arrow or label on sounds in the audio browser.',
        'Check TikTok\'s Creative Center for trending sounds by region.',
        'On business accounts, pick sounds from the commercial music library.',
        'Adapt the trend to your business, then post while it is still rising.',
      ],
    },
    related: ['instagram-reels', 'viral-video', 'royalty-free-music', 'short-form-video', 'social-media-algorithm'],
    faqs: [
      {
        question: 'Can businesses use trending songs on TikTok and Instagram?',
        answer: ['Business accounts are usually limited to commercially licensed music. Popular chart songs are often unavailable for business use, so check the commercial library.'],
      },
      {
        question: 'Does trending audio boost reach?',
        answer: ['It can help a video be discovered by people browsing that sound, but the video still needs to hold attention. A weak video with a trending sound rarely goes far.'],
      },
    ],
  },
  {
    slug: 'viral-video',
    term: 'Viral video',
    aka: ['virality', 'going viral'],
    category: 'social',
    short: 'A viral video spreads quickly and widely as people share it and platforms recommend it, reaching far beyond the creator\'s usual audience.',
    definition: [
      "A viral video is a video that spreads rapidly and widely online, as viewers share it and platforms recommend it to more and more people. It reaches far more people than the creator's usual audience, often in a matter of days. There is no fixed view count; going viral is relative to an account's normal reach.",
      "Virality on modern platforms is driven largely by recommendation feeds. When a video keeps viewers watching, rewatching, sharing and commenting, the [social media algorithm](/glossary/social-media-algorithm) shows it to larger groups, which can snowball. Shares, especially private sends to friends, are one of the strongest drivers.",
      "Viral videos are hard to plan. They tend to share qualities, such as a strong [hook](/glossary/hook), emotion, surprise, humor, usefulness or relatability, but even experienced creators cannot predict which video will take off.",
    ],
    why: [
      "A viral video can bring a flood of new followers, website visits and sales almost overnight, and it can put a small business on the map in its niche.",
      "Chasing virality is risky as a strategy, though. Views from a viral video may not match your customers, and the spike fades. Consistent, useful content usually builds a business more reliably than waiting for one hit.",
    ],
    how: {
      heading: 'How to improve your chances of a viral video',
      steps: [
        'Grab attention in the first second with motion, a question or a surprising claim.',
        'Make it short and rewatchable, with no slow start.',
        'Give people a reason to share: it is funny, useful, surprising or says something they feel.',
        'Post often, since more attempts mean more chances.',
        'Be ready to follow up quickly if a video takes off.',
      ],
    },
    related: ['social-media-algorithm', 'hook', 'trending-audio', 'audience-retention', 'short-form-video', 'newsjacking'],
    faqs: [
      {
        question: 'How many views is considered viral?',
        answer: ['There is no official number. A video is usually called viral when it gets far more views than the account normally does and keeps spreading through shares and recommendations.'],
      },
      {
        question: 'Can you make a video go viral on purpose?',
        answer: ['You can improve the odds with a strong hook, a share-worthy idea and good timing, but no one can guarantee it. Consistency matters more than chasing one hit.'],
      },
    ],
  },
  {
    slug: 'evergreen-content',
    term: 'Evergreen content',
    aka: ['evergreen post', 'timeless content'],
    category: 'social',
    short: 'Evergreen content stays relevant and useful long after it is published, such as how-to guides, FAQs and tips, unlike news or trend posts.',
    definition: [
      "Evergreen content is content that stays relevant and useful for a long time after it is published, rather than tying itself to news, a trend or a date. Examples include how-to guides, tips, answers to common questions, explainers and product tutorials. Like an evergreen tree, it keeps its value season after season.",
      "Its opposite is timely content: news, trend posts, holiday promotions and event updates. Both have a place. Timely content can create quick spikes of attention, while evergreen content keeps bringing in views, saves and search traffic over months or years.",
      "Evergreen content is ideal for [content repurposing](/glossary/content-repurposing). A good guide can become a carousel, a Reel, a pinned post and a blog article, then be reposted later with little change.",
    ],
    why: [
      "Evergreen posts keep working without extra effort. A useful Reel or carousel can keep being found through search, shares and profile visits long after posting, which makes it efficient for small teams.",
      "It also builds authority. A library of reliable, practical answers shows customers you know your subject and gives you material to point them to when they ask.",
    ],
    how: {
      heading: 'How to create evergreen content',
      steps: [
        'Collect the questions customers ask again and again.',
        'Answer each one clearly, without dates or references that will age.',
        'Turn each answer into several formats: a carousel, a short video and a caption.',
        'Pin or highlight the most useful pieces.',
        'Review once or twice a year and update details that change.',
      ],
    },
    example: {
      label: 'Evergreen vs timely',
      body: 'For a bike shop, "How to fix a flat tire" is evergreen and can be reposted every spring. "Our Black Friday sale ends tonight" is timely and useful for only a day.',
    },
    related: ['content-repurposing', 'content-pillars', 'pinned-post', 'content-calendar', 'tutorial-video', 'content-marketing'],
    faqs: [
      {
        question: 'What are examples of evergreen content?',
        answer: ['How-to guides, beginner tips, FAQs, product tutorials, checklists, glossaries and explainers of common problems in your industry.'],
      },
      {
        question: 'Can social media posts be evergreen?',
        answer: ['Yes. Tips, tutorials and answers to common questions stay useful, and you can repost or repurpose them later.'],
      },
    ],
  },
  {
    slug: 'social-listening',
    term: 'Social listening',
    aka: ['social media listening', 'social monitoring', 'brand monitoring'],
    category: 'social',
    short: 'Social listening is tracking what people say online about your brand, competitors and industry, then using it to improve products and content.',
    definition: [
      "Social listening is the practice of tracking conversations online about your brand, products, competitors and industry, then analyzing them to find insights and act on them. It goes beyond replying to tags and mentions: it looks at keywords, hashtags, sentiment and trends across social platforms, forums, reviews and news to understand what people really think.",
      "It is often split into two parts. Social monitoring is the reactive part: spotting mentions and replying to questions or complaints. Social listening is the analytical part: finding patterns, such as recurring complaints, rising topics or how sentiment shifts after a launch.",
      "Tools can automate the search across platforms, but a small business can start manually by searching its name, product terms and competitors on each platform every week.",
    ],
    why: [
      "Customers often say more to each other than they say to a brand directly. Listening shows what they love, what frustrates them and the exact words they use, which can shape products, [ad copy](/glossary/ad-copy) and content.",
      "It also helps you catch problems early and measure your [share of voice](/glossary/share-of-voice) against competitors.",
    ],
    how: {
      heading: 'How to start social listening',
      steps: [
        'List what to track: your brand name and misspellings, products, competitors and industry terms.',
        'Search those terms on each platform, in reviews and in relevant forums every week.',
        'Note recurring questions, complaints, praise and content ideas.',
        'Respond to direct mentions quickly through [community management](/glossary/community-management).',
        'Share monthly insights with the people who make products and content.',
      ],
    },
    related: ['community-management', 'share-of-voice', 'dark-social', 'pain-points', 'social-media-audit', 'hashtag'],
    faqs: [
      {
        question: 'What is the difference between social listening and social monitoring?',
        answer: ['Monitoring tracks and responds to individual mentions. Listening analyzes the wider conversation to find trends and insights that guide decisions.'],
      },
      {
        question: 'Do I need a tool for social listening?',
        answer: ['Not at first. Regular manual searches work for small businesses. Tools help when the volume of mentions grows or you want to track many platforms at once.'],
      },
    ],
  },
  {
    slug: 'community-management',
    term: 'Community management',
    aka: ['social media community management', 'online community management'],
    category: 'social',
    short: 'Community management is engaging with your audience on social media: replying to comments and messages, moderating and building relationships.',
    definition: [
      "Community management is the work of building and looking after relationships with your audience on social media and in online communities. It includes replying to comments and direct messages, answering questions, welcoming new followers, moderating spam and abuse, handling complaints and encouraging conversation among members. It turns an audience into a community.",
      "It overlaps with customer service but has a different focus. Customer service solves individual problems. Community management also shapes the tone of the space, highlights members, gathers feedback and creates reasons for people to talk to each other.",
      "Communities can live on public profiles, in Facebook Groups, Discord servers, LinkedIn groups, broadcast channels or a brand's own forum.",
    ],
    why: [
      "Replies matter. People notice when a brand answers quickly and kindly, and so do onlookers reading the thread. Active conversation also tends to boost [engagement](/glossary/engagement), which helps posts reach more people.",
      "A strong community becomes a source of [social proof](/glossary/social-proof), user content, product ideas and loyal customers who recommend you to others.",
    ],
    how: {
      heading: 'How to manage a social media community',
      steps: [
        'Set a target response time and check comments and messages at least daily.',
        'Write short reply guidelines in your [brand voice](/glossary/brand-voice).',
        'Move private issues to direct messages and solve them there.',
        'Hide or remove spam and abuse, and publish simple community rules.',
        'Highlight members and their posts regularly.',
      ],
    },
    related: ['engagement', 'social-listening', 'brand-voice', 'social-media-manager', 'user-generated-content'],
    faqs: [
      {
        question: 'What does a community manager do?',
        answer: ['They reply to comments and messages, moderate discussions, start conversations, gather feedback and build relationships with followers and customers.'],
      },
      {
        question: 'Should I reply to every comment?',
        answer: ['Reply to as many genuine comments as you can, especially questions and complaints. Not every emoji needs a reply, but conversation is part of why people follow brands.'],
      },
    ],
  },
  {
    slug: 'share-of-voice',
    term: 'Share of voice (SOV)',
    aka: ['SOV', 'social share of voice'],
    category: 'social',
    short: 'Share of voice (SOV) is how much of the conversation or ad space in your market your brand owns compared with competitors, as a percentage.',
    definition: [
      "Share of voice (SOV) is a measure of how visible your brand is in its market compared with competitors. In social media it usually means your share of all online mentions in your category. In advertising it means your share of total ad spend or impressions. It is expressed as a percentage of the total for your market.",
      "Social share of voice is calculated by counting mentions of your brand and of each competitor over a period, then dividing yours by the total. Some teams weight it by sentiment, because a spike of complaints raises mentions without helping the brand.",
      "SOV is related to [brand awareness](/glossary/brand-awareness): brands with a larger share of voice tend to be thought of first. It is a comparative metric, so it only makes sense alongside the competitors you choose to track.",
    ],
    why: [
      "Share of voice shows whether your brand is gaining or losing attention in its market, not just whether your own numbers went up. Your mentions can grow while your share falls if competitors grow faster.",
      "It also helps set budgets and judge campaigns. A launch or creator campaign that lifts your share of voice is gaining ground on competitors.",
    ],
    how: {
      heading: 'How to calculate share of voice',
      steps: [
        'Choose your competitors and a time period.',
        'Count mentions of your brand and each competitor across the platforms you track.',
        'Divide your mentions by the total mentions of all brands.',
        'Multiply by 100 for a percentage.',
        'Track it monthly and note what caused changes.',
      ],
    },
    example: {
      label: 'Share of voice formula',
      code: 'Share of voice = your brand mentions / total mentions (you + competitors) x 100\n\nExample: 300 / (300 + 500 + 200) x 100 = 30%',
    },
    related: ['social-listening', 'brand-awareness', 'impressions', 'social-media-audit', 'reach'],
    faqs: [
      {
        question: 'What is a good share of voice?',
        answer: ['It depends on how many competitors you have and your size. Track your own trend over time and compare with the brands you most directly compete with.'],
      },
      {
        question: 'How do I measure social share of voice?',
        answer: ['Count mentions of your brand and competitors on social platforms for the same period, either manually or with a listening tool, and divide yours by the total.'],
      },
    ],
  },
  {
    slug: 'social-commerce',
    term: 'Social commerce',
    aka: ['shoppable posts', 'social shopping', 'Instagram Shopping', 'TikTok Shop'],
    category: 'social',
    short: 'Social commerce is selling products directly inside social platforms, through shoppable posts, product tags, live shopping and in-app checkout.',
    definition: [
      "Social commerce is buying and selling products directly within social media platforms, without the customer leaving the app or with only a short step to the store. It includes shoppable posts with product tags, in-app shops, live shopping streams, creator affiliate links and checkout features such as TikTok Shop and Instagram's shopping tools.",
      "It differs from using social media to send traffic to a website. In social commerce, discovery and purchase happen together: someone sees a product in a video, taps a tag and buys it. Features and availability vary by platform and country, and platforms change them often.",
      "Creators play a big part. Affiliate programs let creators tag products and earn a commission, which makes [influencer marketing](/glossary/influencer-marketing) and [user-generated content](/glossary/user-generated-content) key drivers of social sales.",
    ],
    why: [
      "Every extra step between seeing a product and buying it loses customers. Social commerce shortens that path, which can lift [conversion rate](/glossary/conversion-rate), especially for impulse-friendly products.",
      "It also meets shoppers where they already discover products. For many people, short video feeds have become a place to find things to buy.",
    ],
    how: {
      heading: 'How to start selling on social media',
      steps: [
        'Check which shopping features are available on your platforms in your country.',
        'Connect your product catalog through the platform or your ecommerce provider.',
        'Tag products in posts, Reels and Stories.',
        'Show products in use in short videos rather than only catalog photos.',
        'Consider creator affiliates to extend reach.',
      ],
    },
    related: ['link-in-bio', 'influencer-marketing', 'conversion-rate', 'user-generated-content', 'paid-social'],
    faqs: [
      {
        question: 'What is an example of social commerce?',
        answer: ['A shopper sees a short video of a product, taps a product tag and checks out in the app, or buys during a live shopping stream.'],
      },
      {
        question: 'Is social commerce right for every business?',
        answer: ['It suits physical products with visual appeal and a simple purchase. Services and high-consideration products usually still need a website, a booking page or a sales conversation.'],
      },
    ],
  },
  {
    slug: 'dark-social',
    term: 'Dark social',
    aka: ['private sharing', 'dark traffic'],
    category: 'social',
    short: 'Dark social is sharing that happens in private channels like DMs, messaging apps and email, which analytics tools cannot easily track.',
    definition: [
      "Dark social is the sharing of content through private channels that analytics tools cannot easily trace, such as direct messages, WhatsApp, Messenger, text messages, Slack and email. When someone copies a link and sends it to a friend, the resulting visit often shows up in analytics as direct traffic with no clear source.",
      "The term was coined in the early 2010s, and the trend has grown since as more sharing moved from public feeds to private messages. Platforms now show some of this activity inside their own analytics, for example as shares or sends of a post, but where those shares lead is often invisible.",
      "Dark social is not secret or harmful. It is simply word of mouth that happens out of sight, and it is often the most trusted kind, because people send things to friends they know will care.",
    ],
    why: [
      "If you only count what you can track, you may undervalue social media. Many customers discover a brand when a friend sends them a post, then visit later by typing the URL or searching your name.",
      "Knowing this changes what you make. Content people want to send privately, such as useful tips, funny moments and things a friend needs, can drive more business than content that only collects likes.",
    ],
    how: {
      heading: 'How to measure dark social',
      steps: [
        'Watch post shares and sends in each platform\'s analytics.',
        'Add tracking parameters to links you share so some private shares keep their source.',
        'Ask new customers how they heard about you, with an option like A friend sent it to me.',
        'Look at spikes in direct traffic and branded search after a post performs well.',
      ],
    },
    related: ['social-listening', 'engagement', 'organic-reach', 'social-media-audit', 'brand-awareness'],
    faqs: [
      {
        question: 'Why is it called dark social?',
        answer: ['Because the sharing happens in private channels that are dark to analytics: you cannot see who shared, where or with whom.'],
      },
      {
        question: 'Can you track dark social?',
        answer: ['Partly. Platform share counts, tagged links and asking customers how they found you all help, but some private sharing will always be invisible.'],
      },
    ],
  },
  {
    slug: 'social-media-audit',
    term: 'Social media audit',
    aka: ['social media review', 'social audit'],
    category: 'social',
    short: 'A social media audit reviews every social profile, its content and its results to see what works, what does not and what to change.',
    definition: [
      "A social media audit is a structured review of a business's social media accounts, content and results. It checks each profile's details and branding, looks at what has been posted and how it performed, compares the results with goals and competitors, and ends with a short list of changes. Most businesses audit once or twice a year.",
      "An audit usually covers profile basics (names, bios, links, images), [brand consistency](/glossary/brand-consistency) across platforms, posting frequency, top and bottom performing posts, audience demographics, [engagement rate](/glossary/engagement-rate), [reach](/glossary/reach), traffic to the website and how competitors are doing.",
      "It is also a good time to find forgotten or duplicate accounts, outdated links and profiles that no longer match the business.",
    ],
    why: [
      "Without a review, social media runs on habit. An audit shows which platforms and formats actually bring results, so you can stop spending time on what does not work and do more of what does.",
      "It also fixes small problems that cost customers, such as a broken bio link, an old phone number or a profile picture that does not match the current brand.",
    ],
    how: {
      heading: 'How to do a social media audit',
      steps: [
        'List every account the business has, including old ones.',
        'Check each profile: name, handle, bio, link, profile image and cover.',
        'Pull the last three to six months of results and find the top and bottom posts.',
        'Compare engagement, reach and clicks by platform and format.',
        'Look at two or three competitors for gaps and ideas.',
        'Write three to five changes and set a date to review them.',
      ],
    },
    openpromo: {
      body: 'OpenPromo builds a brand profile from your website, with colors, fonts, logo and voice, which you can use as a reference when checking profiles for consistency.',
      href: '/features/brand-kit-generator',
      label: 'See the brand kit generator',
    },
    related: ['engagement-rate', 'brand-consistency', 'share-of-voice', 'social-media-manager', 'content-strategy', 'reach'],
    faqs: [
      {
        question: 'How often should you do a social media audit?',
        answer: ['Once or twice a year for a full audit, with a lighter monthly check of key numbers.'],
      },
      {
        question: 'What should a social media audit include?',
        answer: ['Profile details, branding, posting frequency, top and bottom posts, engagement, reach, website traffic, audience data and a competitor comparison, ending with clear actions.'],
      },
    ],
  },
  {
    slug: 'employee-advocacy',
    term: 'Employee advocacy',
    aka: ['employee advocacy program', 'staff advocacy'],
    category: 'social',
    short: 'Employee advocacy is staff sharing and promoting their company\'s content and story on their own social accounts, especially LinkedIn.',
    definition: [
      "Employee advocacy is when a company's employees promote the business on their own social media accounts by sharing company posts, writing about their work, celebrating launches and explaining what the company does. It is common on LinkedIn, where personal profiles often reach more people than company pages, and it works best when it is voluntary and genuine.",
      "Programs range from informal encouragement to structured setups with a library of ready-to-share posts, suggested captions and recognition for active employees. The most effective advocacy usually comes from people writing in their own words about their own work, rather than reposting identical copy.",
      "It ties into [thought leadership](/glossary/thought-leadership) when founders and experts share opinions and lessons, and into recruiting when staff show what it is like to work there.",
    ],
    why: [
      "People trust people more than logos. Posts from employees reach their personal networks, which are often larger and more engaged than the company page's followers, and they come across as more credible.",
      "Advocacy also helps hiring and sales. Candidates see real people enjoying their work, and buyers see the experts behind the product.",
    ],
    how: {
      heading: 'How to start an employee advocacy program',
      steps: [
        'Make it optional and explain why it helps the company and the employee.',
        'Write simple guidelines on what can and cannot be shared.',
        'Share a regular list of posts and story ideas employees can use or adapt.',
        'Encourage personal angles: what they worked on, learned or are proud of.',
        'Recognize and thank active advocates.',
      ],
    },
    related: ['brand-ambassador', 'thought-leadership', 'social-media-marketing', 'organic-reach', 'social-proof'],
    faqs: [
      {
        question: 'Why is employee advocacy important?',
        answer: ['Employees\' personal networks often reach more people than company pages, and their posts are trusted more because they come from real people.'],
      },
      {
        question: 'Should employees be required to post about their company?',
        answer: ['No. Forced advocacy reads as forced. Make it optional, easy and rewarding, and let people use their own voice.'],
      },
    ],
  },
];
