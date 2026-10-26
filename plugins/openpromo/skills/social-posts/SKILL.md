---
name: social-posts
description: Make on-brand images and carousels for Instagram, LinkedIn, Facebook and ads from a brief or an idea, check them, and render them in every size needed. Use when asked for a post, a banner, a carousel or an ad creative.
---

# Social posts

## Money rules (every OpenPromo skill)

- Reading a website costs about $0.05–0.15; writing ideas or a creation about $0.02–0.08 each.
- Rendering images costs nothing unless a scene asks for an AI picture ($0.04–0.20 each). A video adds voiceover (about $0.01 a scene) and music ($0.08). Say the likely price before you render, and get a yes.
- Generated pieces are kept: rendering again after an edit only pays for what is new.
- Reading the brand, ideas, creations and the library is free; check them first.

## Steps

1. **Brief.** Agree what the post says, who it is for, and where it goes. Pick the type and size: `image` (square, portrait 4:5, story 9:16, link 1.91:1, X header, LinkedIn banner) or `carousel` (square or portrait; it also renders a PDF for LinkedIn).
2. **Pictures.** `list_assets` with `role: "screenshot,product,photo"`. Real screenshots and product photos beat AI pictures; only allow generated ones (`allow_generated`) when nothing fits.
3. **Write.** `create_creation`, with a `template_id` from `list_templates` when a style fits (quote card, offer, comic panel, product spotlight, tips carousel…). Read the scenes and `checks`:
   - errors (a layout with no picture, no headline) must be fixed;
   - warnings about figures not on the website mean: confirm they are true or remove them;
   - generic words (seamless, revolutionize…) should be replaced with what the product actually does.
4. **Edit.** Change text, layout (hero, statement, stat, list, quote, screenshot, product, split, offer, cta) or pictures with `update_creation`, sending the whole spec back.
5. **Render.** With the owner's yes on the price, `render_creation`; for other sizes, render again with `format`. Poll `get_render`.
6. **Hand over.** The post caption from `get_creation`, and the file ids from the render.
