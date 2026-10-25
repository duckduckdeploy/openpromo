import { contrast, distance, mix, readableOn, saturation, type BrandColors } from "@openpromo/shared";
import type { ReadPage } from "./page-script";

/**
 * Turns the colours and fonts a page paints into brand roles. Pure functions, so they are easy to
 * test against real sites' readings.
 */

type Weighted = Array<{ hex: string; weight: number }>;

const isNeutral = (hex: string) => saturation(hex) < 0.18;
const isExtreme = (hex: string) => {
  const l = contrast(hex, "#000000");
  return l < 1.15 || contrast(hex, "#ffffff") < 1.08;
};

function distinct(colors: string[]): string[] {
  const out: string[] = [];
  for (const c of colors) if (!out.some((o) => distance(o, c) < 40)) out.push(c);
  return out;
}

/** `logoColor`: the logo's main colour, the strongest brand signal when the site's buttons are neutral. */
export function pickColors(colors: ReadPage["colors"], themeColor: string | null, logoColor: string | null = null): BrandColors {
  const byWeight = (list: Weighted) => list.map((c) => c.hex);
  const background = byWeight(colors.backgrounds)[0] ?? "#ffffff";
  const text = byWeight(colors.texts).find((c) => contrast(c, background) >= 4.5) ?? readableOn(background);

  // Primary: the logo's colour, else the most-painted colourful button, else a colourful link,
  // else the theme colour, else the most colourful background.
  const colourful = (list: string[]) => list.filter((c) => !isNeutral(c) && !isExtreme(c));
  const candidates = distinct([
    ...(logoColor ? colourful([logoColor]) : []),
    ...colourful(byWeight(colors.buttons)),
    ...colourful(byWeight(colors.links)),
    ...(themeColor && /^#[0-9a-f]{6}$/i.test(themeColor) && !isNeutral(themeColor) ? [themeColor.toLowerCase()] : []),
    ...colourful(byWeight(colors.backgrounds)),
    ...colourful(byWeight(colors.texts)),
  ]);
  const primary = candidates[0] ?? (contrast(background, "#111111") > 7 ? "#111111" : "#ffffff");
  const accent = candidates.find((c) => distance(c, primary) > 80) ?? mix(primary, readableOn(primary) === "#ffffff" ? "#ffffff" : "#000000", 0.35);

  const buttonText = byWeight(colors.buttonText).find((c) => contrast(c, primary) >= 4.5);
  const onPrimary = buttonText ?? readableOn(primary);
  const muted = byWeight(colors.texts).find((c) => isNeutral(c) && c !== text && contrast(c, background) >= 3) ?? mix(text, background, 0.4);

  const palette = distinct([background, text, primary, accent, ...byWeight(colors.backgrounds), ...byWeight(colors.buttons), ...byWeight(colors.texts)]).slice(0, 12);
  return { background, text, primary, onPrimary, accent, muted, palette };
}

/** Generic and system families a template cannot load by name. */
const SYSTEM_FONTS = new Set([
  "system-ui",
  "-apple-system",
  "blinkmacsystemfont",
  "segoe ui",
  "helvetica",
  "helvetica neue",
  "arial",
  "sans-serif",
  "serif",
  "monospace",
  "times new roman",
  "georgia",
  "ui-sans-serif",
  "ui-serif",
  "inherit",
]);

/** Families the page loads from Google Fonts, read from the stylesheet links. */
export function googleFamilies(links: string[]): string[] {
  const families: string[] = [];
  for (const link of links) {
    try {
      const url = new URL(link);
      for (const value of url.searchParams.getAll("family")) {
        for (const part of value.split("|")) {
          const name = part.split(":")[0]?.replace(/\+/g, " ").trim();
          if (name) families.push(name);
        }
      }
    } catch {
      // Not a URL.
    }
  }
  return families;
}

/** Families on Google Fonts that sites often self-host, so no stylesheet link reveals them. */
const KNOWN_GOOGLE = new Set(
  [
    "Inter",
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Poppins",
    "Raleway",
    "Nunito",
    "Nunito Sans",
    "Work Sans",
    "DM Sans",
    "DM Serif Display",
    "Manrope",
    "Plus Jakarta Sans",
    "Space Grotesk",
    "Outfit",
    "Sora",
    "Rubik",
    "Karla",
    "Playfair Display",
    "Merriweather",
    "Lora",
    "Source Sans 3",
    "Source Serif 4",
    "IBM Plex Sans",
    "IBM Plex Serif",
    "Libre Baskerville",
    "Archivo",
    "Barlow",
    "Figtree",
    "Geist",
    "Instrument Sans",
    "Instrument Serif",
    "Bricolage Grotesque",
    "Fraunces",
    "Cormorant Garamond",
    "EB Garamond",
    "Josefin Sans",
    "Quicksand",
    "Mulish",
    "Urbanist",
    "Lexend",
    "Onest",
  ].map((f) => f.toLowerCase()),
);

export function pickFont(family: string | null, google: string[], fallback = "Inter") {
  const name = family?.trim();
  if (!name || SYSTEM_FONTS.has(name.toLowerCase())) return { family: fallback, google: true, weights: [400, 600, 700] };
  const isGoogle = google.some((g) => g.toLowerCase() === name.toLowerCase()) || KNOWN_GOOGLE.has(name.toLowerCase());
  // A font we cannot load (self-hosted, licensed) falls back to a close Google family in templates.
  return { family: name, google: isGoogle, weights: [400, 600, 700] };
}

const PAGE_HINTS: Array<[RegExp, number]> = [
  [/\b(about|about-us|our-story|company|who-we-are)\b/, 9],
  [/\b(pricing|plans|price)\b/, 9],
  [/\b(features?|product|platform|how-it-works|solutions?|why)\b/, 8],
  [/\b(use-cases?|customers?|case-stud(y|ies)|testimonials?|reviews?)\b/, 7],
  [/\b(services?|menu|shop|store|collections?|products)\b/, 7],
  [/\b(faq|help|getting-started|docs|guide|quickstart|start)\b/, 5],
];
const PAGE_SKIP = /\b(login|log-in|signin|sign-in|signup|sign-up|register|account|cart|checkout|privacy|terms|legal|cookie|careers?|jobs|press|status|wp-admin|feed|tag|category|author|search)\b|\.(pdf|jpg|jpeg|png|webp|gif|svg|zip|mp4|xml)$/i;

/** The pages most worth reading for a brand profile, from the homepage's links. */
export function choosePages(home: Pick<ReadPage, "url" | "links">, limit: number): string[] {
  const origin = new URL(home.url);
  const site = origin.hostname.replace(/^www\./, "");
  const scored = new Map<string, number>();
  for (const link of home.links) {
    let url: URL;
    try {
      url = new URL(link.href);
    } catch {
      continue;
    }
    if (url.hostname.replace(/^www\./, "") !== site || !/^https?:$/.test(url.protocol)) continue;
    url.hash = "";
    url.search = "";
    const path = url.pathname.toLowerCase();
    if (path === "/" || path === origin.pathname.toLowerCase() || PAGE_SKIP.test(path)) continue;
    // Deep paths are usually single articles or products; a section page says more about the brand.
    const depth = path.split("/").filter(Boolean).length;
    let score = (link.inNav ? 3 : 0) + (link.inFooter ? 1 : 0) - Math.max(0, depth - 2) * 2;
    const words = `${path} ${link.text.toLowerCase()}`;
    for (const [pattern, weight] of PAGE_HINTS) if (pattern.test(words)) score += weight;
    if (/\b(blog|news|articles?|posts?)\b/.test(path) && depth > 1) score -= 6;
    const key = url.href.replace(/\/$/, "");
    scored.set(key, Math.max(scored.get(key) ?? -Infinity, score));
  }
  return [...scored.entries()]
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([url]) => url);
}
