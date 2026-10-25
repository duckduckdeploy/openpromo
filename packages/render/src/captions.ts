import type { CaptionCue } from "./document";

/**
 * Word-timed captions from the script. We write the narration ourselves, so the words are known;
 * each scene's voice clip has a measured length, and words are spread across it in proportion to
 * their length (a good match for natural reads, without a speech-to-text pass).
 */

export type SpokenLine = { text: string; startMs: number; durationMs: number };

const MAX_WORDS = 4;
const MAX_CHARS = 24;

export function captionCues(lines: SpokenLine[], options: { maxWords?: number; maxChars?: number } = {}): CaptionCue[] {
  const maxWords = options.maxWords ?? MAX_WORDS;
  const maxChars = options.maxChars ?? MAX_CHARS;
  const cues: CaptionCue[] = [];
  for (const line of lines) {
    const words = line.text.split(/\s+/).filter(Boolean);
    if (!words.length || line.durationMs <= 0) continue;
    // Voices start a beat in and trail off at the end.
    const lead = Math.min(120, line.durationMs * 0.04);
    const usable = Math.max(1, line.durationMs - lead * 2);
    // Pauses after punctuation weigh like a few extra letters.
    const weights = words.map((w) => w.length + 2 + (/[.,!?;:]$/.test(w) ? 4 : 0));
    const total = weights.reduce((a, b) => a + b, 0);
    let at = line.startMs + lead;
    const timed = words.map((text, i) => {
      const span = (usable * weights[i]!) / total;
      const word = { text, startMs: Math.round(at), endMs: Math.round(at + span) };
      at += span;
      return word;
    });
    let chunk: typeof timed = [];
    const flush = () => {
      if (!chunk.length) return;
      cues.push({ startMs: chunk[0]!.startMs, endMs: chunk.at(-1)!.endMs, words: chunk });
      chunk = [];
    };
    for (const word of timed) {
      const chars = chunk.reduce((n, w) => n + w.text.length + 1, 0) + word.text.length;
      if (chunk.length >= maxWords || (chunk.length && chars > maxChars)) flush();
      chunk.push(word);
      if (/[.!?]$/.test(word.text)) flush();
    }
    flush();
  }
  return cues;
}

/** SubRip captions for upload alongside the video. */
export function toSrt(cues: CaptionCue[]): string {
  const stamp = (ms: number) => {
    const h = Math.floor(ms / 3_600_000);
    const m = Math.floor((ms % 3_600_000) / 60_000);
    const s = Math.floor((ms % 60_000) / 1000);
    const r = Math.floor(ms % 1000);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(r).padStart(3, "0")}`;
  };
  return cues.map((cue, i) => `${i + 1}\n${stamp(cue.startMs)} --> ${stamp(cue.endMs)}\n${cue.words.map((w) => w.text).join(" ")}\n`).join("\n");
}

/** WebVTT, for players and the in-app preview. */
export function toVtt(cues: CaptionCue[]): string {
  return `WEBVTT\n\n${toSrt(cues).replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, "$1.$2").replace(/^\d+\n/gm, "")}`;
}
