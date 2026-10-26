import type { GlossaryTerm } from './types';

export const terms: GlossaryTerm[] = [
  {
    slug: 'generative-ai',
    term: 'Generative AI',
    aka: ['GenAI', 'gen AI'],
    category: 'ai',
    short: 'Generative AI is artificial intelligence that creates new text, images, audio or video from a prompt, based on patterns learned from training data.',
    definition: [
      "Generative AI is a type of artificial intelligence that creates new content, such as text, images, audio, music or video, in response to a prompt. It learns patterns from very large training datasets, then produces original output that resembles that data. Chatbots, image generators and AI voice tools are all generative AI.",
      "Different kinds of model sit behind different media. [Large language models](/glossary/llm) predict text one token at a time. Image and video tools usually use a [diffusion model](/glossary/diffusion-model), which starts from noise and refines it step by step until it matches the prompt. Voice and music models work on audio waveforms or compressed audio tokens.",
      "Generative AI is different from older 'predictive' AI, which sorts or scores existing data (spam filters, product recommendations). It is also different from automation, which follows fixed rules. Generative tools are probabilistic: the same [prompt](/glossary/prompt) can give a different result each time, and the output can be wrong or invented.",
    ],
    why: [
      "For a small marketing team, generative AI cuts the time and cost of first drafts: captions, ad variations, backdrop images, voiceovers and music beds. Work that once needed a designer, a voice actor and a stock library can start from a few sentences.",
      "The catch is quality control. Generative output can be generic, off-brand or factually wrong, so the businesses that get value from it give the model good inputs (brand facts, voice, examples) and check what comes out before it is published.",
    ],
    how: {
      heading: 'How to use generative AI in marketing',
      steps: [
        'Pick narrow, repeatable jobs first: caption drafts, ad copy variations, image backdrops or voiceovers.',
        'Give the tool real context: what you sell, who it is for, your brand voice and the facts it may use.',
        'Keep humans on the final check, especially for claims, prices and anything regulated.',
        'Label or disclose AI media where platforms or laws ask for it.',
        'Track results like any other content, and keep what performs.',
      ],
    },
    example: {
      label: 'Example',
      body: "A bakery called Crumb & Co uses a language model to draft five caption options for a new sourdough loaf, an image model to make a soft kitchen backdrop behind a real product photo, and an AI voice to read a 20-second reel script. The owner edits the caption and checks the price before posting.",
    },
    openpromo: {
      body: 'OpenPromo uses AI models to read your website, write posts and scripts, and make backdrop pictures, B-roll, voiceover and music. Text on the images and videos is set as real text in your brand fonts.',
      href: '/open-source-ai-video-generator',
      label: 'See the open-source AI video generator',
    },
    related: ['llm', 'diffusion-model', 'prompt', 'ai-marketing', 'synthetic-media', 'ai-hallucination'],
    faqs: [
      {
        question: 'What is the difference between AI and generative AI?',
        answer: ["AI is the broad field of software that performs tasks that normally need human judgment. Generative AI is the part of it that creates new content, rather than only classifying, predicting or recommending."],
      },
      {
        question: 'Is ChatGPT generative AI?',
        answer: ["Yes. ChatGPT is a chatbot built on a large language model, which is a form of generative AI for text. Many such chatbots can now also create images and audio."],
      },
      {
        question: 'Can I use generative AI content commercially?',
        answer: ["Usually, but check the terms of the tool you use and the rules where you operate. Copyright protection for purely AI-made work is limited in some countries, including the US, and you are still responsible for what the content claims."],
      },
    ],
  },
  {
    slug: 'ai-marketing',
    term: 'AI marketing',
    aka: ['AI in marketing', 'artificial intelligence marketing'],
    category: 'ai',
    short: 'AI marketing is the use of artificial intelligence to plan, create, target and measure marketing, from writing copy to choosing who sees an ad.',
    definition: [
      "AI marketing is the use of artificial intelligence to plan, create, deliver and measure marketing. It covers generating copy, images and video, predicting which customers will buy, targeting and bidding on ads, personalizing emails and websites, and analyzing results. Most marketers now use some AI, often inside tools they already have.",
      "There are two broad kinds. Analytical AI has been in marketing for years: ad platforms use it to decide who sees an ad and what to bid, and email tools use it to pick send times. [Generative AI](/glossary/generative-ai) is newer and produces the content itself: captions, [ad creative](/glossary/ad-creative), voiceovers and videos.",
      "AI marketing overlaps with [marketing automation](/glossary/marketing-automation), but they are not the same. Automation follows rules you set ('send this email three days after signup'). AI makes judgments or creates something new, and newer [AI agents](/glossary/ai-agent) can chain several steps together with less supervision.",
    ],
    why: [
      "AI lets a small team produce and test more. A business that once made one ad a month can make ten variations, see which works and spend more on the winner. It also takes repetitive work (resizing, first drafts, tagging) off people's plates.",
      "It does not replace strategy or taste. AI is only as good as the brief it gets, and generic prompts produce generic marketing that looks like everyone else's. The advantage goes to businesses that feed AI their real positioning, customers and proof.",
    ],
    how: {
      heading: 'How to start with AI marketing',
      steps: [
        'List the tasks that eat your time each week and pick one or two that are repetitive.',
        'Write down your brand facts, audience and voice once, so every tool gets the same brief.',
        'Use AI for drafts and variations, and keep a person on the final edit.',
        'Test AI-made content against your usual content with the same budget or audience.',
        'Watch costs and set spending limits on any pay-per-use tool.',
      ],
    },
    openpromo: {
      body: 'OpenPromo reads your website into one brand profile, then uses it to write post ideas, images, carousels, reels and promo videos that say only what your site says.',
      href: '/features',
      label: 'See all features',
    },
    related: ['generative-ai', 'marketing-automation', 'ai-agent', 'ai-copywriting', 'social-media-marketing', 'creative-testing'],
    faqs: [
      {
        question: 'How is AI used in marketing?',
        answer: ["Common uses are writing copy and captions, making images and video, targeting and bidding on ads, personalizing emails, predicting churn or purchase likelihood, and summarizing performance data."],
      },
      {
        question: 'Will AI replace marketers?',
        answer: ["It replaces some tasks, mostly first drafts and repetitive production. Deciding what to say, to whom and why, and judging whether the result is good, still needs people."],
      },
    ],
  },
  {
    slug: 'ai-image-generator',
    term: 'AI image generator',
    aka: ['AI art', 'AI art generator', 'AI picture generator'],
    category: 'ai',
    short: 'An AI image generator is a tool that creates images from a text description, and sometimes from a reference image, using a trained AI model.',
    definition: [
      "An AI image generator is a tool that creates new images from a written description, called a prompt. Most use a [diffusion model](/glossary/diffusion-model) trained on millions of captioned images. You describe the subject, style, lighting and composition, and the tool returns one or more pictures in seconds. Images made this way are often called AI art.",
      "Most generators offer more than [text to image](/glossary/text-to-image). Common modes include image to image (restyle or vary a reference picture), inpainting (replace one area), outpainting (extend the canvas) and upscaling. Many also accept a [negative prompt](/glossary/negative-prompt) or a style reference.",
      "AI image generators are good at photos, textures, scenes and illustration. They have improved at drawing text, but lettering, logos, hands and exact product details can still come out wrong, so many marketers set headlines and logos in a design tool on top of the AI picture.",
    ],
    why: [
      "AI images replace a lot of stock photo searching. A business can get a backdrop that matches its brand colors and season, in the right [aspect ratio](/glossary/aspect-ratio), without a photo shoot.",
      "They need care. A fake-looking product shot or a scene that misrepresents what you sell can damage trust, and some platforms label AI imagery. Use AI for mood and backgrounds, and real photos for the actual product.",
    ],
    how: {
      heading: 'How to get good results from an AI image generator',
      steps: [
        'Describe the subject first, then setting, lighting, camera angle and style.',
        'Name your brand colors or mood so images fit your feed.',
        'Ask for the aspect ratio you will post in (1:1, 4:5 or 9:16).',
        'Leave space for text in the prompt ("empty area on the left") if a headline goes on top.',
        'Add headlines and logos afterwards as real text, not in the prompt.',
      ],
    },
    example: {
      label: 'Example prompt',
      code: 'Warm morning light on a rustic wooden bakery counter, flour dust, soft focus background,\nempty space on the right for text, muted cream and terracotta tones, photo, 4:5',
    },
    openpromo: {
      body: 'OpenPromo uses AI pictures only as optional backdrops; headlines are real text in your brand fonts. Website screenshots, product photos and uploads are used before any AI picture.',
      href: '/features/instagram-post-generator',
      label: 'See the Instagram post generator',
    },
    related: ['text-to-image', 'diffusion-model', 'prompt', 'negative-prompt', 'image-to-video', 'content-credentials'],
    faqs: [
      {
        question: 'Can I use AI-generated images for business?',
        answer: ["Most paid plans of major tools allow commercial use, but read the license. Avoid images that copy a recognizable person, artwork or trademark, and check whether your platform asks you to label AI imagery."],
      },
      {
        question: 'Why does AI get text wrong in images?',
        answer: ["Image models learn what letters look like, not how to spell, so lettering can come out garbled. Newer models are better, but setting text separately in a design tool is still the reliable option."],
      },
    ],
  },
  {
    slug: 'text-to-image',
    term: 'Text to image',
    aka: ['text-to-image', 'T2I', 'text to image AI'],
    category: 'ai',
    short: 'Text to image is AI that turns a written description into a picture. You type a prompt and the model generates matching images.',
    definition: [
      "Text to image is a type of generative AI that turns a written description into a picture. You type a [prompt](/glossary/prompt), such as 'a red bicycle leaning on a brick wall at sunset', and the model generates one or more images that match it. It is the core mode of most AI image generators.",
      "Under the hood, a text encoder turns the prompt into numbers that capture its meaning, and an image model (usually a [diffusion model](/glossary/diffusion-model)) uses those numbers to guide how it shapes random noise into a picture. Settings such as seed, steps and guidance strength change how closely and how consistently the image follows the text.",
      "Text to image sits alongside related modes: image to image (start from a picture), [image to video](/glossary/image-to-video) (animate a picture) and [text to video](/glossary/text-to-video) (generate moving footage directly).",
    ],
    why: [
      "Text to image turns an idea into a usable visual in seconds, which makes it cheap to try several directions for a post, ad or landing page before committing.",
      "Because the prompt controls the result, the skill shifts from finding a photo to describing one well. Clear, specific prompts save time and credits.",
    ],
    how: {
      heading: 'How to write a text to image prompt',
      steps: [
        'Start with the main subject and what it is doing.',
        'Add the setting and the time of day or lighting.',
        'Name a medium or style: photo, watercolor, flat illustration, 3D render.',
        'Add composition details: close-up, wide shot, top-down, empty space for text.',
        'Generate several versions, keep the best and refine the prompt from there.',
      ],
    },
    example: {
      label: 'Example',
      body: "A yoga studio wants a calm header image. 'Yoga mat' gives something generic. 'Sunlit yoga studio with wooden floor, three rolled sage-green mats, large window with plants, morning light, wide shot, soft and airy photo' gives a picture that fits the studio's look.",
    },
    related: ['ai-image-generator', 'prompt', 'diffusion-model', 'negative-prompt', 'text-to-video'],
    faqs: [
      {
        question: 'What is the best text to image AI?',
        answer: ["It changes often, as new models appear every few months. Compare a few on the same prompts for your use: photo realism, illustration, text rendering and price differ between them."],
      },
      {
        question: 'Is text to image free?',
        answer: ["Many tools have a free tier with limits. Paid plans or pay-per-image APIs give higher resolution, faster generation and commercial terms."],
      },
    ],
  },
  {
    slug: 'image-to-video',
    term: 'Image to video',
    aka: ['image-to-video', 'I2V', 'photo to video AI'],
    category: 'ai',
    short: 'Image to video is AI that animates a still image into a short video clip, guided by a prompt describing the motion you want.',
    definition: [
      "Image to video is a type of generative AI that turns a still image into a short video clip. You upload a picture and usually add a short prompt describing the motion, such as 'slow push in, steam rising from the cup'. The model keeps the look of the image and invents a few seconds of movement.",
      "Because the first frame is fixed, image to video gives more control than pure [text to video](/glossary/text-to-video): your product, colors and composition stay recognizable. Clips are typically a few seconds to around ten seconds long, and many tools let you set an end frame too.",
      "It differs from the older [Ken Burns effect](/glossary/ken-burns-effect), which only pans and zooms across a still photo. Image to video creates new motion inside the scene: hair moving, liquid pouring, a camera orbiting a product.",
    ],
    why: [
      "Video tends to hold attention better than still images in feeds, and image to video turns existing photos into motion without a shoot. It is a quick way to make [B-roll](/glossary/b-roll) for a reel or a moving background for an ad.",
      "Generated motion can distort faces, hands, text and product details. Check every clip before using it, and avoid animating anything where accuracy matters, like a label or a price.",
    ],
    how: {
      heading: 'How to turn an image into a video with AI',
      steps: [
        'Start with a sharp, well-lit image in the aspect ratio you need (9:16 for reels).',
        'Describe one simple motion: a camera move or one thing in the scene moving.',
        'Keep clips short; shorter clips usually look more natural.',
        'Generate a few versions and pick the one with the least distortion.',
        'Cut the clip into your edit with captions and audio.',
      ],
    },
    example: {
      label: 'Example',
      body: "A bike shop has a photo of a new gravel bike against a forest trail. With image to video and the prompt 'slow camera orbit, leaves drifting', it gets a five-second clip to open a reel announcing the new model.",
    },
    related: ['text-to-video', 'ai-image-generator', 'b-roll', 'ken-burns-effect', 'short-form-video'],
    faqs: [
      {
        question: 'Can AI turn a photo into a video?',
        answer: ["Yes. Image to video models animate a still photo into a short clip, usually a few seconds long, following a motion prompt."],
      },
      {
        question: 'How long can image to video clips be?',
        answer: ["Most tools make clips of roughly 4 to 10 seconds per generation. Longer videos are made by chaining clips or editing several together."],
      },
    ],
  },
  {
    slug: 'text-to-video',
    term: 'Text to video',
    aka: ['AI video generator', 'text-to-video', 'T2V'],
    category: 'ai',
    short: 'Text to video is AI that creates video from a written prompt or script, either as generated footage or as an edited video with scenes and voice.',
    definition: [
      "Text to video is AI that creates a video from written input. The term covers two different things: models that generate new footage from a prompt (a few seconds of realistic or stylized motion), and tools that turn a script into an edited video by combining scenes, stock or AI clips, voiceover, music and captions.",
      "Generative text to video models work like image models extended through time: a [diffusion model](/glossary/diffusion-model) shapes noise into a sequence of frames that match the prompt. Clips are short and can show odd physics, warped hands or garbled text. [Image to video](/glossary/image-to-video) gives more control because the first frame is fixed.",
      "Script-based AI video generators are closer to automated editing. They write or take a script, split it into scenes, add an [AI voice](/glossary/ai-voice-generator), on-screen text and [animated captions](/glossary/animated-captions), and render a finished file. This is the type most businesses use for social video.",
    ],
    why: [
      "Video is the main format on Reels, TikTok and Shorts, but production is slow and expensive. Text to video lets a business publish short videos regularly without filming or editing each one.",
      "Quality varies a lot. Generated footage can look uncanny, and generic scripts make generic videos. The best results come from tools that start from real facts about the business and keep text sharp.",
    ],
    how: {
      heading: 'How to make a video from text with AI',
      steps: [
        'Decide the platform and format first, for example a 9:16 reel of 20 to 40 seconds.',
        'Write or generate a script with a hook, two or three points and a call to action.',
        'Choose visuals: your own screenshots and photos, then AI clips only where needed.',
        'Add voiceover, music and captions, and check that the text is readable in time.',
        'Render, watch it on a phone, and fix anything that looks off before posting.',
      ],
    },
    openpromo: {
      body: 'OpenPromo writes a reel or promo video script from your brand profile, then renders scenes with real text, AI voiceover, a music bed and word-by-word captions. AI clips are optional.',
      href: '/features/url-to-video',
      label: 'See URL to video',
    },
    related: ['image-to-video', 'diffusion-model', 'ai-voice-generator', 'short-form-video', 'faceless-video', 'b-roll'],
    faqs: [
      {
        question: 'Can AI make a video from text?',
        answer: ["Yes. Some models generate short clips of new footage from a prompt, and other tools turn a script into a finished, edited video with voiceover and captions."],
      },
      {
        question: 'How long can an AI-generated video be?',
        answer: ["Generated footage is usually a few seconds per clip. Script-based tools can make videos of any length by joining many scenes, though most social videos stay under a minute."],
      },
    ],
  },
  {
    slug: 'diffusion-model',
    term: 'Diffusion model',
    aka: ['latent diffusion', 'diffusion AI'],
    category: 'ai',
    short: 'A diffusion model is a type of generative AI that creates images, video or audio by starting from random noise and removing it step by step.',
    definition: [
      "A diffusion model is a type of generative AI that creates images, video or audio by starting from random noise and removing it step by step until a clear result appears. During training it learns to reverse the process of adding noise to real data. Most well-known AI image and video generators are built on diffusion.",
      "Most modern systems are latent diffusion models: they work in a compressed version of the image rather than on every pixel, which makes generation much faster. A text encoder turns the [prompt](/glossary/prompt) into guidance, and each denoising step nudges the image toward that description.",
      "Settings you may see in tools come from this process. Steps is how many denoising passes run. Seed is the starting noise, so the same seed and prompt give a similar image. Guidance (or CFG scale) controls how strictly the image follows the prompt. A [negative prompt](/glossary/negative-prompt) pushes the result away from things you do not want.",
    ],
    why: [
      "You do not need to understand the math to use AI images, but knowing how diffusion works explains common behavior: why results vary each time, why a fixed seed helps keep a series consistent, and why small text and fine details are hard.",
      "That understanding helps you pick the right tool and write better prompts, which saves credits and time when you make visuals for posts and ads.",
    ],
    example: {
      label: 'Example',
      body: "A designer making a set of five promotional backdrops for a coffee shop keeps the same seed and changes only the subject in the prompt. The lighting and style stay similar across the set, so the posts look like one campaign.",
    },
    related: ['generative-ai', 'text-to-image', 'ai-image-generator', 'text-to-video', 'negative-prompt'],
    faqs: [
      {
        question: 'How do diffusion models work in simple terms?',
        answer: ["They learn to clean up noisy images. To generate, they start with pure noise and clean it up many times, guided by your prompt, until a picture emerges."],
      },
      {
        question: 'What is the difference between a diffusion model and an LLM?',
        answer: ["An LLM predicts text one token at a time. A diffusion model refines a whole image (or clip, or audio) at once over many steps. Some newer systems mix both ideas."],
      },
    ],
  },
  {
    slug: 'prompt',
    term: 'Prompt',
    aka: ['AI prompt', 'text prompt'],
    category: 'ai',
    short: 'A prompt is the instruction or input you give an AI model, such as a question, a task or a description of the image you want it to create.',
    definition: [
      "A prompt is the input you give a generative AI model to tell it what to produce. It can be a question, an instruction, a description of an image, a script, or a mix of text, files and examples. The model reads the prompt and generates a response, so the wording and context strongly shape the result.",
      "Chat tools often split prompts into two parts. The system prompt sets standing rules (role, tone, format, what not to do) and the user prompt is the specific request. Image and video tools may add a [negative prompt](/glossary/negative-prompt) listing things to avoid.",
      "Good prompts give context the model cannot guess: who the audience is, what the business sells, the [brand voice](/glossary/brand-voice), length limits and the desired format. The practice of designing prompts carefully is called [prompt engineering](/glossary/prompt-engineering).",
    ],
    why: [
      "The same AI tool can give bland or excellent marketing copy depending on the prompt. A vague prompt gets an average answer drawn from everything the model has seen. A specific prompt with your facts and voice gets something that sounds like you.",
      "Prompts are also reusable. A tested prompt for captions or ad variations becomes a template your whole team can use, which keeps output consistent.",
    ],
    how: {
      heading: 'How to write a good AI prompt',
      steps: [
        'State the task and the format: "Write three Instagram captions under 150 characters."',
        'Give the context: product, audience, offer and any facts the copy may use.',
        'Describe the voice, ideally with a short example of your own writing.',
        'Say what to avoid: hype words, made-up numbers, emojis, hashtags.',
        'Review the output and refine the prompt rather than only editing the answer.',
      ],
    },
    example: {
      label: 'Example prompt',
      code: 'Write 3 Instagram captions for Crumb & Co, a neighborhood bakery.\nProduct: new rye sourdough, baked Fridays only, $9.\nAudience: local families and remote workers.\nVoice: warm, plain, a little playful. No hype words, no made-up claims.\nEach caption under 150 characters, ending with a call to action.',
    },
    related: ['prompt-engineering', 'negative-prompt', 'llm', 'text-to-image', 'ai-copywriting'],
    faqs: [
      {
        question: 'What is an example of a prompt?',
        answer: ["'Write a 30-second reel script for a bike repair shop announcing same-day tune-ups, with a hook in the first line and a call to book online' is a prompt for a language model."],
      },
      {
        question: 'How long should an AI prompt be?',
        answer: ["As long as it needs to be to give the context. A sentence works for simple tasks; marketing copy usually benefits from a short paragraph with facts, audience and voice."],
      },
    ],
  },
  {
    slug: 'prompt-engineering',
    term: 'Prompt engineering',
    aka: ['prompt design', 'prompting'],
    category: 'ai',
    short: 'Prompt engineering is the practice of designing and testing prompts so an AI model gives accurate, useful and consistent output.',
    definition: [
      "Prompt engineering is the practice of designing, testing and refining the instructions given to an AI model so it produces accurate, useful and consistent output. It includes choosing the wording, giving context and examples, setting rules and output formats, and checking results across many inputs rather than one lucky try.",
      "Common techniques include few-shot prompting (showing a few examples of the output you want), giving the model a role, asking for a fixed structure such as JSON or a bulleted list, breaking a big task into smaller steps, and asking the model to check its answer against provided facts to reduce [AI hallucination](/glossary/ai-hallucination).",
      "As models improve, simple tricks matter less and clear context matters more. For marketing, the most effective 'engineering' is usually giving the model your real facts, audience and [brand voice](/glossary/brand-voice) in a reusable template.",
    ],
    why: [
      "Well-built prompts turn AI from a novelty into a dependable part of a content workflow. Your team gets consistent captions, scripts and ad copy instead of a different style every time.",
      "Prompt engineering also controls cost and risk: fewer retries, fewer invented claims and output in a format other tools can use directly.",
    ],
    how: {
      heading: 'How to improve your prompts',
      steps: [
        'Write down what a good result looks like before you start.',
        'Add context and two or three examples of good output.',
        'Specify the format, length and things to avoid.',
        'Test the prompt on several different inputs, not just one.',
        'Keep a library of prompts that work and version them as you change them.',
      ],
    },
    related: ['prompt', 'negative-prompt', 'llm', 'ai-hallucination', 'ai-copywriting'],
    faqs: [
      {
        question: 'Is prompt engineering a real job?',
        answer: ["Some companies hire for it, often under titles like AI engineer or AI content specialist. More often it is a skill marketers, writers and developers add to their existing roles."],
      },
      {
        question: 'Do I need to learn prompt engineering to use AI?',
        answer: ["No, but a few habits help a lot: give context, show examples, say what format you want and check the output."],
      },
    ],
  },
  {
    slug: 'negative-prompt',
    term: 'Negative prompt',
    aka: ['negative prompting'],
    category: 'ai',
    short: 'A negative prompt tells an AI image or video model what to leave out, such as text, blur, extra fingers or a watermark.',
    definition: [
      "A negative prompt is a list of things you want an AI image or video model to avoid in its output. Where the main prompt describes what to include, the negative prompt names what to exclude, such as 'text, watermark, blurry, extra fingers, low quality'. The model steers each generation step away from those concepts.",
      "Negative prompts are common in tools built on open [diffusion models](/glossary/diffusion-model), where they appear as a separate field. Some newer hosted image tools do not have a negative prompt field and expect you to describe what you want positively instead.",
      "Use them sparingly. A long list of generic negatives can flatten the image or have little effect. Targeted negatives that fix a problem you actually saw tend to work best.",
    ],
    why: [
      "For marketing visuals, the most common problems are unwanted text, logos, watermarks and distorted people. A short negative prompt removes many of these and saves regenerations.",
      "It also helps keep a set of images on-brand, for example by excluding colors that clash with your palette.",
    ],
    how: {
      heading: 'How to use a negative prompt',
      steps: [
        'Generate an image with only the main prompt first.',
        'Note what is wrong: stray text, clutter, wrong colors, distortions.',
        'Add only those items to the negative prompt.',
        'Regenerate and compare, keeping the seed the same if you can.',
      ],
    },
    example: {
      label: 'Example',
      code: 'Prompt: flat lay of yoga props on a light oak floor, soft daylight, sage and cream tones\nNegative prompt: text, letters, logo, watermark, people, clutter, dark shadows',
    },
    related: ['prompt', 'prompt-engineering', 'text-to-image', 'diffusion-model', 'ai-image-generator'],
    faqs: [
      {
        question: 'Do negative prompts work in every AI image generator?',
        answer: ["No. Many open-model tools support them, but some hosted generators ignore negatives or have no field for them. In those, describe what you want instead."],
      },
      {
        question: 'What should I put in a negative prompt?',
        answer: ["Only the problems you actually see in your results, such as text, watermark, blur or extra limbs. Short and targeted works better than a long generic list."],
      },
    ],
  },
  {
    slug: 'ai-voice-generator',
    term: 'AI voice generator',
    aka: ['AI voice', 'AI voiceover', 'AI text to speech'],
    category: 'ai',
    short: 'An AI voice generator turns written text into natural-sounding speech, often with a choice of voices, accents, languages and speaking styles.',
    definition: [
      "An AI voice generator is a tool that turns written text into natural-sounding speech using a neural network. You paste a script, pick a voice, language and style, and it returns an audio file. It is the modern form of [text to speech](/glossary/text-to-speech), and is widely used for voiceovers in reels, ads, explainers and tutorials.",
      "Older text to speech sounded robotic because it stitched recorded sounds together or used simple rules. Neural voice models learn rhythm, emphasis and breathing from many hours of real speech, so they can sound close to a human narrator. Many tools also offer [voice cloning](/glossary/voice-cloning), which copies a specific person's voice from a sample.",
      "Most generators let you adjust speed and pauses, and some accept markup or style tags for emphasis and emotion. Pronunciation of brand names and unusual words may need spelling out phonetically.",
    ],
    why: [
      "Voiceover keeps people watching and makes videos work for viewers who listen rather than read. An AI voice gives a business a consistent narrator for every [faceless video](/glossary/faceless-video) without booking a voice actor or recording studio.",
      "It is also fast to revise: change a line of script and render the audio again in seconds. Pair it with captions, since many people watch social video on mute.",
    ],
    how: {
      heading: 'How to make an AI voiceover',
      steps: [
        'Write the script to be heard: short sentences, simple words, one idea per line.',
        'Pick a voice that fits your brand voice and audience.',
        'Generate, listen, and fix pronunciation of names by respelling them.',
        'Adjust pace so on-screen text has time to be read.',
        'Mix it over music at a lower volume and add captions.',
      ],
    },
    openpromo: {
      body: 'OpenPromo reels and promo videos can include an AI voiceover that reads the script, with scene timing following the voice. Voiceover costs about $0.01 a scene on your YepAPI key and can be turned off.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['text-to-speech', 'voiceover', 'voice-cloning', 'faceless-video', 'animated-captions'],
    faqs: [
      {
        question: 'Can I use an AI voice for commercial videos?',
        answer: ["Usually yes on paid plans, but check the tool's license. Do not clone or imitate a real person's voice without their written permission."],
      },
      {
        question: 'Does TikTok or Instagram penalize AI voices?',
        answer: ["There is no public rule against them, and both platforms offer built-in text to speech. Platforms may ask you to label realistic AI media, especially if it imitates a real person."],
      },
    ],
  },
  {
    slug: 'voice-cloning',
    term: 'Voice cloning',
    aka: ['voice clone', 'AI voice cloning'],
    category: 'ai',
    short: 'Voice cloning is AI that copies a specific person\'s voice from a recording sample so it can speak any new text in that voice.',
    definition: [
      "Voice cloning is the use of AI to create a synthetic copy of a specific person's voice from recordings of them speaking. Once cloned, the voice can read any new text, in the same tone and accent. Some tools need only a short sample, while higher-quality clones use longer, cleaner recordings.",
      "Cloning is a feature of many [AI voice generators](/glossary/ai-voice-generator). Legitimate uses include a founder narrating every product video without recording each one, translating a creator's videos into other languages in their own voice, and restoring speech for people who have lost it.",
      "It is also the technology behind audio [deepfakes](/glossary/deepfake) and voice scams. Reputable services ask for proof of consent, and laws in several places restrict using someone's voice without permission, especially in ads.",
    ],
    why: [
      "A cloned voice lets a recognizable person, such as an owner or spokesperson, appear in more content without more studio time. That can build familiarity and trust with an audience.",
      "The risks are legal and reputational. Use only voices you have clear written permission for, keep the voice files secure and be open with your audience when a voice is synthetic.",
    ],
    how: {
      heading: 'How to clone a voice responsibly',
      steps: [
        'Get written consent from the person, covering how and where the voice will be used.',
        'Record clean audio in a quiet room, following the tool\'s guidance on length.',
        'Test the clone on a few scripts and check names and numbers.',
        'Store access to the clone securely and limit who can generate with it.',
        'Disclose AI voice use where platforms or laws require it.',
      ],
    },
    related: ['ai-voice-generator', 'deepfake', 'synthetic-media', 'voiceover', 'ai-avatar'],
    faqs: [
      {
        question: 'Is voice cloning legal?',
        answer: ["Cloning your own voice, or someone's voice with their consent, is generally legal. Using a person's voice without permission can break right-of-publicity, fraud or consumer protection laws, and some places have specific rules on AI voices."],
      },
      {
        question: 'How much audio do you need to clone a voice?',
        answer: ["Some tools work from under a minute of speech. Better clones usually come from longer, clean recordings, often 30 minutes or more for professional quality."],
      },
    ],
  },
  {
    slug: 'ai-music-generator',
    term: 'AI music generator',
    aka: ['AI music', 'AI song generator'],
    category: 'ai',
    short: 'An AI music generator creates original music, from short background beds to full songs, based on a text description of genre, mood and length.',
    definition: [
      "An AI music generator is a tool that creates original music from a text description, such as 'upbeat acoustic guitar, warm, 30 seconds'. Some make instrumental background tracks; others write full songs with vocals and lyrics. The output is new audio, not a clip from an existing recording, which can make licensing simpler than with commercial songs.",
      "For marketing, the most common use is a music bed: a short instrumental track that sits under a voiceover in a reel, ad or explainer. Tools usually let you set genre, mood, tempo and length, and some can extend or loop a track to fit a video.",
      "AI music is an alternative to [royalty-free music](/glossary/royalty-free-music) libraries and to [trending audio](/glossary/trending-audio) on social platforms. Trending sounds can help discovery on some apps, but business accounts often have a limited commercial music library, so original tracks avoid that problem.",
    ],
    why: [
      "Music sets the mood of a video in the first second and covers awkward silence. A track that fits your brand and length exactly makes even a simple video feel finished.",
      "Using commercial songs without a license can get videos muted or taken down. Generated music, used within the tool's terms, gives a business tracks it can use in ads and organic posts.",
    ],
    how: {
      heading: 'How to make background music with AI',
      steps: [
        'Describe genre, mood, instruments and tempo, for example "calm lo-fi piano, 80 BPM".',
        'Ask for instrumental only if a voiceover will play on top.',
        'Set the length to your video, or a little longer to trim.',
        'Mix the music well below the voice so every word is clear.',
        'Read the tool\'s license to confirm commercial use.',
      ],
    },
    openpromo: {
      body: 'OpenPromo can add an AI-made music bed under the voiceover of a reel or promo video, at about $0.08 a reel on your own YepAPI key. You can turn it off.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['royalty-free-music', 'trending-audio', 'generative-ai', 'voiceover', 'synthetic-media'],
    faqs: [
      {
        question: 'Can I use AI-generated music on YouTube or Instagram?',
        answer: ["Generally yes, if the tool's license allows commercial use. Some platforms ask you to label realistic AI content, and copyright protection for purely AI-made music is limited in some countries."],
      },
      {
        question: 'Is AI music royalty free?',
        answer: ["Often, but not always. Each tool sets its own terms, and free plans sometimes exclude commercial use. Check before you use a track in an ad."],
      },
    ],
  },
  {
    slug: 'ai-avatar',
    term: 'AI avatar',
    aka: ['digital avatar', 'AI presenter', 'digital human'],
    category: 'ai',
    short: 'An AI avatar is a computer-generated person or character that can speak a script on video, with lip movements synced to an AI or recorded voice.',
    definition: [
      "An AI avatar is a computer-generated person or character that appears on video and speaks a script. The avatar's face and lips move in time with an AI or recorded voice, so it looks like a presenter talking to camera. Avatars can be stock characters, stylized cartoons or a digital twin of a real person.",
      "Most avatar tools combine three parts: a face model that generates or animates the presenter, an [AI voice generator](/glossary/ai-voice-generator) for speech, and [lip sync](/glossary/lip-sync) that matches mouth shapes to the audio. A custom avatar of a real person is usually trained on a few minutes of footage of them, with their consent.",
      "The term is also used more loosely for AI-made profile pictures and stylized portraits. In video marketing, it almost always means a talking presenter used in place of filming a [talking head video](/glossary/talking-head-video).",
    ],
    why: [
      "Avatars let a business make presenter-style videos (product updates, training, multilingual explainers) without filming. Changing a script means re-rendering, not reshooting.",
      "Audiences can find avatars stiff or uncanny, and a fake 'customer' presented as real is misleading. Avatars work best for clearly informational content, and real people still tend to be more convincing for testimonials and personal stories.",
    ],
    how: {
      heading: 'How to use an AI avatar in marketing',
      steps: [
        'Use avatars for informational videos: tutorials, onboarding, internal training, translations.',
        'Pick a presenter style that fits your brand, or create a digital twin of a team member with consent.',
        'Keep scripts short and conversational, since longer takes show more artifacts.',
        'Mix in screen recordings, product shots or B-roll so the avatar is not on screen the whole time.',
        'Never present an avatar as a real customer or reviewer.',
      ],
    },
    related: ['lip-sync', 'talking-head-video', 'ai-voice-generator', 'deepfake', 'synthetic-media', 'voice-cloning'],
    faqs: [
      {
        question: 'Are AI avatars good for marketing videos?',
        answer: ["They are useful for explainers, training and translated videos where speed matters. For trust-heavy content like testimonials, real people usually work better, and fake testimonials are misleading whatever tool makes them."],
      },
      {
        question: 'Can I make an AI avatar of myself?',
        answer: ["Yes. Many tools create a custom avatar from a few minutes of video of you speaking, often with a cloned voice. Read how the tool stores and uses your likeness."],
      },
    ],
  },
  {
    slug: 'llm',
    term: 'Large language model (LLM)',
    aka: ['LLM', 'language model', 'AI chatbot model'],
    category: 'ai',
    short: 'A large language model (LLM) is an AI model trained on huge amounts of text to understand and generate language, powering chatbots and AI writers.',
    definition: [
      "A large language model (LLM) is an AI model trained on very large amounts of text to read, understand and generate language. It works by predicting the next piece of text, called a token, again and again. LLMs power chatbots, AI writing tools, summarizers and coding assistants, and many can also read images and documents.",
      "LLMs are built on the transformer architecture and trained in stages: first on broad text to learn language and facts, then tuned with examples and human feedback to follow instructions and be helpful. The amount of text a model can consider at once is its context window.",
      "Because LLMs generate the most likely next words rather than look facts up, they can state false things confidently, which is called [AI hallucination](/glossary/ai-hallucination). Giving the model the facts in the [prompt](/glossary/prompt), or connecting it to tools and data through protocols like [MCP](/glossary/mcp), reduces this.",
    ],
    why: [
      "LLMs are the engine behind most AI marketing tools: caption writers, ad copy generators, content planners and chat assistants. Knowing what they are good at (drafting, rewriting, summarizing, structuring) and bad at (exact facts they were not given) helps you use them safely.",
      "They also change how people find businesses. More people ask AI assistants for recommendations, so clear, factual content on your own site matters for how those assistants describe you.",
    ],
    how: {
      heading: 'How to get reliable marketing copy from an LLM',
      steps: [
        'Paste in the facts it may use: product details, prices, offers and proof.',
        'Describe the audience and the brand voice, with an example.',
        'Ask for several options in a fixed format so they are easy to compare.',
        'Tell it not to invent numbers, names or claims.',
        'Check every fact before publishing.',
      ],
    },
    openpromo: {
      body: 'OpenPromo uses an AI language model to read your website text and write the brand profile, post ideas and scripts. Colors, fonts and the logo are measured from the page itself.',
      href: '/features/brand-kit-generator',
      label: 'See the brand kit generator',
    },
    related: ['generative-ai', 'prompt', 'ai-hallucination', 'ai-copywriting', 'mcp', 'ai-agent'],
    faqs: [
      {
        question: 'What is the difference between an LLM and ChatGPT?',
        answer: ["An LLM is the underlying model. ChatGPT is a product, a chat app, that runs on large language models and adds features like memory, web search and image generation."],
      },
      {
        question: 'What does LLM stand for?',
        answer: ["Large language model. 'Large' refers to the number of parameters (the learned values inside the model) and the amount of text it was trained on."],
      },
    ],
  },
  {
    slug: 'ai-hallucination',
    term: 'AI hallucination',
    aka: ['hallucination', 'AI confabulation'],
    category: 'ai',
    short: 'An AI hallucination is false or made-up information that an AI model presents as fact, such as invented statistics, quotes, features or sources.',
    definition: [
      "An AI hallucination is output from an AI model that is false, made up or unsupported, but presented as if it were true. Examples include invented statistics, fake quotes, product features that do not exist, wrong prices and citations to sources that were never written. Hallucinations happen because models predict plausible text rather than check facts.",
      "[Large language models](/glossary/llm) are most likely to hallucinate when they lack the information needed, when a question assumes something false, or when asked for very specific details such as numbers, dates and names. The output often sounds confident, which makes errors easy to miss.",
      "The term is also used for image and video models that add things nobody asked for, such as extra fingers, garbled text or a logo that does not exist. In marketing, the riskiest hallucinations are claims about your own business.",
    ],
    why: [
      "A made-up claim in an ad or post can mislead customers, break advertising rules and damage trust. 'Rated #1 in the city' or 'ships in 24 hours' is a problem if it is not true, whoever wrote it.",
      "Hallucinations are the main reason AI content needs a human check. Grounding the model in your real facts, and checking figures before publishing, removes most of the risk.",
    ],
    how: {
      heading: 'How to prevent AI hallucinations in marketing content',
      steps: [
        'Give the model the facts it may use, and tell it to use only those.',
        'Ask it to quote or cite where each claim came from.',
        'Avoid asking for statistics or research it was not given.',
        'Check every number, name, price and promise against your own records.',
        'Use tools that flag figures not found in your source material.',
      ],
    },
    example: {
      label: 'Example',
      body: "A yoga studio asks an AI tool for a promo caption. The draft says 'Join 5,000 happy members', but the studio has about 300. Because the prompt did not include a member count, the model invented a plausible one. The fix is to give the real facts and ask it not to add numbers.",
    },
    openpromo: {
      body: 'Before anything renders, OpenPromo checks flag figures that are not on your website, and each selling point in the brand profile keeps the sentence and page it came from.',
      href: '/docs/how-it-works',
      label: 'See how it works',
    },
    related: ['llm', 'ai-copywriting', 'prompt-engineering', 'brand-safety', 'generative-ai'],
    faqs: [
      {
        question: 'Why does AI hallucinate?',
        answer: ["Language models generate the most likely next words based on patterns, not a database of verified facts. When they lack information, they fill the gap with something that sounds right."],
      },
      {
        question: 'Can AI hallucinations be eliminated?',
        answer: ["Not completely with current models. They can be reduced a lot by giving the model source facts, asking for citations and having a person check claims before publishing."],
      },
    ],
  },
  {
    slug: 'ai-copywriting',
    term: 'AI copywriting',
    aka: ['AI copywriter', 'AI writing', 'AI content generation'],
    category: 'ai',
    short: 'AI copywriting is using AI language models to write marketing text such as captions, ads, headlines, emails and product descriptions.',
    definition: [
      "AI copywriting is the use of AI language models to write marketing and sales text: social captions, [ad copy](/glossary/ad-copy), headlines, emails, product descriptions and video scripts. A writer gives the tool a brief with the product, audience and goal, and it drafts options that a person then edits, checks and publishes.",
      "AI copywriting tools range from general chatbots to specialized apps with templates for formats like [AIDA](/glossary/aida) or PAS. The model behind them is usually a [large language model](/glossary/llm), and the quality depends mostly on the brief: facts, voice and examples.",
      "AI copy has recognizable weaknesses. Without guidance it drifts toward generic phrasing, overused hype words and claims it cannot back up. Editing for your real [brand voice](/glossary/brand-voice) and specific details is what makes it work.",
    ],
    why: [
      "AI copywriting speeds up the parts of writing that take the most time: blank-page drafts and variations. A business can write ten ad headlines to test instead of two, or caption a month of posts in an afternoon.",
      "Good copy still depends on knowing the customer. AI can phrase a benefit many ways, but someone has to know which benefit matters and whether every claim is true.",
    ],
    how: {
      heading: 'How to use AI for copywriting',
      steps: [
        'Write a brief: product, audience, offer, proof and one goal for the copy.',
        'Paste in a sample of your best past copy so the tone matches.',
        'Ask for several variations in the exact format and length you need.',
        'Cut generic phrases and hype words, and add specific details.',
        'Fact-check every claim, then test the best options against each other.',
      ],
    },
    openpromo: {
      body: 'OpenPromo writes captions, hashtags, post text and video scripts from the brand profile read from your website, and flags hype words and figures not found on your site.',
      href: '/features/instagram-caption-generator',
      label: 'See the caption generator',
    },
    related: ['copywriting', 'llm', 'ad-copy', 'caption', 'brand-voice', 'ai-hallucination'],
    faqs: [
      {
        question: 'Is AI copywriting good enough to publish?',
        answer: ["It can be, after editing. Treat AI output as a first draft: check facts, match your voice and remove generic lines."],
      },
      {
        question: 'Does Google penalize AI-written content?',
        answer: ["Google's stated position is that it judges content on quality and helpfulness, not on whether AI helped write it. Thin, unedited, mass-produced pages can still perform poorly."],
      },
    ],
  },
  {
    slug: 'deepfake',
    term: 'Deepfake',
    aka: ['deep fake', 'deepfake video'],
    category: 'ai',
    short: 'A deepfake is AI-generated or AI-altered video, audio or images that realistically show a real person saying or doing something they did not.',
    definition: [
      "A deepfake is a video, audio clip or image that has been created or altered with AI to realistically show a real person saying or doing something they never did. Common forms are face swaps, lip-synced fake speeches and cloned voices. The word combines 'deep learning' and 'fake' and dates from around 2017.",
      "Deepfakes use the same technology as legitimate [synthetic media](/glossary/synthetic-media): face generation, [lip sync](/glossary/lip-sync) and [voice cloning](/glossary/voice-cloning). What makes something a deepfake is that it depicts a real, identifiable person in a way that is deceptive or made without their consent.",
      "Deepfakes are used in scams (a fake executive voice asking for a payment), fake celebrity endorsements in ads, harassment and political misinformation. Many places now have laws on non-consensual deepfakes and AI in political or commercial content, and major platforms require labels on realistic AI media.",
    ],
    why: [
      "For businesses, deepfakes are a risk in two directions. Scammers may impersonate your brand or staff, and fake endorsements using famous faces are a common ad scam that platforms remove and regulators pursue.",
      "If you use AI presenters or voices in your own content, keep clear of anything that could be mistaken for a real person who did not agree to it. Consent, disclosure and [content credentials](/glossary/content-credentials) protect your reputation.",
    ],
    how: {
      heading: 'How to spot a deepfake',
      steps: [
        'Check the source: who posted it first, and does the real person or brand confirm it?',
        'Look for odd blinking, blurry edges around the face, mismatched lighting or teeth.',
        'Listen for flat emotion, odd breathing or words that do not match mouth shapes.',
        'Look for content credentials or platform AI labels.',
        'Be most skeptical of urgent requests for money or data, however real the voice sounds.',
      ],
    },
    related: ['synthetic-media', 'voice-cloning', 'ai-avatar', 'content-credentials', 'ai-watermark', 'brand-safety'],
    faqs: [
      {
        question: 'Are deepfakes illegal?',
        answer: ["It depends on the content and where you are. Many jurisdictions ban non-consensual intimate deepfakes, and fraud, defamation and false advertising laws apply to deepfakes too. Laws in this area are changing quickly."],
      },
      {
        question: 'What is the difference between a deepfake and synthetic media?',
        answer: ["Synthetic media is any AI-generated media, used openly or with consent. A deepfake is synthetic media that realistically impersonates a real person, usually to deceive."],
      },
    ],
  },
  {
    slug: 'synthetic-media',
    term: 'Synthetic media',
    aka: ['AI-generated media', 'AI-generated content', 'AIGC'],
    category: 'ai',
    short: 'Synthetic media is any image, video, audio or text created or substantially changed by AI, from AI voiceovers to generated photos and avatars.',
    definition: [
      "Synthetic media is any image, video, audio or text that has been created or significantly altered by AI rather than captured or written by a person. It includes AI-generated photos, [AI voiceovers](/glossary/ai-voice-generator), AI music, digital avatars and generated video clips. It is the umbrella term for everything [generative AI](/glossary/generative-ai) produces.",
      "Most synthetic media is ordinary and open: a generated backdrop, a text to speech narration, an AI-made music bed. A small part of it is deceptive, and the most harmful form, a realistic fake of a real person, is called a [deepfake](/glossary/deepfake).",
      "Because synthetic media is getting harder to tell from real footage, platforms and regulators increasingly ask for disclosure. Technical answers include invisible [AI watermarks](/glossary/ai-watermark) and [content credentials](/glossary/content-credentials), which record how a file was made.",
    ],
    why: [
      "Synthetic media makes content production much cheaper, which is why most marketing teams now use some. It also raises questions about trust: audiences react badly when they feel misled about what is real.",
      "Knowing the platform rules matters. Meta, TikTok and YouTube ask creators to label realistic AI content in some cases, and some ad categories have stricter rules. Labeling correctly avoids takedowns and keeps credibility.",
    ],
    how: {
      heading: 'How to use synthetic media responsibly',
      steps: [
        'Use AI for things that do not pretend to be real evidence: backdrops, music, narration, illustrations.',
        'Use real photos for real products, results and customers.',
        'Follow each platform\'s AI labeling rules when content looks realistic.',
        'Keep content credentials and metadata on files where your tools support it.',
        'Get consent before synthesizing anyone\'s face or voice.',
      ],
    },
    related: ['generative-ai', 'deepfake', 'content-credentials', 'ai-watermark', 'ai-avatar', 'brand-safety'],
    faqs: [
      {
        question: 'Do I have to label AI-generated content on social media?',
        answer: ["Major platforms ask you to label realistic AI content, especially content that shows real people or events. Rules differ by platform and change often, so check each platform's current policy."],
      },
      {
        question: 'Is an AI voiceover synthetic media?',
        answer: ["Yes. Any speech generated by AI is synthetic media. A plain narration of your own script is a normal, low-risk use."],
      },
    ],
  },
  {
    slug: 'content-credentials',
    term: 'Content credentials (C2PA)',
    aka: ['C2PA', 'content provenance', 'Content Credentials'],
    category: 'ai',
    short: 'Content credentials are tamper-evident metadata, based on the C2PA standard, that record who made a file, with which tools and whether AI was used.',
    definition: [
      "Content credentials are tamper-evident metadata attached to an image, video, audio or document file that record where it came from and how it was made: the creator, the tools used, the edits applied and whether AI was involved. They follow the C2PA standard, an open specification from the Coalition for Content Provenance and Authenticity.",
      "Credentials are cryptographically signed, so changes to the file or its history can be detected. Some cameras, editing apps and AI image generators add them automatically, and some sites and social platforms read them to show a small 'CR' icon or an AI label.",
      "Content credentials work alongside invisible [AI watermarks](/glossary/ai-watermark). Metadata can be stripped when a file is screenshotted or re-encoded, while a watermark is embedded in the pixels or audio, so the two are often used together.",
    ],
    why: [
      "As [synthetic media](/glossary/synthetic-media) spreads, being able to show that your photos are real, or that you disclosed AI use, supports trust. Platforms already use credentials to apply AI labels automatically.",
      "For brands, provenance also helps against impersonation: a signed original is easier to defend than an unsigned file when fakes circulate.",
    ],
    how: {
      heading: 'How to check content credentials',
      steps: [
        'Look for a CR icon or AI info label where the file is shown.',
        'Upload the file to a public content credentials verify tool to read its history.',
        'Check whether it was captured by a camera, edited or generated by AI.',
        'Remember that missing credentials do not prove a file is fake; many tools do not add them yet.',
      ],
    },
    related: ['ai-watermark', 'synthetic-media', 'deepfake', 'brand-safety', 'ai-image-generator'],
    faqs: [
      {
        question: 'What does C2PA stand for?',
        answer: ["Coalition for Content Provenance and Authenticity, the industry group behind the open standard for content credentials."],
      },
      {
        question: 'Do Instagram and TikTok read C2PA?',
        answer: ["Several major platforms read C2PA metadata and other signals to apply AI labels. Support and labels change over time, so check each platform's current help pages."],
      },
    ],
  },
  {
    slug: 'ai-watermark',
    term: 'AI watermark',
    aka: ['AI watermarking', 'invisible watermark'],
    category: 'ai',
    short: 'An AI watermark is a visible mark or hidden signal embedded in AI-generated content so software can later identify it as AI-made.',
    definition: [
      "An AI watermark is a mark or signal added to AI-generated content so it can later be identified as AI-made. It can be visible, like a logo in the corner, or invisible: a pattern hidden in the pixels, audio or word choices that people cannot notice but detection software can read, even after some editing.",
      "Several large AI companies watermark the images, audio and video their models produce, and some offer public detectors. Invisible watermarks are designed to survive cropping, compression and color changes, though heavy editing can weaken or remove them. Watermarking text is harder and less reliable than watermarking media.",
      "Watermarks complement [content credentials](/glossary/content-credentials). Credentials are signed metadata that describe a file's history, while watermarks are embedded in the content itself. Platforms may check both to decide when to label [synthetic media](/glossary/synthetic-media).",
    ],
    why: [
      "If you post AI images or video, a platform may detect the watermark and add an AI label automatically. Knowing this avoids surprises and helps you decide when to disclose AI use yourself.",
      "Watermarks also help businesses protect themselves, by making AI-made fakes of their products or staff easier to identify.",
    ],
    how: {
      heading: 'How AI watermarks affect your posts',
      steps: [
        'Assume images and video from major AI tools may carry an invisible watermark.',
        'Expect platforms to label realistic AI content, and disclose it yourself where required.',
        'Do not try to strip watermarks; it can break terms of service and looks deceptive.',
        'Use real photos where proof matters, and AI for backdrops and illustration.',
      ],
    },
    related: ['content-credentials', 'synthetic-media', 'deepfake', 'ai-image-generator', 'brand-safety'],
    faqs: [
      {
        question: 'Can AI watermarks be removed?',
        answer: ["Visible ones can be cropped out. Invisible watermarks are built to survive common edits, but heavy changes can weaken them. Removing them may break a tool's terms of use."],
      },
      {
        question: 'Is there a way to tell if an image is AI-generated?',
        answer: ["Check for content credentials, platform labels and watermark detectors from the AI provider. Visual clues such as odd hands or text help, but detection is not always reliable."],
      },
    ],
  },
  {
    slug: 'brand-safety',
    term: 'Brand safety',
    aka: ['brand suitability'],
    category: 'ai',
    short: 'Brand safety is protecting a brand\'s reputation by keeping its ads and content away from harmful contexts and its own content free of risky claims.',
    definition: [
      "Brand safety is the practice of protecting a brand's reputation by making sure its ads and content do not appear next to harmful material, and that the content itself does not mislead or offend. It started in online advertising, where ads could show beside violent or extremist content, and now also covers AI-generated marketing.",
      "In advertising, brand safety tools and platform settings exclude categories like violence, adult content or misinformation. Brand suitability is the finer version: deciding which topics are fine for your brand specifically, since a news story that suits one advertiser may not suit another.",
      "With [generative AI](/glossary/generative-ai), brand safety extends to what your own tools produce: invented claims ([AI hallucination](/glossary/ai-hallucination)), off-brand tone, accidental likenesses of real people, copied logos or offensive imagery. Reviewing AI output before it goes live is part of brand safety now.",
    ],
    why: [
      "One badly placed ad or one false AI-written claim can undo years of [brand consistency](/glossary/brand-consistency) and trust. Screenshots travel fast, and customers rarely care whether a person or a tool made the mistake.",
      "Advertising rules apply to AI-made content too. Claims must be true and substantiated whatever produced them.",
    ],
    how: {
      heading: 'How to keep AI marketing brand safe',
      steps: [
        'Write down what your brand never says or shows, and include it in prompts and briefs.',
        'Ground AI copy in your own facts and check every claim.',
        'Avoid generating real people, competitor logos or copyrighted characters.',
        'Use platform placement controls and exclusion lists for paid ads.',
        'Have a person approve anything before it is published or boosted.',
      ],
    },
    related: ['brand-consistency', 'brand-guidelines', 'ai-hallucination', 'deepfake', 'paid-social', 'content-credentials'],
    faqs: [
      {
        question: 'What is the difference between brand safety and brand suitability?',
        answer: ["Brand safety avoids content that is harmful for almost any advertiser. Brand suitability is about what fits your particular brand, which can be stricter or looser."],
      },
      {
        question: 'How can AI hurt brand safety?',
        answer: ["AI can invent claims, write in the wrong tone, produce images that resemble real people or trademarks, or create offensive content by accident. A human review step catches most of this."],
      },
    ],
  },
  {
    slug: 'mcp',
    term: 'MCP (Model Context Protocol)',
    aka: ['Model Context Protocol', 'MCP server'],
    category: 'ai',
    short: 'MCP (Model Context Protocol) is an open standard that lets AI assistants connect to outside tools and data, so they can read information and take actions.',
    definition: [
      "MCP (Model Context Protocol) is an open standard for connecting AI assistants to outside tools and data. An app publishes an MCP server that describes its tools, such as 'search orders' or 'render video', and any compatible AI client can discover and call them. It was introduced by Anthropic in late 2024 and is now widely supported.",
      "MCP has two sides. An MCP server wraps a service, database or file system and exposes tools, resources and prompts. An MCP client, built into an assistant like Claude, ChatGPT or a coding tool, connects to servers and lets the model use them during a conversation. Remote servers usually sign users in with OAuth.",
      "Before MCP, each AI app needed a custom integration for every tool. A shared protocol means one server works with many assistants, which is a big reason [AI agents](/glossary/ai-agent) can now work across real business software.",
    ],
    why: [
      "MCP lets you run marketing work from an AI assistant: ask it to check your brand profile, draft a week of posts and render the images, without copying text between apps.",
      "It also keeps the AI grounded. Instead of guessing, the assistant reads real data from your tools, which reduces [AI hallucination](/glossary/ai-hallucination) and makes the output specific to your business.",
    ],
    how: {
      heading: 'How to connect an MCP server',
      steps: [
        'Find the MCP server URL in the service\'s docs or settings.',
        'In your AI assistant, add a custom connector or MCP server with that URL.',
        'Sign in and approve access, or set an API key as an environment variable for CLI tools.',
        'Ask the assistant to list the available tools and try a free, read-only one first.',
        'Check which tools cost money or change data before letting an agent run them.',
      ],
    },
    openpromo: {
      body: 'OpenPromo has an MCP server with 20 tools to read and edit the brand, write ideas and creations, render and fetch files. ChatGPT and Claude connect with OAuth sign-in; other agents use an API key.',
      href: '/docs/mcp',
      label: 'Connect an agent',
    },
    related: ['ai-agent', 'llm', 'marketing-automation', 'byok', 'prompt'],
    faqs: [
      {
        question: 'What is an MCP server?',
        answer: ["A small service that exposes an app's actions and data to AI assistants in the MCP format. The assistant connects to it and can call its tools when you ask."],
      },
      {
        question: 'Is MCP only for Claude?',
        answer: ["No. Anthropic created it as an open standard, and many other assistants, coding tools and agent frameworks now support MCP."],
      },
      {
        question: 'What is the difference between MCP and an API?',
        answer: ["An API is how software talks to software. MCP is a standard way to describe tools and data so AI models can find and use them; MCP servers often call an API underneath."],
      },
    ],
  },
  {
    slug: 'ai-agent',
    term: 'AI agent',
    aka: ['AI agents', 'agentic AI', 'autonomous agent'],
    category: 'ai',
    short: 'An AI agent is an AI system that works toward a goal by planning steps, using tools and acting on results, with less step-by-step human input.',
    definition: [
      "An AI agent is an AI system that works toward a goal by deciding what to do next, using tools, checking the results and continuing until the task is done. Most agents are built on a [large language model](/glossary/llm) connected to tools like search, files, apps and APIs. Unlike a chatbot, an agent acts, not just answers.",
      "Agents range from simple to complex. A simple agent might look up data and draft a report. A more capable one can browse sites, edit files and call several services in a row. Standards like [MCP](/glossary/mcp) make it easier to give agents access to business tools.",
      "Agents still make mistakes and can take wrong actions confidently. Good setups limit what an agent may do on its own, ask for approval on anything costly or public, and log every action.",
    ],
    why: [
      "Agents can take over multi-step marketing chores: research a topic, draft posts, make the images, and put everything in one place for review. For a small team, that is time back each week.",
      "The value depends on control. An agent that can spend money or publish without checks can cause expensive or embarrassing mistakes, so spending limits and approval steps matter as much as capability.",
    ],
    how: {
      heading: 'How to use AI agents for marketing',
      steps: [
        'Start with a clear, bounded task, such as drafting a week of posts from your brand profile.',
        'Connect only the tools the agent needs, with the least access that works.',
        'Set spending limits on any paid tools it can call.',
        'Require your approval before anything is published or paid for.',
        'Review its output and logs, then widen the scope slowly.',
      ],
    },
    openpromo: {
      body: 'Agents can run the OpenPromo workflow through 20 MCP tools or the REST API, and paid tools state their cost. A monthly spending limit refuses calls that would cross it.',
      href: '/docs/mcp-tools',
      label: 'See the MCP tools',
    },
    related: ['mcp', 'llm', 'marketing-automation', 'ai-marketing', 'byok', 'generative-ai'],
    faqs: [
      {
        question: 'What is the difference between an AI agent and a chatbot?',
        answer: ["A chatbot answers in conversation. An agent pursues a goal across several steps, using tools to take actions, such as reading files, calling APIs or making media."],
      },
      {
        question: 'Are AI agents safe to use?',
        answer: ["They can be, with limits. Give them only the access they need, cap spending and require approval for public or irreversible actions."],
      },
    ],
  },
  {
    slug: 'marketing-automation',
    term: 'Marketing automation',
    aka: ['automated marketing', 'social media automation'],
    category: 'ai',
    short: 'Marketing automation is software that runs repetitive marketing tasks on rules or triggers, like scheduled posts, email sequences and lead scoring.',
    definition: [
      "Marketing automation is the use of software to run repetitive marketing tasks automatically, based on rules, schedules or customer actions. Common examples are email sequences that start when someone signs up, scheduled social posts, lead scoring, abandoned cart reminders and syncing contacts between tools. It saves time and keeps follow-up consistent.",
      "Traditional automation is rule-based: 'if a visitor downloads the guide, send email two after three days'. It does exactly what it is told. [AI marketing](/glossary/ai-marketing) adds judgment and generation on top, such as writing the email, picking the send time or choosing which product to show.",
      "Newer [AI agents](/glossary/ai-agent) blur the line further, since they can plan and carry out several steps toward a goal. Most businesses combine both: fixed rules for reliable workflows, and AI for content and decisions where variation is useful.",
    ],
    why: [
      "Automation makes sure leads get followed up, posts go out on schedule and customers get the right message at the right time, even when the team is busy. It turns a [content calendar](/glossary/content-calendar) into something that actually runs.",
      "Over-automation has a cost: generic messages, posts that ignore current events and replies that feel robotic. Keep a person watching what goes out.",
    ],
    how: {
      heading: 'How to set up marketing automation',
      steps: [
        'Map one customer journey, such as signup to first purchase.',
        'Pick the trigger points: a signup, a download, a cart left behind.',
        'Write the message for each step, and decide the delay between steps.',
        'Schedule social posts in batches so the calendar stays full.',
        'Review results monthly and remove steps that do not help.',
      ],
    },
    example: {
      label: 'Example',
      body: "A bike shop sets up three automations: a welcome email when someone joins the newsletter, a service reminder six months after a tune-up, and a weekly batch of scheduled posts made in one sitting each Monday.",
    },
    related: ['ai-marketing', 'ai-agent', 'content-calendar', 'content-batching', 'customer-journey', 'mcp'],
    faqs: [
      {
        question: 'What is an example of marketing automation?',
        answer: ["A welcome email series that starts automatically when someone subscribes, or social posts scheduled in advance to publish at set times."],
      },
      {
        question: 'Is marketing automation the same as AI?',
        answer: ["No. Automation follows rules you set. AI can create content or make decisions. Many tools now combine both."],
      },
    ],
  },
  {
    slug: 'byok',
    term: 'BYOK (bring your own key)',
    aka: ['bring your own key', 'bring your own API key'],
    category: 'ai',
    short: 'BYOK (bring your own key) means using your own API key for an AI provider inside an app, so you pay the provider directly for what you use.',
    definition: [
      "BYOK (bring your own key) is a setup where you enter your own API key for an AI or data provider into an app, instead of using the app's shared account. The app sends requests with your key, so usage is billed to you by the provider at its prices, and you can see and control exactly what you spend.",
      "BYOK is common in open-source and developer tools, AI writing apps and automation platforms. The alternative is bundled pricing, where the app pays the provider and charges you a subscription or credits with a margin on top.",
      "In security, BYOK has a second meaning: customers supplying their own encryption keys to a cloud service. In AI tools, it almost always means bringing an API key for model access.",
    ],
    why: [
      "BYOK can make AI media cheaper and more transparent. You pay per use at the provider's rates, with no markup and no monthly minimum, which suits businesses that create content in bursts.",
      "You also take on responsibility: keep the key secret, set spending limits, and choose apps that store keys encrypted and never show them back.",
    ],
    how: {
      heading: 'How to use your own API key safely',
      steps: [
        'Create a dedicated key for each app, so you can revoke one without breaking others.',
        'Set a spending limit or budget alert on the provider account.',
        'Paste the key only into the app\'s settings, never into chats, posts or code repositories.',
        'Check that the app encrypts stored keys and shows costs per call.',
        'Rotate the key if you think it has leaked.',
      ],
    },
    openpromo: {
      body: 'OpenPromo runs on your own YepAPI key: OpenPromo adds no markup, every call is listed with its cost and a monthly limit stops spending at the line you set. Stored keys are encrypted at rest.',
      href: '/docs/costs-and-limits',
      label: 'See costs and limits',
    },
    related: ['mcp', 'ai-agent', 'generative-ai', 'marketing-automation', 'llm'],
    faqs: [
      {
        question: 'What does BYOK mean in AI apps?',
        answer: ["It means the app uses your own API key for the AI provider, so the provider bills you directly for usage instead of the app charging you for credits."],
      },
      {
        question: 'Is BYOK cheaper than a subscription?',
        answer: ["Often, if your usage is light or uneven, because you pay only for what you use at the provider's rates. Heavy users should compare both with real numbers."],
      },
    ],
  },
];
