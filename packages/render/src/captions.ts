import type { CaptionCue } from "./document";

/**
 * Word-timed captions from the script. We write the narration ourselves, so the words are known;
 * each scene's voice clip has a measured length and, when the API could read them, the stretches
 * where the voice is speaking (from ffmpeg's silencedetect). Phrases are pinned to those stretches
 * and words are spread inside them by how long they take to say, without a speech-to-text pass.
 */

export type VoicedSpan = { startMs: number; endMs: number };

export type SpokenLine = {
  text: string;
  startMs: number;
  durationMs: number;
  /** Where the voice is speaking, relative to the start of the clip. Without them the read is estimated. */
  voiced?: VoicedSpan[];
  /** Words or short phrases to mark as keywords (shown in the accent colour by most presets). */
  emphasis?: string[];
};

export type CueOptions = {
  maxWords?: number;
  maxChars?: number;
  /** A cue stays up this long after its last word, unless the next one starts first. */
  holdMs?: number;
};

type TimedWord = CaptionCue["words"][number];

const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

/** A number as it is read out: 49 is "forty nine", 2026 is "twenty twenty six". */
function numberWords(n: number): string {
  if (n < 20) return ONES[n]!;
  if (n < 100) return `${TENS[Math.floor(n / 10)]} ${n % 10 ? ONES[n % 10] : ""}`.trim();
  if (n < 1000) return `${ONES[Math.floor(n / 100)]} hundred ${n % 100 ? numberWords(n % 100) : ""}`.trim();
  if (n >= 1100 && n < 10_000 && n % 100 !== 0) return `${numberWords(Math.floor(n / 100))} ${numberWords(n % 100)}`;
  if (n < 1_000_000) return `${numberWords(Math.floor(n / 1000))} thousand ${n % 1000 ? numberWords(n % 1000) : ""}`.trim();
  return `${numberWords(Math.floor(n / 1_000_000))} million ${n % 1_000_000 ? numberWords(n % 1_000_000) : ""}`.trim();
}

/** Vowel groups, a decent stand-in for syllables in English. */
function syllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  const groups = w.replace(/e$/, "").match(/[aeiouy]+/g)?.length ?? 0;
  return Math.max(1, groups);
}

/** How long a word takes to say, in rough syllables: numbers and symbols are read out in full. */
export function spokenWeight(word: string): number {
  let spoken = word
    .replace(/(\d+(?:\.\d+)?)k\b/gi, "$1 thousand")
    .replace(/\$/g, " dollars ")
    .replace(/%/g, " percent ")
    .replace(/&/g, " and ")
    .replace(/\+/g, " plus ")
    .replace(/(\d),(\d{3})/g, "$1$2");
  spoken = spoken.replace(/\d+(?:\.\d+)?/g, (digits) => {
    const [whole, fraction] = digits.split(".");
    const n = Number(whole);
    const read = Number.isFinite(n) && n < 1_000_000_000 ? numberWords(n) : whole!.split("").map((d) => ONES[Number(d)]).join(" ");
    return fraction ? `${read} point ${fraction.split("").map((d) => ONES[Number(d)]).join(" ")}` : read;
  });
  // Initialisms ("AI", "SEO") are read letter by letter.
  if (/^[A-Z]{2,5}[.,!?;:]?$/.test(word)) return word.replace(/[^A-Z]/g, "").length;
  const total = spoken.split(/\s+/).filter(Boolean).reduce((n, w) => n + syllables(w), 0);
  // A fixed cost per word: the gap between words and the consonants around them.
  return Math.max(1, total) + 0.6;
}

const PHRASE_END = /[.,!?;:]["')\]]*$/;
const SENTENCE_END = /[.!?]["')\]]*$/;
/** Words a caption should not end on when the next word follows straight away. */
const FUNCTION_WORD = /^(a|an|the|to|of|and|or|in|on|at|for|with|your|our|my|is|are|from|by|as)$/i;

/** Spreads words over [startMs, endMs] by spoken weight. */
function spread(words: string[], startMs: number, endMs: number): TimedWord[] {
  const weights = words.map(spokenWeight);
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  let at = startMs;
  return words.map((text, i) => {
    const span = ((endMs - startMs) * weights[i]!) / total;
    const word = { text, startMs: Math.round(at), endMs: Math.round(at + span) };
    at += span;
    return word;
  });
}

/** Word timings for one spoken line. */
export function timeWords(line: SpokenLine): TimedWord[] {
  const words = line.text.split(/\s+/).filter(Boolean);
  if (!words.length || line.durationMs <= 0) return [];
  const voiced = (line.voiced ?? []).filter((s) => s.endMs - s.startMs >= 40).sort((a, b) => a.startMs - b.startMs);
  const at = (ms: number) => line.startMs + ms;

  if (!voiced.length) {
    // Voices start a beat in and trail off at the end; a pause after punctuation weighs like a short word.
    const lead = Math.min(120, line.durationMs * 0.04);
    const weights = words.map((w) => spokenWeight(w) + (PHRASE_END.test(w) ? 1.2 : 0));
    const total = weights.reduce((a, b) => a + b, 0);
    let t = at(lead);
    const usable = Math.max(1, line.durationMs - lead * 2);
    return words.map((text, i) => {
      const span = (usable * weights[i]!) / total;
      const word = { text, startMs: Math.round(t), endMs: Math.round(t + span) };
      t += span;
      return word;
    });
  }

  // Phrases end at punctuation. When there are as many voiced stretches as phrases, they line up one to one.
  const phrases: string[][] = [];
  let current: string[] = [];
  for (const w of words) {
    current.push(w);
    if (PHRASE_END.test(w)) {
      phrases.push(current);
      current = [];
    }
  }
  if (current.length) phrases.push(current);
  if (phrases.length === voiced.length) return phrases.flatMap((phrase, i) => spread(phrase, at(voiced[i]!.startMs), at(voiced[i]!.endMs)));

  // Otherwise lay the words along the speaking time only, skipping the silences.
  const speaking = voiced.reduce((n, s) => n + (s.endMs - s.startMs), 0);
  const placed = spread(words, 0, speaking);
  const toReal = (ms: number) => {
    let left = ms;
    for (const s of voiced) {
      const length = s.endMs - s.startMs;
      if (left < length) return at(s.startMs + left);
      left -= length;
    }
    return at(voiced.at(-1)!.endMs);
  };
  return placed.map((w) => ({ text: w.text, startMs: Math.round(toReal(w.startMs)), endMs: Math.round(toReal(Math.max(w.startMs, w.endMs - 1))) }));
}

const normalize = (word: string) => word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

/** Numbers, prices and the emphasis words are keywords. */
function keywordTest(emphasis: string[] = []) {
  const set = new Set(emphasis.flatMap((phrase) => phrase.split(/\s+/)).map(normalize).filter((w) => w.length > 1 && !FUNCTION_WORD.test(w)));
  return (word: string) => /\d/.test(word) || set.has(normalize(word));
}

export function captionCues(lines: SpokenLine[], options: CueOptions = {}): CaptionCue[] {
  const maxWords = options.maxWords ?? 4;
  const maxChars = options.maxChars ?? 24;
  const holdMs = options.holdMs ?? 300;
  const cues: CaptionCue[] = [];
  for (const line of lines) {
    const isKeyword = keywordTest(line.emphasis);
    const timed = timeWords(line).map((w) => (isKeyword(w.text) ? { ...w, kw: true } : w));
    const lineEnd = line.startMs + line.durationMs;
    let chunk: TimedWord[] = [];
    const flush = () => {
      if (!chunk.length) return;
      cues.push({ startMs: chunk[0]!.startMs, endMs: Math.min(lineEnd + holdMs, chunk.at(-1)!.endMs + holdMs), words: chunk });
      chunk = [];
    };
    timed.forEach((word, i) => {
      const chars = chunk.reduce((n, w) => n + w.text.length + 1, 0) + word.text.length;
      const gap = chunk.length ? word.startMs - chunk.at(-1)!.endMs : 0;
      if (chunk.length >= maxWords || (chunk.length && chars > maxChars) || gap >= 150) {
        // Carry a dangling "the" or "of" over to the next caption, with the word it belongs to.
        const last = chunk.at(-1)!;
        if (chunk.length > 1 && FUNCTION_WORD.test(last.text) && gap < 150) {
          chunk.pop();
          flush();
          chunk.push(last);
        } else flush();
      }
      chunk.push(word);
      const next = timed[i + 1];
      if (SENTENCE_END.test(word.text) || (PHRASE_END.test(word.text) && chunk.length >= 2 && maxWords > 2) || (next && next.startMs - word.endMs >= 250)) flush();
    });
    flush();
  }
  // A cue holds until the next one starts, never over it.
  cues.sort((a, b) => a.startMs - b.startMs);
  for (let i = 0; i < cues.length - 1; i++) cues[i]!.endMs = Math.min(cues[i]!.endMs, cues[i + 1]!.startMs);
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
