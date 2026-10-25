import { defaultFetch, transport, type FetchLike, type TransportConfig } from './core';
import { YepApiError } from './errors';
import { computeCost, estimateCost, pricing } from './pricing';
import type { EndpointData, EndpointParams, YepEndpoint } from './types/index';

export const DEFAULT_BASE_URL = 'https://api.yepapi.com';

export interface YepCallInfo {
  endpoint: YepEndpoint;
  ok: boolean;
  /** HTTP status; 0 when no response was received. */
  status: number;
  /**
   * 0 for failed calls YepAPI never bills. When the outcome is unknown (client timeout, abort
   * mid-request, 2xx with an unusable body) it is the documented maximum, with `costEstimated`.
   */
  costUsd: number;
  costEstimated: boolean;
  /** Wall time of the whole call, retries and backoff included. */
  ms: number;
  attempts: number;
  requestId?: string;
  errorCode?: string;
}

export interface YepApiOptions {
  /** `yep_sk_...` */
  apiKey: string;
  /** Default `https://api.yepapi.com`. */
  baseUrl?: string;
  /** Default: the global `fetch`. */
  fetch?: FetchLike;
  /** Per attempt. Default 60000. */
  timeoutMs?: number;
  /**
   * Retries after the first attempt. Default 2. Free calls retry on 429, 5xx and network
   * errors. Paid calls retry only when that cannot bill twice: on 429, or when the connection
   * failed before the request was sent.
   */
  maxRetries?: number;
  /** Called once after every call, successful or not. Errors it throws are ignored. */
  onCall?: (info: YepCallInfo) => void | Promise<void>;
  /** First backoff step. Default 500. */
  retryBaseDelayMs?: number;
  /** Cap for backoff. A longer `Retry-After` stops retrying and throws the 429. Default 30000. */
  retryMaxDelayMs?: number;
}

export interface CallOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
  maxRetries?: number;
}

export interface YepResult<T> {
  data: T;
  costUsd: number;
  /** True when `costUsd` was computed from the documented price rather than reported by the API. */
  costEstimated: boolean;
  ms: number;
  status: number;
  attempts: number;
  requestId?: string;
}

type Method<E extends YepEndpoint> = (
  params: EndpointParams<E>,
  options?: CallOptions,
) => Promise<YepResult<EndpointData<E>>>;

export interface YepApi {
  /** Generic escape hatch: call any covered endpoint by path. */
  call<E extends YepEndpoint>(
    endpoint: E,
    params: EndpointParams<E>,
    options?: CallOptions,
  ): Promise<YepResult<EndpointData<E>>>;
  ai: {
    chat: Method<'/v1/ai/chat'>;
    /** Free. The docs call it keyless, but the live API rejects requests without the key. */
    models: (options?: CallOptions) => Promise<YepResult<EndpointData<'/v1/ai/models'>>>;
  };
  account: {
    /** Free. Remaining prepaid balance for the key's account. */
    balance: (options?: CallOptions) => Promise<YepResult<EndpointData<'/v1/account/balance'>>>;
  };
  scrape: {
    page: Method<'/v1/scrape'>;
    js: Method<'/v1/scrape/js'>;
    stealth: Method<'/v1/scrape/stealth'>;
    /** CSS/XPath extraction on the rendered page: logos, og:image, icons, product images. */
    extract: Method<'/v1/scrape/extract'>;
    screenshot: Method<'/v1/scrape/screenshot'>;
  };
  media: {
    /** Starts an image, video, speech or music job. Free; the job is billed when it completes. */
    queue: Method<'/v1/media/queue'>;
    /** Free. Results are inline base64 and kept for one hour, so save them as soon as they arrive. */
    status: (jobId: string, options?: CallOptions) => Promise<YepResult<EndpointData<'/v1/media/status'>>>;
  };
}

export function createYepApi(options: YepApiOptions): YepApi {
  if (typeof options.apiKey !== 'string' || options.apiKey.trim() === '') {
    throw new TypeError('createYepApi: apiKey is required');
  }
  const fetchImpl: FetchLike | undefined = options.fetch ?? defaultFetch();
  if (fetchImpl === undefined) {
    throw new TypeError('createYepApi: no global fetch available; pass options.fetch');
  }

  const cfg: TransportConfig = {
    apiKey: options.apiKey.trim(),
    baseUrl: (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, ''),
    fetch: fetchImpl,
    timeoutMs: options.timeoutMs ?? 60_000,
    maxRetries: options.maxRetries ?? 2,
    retryBaseDelayMs: options.retryBaseDelayMs ?? 500,
    retryMaxDelayMs: options.retryMaxDelayMs ?? 30_000,
  };
  const { onCall } = options;

  const report = (info: YepCallInfo): void => {
    if (onCall === undefined) return;
    try {
      void Promise.resolve(onCall(info)).catch(() => undefined);
    } catch {
      // A failing usage hook must not fail the call.
    }
  };

  async function call<E extends YepEndpoint>(
    endpoint: E,
    params: EndpointParams<E>,
    callOptions: CallOptions = {},
  ): Promise<YepResult<EndpointData<E>>> {
    const started = Date.now();
    // GET endpoints take no body. The docs call /v1/ai/models keyless, but the live API requires the key.
    const isStatus = endpoint === '/v1/media/status';
    const isGet = endpoint === '/v1/ai/models' || endpoint === '/v1/account/balance' || isStatus;
    const path = isStatus ? `/v1/media/status/${encodeURIComponent((params as { jobId: string }).jobId)}` : endpoint;
    try {
      const res = await transport(cfg, {
        endpoint: path,
        method: isGet ? 'GET' : 'POST',
        body: isGet ? undefined : (params ?? {}),
        auth: true,
        allowBareBody: isGet,
        signal: callOptions.signal,
        timeoutMs: callOptions.timeoutMs,
        maxRetries: callOptions.maxRetries,
        // Polling a status is free and safe to repeat; a media submit is not (a retry could start a second job).
        billed: pricing[endpoint].kind !== 'free' && !isStatus,
      });
      const data = res.data as EndpointData<E>;
      const { costUsd, costEstimated } = computeCost(endpoint, params, data);
      const ms = Date.now() - started;
      report({
        endpoint,
        ok: true,
        status: res.status,
        costUsd,
        costEstimated,
        ms,
        attempts: res.attempts,
        requestId: res.requestId,
      });
      return {
        data,
        costUsd,
        costEstimated,
        ms,
        status: res.status,
        attempts: res.attempts,
        requestId: res.requestId,
      };
    } catch (error) {
      const known = error instanceof YepApiError ? error : undefined;
      // The request may have completed (and been billed) upstream: count the documented
      // maximum so usage logs and budgets do not undercount. Other failures are never billed.
      const maybeBilled =
        pricing[endpoint].kind !== 'free' &&
        !isStatus &&
        (known?.code === 'TIMEOUT' ||
          known?.code === 'INVALID_RESPONSE' ||
          (known?.code === 'ABORTED' && known.requestSent !== false));
      const estimate = maybeBilled ? estimateCost(endpoint, params) : undefined;
      report({
        endpoint,
        ok: false,
        status: known?.status ?? 0,
        costUsd: estimate === undefined ? 0 : (estimate.max ?? estimate.min),
        costEstimated: estimate !== undefined,
        ms: Date.now() - started,
        attempts: known?.attempts ?? 1,
        requestId: known?.requestId,
        errorCode: known?.code,
      });
      throw error;
    }
  }

  const method =
    <E extends YepEndpoint>(endpoint: E): Method<E> =>
    (params, callOptions) =>
      call(endpoint, params, callOptions);

  return {
    call,
    ai: {
      chat: method('/v1/ai/chat'),
      models: (callOptions) => call('/v1/ai/models', undefined, callOptions),
    },
    account: {
      balance: (callOptions) => call('/v1/account/balance', undefined, callOptions),
    },
    scrape: {
      page: method('/v1/scrape'),
      js: method('/v1/scrape/js'),
      stealth: method('/v1/scrape/stealth'),
      extract: method('/v1/scrape/extract'),
      screenshot: method('/v1/scrape/screenshot'),
    },
    media: {
      queue: method('/v1/media/queue'),
      status: (jobId, callOptions) => call('/v1/media/status', { jobId }, callOptions),
    },
  };
}
