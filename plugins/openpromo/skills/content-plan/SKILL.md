---
name: content-plan
description: Plan a month of social posts from the brand's own selling points, with a hook, caption and hashtags for each, then make the ones the owner picks. Use when asked what to post, for a content calendar or for post ideas.
---

# Content plan

## Money rules (every OpenPromo skill)

- Reading a website costs about $0.05–0.15; writing ideas or a creation about $0.02–0.08 each.
- Rendering images costs nothing unless a scene asks for an AI picture ($0.04–0.20 each). A video adds voiceover (about $0.01 a scene) and music ($0.08). Say the likely price before you render, and get a yes.
- Generated pieces are kept: rendering again after an edit only pays for what is new.
- Reading the brand, ideas, creations and the library is free; check them first.

## Steps

1. **Context.** `get_brand` and `list_ideas`, so you do not repeat earlier ideas. Ask about goals for the month: a launch, an offer, a season, more followers or more sales.
2. **Ideas.** `generate_ideas` with a count of 8–12 and the goal or notes that fit. For a mix, run it twice with different goals.
3. **Plan.** Lay the ideas out over four weeks: two or three posts a week, mixing formats (image, carousel, reel) and goals (teach, prove, sell). Show each as one line: day, format, hook.
4. **Pick.** Ask which to make first. For each, `create_creation` with its `idea_id`, read the `checks`, fix errors with `update_creation`, and render once the owner agrees to the price.
5. **Hand over.** For each render, give the post caption and where to download the files.
