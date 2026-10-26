import type { BrandProfile, MediaFormat, Scene } from "@openpromo/shared";
import { MEDIA_FORMATS } from "@openpromo/shared";

/**
 * Scene layouts as HTML. Every scene fills its stage; sizes are in container units (cqmin, cqw,
 * cqh) so one layout works from a 1500×500 banner to a 1080×1920 story. Text is escaped here and
 * nowhere else. Elements with class "in" are what the video timeline animates in, in DOM order.
 */

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export type SceneContext = {
  brand: BrandProfile;
  format: MediaFormat;
  style: string;
  /** URL of an asset inside the render folder, or null when it is missing. */
  url: (assetId: string | null | undefined) => string | null;
  /** Video assets render as <video>; the rest as <img>. */
  isVideo: (assetId: string | null | undefined) => boolean;
  /** In video mode a background clip is its own timed element, outside the scene. */
  mode: "image" | "video";
};

export type Shape = "wide" | "tall" | "square";

export function shapeOf(format: MediaFormat): Shape {
  const { width, height } = MEDIA_FORMATS[format];
  const ratio = width / height;
  if (ratio >= 1.4) return "wide";
  if (ratio <= 0.7) return "tall";
  return "square";
}

/** Headline size class by length: short lines can be huge, long ones must not be. */
function sizeClass(text: string): string {
  const n = text.length;
  if (n <= 14) return "xl";
  if (n <= 32) return "lg";
  if (n <= 60) return "md";
  return "sm";
}

const textEl = (tag: string, cls: string, text: string, extra = "") => (text.trim() ? `<${tag} class="${cls} in"${extra}>${esc(text)}</${tag}>` : "");

function logo(ctx: SceneContext, cls = "logo"): string {
  const src = ctx.url(ctx.brand.visual.logoAssetId);
  return src ? `<img class="${cls}" src="${esc(src)}" alt="">` : `<span class="${cls} wordmark">${esc(ctx.brand.identity.name)}</span>`;
}

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function media(ctx: SceneContext, scene: Scene, cls: string): string {
  const ref = scene.media;
  const src = ctx.url(ref?.assetId);
  if (!ref || !src) return "";
  const focus = ref.focus ? ` style="--fx:${ref.focus.x * 100}%;--fy:${ref.focus.y * 100}%;--zoom:${ref.focus.zoom}"` : "";
  const fit = ref.fit === "contain" ? " contain" : "";
  if (ctx.isVideo(ref.assetId)) return `<div class="${cls} in${fit}"${focus}><video src="${esc(src)}" muted playsinline></video></div>`;
  return `<div class="${cls} in${fit}"${focus}><img src="${esc(src)}" alt=""></div>`;
}

const cta = (text: string) => (text.trim() ? `<div class="cta in"><span>${esc(text)}</span></div>` : "");

function bullets(items: string[]): string {
  if (!items.length) return "";
  return `<ul class="bullets">${items.map((b, i) => `<li class="in"><span class="mark">${i + 1}</span><span>${esc(b)}</span></li>`).join("")}</ul>`;
}

function footer(ctx: SceneContext): string {
  return `<div class="footer">${logo(ctx, "logo small")}<span class="domain">${esc(domainOf(ctx.brand.identity.url))}</span></div>`;
}

function body(ctx: SceneContext, scene: Scene): string {
  const t = scene.text;
  const headline = textEl("h1", `headline ${sizeClass(t.headline)}`, t.headline);
  const eyebrow = textEl("div", "eyebrow", t.eyebrow);
  const text = textEl("p", "body", t.body);
  switch (scene.layout) {
    case "statement":
      return `<div class="stack center grow">${eyebrow}${headline}${text}</div>${footer(ctx)}`;
    case "stat":
      return `<div class="stack center grow">${eyebrow}${textEl("div", "stat", t.stat)}${headline}${text}</div>${footer(ctx)}`;
    case "list":
      return `<div class="stack grow">${eyebrow}${headline}${bullets(t.bullets)}${cta(t.cta)}</div>${footer(ctx)}`;
    case "quote":
      return `<div class="stack center grow"><div class="quote-mark in">“</div>${textEl("blockquote", `headline quote ${sizeClass(t.headline)}`, t.headline)}${textEl("div", "attribution", t.attribution ? `— ${t.attribution}` : "")}</div>${footer(ctx)}`;
    case "screenshot":
      return `<div class="stack top">${eyebrow}${headline}</div><div class="device-wrap grow">${media(ctx, scene, "device")}</div>${footer(ctx)}`;
    case "product":
      return `<div class="product-grid grow"><div class="product-media">${media(ctx, scene, "product-img")}</div><div class="stack">${eyebrow}${headline}${text}${textEl("div", "price", t.stat)}${cta(t.cta)}</div></div>`;
    case "split":
      return `<div class="split grow">${media(ctx, scene, "split-media")}<div class="stack split-text">${eyebrow}${headline}${text}${bullets(t.bullets)}${cta(t.cta)}</div></div>`;
    case "offer": {
      // The badge holds a short figure ("20% off", "Free"); a long offer line is set as the headline.
      const short = t.stat.trim() && t.stat.length <= 16 ? t.stat : t.headline.length <= 16 ? t.headline : "";
      const rest = short === t.headline ? "" : headline;
      return `<div class="stack center grow">${eyebrow}${short ? `<div class="badge in">${esc(short)}</div>` : ""}${rest}${text}${cta(t.cta)}</div>${footer(ctx)}`;
    }
    case "full":
      // The picture is the scene (drawn as the backdrop); text, when there is any, is a short overlay.
      return `<div class="stack full-text grow">${eyebrow}${headline}${text}${cta(t.cta)}</div>`;
    case "cta":
      return `<div class="stack center grow"><div class="in">${logo(ctx, "logo big")}</div>${headline}${text}${cta(t.cta)}<div class="domain in">${esc(domainOf(ctx.brand.identity.url))}</div></div>`;
    case "hero":
    default:
      return `<div class="hero-grid grow"><div class="stack">${logo(ctx)}${eyebrow}${headline}${text}${cta(t.cta)}</div>${media(ctx, scene, "hero-media")}</div>`;
  }
}

/** What fills the frame behind the text: the main picture for full-frame scenes, else the background. */
export function backdropOf(scene: Scene): Scene["background"] {
  return scene.layout === "full" ? (scene.media ?? scene.background) : scene.background;
}

/** The look a scene gets: a photo backdrop wins; otherwise the creation's style. */
export function lookOf(ctx: SceneContext, scene: Scene): "photo" | "bold" | "clean" {
  if (ctx.url(backdropOf(scene)?.assetId)) return "photo";
  // Offers always shout; with the bold style every scene sits on the brand colour.
  if (ctx.style === "bold" || scene.layout === "offer") return "bold";
  return "clean";
}

/** One scene's markup. In video mode the backdrop is drawn by a separate clip, so it is left out. */
export function sceneHtml(ctx: SceneContext, scene: Scene, attrs = "", extraClass = ""): string {
  const look = lookOf(ctx, scene);
  const backdropRef = backdropOf(scene);
  const bgSrc = ctx.url(backdropRef?.assetId);
  const backdrop =
    look === "photo" && bgSrc && ctx.mode === "image"
      ? ctx.isVideo(backdropRef?.assetId)
        ? `<video class="backdrop" src="${esc(bgSrc)}" muted playsinline></video>`
        : `<img class="backdrop" src="${esc(bgSrc)}" alt="">`
      : "";
  const hasText = Boolean(scene.text.headline.trim() || scene.text.body.trim() || scene.text.eyebrow.trim() || scene.text.cta.trim());
  const scrim = look === "photo" && (scene.layout !== "full" || hasText) ? `<div class="scrim"></div>` : "";
  return `<section class="${extraClass ? `${extraClass} ` : ""}scene look-${look} layout-${scene.layout} shape-${shapeOf(ctx.format)}" data-scene="${esc(scene.id)}"${attrs}>${backdrop}${scrim}<div class="content">${body(ctx, scene)}</div></section>`;
}

export const SCENE_CSS = `
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: var(--w); height: var(--h); overflow: hidden; background: var(--bg); }
body { font-family: var(--font-body); color: var(--text); -webkit-font-smoothing: antialiased; text-rendering: geometricPrecision; }
#stage { position: relative; width: var(--w); height: var(--h); overflow: hidden; container-type: size; }

.scene { position: absolute; inset: 0; container-type: size; overflow: hidden; background: var(--bg); color: var(--text); --fit: 1; --s: 1; }
.scene.shape-tall { --s: 1.3; }
.scene.look-bold { background: var(--primary); color: var(--on-primary); }
.scene.look-photo { background: #111; color: #fff; }
.backdrop { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.scrim { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.35) 45%, rgba(0,0,0,.78) 100%); }
.shape-wide .scrim { background: linear-gradient(90deg, rgba(0,0,0,.8) 0%, rgba(0,0,0,.45) 55%, rgba(0,0,0,.1) 100%); }
.layout-full .scrim { background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,.55) 100%); }
.layout-full.shape-wide .scrim { background: linear-gradient(90deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 60%); }
.layout-full .full-text { justify-content: flex-end; padding-bottom: 4cqmin; text-shadow: 0 .04em .3em rgba(0,0,0,.45); }
.layout-full .full-text .headline { max-width: 18ch; }
.layout-full .headline.xl, .layout-full .headline.lg { font-size: calc(9.5cqmin * var(--fit) * var(--s)); }
/* Over moving footage a title is an overlay, not the subject: smaller than on a still poster. */
.clip.layout-full .headline.xl, .clip.layout-full .headline.lg { font-size: calc(6.5cqmin * var(--fit) * var(--s)); }
/* In tall videos the bottom half belongs to captions and the apps' buttons: titles go at the top. */
.clip.layout-full.shape-tall .full-text { justify-content: flex-start; padding-bottom: 0; }
.clip.layout-full.shape-tall .scrim { background: linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,0) 38%); }

.content { position: absolute; inset: 0; display: flex; flex-direction: column; padding: calc(7cqmin * var(--fit) * var(--s)); gap: calc(3cqmin * var(--fit) * var(--s)); }
.shape-tall .content { padding: 9cqw 8cqw 10cqh; }
.shape-wide .content { padding: 6cqh 6cqw; }
.grow { flex: 1 1 auto; min-height: 0; }

.stack { display: flex; flex-direction: column; gap: calc(2.6cqmin * var(--fit) * var(--s)); align-items: flex-start; justify-content: center; }
.stack.center { align-items: center; text-align: center; }
.stack.top { justify-content: flex-start; }

.eyebrow { font-family: var(--font-body); font-weight: 700; text-transform: uppercase; letter-spacing: .14em; font-size: calc(3.1cqmin * var(--fit) * var(--s)); color: var(--primary); }
.look-bold .eyebrow, .look-photo .eyebrow { color: inherit; opacity: .85; }

.headline { font-family: var(--font-heading); font-weight: 700; line-height: 1.04; letter-spacing: -0.02em; text-wrap: balance; padding-bottom: .06em; }
.headline.xl { font-size: calc(15cqmin * var(--fit) * var(--s)); }
.headline.lg { font-size: calc(11cqmin * var(--fit) * var(--s)); }
.headline.md { font-size: calc(8.4cqmin * var(--fit) * var(--s)); }
.headline.sm { font-size: calc(6.4cqmin * var(--fit) * var(--s)); line-height: 1.1; }
.shape-wide .headline.xl { font-size: calc(17cqh * var(--fit)); }
.shape-wide .headline.lg { font-size: calc(13cqh * var(--fit)); }
.shape-wide .headline.md { font-size: calc(10cqh * var(--fit)); }
.shape-wide .headline.sm { font-size: calc(8cqh * var(--fit)); }

.body { font-size: calc(4.3cqmin * var(--fit) * var(--s)); line-height: 1.38; max-width: 34em; opacity: .9; text-wrap: pretty; }
.shape-wide .body { font-size: calc(5.6cqh * var(--fit)); }

.stat { font-family: var(--font-heading); font-weight: 800; font-size: calc(30cqmin * var(--fit) * var(--s)); line-height: .95; letter-spacing: -0.04em; color: var(--primary); }
.look-bold .stat, .look-photo .stat { color: inherit; }
.price { font-family: var(--font-heading); font-weight: 800; font-size: calc(9cqmin * var(--fit) * var(--s)); color: var(--primary); }
.look-bold .price, .look-photo .price { color: inherit; }

.cta { display: inline-flex; }
.cta span { display: inline-block; background: var(--primary); color: var(--on-primary); font-weight: 700; font-size: calc(4.2cqmin * var(--fit) * var(--s)); padding: calc(2.4cqmin * var(--fit) * var(--s)) calc(5cqmin * var(--fit) * var(--s)); border-radius: max(var(--radius), 999px * var(--pill, 0)); }
.look-bold .cta span { background: var(--on-primary); color: var(--primary); }
.look-photo .cta span { background: #fff; color: #111; }
.shape-wide .cta span { font-size: calc(5.4cqh * var(--fit)); padding: 2.6cqh 4.6cqh; }

.bullets { list-style: none; display: flex; flex-direction: column; gap: calc(2.2cqmin * var(--fit) * var(--s)); width: 100%; }
.bullets li { display: flex; align-items: center; gap: calc(2.6cqmin * var(--fit) * var(--s)); font-size: calc(4.8cqmin * var(--fit) * var(--s)); font-weight: 600; line-height: 1.25; }
.bullets .mark { flex: none; display: grid; place-items: center; width: calc(7.4cqmin * var(--fit) * var(--s)); height: calc(7.4cqmin * var(--fit) * var(--s)); border-radius: 999px; background: var(--primary); color: var(--on-primary); font-size: calc(3.6cqmin * var(--fit) * var(--s)); font-weight: 800; }
.look-bold .bullets .mark { background: var(--on-primary); color: var(--primary); }

.quote-mark { font-family: var(--font-heading); font-size: calc(26cqmin * var(--fit) * var(--s)); line-height: .6; height: calc(11cqmin * var(--fit) * var(--s)); color: var(--primary); }
.look-bold .quote-mark, .look-photo .quote-mark { color: inherit; opacity: .7; }
.headline.quote { font-weight: 600; font-style: normal; }
.attribution { font-size: calc(3.8cqmin * var(--fit) * var(--s)); font-weight: 600; opacity: .8; }

.badge { font-family: var(--font-heading); font-weight: 800; font-size: calc(17cqmin * var(--fit) * var(--s)); line-height: 1; padding: calc(4cqmin * var(--fit) * var(--s)) calc(7cqmin * var(--fit) * var(--s)); border-radius: calc(var(--radius) * 2); background: var(--on-primary); color: var(--primary); transform: rotate(-3deg); }
.look-clean .badge { background: var(--primary); color: var(--on-primary); }

.logo { display: block; height: calc(7cqmin * var(--fit) * var(--s)); width: auto; max-width: 45cqw; object-fit: contain; object-position: left center; }
.logo.small { height: calc(4.6cqmin); max-width: 30cqw; }
.logo.big { height: calc(16cqmin * var(--fit) * var(--s)); max-width: 60cqw; object-position: center; }
.logo.wordmark { font-family: var(--font-heading); font-weight: 800; font-size: calc(5cqmin * var(--fit) * var(--s)); height: auto; line-height: 1.1; white-space: nowrap; letter-spacing: -0.02em; max-width: none; }
.logo.small.wordmark { font-size: 3.6cqmin; }
.logo.big.wordmark { font-size: calc(11cqmin * var(--fit) * var(--s)); white-space: normal; text-align: center; }
.look-bold img.logo, .look-photo img.logo { filter: brightness(0) invert(1); }

.footer { display: flex; align-items: center; justify-content: space-between; gap: 2cqmin; flex: none; opacity: .9; }
.domain { font-size: calc(3.2cqmin); font-weight: 600; opacity: .75; letter-spacing: .01em; }

.hero-grid { display: grid; grid-template-rows: auto minmax(0, 1fr); grid-template-columns: minmax(0, 1fr); gap: 5cqmin; align-items: center; }
.shape-wide .hero-grid, .shape-square .hero-grid:has(.hero-media) { grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); }
.hero-grid:not(:has(.hero-media)) { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); }
.hero-media, .product-img, .split-media { position: relative; width: 100%; height: 100%; min-height: 0; border-radius: calc(var(--radius) * 1.5); overflow: hidden; }
.hero-media img, .hero-media video, .product-img img, .product-img video, .split-media img, .split-media video { width: 100%; height: 100%; object-fit: cover; object-position: var(--fx, 50%) var(--fy, 50%); transform: scale(var(--zoom, 1)); transform-origin: var(--fx, 50%) var(--fy, 50%); }
.contain img, .contain video { object-fit: contain; }

.product-grid { display: grid; grid-template-rows: minmax(0, 1.2fr) auto; grid-template-columns: minmax(0, 1fr); gap: 5cqmin; align-items: center; }
.shape-wide .product-grid, .shape-square .product-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); }
.product-media { position: relative; width: 100%; max-height: 100%; aspect-ratio: 1; justify-self: center; align-self: center; min-height: 0; background: var(--tint); border-radius: calc(var(--radius) * 2); }
.shape-tall .product-media { width: 100%; height: auto; }
.product-media .product-img { position: absolute; inset: 5cqmin; width: auto; height: auto; }
.look-bold .product-media { background: color-mix(in srgb, var(--on-primary) 16%, transparent); }
.product-img { border-radius: var(--radius); }
.product-img img { object-fit: contain; }

.split { display: grid; grid-template-rows: minmax(0, 1fr) auto; grid-template-columns: minmax(0, 1fr); gap: 5cqmin; }
.shape-wide .split, .shape-square .split { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); align-items: center; }
.split-media { align-self: stretch; }

.device-wrap { position: relative; min-height: 0; }
.device { position: absolute; inset: 0; display: grid; place-items: center; }
.device img, .device video { display: block; max-width: 100%; max-height: 100%; min-height: 0; object-fit: contain; border-radius: calc(var(--radius) * 1.2); background: #fff; box-shadow: 0 3cqmin 8cqmin rgba(0,0,0,.22); border: 1cqmin solid #1d1d1f; border-top-width: 3cqmin; }

/* Captions (video): a chunk at a time, the spoken word highlighted. */
/* Video scenes make room for captions (and, on 9:16, for the platforms' own buttons and text). */
.ui-room.shape-tall .content { padding-top: 15cqh; padding-bottom: 35cqh; }
.cap-room-lower.shape-tall .content { padding-top: 15cqh; padding-bottom: 50cqh; }
.cap-room-upper.shape-tall .content { padding-top: 30cqh; padding-bottom: 35cqh; }
.cap-room-lower.shape-wide .content, .cap-room-lower.shape-square .content { padding-bottom: 25cqh; }
.cap-room-upper.shape-wide .content, .cap-room-upper.shape-square .content { padding-top: 25cqh; }
`;
