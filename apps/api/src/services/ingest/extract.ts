import { VOICE_TONES } from "@openpromo/shared";
import type { YepApi } from "@openpromo/yepapi";
import { z } from "zod";
import { chatJson, imagePart, TEXT_MODELS, type ContentPart } from "../../lib/ai";

/** What the model reads off the site. Visual details (colours, fonts, logo) come from the page itself. */
export const extractedBrand = z.object({
  name: z.string().describe("The business or product name as the site writes it"),
  tagline: z.string().describe("Its own tagline or hero line, verbatim if there is one; otherwise a 4–8 word summary"),
  description: z.string().describe("2–3 plain sentences: what it is, who it is for, what makes it different"),
  category: z.string().describe("e.g. 'project management SaaS', 'specialty coffee roaster', 'dental clinic'"),
  audience: z
    .array(z.object({ who: z.string(), pain: z.string(), outcome: z.string() }))
    .describe("1–4 audience segments as the site addresses them"),
  objections: z.array(z.string()).describe("Doubts a buyer might have that the site answers (price, setup time, trust…)"),
  points: z
    .array(
      z.object({
        title: z.string().describe("Short on-screen version, under 8 words, no hype"),
        detail: z.string().describe("One sentence of detail"),
        kind: z.enum(["benefit", "feature", "proof", "offer"]),
        quote: z.string().describe("The exact sentence or phrase from the page this is based on, copied character for character"),
        url: z.string().describe("The page URL the quote is on"),
      }),
    )
    .describe("6–14 selling points: benefits, concrete features, proof (numbers, customers, awards, reviews) and offers. Only things the site actually says."),
  ctas: z.array(z.string()).describe("The site's own call-to-action labels that ask the visitor to act, e.g. 'Start free trial', 'Book a table'. Not navigation, filters or sorting labels."),
  offers: z.array(z.string()).describe("Current offers, guarantees, free trials or discounts stated on the site"),
  tone: z.enum(VOICE_TONES),
  casual: z.number().describe("0 = formal, 100 = casual"),
  playful: z.number().describe("0 = serious, 100 = playful"),
  sampleLines: z.array(z.string()).describe("3–5 short lines copied from the site that best show its voice"),
  avoid: z.array(z.string()).describe("Words or claims this brand should not use, judging by its voice (e.g. 'cheap' for a premium brand)"),
  products: z
    .array(z.object({ name: z.string(), description: z.string(), price: z.string().nullable(), url: z.string().nullable() }))
    .describe("Products, plans or services with prices as shown; empty if none are listed"),
  flows: z
    .array(
      z.object({
        title: z.string().describe("A task a new user does, e.g. 'Book your first appointment'"),
        startUrl: z.string(),
        steps: z.array(z.string()).describe("3–7 short steps, as the site describes them"),
        needsLogin: z.boolean(),
      }),
    )
    .describe("1–3 getting-started flows for tutorial videos"),
  imageryStyle: z.array(z.string()).describe("3–6 tags describing the site's imagery, e.g. 'bright product photos', 'flat illustrations', 'dark UI screenshots'"),
});
export type ExtractedBrand = z.infer<typeof extractedBrand>;

const SYSTEM = `You build brand profiles for a tool that makes social media posts and promo videos.
You read a business's website (text of several pages and a screenshot of its homepage) and describe the business exactly as the site presents it.

Rules:
- Only state what the pages support. Never invent features, numbers, prices, customers or awards.
- Every selling point must quote the page it comes from, copied exactly, with that page's URL.
- Write short, concrete, specific titles. Avoid hype words: revolutionize, seamless, unlock, elevate, game-changer, cutting-edge, next-level, supercharge.
- Use the site's own language and spelling.`;

export type PageText = { url: string; title: string | null; markdown: string };

/** Asks the reading model for the profile's text fields, from the pages and a homepage screenshot. */
export async function extractBrand(
  yep: YepApi,
  input: { pages: PageText[]; screenshot?: { mimeType: string; bytes: Buffer }; hints: string },
): Promise<{ data: ExtractedBrand; costUsd: number }> {
  // About 60k characters of page text keeps the call fast and cheap; the homepage gets the most room.
  const budget = 60_000;
  const share = (i: number) => (i === 0 ? Math.floor(budget * 0.35) : Math.floor((budget * 0.65) / Math.max(1, input.pages.length - 1)));
  const text = input.pages.map((p, i) => `=== PAGE ${p.url}\nTitle: ${p.title ?? ""}\n${p.markdown.slice(0, share(i))}`).join("\n\n");
  const user: ContentPart[] = [{ type: "text", text: `${input.hints}\n\n${text}` }];
  if (input.screenshot) user.push(imagePart(input.screenshot.mimeType, input.screenshot.bytes));
  return chatJson(yep, { model: TEXT_MODELS.read, system: SYSTEM, user, schema: extractedBrand, name: "brand_profile", temperature: 0.2 });
}

const normaliseText = (s: string) =>
  s
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9$%€£'"\-.,!? ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Whether a quote really is on one of the pages: the exact text, or (for quotes the model trimmed
 * or re-punctuated) at least 85% of its words in order within one page. Returns the page URL.
 */
export function findQuote(quote: string, pages: PageText[], preferredUrl?: string): string | null {
  const q = normaliseText(quote);
  if (q.length < 8) return null;
  const ordered = preferredUrl ? [...pages].sort((a, b) => (a.url === preferredUrl ? -1 : b.url === preferredUrl ? 1 : 0)) : pages;
  for (const page of ordered) {
    const body = normaliseText(page.markdown);
    if (body.includes(q)) return page.url;
    const words = q.split(" ");
    if (words.length < 4) continue;
    let at = 0;
    let found = 0;
    for (const word of words) {
      const next = body.indexOf(word, at);
      if (next >= 0 && next - at < 200) {
        found++;
        at = next + word.length;
      }
    }
    if (found / words.length >= 0.85) return page.url;
  }
  return null;
}
