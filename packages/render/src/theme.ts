import { contrast, mix, readableOn, type BrandProfile } from "@openpromo/shared";

/**
 * The brand as CSS: colour roles, fonts and corner radius. Colours are adjusted where a pairing
 * would be hard to read, so a template never puts low-contrast text on screen.
 */

export type ThemeColors = {
  bg: string;
  text: string;
  muted: string;
  primary: string;
  onPrimary: string;
  accent: string;
  /** A soft tint of the primary colour for panels and chips. */
  tint: string;
  onTint: string;
};

/** A version of `color` that reaches `ratio` against `background`, moving toward black or white. */
export function ensureContrast(color: string, background: string, ratio: number): string {
  if (contrast(color, background) >= ratio) return color;
  const target = readableOn(background);
  for (let step = 0.1; step <= 1; step += 0.1) {
    const candidate = mix(color, target, step);
    if (contrast(candidate, background) >= ratio) return candidate;
  }
  return target;
}

export function themeColors(brand: BrandProfile, overrides: Record<string, string> = {}): ThemeColors {
  const c = brand.visual.colors;
  const bg = overrides.bg ?? c.background;
  const primary = overrides.primary ?? c.primary;
  const tint = mix(primary, bg, 0.88);
  return {
    bg,
    text: ensureContrast(overrides.text ?? c.text, bg, 7),
    muted: ensureContrast(c.muted, bg, 4.5),
    primary,
    onPrimary: ensureContrast(overrides.onPrimary ?? c.onPrimary, primary, 4.5),
    accent: overrides.accent ?? c.accent,
    tint,
    onTint: ensureContrast(primary, tint, 4.5),
  };
}

/** Fallbacks for a family the renderer cannot load, by the feel of the original. */
const SERIF = /serif|garamond|playfair|fraunces|lora|merriweather|baskerville|cormorant|georgia|times/i;

function fontStack(family: string): string {
  const safe = family.replace(/["\\<>]/g, "");
  return SERIF.test(safe) && !/sans/i.test(safe) ? `"${safe}", "Fraunces", Georgia, serif` : `"${safe}", "Inter", system-ui, sans-serif`;
}

/** Google Fonts stylesheet for the brand's families (and the fallbacks), or null when none load from Google. */
export function googleFontsHref(brand: BrandProfile, extra: Array<{ family: string; weights: number[] }> = []): string {
  const families = new Map<string, number[]>();
  for (const font of extra) families.set(font.family, [...new Set([...(families.get(font.family) ?? []), ...font.weights])].sort((a, b) => a - b));
  for (const font of [brand.visual.fonts.heading, brand.visual.fonts.body]) {
    if (!font.google) continue;
    const weights = new Set([...(families.get(font.family) ?? []), ...font.weights, 400, 700]);
    families.set(font.family, [...weights].sort((a, b) => a - b));
  }
  families.set("Inter", [400, 600, 700, 800]);
  const query = [...families.entries()]
    .map(([family, weights]) => `family=${encodeURIComponent(family).replace(/%20/g, "+")}:wght@${weights.join(";")}`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${query}&display=block`;
}

export function themeCss(brand: BrandProfile, overrides: Record<string, string> = {}): string {
  const t = themeColors(brand, overrides);
  return `:root {
  --bg: ${t.bg}; --text: ${t.text}; --muted: ${t.muted};
  --primary: ${t.primary}; --on-primary: ${t.onPrimary}; --accent: ${t.accent};
  --tint: ${t.tint}; --on-tint: ${t.onTint};
  --font-heading: ${fontStack(brand.visual.fonts.heading.family)};
  --font-body: ${fontStack(brand.visual.fonts.body.family)};
  --radius: ${Math.min(brand.visual.radius, 40)}px;
}`;
}
