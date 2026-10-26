import { describe, expect, it } from 'vitest';
import { createYepApi } from './client';
import { isYepApiError, type YepApiError } from './errors';
import { runMediaJob } from './media-job';
import { checkMediaRequest, nearestAspectRatio } from './media-models';
import { fakeFetch, reply } from './testing';

const KEY = 'yep_sk_test_secret_123';
const ok = (data: unknown) => reply(200, { ok: true, data });
const BYTES = [137, 80, 78, 71, 0, 255];
const BASE64 = Buffer.from(BYTES).toString('base64');

async function rejection(promise: Promise<unknown>): Promise<YepApiError> {
  try {
    await promise;
  } catch (error) {
    if (isYepApiError(error)) return error;
    throw error;
  }
  throw new Error('expected the call to reject');
}

describe('checkMediaRequest', () => {
  it('accepts a request the model supports', () => {
    expect(checkMediaRequest('google/nano-banana-3-flash', { options: { aspectRatio: '3:4', resolution: '2K' }, hasImage: true })).toEqual([]);
    expect(checkMediaRequest('google/veo-3-lite', { options: { aspectRatio: '9:16', duration: '6' }, hasImage: true })).toEqual([]);
    expect(checkMediaRequest('microsoft/mai-voice-2.1-flash', {})).toEqual([]);
  });

  it('rejects an aspect ratio the model does not offer', () => {
    const problems = checkMediaRequest('openai/gpt-image-1-mini', { options: { aspectRatio: '16:9' } });
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('aspect ratio 16:9');
    expect(problems[0]).toContain('1:1, 3:2, 2:3');
  });

  it('rejects a reference image on a model without image input', () => {
    const problems = checkMediaRequest('google/lyria-3-clip', { hasImage: true });
    expect(problems).toEqual(['Lyria 3 Clip does not take a reference image']);
  });

  it('rejects a video duration the model cannot make', () => {
    const problems = checkMediaRequest('google/veo-3-lite', { options: { duration: '5' } });
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('4, 6, 8-second clips, not 5');
    expect(checkMediaRequest('kwaivgi/kling-v3.0-std', { options: { duration: '5' } })).toEqual([]);
  });

  it('rejects an unsupported resolution and lists every problem', () => {
    const problems = checkMediaRequest('google/veo-3-fast', { options: { aspectRatio: '1:1', duration: '10', resolution: '4K' } });
    expect(problems).toHaveLength(3);
  });

  it('lets unknown models through', () => {
    expect(checkMediaRequest('someone/new-model', { options: { aspectRatio: '7:3' }, hasImage: true })).toEqual([]);
  });
});

describe('nearestAspectRatio', () => {
  it('maps 4:5 (1080×1350) to 3:4 on FLUX.2 Klein', () => {
    expect(nearestAspectRatio('black-forest-labs/flux.2-klein-4b', 1080, 1350)).toBe('3:4');
  });

  it('returns exact matches and the closest otherwise', () => {
    expect(nearestAspectRatio('google/nano-banana-3-flash', 1920, 1080)).toBe('16:9');
    expect(nearestAspectRatio('openai/gpt-image-1-mini', 1080, 1920)).toBe('2:3');
    expect(nearestAspectRatio('kwaivgi/kling-v3.0-std', 1000, 1000)).toBe('1:1');
  });

  it('has no answer for models without aspect ratios or unknown models', () => {
    expect(nearestAspectRatio('google/lyria-3-clip', 16, 9)).toBeUndefined();
    expect(nearestAspectRatio('someone/new-model', 16, 9)).toBeUndefined();
  });
});

describe('runMediaJob', () => {
  const request = { model: 'google/nano-banana-3-flash', prompt: 'a mug', options: { aspectRatio: '1:1' } };

  it('submits, polls through pending and processing, and decodes the completed file', async () => {
    const { fetch, requests } = fakeFetch(
      ok({ jobId: 'job-1', status: 'pending', model: request.model, category: 'image' }),
      ok({ jobId: 'job-1', status: 'pending' }),
      ok({ jobId: 'job-1', status: 'processing' }),
      ok({ jobId: 'job-1', status: 'completed', costUsd: 0.19, result: { image: { mimeType: 'image/png', base64: BASE64 } } }),
    );
    const yep = createYepApi({ apiKey: KEY, fetch });
    const submitted: Array<[string, number]> = [];
    const result = await runMediaJob(yep, request, {
      pollMs: 0,
      onSubmitted: (jobId) => {
        submitted.push([jobId, requests.length]);
      },
    });

    // onSubmitted runs once, after the submit and before the first poll.
    expect(submitted).toEqual([['job-1', 1]]);
    expect(requests.map((r) => [r.method, r.url])).toEqual([
      ['POST', 'https://api.yepapi.com/v1/media/queue'],
      ['GET', 'https://api.yepapi.com/v1/media/status/job-1'],
      ['GET', 'https://api.yepapi.com/v1/media/status/job-1'],
      ['GET', 'https://api.yepapi.com/v1/media/status/job-1'],
    ]);
    expect(requests[0]?.body).toEqual(request);
    expect(result.jobId).toBe('job-1');
    expect(result.costUsd).toBe(0.19);
    expect(result.file?.mimeType).toBe('image/png');
    expect(result.file?.bytes).toBeInstanceOf(Uint8Array);
    expect(Array.from(result.file?.bytes ?? [])).toEqual(BYTES);
  });

  it('returns audio and text for music', async () => {
    const { fetch } = fakeFetch(
      ok({ jobId: 'job-m', status: 'pending', model: 'google/lyria-3-clip', category: 'music' }),
      ok({ jobId: 'job-m', status: 'completed', costUsd: 0.08, result: { audio: { mimeType: 'audio/mpeg', base64: BASE64 }, text: '<instrumental>' } }),
    );
    const result = await runMediaJob(createYepApi({ apiKey: KEY, fetch }), { model: 'google/lyria-3-clip', prompt: 'calm' }, { pollMs: 1 });
    expect(result).toMatchObject({ jobId: 'job-m', costUsd: 0.08, text: '<instrumental>' });
    expect(result.file?.mimeType).toBe('audio/mpeg');
    expect(Array.from(result.file?.bytes ?? [])).toEqual(BYTES);
  });

  it('resumes an earlier job without submitting again', async () => {
    const { fetch, requests } = fakeFetch(
      ok({ jobId: 'job-9', status: 'processing' }),
      ok({ jobId: 'job-9', status: 'completed', costUsd: 0.04, result: { image: { mimeType: 'image/webp', base64: BASE64 } } }),
    );
    let called = false;
    const result = await runMediaJob(createYepApi({ apiKey: KEY, fetch }), request, {
      jobId: 'job-9',
      pollMs: 1,
      onSubmitted: () => {
        called = true;
      },
    });
    expect(called).toBe(false);
    expect(requests.every((r) => r.method === 'GET' && r.url === 'https://api.yepapi.com/v1/media/status/job-9')).toBe(true);
    expect(requests).toHaveLength(2);
    expect(result).toMatchObject({ jobId: 'job-9', costUsd: 0.04 });
  });

  it('waits out a status outage instead of failing the job', async () => {
    const outage = () => reply(503, { ok: false, error: { code: 'UPSTREAM_ERROR', message: 'Service unavailable' } });
    const { fetch, requests } = fakeFetch(
      outage(),
      outage(),
      ok({ jobId: 'job-o', status: 'completed', costUsd: 0.64, result: { video: { mimeType: 'video/mp4', base64: BASE64 } } }),
    );
    const yep = createYepApi({ apiKey: KEY, fetch, maxRetries: 0 });
    const result = await runMediaJob(yep, request, { jobId: 'job-o', pollMs: 1 });
    expect(result).toMatchObject({ jobId: 'job-o', costUsd: 0.64 });
    expect(requests).toHaveLength(3);
  });

  it('throws MEDIA_JOB_FAILED when the job fails', async () => {
    const { fetch, requests } = fakeFetch(
      ok({ jobId: 'job-f', status: 'pending', model: request.model, category: 'image' }),
      ok({ jobId: 'job-f', status: 'processing' }),
      ok({ jobId: 'job-f', status: 'failed', error: 'Content rejected by safety filter' }),
    );
    const error = await rejection(runMediaJob(createYepApi({ apiKey: KEY, fetch }), request, { pollMs: 0 }));
    expect(error).toMatchObject({ code: 'MEDIA_JOB_FAILED', status: 502, endpoint: '/v1/media/status' });
    expect(error.message).toContain('safety filter');
    expect(requests).toHaveLength(3);
  });

  it('rejects an invalid request before any fetch', async () => {
    const { fetch, requests } = fakeFetch(ok({ jobId: 'never' }));
    let called = false;
    const error = await rejection(
      runMediaJob(
        createYepApi({ apiKey: KEY, fetch }),
        { model: 'black-forest-labs/flux.2-klein-4b', prompt: 'p', options: { aspectRatio: '4:5' } },
        {
          pollMs: 0,
          onSubmitted: () => {
            called = true;
          },
        },
      ),
    );
    expect(error).toMatchObject({ code: 'VALIDATION_ERROR', status: 400, isValidation: true, requestSent: false });
    expect(error.message).toContain('4:5');
    expect(requests).toHaveLength(0);
    expect(called).toBe(false);
  });

  it('checks the reference image against the model', async () => {
    const { fetch, requests } = fakeFetch(ok({ jobId: 'never' }));
    const error = await rejection(
      runMediaJob(
        createYepApi({ apiKey: KEY, fetch }),
        { model: 'elevenlabs/eleven-v4-turbo', prompt: 'hello', imageData: { mimeType: 'image/png', base64: BASE64 } },
        { pollMs: 0 },
      ),
    );
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(requests).toHaveLength(0);
  });
});
