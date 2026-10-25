import type { YepApi } from './client';
import { YepApiError } from './errors';
import { checkMediaRequest } from './media-models';
import type { MediaData, MediaQueueParams, MediaStatusData } from './types/media';

export interface RunMediaJobOptions {
  /** Resume a job submitted earlier (after a restart) instead of submitting a new one. */
  jobId?: string;
  /** Called once the job is accepted, so the caller can store the id before waiting. */
  onSubmitted?: (jobId: string) => void | Promise<void>;
  /** Default 3000 ms: videos take minutes, images seconds. */
  pollMs?: number;
  /** Give up waiting after this long. Default 15 minutes. The job may still complete upstream. */
  timeoutMs?: number;
  signal?: AbortSignal;
}

export interface MediaJobResult {
  jobId: string;
  costUsd: number;
  /** The file, decoded. Absent only for analysis models, which return text. */
  file?: { mimeType: string; bytes: Uint8Array };
  /** Music lyrics ("<instrumental>") or analysis text. */
  text?: string;
}

const sleep = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason);
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timer);
        reject(signal.reason);
      },
      { once: true },
    );
  });

function decode(media: MediaData): { mimeType: string; bytes: Uint8Array } {
  return { mimeType: media.mimeType, bytes: Uint8Array.from(Buffer.from(media.base64, 'base64')) };
}

/**
 * Runs one media job to the end: checks the request against the model's known options, submits
 * it (or resumes `jobId`), polls until it completes and returns the decoded file.
 *
 * A failed job comes back from YepAPI as HTTP 200 with `status: "failed"`; it is thrown here as
 * a `YepApiError` with code `MEDIA_JOB_FAILED` (status 502) and is not billed.
 */
export async function runMediaJob(yep: YepApi, request: MediaQueueParams, options: RunMediaJobOptions = {}): Promise<MediaJobResult> {
  let jobId = options.jobId;
  if (!jobId) {
    const problems = checkMediaRequest(request.model, { options: request.options, hasImage: Boolean(request.imageData) });
    if (problems.length) {
      throw new YepApiError(problems.join('; '), { code: 'VALIDATION_ERROR', status: 400, endpoint: '/v1/media/queue', requestSent: false });
    }
    const submitted = await yep.media.queue(request, { signal: options.signal });
    jobId = submitted.data.jobId;
    await options.onSubmitted?.(jobId);
  }

  const deadline = Date.now() + (options.timeoutMs ?? 15 * 60_000);
  const pollMs = options.pollMs ?? 3000;
  for (;;) {
    const { data } = await yep.media.status(jobId, { signal: options.signal });
    if (data.status === 'completed') return toResult(jobId, data);
    if (data.status === 'failed') {
      throw new YepApiError(data.error || 'The media job failed', { code: 'MEDIA_JOB_FAILED', status: 502, endpoint: '/v1/media/status' });
    }
    if (Date.now() > deadline) {
      throw new YepApiError(`Media job ${jobId} did not finish in time`, { code: 'TIMEOUT', status: 0, endpoint: '/v1/media/status' });
    }
    await sleep(pollMs, options.signal);
  }
}

function toResult(jobId: string, data: MediaStatusData): MediaJobResult {
  const media = data.result?.image ?? data.result?.video ?? data.result?.audio;
  return {
    jobId,
    costUsd: data.costUsd ?? 0,
    file: media ? decode(media) : undefined,
    text: data.result?.text,
  };
}
