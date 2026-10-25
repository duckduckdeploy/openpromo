import { readableOn, type CaptionPreset, type CaptionStyle, type MediaFormat } from "@openpromo/shared";
import type { CaptionCue } from "./document";
import { esc, shapeOf } from "./layouts";
import { ensureContrast } from "./theme";

/**
 * Caption presets: the looks short-form apps made familiar, as CSS plus GSAP timeline steps.
 * Grouping and timing ideas follow the Hyperframes caption components (Apache-2.0, heygen-com/hyperframes).
 * Only transforms, opacity and colour are animated; Hyperframes shows and hides each cue as a clip.
 */

export type CaptionColors = { active: string; keyword: string; box: string; onBox: string };

type Recipe = {
  /** Most words and characters on screen at once, and the most lines they may wrap to. */
  maxWords: number;
  maxChars: number;
  maxLines: number;
  /** A Google font the look needs, loaded next to the brand fonts. */
  font?: { family: string; weights: number[] };
  css: string;
  colors: (accent: string | null, primary: string) => CaptionColors;
  /** Timeline steps for one cue. `t` is in seconds, `dy` a small offset in px. */
  steps: (cue: CaptionCue, ids: { page: string; word: (j: number) => string }, c: CaptionColors, ctx: { index: number; dy: number }) => string[];
};

const s = (ms: number) => (ms / 1000).toFixed(3);
const q = JSON.stringify;

/** Shared by every look: placement inside the platform safe area (see the captions research notes). */
const BASE_CSS = `
.caption { position: absolute; z-index: 50; display: flex; justify-content: center; align-items: center; pointer-events: none; --cap-scale: .8; }
.caption.shape-tall { left: 12cqw; right: 12cqw; --cap-scale: 1; }
.caption.shape-tall.pos-lower { top: 51cqh; bottom: 36cqh; }
.caption.shape-tall.pos-upper { top: 15cqh; bottom: 72cqh; }
.caption.shape-wide, .caption.shape-square { left: 8cqw; right: 8cqw; }
.caption.shape-wide.pos-lower, .caption.shape-square.pos-lower { bottom: 5cqh; height: 19cqh; }
.caption.shape-wide.pos-upper, .caption.shape-square.pos-upper { top: 5cqh; height: 19cqh; }
.cap { max-width: 100%; text-align: center; text-wrap: balance; font-size: calc(var(--cap-size) * var(--cap-scale) * var(--cfit, 1)); line-height: 1.08; will-change: transform, opacity; }
.cap .w { display: inline-block; position: relative; white-space: nowrap; }
`;

export const CAPTION_RECIPES: Record<CaptionPreset, Recipe> = {
  "bold-pop": {
    maxWords: 3,
    maxChars: 18,
    maxLines: 2,
    font: { family: "Montserrat", weights: [800, 900] },
    css: `.cap-bold-pop .cap { --cap-size: 8.4cqmin; font-family: "Montserrat", var(--font-heading); font-weight: 900; text-transform: uppercase; letter-spacing: -.01em; color: #fff; -webkit-text-stroke: .12em #000; paint-order: stroke fill; word-spacing: .08em; }
.cap-bold-pop .w { margin: 0 .04em; transform-origin: 50% 60%; text-shadow: 0 .09em 0 rgba(0,0,0,.85); }
.cap-bold-pop .w.kw { color: var(--cap-kw); }`,
    colors: (accent) => ({ active: accent ?? "#ffe500", keyword: accent ?? "#3ce65a", box: "#000000", onBox: "#ffffff" }),
    steps: (cue, ids, c, { dy }) => [
      `tl.fromTo(${q(ids.page)}, { scale: 0.8, opacity: 0, y: ${dy} }, { scale: 1, opacity: 1, y: 0, duration: 0.12, ease: "back.out(2)" }, ${s(cue.startMs)});`,
      ...cue.words.flatMap((w, j) => {
        const rest = w.kw ? c.keyword : "#ffffff";
        // Long words pop less, so they do not grow into their neighbours.
        const pop = Math.max(1.04, Math.min(1.14, 1 + 0.5 / Math.max(1, w.text.length))).toFixed(2);
        return [
          `tl.fromTo(${q(ids.word(j))}, { scale: 1, color: ${q(rest)} }, { scale: ${pop}, color: ${q(c.active)}, duration: 0.08, ease: "power2.out", immediateRender: false }, ${s(w.startMs)});`,
          `tl.fromTo(${q(ids.word(j))}, { scale: ${pop}, color: ${q(c.active)} }, { scale: 1, color: ${q(rest)}, duration: 0.1, immediateRender: false }, ${s(Math.max(w.startMs + 90, w.endMs))});`,
        ];
      }),
    ],
  },

  "box-highlight": {
    maxWords: 4,
    maxChars: 22,
    maxLines: 2,
    font: { family: "Montserrat", weights: [800, 900] },
    css: `.cap-box-highlight .cap { --cap-size: 7.2cqmin; font-family: "Montserrat", var(--font-heading); font-weight: 800; text-transform: uppercase; color: #fff; line-height: 1.18; -webkit-text-stroke: .09em rgba(0,0,0,.85); paint-order: stroke fill; }
.cap-box-highlight .w { margin: 0 -.08em; padding: .04em .16em .08em; isolation: isolate; text-shadow: 0 .06em .22em rgba(0,0,0,.6), 0 0 .06em rgba(0,0,0,.7); }
.cap-box-highlight .w.kw { color: var(--cap-kw); }
.cap-box-highlight .bg { position: absolute; inset: 0; z-index: -1; border-radius: .16em; background: var(--cap-box); opacity: 0; box-shadow: 0 .06em .2em rgba(0,0,0,.35); }`,
    colors: (accent, primary) => {
      const box = accent ?? primary;
      return { active: readableOn(box), keyword: "#ffe500", box, onBox: readableOn(box) };
    },
    steps: (cue, ids, c, { dy }) => [
      `tl.fromTo(${q(ids.page)}, { opacity: 0, y: ${dy} }, { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" }, ${s(cue.startMs)});`,
      ...cue.words.flatMap((w, j) => {
        const rest = w.kw ? c.keyword : "#ffffff";
        const off = s(Math.max(w.startMs + 90, w.endMs));
        return [
          `tl.fromTo(${q(`${ids.word(j)} .bg`)}, { opacity: 0, scaleX: 0.6 }, { opacity: 1, scaleX: 1, duration: 0.12, ease: "power2.out", immediateRender: false }, ${s(w.startMs)});`,
          `tl.fromTo(${q(ids.word(j))}, { color: ${q(rest)} }, { color: ${q(c.onBox)}, duration: 0.08, immediateRender: false }, ${s(w.startMs)});`,
          `tl.fromTo(${q(`${ids.word(j)} .bg`)}, { opacity: 1, scaleX: 1 }, { opacity: 0, scaleX: 1.02, duration: 0.08, immediateRender: false }, ${off});`,
          `tl.fromTo(${q(ids.word(j))}, { color: ${q(c.onBox)} }, { color: ${q(rest)}, duration: 0.08, immediateRender: false }, ${off});`,
        ];
      }),
    ],
  },

  "karaoke-pill": {
    maxWords: 4,
    maxChars: 26,
    maxLines: 2,
    font: { family: "Poppins", weights: [600, 700] },
    css: `.cap-karaoke-pill .cap { --cap-size: 6cqmin; font-family: "Poppins", var(--font-body); font-weight: 700; color: #a3a3a3; background: #ecebec; padding: .3em .7em .36em; border-radius: .55em; box-shadow: 0 .12em .45em rgba(0,0,0,.22); line-height: 1.2; }
.cap-karaoke-pill .w { margin: 0 .02em; }`,
    colors: (accent, primary) => ({ active: "#1c1e1d", keyword: ensureContrast(accent ?? primary, "#ecebec", 4.5), box: "#ecebec", onBox: "#1c1e1d" }),
    steps: (cue, ids, c) => pillSteps(cue, ids, c, "#a3a3a3"),
  },

  "karaoke-pill-dark": {
    maxWords: 4,
    maxChars: 26,
    maxLines: 2,
    font: { family: "Poppins", weights: [600, 700] },
    css: `.cap-karaoke-pill-dark .cap { --cap-size: 6cqmin; font-family: "Poppins", var(--font-body); font-weight: 700; color: rgba(255,255,255,.45); background: rgba(12,12,14,.82); padding: .3em .7em .36em; border-radius: .55em; box-shadow: 0 .12em .45em rgba(0,0,0,.3); line-height: 1.2; }
.cap-karaoke-pill-dark .w { margin: 0 .02em; }`,
    colors: (accent, primary) => ({ active: "#ffffff", keyword: ensureContrast(accent ?? primary, "#121214", 4.5), box: "#121214", onBox: "#ffffff" }),
    steps: (cue, ids, c) => pillSteps(cue, ids, c, "rgba(255,255,255,0.45)"),
  },

  "word-slam": {
    maxWords: 1,
    maxChars: 14,
    maxLines: 1,
    font: { family: "Anton", weights: [400] },
    css: `.cap-word-slam .cap { --cap-size: 14cqmin; font-family: "Anton", Impact, var(--font-heading); font-weight: 400; text-transform: uppercase; letter-spacing: .01em; color: #fff; -webkit-text-stroke: .06em #000; paint-order: stroke fill; line-height: 1.05; }
.cap-word-slam .w { text-shadow: 0 .06em 0 #000; }
.cap-word-slam .w.kw { color: var(--cap-kw); }`,
    colors: (accent) => ({ active: "#ffffff", keyword: accent ?? "#ffd23f", box: "#000000", onBox: "#ffffff" }),
    steps: (cue, ids, _c, { index, dy }) => {
      const from = [`{ y: ${-dy * 4}, rotation: -3, opacity: 0 }`, `{ x: ${-dy * 9}, rotation: 2, opacity: 0 }`, `{ x: ${dy * 9}, rotation: -2, opacity: 0 }`, `{ scale: 0.4, rotation: 3, opacity: 0 }`][index % 4];
      const to = [`{ y: 0, rotation: -3, opacity: 1`, `{ x: 0, rotation: 2, opacity: 1`, `{ x: 0, rotation: -2, opacity: 1`, `{ scale: 1, rotation: 3, opacity: 1`][index % 4];
      const ease = index % 4 === 1 || index % 4 === 2 ? "expo.out" : "back.out(1.8)";
      return [`tl.fromTo(${q(ids.page)}, ${from}, ${to}, duration: 0.2, ease: "${ease}" }, ${s(cue.startMs)});`];
    },
  },

  minimal: {
    maxWords: 7,
    maxChars: 40,
    maxLines: 2,
    css: `.cap-minimal .cap { --cap-size: 5.4cqmin; font-family: var(--font-body); font-weight: 600; color: #fff; line-height: 1.22; background: rgba(0,0,0,.42); padding: .22em .6em .28em; border-radius: .4em; }
.cap-minimal .w { margin: 0 .02em; opacity: .62; text-shadow: 0 .04em .2em rgba(0,0,0,.5); }
.cap-minimal .w.kw { color: var(--cap-kw); }`,
    colors: (accent) => ({ active: "#ffffff", keyword: accent ?? "#ffd84d", box: "#000000", onBox: "#ffffff" }),
    steps: (cue, ids, _c, { dy }) => [
      `tl.fromTo(${q(ids.page)}, { opacity: 0, y: ${Math.round(dy * 0.6)} }, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }, ${s(cue.startMs)});`,
      ...cue.words.map((w, j) => `tl.fromTo(${q(ids.word(j))}, { opacity: 0.62 }, { opacity: 1, duration: 0.12, immediateRender: false }, ${s(w.startMs)});`),
    ],
  },

  "word-reveal": {
    maxWords: 6,
    maxChars: 32,
    maxLines: 2,
    css: `.cap-word-reveal .cap { --cap-size: 6.2cqmin; font-family: var(--font-body); font-weight: 700; color: #fff; line-height: 1.18; background: rgba(0,0,0,.45); padding: .2em .55em .26em; border-radius: .4em; }
.cap-word-reveal .w { margin: 0 .02em; opacity: 0; text-shadow: 0 .04em .2em rgba(0,0,0,.5); }
.cap-word-reveal .w.kw { color: var(--cap-kw); }`,
    colors: (accent) => ({ active: "#ffffff", keyword: accent ?? "#ffd84d", box: "#000000", onBox: "#ffffff" }),
    steps: (cue, ids, _c, { dy }) =>
      cue.words.map((w, j) => `tl.fromTo(${q(ids.word(j))}, { opacity: 0, y: ${Math.round(dy * 0.5)} }, { opacity: 1, y: 0, duration: 0.1, ease: "power2.out", immediateRender: false }, ${s(w.startMs)});`),
  },
};

function pillSteps(cue: CaptionCue, ids: { page: string; word: (j: number) => string }, c: CaptionColors, inactive: string): string[] {
  return [
    `tl.fromTo(${q(ids.page)}, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.15, ease: "power2.out" }, ${s(cue.startMs)});`,
    // Spoken words stay lit: the line fills in as it is read.
    ...cue.words.map(
      (w, j) => `tl.fromTo(${q(ids.word(j))}, { color: ${q(inactive)} }, { color: ${q(w.kw ? c.keyword : c.active)}, duration: 0.1, immediateRender: false }, ${s(Math.max(cue.startMs, w.startMs - 50))});`,
    ),
  ];
}

/** The preset a spec asks for; old specs with `captions: "line"` get the calm one. */
export function captionPreset(captions: string, style: CaptionStyle | undefined): CaptionPreset {
  if (captions === "line") return "minimal";
  return style?.preset && style.preset in CAPTION_RECIPES ? style.preset : "bold-pop";
}

/** Grouping limits for captionCues. */
export function captionLimits(preset: CaptionPreset) {
  const r = CAPTION_RECIPES[preset];
  return { maxWords: r.maxWords, maxChars: r.maxChars };
}

/** The look's CSS, its colours as variables, and the timeline steps for every cue. */
export function captionLayer(input: { cues: CaptionCue[]; preset: CaptionPreset; style: CaptionStyle | undefined; format: MediaFormat; primary: string; width: number; height: number; track: number }) {
  const recipe = CAPTION_RECIPES[input.preset];
  const colors = recipe.colors(input.style?.accent ?? null, input.primary);
  const position = input.style?.position ?? "lower";
  const dy = Math.round(Math.min(input.width, input.height) * 0.03);
  const clips: string[] = [];
  const steps: string[] = [];
  input.cues.forEach((cue, i) => {
    const words = cue.words
      .map((w, j) => `<span class="w${w.kw ? " kw" : ""}" id="c${i}w${j}">${input.preset === "box-highlight" ? '<span class="bg"></span>' : ""}${esc(w.text)}</span>`)
      // Real spaces between words: margins alone collapse under thick outlines.
      .join(" ");
    clips.push(
      `<div id="cap-${i}" class="clip caption cap-${input.preset} shape-${shapeOf(input.format)} pos-${position}" data-start="${s(cue.startMs)}" data-duration="${s(Math.max(80, cue.endMs - cue.startMs))}" data-track-index="${input.track}" data-timeline-role="captions" data-caption-root="true" data-max-lines="${recipe.maxLines}"><div class="cap">${words}</div></div>`,
    );
    steps.push(...recipe.steps(cue, { page: `#cap-${i} .cap`, word: (j) => `#c${i}w${j}` }, colors, { index: i, dy }));
  });
  const css = `${BASE_CSS}${recipe.css}\n.caption { --cap-kw: ${colors.keyword}; --cap-box: ${colors.box}; }`;
  return { clips, steps, css, font: recipe.font };
}
