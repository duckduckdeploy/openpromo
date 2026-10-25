/**
 * Runs inside the website's page (page.evaluate) and reads what the brand profile needs: readable
 * text, links, metadata, JSON-LD, colours in use, fonts, logo candidates and social links.
 *
 * A string rather than a function: the TypeScript loader can add helper calls to compiled
 * functions that do not exist inside the page.
 */
export const READ_PAGE_SCRIPT = String.raw`(() => {
  const clean = (s) => (s || "").replace(/\s+/g, " ").trim();
  const abs = (u) => { try { return new URL(u, location.href).href; } catch { return null; } };

  // Readable text as light markdown: headings, paragraphs, list items, quotes, buttons.
  const root = document.querySelector("main") || document.body;
  const skip = "script,style,noscript,svg,iframe,template,[aria-hidden=true],nav,footer,form";
  const lines = [];
  const seen = new Set();
  root.querySelectorAll("h1,h2,h3,h4,p,li,blockquote,figcaption,td,dt,dd,a.button,a[class*=btn],button").forEach((el) => {
    if (el.closest(skip)) return;
    if (el.offsetParent === null && getComputedStyle(el).position !== "fixed") return;
    const text = clean(el.innerText);
    if (!text || text.length < 2 || seen.has(text)) return;
    // A list item or cell that wraps a paragraph would repeat it.
    if ((el.tagName === "LI" || el.tagName === "TD") && el.querySelector("p,h2,h3,h4")) return;
    seen.add(text);
    const tag = el.tagName;
    if (tag === "H1") lines.push("# " + text);
    else if (tag === "H2") lines.push("## " + text);
    else if (tag === "H3" || tag === "H4") lines.push("### " + text);
    else if (tag === "LI") lines.push("- " + text);
    else if (tag === "BLOCKQUOTE") lines.push("> " + text);
    else if (tag === "BUTTON" || tag === "A") lines.push("[button] " + text);
    else lines.push(text);
  });
  const markdown = lines.join("\n").slice(0, 40000);

  const links = [];
  document.querySelectorAll("a[href]").forEach((a) => {
    const href = abs(a.getAttribute("href"));
    if (!href) return;
    links.push({ href, text: clean(a.innerText || a.getAttribute("aria-label") || a.title).slice(0, 80), inNav: !!a.closest("nav,header"), inFooter: !!a.closest("footer") });
  });

  const meta = (sel) => document.querySelector(sel)?.getAttribute("content") || null;
  const metadata = {
    title: document.title,
    description: meta('meta[name="description"]') || meta('meta[property="og:description"]'),
    siteName: meta('meta[property="og:site_name"]'),
    ogImage: abs(meta('meta[property="og:image"]') || ""),
    themeColor: meta('meta[name="theme-color"]'),
    lang: document.documentElement.lang || null,
  };

  const jsonLd = [];
  document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
    try { jsonLd.push(JSON.parse(s.textContent || "")); } catch {}
  });

  // Colours: weighted by painted area, separately for backgrounds, text and buttons.
  const toHex = (c) => {
    const m = c && c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
    if (!m) return null;
    if (m[4] !== undefined && Number(m[4]) < 0.5) return null;
    return "#" + [m[1], m[2], m[3]].map((n) => Number(n).toString(16).padStart(2, "0")).join("");
  };
  const tally = (map, hex, weight) => { if (hex) map[hex] = (map[hex] || 0) + weight; };
  const backgrounds = {}, texts = {}, buttons = {}, buttonText = {}, links2 = {};
  const viewportArea = innerWidth * innerHeight;
  document.querySelectorAll("body,body *").forEach((el) => {
    if (el.closest("script,style,noscript")) return;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2 || r.top > innerHeight * 3) return;
    const cs = getComputedStyle(el);
    const area = Math.min(r.width * r.height, viewportArea);
    tally(backgrounds, toHex(cs.backgroundColor), area);
    const isButton = el.matches("button,[role=button],a[class*=btn],a[class*=button],input[type=submit]");
    if (isButton) { tally(buttons, toHex(cs.backgroundColor), area + 5000); tally(buttonText, toHex(cs.color), 1); }
    if (el.tagName === "A" && !isButton) tally(links2, toHex(cs.color), 1);
    if (el.childNodes.length && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) tally(texts, toHex(cs.color), Math.min(area, 20000));
  });
  const top = (map, n) => Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, n).map(([hex, weight]) => ({ hex, weight }));

  const family = (el) => el ? clean(getComputedStyle(el).fontFamily.split(",")[0].replace(/["']/g, "")) : null;
  const heading = document.querySelector("h1") || document.querySelector("h2");
  const fontLinks = [...document.querySelectorAll('link[href*="fonts.googleapis.com"]')].map((l) => l.href);
  const button = document.querySelector("button,a[class*=btn],a[class*=button]");

  // Logo candidates, best first: things in the header that say "logo", then the home link's image.
  const logos = [];
  const addLogo = (el, score) => {
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.width < 12 || r.height < 8) return;
    if (el.tagName === "IMG") logos.push({ type: "img", src: abs(el.currentSrc || el.src), width: r.width, height: r.height, score });
    else if (el.tagName.toLowerCase() === "svg") logos.push({ type: "svg", markup: el.outerHTML.slice(0, 200000), color: getComputedStyle(el).color, width: r.width, height: r.height, score });
  };
  document.querySelectorAll("header img, header svg, nav img, nav svg, [class*=logo] img, [class*=logo] svg, img[alt*=logo i], img[src*=logo i], a[href='/'] img, a[href='/'] svg").forEach((el) => {
    const hint = ((el.getAttribute("alt") || "") + " " + (el.getAttribute("src") || "") + " " + (el.closest("[class*=logo]") ? "logo" : "") + " " + (el.getAttribute("class") || "")).toLowerCase();
    const r = el.getBoundingClientRect();
    let score = 0;
    if (hint.includes("logo")) score += 5;
    if (el.closest("header,nav")) score += 3;
    if (el.closest("a[href='/'],a[href='" + location.origin + "/']")) score += 3;
    if (r.top < 200) score += 2;
    if (r.left < innerWidth / 2) score += 1;
    if (r.width > 400 || r.height > 160) score -= 4;
    addLogo(el, score);
  });
  logos.sort((a, b) => b.score - a.score);
  const icons = [...document.querySelectorAll('link[rel~="icon"],link[rel="apple-touch-icon"]')].map((l) => ({ href: abs(l.getAttribute("href")), sizes: l.getAttribute("sizes") || "", rel: l.rel }));

  const socials = {};
  const socialHosts = { "instagram.com": "instagram", "tiktok.com": "tiktok", "youtube.com": "youtube", "linkedin.com": "linkedin", "facebook.com": "facebook", "x.com": "x", "twitter.com": "x", "pinterest.com": "pinterest", "threads.net": "threads" };
  links.forEach((l) => {
    try {
      const host = new URL(l.href).hostname.replace(/^www\./, "");
      const name = socialHosts[host];
      if (name && !socials[name] && new URL(l.href).pathname.length > 1) socials[name] = l.href;
    } catch {}
  });

  const images = [...document.images]
    .filter((img) => img.naturalWidth >= 400 && img.naturalHeight >= 300 && !img.closest("header,nav,footer"))
    .map((img) => ({ src: abs(img.currentSrc || img.src), alt: clean(img.alt).slice(0, 160), width: img.naturalWidth, height: img.naturalHeight }))
    .slice(0, 20);

  return {
    url: location.href,
    markdown,
    links: links.slice(0, 400),
    metadata,
    jsonLd,
    colors: { backgrounds: top(backgrounds, 8), texts: top(texts, 6), buttons: top(buttons, 6), buttonText: top(buttonText, 3), links: top(links2, 4) },
    fonts: { heading: family(heading), body: family(document.body), button: family(button), googleLinks: fontLinks },
    radius: button ? parseFloat(getComputedStyle(button).borderRadius) || 0 : null,
    logos: logos.slice(0, 5),
    icons,
    socials,
    images,
  };
})()`;

export type ReadPage = {
  url: string;
  markdown: string;
  links: Array<{ href: string; text: string; inNav: boolean; inFooter: boolean }>;
  metadata: { title: string; description: string | null; siteName: string | null; ogImage: string | null; themeColor: string | null; lang: string | null };
  jsonLd: unknown[];
  colors: Record<"backgrounds" | "texts" | "buttons" | "buttonText" | "links", Array<{ hex: string; weight: number }>>;
  fonts: { heading: string | null; body: string | null; button: string | null; googleLinks: string[] };
  radius: number | null;
  logos: Array<{ type: "img"; src: string | null; width: number; height: number; score: number } | { type: "svg"; markup: string; color: string; width: number; height: number; score: number }>;
  icons: Array<{ href: string | null; sizes: string; rel: string }>;
  socials: Record<string, string>;
  images: Array<{ src: string | null; alt: string; width: number; height: number }>;
};
