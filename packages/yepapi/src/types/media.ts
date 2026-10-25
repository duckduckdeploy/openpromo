/** Inline media, the only way YepAPI accepts or returns files: raw base64, no `data:` prefix. */
export interface MediaData {
  mimeType: string;
  base64: string;
}

export interface MediaOptions {
  /** Allowed values differ per model (see MEDIA_MODELS); a wrong one fails the job, not the submit. */
  aspectRatio?: string;
  /** Video `480p`…`4K`; Nano Banana `512`, `1K`, `2K`, `4K`. */
  resolution?: string;
  /** Video seconds, as a string ("6"). */
  duration?: string;
  /** Image `png` | `jpeg` | `webp` | `svg`; speech `mp3` | `pcm`. */
  outputFormat?: string;
  generateAudio?: boolean;
  /** Video: how imageData is used. */
  imageRole?: 'first_frame' | 'last_frame' | 'reference_image';
  /** Speech. */
  voice?: string;
  speed?: number;
  [key: string]: unknown;
}

export interface MediaQueueParams {
  model: string;
  /** The image or video description, the text to speak, or the music brief. */
  prompt: string;
  options?: MediaOptions;
  /** One reference image (or a first frame for video). Several images cannot be sent. */
  imageData?: MediaData;
  /** Voice cloning sample (fish-audio/s2.1-pro only). */
  audioData?: MediaData;
}

export type MediaJobState = 'pending' | 'processing' | 'completed' | 'failed';

export interface MediaQueueData {
  jobId: string;
  status: MediaJobState;
  model: string;
  category: string;
  createdAt?: string;
}

export interface MediaStatusData {
  jobId: string;
  model?: string;
  category?: string;
  status: MediaJobState;
  /** Present once completed: what was billed. Failed jobs carry none and are not billed. */
  costUsd?: number;
  /** Failed jobs: the upstream reason, sometimes JSON. */
  error?: string;
  completedAt?: string;
  result?: {
    image?: MediaData;
    video?: MediaData;
    audio?: MediaData;
    /** Music (lyrics or "<instrumental>") and analysis models. */
    text?: string;
  };
}

export interface ScreenshotParams {
  url: string;
  /** Default false. */
  fullPage?: boolean;
  /** Viewport, default 1920 × 1080. */
  width?: number;
  height?: number;
}

export interface ScreenshotData {
  url: string;
  /** Base64 PNG. */
  image: string;
  width: number;
  /** The viewport height, not the image's, for full-page captures: read the PNG instead. */
  height: number;
}

export interface ExtractParams {
  url: string;
  /** CSS or XPath rules: `{ logo: "header img@src", icons: { selector: "link[rel*=icon]@href", type: "list" } }`. */
  extractRules: Record<string, unknown>;
}

export interface ExtractData {
  url: string;
  extracted: Record<string, unknown>;
}
