import { afterEach, describe, expect, it, vi } from 'vitest';
import { createYepApi, type YepCallInfo } from './client';
import { backoffDelay, failedBeforeSending, parseRetryAfter } from './core';
import { YepApiError, isYepApiError } from './errors';
import { fakeFetch, reply } from './testing';

const KEY = 'yep_sk_test_secret_123';
const ok = (data: unknown, extra: Record<string, unknown> = {}) => reply(200, { ok: true, data, ...extra });
const fail = (status: number, code: string, message: string, headers: Record<string, string> = {}) =>
  reply(status, { ok: false, error: { code, message } }, headers);
const page = { url: 'https://a.com', statusCode: 200, markdown: '# A' };

async function rejection(promise: Promise<unknown>): Promise<YepApiError> {
  try {
    await promise;
  } catch (error) {
    if (isYepApiError(error)) return error;
    throw error;
  }
  throw new Error('expected the call to reject');
}

const hanging = (request: { signal?: AbortSignal }) =>
  new Promise<never>((_, reject) => {
    request.signal?.addEventListener('abort', () => reject(new Error('aborted')));
  });

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('request construction', () => {
  it('posts JSON with the key header to the default base URL, dropping undefined fields', async () => {
    const { fetch, requests } = fakeFetch(ok({ url: 'https://stripe.com/pricing', statusCode: 200, markdown: '# Pricing' }));
    const yep = createYepApi({ apiKey: KEY, fetch });
    await yep.scrape.page({ url: 'https://stripe.com/pricing', format: 'markdown', waitFor: 500, selector: undefined });
    expect(requests).toHaveLength(1);
    expect(requests[0]).toMatchObject({
      url: 'https://api.yepapi.com/v1/scrape',
      method: 'POST',
      headers: { 'x-api-key': KEY, 'Content-Type': 'application/json' },
    });
    expect(requests[0]?.body).toEqual({ url: 'https://stripe.com/pricing', format: 'markdown', waitFor: 500 });
  });

  it('sends scrape and chat options with documented names to a custom base URL', async () => {
    const { fetch, requests } = fakeFetch(ok({}));
    const yep = createYepApi({ apiKey: KEY, fetch, baseUrl: 'https://proxy.test/' });

    await yep.scrape.js({ url: 'https://react.dev', format: 'html', waitFor: 2000 });
    await yep.scrape.stealth({ url: 'https://shop.test', country: 'de' });
    await yep.scrape.extract({
      url: 'https://stripe.com',
      extractRules: { logo: 'header img@src', icons: { selector: 'link[rel*=icon]@href', type: 'list' } },
    });
    await yep.scrape.screenshot({ url: 'https://stripe.com', fullPage: true, width: 1280, height: 800 });
    await yep.ai.chat({
      model: 'openai/gpt-4o-mini',
      messages: [{ role: 'user', content: 'hi' }],
      webSearch: { max_results: 5 },
      maxTokens: 64,
    });

    expect(requests.map((r) => [r.method, r.url])).toEqual([
      ['POST', 'https://proxy.test/v1/scrape/js'],
      ['POST', 'https://proxy.test/v1/scrape/stealth'],
      ['POST', 'https://proxy.test/v1/scrape/extract'],
      ['POST', 'https://proxy.test/v1/scrape/screenshot'],
      ['POST', 'https://proxy.test/v1/ai/chat'],
    ]);
    expect(requests[0]?.body).toEqual({ url: 'https://react.dev', format: 'html', waitFor: 2000 });
    expect(requests[1]?.body).toEqual({ url: 'https://shop.test', country: 'de' });
    expect(requests[2]?.body).toEqual({
      url: 'https://stripe.com',
      extractRules: { logo: 'header img@src', icons: { selector: 'link[rel*=icon]@href', type: 'list' } },
    });
    expect(requests[3]?.body).toEqual({ url: 'https://stripe.com', fullPage: true, width: 1280, height: 800 });
    expect(requests[4]?.body).toEqual({
      model: 'openai/gpt-4o-mini',
      messages: [{ role: 'user', content: 'hi' }],
      webSearch: { max_results: 5 },
      maxTokens: 64,
    });
  });

  it('lists AI models with an authenticated GET and accepts an unwrapped body', async () => {
    const { fetch, requests } = fakeFetch(reply(200, [{ id: 'openai/gpt-4o-mini' }]));
    const yep = createYepApi({ apiKey: KEY, fetch });
    const res = await yep.ai.models();
    expect(requests[0]).toMatchObject({ url: 'https://api.yepapi.com/v1/ai/models', method: 'GET' });
    expect(requests[0]?.headers['x-api-key']).toBe(KEY);
    expect(requests[0]?.headers['Content-Type']).toBeUndefined();
    expect(requests[0]?.body).toBeUndefined();
    expect(res.data).toEqual([{ id: 'openai/gpt-4o-mini' }]);
    expect(res).toMatchObject({ costUsd: 0, costEstimated: false });
  });

  it('reads the account balance with an authenticated GET', async () => {
    const { fetch, requests } = fakeFetch(ok({ balanceCents: 1234, balanceUsd: 12.34 }));
    const yep = createYepApi({ apiKey: KEY, fetch });
    const res = await yep.account.balance();
    expect(requests[0]).toMatchObject({ url: 'https://api.yepapi.com/v1/account/balance', method: 'GET' });
    expect(requests[0]?.headers['x-api-key']).toBe(KEY);
    expect(requests[0]?.body).toBeUndefined();
    expect(res.data.balanceUsd).toBe(12.34);
    expect(res).toMatchObject({ costUsd: 0, costEstimated: false });
  });

  it('requires an API key', () => {
    expect(() => createYepApi({ apiKey: '  ' })).toThrow(TypeError);
  });
});

describe('media', () => {
  const image = { mimeType: 'image/png', base64: 'iVBORw0KGgo=' };

  it('queues a job by posting model, prompt, options and imageData', async () => {
    const { fetch, requests } = fakeFetch(
      ok({ jobId: 'job-1', status: 'pending', model: 'google/nano-banana-3-flash', category: 'image' }),
    );
    const yep = createYepApi({ apiKey: KEY, fetch });
    const res = await yep.media.queue({
      model: 'google/nano-banana-3-flash',
      prompt: 'the product on a marble table',
      options: { aspectRatio: '3:4', resolution: '2K' },
      imageData: image,
    });
    expect(requests[0]).toMatchObject({
      url: 'https://api.yepapi.com/v1/media/queue',
      method: 'POST',
      headers: { 'x-api-key': KEY, 'Content-Type': 'application/json' },
    });
    expect(requests[0]?.body).toEqual({
      model: 'google/nano-banana-3-flash',
      prompt: 'the product on a marble table',
      options: { aspectRatio: '3:4', resolution: '2K' },
      imageData: image,
    });
    expect(res.data.jobId).toBe('job-1');
    // The submit itself is free; the job is billed when it completes.
    expect(res).toMatchObject({ costUsd: 0, costEstimated: false });
  });

  it('never retries a media submit after a 5xx, which may already have started a job', async () => {
    const { fetch, requests } = fakeFetch(fail(502, 'UPSTREAM_ERROR', 'bad gateway'), ok({ jobId: 'job-2' }));
    const yep = createYepApi({ apiKey: KEY, fetch, maxRetries: 2, retryBaseDelayMs: 1 });
    const error = await rejection(yep.media.queue({ model: 'google/lyria-3-clip', prompt: 'calm bed' }));
    expect(requests).toHaveLength(1);
    expect(error).toMatchObject({ status: 502, attempts: 1 });
  });

  it('polls the status with an authenticated GET to /v1/media/status/<id> and retries it on 5xx', async () => {
    const { fetch, requests } = fakeFetch(
      fail(503, 'INTERNAL_ERROR', 'busy'),
      ok({ jobId: 'job-1', status: 'processing' }),
    );
    const yep = createYepApi({ apiKey: KEY, fetch, maxRetries: 2, retryBaseDelayMs: 1 });
    const res = await yep.media.status('job-1');
    expect(requests).toHaveLength(2);
    for (const request of requests) {
      expect(request).toMatchObject({ url: 'https://api.yepapi.com/v1/media/status/job-1', method: 'GET' });
      expect(request.headers['x-api-key']).toBe(KEY);
      expect(request.body).toBeUndefined();
    }
    expect(res.data.status).toBe('processing');
    expect(res).toMatchObject({ attempts: 2, costUsd: 0, costEstimated: false });
  });

  it('escapes the job id in the status path', async () => {
    const { fetch, requests } = fakeFetch(ok({ jobId: 'a/b c', status: 'pending' }));
    const yep = createYepApi({ apiKey: KEY, fetch });
    await yep.media.status('a/b c');
    expect(requests[0]?.url).toBe('https://api.yepapi.com/v1/media/status/a%2Fb%20c');
  });

  it('reports a cost through onCall only for a completed status', async () => {
    const calls: YepCallInfo[] = [];
    const { fetch } = fakeFetch(
      ok({ jobId: 'job-1', status: 'pending', model: 'google/veo-3-lite', category: 'video' }),
      ok({ jobId: 'job-1', status: 'processing', costUsd: 0.5 }),
      ok({ jobId: 'job-1', status: 'failed', error: 'safety filter' }),
      ok({ jobId: 'job-1', status: 'completed', costUsd: 0.66, result: { video: { mimeType: 'video/mp4', base64: 'AAAA' } } }),
    );
    const yep = createYepApi({
      apiKey: KEY,
      fetch,
      onCall: (info) => {
        calls.push(info);
      },
    });
    await yep.media.queue({ model: 'google/veo-3-lite', prompt: 'b-roll', options: { duration: '6' } });
    await yep.media.status('job-1');
    await yep.media.status('job-1');
    const done = await yep.media.status('job-1');
    expect(done).toMatchObject({ costUsd: 0.66, costEstimated: false });
    expect(calls.map((c) => [c.endpoint, c.ok, c.costUsd, c.costEstimated])).toEqual([
      ['/v1/media/queue', true, 0, false],
      ['/v1/media/status', true, 0, false],
      ['/v1/media/status', true, 0, false],
      ['/v1/media/status', true, 0.66, false],
    ]);
  });
});

describe('envelope and cost', () => {
  it('unwraps data and charges the flat price of a paid call', async () => {
    const { fetch } = fakeFetch(reply(200, { ok: true, request_id: 'req-1', data: page }));
    const yep = createYepApi({ apiKey: KEY, fetch });
    const res = await yep.scrape.page({ url: 'https://a.com' });
    expect(res.data.markdown).toBe('# A');
    expect(res.data.statusCode).toBe(200);
    expect(res).toMatchObject({
      costUsd: 0.01,
      costEstimated: true,
      status: 200,
      attempts: 1,
      requestId: 'req-1',
    });
    expect(res.ms).toBeGreaterThanOrEqual(0);
  });

  it('takes the request id from the x-request-id header when the body has none', async () => {
    const { fetch } = fakeFetch(
      reply(200, { ok: true, data: { url: 'https://a.com', statusCode: 200, content: '', format: 'html' } }, { 'X-Request-Id': 'hdr-7' }),
    );
    const yep = createYepApi({ apiKey: KEY, fetch });
    const res = await yep.scrape.js({ url: 'https://a.com' });
    expect(res).toMatchObject({ requestId: 'hdr-7', costUsd: 0.02, costEstimated: true });
  });

  it('uses the costUsd reported by AI chat and exposes sources', async () => {
    const { fetch } = fakeFetch(
      ok({
        model: 'openai/gpt-4o-mini',
        message: { role: 'assistant', content: 'Rust 1.99.0' },
        sources: [{ url: 'https://github.com/rust-lang/rust/releases', title: 'Releases' }],
        usage: { promptTokens: 1820, completionTokens: 42, totalTokens: 1862 },
        costUsd: 0.02,
      }),
    );
    const yep = createYepApi({ apiKey: KEY, fetch });
    const res = await yep.ai.chat({ messages: [{ role: 'user', content: 'rust?' }], webSearch: true });
    expect(res.data.sources?.[0]?.url).toBe('https://github.com/rust-lang/rust/releases');
    expect(res).toMatchObject({ costUsd: 0.02, costEstimated: false });
  });

  it('charges the $0.01 minimum when AI chat reports less or nothing', async () => {
    const usage = { promptTokens: 3, completionTokens: 1, totalTokens: 4 };
    const message = { role: 'assistant', content: 'hi' };
    const { fetch } = fakeFetch(ok({ model: 'm', message, usage, costUsd: 0.0001 }), ok({ model: 'm', message, usage }));
    const yep = createYepApi({ apiKey: KEY, fetch });
    expect(await yep.ai.chat({ messages: [] })).toMatchObject({ costUsd: 0.01, costEstimated: true });
    expect(await yep.ai.chat({ messages: [] })).toMatchObject({ costUsd: 0.01, costEstimated: true });
  });

  it('rejects a 2xx body that is not an envelope', async () => {
    const { fetch } = fakeFetch(reply(200, { hello: 'world' }));
    const yep = createYepApi({ apiKey: KEY, fetch });
    const error = await rejection(yep.scrape.page({ url: 'https://example.com' }));
    expect(error).toMatchObject({ code: 'INVALID_RESPONSE', status: 200, kind: 'invalid_response' });
  });

  it('rejects a 2xx body with ok: false, even on a GET that accepts bare bodies', async () => {
    const { fetch } = fakeFetch(reply(200, { ok: false, error: { code: 'INTERNAL_ERROR', message: 'oops' } }));
    const yep = createYepApi({ apiKey: KEY, fetch, maxRetries: 0 });
    const error = await rejection(yep.account.balance());
    expect(error).toMatchObject({ status: 200, code: 'INTERNAL_ERROR' });
    expect(error.message).toContain('oops');
  });
});

describe('error mapping', () => {
  const cases: Array<[number, string, Partial<Record<keyof YepApiError, unknown>>]> = [
    [401, 'INVALID_API_KEY', { isInvalidKey: true, isAuthError: true, kind: 'invalid_key' }],
    [401, 'REVOKED_API_KEY', { isInvalidKey: true, isAuthError: true, kind: 'invalid_key' }],
    [403, 'ACCOUNT_FROZEN', { isAccountFrozen: true, isAuthError: true, isInvalidKey: false, kind: 'account_frozen' }],
    [402, 'NO_CREDITS', { isInsufficientBalance: true, kind: 'insufficient_balance' }],
    [400, 'VALIDATION_ERROR', { isValidation: true, kind: 'validation' }],
    [404, 'NOT_FOUND', { isNotFound: true, kind: 'not_found' }],
  ];

  it.each(cases)('maps %i %s without retrying', async (status, code, flags) => {
    const { fetch, requests } = fakeFetch(fail(status, code, 'nope'));
    const yep = createYepApi({ apiKey: KEY, fetch, retryBaseDelayMs: 1 });
    const error = await rejection(yep.scrape.page({ url: 'https://vercel.com' }));
    expect(error).toBeInstanceOf(YepApiError);
    expect(error).toBeInstanceOf(Error);
    expect(error).toMatchObject({
      name: 'YepApiError',
      status,
      code,
      endpoint: '/v1/scrape',
      attempts: 1,
      isRetryable: false,
      ...flags,
    });
    expect(error.message).toContain('nope');
    expect(requests).toHaveLength(1);
  });

  it('maps JOB_NOT_FOUND on a media status to not_found without retrying', async () => {
    const { fetch, requests } = fakeFetch(fail(404, 'JOB_NOT_FOUND', 'no such job'));
    const yep = createYepApi({ apiKey: KEY, fetch, retryBaseDelayMs: 1 });
    const error = await rejection(yep.media.status('gone'));
    expect(error).toMatchObject({ status: 404, code: 'JOB_NOT_FOUND', endpoint: '/v1/media/status/gone', kind: 'not_found' });
    expect(requests).toHaveLength(1);
  });

  it('carries request id and upstream context', async () => {
    const { fetch } = fakeFetch(
      reply(502, {
        ok: false,
        request_id: '3f1c9e2a',
        error: {
          code: 'UPSTREAM_ERROR',
          message: 'Upstream data source returned an error',
          upstream: { status: 500, message: 'Internal server error' },
        },
      }),
    );
    const yep = createYepApi({ apiKey: KEY, fetch, maxRetries: 0 });
    const error = await rejection(yep.scrape.js({ url: 'https://stripe.com' }));
    expect(error).toMatchObject({
      status: 502,
      code: 'UPSTREAM_ERROR',
      requestId: '3f1c9e2a',
      upstream: { status: 500, message: 'Internal server error' },
      isServerError: true,
      kind: 'server',
    });
  });

  it('does not treat a bare 403 without a YepAPI envelope as a frozen account', async () => {
    const { fetch } = fakeFetch({ status: 403, text: '<html>Attention Required! | Cloudflare</html>' });
    const yep = createYepApi({ apiKey: KEY, fetch, maxRetries: 0 });
    const error = await rejection(yep.scrape.extract({ url: 'https://a.com', extractRules: {} }));
    expect(error).toMatchObject({ status: 403, code: 'HTTP_403', isAccountFrozen: false, isAuthError: false, kind: 'unknown' });
  });

  it('maps a plain-string error body', async () => {
    const { fetch } = fakeFetch(reply(400, { ok: false, error: 'Pass a url.' }));
    const yep = createYepApi({ apiKey: KEY, fetch });
    const error = await rejection(yep.scrape.page({ url: '' }));
    expect(error).toMatchObject({ status: 400, code: 'HTTP_400', isValidation: true, kind: 'validation' });
    expect(error.message).toContain('Pass a url.');
  });

  it('handles non-JSON error bodies', async () => {
    const { fetch } = fakeFetch({ status: 504, text: '<html>Gateway Timeout</html>' });
    const yep = createYepApi({ apiKey: KEY, fetch, maxRetries: 0 });
    const error = await rejection(yep.scrape.screenshot({ url: 'https://vercel.com' }));
    expect(error).toMatchObject({ status: 504, code: 'HTTP_504', isRetryable: true });
  });

  it('never leaks the API key, even if the server echoes it', async () => {
    const { fetch } = fakeFetch(fail(401, 'INVALID_API_KEY', `key ${KEY} is invalid`));
    const yep = createYepApi({ apiKey: KEY, fetch });
    const error = await rejection(yep.ai.chat({ messages: [{ role: 'user', content: 'a' }] }));
    expect(error.message).not.toContain(KEY);
    expect(error.message).toContain('[redacted]');
    expect(JSON.stringify(error)).not.toContain(KEY);
    expect(String(error.stack)).not.toContain(KEY);
  });

  it('never leaks the API key in network error messages', async () => {
    const { fetch } = fakeFetch(new TypeError(`connect failed for ${KEY}`, { cause: { code: 'ECONNREFUSED' } }));
    const yep = createYepApi({ apiKey: KEY, fetch, maxRetries: 0 });
    const error = await rejection(yep.media.status('job-1'));
    expect(error.code).toBe('NETWORK_ERROR');
    expect(error.message).not.toContain(KEY);
    expect(error.message).toContain('[redacted]');
  });
});

describe('retries', () => {
  it('retries free calls on 5xx and network errors with exponential backoff, then succeeds', async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(1);
    const { fetch, requests } = fakeFetch(
      fail(502, 'UPSTREAM_ERROR', 'bad gateway'),
      new TypeError('fetch failed'),
      ok({ balanceCents: 500, balanceUsd: 5 }),
    );
    const yep = createYepApi({ apiKey: KEY, fetch, maxRetries: 2, retryBaseDelayMs: 100 });
    const pending = yep.account.balance();

    await vi.advanceTimersByTimeAsync(0);
    expect(requests).toHaveLength(1);
    await vi.advanceTimersByTimeAsync(99);
    expect(requests).toHaveLength(1);
    await vi.advanceTimersByTimeAsync(1); // first backoff: 100 ms
    expect(requests).toHaveLength(2);
    await vi.advanceTimersByTimeAsync(199);
    expect(requests).toHaveLength(2);
    await vi.advanceTimersByTimeAsync(1); // second backoff: 200 ms
    expect(requests).toHaveLength(3);

    const res = await pending;
    expect(res).toMatchObject({ attempts: 3, costUsd: 0 });
    expect(res.ms).toBe(300);
  });

  it('never retries a paid call after a 5xx or a connection lost mid-call, which may have been billed', async () => {
    for (const failure of [fail(502, 'UPSTREAM_ERROR', 'bad gateway'), new TypeError('fetch failed', { cause: { code: 'ECONNRESET' } })]) {
      for (const call of [
        (yep: ReturnType<typeof createYepApi>) => yep.scrape.page({ url: 'https://a.com' }),
        (yep: ReturnType<typeof createYepApi>) => yep.ai.chat({ messages: [] }),
      ]) {
        const { fetch, requests } = fakeFetch(failure, ok(page));
        const yep = createYepApi({ apiKey: KEY, fetch, maxRetries: 2, retryBaseDelayMs: 1 });
        const error = await rejection(call(yep));
        expect(requests).toHaveLength(1);
        expect(error.attempts).toBe(1);
      }
    }
  });

  it('retries a paid call when the connection failed before the request was sent', async () => {
    const refused = new TypeError('fetch failed', { cause: { code: 'ECONNREFUSED' } });
    const { fetch, requests } = fakeFetch(refused, ok({ url: 'https://a.com', statusCode: 200, content: '', format: 'markdown' }));
    const yep = createYepApi({ apiKey: KEY, fetch, maxRetries: 2, retryBaseDelayMs: 1 });
    const res = await yep.scrape.stealth({ url: 'https://a.com' });
    expect(requests).toHaveLength(2);
    expect(res).toMatchObject({ attempts: 2, costUsd: 0.03 });
  });

  it('tells connection failures before sending apart from ones after', () => {
    expect(failedBeforeSending({ code: 'ECONNREFUSED' })).toBe(true);
    expect(failedBeforeSending(new TypeError('fetch failed', { cause: { code: 'ENOTFOUND' } }))).toBe(true);
    expect(failedBeforeSending({ errors: [{ code: 'ECONNREFUSED' }, { code: 'EHOSTUNREACH' }] })).toBe(true);
    expect(failedBeforeSending({ errors: [{ code: 'ECONNREFUSED' }, { code: 'ECONNRESET' }] })).toBe(false);
    expect(failedBeforeSending({ code: 'ECONNRESET' })).toBe(false);
    expect(failedBeforeSending(new TypeError('fetch failed'))).toBe(false);
    expect(failedBeforeSending(undefined)).toBe(false);
  });

  it('honours Retry-After on 429, even for a paid call', async () => {
    vi.useFakeTimers();
    const { fetch, requests } = fakeFetch(fail(429, 'RATE_LIMITED', 'slow down', { 'Retry-After': '2' }), ok(page));
    const yep = createYepApi({ apiKey: KEY, fetch, retryBaseDelayMs: 1 });
    const pending = yep.scrape.page({ url: 'https://a.com' });
    await vi.advanceTimersByTimeAsync(1999);
    expect(requests).toHaveLength(1);
    await vi.advanceTimersByTimeAsync(1);
    expect(requests).toHaveLength(2);
    expect(await pending).toMatchObject({ attempts: 2, costUsd: 0.01 });
  });

  it('stops retrying when Retry-After exceeds retryMaxDelayMs', async () => {
    const { fetch, requests } = fakeFetch(fail(429, 'RATE_LIMITED', 'slow down', { 'Retry-After': '120' }), ok(page));
    const yep = createYepApi({ apiKey: KEY, fetch, retryMaxDelayMs: 30_000 });
    const error = await rejection(yep.scrape.page({ url: 'https://a.com' }));
    expect(requests).toHaveLength(1);
    expect(error).toMatchObject({ status: 429, isRateLimited: true, retryAfterMs: 120_000, attempts: 1 });
  });

  it('gives up after maxRetries and reports the last error', async () => {
    const { fetch, requests } = fakeFetch(fail(429, 'RATE_LIMITED', 'slow down'));
    const yep = createYepApi({ apiKey: KEY, fetch, maxRetries: 2, retryBaseDelayMs: 1 });
    const error = await rejection(yep.scrape.page({ url: 'https://a.com' }));
    expect(requests).toHaveLength(3);
    expect(error).toMatchObject({ status: 429, isRateLimited: true, kind: 'rate_limited', attempts: 3 });
  });

  it('wraps network failures after retries are exhausted', async () => {
    const { fetch, requests } = fakeFetch(new TypeError('fetch failed', { cause: { code: 'ECONNREFUSED' } }));
    const yep = createYepApi({ apiKey: KEY, fetch, maxRetries: 1, retryBaseDelayMs: 1 });
    const error = await rejection(yep.scrape.js({ url: 'https://react.dev' }));
    expect(requests).toHaveLength(2);
    expect(error).toMatchObject({ status: 0, code: 'NETWORK_ERROR', kind: 'network', attempts: 2, requestSent: false });
    expect(error.cause).toBeInstanceOf(TypeError);
  });

  it('allows a per-call maxRetries override', async () => {
    const { fetch, requests } = fakeFetch(fail(500, 'INTERNAL_ERROR', 'boom'));
    const yep = createYepApi({ apiKey: KEY, fetch, retryBaseDelayMs: 1 });
    await rejection(yep.account.balance({ maxRetries: 0 }));
    expect(requests).toHaveLength(1);
  });

  it('computes backoff and Retry-After values', () => {
    expect(backoffDelay(0, 500, 30_000, () => 0)).toBe(250);
    expect(backoffDelay(0, 500, 30_000, () => 1)).toBe(500);
    expect(backoffDelay(3, 500, 30_000, () => 1)).toBe(4000);
    expect(backoffDelay(20, 500, 30_000, () => 1)).toBe(30_000);
    expect(parseRetryAfter('3')).toBe(3000);
    expect(parseRetryAfter(null)).toBeUndefined();
    expect(parseRetryAfter('Wed, 21 Oct 2026 07:28:10 GMT', Date.parse('Wed, 21 Oct 2026 07:28:00 GMT'))).toBe(10_000);
  });
});

describe('timeout and abort', () => {
  it('times out via AbortController and does not retry', async () => {
    vi.useFakeTimers();
    const { fetch, requests } = fakeFetch(hanging);
    const yep = createYepApi({ apiKey: KEY, fetch, timeoutMs: 1000 });
    const pending = rejection(yep.scrape.screenshot({ url: 'https://vercel.com' }));
    await vi.advanceTimersByTimeAsync(1000);
    const error = await pending;
    expect(error).toMatchObject({ code: 'TIMEOUT', status: 0, isTimeout: true, kind: 'timeout' });
    expect(requests).toHaveLength(1);
  });

  it('honours a per-call timeout', async () => {
    vi.useFakeTimers();
    const { fetch } = fakeFetch(hanging);
    const yep = createYepApi({ apiKey: KEY, fetch, timeoutMs: 60_000 });
    const pending = rejection(yep.media.status('job-1', { timeoutMs: 50 }));
    await vi.advanceTimersByTimeAsync(50);
    expect(await pending).toMatchObject({ code: 'TIMEOUT' });
  });

  it('aborts on the caller signal, including during backoff', async () => {
    const inFlight = new AbortController();
    const first = fakeFetch(hanging);
    const yep = createYepApi({ apiKey: KEY, fetch: first.fetch });
    const pending = rejection(yep.scrape.page({ url: 'https://a.com' }, { signal: inFlight.signal }));
    inFlight.abort();
    expect(await pending).toMatchObject({ code: 'ABORTED', isAborted: true, kind: 'aborted' });
    expect(first.requests).toHaveLength(1);

    const waiting = new AbortController();
    const second = fakeFetch(fail(429, 'RATE_LIMITED', 'slow down'));
    const slow = createYepApi({ apiKey: KEY, fetch: second.fetch, retryBaseDelayMs: 60_000 });
    const backingOff = rejection(slow.scrape.page({ url: 'https://a.com' }, { signal: waiting.signal }));
    await new Promise((resolve) => setTimeout(resolve, 5));
    waiting.abort();
    expect(await backingOff).toMatchObject({ code: 'ABORTED', requestSent: false });
    expect(second.requests).toHaveLength(1);
  });
});

describe('onCall', () => {
  it('reports successes and failures, and ignores hook errors', async () => {
    const calls: YepCallInfo[] = [];
    const { fetch } = fakeFetch(ok(page), fail(402, 'NO_CREDITS', 'top up'));
    const yep = createYepApi({
      apiKey: KEY,
      fetch,
      onCall: (info) => {
        calls.push(info);
        throw new Error('hook failure');
      },
    });
    await yep.scrape.page({ url: 'https://a.com' });
    await rejection(yep.scrape.page({ url: 'https://b.com' }));
    expect(calls).toHaveLength(2);
    expect(calls[0]).toMatchObject({
      endpoint: '/v1/scrape',
      ok: true,
      status: 200,
      costUsd: 0.01,
      costEstimated: true,
      attempts: 1,
    });
    expect(calls[1]).toMatchObject({
      endpoint: '/v1/scrape',
      ok: false,
      status: 402,
      costUsd: 0,
      errorCode: 'NO_CREDITS',
    });
    expect(typeof calls[0]?.ms).toBe('number');
  });

  it('ignores rejected async hooks', async () => {
    const { fetch } = fakeFetch(ok(page));
    const yep = createYepApi({ apiKey: KEY, fetch, onCall: async () => Promise.reject(new Error('hook failure')) });
    await expect(yep.scrape.page({ url: 'https://a.com' })).resolves.toMatchObject({ costUsd: 0.01 });
  });

  it('reports the estimated maximum for failures that may have been billed upstream', async () => {
    const calls: YepCallInfo[] = [];
    const onCall = (info: YepCallInfo) => {
      calls.push(info);
    };

    const invalid = createYepApi({ apiKey: KEY, fetch: fakeFetch({ status: 200, text: '' }).fetch, onCall });
    await rejection(invalid.scrape.stealth({ url: 'https://a.com' }));
    expect(calls[0]).toMatchObject({ ok: false, errorCode: 'INVALID_RESPONSE', costUsd: 0.03, costEstimated: true });

    const inFlight = new AbortController();
    const aborting = createYepApi({ apiKey: KEY, fetch: fakeFetch(hanging).fetch, onCall });
    const aborted = rejection(aborting.ai.chat({ messages: [] }, { signal: inFlight.signal }));
    inFlight.abort();
    await aborted;
    expect(calls[1]).toMatchObject({ errorCode: 'ABORTED', costUsd: 0.01, costEstimated: true });

    const before = new AbortController();
    before.abort();
    await rejection(aborting.scrape.page({ url: 'https://a.com' }, { signal: before.signal }));
    expect(calls[2]).toMatchObject({ errorCode: 'ABORTED', costUsd: 0, costEstimated: false });

    // A media submit whose outcome is unknown may have started a job: count the job's estimate.
    await rejection(invalid.media.queue({ model: 'google/veo-3-lite', prompt: 'b-roll', options: { duration: '8' } }));
    expect(calls[3]).toMatchObject({ endpoint: '/v1/media/queue', errorCode: 'INVALID_RESPONSE', costUsd: 0.88, costEstimated: true });

    vi.useFakeTimers();
    const slow = createYepApi({ apiKey: KEY, fetch: fakeFetch(hanging).fetch, timeoutMs: 1000, onCall });
    const timing = rejection(slow.scrape.screenshot({ url: 'https://vercel.com' }));
    await vi.advanceTimersByTimeAsync(1000);
    await timing;
    expect(calls[4]).toMatchObject({ errorCode: 'TIMEOUT', costUsd: 0.02, costEstimated: true });

    // Free calls and status polls never bill, whatever happened.
    await rejection(createYepApi({ apiKey: KEY, fetch: fakeFetch({ status: 200, text: '' }).fetch, onCall }).account.balance());
    expect(calls[5]).toMatchObject({ errorCode: 'INVALID_RESPONSE', costUsd: 0, costEstimated: false });

    const polling = rejection(slow.media.status('job-1'));
    await vi.advanceTimersByTimeAsync(1000);
    await polling;
    expect(calls[6]).toMatchObject({ endpoint: '/v1/media/status', errorCode: 'TIMEOUT', costUsd: 0, costEstimated: false });
  });
});
