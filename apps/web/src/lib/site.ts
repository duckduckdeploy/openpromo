function env(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return (trimmed ? trimmed : fallback).replace(/\/+$/, '');
}

export const SITE_URL = env(process.env.NEXT_PUBLIC_SITE_URL, 'https://openpromo.gg');
export const APP_URL = env(process.env.NEXT_PUBLIC_APP_URL, 'http://localhost:3200');

/** The public repository. A fork can point its site at its own with NEXT_PUBLIC_GITHUB_URL. */
export const GITHUB_URL: string =
  process.env.NEXT_PUBLIC_GITHUB_URL?.trim().replace(/\/+$/, '') || 'https://github.com/duckduckdeploy/openpromo';

/** The public API address. Agents connect to `${PUBLIC_API_URL}/mcp`. */
export const PUBLIC_API_URL = env(process.env.NEXT_PUBLIC_API_URL, 'http://localhost:4100');
export const MCP_URL = `${PUBLIC_API_URL}/mcp`;

export const SIGN_UP_URL = `${APP_URL}/sign-up`;
export const SIGN_IN_URL = `${APP_URL}/sign-in`;
export const YEPAPI_URL = 'https://yepapi.com?ref=openpromo';

export const SITE_NAME = 'OpenPromo';
/** Homepage title tag: keyword first. */
export const SITE_TITLE = 'OpenPromo: Open-Source AI Marketing Tool';
export const SITE_DESCRIPTION =
  'Open-source AI marketing tool: turn your website into on-brand posts, carousels, banners, reels and promo videos. Self-host with Docker. MIT licensed.';

export const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/templates', label: 'Templates' },
  { href: '/compare', label: 'Compare' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/docs', label: 'Docs' },
] as const;

/** A name inside a sentence: "Brand kit generator" becomes "brand kit generator"; "AI" keeps its capitals. */
export const inSentence = (name: string) => name.replace(/^[A-Z](?=[a-z])/, (letter) => letter.toLowerCase());
