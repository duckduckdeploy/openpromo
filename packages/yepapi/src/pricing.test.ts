import { describe, expect, it } from 'vitest';
import { estimateMediaUsd } from './media-models';
import { computeCost, estimateCost, pricing } from './pricing';
import type { YepEndpoint } from './types/index';

describe('estimateCost', () => {
  it('returns the documented flat scrape prices', () => {
    const flat: Array<[YepEndpoint, number]> = [
      ['/v1/scrape', 0.01],
      ['/v1/scrape/js', 0.02],
      ['/v1/scrape/stealth', 0.03],
      ['/v1/scrape/extract', 0.01],
      ['/v1/scrape/screenshot', 0.02],
    ];
    for (const [endpoint, cost] of flat) {
      expect(estimateCost(endpoint)).toMatchObject({ min: cost, max: cost, exact: true });
    }
    expect(estimateCost('/v1/scrape').formula).toBe('$0.01 per call');
  });

  it('reports AI chat as $0.01 minimum with no upper bound', () => {
    expect(estimateCost('/v1/ai/chat', { messages: [] })).toMatchObject({ min: 0.01, max: null, exact: false });
    expect(estimateCost('/v1/ai/chat').formula).toBe('Token usage, minimum $0.01 per request');
  });

  it('prices the free endpoints and the status poll at zero', () => {
    expect(estimateCost('/v1/ai/models')).toMatchObject({ min: 0, max: 0, exact: true, formula: 'Free' });
    expect(estimateCost('/v1/account/balance')).toMatchObject({ min: 0, max: 0, exact: true });
    expect(estimateCost('/v1/media/status', { jobId: 'job-1' })).toMatchObject({ min: 0, max: 0, exact: true });
  });

  it('estimates a media submit per item for images and music', () => {
    expect(estimateCost('/v1/media/queue', { model: 'google/nano-banana-3-flash', prompt: 'p' })).toMatchObject({
      min: 0.19,
      max: 0.19,
      exact: true,
    });
    expect(estimateCost('/v1/media/queue', { model: 'black-forest-labs/flux.2-klein-4b', prompt: 'p' }).max).toBe(0.04);
    expect(estimateCost('/v1/media/queue', { model: 'google/nano-banana-3-pro', prompt: 'p' }).max).toBe(0.32);
    expect(estimateCost('/v1/media/queue', { model: 'openai/gpt-image-1-mini', prompt: 'p' }).max).toBe(0.11);
    expect(estimateCost('/v1/media/queue', { model: 'google/lyria-3-clip', prompt: 'p' }).max).toBe(0.08);
    expect(estimateCost('/v1/media/queue', { model: 'google/lyria-3-pro', prompt: 'p' }).max).toBe(0.16);
  });

  it('estimates video per second of the requested duration, defaulting to the shortest', () => {
    const veo = (duration?: string) =>
      estimateCost('/v1/media/queue', { model: 'google/veo-3-lite', prompt: 'p', options: duration === undefined ? undefined : { duration } }).max;
    expect(veo('8')).toBe(0.88);
    expect(veo('6')).toBe(0.66);
    expect(veo()).toBe(0.44); // first allowed duration, 4 s
    expect(estimateCost('/v1/media/queue', { model: 'google/veo-3-fast', prompt: 'p', options: { duration: '6' } }).max).toBe(1.26);
    expect(estimateCost('/v1/media/queue', { model: 'kwaivgi/kling-v3.0-std', prompt: 'p', options: { duration: '5' } }).max).toBe(0.9);
    expect(estimateCost('/v1/media/queue', { model: 'kwaivgi/kling-v3.0-std', prompt: 'p' }).max).toBe(0.54); // 3 s
  });

  it('estimates speech per 1,000 characters with a $0.01 minimum', () => {
    const speech = (model: string, chars: number) => estimateCost('/v1/media/queue', { model, prompt: 'a'.repeat(chars) }).max;
    expect(speech('microsoft/mai-voice-2.1-flash', 1000)).toBe(0.0316);
    expect(speech('microsoft/mai-voice-2.1-flash', 2000)).toBe(0.0632);
    expect(speech('microsoft/mai-voice-2.1-flash', 10)).toBe(0.01);
    expect(speech('microsoft/mai-voice-2.1-flash', 0)).toBe(0.01);
    expect(speech('elevenlabs/eleven-v4-turbo', 1000)).toBe(0.0844);
    expect(speech('elevenlabs/eleven-v4-turbo', 50)).toBe(0.01);
  });

  it('reserves $1 for a model it does not know', () => {
    expect(estimateCost('/v1/media/queue', { model: 'someone/new-model', prompt: 'p' })).toMatchObject({ min: 1, max: 1, exact: true });
    expect(estimateMediaUsd('', '')).toBe(1);
  });

  it('has a rule and a formula for every endpoint', () => {
    for (const endpoint of Object.keys(pricing) as YepEndpoint[]) {
      const estimate = estimateCost(endpoint);
      expect(estimate.formula.length).toBeGreaterThan(0);
      expect(estimate.min).toBeGreaterThanOrEqual(0);
    }
    expect(estimateCost('/v1/media/queue').formula).toBe('Per generated item, billed when the job completes');
  });

  it('throws on an unknown endpoint', () => {
    expect(() => estimateCost('/v1/nope' as YepEndpoint)).toThrow(RangeError);
  });
});

describe('computeCost', () => {
  it('charges the flat price as an estimate', () => {
    expect(computeCost('/v1/scrape', { url: 'https://a.com' }, {})).toEqual({ costUsd: 0.01, costEstimated: true });
    expect(computeCost('/v1/scrape/stealth', { url: 'https://a.com' }, {})).toEqual({ costUsd: 0.03, costEstimated: true });
    expect(computeCost('/v1/scrape/screenshot', { url: 'https://a.com' }, {})).toEqual({ costUsd: 0.02, costEstimated: true });
  });

  it('prefers the cost the API reports for AI chat, never below the $0.01 minimum', () => {
    expect(computeCost('/v1/ai/chat', { messages: [] }, { costUsd: 0.000162 })).toEqual({ costUsd: 0.01, costEstimated: true });
    expect(computeCost('/v1/ai/chat', { messages: [] }, { costUsd: 0.042 })).toEqual({ costUsd: 0.042, costEstimated: false });
    expect(computeCost('/v1/ai/chat', { messages: [] }, { costUsd: 0.01 })).toEqual({ costUsd: 0.01, costEstimated: false });
    expect(computeCost('/v1/ai/chat', { messages: [] }, {})).toEqual({ costUsd: 0.01, costEstimated: true });
    expect(computeCost('/v1/ai/chat', { messages: [] }, { costUsd: Number.NaN })).toEqual({ costUsd: 0.01, costEstimated: true });
  });

  it('charges nothing for free endpoints', () => {
    expect(computeCost('/v1/ai/models', undefined, [])).toEqual({ costUsd: 0, costEstimated: false });
    expect(computeCost('/v1/account/balance', undefined, { balanceCents: 1, balanceUsd: 0.01 })).toEqual({ costUsd: 0, costEstimated: false });
  });

  it('charges nothing for a media submit', () => {
    expect(
      computeCost('/v1/media/queue', { model: 'google/veo-3-lite', prompt: 'p' }, { jobId: 'j', status: 'pending', model: 'm', category: 'video' }),
    ).toEqual({ costUsd: 0, costEstimated: false });
  });

  it('takes the cost a completed status reports, and nothing from any other status', () => {
    const params = { jobId: 'j' };
    expect(computeCost('/v1/media/status', params, { jobId: 'j', status: 'completed', costUsd: 0.19 })).toEqual({
      costUsd: 0.19,
      costEstimated: false,
    });
    expect(computeCost('/v1/media/status', params, { jobId: 'j', status: 'completed' })).toEqual({ costUsd: 0, costEstimated: false });
    for (const status of ['pending', 'processing', 'failed'] as const) {
      expect(computeCost('/v1/media/status', params, { jobId: 'j', status, costUsd: 0.19 })).toEqual({ costUsd: 0, costEstimated: false });
    }
  });
});
