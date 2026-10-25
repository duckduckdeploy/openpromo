---
name: brand-check
description: Read a business website into an OpenPromo brand profile and tidy it up with the owner, so every post and video after it is on-brand and true. Use when someone adds a website, or says their posts sound off or get facts wrong.
---

# Brand check

## Money rules (every OpenPromo skill)

- Reading a website costs about $0.05–0.15; writing ideas or a creation about $0.02–0.08 each.
- Rendering images costs nothing unless a scene asks for an AI picture ($0.04–0.20 each). A video adds voiceover (about $0.01 a scene) and music ($0.08). Say the likely price before you render, and get a yes.
- Generated pieces are kept: rendering again after an edit only pays for what is new.
- Reading the brand, ideas, creations and the library is free; check them first.

## Steps

1. **Project.** `list_projects`. If the site is not there, agree on it and run `create_project` with its address. Poll `get_brand` every 20 seconds until `brandStatus` is `ready` (about a minute). If it is `failed`, say why (`brandError`) and offer `refresh_brand`.
2. **Read it back.** From `get_brand`, summarise in a few lines: what the business is, who it is for, its tone, its colours and fonts, and its selling points.
3. **Facts.** Go through `brand.positioning.points`. Points with `source: null` were not found word for word on the site: ask the owner whether each is true, and remove or reword the ones that are not. Ask whether there are offers, prices or proof (reviews, numbers, awards) the site does not show yet.
4. **Voice.** Ask for two or three words the brand would never use, and add them to `voice.avoid`. Check the tone and sample lines sound like them.
5. **Save.** Send the whole edited profile with `update_brand`. Edited fields stay when the site is read again.
6. **Next.** Offer a content plan (the content-plan skill) or a first post.
