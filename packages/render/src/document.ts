import { MEDIA_FORMATS, type BrandProfile, type CreationSpec, type MediaFormat } from "@openpromo/shared";
import { esc, lookOf, SCENE_CSS, sceneHtml, type SceneContext } from "./layouts";
import { googleFontsHref, themeCss } from "./theme";

/**
 * Whole HTML documents for the renderer: one scene as a still image, or every scene as a
 * Hyperframes video composition (timed clips, a paused GSAP timeline, audio and captions).
 */

export type RenderAssets = {
  /** Asset id to its file name inside the render folder ("assets/<id>.webp"). */
  files: Record<string, { path: string; video: boolean }>;
};

export type DocumentInput = {
  brand: BrandProfile;
  spec: CreationSpec;
  format: MediaFormat;
  assets: RenderAssets;
  /** Leave out the Google Fonts link (offline installs): the system fallbacks are used. */
  offlineFonts?: boolean;
};

/** Shrinks each scene's type until nothing overflows, then marks the page ready. */
const FIT_SCRIPT = `
(function () {
  // Containers must not overflow in height; text must not overflow in width (a word too long for
  // the line). A headline's own height is left alone: display faces paint past their line box.
  function overflows(scene) {
    var boxes = scene.querySelectorAll(".content, .grow, .stack, .bullets");
    for (var i = 0; i < boxes.length; i++) {
      var b = boxes[i];
      if (b.scrollHeight > b.clientHeight + 4 || b.scrollWidth > b.clientWidth + 4) return true;
    }
    var texts = scene.querySelectorAll(".headline, .badge, .stat, .cta span");
    for (var j = 0; j < texts.length; j++) if (texts[j].scrollWidth > texts[j].clientWidth + 4) return true;
    return false;
  }
  // Measured without transforms: the video timeline sets entrance offsets on load, and a shifted
  // element counts as overflow.
  function fit() {
    var style = document.createElement("style");
    style.textContent = ".scene, .scene * { transform: none !important; }";
    document.head.appendChild(style);
    var scenes = document.querySelectorAll(".scene");
    for (var i = 0; i < scenes.length; i++) {
      // Video clips start hidden (visibility or display): measure each one shown, then put it back.
      var s = scenes[i], visibility = s.style.visibility, display = s.style.display;
      s.style.visibility = "visible";
      s.style.display = "block";
      var f = 1;
      s.style.setProperty("--fit", "1");
      while (overflows(s) && f > 0.42) { f = Math.round((f - 0.04) * 100) / 100; s.style.setProperty("--fit", String(f)); }
      s.setAttribute("data-fit", String(f));
      s.style.visibility = visibility;
      s.style.display = display;
    }
    style.remove();
    window.__openpromoReady = true;
  }
  var images = Array.prototype.slice.call(document.images).map(function (img) { return img.complete ? Promise.resolve() : new Promise(function (r) { img.onload = img.onerror = r; }); });
  Promise.all([document.fonts ? document.fonts.ready : Promise.resolve()].concat(images)).then(fit, fit);
})();`;

function context(input: DocumentInput, mode: "image" | "video"): SceneContext {
  return {
    brand: input.brand,
    format: input.format,
    style: input.spec.style,
    mode,
    url: (id) => (id && input.assets.files[id] ? input.assets.files[id]!.path : null),
    isVideo: (id) => Boolean(id && input.assets.files[id]?.video),
  };
}

function head(input: DocumentInput, extraCss = "", extraHead = ""): string {
  const { width, height } = MEDIA_FORMATS[input.format];
  const fonts = input.offlineFonts ? "" : `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="${esc(googleFontsHref(input.brand))}">`;
  return `<meta charset="utf-8"><meta name="viewport" content="width=${width}, height=${height}">${extraHead}${fonts}
<style>${themeCss(input.brand, input.spec.colors)}
:root { --w: ${width}px; --h: ${height}px; }
${SCENE_CSS}${extraCss}</style>`;
}

/** One scene, drawn in its final state, for a PNG/JPEG screenshot. */
export function imageDocument(input: DocumentInput, sceneIndex = 0): string {
  const scene = input.spec.scenes[sceneIndex] ?? input.spec.scenes[0]!;
  return `<!doctype html><html lang="en"><head>${head(input)}</head><body><div id="stage">${sceneHtml(context(input, "image"), scene)}</div><script>${FIT_SCRIPT}</script></body></html>`;
}

export type VoiceClip = { path: string; startMs: number; durationMs: number };
export type CaptionCue = { startMs: number; endMs: number; words: Array<{ text: string; startMs: number; endMs: number }> };

export type VideoInput = DocumentInput & {
  /** Voiceover, one clip per scene (or per sentence), already placed on the timeline. */
  voice: VoiceClip[];
  music?: { path: string; durationMs: number; volume: number } | null;
  captions: CaptionCue[];
  /** Where each scene starts, in ms (scene durations may have been stretched to fit the voice). */
  sceneStarts: number[];
  sceneDurations: number[];
};

const secs = (ms: number) => (Math.round(ms) / 1000).toFixed(3);

/**
 * A Hyperframes composition: scenes on track 1, their backdrops (photos or clips) on track 0,
 * captions on track 3, voice on track 4, music on track 5. The GSAP timeline only animates
 * opacity and transforms; Hyperframes owns visibility and media playback.
 */
export function videoDocument(input: VideoInput): string {
  const ctx = context(input, "video");
  const { width, height } = MEDIA_FORMATS[input.format];
  const total = input.sceneStarts.reduce((end, start, i) => Math.max(end, start + (input.sceneDurations[i] ?? 0)), 0);
  const clips: string[] = [];
  const tl: string[] = [];

  input.spec.scenes.forEach((scene, i) => {
    const start = input.sceneStarts[i] ?? 0;
    const duration = input.sceneDurations[i] ?? scene.durationMs;
    const timing = `data-start="${secs(start)}" data-duration="${secs(duration)}"`;
    const bg = scene.background?.assetId ? input.assets.files[scene.background.assetId] : undefined;
    if (bg && lookOf(ctx, scene) === "photo") {
      const id = `bg-${i}`;
      clips.push(
        bg.video
          ? `<video id="${id}" class="clip backdrop" ${timing} data-track-index="0" src="${esc(bg.path)}" muted playsinline></video>`
          : `<img id="${id}" class="clip backdrop" ${timing} data-track-index="0" src="${esc(bg.path)}" alt="">`,
      );
      // A slow push-in keeps stills alive (a "Ken Burns" move); clips move on their own.
      if (!bg.video) tl.push(`tl.fromTo("#${id}", { scale: 1 }, { scale: 1.08, duration: ${secs(duration)}, ease: "none" }, ${secs(start)});`);
    }
    clips.push(sceneHtml(ctx, scene, ` id="scene-${i}" ${timing} data-track-index="1"`, "clip"));
    const t0 = start / 1000;
    const entrance =
      scene.transition === "slide"
        ? `{ xPercent: 8, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.45, ease: "power3.out" }`
        : scene.transition === "zoom"
          ? `{ scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }`
          : scene.transition === "cut"
            ? `{ opacity: 1 }, { opacity: 1, duration: 0.01 }`
            : `{ opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power1.out" }`;
    tl.push(`tl.fromTo("#scene-${i} .content", ${entrance}, ${t0.toFixed(3)});`);
    tl.push(`tl.from("#scene-${i} .in", { opacity: 0, y: ${Math.round(Math.min(width, height) * 0.04)}, duration: 0.5, ease: "power3.out", stagger: 0.12 }, ${(t0 + 0.12).toFixed(3)});`);
  });

  input.captions.forEach((cue, i) => {
    const words = cue.words.map((w, j) => `<span class="w" id="c${i}w${j}">${esc(w.text)}</span>`).join("");
    clips.push(`<div id="cap-${i}" class="clip caption" data-start="${secs(cue.startMs)}" data-duration="${secs(Math.max(80, cue.endMs - cue.startMs))}" data-track-index="3"><div class="caption-box">${words}</div></div>`);
    cue.words.forEach((w, j) => {
      tl.push(`tl.set("#c${i}w${j}", { color: "var(--caption-hi, #ffd84d)", scale: 1.06 }, ${(w.startMs / 1000).toFixed(3)});`);
      tl.push(`tl.set("#c${i}w${j}", { color: "#ffffff", scale: 1 }, ${(Math.max(w.startMs + 40, w.endMs) / 1000).toFixed(3)});`);
    });
  });

  input.voice.forEach((clip, i) => {
    clips.push(`<audio id="vo-${i}" data-start="${secs(clip.startMs)}" data-duration="${secs(clip.durationMs)}" data-track-index="4" data-volume="1" src="${esc(clip.path)}"></audio>`);
  });

  if (input.music) {
    // A short music bed repeats to cover the whole video.
    for (let at = 0, n = 0; at < total; at += input.music.durationMs, n++) {
      const length = Math.min(input.music.durationMs, total - at);
      clips.push(`<audio id="music-${n}" data-start="${secs(at)}" data-duration="${secs(length)}" data-track-index="5" data-volume="${input.music.volume.toFixed(2)}" src="${esc(input.music.path)}"></audio>`);
    }
  }

  const css = `.clip { visibility: hidden; } .scene.look-photo { background: transparent; } .backdrop.clip { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }`;
  const meta = `<meta data-composition-id="openpromo" data-width="${width}" data-height="${height}"><script src="gsap.min.js"></script>`;
  return `<!doctype html><html lang="en"><head>${head(input, css, meta)}</head><body><div id="stage">
${clips.join("\n")}
</div>
<script>${FIT_SCRIPT}</script>
<script>
var tl = gsap.timeline({ paused: true });
${tl.join("\n")}
tl.set({}, {}, ${(total / 1000).toFixed(3)});
window.__timelines = window.__timelines || {};
window.__timelines["openpromo"] = tl;
</script></body></html>`;
}
