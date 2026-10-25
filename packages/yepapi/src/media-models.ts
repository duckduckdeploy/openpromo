/**
 * The YepAPI media models OpenPromo offers, with what each accepts and roughly what it costs.
 *
 * YepAPI has no media-model list endpoint and its queue does not reject options a model does not
 * support (the job fails later instead), so this table is the schema we check requests against.
 * Prices are estimates for budgets and reservations; the real charge is the job's `costUsd`.
 * Source: YepAPI docs and live calls, 2026-10-25.
 */

export type MediaKind = 'image' | 'video' | 'speech' | 'music';

export interface MediaModel {
  id: string;
  kind: MediaKind;
  label: string;
  /** Short note for pickers. */
  note: string;
  /** Allowed `aspectRatio` values; empty when the model takes none. */
  aspectRatios: readonly string[];
  /** Takes a reference image (edit, or first frame for video). */
  acceptsImage: boolean;
  /** Video: allowed `duration` values in seconds. */
  durations?: readonly number[];
  resolutions?: readonly string[];
  /** Speech: the default voice. */
  defaultVoice?: string;
  /** Estimated USD for one output: images and music per item, video per second, speech per 1,000 characters. */
  estimateUsd: number;
  /** Lowest the job can cost (the $0.01 minimum for speech). */
  minUsd?: number;
}

const A_COMMON = ['1:1', '4:3', '3:4', '3:2', '2:3', '16:9', '9:16'] as const;
const VERTICAL_VIDEO = ['16:9', '9:16'] as const;

export const MEDIA_MODELS: readonly MediaModel[] = [
  // Images
  {
    id: 'black-forest-labs/flux.2-klein-4b',
    kind: 'image',
    label: 'FLUX.2 Klein',
    note: 'Fast, cheap drafts and edits; keeps products faithful',
    aspectRatios: ['1:1', '4:3', '3:4', '16:9', '9:16'],
    acceptsImage: true,
    estimateUsd: 0.04,
  },
  {
    id: 'google/nano-banana-3-flash',
    kind: 'image',
    label: 'Nano Banana 3 Flash',
    note: 'Best default: faithful product and logo reuse',
    aspectRatios: A_COMMON,
    acceptsImage: true,
    resolutions: ['512', '1K', '2K', '4K'],
    estimateUsd: 0.19,
  },
  {
    id: 'google/nano-banana-3-pro',
    kind: 'image',
    label: 'Nano Banana 3 Pro',
    note: 'Highest quality, slower',
    aspectRatios: A_COMMON,
    acceptsImage: true,
    resolutions: ['1K', '2K', '4K'],
    estimateUsd: 0.32,
  },
  {
    id: 'openai/gpt-image-1-mini',
    kind: 'image',
    label: 'GPT Image 1 Mini',
    note: 'Square and 2:3 / 3:2 only',
    aspectRatios: ['1:1', '3:2', '2:3'],
    acceptsImage: true,
    estimateUsd: 0.11,
  },
  // Video (per second)
  {
    id: 'google/veo-3-lite',
    kind: 'video',
    label: 'Veo 3.1 Lite',
    note: 'Default for B-roll and animating a still',
    aspectRatios: VERTICAL_VIDEO,
    acceptsImage: true,
    durations: [4, 6, 8],
    resolutions: ['720p', '1080p'],
    estimateUsd: 0.11,
  },
  {
    id: 'google/veo-3-fast',
    kind: 'video',
    label: 'Veo 3.1 Fast',
    note: 'Sharper, about twice the price',
    aspectRatios: VERTICAL_VIDEO,
    acceptsImage: true,
    durations: [4, 6, 8],
    resolutions: ['720p', '1080p'],
    estimateUsd: 0.21,
  },
  {
    id: 'kwaivgi/kling-v3.0-std',
    kind: 'video',
    label: 'Kling 3.0',
    note: 'Smooth motion; square too',
    aspectRatios: ['16:9', '9:16', '1:1'],
    acceptsImage: true,
    durations: [3, 4, 5, 6, 7, 8, 9, 10],
    resolutions: ['720p'],
    estimateUsd: 0.18,
  },
  // Speech (per 1,000 characters, $0.01 minimum per job)
  {
    id: 'microsoft/mai-voice-2.1-flash',
    kind: 'speech',
    label: 'MAI Voice 2.1 Flash',
    note: 'Natural, fast, 23 languages',
    aspectRatios: [],
    acceptsImage: false,
    defaultVoice: 'en-US-Harper:MAI-Voice-2.1-Flash',
    estimateUsd: 0.0316,
    minUsd: 0.01,
  },
  {
    id: 'elevenlabs/eleven-v4-turbo',
    kind: 'speech',
    label: 'ElevenLabs v4 Turbo',
    note: 'Premium voices, 90+ languages',
    aspectRatios: [],
    acceptsImage: false,
    defaultVoice: 'sarah',
    estimateUsd: 0.0844,
    minUsd: 0.01,
  },
  // Music (per track)
  {
    id: 'google/lyria-3-clip',
    kind: 'music',
    label: 'Lyria 3 Clip',
    note: '30-second instrumental bed',
    aspectRatios: [],
    acceptsImage: false,
    estimateUsd: 0.08,
  },
  {
    id: 'google/lyria-3-pro',
    kind: 'music',
    label: 'Lyria 3 Pro',
    note: 'Full-length track for longer videos',
    aspectRatios: [],
    acceptsImage: false,
    estimateUsd: 0.16,
  },
];

export const DEFAULT_MEDIA_MODELS: Record<MediaKind, string> = {
  image: 'google/nano-banana-3-flash',
  video: 'google/veo-3-lite',
  speech: 'microsoft/mai-voice-2.1-flash',
  music: 'google/lyria-3-clip',
};

/** Cheap model for drafts and previews. */
export const DRAFT_IMAGE_MODEL = 'black-forest-labs/flux.2-klein-4b';

export function mediaModel(id: string): MediaModel | undefined {
  return MEDIA_MODELS.find((m) => m.id === id);
}

/**
 * Estimated USD for one job. Unknown models are allowed through (YepAPI has more than we list),
 * but their price is unknown, so they reserve a conservative $1.
 */
export function estimateMediaUsd(model: string, prompt: string, options: { duration?: string } = {}): number {
  const m = mediaModel(model);
  if (!m) return 1;
  switch (m.kind) {
    case 'video': {
      const seconds = Number(options.duration ?? m.durations?.[0] ?? 6);
      return round(m.estimateUsd * (Number.isFinite(seconds) ? seconds : 6));
    }
    case 'speech':
      return round(Math.max(m.minUsd ?? 0, (m.estimateUsd * new TextEncoder().encode(prompt).length) / 1000));
    default:
      return m.estimateUsd;
  }
}

const round = (usd: number) => Math.round(usd * 10_000) / 10_000;

/**
 * Problems with a request this model will fail on, found before paying for a submit. YepAPI only
 * reports these once the job runs.
 */
export function checkMediaRequest(model: string, request: { options?: Record<string, unknown>; hasImage?: boolean }): string[] {
  const m = mediaModel(model);
  if (!m) return [];
  const problems: string[] = [];
  const options = request.options ?? {};
  const ratio = options.aspectRatio;
  if (typeof ratio === 'string' && m.aspectRatios.length && !m.aspectRatios.includes(ratio)) {
    problems.push(`${m.label} does not support aspect ratio ${ratio} (use ${m.aspectRatios.join(', ')})`);
  }
  if (request.hasImage && !m.acceptsImage) problems.push(`${m.label} does not take a reference image`);
  if (m.kind === 'video' && options.duration !== undefined) {
    const seconds = Number(options.duration);
    if (m.durations && !m.durations.includes(seconds)) problems.push(`${m.label} makes ${m.durations.join(', ')}-second clips, not ${options.duration}`);
  }
  if (typeof options.resolution === 'string' && m.resolutions && !m.resolutions.includes(options.resolution)) {
    problems.push(`${m.label} does not support resolution ${options.resolution}`);
  }
  return problems;
}

/** The nearest aspect ratio a model supports, for formats it lacks (4:5 → 3:4). */
export function nearestAspectRatio(model: string, width: number, height: number): string | undefined {
  const m = mediaModel(model);
  if (!m || !m.aspectRatios.length) return undefined;
  const target = width / height;
  let best: string | undefined;
  let bestDiff = Infinity;
  for (const ratio of m.aspectRatios) {
    const [w, h] = ratio.split(':').map(Number);
    if (!w || !h) continue;
    const diff = Math.abs(Math.log(w / h / target));
    if (diff < bestDiff) {
      best = ratio;
      bestDiff = diff;
    }
  }
  return best;
}
