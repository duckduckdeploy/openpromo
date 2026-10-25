---
name: promo-reel
description: Make a 15–40 second vertical promo reel for Instagram Reels, TikTok or YouTube Shorts, with a hook in the first two seconds, voiceover, music and word-by-word captions. Use when asked for a reel, a short, a TikTok or a short promo video.
---

# Promo reel

## Money rules (every OpenPromo skill)

- Reading a website costs about $0.05–0.15; writing ideas or a creation about $0.02–0.08 each.
- Rendering images costs nothing unless a scene asks for an AI picture ($0.04–0.20 each). A video adds voiceover (about $0.01 a scene) and music ($0.08). Say the likely price before you render, and get a yes.
- Generated pieces are kept: rendering again after an edit only pays for what is new.
- Reading the brand, ideas, creations and the library is free; check them first.

## Steps

1. **Angle.** Agree one message: a product, an offer, a proof point or a tip. One reel, one idea. Check it is in the brand profile (`get_brand`).
2. **Write.** `create_creation` with `type: "reel"` (and `idea_id` if it came from an idea). Check:
   - scene 1 is a hook a viewer understands in two seconds;
   - every scene's narration says the on-screen point in other words, and sounds natural read aloud;
   - the last scene asks for one action.
3. **Fix.** Act on the `checks`. A scene that is too short for its voiceover is stretched at render time, but shorter narration is usually better.
   Captions: the writer picks a look from the brand's voice. To change it, update `spec.captionStyle.preset` (`bold-pop`, `box-highlight`, `karaoke-pill`, `karaoke-pill-dark`, `word-slam`, `minimal`, `word-reveal`). `spec.scenes[].emphasis` lists the words shown in the highlight colour.
4. **Price.** Count it before rendering: voiceover about $0.01 per scene, music $0.08 unless reused, AI pictures $0.04–0.20 each, AI clips about $0.11 a second. Get a yes.
5. **Render.** `render_creation`; poll `get_render` (a 30-second reel takes one to three minutes). It produces the MP4, a thumbnail and an SRT caption file.
6. **Post.** Give the caption, and suggest uploading the SRT too where the platform takes it.
