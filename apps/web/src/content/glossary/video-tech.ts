import type { GlossaryTerm } from './types';

export const terms: GlossaryTerm[] = [
  {
    slug: 'aspect-ratio',
    term: 'Aspect ratio',
    aka: ['16:9', '9:16', '4:5', '1:1', 'video aspect ratio', 'image aspect ratio'],
    category: 'video-tech',
    short: 'Aspect ratio is the shape of an image or video, written as width to height, such as 16:9 for widescreen or 9:16 for vertical video.',
    definition: [
      'Aspect ratio is the proportional relationship between the width and height of an image or video, written as two numbers separated by a colon. 16:9 is widescreen, 9:16 is full-screen vertical, 1:1 is square and 4:5 is a tall portrait post. It describes shape only, not size or sharpness.',
      'The same ratio can come at many pixel sizes. A 1920 x 1080 video and a 3840 x 2160 video are both 16:9; the second simply has a higher [resolution](/glossary/resolution). To find a ratio, divide both dimensions by their greatest common divisor: 1080 x 1350 reduces to 4:5.',
      'Each placement has a preferred shape. YouTube and websites default to 16:9. [Vertical video](/glossary/vertical-video) for Reels, TikTok, Shorts and Stories uses 9:16. Feed posts on Instagram, Facebook and LinkedIn work at 1:1 or 4:5, and link previews and many ads use about 1.91:1. Platforms adjust these from time to time, so check current guidance before a big campaign.',
    ],
    why: [
      'The wrong shape costs attention. A 16:9 video posted to Reels shows up as a thin strip with black bars, while a 9:16 video fills the phone screen. Taller formats take up more of the feed, which gives a post more time to catch someone mid-scroll.',
      'Aspect ratio also decides what gets cropped. If you design for one shape and a platform shows another, text and logos near the edges can be cut off. Planning the ratio first, and keeping key content inside the [safe zone](/glossary/safe-zone), avoids that.',
    ],
    how: {
      heading: 'How to choose the right aspect ratio',
      steps: [
        'List where the piece will run: feed, Stories, Reels, YouTube, a website or an ad placement.',
        'Use 9:16 for full-screen vertical placements, 4:5 or 1:1 for feed posts and 16:9 for YouTube and web players.',
        'If one asset must serve several places, design the scene so the important parts sit in the center and survive cropping.',
        'Export a separate file for each ratio instead of letting the platform crop for you.',
        'Preview each version on a phone before posting.',
      ],
    },
    example: {
      label: 'Common aspect ratios and sizes',
      code: '16:9   1920 x 1080   YouTube, websites\n9:16   1080 x 1920   Reels, TikTok, Shorts, Stories\n4:5    1080 x 1350   Instagram feed (portrait)\n1:1    1080 x 1080   Instagram, Facebook, LinkedIn feed\n1.91:1 1200 x 628    link previews, many ads',
    },
    openpromo: {
      body: 'Every OpenPromo creation has an output size: 1:1, 4:5, 9:16, 16:9, 1.91:1 and banner shapes for X and LinkedIn. One scene can be re-rendered at another size, and text shrinks until it fits.',
      href: '/features/instagram-post-generator',
      label: 'See the post generator',
    },
    related: ['resolution', 'vertical-video', 'safe-zone', 'social-media-image-sizes', 'instagram-post-size'],
    faqs: [
      {
        question: 'What aspect ratio is 1920 x 1080?',
        answer: ['1920 x 1080 is 16:9, the standard widescreen ratio used by YouTube, TVs and most web video players.'],
      },
      {
        question: 'What is the best aspect ratio for Instagram?',
        answer: ['For Reels and Stories, 9:16. For feed photos and carousels, 4:5 takes the most space in the feed, and 1:1 is the safe square option. Instagram has changed its grid preview shape before, so check how covers crop on your profile.'],
      },
      {
        question: 'Is aspect ratio the same as resolution?',
        answer: ['No. Aspect ratio is the shape (16:9). Resolution is the number of pixels (1920 x 1080). Many resolutions share one ratio.'],
      },
    ],
  },
  {
    slug: 'resolution',
    term: 'Video resolution',
    aka: ['1080p', '4K', '720p', 'resolution', 'Full HD'],
    category: 'video-tech',
    short: 'Video resolution is the number of pixels in each frame, written as width x height or a shorthand like 1080p or 4K. More pixels means more detail.',
    definition: [
      'Video resolution is the number of pixels that make up each frame of a video, usually written as width x height (1920 x 1080) or as a shorthand such as 720p, 1080p or 4K. Higher resolution can show finer detail, but it also makes files larger and slower to upload and process.',
      'The "p" in 1080p stands for progressive scan, meaning every line of the frame is drawn each time. The shorthand names the short side: 1080p is 1920 x 1080 for landscape video, and a vertical 1080 x 1920 video is often still called 1080p. 4K usually means 3840 x 2160 (UHD) for consumer video.',
      'Resolution is only one part of quality. A 4K file with a low [bitrate](/glossary/bitrate) can look worse than a well-encoded 1080p file, and every social platform re-compresses uploads. [Aspect ratio](/glossary/aspect-ratio) is a separate setting: it is the shape, while resolution is the pixel count.',
    ],
    why: [
      'Most social video is watched on phones, where 1080 pixels across is already sharp. Exporting at 1080 x 1920 for vertical video or 1920 x 1080 for landscape is the common target: crisp enough for every major platform without huge files.',
      'Low resolution makes a brand look careless. Blurry text, soft logos and visible blocks in a product shot hurt trust, especially in ads where people judge quality in a second. Small text suffers first, so on-screen copy needs enough pixels to stay readable after the platform compresses it.',
    ],
    how: {
      heading: 'How to choose a video resolution',
      steps: [
        'Pick the aspect ratio first, then the pixel size within it.',
        'Use 1080 x 1920 for Reels, TikTok, Shorts and Stories, and 1920 x 1080 for YouTube and websites.',
        'Shoot or source footage at the export resolution or higher, never lower, to avoid upscaling blur.',
        'Choose 4K only when the audience watches on large screens or you need room to crop.',
        'Keep text large enough to read on a phone at 1080 pixels wide.',
      ],
    },
    example: {
      label: 'Common resolutions',
      code: '720p    1280 x 720     HD\n1080p   1920 x 1080    Full HD\n1440p   2560 x 1440    QHD\n4K UHD  3840 x 2160    Ultra HD\nVertical 1080p  1080 x 1920',
    },
    openpromo: {
      body: 'OpenPromo renders reels and stories at 1080 x 1920 and landscape videos at 1920 x 1080, with text set as real type in your fonts so it stays sharp.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['aspect-ratio', 'bitrate', 'codec', 'mp4', 'frame-rate'],
    faqs: [
      {
        question: 'Is 1080p good enough for social media?',
        answer: ['Yes. 1080p is the standard upload target for Instagram, TikTok, Facebook and LinkedIn, and most viewers watch on phones where extra pixels add little.'],
      },
      {
        question: 'What is the difference between 4K and 1080p?',
        answer: ['4K UHD (3840 x 2160) has four times as many pixels as 1080p (1920 x 1080). It shows more detail on large screens but makes files much larger.'],
      },
      {
        question: 'Does uploading in 4K improve quality on YouTube?',
        answer: ['Often, yes. YouTube tends to give higher-resolution uploads a better encoding, so even viewers watching at 1080p can see a cleaner picture. The effect on phones is smaller.'],
      },
    ],
  },
  {
    slug: 'frame-rate',
    term: 'Frame rate (FPS)',
    aka: ['FPS', 'frames per second', 'frame rate'],
    category: 'video-tech',
    short: 'Frame rate is how many still images a video shows each second, measured in frames per second (FPS). Common rates are 24, 30 and 60 FPS.',
    definition: [
      'Frame rate is the number of still images, or frames, a video displays each second, measured in frames per second (FPS). Film traditionally uses 24 FPS, most online and social video uses 30, and fast action or gaming footage often uses 60. Higher rates make motion look smoother but create larger files.',
      'Frame rate shapes the feel of footage. 24 FPS has a slightly soft, cinematic motion blur. 30 FPS looks natural and is the safe default for social. 60 FPS looks very smooth and suits screen recordings with scrolling, sports and product spins. Shooting at 60 or 120 and playing back at 24 or 30 creates slow motion.',
      'Some broadcast rates are fractional, such as 29.97 and 23.976, for historic TV reasons. Mixing rates in one edit can cause stutter, so editors usually pick one project frame rate and convert other clips to match.',
    ],
    why: [
      'Choppy or stuttering motion looks amateur, and in a product demo it can make an app look laggy. A consistent frame rate keeps scrolling screens, text animations and [animated captions](/glossary/animated-captions) smooth.',
      'Frame rate also affects file size and [bitrate](/glossary/bitrate) needs. A 60 FPS file needs more data for the same quality, which matters when platforms compress uploads. For most marketing video, 30 FPS is the practical balance.',
    ],
    how: {
      heading: 'How to choose a frame rate',
      steps: [
        'Use 30 FPS as the default for social and marketing video.',
        'Use 24 FPS if you want a filmic look and the footage has little fast motion.',
        'Use 60 FPS for screen recordings with scrolling, gameplay or fast product motion.',
        'Record at a higher rate (60 or 120) if you plan to slow clips down.',
        'Set the project and export to the same rate as most of your footage.',
      ],
    },
    related: ['resolution', 'bitrate', 'codec', 'mp4', 'screen-recording'],
    faqs: [
      {
        question: 'What FPS is best for Instagram and TikTok?',
        answer: ['30 FPS is the common choice and is accepted everywhere. Both platforms also accept 60 FPS, which can help with fast motion or screen recordings.'],
      },
      {
        question: 'Is 60 FPS better than 30 FPS?',
        answer: ['Smoother, not always better. 60 FPS suits fast motion and screens. For talking and product shots, 30 FPS looks natural and keeps files smaller.'],
      },
      {
        question: 'Why do movies use 24 FPS?',
        answer: ['24 FPS became the film standard in the sound era as the lowest rate that gave smooth motion and clear audio while saving film stock. Audiences now associate its motion blur with a cinematic look.'],
      },
    ],
  },
  {
    slug: 'bitrate',
    term: 'Bitrate',
    aka: ['bit rate', 'video bitrate', 'Mbps'],
    category: 'video-tech',
    short: 'Bitrate is how much data a video or audio file uses per second, usually in Mbps or kbps. Higher bitrate usually means better quality and bigger files.',
    definition: [
      'Bitrate is the amount of data used to store or stream each second of video or audio, measured in megabits per second (Mbps) for video and kilobits per second (kbps) for audio. At the same resolution and codec, a higher bitrate keeps more detail, while a lower one causes blockiness, banding and smeared motion.',
      'Encoders can use a constant bitrate (CBR), which keeps data flow steady and suits live streaming, or a variable bitrate (VBR), which spends more data on complex scenes and less on simple ones. VBR usually gives better quality for the same file size.',
      'The bitrate a video needs depends on [resolution](/glossary/resolution), [frame rate](/glossary/frame-rate), the [codec](/glossary/codec) and how busy the picture is. Confetti, water and fast camera moves need far more data than a still slide with text.',
    ],
    why: [
      'Social platforms re-encode every upload. Starting from a clean, reasonably high-bitrate file gives their encoder better material and reduces the muddy look that hurts product shots and small text.',
      'Too high a bitrate causes other problems: huge files, slow uploads and, on some platforms, size limits. Knowing the sensible range keeps video sharp without wasting time and storage.',
    ],
    how: {
      heading: 'How to choose a bitrate for social video',
      steps: [
        'Export with H.264 in an MP4 unless a platform asks otherwise.',
        'For 1080p at 30 FPS, aim for roughly 8-12 Mbps; for 1080p at 60 FPS, go higher.',
        'For 4K uploads, expect roughly 35-45 Mbps or more.',
        'Use variable bitrate (VBR), two-pass if your editor offers it, for files you upload.',
        'Use AAC audio at about 128-320 kbps.',
        'Check the platform\'s current upload guidance, since recommendations change.',
      ],
    },
    related: ['codec', 'resolution', 'frame-rate', 'mp4'],
    faqs: [
      {
        question: 'What bitrate should I use for 1080p video?',
        answer: ['For uploads, about 8-12 Mbps at 30 FPS is a common target, and YouTube publishes its own recommended ranges. Streaming live usually uses a lower, constant bitrate around 4.5-6 Mbps.'],
      },
      {
        question: 'Does higher bitrate mean better quality?',
        answer: ['Up to a point. More data reduces compression artifacts, but past a certain level the difference is invisible and files just get bigger. The platform will re-compress it anyway.'],
      },
    ],
  },
  {
    slug: 'codec',
    term: 'Codec',
    aka: ['H.264', 'H.265', 'HEVC', 'AV1', 'video codec'],
    category: 'video-tech',
    short: 'A codec is software that compresses and decompresses video or audio. H.264 is the most widely supported; H.265 (HEVC) and AV1 are newer and more efficient.',
    definition: [
      'A codec is a method, or the software that implements it, for compressing and decompressing video or audio. The name joins coder and decoder. H.264 (AVC) is the most widely supported video codec, H.265 (HEVC) and AV1 compress more efficiently, and AAC is the common audio codec for online video.',
      'A codec is not the same as a container. [MP4](/glossary/mp4), MOV and WebM are containers: files that hold encoded video, audio and [subtitles](/glossary/subtitles) together. An MP4 can hold H.264, H.265 or AV1 video. When a file will not play, the cause is often an unsupported codec inside a familiar container.',
      'Newer codecs give the same quality at a lower [bitrate](/glossary/bitrate), but they take more processing to encode and not every device or app supports them. Editing codecs such as ProRes keep more quality and are easier to edit, at the cost of very large files.',
    ],
    why: [
      'The right codec means a video plays everywhere and uploads without errors. H.264 in an MP4 is accepted by Instagram, TikTok, YouTube, LinkedIn, X and nearly every browser and phone, which is why it remains the safe default for marketing video.',
      'Codec choice also affects how fast your site loads when you embed video. Efficient codecs like AV1 or HEVC can cut file sizes for web playback, which helps page speed, as long as you provide a fallback for devices that cannot play them.',
    ],
    how: {
      heading: 'How to pick a video codec',
      steps: [
        'For social uploads, export H.264 video with AAC audio in an MP4.',
        'For editing and archiving masters, use a high-quality codec such as ProRes or a high-bitrate H.264.',
        'For web embeds, consider AV1 or HEVC with an H.264 fallback.',
        'If a platform rejects a file, re-export as H.264 MP4 before trying anything else.',
      ],
    },
    related: ['mp4', 'bitrate', 'resolution', 'frame-rate'],
    faqs: [
      {
        question: 'What is the difference between H.264 and H.265?',
        answer: ['H.265 (HEVC) gives similar quality to H.264 at a noticeably smaller file size, but it is slower to encode and has patchier support in browsers and older devices. H.264 plays almost everywhere.'],
      },
      {
        question: 'Is MP4 a codec?',
        answer: ['No. MP4 is a container format. The codec is what compresses the video inside it, most often H.264.'],
      },
      {
        question: 'What codec does YouTube use?',
        answer: ['YouTube accepts many codecs on upload and re-encodes videos into its own formats, including VP9 and AV1 for playback. Uploading H.264 MP4 is the simplest option.'],
      },
    ],
  },
  {
    slug: 'mp4',
    term: 'MP4',
    aka: ['MPEG-4 Part 14', '.mp4'],
    category: 'video-tech',
    short: 'MP4 is the most common video file format: a container that holds video, audio and subtitles, accepted by almost every platform, browser and phone.',
    definition: [
      'MP4 (MPEG-4 Part 14) is a digital container format that stores video, audio, subtitles and metadata in one file with the .mp4 extension. It usually holds H.264 or H.265 video with AAC audio. MP4 is the default upload format for social platforms because almost every device, browser and app can play it.',
      'Because MP4 is a container, two .mp4 files can contain very different things. One might hold H.264 video at 8 Mbps and another AV1 at 3 Mbps. Compatibility depends on the [codec](/glossary/codec) inside, not just the extension.',
      'MP4 is closely related to Apple\'s MOV format, and many tools convert between them without re-encoding. WebM is the open alternative for web playback. GIFs, still common for short loops, are far larger and lower quality than an MP4 of the same clip.',
    ],
    why: [
      'MP4 removes friction. A file that uploads first time to Instagram, TikTok, YouTube, LinkedIn and your website saves hours of conversions and failed uploads, and lets a small team post the same asset everywhere.',
      'MP4 files are also compact for the quality they deliver, which matters for upload limits and for page speed when you embed video on a landing page.',
    ],
    how: {
      heading: 'How to export an MP4 for social media',
      steps: [
        'Choose H.264 video and AAC audio as the codecs.',
        'Match the aspect ratio and resolution to the placement, such as 1080 x 1920 for Reels.',
        'Keep the frame rate the same as your footage, usually 30 FPS.',
        'Use a variable bitrate around 8-12 Mbps for 1080p.',
        'Name the file clearly and keep the master in case you need another size later.',
      ],
    },
    openpromo: {
      body: 'Every OpenPromo reel, promo video and tutorial renders to an MP4, alongside a poster thumbnail and an SRT caption file.',
      href: '/features/url-to-video',
      label: 'See URL to video',
    },
    related: ['codec', 'bitrate', 'resolution', 'srt-file', 'thumbnail'],
    faqs: [
      {
        question: 'Is MP4 the best format for Instagram?',
        answer: ['Yes. Instagram recommends MP4 with H.264 video and AAC audio, and it is the format least likely to cause upload or playback problems.'],
      },
      {
        question: 'What is the difference between MP4 and MOV?',
        answer: ['Both are containers and can hold the same codecs. MOV is Apple\'s format and common from iPhones and Final Cut; MP4 is more universally supported, so it is the safer format to share.'],
      },
    ],
  },
  {
    slug: 'thumbnail',
    term: 'Video thumbnail',
    aka: ['poster frame', 'cover image', 'thumbnail', 'Reel cover'],
    category: 'video-tech',
    short: 'A video thumbnail is the still image shown before a video plays. It works like a cover and strongly affects whether people click or tap.',
    definition: [
      'A video thumbnail is the still image that represents a video before it plays, shown in feeds, search results, profile grids and suggested videos. It may be a frame picked from the video, often called a poster frame, or a custom designed image with text, a face or a product. It acts as the video\'s cover.',
      'Each platform uses thumbnails differently. On YouTube the thumbnail sits next to the title and drives most of the decision to click; see [YouTube thumbnail size](/glossary/youtube-thumbnail-size) for the specs. On Instagram the Reel cover appears on your profile grid, cropped closer to a square or portrait shape. On TikTok it shows on your profile and in search.',
      'Good thumbnails are readable at a small size: one clear subject, high contrast, few words and colors that stand out against the platform\'s interface. They should match what the video actually delivers, or viewers leave quickly and [audience retention](/glossary/audience-retention) drops.',
    ],
    why: [
      'On YouTube and in search results, the thumbnail is the biggest factor you control in [click-through rate](/glossary/click-through-rate). More clicks from the same impressions means more views without more spend.',
      'On Instagram and TikTok, covers shape how your profile looks to new visitors. A consistent set of branded covers makes a grid look organized and helps people find the video they want, which supports [brand consistency](/glossary/brand-consistency).',
    ],
    how: {
      heading: 'How to make a good video thumbnail',
      steps: [
        'Pick one focal point: a face showing emotion, the product or a striking result.',
        'Add three to five large words at most, saying the promise rather than repeating the title.',
        'Use strong contrast and your brand colors so it stands out at phone size.',
        'Check it at a small size, and check how the grid crops it on Instagram.',
        'Make sure the video delivers what the thumbnail suggests.',
      ],
    },
    example: {
      label: 'Example',
      body: 'A bike shop posts a Reel on fixing a flat in two minutes. The cover shows a close-up of hands on a tire lever with the words "Flat fixed in 2 min" in large type, in the shop\'s orange. On the grid it reads clearly next to the shop\'s other covers.',
    },
    openpromo: {
      body: 'OpenPromo makes a poster thumbnail for each reel, so the cover in your grid looks right without picking a frame by hand.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['youtube-thumbnail-size', 'click-through-rate', 'hook', 'instagram-reels', 'audience-retention'],
    faqs: [
      {
        question: 'What size should a video thumbnail be?',
        answer: ['For YouTube, 1280 x 720 pixels (16:9). For Reels and TikTok, use a 1080 x 1920 cover and keep key content in the center, since grids crop it. Platforms update these specs occasionally.'],
      },
      {
        question: 'Can I change a thumbnail after posting?',
        answer: ['On YouTube, yes, at any time. On Instagram you can edit a Reel cover after posting in most cases. TikTok lets you choose a cover when posting; changing it later has been limited.'],
      },
    ],
  },
  {
    slug: 'voiceover',
    term: 'Voiceover',
    aka: ['voice over', 'VO', 'narration'],
    category: 'video-tech',
    short: 'A voiceover is narration recorded separately from the picture and laid over a video to explain, tell a story or guide the viewer.',
    definition: [
      'A voiceover is spoken narration recorded separately from the video and played over the footage, rather than speech captured on camera. The narrator is usually not seen. Voiceovers explain products, tell stories, guide viewers through tutorials and give faceless videos a human voice. They can be recorded by a person or generated with text to speech.',
      'In scripts, VO marks lines spoken over the picture, while on-camera dialogue is written differently. Voiceover is a common choice for [explainer videos](/glossary/explainer-video), [tutorial videos](/glossary/tutorial-video) and [faceless videos](/glossary/faceless-video), where the picture shows screens, products or [B-roll](/glossary/b-roll) instead of a person talking.',
      'Options range from recording yourself on a decent microphone, to hiring a voice actor, to an [AI voice generator](/glossary/ai-voice-generator). Each trades cost, speed and control differently.',
    ],
    why: [
      'A voice keeps people watching. It lets you explain more than fits in on-screen text, sets the tone of the brand and makes a video work for people who listen while looking away.',
      'Many people also scroll with sound off, so a voiceover works best paired with captions. Together they reach both audiences and make the message clear on the first watch.',
    ],
    how: {
      heading: 'How to write and record a voiceover',
      steps: [
        'Write for the ear: short sentences, everyday words, one idea per line.',
        'Read the script aloud and time it; about 130-160 words per minute is a comfortable pace.',
        'Record in a quiet, soft-furnished room with the microphone close and steady.',
        'Leave short pauses between lines so the edit can breathe.',
        'Match scene timing to the voice, then add captions and music under it.',
      ],
    },
    openpromo: {
      body: 'OpenPromo writes a narration line for each scene and generates an AI voiceover for it, with scene timing that follows the voice. Checks flag voiceover pace before rendering.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['text-to-speech', 'ai-voice-generator', 'faceless-video', 'animated-captions', 'royalty-free-music'],
    faqs: [
      {
        question: 'Is it voiceover or voice-over?',
        answer: ['Both are used. "Voiceover" as one word is the most common spelling in US media and marketing; "voice-over" and "voice over" also appear.'],
      },
      {
        question: 'How long should a voiceover script be for a 30-second video?',
        answer: ['About 65-80 words. Leave room for a pause after the hook and before the call to action.'],
      },
    ],
  },
  {
    slug: 'text-to-speech',
    term: 'Text to speech (TTS)',
    aka: ['TTS', 'text-to-speech', 'speech synthesis'],
    category: 'video-tech',
    short: 'Text to speech (TTS) is technology that turns written text into spoken audio, used for voiceovers, accessibility and voice assistants.',
    definition: [
      'Text to speech (TTS) is technology that converts written text into spoken audio. You type or paste words, choose a voice, and the system produces a recording. Modern neural TTS sounds close to a human speaker, with natural pacing and emphasis, and is widely used for video voiceovers, accessibility tools, apps and voice assistants.',
      'Early TTS stitched together recorded sound fragments and sounded robotic. Today\'s systems use neural networks trained on many hours of speech, which is why an [AI voice generator](/glossary/ai-voice-generator) can sound warm or energetic on request. Many tools also support [voice cloning](/glossary/voice-cloning), which copies a specific person\'s voice from samples and should only be done with consent.',
      'TTS output can usually be steered with punctuation, spelling and markup such as SSML: commas add pauses, and phonetic spellings fix names the voice mispronounces.',
    ],
    why: [
      'TTS makes [voiceover](/glossary/voiceover) cheap and fast. A small business can narrate dozens of videos without booking a studio, and can fix a line by editing text rather than re-recording.',
      'It also helps accessibility. Screen readers rely on TTS, and narrated video reaches people who prefer listening to reading.',
    ],
    how: {
      heading: 'How to make text to speech sound natural',
      steps: [
        'Write short sentences and read them aloud before generating.',
        'Use punctuation to control pauses: commas for short breaks, full stops for longer ones.',
        'Spell out numbers, units and abbreviations the way they should be said.',
        'Respell brand names phonetically if the voice gets them wrong.',
        'Pick one voice for the brand and use it consistently.',
      ],
    },
    openpromo: {
      body: 'OpenPromo uses AI text to speech for narration in reels, promo videos and tutorials, billed per scene through your own YepAPI key. Unchanged voice lines are reused on re-render.',
      href: '/docs/costs-and-limits',
      label: 'See costs and limits',
    },
    related: ['voiceover', 'ai-voice-generator', 'voice-cloning', 'faceless-video', 'lip-sync'],
    faqs: [
      {
        question: 'Can I use text to speech voices in commercial videos?',
        answer: ['Usually, but it depends on the provider\'s license. Most paid TTS services allow commercial use; check the terms, especially for cloned or celebrity-like voices.'],
      },
      {
        question: 'What is the most realistic text to speech?',
        answer: ['Neural TTS voices from the major AI voice providers are now hard to tell from a human in short clips. Realism depends as much on the script and punctuation as on the engine.'],
      },
    ],
  },
  {
    slug: 'subtitles',
    term: 'Subtitles',
    aka: ['subs', 'video subtitles'],
    category: 'video-tech',
    short: 'Subtitles are on-screen text of the spoken words in a video, often translated, for viewers who can hear the audio but need or prefer to read it.',
    definition: [
      'Subtitles are text shown on screen that transcribes or translates the dialogue and narration in a video. They assume the viewer can hear the audio, so they usually cover speech only. Subtitles are often used to translate a video into another language, and the term is also used loosely for any on-screen captions.',
      'The strict distinction is with [closed captions](/glossary/closed-captions), which are written for viewers who cannot hear and also describe sounds such as [music] or a door slamming. In everyday social media use, people say subtitles and captions interchangeably.',
      'Subtitles can be delivered as a separate file, such as an [SRT file](/glossary/srt-file) that viewers can switch on and off, or burned into the picture as [open captions](/glossary/open-captions) that always show.',
    ],
    why: [
      'A large share of social video is watched with the sound off, in public, at work or late at night. Subtitles let those viewers follow the message instead of scrolling past.',
      'Translated subtitles open a video to new markets without reshooting it. Subtitle files also give search engines and platforms text to understand, which can help discovery on YouTube.',
    ],
    how: {
      heading: 'How to add subtitles to a video',
      steps: [
        'Generate a transcript with a speech-to-text tool or from your script.',
        'Correct names, product terms and numbers by hand.',
        'Split the text into short lines of about 32-42 characters, one or two lines at a time.',
        'Time each line to the speech and export an SRT file.',
        'Upload the SRT to platforms that support it, or burn the subtitles in for platforms that do not.',
      ],
    },
    related: ['closed-captions', 'open-captions', 'srt-file', 'animated-captions', 'caption'],
    faqs: [
      {
        question: 'What is the difference between subtitles and captions?',
        answer: ['Subtitles transcribe or translate speech for viewers who can hear. Captions, especially closed captions, are made for deaf and hard-of-hearing viewers and include sound effects and speaker labels. On social media the words are used interchangeably.'],
      },
      {
        question: 'Do subtitles help with views?',
        answer: ['They help people watching without sound understand the video, which tends to keep them watching longer. Platforms do not publish a direct ranking boost for subtitles.'],
      },
    ],
  },
  {
    slug: 'closed-captions',
    term: 'Closed captions (CC)',
    aka: ['CC', 'closed captioning'],
    category: 'video-tech',
    short: 'Closed captions (CC) are text versions of a video\'s speech and key sounds that viewers can turn on or off, made for deaf and hard-of-hearing viewers.',
    definition: [
      'Closed captions (CC) are a text track of a video\'s dialogue and important sounds that viewers can switch on or off. Unlike basic subtitles, they are written for people who cannot hear the audio, so they also include speaker names and descriptions like [laughter] or [upbeat music]. They are stored separately from the picture.',
      'Closed means hidden until turned on, as opposed to [open captions](/glossary/open-captions), which are burned into the video and always visible. Closed captions are usually delivered as a file such as [SRT](/glossary/srt-file) or WebVTT, or embedded as a track in the video container.',
      'In many countries, accessibility laws and standards require captions for certain video, including broadcast TV and much public-sector and education content. The Web Content Accessibility Guidelines (WCAG) ask for captions on prerecorded video with audio.',
    ],
    why: [
      'Captions make your video usable by deaf and hard-of-hearing customers, and by everyone watching muted. They are a basic part of accessible marketing and, for some organizations, a legal requirement.',
      'Because the text is a separate track, platforms like YouTube can index it, and viewers can choose their own size and language. Auto-generated captions are a start but often get names and product terms wrong, which looks careless.',
    ],
    how: {
      heading: 'How to add closed captions',
      steps: [
        'Start from the script or an automatic transcript.',
        'Correct errors and add speaker labels and key sound descriptions in brackets.',
        'Keep each caption to one or two short lines and time it to the speech.',
        'Export as SRT or WebVTT.',
        'Upload the file in the platform\'s captions or subtitles settings and preview it.',
      ],
    },
    example: {
      label: 'Closed caption lines with sound cues',
      code: '[upbeat music]\nMIA: Welcome back to the studio.\n[door chime]\nToday we\'re trying a new flow.',
    },
    related: ['open-captions', 'subtitles', 'srt-file', 'animated-captions', 'caption'],
    faqs: [
      {
        question: 'What does CC mean on a video?',
        answer: ['CC stands for closed captions. The CC button turns on a text track with the dialogue and key sounds.'],
      },
      {
        question: 'Can you add closed captions to Instagram and TikTok?',
        answer: ['Both offer automatic captions that viewers can turn on, and you can edit them. Neither has long supported uploading your own caption file the way YouTube does, so many creators burn captions in instead.'],
      },
    ],
  },
  {
    slug: 'open-captions',
    term: 'Open captions',
    aka: ['burned-in captions', 'hard subtitles', 'hardcoded subtitles', 'burnt-in captions'],
    category: 'video-tech',
    short: 'Open captions are captions burned into the video picture, so they always show and cannot be turned off. They are the norm for social video.',
    definition: [
      'Open captions are captions that are permanently burned into the video frames, so they appear for every viewer on every device and cannot be switched off. They are also called burned-in captions or hard subtitles. Open captions are the standard on short-form social video, where many people watch muted and caption settings vary.',
      'Because they are part of the picture, open captions can be styled freely: brand fonts, colors, highlighted words and motion, as in [animated captions](/glossary/animated-captions). The trade-off is that viewers cannot resize, translate or hide them, and the text cannot be indexed like a caption file.',
      'Many publishers do both: burn captions into the social cut and upload a separate [SRT file](/glossary/srt-file) as [closed captions](/glossary/closed-captions) where a platform supports it.',
    ],
    why: [
      'Open captions guarantee the message reads with sound off, which matters for Reels, TikTok and Shorts viewed in public. Viewers do not need to find a CC button, and you control exactly how the words look.',
      'They also keep captions on brand. Styled, well-placed captions look like part of the design instead of a default white box covering the product.',
    ],
    how: {
      heading: 'How to burn captions into a video',
      steps: [
        'Get an accurate transcript or SRT file timed to the speech.',
        'Choose a bold, readable font with an outline, shadow or background box for contrast.',
        'Place captions inside the safe zone, clear of platform buttons and the caption area at the bottom.',
        'Keep lines short, two lines at most on screen.',
        'Render the captions into the video, then watch it muted on a phone to check.',
      ],
    },
    openpromo: {
      body: 'OpenPromo burns word-by-word captions into reels and videos, timed to the voiceover, and exports an SRT file with every render for platforms that take caption files.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['closed-captions', 'animated-captions', 'subtitles', 'srt-file', 'safe-zone'],
    faqs: [
      {
        question: 'What is the difference between open and closed captions?',
        answer: ['Open captions are part of the picture and always visible. Closed captions are a separate track viewers can turn on or off.'],
      },
      {
        question: 'Are open captions accessible?',
        answer: ['They help deaf and hard-of-hearing viewers and anyone watching muted, as long as they are accurate and easy to read. Viewers cannot resize them, so use large, high-contrast text.'],
      },
    ],
  },
  {
    slug: 'animated-captions',
    term: 'Animated captions',
    aka: ['karaoke captions', 'word-by-word captions', 'dynamic captions', 'kinetic captions'],
    category: 'video-tech',
    short: 'Animated captions are on-screen captions that appear or highlight word by word in time with speech, common in Reels, TikTok and Shorts.',
    definition: [
      'Animated captions are burned-in captions that move in time with the audio, usually appearing or highlighting one word at a time as it is spoken. They are also called word-by-word or karaoke captions. Animated captions are popular on short-form vertical video because the motion draws the eye and keeps viewers reading along.',
      'Styles vary: a few words at a time with the current word in a highlight color, single words popping in at the center, or full lines with a moving underline. They are a form of [open captions](/glossary/open-captions), sharing roots with [kinetic typography](/glossary/kinetic-typography), and need word-level timing, usually from speech recognition or from the text-to-speech engine that made the [voiceover](/glossary/voiceover).',
      'Too much motion can hurt readability. Constant bouncing, rapid color changes and emoji on every line can distract from the message and are harder for some viewers to follow.',
    ],
    why: [
      'Movement in the caption area gives the eye something to follow in the first seconds, which supports the [hook](/glossary/hook) and helps people who watch muted. Viewers who read along tend to stay with the video longer.',
      'Captions that pace with the voice also make a message easier to take in, because each phrase arrives as it is said rather than as a block of text to read ahead.',
    ],
    how: {
      heading: 'How to make animated captions readable',
      steps: [
        'Show two to five words at a time, not whole sentences.',
        'Highlight the current word with one brand color and keep the rest white or a neutral.',
        'Use a heavy, clean font with an outline or shadow for contrast on any background.',
        'Keep captions in the same place, inside the safe zone, through the whole video.',
        'Check word timing against the audio, especially on names and numbers.',
      ],
    },
    openpromo: {
      body: 'OpenPromo reels and videos have captions that follow the voiceover word by word, burned into the video in the caption look you pick, plus an SRT file.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['open-captions', 'kinetic-typography', 'voiceover', 'srt-file', 'instagram-reels'],
    faqs: [
      {
        question: 'Why do short videos have captions word by word?',
        answer: ['Word-by-word captions hold attention and let people follow along with sound off. They became common on TikTok and spread to Reels and Shorts.'],
      },
      {
        question: 'How do you make word-by-word captions?',
        answer: ['You need word-level timestamps from a speech-to-text tool or your TTS engine, then an editor or renderer that shows or highlights each word at its time.'],
      },
    ],
  },
  {
    slug: 'srt-file',
    term: 'SRT file',
    aka: ['SubRip', '.srt', 'SubRip subtitle file'],
    category: 'video-tech',
    short: 'An SRT file is a plain-text subtitle file listing numbered captions with start and end times. Most video platforms and players accept it.',
    definition: [
      'An SRT file is a plain-text subtitle format, named after the SubRip program, that stores captions as numbered blocks. Each block has a sequence number, a start and end timestamp, and one or two lines of text. Because it is simple and widely supported, SRT is the most common format for uploading [subtitles](/glossary/subtitles) and closed captions.',
      'Timestamps use the format hours:minutes:seconds,milliseconds, with a comma before the milliseconds, and an arrow between start and end. A blank line separates blocks. SRT has little styling support, which keeps it portable.',
      'WebVTT (.vtt) is a similar format built for web players. It uses a period before milliseconds, starts with a WEBVTT header and supports positioning and styling. Many tools convert between the two.',
    ],
    why: [
      'An SRT file lets you add accurate [closed captions](/glossary/closed-captions) on YouTube, Facebook, LinkedIn and most video hosts and players, instead of relying on auto-captions that mangle product names.',
      'It is also reusable. The same file can be translated into other languages, edited in any text editor, and used to burn in [open captions](/glossary/open-captions) for platforms that do not accept caption files.',
    ],
    how: {
      heading: 'How to create an SRT file',
      steps: [
        'Get a transcript of the video from your script or a speech-to-text tool.',
        'Split it into short captions of one or two lines.',
        'Give each caption a number and start and end times in HH:MM:SS,mmm format.',
        'Separate blocks with a blank line and save as UTF-8 text with a .srt extension.',
        'Upload it with your video and preview the timing.',
      ],
    },
    example: {
      label: 'SRT file example',
      code: '1\n00:00:00,000 --> 00:00:02,100\nFresh sourdough, every morning.\n\n2\n00:00:02,100 --> 00:00:04,800\nBaked at 6am at Crumb & Co.',
    },
    openpromo: {
      body: 'Every OpenPromo reel, promo video and tutorial comes with an SRT caption file next to the MP4, ready to upload to your video host.',
      href: '/features/product-demo-video-maker',
      label: 'See the demo video maker',
    },
    related: ['subtitles', 'closed-captions', 'open-captions', 'mp4', 'animated-captions'],
    faqs: [
      {
        question: 'How do I open an SRT file?',
        answer: ['Any text editor opens it. Video players such as VLC load it as subtitles if it has the same name as the video file and sits in the same folder.'],
      },
      {
        question: 'What is the difference between SRT and VTT?',
        answer: ['Both are timed text formats. VTT (WebVTT) is designed for HTML5 web players and supports styling and positioning; SRT is simpler and more widely accepted for uploads.'],
      },
    ],
  },
  {
    slug: 'royalty-free-music',
    term: 'Royalty-free music',
    aka: ['background music', 'stock music', 'music bed', 'royalty free music'],
    category: 'video-tech',
    short: 'Royalty-free music is music licensed for a one-time fee or subscription, with no per-play royalties, so you can use it in videos and ads.',
    definition: [
      'Royalty-free music is music you license once, by a single fee or a subscription, and can then use in videos, ads and podcasts without paying a royalty each time it plays. Royalty-free does not mean free of charge or free of copyright: the composer keeps the rights, and the license sets where and how you may use it.',
      'Licenses differ on commercial use, paid ads, broadcast, number of projects and whether you can keep using a track after a subscription ends. Some libraries register their tracks with Content ID, so a correctly licensed video can still get a claim that you clear by showing your license.',
      'Other options include public domain music, Creative Commons tracks with attribution rules, platform sound libraries, and an [AI music generator](/glossary/ai-music-generator), whose terms you should read just as carefully.',
    ],
    why: [
      'Music sets the mood and pace of a video, and a background bed makes even a simple slideshow feel finished. Using commercial songs without a license can get videos muted, taken down or ads rejected.',
      'Many [trending audio](/glossary/trending-audio) tracks on Instagram and TikTok are cleared for personal accounts but not for business accounts or ads. Royalty-free or commercially licensed music keeps branded content safe to post and promote.',
    ],
    how: {
      heading: 'How to use royalty-free music safely',
      steps: [
        'Choose a library whose license covers commercial use and paid ads if you plan to promote the video.',
        'Download the license or receipt for each track and keep it with the project.',
        'Mix the music under the voiceover so speech stays clear.',
        'Trim or fade the track to match the video length.',
        'If you get a copyright claim, dispute it with your license details.',
      ],
    },
    openpromo: {
      body: 'OpenPromo can add an AI-generated music bed under reels and videos, billed per video through your YepAPI key. You can turn music off.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['ai-music-generator', 'trending-audio', 'voiceover', 'promo-video', 'instagram-reels'],
    faqs: [
      {
        question: 'Is royalty-free music free to use?',
        answer: ['Not always. Royalty-free means no per-use royalties after you get a license; the license itself often costs money. Some libraries offer free tracks with their own rules.'],
      },
      {
        question: 'Can businesses use trending songs on Instagram and TikTok?',
        answer: ['Often not. Business accounts usually get a restricted library of commercially cleared sounds. Using popular songs in branded content or ads can lead to muted videos or takedowns.'],
      },
    ],
  },
  {
    slug: 'lip-sync',
    term: 'Lip sync',
    aka: ['lip-sync', 'lip syncing', 'AI lip sync'],
    category: 'video-tech',
    short: 'Lip sync is matching mouth movements to audio, whether a person mouthing words to a song or AI that animates a face to match a voice track.',
    definition: [
      'Lip sync is the matching of mouth movements to spoken or sung audio so they appear to happen together. It covers performers mouthing to a recording, as in classic TikTok lip-sync videos, the technical alignment of audio and picture in editing, and AI tools that animate a face in a video or photo to match a new voice track.',
      'In editing, bad sync means the sound arrives before or after the mouth moves. Even a small offset is noticeable, so editors line up audio with a clap or waveform. AI lip sync is used for dubbing videos into other languages and for [AI avatars](/glossary/ai-avatar) that speak a script.',
      'Realistic AI lip sync raises consent questions. Making a real person appear to say something they did not is a form of [deepfake](/glossary/deepfake), and many platforms require labeling of altered or synthetic media.',
    ],
    why: [
      'Out-of-sync audio makes video feel cheap and distracts from the message. For talking-head content, clean sync is part of basic quality.',
      'AI lip sync can make localized versions of a video for new markets without reshooting. Done openly and with permission, it can cut costs; done without disclosure, it can damage trust.',
    ],
    how: {
      heading: 'How to fix lip sync in a video',
      steps: [
        'Find a clear sync point, such as a clap or a hard consonant like "p" or "b".',
        'Line up the audio waveform peak with the frame where the mouth closes or the hands meet.',
        'Nudge the audio a frame at a time until the mouth and sound match.',
        'Check sync at the start, middle and end, since drift can build over long clips.',
        'Export and check again on the device viewers will use.',
      ],
    },
    related: ['voiceover', 'ai-avatar', 'deepfake', 'talking-head-video', 'text-to-speech'],
    faqs: [
      {
        question: 'What is AI lip sync?',
        answer: ['AI lip sync uses a model to change or generate a person\'s mouth movements in video so they match a given audio track, often used for dubbing or AI avatars.'],
      },
      {
        question: 'Why is my video audio out of sync?',
        answer: ['Common causes are variable frame rate recordings (common on phones and screen recorders), mixed frame rates in one edit, or Bluetooth audio delay during playback. Converting to a constant frame rate usually fixes editing drift.'],
      },
    ],
  },
  {
    slug: 'watch-time',
    term: 'Watch time',
    aka: ['total watch time', 'minutes watched'],
    category: 'video-tech',
    short: 'Watch time is the total time people spent watching your video or channel. Platforms like YouTube use it as a key signal of quality.',
    definition: [
      'Watch time is the total amount of time viewers have spent watching a video, a set of videos or a whole channel, usually shown in minutes or hours. If 100 people each watch 30 seconds of a video, it has 50 minutes of watch time. Platforms treat it as a strong signal that content holds attention.',
      'Watch time combines two things: how many views a video gets and how long each view lasts. [Average view duration](/glossary/average-view-duration) is watch time divided by views, and [audience retention](/glossary/audience-retention) shows where in the video people leave.',
      'YouTube uses watch time in recommendations and in its Partner Program eligibility, which has required a set number of public watch hours over 12 months as one route to monetization. Instagram and TikTok report watch time for Reels and videos in their insights.',
    ],
    why: [
      'A [social media algorithm](/glossary/social-media-algorithm) wants people to stay on the platform, so videos that hold viewers tend to be shown to more of them. Raising watch time often does more for reach than raising raw view counts.',
      'Watch time also tells you whether the content is working. A video with many views but little watch time has a strong thumbnail or hook and a weak body; that is a clear thing to fix.',
    ],
    how: {
      heading: 'How to increase watch time',
      steps: [
        'Open with a hook that states the payoff in the first two seconds.',
        'Cut slow intros, logos and greetings at the start.',
        'Change the visual every few seconds with B-roll, text or a new angle.',
        'Use captions so muted viewers keep watching.',
        'Check retention graphs to see where people leave, and fix that part in the next video.',
      ],
    },
    related: ['audience-retention', 'average-view-duration', 'completion-rate', 'hook', 'social-media-algorithm'],
    faqs: [
      {
        question: 'How is watch time calculated?',
        answer: ['It is the sum of every viewer\'s viewing time. Views multiplied by average view duration gives the same number.'],
      },
      {
        question: 'Does rewatching count toward watch time?',
        answer: ['Yes, on most platforms replays add to watch time, which is one reason short looping videos can build it quickly.'],
      },
    ],
  },
  {
    slug: 'audience-retention',
    term: 'Audience retention',
    aka: ['retention rate', 'video retention', 'retention graph'],
    category: 'video-tech',
    short: 'Audience retention shows what share of viewers are still watching at each moment of a video, revealing where people drop off.',
    definition: [
      'Audience retention is a video metric that shows what percentage of viewers are still watching at each point in a video. It is usually shown as a graph that starts at 100 percent and falls over time. Retention reveals where people lose interest, which moments make them rewatch, and how well the opening holds attention.',
      'Platforms report it in a few ways. YouTube shows a retention curve, average percentage viewed and a comparison with similar videos. Instagram and TikTok show how many viewers stayed past the first few seconds and the average watch time. Retention rate is sometimes used for the share of viewers still watching at a given point.',
      'Curve shapes tell a story. A steep drop at the start means the [hook](/glossary/hook) or [thumbnail](/glossary/thumbnail) promised something the opening did not deliver. Bumps mean rewatching. A sharp drop near the end often comes from a long outro.',
    ],
    why: [
      'Retention feeds directly into [watch time](/glossary/watch-time) and is one of the clearest signals platforms use to decide whether to show a video to more people. Better retention generally means more reach for the same content.',
      'It is also the most practical editing feedback you can get. Each drop in the graph points to a moment you can cut, tighten or rework.',
    ],
    how: {
      heading: 'How to improve audience retention',
      steps: [
        'Study the first three seconds: start with the result, a question or a bold claim.',
        'Remove any pause, filler or repeated point the graph shows people skipping.',
        'Use visual change and on-screen text to re-engage attention every few seconds.',
        'Deliver the promised payoff before the end, then close quickly with one call to action.',
        'Compare retention across videos to find the openings and formats that work.',
      ],
    },
    openpromo: {
      body: 'Before rendering, OpenPromo checks reels for a missing hook, text that is too long to read in time and a missing call to action, which are common causes of early drop-off.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['watch-time', 'average-view-duration', 'completion-rate', 'hook', 'thumbnail'],
    faqs: [
      {
        question: 'What is a good audience retention rate?',
        answer: ['It depends on length and format. Short videos can hold well over half their viewers, while long videos usually keep much less. Compare against your own past videos and the platform\'s typical range for similar content rather than a single number.'],
      },
      {
        question: 'Where can I see audience retention on YouTube?',
        answer: ['In YouTube Studio, open a video\'s analytics and go to the Engagement tab. The key moments for audience retention graph shows the curve.'],
      },
    ],
  },
  {
    slug: 'average-view-duration',
    term: 'Average view duration (AVD)',
    aka: ['AVD', 'average watch time', 'average view time'],
    category: 'video-tech',
    short: 'Average view duration (AVD) is the average time viewers watch a video, found by dividing total watch time by the number of views.',
    definition: [
      'Average view duration (AVD) is the average length of time viewers spend watching a video, calculated by dividing total [watch time](/glossary/watch-time) by the number of views. If a 60-second video earns 500 minutes of watch time from 1,000 views, its AVD is 30 seconds. It shows how long a typical view lasts.',
      'AVD is related to average percentage viewed, which divides AVD by the video\'s length. A 30-second AVD is strong for a 40-second video and weak for a 10-minute one, so the percentage is better for comparing videos of different lengths.',
      'YouTube reports AVD directly. Instagram and TikTok show a similar number as average watch time in insights. Very short videos can exceed 100 percent viewed when people replay them.',
    ],
    why: [
      'AVD shows whether people actually watch what you publish. Platforms favor videos that hold attention, so improving AVD tends to improve reach and suggested placements.',
      'It also helps you choose length. If viewers consistently leave at 25 seconds, a 20-second version might perform better than a 60-second one, and the key message should come before that point.',
    ],
    how: {
      heading: 'How to calculate average view duration',
      body: [
        'Divide total watch time by total views. To get average percentage viewed, divide AVD by the video length and multiply by 100.',
      ],
    },
    example: {
      label: 'AVD formula',
      code: 'AVD = total watch time / views\nAverage % viewed = AVD / video length x 100\n\nExample: 500 min / 1,000 views = 0.5 min (30 s)\n30 s / 60 s x 100 = 50% viewed',
    },
    related: ['watch-time', 'audience-retention', 'completion-rate', 'short-form-video'],
    faqs: [
      {
        question: 'What is a good average view duration?',
        answer: ['There is no single target. For short-form video, aim for viewers to watch most of it; for longer videos, a higher percentage than your channel average is a good sign. Track it against your own past videos.'],
      },
      {
        question: 'Is AVD the same as watch time?',
        answer: ['No. Watch time is the total across all views. AVD is the average per view.'],
      },
    ],
  },
  {
    slug: 'completion-rate',
    term: 'Completion rate',
    aka: ['view-through rate', 'VTR', 'video completion rate'],
    category: 'video-tech',
    short: 'Completion rate is the percentage of video views that reach the end. In ads it is often called view-through rate (VTR).',
    definition: [
      'Completion rate is the percentage of people who watch a video all the way to the end out of everyone who started it. If 1,000 people start a video and 350 finish, the completion rate is 35 percent. It is a simple measure of whether a video holds attention from first frame to last.',
      'In advertising the same idea is often called view-through rate (VTR), and ad platforms also report quartiles: how many viewers reached 25, 50, 75 and 100 percent. Some platforms define a completed view differently for long ads, such as 30 seconds watched, so check each platform\'s definition.',
      'Completion rate naturally falls as videos get longer, so it is most useful for comparing videos of similar length, and alongside [audience retention](/glossary/audience-retention) to see where viewers leave.',
    ],
    why: [
      'Viewers who finish a video see your offer and [call to action](/glossary/call-to-action), which usually comes at the end. A higher completion rate means more people get the full message.',
      'Platforms also read completions and replays as signs a video is worth showing, which is why tight [short-form videos](/glossary/short-form-video) with a clear payoff often spread further.',
    ],
    how: {
      heading: 'How to calculate completion rate',
      body: [
        'Divide the number of completed views by the number of started views and multiply by 100. Use the platform\'s own definition of a started and completed view.',
      ],
      steps: [
        'Cut the video to the shortest length that still delivers the point.',
        'Put the payoff late enough to keep people watching, but not after a slow middle.',
        'Avoid long outros and end cards that viewers skip.',
        'Try a version that loops cleanly, so the end leads back into the start.',
      ],
    },
    example: {
      label: 'Completion rate formula',
      code: 'Completion rate = completed views / started views x 100\n\nExample: 350 / 1,000 x 100 = 35%',
    },
    related: ['audience-retention', 'watch-time', 'average-view-duration', 'loop-video', 'short-form-video'],
    faqs: [
      {
        question: 'What is a good video completion rate?',
        answer: ['It depends heavily on length, placement and whether the ad is skippable. Compare against your own videos of similar length and the benchmarks your ad platform shows, rather than a universal figure.'],
      },
      {
        question: 'Is completion rate the same as view-through rate?',
        answer: ['Often, yes. In video ads, view-through rate usually means the share of impressions or views that watched to completion. Some platforms use the term differently, so check the definition.'],
      },
    ],
  },
  {
    slug: 'safe-zone',
    term: 'Safe zone',
    aka: ['title safe area', 'safe area', 'action safe area', 'Instagram safe zone', 'TikTok safe zone'],
    category: 'video-tech',
    short: 'A safe zone is the area of a video or image where text and key content will not be hidden by platform buttons, captions or cropping.',
    definition: [
      'A safe zone is the part of a video or image frame where text, faces and logos stay visible and are not covered by platform interface elements or cut off by cropping. On vertical social video, the top and bottom edges hold usernames, captions and buttons, and the right edge holds like, comment and share icons.',
      'The idea comes from TV, where title safe and action safe areas kept text away from screen edges that older televisions cut off. On social media the cause is the app interface, and each platform and placement has a slightly different layout.',
      'For a 1080 x 1920 Reel, Story or TikTok, a common rule of thumb is to keep key content out of roughly the top 250 pixels, the bottom 300-400 pixels and the right 100-150 pixels. Published guidance varies and platforms change their layouts, so use current templates where they exist.',
    ],
    why: [
      'If your headline sits behind the caption overlay or your price hides under the share button, the video fails no matter how good it is. Keeping copy inside the safe zone makes sure the message survives on every phone.',
      'Safe zones also matter for repurposing. A video designed with its key content in the center can be cropped from 9:16 to 4:5 or shown in a grid preview without losing the point, which helps when the same asset runs as an [Instagram Story](/glossary/instagram-story), Reel and ad.',
    ],
    how: {
      heading: 'How to design within the safe zone',
      steps: [
        'Start from a template or overlay of the platform\'s interface for the placement you use.',
        'Keep headlines, captions, logos and faces inside the central area.',
        'Leave extra room at the bottom for the post caption and at the right for action buttons.',
        'Keep backgrounds full-bleed to the edges; only key content needs to stay inside.',
        'Preview the final file in the app before posting or launching an ad.',
      ],
    },
    example: {
      label: 'Rough safe zone for a 1080 x 1920 vertical video',
      code: 'Top:    keep clear about 250 px (profile, close button)\nBottom: keep clear about 300-400 px (caption, CTA, music)\nRight:  keep clear about 100-150 px (like, comment, share)\nSafe area left: roughly the central 900 x 1300 px',
    },
    openpromo: {
      body: 'OpenPromo renders stories and reels at 1080 x 1920 from scene layouts, with text that shrinks until it fits its box, so copy stays inside the frame in every size.',
      href: '/features/ai-reel-generator',
      label: 'See the reel generator',
    },
    related: ['aspect-ratio', 'vertical-video', 'instagram-story-size', 'open-captions', 'instagram-reels'],
    faqs: [
      {
        question: 'What is the safe zone for Instagram Reels?',
        answer: ['On a 1080 x 1920 Reel, keep text and faces away from roughly the top 250 pixels, the bottom 300-400 pixels and the right edge, where the caption, profile and buttons appear. Instagram has adjusted its layout over time, so preview before posting.'],
      },
      {
        question: 'What is title safe area?',
        answer: ['Title safe is a TV-era guide that kept text inside an inner area of the frame, so screens that cropped the edges would not cut it off. The same idea now applies to app interfaces on social video.'],
      },
    ],
  },
];
