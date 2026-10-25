import type { GlossaryTerm } from './types';

export const terms: GlossaryTerm[] = [
  {
    slug: 'hook',
    term: 'Hook',
    aka: ['video hook', 'ad hook', 'opening hook'],
    category: 'video-making',
    short: 'A hook is the opening line, image or moment of a video or post that grabs attention and makes people keep watching instead of scrolling past.',
    definition: [
      "A hook is the first one to three seconds of a video, or the first line of a post, built to stop someone from scrolling. It can be a bold statement, a question, a surprising image or a promise of what comes next. Its only job is to earn the next few seconds of attention.",
      "Hooks work on more than one layer at once. There is the spoken hook (what the voice says), the text hook (the words on screen, which matter because many people watch with the sound off) and the visual hook (movement, a face, a product in an unexpected place). The strongest openings line all three up so they say the same thing.",
      "Common hook types include the question (\"Still paying for X?\"), the bold claim, the result first (show the finished thing, then how), the mistake (\"Stop doing this\"), the list (\"3 things...\") and the [pattern interrupt](/glossary/pattern-interrupt), which breaks what the viewer expects to see. In ads the same idea is often called an ad hook or the thumb-stop.",
    ],
    why: [
      "On feeds like Reels, TikTok and Shorts, people decide in a second or two whether to keep watching. If the opening does not hold them, the rest of the video never gets seen, however good it is. Platforms also watch early drop-off closely, so a weak hook hurts [audience retention](/glossary/audience-retention) and how widely the video is shown.",
      "For a business, the hook decides whether your message reaches anyone at all. A clear, specific hook also filters the audience: it tells the right people this video is for them, which makes the viewers who stay more likely to click, follow or buy.",
    ],
    how: {
      heading: 'How to write a video hook',
      steps: [
        'Write down the one thing the viewer gets from the video: a result, a tip, an answer or a deal.',
        'Turn it into a short opening line of 5 to 10 words that names that payoff or the problem it solves.',
        'Put the same words on screen as large text in the first frame, so it works with the sound off.',
        'Start with movement or a clear visual, not a logo or a slow intro.',
        'Cut anything before the hook: no greetings, no "hey guys", no title card.',
        'Test two or three hooks on the same video body and keep the one with the best early retention.',
      ],
    },
    example: {
      label: 'Hook examples for one video',
      body: "A bakery called Crumb & Co is posting a reel about its sourdough. A weak opening shows the logo, then the shop front. Stronger hooks: \"This loaf takes 36 hours. Here's why.\" (curiosity), \"Your supermarket sourdough probably isn't sourdough\" (bold claim), or a close-up of the crust cracking as it is sliced (visual hook) with the text \"The sound you came for\".",
    },
    openpromo: {
      body: "OpenPromo's reel writer puts a hook in the first two seconds of every reel, and a check flags the reel before rendering if the hook is missing.",
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['thumb-stopping', 'pattern-interrupt', 'audience-retention', 'video-script', 'short-form-video', 'call-to-action'],
    faqs: [
      {
        question: 'How long should a video hook be?',
        answer: ['About one to three seconds, or a single short sentence. On short-form platforms people decide almost immediately, so the hook should land before the first cut.'],
      },
      {
        question: 'What makes a good hook?',
        answer: ['It is specific, it is about the viewer rather than you, and it creates a reason to keep watching: a question to answer, a result to see or a mistake to avoid. It also matches what the video actually delivers, or viewers leave and feel tricked.'],
      },
      {
        question: 'Do hooks matter for long videos too?',
        answer: ['Yes. YouTube viewers also decide in the first seconds. A long video usually opens by stating what the viewer will learn or see, then gets to it quickly.'],
      },
    ],
  },
  {
    slug: 'video-script',
    term: 'Video script',
    aka: ['script', 'video scriptwriting'],
    category: 'video-making',
    short: 'A video script is the written plan for a video: what is said, what appears on screen and in what order, scene by scene.',
    definition: [
      "A video script is the written version of a video before it is made. It sets out every line of narration or dialogue, the text that appears on screen and the visuals for each scene, in order. A good script fixes the message, the length and the structure, so filming and editing follow a clear plan.",
      "Scripts come in a few formats. A two-column script (often called an AV script) puts visuals on the left and audio on the right, row by row, which suits marketing and explainer videos. A screenplay format is used for drama and longer narrative work. For short social videos, a script can be as simple as a hook, three beats and a [call to action](/glossary/call-to-action).",
      "A script is not the same as a [storyboard](/glossary/storyboard). The script is words; the storyboard is pictures of each shot. Many teams write the script first, then sketch the storyboard and build a [shot list](/glossary/shot-list) from both.",
    ],
    why: [
      "Writing the script first is the cheapest way to fix a video. Changing a sentence costs nothing; reshooting a scene costs a day. A script also keeps the message tight, so the video says one thing clearly instead of wandering.",
      "For marketing, the script is where the [hook](/glossary/hook), the key benefit and the call to action are decided. It is also where you check claims are true and the length suits the platform: a 30-second reel has room for roughly 60 to 80 spoken words.",
    ],
    how: {
      heading: 'How to write a video script',
      steps: [
        'Decide the one message and the one action you want viewers to take.',
        'Pick the length for the platform, then budget words: roughly 2 to 2.5 spoken words per second.',
        'Open with the hook, then follow a simple structure such as problem, solution, proof, call to action.',
        'Write it in two columns: what we see and what we hear, one row per scene.',
        'Read it out loud with a timer and cut anything that is hard to say or not needed.',
        'Check every figure and claim against your website or product before anything is filmed.',
      ],
    },
    example: {
      label: 'Two-column script snippet',
      code: "SCENE 1 (0-3s)\nVISUAL: Close-up of a flat bike tire, rider sighing.\nTEXT: Flat again?\nVO: Third flat this month? It's probably not bad luck.\n\nSCENE 2 (3-10s)\nVISUAL: Mechanic at Spoke & Chain checks tire pressure.\nTEXT: Free pressure check\nVO: Most flats come from low pressure. We'll check yours free, in two minutes.",
    },
    openpromo: {
      body: 'For reels, promo videos and tutorials, OpenPromo writes the script as scenes, each with a layout, on-screen text and a line of narration, from the selling points in your brand profile.',
      href: '/features/url-to-video',
      label: 'See URL to video',
    },
    related: ['storyboard', 'shot-list', 'hook', 'voiceover', 'copywriting', 'call-to-action'],
    faqs: [
      {
        question: 'How many words is a 60-second video script?',
        answer: ['About 130 to 160 spoken words at a normal pace. Fast, energetic reads go higher; calm explainers go lower. Read it aloud with a timer to be sure.'],
      },
      {
        question: 'Do short social videos need a script?',
        answer: ['A short outline at least. Even a 15-second reel benefits from a written hook, two or three beats and a call to action, so you do not ramble on camera.'],
      },
    ],
  },
  {
    slug: 'storyboard',
    term: 'Storyboard',
    aka: ['storyboarding', 'video storyboard'],
    category: 'video-making',
    short: 'A storyboard is a sequence of sketches or frames that shows each shot of a video in order, with notes on action, text and audio.',
    definition: [
      "A storyboard is a series of drawn or rendered frames that shows what each shot of a video will look like, in order. Each panel usually has a sketch of the framing plus notes on movement, on-screen text, narration and timing. It turns a script into a visual plan before any filming or animation starts.",
      "Storyboards range from stick figures on paper to detailed digital frames. Animation and ad agencies often make polished boards to get client sign-off. For social video, a rough thumbnail board of six to twelve panels is often enough. An animatic is a storyboard cut together with timing and rough audio, so you can watch the pacing before production.",
      "The storyboard sits between the [video script](/glossary/video-script) and the [shot list](/glossary/shot-list). The script says what is said, the storyboard shows how it looks, and the shot list turns that into a practical filming checklist.",
    ],
    why: [
      "A storyboard catches problems while they are still cheap: a scene that does not make sense without sound, a product that is never shown clearly, or text that would cover a face. It gets everyone (owner, designer, editor) agreeing on the same picture before money is spent.",
      "It also helps vertical and short videos work. Sketching each frame in 9:16 forces you to think about where text goes, what fills the [safe zone](/glossary/safe-zone) and whether the first frame is strong enough to act as a [hook](/glossary/hook).",
    ],
    how: {
      heading: 'How to make a storyboard',
      steps: [
        'Start from a finished script and split it into scenes or shots.',
        'Draw one frame per shot at the final aspect ratio (9:16, 1:1 or 16:9).',
        'Sketch the framing: what is in shot, how close, and where the subject sits.',
        'Under each frame, note the action, the on-screen text, the narration line and the length in seconds.',
        'Mark camera moves and transitions with arrows or short notes.',
        'Flip through the board in order (or make an animatic) and fix gaps in the story.',
      ],
    },
    example: {
      label: 'Storyboard for a 20-second reel',
      body: "A yoga studio plans a reel for a beginners' class. Panel 1: a person struggling to touch their toes, text \"Can't touch your toes?\". Panel 2: wide shot of a calm class. Panel 3: close-up of the instructor adjusting a pose. Panel 4: the same person reaching further, smiling. Panel 5: studio logo and \"First class free\" with the booking link. Each panel notes its length, about 3 to 5 seconds.",
    },
    related: ['video-script', 'shot-list', 'b-roll', 'transition', 'mood-board'],
    faqs: [
      {
        question: 'What is the difference between a storyboard and a script?',
        answer: ['A script is the words: narration, dialogue and on-screen text. A storyboard is the pictures: what each shot looks like. Most productions use both, script first.'],
      },
      {
        question: 'Do I need to draw well to make a storyboard?',
        answer: ['No. Stick figures and boxes are fine as long as the framing and action are clear. Some people use photos taken on a phone or simple frames from a design tool instead.'],
      },
    ],
  },
  {
    slug: 'shot-list',
    term: 'Shot list',
    aka: ['shooting list', 'shot sheet'],
    category: 'video-making',
    short: 'A shot list is a checklist of every shot needed for a video, with framing, angle, location and notes, used to plan and run the shoot.',
    definition: [
      "A shot list is a document that lists every shot you need to film for a video, usually in a table. Each row describes one shot: the scene, the framing (wide, medium, close-up), the camera angle or movement, the location, props and any notes. It turns a script and storyboard into a practical plan for the day.",
      "Shot lists are usually ordered by shooting efficiency rather than story order. You film everything in one location or with one setup together, even if those shots appear at different points in the edit. Columns often include shot number, scene, shot size, angle, movement, audio, talent and a done checkbox.",
      "For small business videos, a shot list is often the only planning document besides the [video script](/glossary/video-script). It is especially useful for [B-roll](/glossary/b-roll), because it is easy to forget the small cutaway shots that make editing possible.",
    ],
    why: [
      "A shot list stops you getting home and finding a missing shot. Reshooting means booking the location, the people and the light again, which can cost more than the original shoot.",
      "It also makes shoots faster and cheaper. When everyone knows what comes next, setups are grouped, time is not wasted deciding on the spot, and the editor gets every piece needed to cut the [promo video](/glossary/promo-video) or reel as planned.",
    ],
    how: {
      heading: 'How to make a shot list',
      steps: [
        'Go through the script and storyboard and write down every shot each scene needs.',
        'For each shot, note size (wide, medium, close-up), angle, movement and any props or people.',
        'Add B-roll and cutaways: hands, product details, the space, reactions.',
        'Reorder the list by location and setup so you film efficiently.',
        'Estimate time per shot and check the list fits the time you have.',
        'Tick shots off during the shoot and grab a couple of spare takes of the key ones.',
      ],
    },
    example: {
      label: 'Shot list rows',
      code: "#  | Scene | Shot        | Angle / move       | Notes\n1  | 1     | Wide        | Eye level, static  | Bakery counter, morning light\n2  | 2     | Close-up    | Overhead           | Hands shaping dough\n3  | 2     | Extreme CU  | Slow push in       | Crust cracking as bread is sliced\n4  | 4     | Medium      | Handheld follow    | Customer taking the bag, smiling",
    },
    related: ['storyboard', 'video-script', 'b-roll', 'a-roll', 'talking-head-video'],
    faqs: [
      {
        question: 'What is the difference between a shot list and a storyboard?',
        answer: ['A storyboard shows what shots look like, in story order. A shot list is a written checklist of the same shots, often reordered for filming, with practical details like location and gear.'],
      },
      {
        question: 'Do I need a shot list for phone videos?',
        answer: ['A short one helps. Even five or ten lines on your phone notes app makes sure you capture the B-roll and close-ups you will want when editing.'],
      },
    ],
  },
  {
    slug: 'b-roll',
    term: 'B-roll',
    aka: ['AI B-roll', 'B roll', 'cutaway footage'],
    category: 'video-making',
    short: 'B-roll is supporting footage cut into a video over the main shot, such as product close-ups or scenes of a space, to show what is being said.',
    definition: [
      "B-roll is the supporting footage that plays over or between the main shot of a video. While someone talks on camera (the A-roll), B-roll shows what they are talking about: the product in use, the workspace, close-ups, customers or screens. It adds visual interest and helps hide cuts in the main footage.",
      "The name comes from film editing, when footage was split across two reels, A and B, so an editor could cut between them. Today B-roll can be filmed on purpose, pulled from stock libraries, taken from screen captures or made with AI video models, which is often called AI B-roll.",
      "B-roll is not filler. Good B-roll matches the narration closely: when the voice says \"hand-stitched\", the screen shows hands stitching. It is also what makes [jump cuts](/glossary/jump-cut) in a [talking head video](/glossary/talking-head-video) less jarring, because the cut happens while the B-roll covers it.",
    ],
    why: [
      "Viewers believe what they can see. B-roll turns claims into proof: instead of saying the coffee is roasted in-house, you show the roaster. That makes marketing videos more convincing and easier to follow.",
      "B-roll also helps [audience retention](/glossary/audience-retention). Changing the picture every few seconds keeps short-form videos moving, and it lets you edit a long take down to the best lines without the viewer noticing.",
    ],
    how: {
      heading: 'How to use B-roll in a video',
      steps: [
        'Read the script and mark every noun or claim that could be shown on screen.',
        'Film or source two or three clips for each: wide, close-up and a detail.',
        'Keep clips short, usually 2 to 5 seconds each in social video.',
        'Cut B-roll in over the A-roll where you trimmed words, so the edit is hidden.',
        'Match the clip to the exact phrase being spoken, not just the general topic.',
        'Check rights: use your own footage, licensed stock or AI clips you are allowed to publish.',
      ],
    },
    example: {
      label: 'B-roll over narration',
      body: "A bike shop owner records a 30-second talking head about wheel truing. As she says \"we true every wheel by hand\", the video cuts to a close-up of spoke keys turning. When she mentions the test ride, it cuts to a rider leaving the shop. Her voice continues underneath; the B-roll shows each point as she makes it.",
    },
    openpromo: {
      body: "OpenPromo uses your website screenshots, product photos and uploads first. AI pictures and short AI video clips can fill scenes as optional B-roll when your own pictures do not fit, and each is priced per use.",
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['a-roll', 'talking-head-video', 'jump-cut', 'image-to-video', 'shot-list', 'text-to-video'],
    faqs: [
      {
        question: 'What is the difference between A-roll and B-roll?',
        answer: ['A-roll is the main footage that carries the story, usually someone talking or the core action. B-roll is the supporting footage cut in over or between it to show what is being described.'],
      },
      {
        question: 'Where can I get B-roll?',
        answer: ['Film it yourself (often the best option for a real business), use licensed stock footage, record your screen for software, or generate clips with an AI video model. Always check you have the right to publish it.'],
      },
      {
        question: 'What is AI B-roll?',
        answer: ['Supporting clips generated by an AI video or image-to-video model instead of filmed. It works for moods, backgrounds and generic scenes, but your real product and premises are usually better shown with real footage.'],
      },
    ],
  },
  {
    slug: 'a-roll',
    term: 'A-roll',
    aka: ['A roll', 'primary footage', 'main footage'],
    category: 'video-making',
    short: 'A-roll is the main footage of a video that carries the story, usually a person speaking to camera or the core action, with B-roll cut in around it.',
    definition: [
      "A-roll is the primary footage of a video, the shots that carry the story or message. In most marketing and social videos it is a person talking to camera, an interview or a presenter. The audio from the A-roll usually runs through the whole video, while other footage is cut in over it.",
      "The term comes from film editing, where the main material sat on reel A and supporting shots on reel B. Editors would cut between the two to build the final sequence. The words stuck even though editing went digital decades ago.",
      "In a faceless or narrated video, there may be no A-roll in the classic sense. The [voiceover](/glossary/voiceover) plays the role of the A-roll's audio, and the picture is made entirely from [B-roll](/glossary/b-roll), screenshots, graphics or [motion graphics](/glossary/motion-graphics).",
    ],
    why: [
      "The A-roll is where trust is built. A real owner, employee or customer speaking directly to the viewer gives a business a face and a voice, which a stock montage cannot.",
      "Planning A-roll first also keeps videos focused. Once the main message is recorded cleanly, everything else (B-roll, captions, music) supports it rather than competing with it.",
    ],
    how: {
      heading: 'How to film good A-roll',
      steps: [
        'Write or outline what will be said before you press record.',
        'Use a microphone close to the speaker; viewers forgive soft video more than bad audio.',
        'Face a window or soft light and keep the background tidy and on-brand.',
        'Frame at eye level, with room at the top for captions or text in vertical video.',
        'Record several takes of the key lines so the editor can pick the best.',
      ],
    },
    related: ['b-roll', 'talking-head-video', 'jump-cut', 'shot-list', 'voiceover'],
    faqs: [
      {
        question: 'Is A-roll always someone talking?',
        answer: ['Usually, but not always. A-roll is whatever carries the main story. In a cooking video it might be the full recipe being made; in an event video, the main stage.'],
      },
      {
        question: 'Can a video be all B-roll?',
        answer: ['Yes. Many faceless and narrated videos are made only of supporting visuals with a voiceover or text on screen. In that case the narration does the job the A-roll would.'],
      },
    ],
  },
  {
    slug: 'talking-head-video',
    term: 'Talking head video',
    aka: ['talking head', 'to-camera video', 'face-to-camera video'],
    category: 'video-making',
    short: 'A talking head video shows a person speaking directly to the camera, framed from the chest or shoulders up, often with captions and B-roll.',
    definition: [
      "A talking head video is a video where one person speaks directly to the camera, usually framed from the chest or shoulders up. It is one of the simplest and most common formats in marketing: founders explaining a product, experts giving tips, staff answering questions. Most are filmed on a phone or webcam.",
      "The format is flexible. A plain talking head can be lifted with [jump cuts](/glossary/jump-cut) to remove pauses, captions on screen, cutaways to [B-roll](/glossary/b-roll), zooms for emphasis or a green-screen background showing a post or chart. Interviews, where the person speaks to someone just off camera, are a close relative.",
      "Talking heads are the opposite of a [faceless video](/glossary/faceless-video). AI avatar tools now generate synthetic talking heads, but these are a different thing from a real person on camera and should be labeled as synthetic where platforms or laws require it.",
    ],
    why: [
      "People connect with faces. A real person explaining something in their own words builds trust and familiarity quickly, which is why talking heads do well for service businesses, coaches, founders and local shops.",
      "They are also cheap and fast to make. With a phone, a window and a decent mic, a business can produce a steady stream of [short-form videos](/glossary/short-form-video) without a crew.",
    ],
    how: {
      heading: 'How to make a talking head video',
      steps: [
        'Pick one question or tip per video and open with it as the hook.',
        'Place the camera at eye level and look into the lens, not at the screen.',
        'Light your face from the front or side with a window or soft light, and use an external mic.',
        'Record in short sections; it is easier than one perfect take.',
        'Cut out pauses and mistakes, add captions, and cut in B-roll wherever you mention something visual.',
      ],
    },
    example: {
      label: 'Talking head idea',
      body: "The owner of a yoga studio films a 40-second video answering \"Do I need to be flexible to start yoga?\". She opens with the question as on-screen text, answers in three short points, cuts to a clip of a beginners' class while she talks, and ends with \"Your first class is on us, link in bio.\"",
    },
    related: ['a-roll', 'b-roll', 'jump-cut', 'faceless-video', 'ai-avatar', 'animated-captions'],
    faqs: [
      {
        question: 'Do talking head videos still work?',
        answer: ['Yes, when the person has something useful to say and the edit is tight. The format works best with a strong hook, captions and a quick pace.'],
      },
      {
        question: 'How long should a talking head video be?',
        answer: ['For Reels, TikTok and Shorts, 20 to 60 seconds is common. On YouTube or a website, a few minutes is fine if the content holds up.'],
      },
    ],
  },
  {
    slug: 'faceless-video',
    term: 'Faceless video',
    aka: ['faceless content', 'faceless YouTube video', 'faceless reel'],
    category: 'video-making',
    short: 'A faceless video is a video where nobody appears on camera; it relies on voiceover, text, footage, screenshots or graphics to deliver the message.',
    definition: [
      "A faceless video is a video in which no one appears on camera. The message comes through a voiceover, on-screen text, captions, stock or B-roll footage, screen recordings, product shots or animation. It is popular for brands, educational channels and creators who do not want to be on camera or need to publish at volume.",
      "Common faceless formats include narrated slideshows, text-on-screen reels with music, screen tutorials, product close-ups with captions, list videos and animated explainers. The [voiceover](/glossary/voiceover) can be a real person or [text to speech](/glossary/text-to-speech).",
      "Faceless does not mean low effort. Without a face to hold attention, the [hook](/glossary/hook), the pacing, the captions and the visuals have to work harder. Many faceless channels use [kinetic typography](/glossary/kinetic-typography) or word-by-word captions to keep the eye busy.",
    ],
    why: [
      "Faceless video lets a business publish video without depending on one person's time or comfort on camera. It is easier to batch, easier to hand to a team or tool, and easier to keep consistent across many posts.",
      "It also scales well across languages and formats. When the message lives in a script and visuals rather than a person on camera, the same video can be re-voiced, re-captioned or resized with little extra work.",
    ],
    how: {
      heading: 'How to make a faceless video',
      steps: [
        'Write a short script with a clear hook and one main point.',
        'Gather visuals: product photos, screenshots, your own footage, then stock or AI clips if needed.',
        'Record a voiceover or generate one, and set the pace to roughly match the visuals.',
        'Add large, readable captions; many viewers watch muted.',
        'Change the picture every few seconds and finish with a clear call to action.',
      ],
    },
    openpromo: {
      body: "OpenPromo makes scene-based videos with text, pictures, AI voiceover, music and word-by-word captions. It does not make talking avatars, so its reels and promo videos are faceless by design.",
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['talking-head-video', 'voiceover', 'text-to-speech', 'b-roll', 'animated-captions', 'ai-avatar'],
    faqs: [
      {
        question: 'Can faceless videos do well?',
        answer: ['Yes. Plenty of channels and brand accounts publish only faceless content. What matters is a strong opening, useful or entertaining content and good pacing, not whether a face is shown.'],
      },
      {
        question: 'Are faceless videos allowed to be monetized?',
        answer: ["Generally yes, but platforms such as YouTube restrict repetitive or mass-produced content with little original value. Add your own script, visuals and point of view, and check each platform's current policy."],
      },
    ],
  },
  {
    slug: 'screen-recording',
    term: 'Screen recording',
    aka: ['screencast', 'screen capture video'],
    category: 'video-making',
    short: 'A screen recording is a video capture of what happens on a computer or phone screen, often with a voiceover, used for demos and tutorials.',
    definition: [
      "A screen recording is a video of what appears on a computer, tablet or phone screen, captured as it happens. It can include the mouse pointer, clicks, typing and a narration or webcam overlay. Screen recordings are the backbone of software tutorials, product demos, bug reports and walkthroughs.",
      "Most operating systems now include a basic recorder: macOS, Windows, iOS and Android all ship one. Dedicated tools add features such as zooming in on clicks, hiding notifications, trimming, a picture-in-picture webcam and exporting at a set [aspect ratio](/glossary/aspect-ratio).",
      "A screencast usually means a screen recording made for teaching, with narration. For marketing, raw recordings are often edited: cut down to the key steps, zoomed in so text is readable on a phone, and paired with captions. Screenshots shown step by step are an alternative when a live recording is not needed.",
    ],
    why: [
      "For software and online businesses, screen recordings show the product exactly as it is. A buyer can see how something works before they sign up, which answers questions and reduces support requests.",
      "They also power the formats that sell software: [product demo videos](/glossary/product-demo-video), [tutorial videos](/glossary/tutorial-video) and onboarding clips. A short, clear recording of one task often does more than a long feature list.",
    ],
    how: {
      heading: 'How to make a good screen recording',
      steps: [
        'Clean up first: close other tabs, hide notifications and use a demo account with tidy sample data.',
        'Write the steps you will show, and practise the clicks once.',
        'Record at a high resolution and zoom the browser so text stays readable on small screens.',
        'Move the mouse slowly and pause briefly after each click.',
        'Trim dead time, zoom in on key areas and add captions or narration explaining each step.',
      ],
    },
    related: ['product-demo-video', 'tutorial-video', 'explainer-video', 'voiceover', 'aspect-ratio'],
    faqs: [
      {
        question: 'How do I record my screen with sound?',
        answer: ["Most built-in recorders can capture your microphone; some can also capture system audio. Check the recorder's audio settings before you start, and do a short test clip."],
      },
      {
        question: 'Can screen recordings work on vertical platforms?',
        answer: ['Yes, but a full desktop screen is too small in 9:16. Crop or zoom to the part of the screen that matters, or record a phone app directly, and add large captions.'],
      },
    ],
  },
  {
    slug: 'transition',
    term: 'Transition',
    aka: ['video transitions', 'scene transition'],
    category: 'video-making',
    short: 'A transition is the way a video moves from one shot or scene to the next, such as a cut, fade, dissolve, wipe, zoom or match cut.',
    definition: [
      "A transition is the technique an editor uses to move from one shot or scene to the next. The most common is the plain cut, where one shot simply replaces the other. Others include fades, dissolves, wipes, slides, zooms, whip pans and match cuts. Each changes how the change of scene feels to the viewer.",
      "Transitions carry meaning. A hard cut feels immediate. A dissolve suggests time passing or a soft link between two ideas. A fade to black ends a section. A match cut connects two shots through a shared shape or movement. On social platforms, creative in-camera transitions (an outfit change on a hand cover, a spin, a jump) are a format of their own.",
      "Most professional editing relies on plain cuts, with other transitions used sparingly. Too many effects make a video look dated and slow it down, while a well-placed transition can add energy or clarity. Related techniques include the [jump cut](/glossary/jump-cut) and the [Ken Burns effect](/glossary/ken-burns-effect) on still images.",
    ],
    why: [
      "Transitions control pace. In [short-form video](/glossary/short-form-video), quick cuts and clean transitions keep viewers watching; a slow fade at the wrong moment is a common place for people to scroll away.",
      "They also keep a brand consistent. Using the same small set of transitions, colors and timing across videos makes a channel feel recognizable, the same way consistent fonts do on a feed.",
    ],
    how: {
      heading: 'How to use video transitions well',
      steps: [
        'Default to a straight cut, and only add an effect when it has a reason.',
        'Cut on movement: change shots while something is moving, so the eye follows across.',
        'Use dissolves or fades for time jumps or a change of section, not between every shot.',
        'Keep transition length short, often under half a second in social video.',
        'Pick two or three transition styles for your brand and reuse them.',
      ],
    },
    related: ['jump-cut', 'ken-burns-effect', 'motion-graphics', 'storyboard', 'loop-video'],
    faqs: [
      {
        question: 'What is the most common video transition?',
        answer: ['The straight cut. Most films, ads and social videos use simple cuts for the vast majority of scene changes, with fades and other effects used rarely.'],
      },
      {
        question: 'What are TikTok and Reels transitions?',
        answer: ['Creative in-camera tricks where the creator moves, covers the lens or matches a pose so the cut between two clips looks magical. They rely on careful filming more than editing effects.'],
      },
    ],
  },
  {
    slug: 'jump-cut',
    term: 'Jump cut',
    aka: ['jump cuts'],
    category: 'video-making',
    short: 'A jump cut is an edit between two shots of the same subject from almost the same angle, so the subject seems to jump forward in time.',
    definition: [
      "A jump cut is an edit that joins two shots of the same subject taken from the same or nearly the same position, with a gap in time between them. The subject appears to jump slightly in the frame. In social video, jump cuts are used deliberately to remove pauses, mistakes and filler words from a talking head.",
      "In classic film editing, jump cuts were usually treated as a mistake because they break the smooth flow of time. French New Wave directors in the late 1950s and 1960s used them on purpose to create an abrupt, restless feel. YouTube vloggers later made them the default style for to-camera videos.",
      "Editors soften jump cuts in a few ways: punching in (zooming the frame slightly on alternate cuts), covering the cut with [B-roll](/glossary/b-roll), or adding a caption change at the same moment. Jump cuts differ from a match cut, which links two different shots through a shared shape or motion.",
    ],
    why: [
      "Jump cuts keep [talking head videos](/glossary/talking-head-video) tight. Cutting every pause and repeated word can shorten a video a lot, which helps [audience retention](/glossary/audience-retention) on platforms where every second counts.",
      "They also lower the bar to filming. Nobody needs a perfect take: you record, stumble, repeat the line, and cut the mistakes out in the edit.",
    ],
    how: {
      heading: 'How to edit with jump cuts',
      steps: [
        'Film your talking head on a tripod so the frame stays steady between takes.',
        'In the edit, cut out pauses, "um"s, repeats and false starts.',
        'On every second or third cut, zoom in about 10 to 20 percent to make the jump feel intentional.',
        'Cover awkward cuts with B-roll or a change of on-screen text.',
        'Watch it back at normal speed to check the rhythm still sounds natural.',
      ],
    },
    related: ['talking-head-video', 'a-roll', 'b-roll', 'transition', 'short-form-video'],
    faqs: [
      {
        question: 'Are jump cuts bad?',
        answer: ['Not in social video, where viewers expect them. They look out of place in polished brand films, interviews or drama, where smoother continuity editing is the norm.'],
      },
      {
        question: 'What is the difference between a jump cut and a match cut?',
        answer: ['A jump cut joins two shots of the same subject and angle, skipping time. A match cut joins two different shots that share a shape, motion or composition, to link two ideas.'],
      },
    ],
  },
  {
    slug: 'ken-burns-effect',
    term: 'Ken Burns effect',
    aka: ['pan and zoom', 'pan and scan effect'],
    category: 'video-making',
    short: 'The Ken Burns effect is a slow pan and zoom across a still photo in a video, adding gentle movement so the image feels alive.',
    definition: [
      "The Ken Burns effect is a video technique that adds slow panning and zooming to a still photograph. The camera seems to drift across the image or push in on a detail, which gives movement to a picture that would otherwise sit static on screen. It is widely used in documentaries, slideshows and social videos built from photos.",
      "The effect is named after the American documentary filmmaker Ken Burns, who used it heavily with archive photographs in his historical films. The technique itself is older: filmmakers had filmed still images with moving rostrum cameras for decades. Apple later put the name on the feature in its photo and video software, which made the term common.",
      "In editing software it is often called pan and zoom. You set a start frame and an end frame on the photo, and the software animates between them. Small, slow moves look best; fast zooms on low-resolution images look cheap and blurry.",
    ],
    why: [
      "Many businesses have far more photos than video footage. The Ken Burns effect turns product shots, event photos and screenshots into usable video, which matters on platforms that favor motion over still images.",
      "Movement holds attention. A slow push in on a detail directs the eye and keeps a [promo video](/glossary/promo-video) from feeling like a static slideshow.",
    ],
    how: {
      heading: 'How to create a Ken Burns effect',
      steps: [
        'Choose high-resolution photos, ideally larger than your video frame, so zooming stays sharp.',
        'Decide what each move should reveal: a face, a product detail or a sign.',
        'Set a start and end framing; keep the zoom modest, around 5 to 20 percent over the clip.',
        'Use slow, steady moves of 3 to 6 seconds, and ease in and out.',
        'Vary direction between photos (in, out, left, right) so the sequence does not feel repetitive.',
      ],
    },
    example: {
      label: 'Ken Burns in a promo',
      body: "A bike shop has photos but no footage of last year's group ride. The editor starts wide on a photo of thirty riders at the start line and slowly zooms toward the shop banner over four seconds, then pans across a close-up of muddy tires on the next photo while the voiceover says \"Join us for this year's ride.\"",
    },
    related: ['transition', 'motion-graphics', 'image-to-video', 'promo-video', 'b-roll'],
    faqs: [
      {
        question: 'Why is it called the Ken Burns effect?',
        answer: ['It is named after documentary filmmaker Ken Burns, who used slow pans and zooms over archive photos throughout his historical documentaries.'],
      },
      {
        question: 'Is image to video the same as the Ken Burns effect?',
        answer: ['No. The Ken Burns effect moves a virtual camera over a flat still. AI image to video models generate new frames, so things inside the picture can move, such as people walking or water flowing.'],
      },
    ],
  },
  {
    slug: 'motion-graphics',
    term: 'Motion graphics',
    aka: ['motion design', 'animated graphics'],
    category: 'video-making',
    short: 'Motion graphics are animated graphic design elements such as text, shapes, icons, charts and logos, used to explain ideas or style a video.',
    definition: [
      "Motion graphics are animated graphic design: text, shapes, icons, charts, logos and illustrations that move on screen. Unlike character animation, they usually do not tell a story through characters. They explain information, show data, label things or give a video a branded look, from animated logo openers to explainer diagrams and on-screen titles.",
      "Typical motion graphics include animated titles, [lower thirds](/glossary/lower-third), logo reveals, infographics, icon animations, progress bars, call-to-action end cards and [kinetic typography](/glossary/kinetic-typography). They are made in tools like After Effects, Motion, browser-based editors, or code-based renderers that build video from HTML and CSS.",
      "Motion graphics sit between graphic design and animation. They follow the same rules as a good static layout (hierarchy, contrast, spacing, brand colors and fonts) with timing and easing added on top.",
    ],
    why: [
      "Motion graphics explain things that are hard to film: a process, a number, a software concept. That makes them central to [explainer videos](/glossary/explainer-video) and product marketing.",
      "They also carry brand identity into video. Consistent animated titles, colors and fonts make every video recognizable as yours, which supports [brand consistency](/glossary/brand-consistency) across a channel.",
    ],
    how: {
      heading: 'How to use motion graphics in marketing videos',
      steps: [
        'Start from your brand kit: fonts, colors, logo and a few graphic shapes.',
        'Use motion to explain, not decorate: animate the one number, step or label that matters.',
        'Keep text on screen long enough to read, roughly the time it takes to read it twice.',
        'Use the same easing and timing across videos so the style feels consistent.',
        'Save reusable templates for titles, lower thirds and end cards.',
      ],
    },
    related: ['kinetic-typography', 'lower-third', 'explainer-video', 'brand-kit', 'transition'],
    faqs: [
      {
        question: 'What is the difference between motion graphics and animation?',
        answer: ['Animation is the broad craft of making things move, often with characters and stories. Motion graphics is a branch of it focused on animated graphic design: text, shapes, data and logos.'],
      },
      {
        question: 'Do I need After Effects for motion graphics?',
        answer: ['Not necessarily. Many video editors, online design tools and template-based generators include animated text and graphics. Dedicated software gives more control for custom work.'],
      },
    ],
  },
  {
    slug: 'kinetic-typography',
    term: 'Kinetic typography',
    aka: ['moving text', 'animated text', 'kinetic type'],
    category: 'video-making',
    short: 'Kinetic typography is animated text that moves, scales or appears in time with speech or music to express meaning and keep attention.',
    definition: [
      "Kinetic typography is text that moves on screen in time with a voice, music or rhythm. Words slide, scale, pop, rotate or appear one at a time, and their size, weight and motion add emphasis to what is being said. It turns text into the main visual of a video rather than a label on top.",
      "The technique has roots in film title design of the 1950s and 1960s, when designers began animating opening credits. It became a popular style for lyric videos and explainers once motion design software made it easier, and it now shows up in reels, ads and faceless videos.",
      "Word-by-word [animated captions](/glossary/animated-captions) are a simple, common form of kinetic typography. Fuller versions change font size for key words, move the camera through the text or build words into shapes. It is one branch of [motion graphics](/glossary/motion-graphics).",
    ],
    why: [
      "Many people watch social video with the sound off. When the text itself moves and carries emphasis, the message still lands, and the motion keeps the eye on screen.",
      "Kinetic typography is also cheap compared with filming. A business with a clear script, its brand fonts and a [voiceover](/glossary/voiceover) can make an engaging video with no footage at all.",
    ],
    how: {
      heading: 'How to make kinetic typography',
      steps: [
        'Start with a short script or audio track and mark the words to emphasize.',
        'Choose one or two brand fonts with strong weights so key words can stand out.',
        'Time each word or phrase to the audio, so text appears as it is spoken.',
        'Make important words larger, bolder or a brand color, and keep the rest calm.',
        'Limit text per screen and give every line enough time to be read.',
      ],
    },
    related: ['motion-graphics', 'animated-captions', 'faceless-video', 'typography', 'lower-third'],
    faqs: [
      {
        question: 'Are word-by-word captions kinetic typography?',
        answer: ['They are a simple form of it. Text appears in sync with speech, which is the core idea. Full kinetic typography usually adds more movement, scale changes and layout.'],
      },
      {
        question: 'What fonts work best for kinetic typography?',
        answer: ['Bold, clear sans serif or display fonts that stay readable at small sizes and in motion. Thin scripts and very condensed faces are hard to read when they move.'],
      },
    ],
  },
  {
    slug: 'lower-third',
    term: 'Lower third',
    aka: ['lower thirds', 'name strap', 'chyron'],
    category: 'video-making',
    short: 'A lower third is a graphic in the lower part of the video frame that shows a name, title, location or short message without covering the main action.',
    definition: [
      "A lower third is a text graphic placed in the lower part of the video frame, usually showing a speaker's name and title, a location, a topic or a short message. The name comes from its position: roughly in the bottom third of the screen. It adds context without covering the speaker's face or the main action.",
      "Lower thirds started in television news and sports, where they are also called name straps or chyrons (after a company that made early character generators). In marketing videos they introduce interviewees, label products, show a web address or prompt viewers to follow or subscribe.",
      "Most lower thirds are short [motion graphics](/glossary/motion-graphics): they animate in, stay for a few seconds and animate out. In vertical video, platform buttons and captions crowd the bottom of the frame, so lower thirds often sit a little higher to stay inside the [safe zone](/glossary/safe-zone).",
    ],
    why: [
      "Lower thirds build credibility. Seeing \"Maya Chen, Head Baker\" under a speaker tells the viewer why to listen. In a [testimonial video](/glossary/testimonial-video), a name and business name make the quote feel real.",
      "They are also a quiet branding tool. Consistent lower thirds in your colors and fonts make every video look like it comes from the same business.",
    ],
    how: {
      heading: 'How to design a lower third',
      steps: [
        'Keep it to two short lines: a name or headline, and a title or detail.',
        'Use your brand fonts and colors with strong contrast against the footage.',
        'Place it in the lower part of the frame but inside the safe zone for the platform.',
        'Animate it in and out quickly, and leave it on screen for about 3 to 5 seconds.',
        'Save it as a template and reuse it across all your videos.',
      ],
    },
    related: ['motion-graphics', 'safe-zone', 'testimonial-video', 'brand-consistency', 'kinetic-typography'],
    faqs: [
      {
        question: 'Why is it called a lower third?',
        answer: ['Because it sits in the lower third of the screen, an area that rarely contains the speaker\'s face or the main subject.'],
      },
      {
        question: 'Where should a lower third go in a vertical video?',
        answer: ['Higher than in a landscape video. Platform buttons, captions and the description cover the bottom of the screen on Reels, TikTok and Shorts, so keep text clear of that area.'],
      },
    ],
  },
  {
    slug: 'color-grading',
    term: 'Color grading',
    aka: ['color correction', 'colour grading', 'LUT'],
    category: 'video-making',
    short: 'Color grading is adjusting the colors, contrast and tone of video footage in editing to fix problems and give it a consistent look or mood.',
    definition: [
      "Color grading is the process of adjusting the color, contrast, brightness and tone of video footage after it is filmed. It gives a video a consistent look and a mood, such as warm and cozy, cool and clinical, or punchy and saturated. It is usually done after color correction, which first fixes exposure and white balance.",
      "Color correction and color grading are often confused. Correction is technical: making skin tones natural, whites white and shots from different cameras match. Grading is creative: choosing the style. Many editors apply a LUT (look-up table), a preset that maps one set of colors to another, as a starting point, then fine-tune by shot.",
      "Footage shot in a flat or log profile holds more detail and needs grading to look right. Phone footage is usually already processed, so it needs lighter adjustments. Grading ties into [brand colors](/glossary/brand-colors): a consistent grade makes a channel recognizable.",
    ],
    why: [
      "Color sets the feel of a video before anyone hears a word. A consistent grade makes a business look more professional and helps footage from different days and devices feel like one piece.",
      "It also protects the product. Accurate color correction matters for anything people buy by look (food, clothing, paint, furniture), because a video that shows the wrong color creates returns and disappointed customers.",
    ],
    how: {
      heading: 'How to color grade a video',
      steps: [
        'Correct first: set exposure, then white balance so whites and skin tones look natural.',
        'Match shots so the same scene looks the same across cuts.',
        'Apply a look: a LUT or your own adjustments to contrast, saturation and color balance.',
        'Check skin tones and product colors against reality and your brand colors.',
        'Save the grade as a preset and reuse it to keep videos consistent.',
      ],
    },
    related: ['brand-colors', 'color-palette', 'visual-identity', 'b-roll', 'brand-consistency'],
    faqs: [
      {
        question: 'What is the difference between color correction and color grading?',
        answer: ['Color correction fixes problems so footage looks natural and consistent. Color grading is the creative step that gives it a particular style or mood. Correction usually comes first.'],
      },
      {
        question: 'What is a LUT?',
        answer: ['A look-up table: a file that tells editing software how to transform colors. LUTs are used to convert log footage to normal color or to apply a ready-made look.'],
      },
    ],
  },
  {
    slug: 'loop-video',
    term: 'Loop video',
    aka: ['looping video', 'video loop', 'perfect loop'],
    category: 'video-making',
    short: 'A loop video is a short clip edited so its end flows back into its start, letting it replay continuously without a visible break.',
    definition: [
      "A loop video is a short video that plays over and over, edited so the last frame leads smoothly back into the first. Done well, the viewer cannot easily tell where it starts or ends. Loops are used for social posts, website backgrounds, product displays, digital signage and animated GIF-style content.",
      "There are two kinds of loop. A perfect loop is built so motion continues without a jump, such as a spinning product or a cinemagraph where only one element moves. A narrative loop is a short video whose final line leads back into the opening line, so people who watch twice hear one continuous sentence.",
      "Platforms like Instagram, TikTok and YouTube Shorts replay short videos automatically. That makes loops a common trick in [short-form video](/glossary/short-form-video), because replays can add to [watch time](/glossary/watch-time) and how platforms judge interest.",
    ],
    why: [
      "A loop keeps people on the video longer. When the end runs straight back into the start, many viewers keep watching a second time, which some platforms treat as a signal that the video is worth showing to more people.",
      "Loops also work where sound and attention are limited: a website hero, a shop screen or a product page. A few seconds of looping motion shows the product without asking anyone to press play.",
    ],
    how: {
      heading: 'How to make a looping video',
      steps: [
        'Plan the loop: decide how the last frame will connect to the first.',
        'Film or animate motion that can repeat, such as a turn, a pour or steady camera move.',
        'Trim so the end frame closely matches the start frame, or add a short crossfade.',
        'For narrative loops, write the last line so it leads into the first line.',
        'Keep loops short (a few seconds for backgrounds, under 15 seconds for social) and compress them for fast loading.',
      ],
    },
    example: {
      label: 'Narrative loop',
      body: "A coffee shop reel ends with the line \"...and that's why we always start with...\" while the opening scene, which begins \"...beans roasted this morning\", plays again. Viewers who keep watching hear one unbroken sentence and often watch a second time.",
    },
    related: ['short-form-video', 'watch-time', 'transition', 'vertical-video', 'audience-retention'],
    faqs: [
      {
        question: 'How do I make a video loop on Instagram or TikTok?',
        answer: ['Short videos replay automatically on both. To make the loop smooth, match the last frame to the first, or write the ending so it leads back into the start.'],
      },
      {
        question: 'Do looping videos get more views?',
        answer: ['Replays can count toward views and watch time, depending on the platform. A loop alone will not make a weak video spread, but it can help a good one hold attention.'],
      },
    ],
  },
  {
    slug: 'short-form-video',
    term: 'Short-form video',
    aka: ['long-form video', 'short video', 'short form video'],
    category: 'video-making',
    short: 'Short-form video is video under about three minutes, usually vertical, made for Reels, TikTok and YouTube Shorts; long-form video runs longer.',
    definition: [
      "Short-form video is video content that runs from a few seconds to about three minutes, usually filmed or edited in vertical 9:16 and made for feeds like Instagram Reels, TikTok and YouTube Shorts. It is built to be watched in full while scrolling, with a strong hook, fast pacing and captions for silent viewing.",
      "There is no single official cutoff. Platforms keep changing their maximum lengths: YouTube Shorts and TikTok allow several minutes, while Reels limits vary by how the video is posted. In practice, most marketing short-form videos run 15 to 60 seconds. Long-form video is anything longer, typically on YouTube, websites, webinars and podcasts.",
      "Short and long form do different jobs. Short-form is good for reach and discovery, because platforms push it to people who do not follow you yet. Long-form is good for depth and trust: tutorials, reviews and stories that need time. Many businesses cut [short clips from long videos](/glossary/content-repurposing).",
    ],
    why: [
      "Short-form video is where much of the organic reach on social platforms is. A small business with few followers can still reach many people with a good reel, because recommendation feeds show content to non-followers based on how well it holds attention.",
      "It is also cheap to make and test. Several short videos can be made in the time one long video takes, so a business can learn quickly which [hooks](/glossary/hook), topics and offers its audience responds to.",
    ],
    how: {
      heading: 'How to make short-form video that holds attention',
      steps: [
        'Pick one idea per video; short-form punishes trying to say three things.',
        'Open with a hook in the first one or two seconds, as text and voice.',
        'Film or render in vertical 9:16 and keep key content inside the safe zone.',
        'Cut fast: change the picture every few seconds and remove all filler.',
        'Add captions, since many people watch muted.',
        'End with one clear call to action, or loop back into the start.',
      ],
    },
    openpromo: {
      body: "OpenPromo's reels are 9:16 short-form videos, usually 15 to 40 seconds, with a hook, voiceover, music and word-by-word captions. The same file works for Reels, TikTok and Shorts.",
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['vertical-video', 'instagram-reels', 'youtube-shorts', 'hook', 'audience-retention', 'content-repurposing'],
    faqs: [
      {
        question: 'How long is short-form video?',
        answer: ['Usually anything up to about three minutes, though most marketing short-form videos are 15 to 60 seconds. Platform limits change often, so check the current maximum before you post.'],
      },
      {
        question: 'Is long-form video still worth making?',
        answer: ['Yes. Long-form builds deeper trust, ranks in YouTube and Google search for how-to queries, and gives you material to cut into many short clips.'],
      },
      {
        question: 'Which platform is best for short-form video?',
        answer: ['It depends on your audience. Instagram Reels, TikTok and YouTube Shorts all accept the same 9:16 file, so many businesses post to all three and watch which performs best.'],
      },
    ],
  },
  {
    slug: 'vertical-video',
    term: 'Vertical video',
    aka: ['9:16 video', 'portrait video', 'vertical format'],
    category: 'video-making',
    short: 'Vertical video is video taller than it is wide, usually 9:16 at 1080x1920 pixels, made to fill a phone screen on Reels, TikTok, Shorts and Stories.',
    definition: [
      "Vertical video is video in a portrait orientation, taller than it is wide. The standard is a 9:16 aspect ratio, usually 1080 by 1920 pixels, which fills a phone screen held upright. It is the native format for Instagram Reels and Stories, TikTok, YouTube Shorts and Snapchat, and is widely used in mobile ads.",
      "Vertical video was once seen as a mistake, the result of holding a phone the wrong way. That changed as phones became the main screen and Stories and TikTok made full-screen portrait viewing normal. Feeds also accept 4:5 portrait video, which takes up more space than square but less than full 9:16.",
      "Making good vertical video means designing for a narrow frame: one subject, centered, with text kept clear of the app buttons. Each platform covers parts of the screen with its interface, so the [safe zone](/glossary/safe-zone) matters more than in landscape. See [aspect ratio](/glossary/aspect-ratio) for how 9:16 compares with 16:9, 1:1 and 4:5.",
    ],
    why: [
      "On mobile platforms, a vertical video fills the whole screen, while a landscape video shows as a small strip with empty space. Full-screen video holds attention better and looks native to the feed.",
      "Most short-form recommendation feeds are built around 9:16. Posting in the right shape is a basic requirement for reaching people on Reels, TikTok and Shorts.",
    ],
    how: {
      heading: 'How to make vertical video',
      steps: [
        'Film or render at 1080x1920 (9:16) from the start rather than cropping wide footage later.',
        'Frame one main subject near the center, with headroom for text.',
        'Keep captions, logos and key text away from the top, the bottom and the right edge, where apps place their buttons.',
        'Use large text: it is read on a small screen.',
        'Preview the video in each app before posting to check nothing important is covered.',
      ],
    },
    example: {
      label: 'Common vertical video spec',
      code: 'Aspect ratio: 9:16\nResolution: 1080 x 1920 px\nFrame rate: 24, 25, 30 or 60 fps\nFile: MP4 (H.264 video, AAC audio)\nKeep text inside the center area, clear of the top ~14% and bottom ~20%\n(platforms change their layouts; check current guides)',
    },
    openpromo: {
      body: 'OpenPromo renders reels in 9:16 at 1080x1920, and promo videos and tutorials can also be rendered in 9:16 for Stories and social feeds.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['aspect-ratio', 'short-form-video', 'safe-zone', 'instagram-reels', 'youtube-shorts', 'instagram-story-size'],
    faqs: [
      {
        question: 'What size is a vertical video?',
        answer: ['The standard is 1080 by 1920 pixels at a 9:16 aspect ratio. Some platforms also accept higher resolutions such as 2160 by 3840 (4K vertical).'],
      },
      {
        question: 'Can I turn a horizontal video into a vertical one?',
        answer: ['Yes, by cropping to 9:16 and reframing each shot to follow the subject, or by placing the landscape video inside a vertical frame with text above and below. Filming vertical from the start usually looks better.'],
      },
    ],
  },
  {
    slug: 'explainer-video',
    term: 'Explainer video',
    aka: ['animated explainer', 'explainer'],
    category: 'video-making',
    short: 'An explainer video is a short video that explains what a product, service or idea is, the problem it solves and how it works.',
    definition: [
      "An explainer video is a short video, usually one to three minutes, that explains what a product, service or idea is and why it matters. It typically walks through a problem, the solution and how it works, ending with a call to action. Explainers often live on homepages and landing pages, or are used in sales and onboarding.",
      "Explainers come in several styles: animated (illustrations and [motion graphics](/glossary/motion-graphics)), live action, whiteboard, [screen recording](/glossary/screen-recording) for software, or a mix. A clear [voiceover](/glossary/voiceover) usually carries the story, supported by visuals that show each point.",
      "An explainer differs from a [product demo video](/glossary/product-demo-video) in focus. An explainer answers \"what is this and why should I care\"; a demo answers \"show me how it works\". A [promo video](/glossary/promo-video) is broader and more about attention and excitement.",
    ],
    why: [
      "An explainer answers the first questions a visitor has in the time it takes to watch one short video. That is especially useful for new or complex products, where a page of text may not get read.",
      "Explainers also make the message consistent. Sales staff, social posts, ads and the homepage can all share the same video, so everyone hears the same clear story.",
    ],
    how: {
      heading: 'How to make an explainer video',
      steps: [
        'Write down the problem your customer has, in their words.',
        'Script a simple structure: problem, solution, how it works (two or three steps), proof, call to action.',
        'Keep it short: aim for 60 to 90 seconds for most products.',
        'Choose a style that fits your budget: screenshots and motion graphics, animation or live action.',
        'Record a clear voiceover and add captions.',
        'Put it where people decide: the homepage, landing pages and onboarding emails.',
      ],
    },
    openpromo: {
      body: "OpenPromo's tutorial maker also works for short explainers (what it is, how it helps, how to start), built from your own screenshots with AI voiceover and captions.",
      href: '/features/product-demo-video-maker',
      label: 'See the product demo video maker',
    },
    related: ['product-demo-video', 'promo-video', 'motion-graphics', 'video-script', 'landing-page', 'voiceover'],
    faqs: [
      {
        question: 'How long should an explainer video be?',
        answer: ['Most work best at 60 to 120 seconds. Shorter is usually better, as long as the problem, solution and next step are all clear.'],
      },
      {
        question: 'What is the difference between an explainer video and a demo video?',
        answer: ['An explainer covers what the product is and why it matters. A demo video shows the product being used, step by step. Many companies make both.'],
      },
    ],
  },
  {
    slug: 'promo-video',
    term: 'Promo video',
    aka: ['promotional video', 'brand video', 'promo'],
    category: 'video-making',
    short: 'A promo video is a short marketing video that promotes a business, product, offer or event, made to grab attention and drive an action.',
    definition: [
      "A promo video, short for promotional video, is a short marketing video made to promote a business, product, service, offer or event. It aims to grab attention, show why the thing is worth caring about and get viewers to act: visit, buy, book or sign up. Most promo videos run between 15 seconds and two minutes.",
      "Promo videos cover a wide range: a launch teaser, a seasonal sale, an event trailer, a brand video for the homepage or a product spotlight for social ads. They usually mix footage or pictures, on-screen text, music and a [voiceover](/glossary/voiceover), and close with a clear [call to action](/glossary/call-to-action).",
      "The term overlaps with [explainer videos](/glossary/explainer-video) and [product demo videos](/glossary/product-demo-video). The difference is emphasis: a promo is about attention and desire, an explainer about understanding, a demo about showing how something works.",
    ],
    why: [
      "Video tends to hold attention better than a static image in feeds, and a promo video can show the product, the people and the offer at once. That makes it a strong format for launches, ads and the top of a [marketing funnel](/glossary/marketing-funnel).",
      "A good promo video is also reusable. One edit can be resized for feeds, Stories and YouTube, cut into shorter ads and placed on landing pages.",
    ],
    how: {
      heading: 'How to make a promo video',
      steps: [
        'Pick one goal and one audience: a launch for existing customers, or an offer for new ones.',
        'Write a short script: hook, problem or desire, what you offer, proof, call to action.',
        'Use your real product, place and people wherever you can.',
        'Keep it in your brand colors and fonts, with captions for silent viewing.',
        'Make versions in the sizes you need: 16:9, 1:1 and 9:16.',
        'End with one specific action and where to do it.',
      ],
    },
    example: {
      label: 'Promo video outline',
      body: "Crumb & Co launches a weekend brunch. The 30-second promo opens on a pancake stack being drizzled (hook), shows the room filling up, lists three dishes as on-screen text, flashes one short customer quote, and ends on \"Brunch, Saturdays and Sundays from 9. Book a table at crumbandco.example.\"",
    },
    openpromo: {
      body: 'OpenPromo turns a website into a narrated promo video in 16:9, 1:1 or 9:16, with a problem, solution, features shown with your own screenshots, proof and a call to action.',
      href: '/features/url-to-video',
      label: 'See URL to video',
    },
    related: ['explainer-video', 'product-demo-video', 'video-marketing', 'call-to-action', 'ad-creative', 'video-script'],
    faqs: [
      {
        question: 'How long should a promo video be?',
        answer: ['For social feeds and ads, 15 to 60 seconds. For a homepage or launch video, up to about two minutes. The shorter the attention window, the shorter the promo.'],
      },
      {
        question: 'What should a promo video include?',
        answer: ['A hook, a clear reason to care, a look at the product or offer, some proof (a review, a number from your own records, a customer), and a single call to action.'],
      },
    ],
  },
  {
    slug: 'product-demo-video',
    term: 'Product demo video',
    aka: ['demo video', 'product video', 'product demo'],
    category: 'video-making',
    short: 'A product demo video shows a product being used to explain its main features and how it solves a problem, so buyers can see it before they buy.',
    definition: [
      "A product demo video shows a product in use, so viewers can see how it works and what it does. For software it is usually a narrated screen recording or a sequence of screenshots; for physical goods it shows the item being handled, set up or used. The goal is to answer \"how does it work?\" before a purchase.",
      "Demos come in several lengths. A short feature clip of 15 to 30 seconds suits social and ads. A one to three minute overview suits a homepage or product page. Longer, full walkthroughs support sales calls and trials. A [tutorial video](/glossary/tutorial-video) is related but aimed at existing users who need to complete a task.",
      "Good demos focus on outcomes, not every button. They show the two or three things a buyer cares about most, in a realistic scenario, with a [voiceover](/glossary/voiceover) or captions that explain why each step matters. Compare with an [explainer video](/glossary/explainer-video), which is more about the idea than the interface.",
    ],
    why: [
      "Seeing a product work reduces doubt. A demo answers questions that would otherwise need a sales call, an email or a free trial, so more visitors feel ready to buy or sign up.",
      "Product videos also help on product pages and in ads, where people compare options quickly. A clear demo shows that the product is real, works as described and is easy to use.",
    ],
    how: {
      heading: 'How to make a product demo video',
      steps: [
        'Pick the one job the viewer wants done, and demo that, not the whole product.',
        'Prepare a clean demo account or a clean set with realistic sample data.',
        'Script the steps and the benefit of each step in plain words.',
        'Record or capture each step, zooming in so details are readable on a phone.',
        'Add narration or captions, and cut every pause or loading screen.',
        'End with how to start: a free trial, a booking link or a store page.',
      ],
    },
    example: {
      label: 'Short demo outline',
      body: "A booking app for yoga studios makes a 45-second demo. Scene 1: \"Fill your classes without the spreadsheet.\" Scene 2: a screenshot of the class calendar. Scene 3: a student booking from a phone in two taps. Scene 4: the waitlist filling a cancelled spot automatically. Scene 5: \"Start your free trial.\" Each scene has one line of narration.",
    },
    openpromo: {
      body: "OpenPromo's product demo video maker builds getting-started demos with one step per scene from your own product screenshots, narrated, with captions and an SRT file, in 16:9 or 9:16.",
      href: '/features/product-demo-video-maker',
      label: 'See the product demo video maker',
    },
    related: ['tutorial-video', 'explainer-video', 'screen-recording', 'promo-video', 'features-vs-benefits', 'landing-page'],
    faqs: [
      {
        question: 'How long should a product demo video be?',
        answer: ['About 30 to 90 seconds for a homepage or ad, focused on one or two key tasks. Longer walkthroughs of several minutes are fine for prospects who are already interested.'],
      },
      {
        question: 'Do I need to record my screen for a software demo?',
        answer: ['Not always. A sequence of clear screenshots with narration, shown in a device frame, works well for many demos and is easier to update when the interface changes.'],
      },
    ],
  },
  {
    slug: 'tutorial-video',
    term: 'Tutorial video',
    aka: ['how-to video', 'walkthrough video', 'video tutorial'],
    category: 'video-making',
    short: 'A tutorial video teaches viewers how to do a specific task step by step, such as setting up a product, using a feature or making something.',
    definition: [
      "A tutorial video teaches the viewer how to complete a specific task, one step at a time. It might show how to set up a product, use a feature, fix a problem or make something. Tutorials are also called how-to videos or walkthrough videos, and they are among the most searched kinds of video on YouTube and Google.",
      "Tutorials can be filmed, recorded as a [screen recording](/glossary/screen-recording), built from screenshots, or presented as a [talking head video](/glossary/talking-head-video) with demonstrations. The best ones state the result up front, list what you need, then show each step in order with a clear [voiceover](/glossary/voiceover) or captions.",
      "Tutorials differ from [product demo videos](/glossary/product-demo-video) in audience. A demo sells to people deciding whether to buy; a tutorial helps people who already have the product, or who are searching for how to do something your business can help with.",
    ],
    why: [
      "Tutorials reduce support work and help customers succeed with what they bought, which makes them more likely to stay and recommend you. A getting-started video can answer the same question a support team would otherwise answer hundreds of times.",
      "They also bring in new people. Many searches are \"how to\" questions, and a helpful tutorial on YouTube or your site can introduce your business to people who did not know it existed. This makes tutorials a staple of [content marketing](/glossary/content-marketing).",
    ],
    how: {
      heading: 'How to make a tutorial video',
      steps: [
        'Pick one task and name it clearly in the title, the way people search for it.',
        'Show the end result first, then list anything the viewer needs.',
        'Break the task into short, numbered steps, one per scene.',
        'Narrate what to do and why, in plain words, and add captions.',
        'Keep each step on screen long enough to follow along, and zoom in on small details.',
        'End with the next step: a related tutorial, support page or sign-up link.',
      ],
    },
    openpromo: {
      body: 'OpenPromo makes getting-started tutorials from the flows in your brand profile, one narrated step per scene, using screenshots of your product, in 16:9 or 9:16.',
      href: '/features/product-demo-video-maker',
      label: 'See the product demo video maker',
    },
    related: ['product-demo-video', 'screen-recording', 'explainer-video', 'voiceover', 'content-marketing', 'subtitles'],
    faqs: [
      {
        question: 'How long should a tutorial video be?',
        answer: ['As long as the task needs and no longer. Simple tasks fit in under two minutes; complex ones can run ten minutes or more, ideally with chapters so viewers can jump to the step they need.'],
      },
      {
        question: 'What is the difference between a tutorial and a walkthrough?',
        answer: ['They overlap. A tutorial teaches a specific task. A walkthrough usually tours a product or process from start to finish. Both are step by step.'],
      },
    ],
  },
  {
    slug: 'testimonial-video',
    term: 'Testimonial video',
    aka: ['customer testimonial video', 'video testimonial', 'customer story video'],
    category: 'video-making',
    short: 'A testimonial video features a real customer describing their experience with a business, used as social proof in marketing and sales.',
    definition: [
      "A testimonial video is a short video in which a real customer talks about their experience with a business, product or service. It usually covers the problem they had, why they chose the business and the result. Testimonial videos are a powerful form of social proof for websites, social posts, ads and sales pages.",
      "Formats range from a polished interview with [B-roll](/glossary/b-roll) of the customer at work, to a simple selfie video recorded on a phone, to a short clip with a quote on screen. Longer customer stories are close to a video [case study](/glossary/case-study).",
      "Testimonials must be genuine. In the US, the FTC treats fake or misleading reviews and endorsements as deceptive, and its rules require disclosure when a reviewer was paid or given something in return. Use real customers, their real words and their permission.",
    ],
    why: [
      "People trust other customers more than they trust a business talking about itself. Hearing a real person describe a result makes a claim believable and helps buyers who are on the fence. This is [social proof](/glossary/social-proof) at its most direct.",
      "A face and a voice also carry more than a written review. Viewers can see the person is real, which makes the testimonial harder to dismiss.",
    ],
    how: {
      heading: 'How to make a testimonial video',
      steps: [
        'Ask happy customers for permission and explain where the video will be used.',
        'Prepare open questions: what was the problem, why us, what changed, who would you recommend us to.',
        'Film in good light with clear audio; let them answer in their own words, not a script.',
        'Cut to the strongest 30 to 90 seconds and add B-roll of the product or result.',
        'Add a lower third with their name and business, plus captions.',
        'Get written consent and disclose any payment or incentive.',
      ],
    },
    example: {
      label: 'Testimonial structure',
      body: "A customer of a local bike shop records a 40-second video: \"I'd given up on my old road bike (problem). A friend sent me to Spoke & Chain (why). They rebuilt the wheels and I rode 80 kilometers last weekend (result). If your bike's gathering dust, take it to them (recommendation).\" The shop adds a lower third with her first name and a few shots of the rebuilt bike.",
    },
    related: ['testimonial', 'social-proof', 'user-generated-content', 'case-study', 'lower-third', 'talking-head-video'],
    faqs: [
      {
        question: 'How long should a testimonial video be?',
        answer: ['Around 30 to 90 seconds for most uses. Cut shorter clips of 10 to 20 seconds for social and ads, and keep the full interview for a case study page.'],
      },
      {
        question: 'Can I script a testimonial video?',
        answer: ['Guide it with questions, but do not hand customers words to read. Scripted testimonials sound fake, and putting claims in a customer\'s mouth can be misleading.'],
      },
    ],
  },
  {
    slug: 'video-marketing',
    term: 'Video marketing',
    aka: ['video content marketing', 'video strategy'],
    category: 'video-making',
    short: 'Video marketing is using video to promote a business, explain its products and build an audience across social media, websites, email and ads.',
    definition: [
      "Video marketing is the use of video to promote a business, explain its products, build trust and drive sales. It covers everything from social reels and YouTube tutorials to website explainers, product demos, customer testimonials and video ads. A video marketing strategy decides which videos to make, for whom, where to publish and how to measure results.",
      "Different videos serve different stages of the [marketing funnel](/glossary/marketing-funnel). [Short-form videos](/glossary/short-form-video) and promo videos build awareness. Explainers and demos help people compare and decide. Tutorials and onboarding videos help customers succeed after they buy. Testimonials support every stage.",
      "Results are measured with video metrics such as views, [watch time](/glossary/watch-time), [audience retention](/glossary/audience-retention) and completion rate, and with business metrics such as clicks, sign-ups and sales. Views alone say little; the useful question is whether the video moved people toward an action.",
    ],
    why: [
      "Video can show a product working, a person's face and a result in seconds, which builds understanding and trust faster than most text. Social platforms also give a lot of reach to short video, so it is one of the main ways a small business can reach new people without paying for ads.",
      "Video assets also travel. One good video can be cut into clips, resized for different platforms, placed on landing pages and used in emails and ads, which spreads the cost of making it.",
    ],
    how: {
      heading: 'How to build a video marketing strategy',
      steps: [
        'Define the goal for each video: reach, leads, sales or support.',
        'Know the audience and the platform they watch on.',
        'Choose formats to match: reels for reach, explainers and demos for decisions, tutorials for customers.',
        'Plan a steady schedule you can keep, and batch production.',
        'Track retention and the action you care about, not only views.',
        'Repeat what works and repurpose strong videos into new sizes and lengths.',
      ],
    },
    openpromo: {
      body: 'OpenPromo is an open-source tool that reads your website into a brand profile and turns it into reels, promo videos and tutorials, alongside posts and carousels, on your own YepAPI key.',
      href: '/open-source-ai-video-generator',
      label: 'See the open-source video generator',
    },
    related: ['content-marketing', 'short-form-video', 'promo-video', 'explainer-video', 'marketing-funnel', 'content-repurposing'],
    faqs: [
      {
        question: 'Is video marketing worth it for small businesses?',
        answer: ['Usually, yes. Short phone videos cost little to make, and platforms show short video to people who do not follow you yet. Start small and consistent rather than with one expensive production.'],
      },
      {
        question: 'What types of video should a business make first?',
        answer: ['A short explainer or promo for your website, a few short-form videos for social, and one or two tutorials or demos for your main product or service. Add testimonials as soon as customers agree.'],
      },
    ],
  },
];
