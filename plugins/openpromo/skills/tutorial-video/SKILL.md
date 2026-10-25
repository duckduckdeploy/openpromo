---
name: tutorial-video
description: Make a narrated getting-started or how-to video from the product's own screens, one step per scene, in 16:9 for YouTube and the website or 9:16 for shorts. Use when asked for a tutorial, a walkthrough, an onboarding video or a how-to.
---

# Tutorial video

## Money rules (every OpenPromo skill)

- Reading a website costs about $0.05–0.15; writing ideas or a creation about $0.02–0.08 each.
- Rendering images costs nothing unless a scene asks for an AI picture ($0.04–0.20 each). A video adds voiceover (about $0.01 a scene) and music ($0.08). Say the likely price before you render, and get a yes.
- Generated pieces are kept: rendering again after an edit only pays for what is new.
- Reading the brand, ideas, creations and the library is free; check them first.

## Steps

1. **Flow.** From `get_brand`, read `brand.flows`. Agree the task to teach (for example "create your first invoice") and its steps; fill gaps by asking the owner.
2. **Screens.** `list_assets` with `role: "screenshot"`. Each step needs a screenshot of that screen. The owner can upload missing ones in the Library (OpenPromo cannot read pages behind a login).
3. **Write.** `create_creation` with `type: "tutorial"`, the format (`landscape` or `story`) and a brief that lists the steps. Check each step scene uses the `screenshot` layout with the right screen, an eyebrow like "Step 2", a headline naming the action, and narration that explains it plainly.
4. **Fix and render.** Act on the `checks`, state the price (voiceover about $0.01 per scene, music $0.08), then `render_creation` and poll `get_render`.
5. **Hand over.** The MP4, the thumbnail and the SRT captions.
