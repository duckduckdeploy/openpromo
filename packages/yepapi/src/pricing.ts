import { estimateMediaUsd } from './media-models';
import type { EndpointData, EndpointParams, YepEndpoint } from './types/index';

export type PriceRule =
  | { kind: 'free' }
  /** Fixed price per successful call. */
  | { kind: 'flat'; usd: number }
  /** Billed on token usage with a per-request minimum; the response reports the total. */
  | { kind: 'tokens'; minUsd: number }
  /**
   * Async media: the submit costs nothing; the job is billed when it completes, and its status
   * reports the charge. Estimates come from media-models.ts.
   */
  | { kind: 'media' };

const flat = (usd: number): PriceRule => ({ kind: 'flat', usd });

/** Documented USD prices, from the YepAPI billing catalog and endpoint pages. */
export const pricing: Readonly<Record<YepEndpoint, PriceRule>> = {
  '/v1/ai/chat': { kind: 'tokens', minUsd: 0.01 },
  '/v1/ai/models': { kind: 'free' },
  '/v1/account/balance': { kind: 'free' },

  '/v1/scrape': flat(0.01),
  '/v1/scrape/js': flat(0.02),
  '/v1/scrape/stealth': flat(0.03),
  '/v1/scrape/extract': flat(0.01),
  '/v1/scrape/screenshot': flat(0.02),

  '/v1/media/queue': { kind: 'media' },
  '/v1/media/status': { kind: 'media' },
};

export interface CostEstimate {
  /** Lowest USD price of the call if it succeeds. */
  min: number;
  /** Highest USD price; `null` when there is no upper bound (token-priced AI chat). */
  max: number | null;
  /** True when `min === max`. */
  exact: boolean;
  /** Human-readable price formula. */
  formula: string;
}

type Dict = Record<string, unknown>;

const asDict = (value: unknown): Dict => (value !== null && typeof value === 'object' ? (value as Dict) : {});

const finite = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) ? value : undefined;

const usd = (amount: number): string => `$${amount.toFixed(Math.round(amount * 1000) % 10 === 0 ? 2 : 3)}`;

function describe(rule: PriceRule): string {
  switch (rule.kind) {
    case 'free':
      return 'Free';
    case 'flat':
      return `${usd(rule.usd)} per call`;
    case 'tokens':
      return `Token usage, minimum ${usd(rule.minUsd)} per request`;
    case 'media':
      return 'Per generated item, billed when the job completes';
  }
}

/**
 * USD price range of a call, before it is made. Failed calls are never billed, so this is the
 * price of a successful call. For a media submit it is the estimated price of the job.
 */
export function estimateCost<E extends YepEndpoint>(endpoint: E, params?: EndpointParams<E>): CostEstimate {
  const rule = pricing[endpoint];
  if (rule === undefined) throw new RangeError(`Unknown YepAPI endpoint: ${String(endpoint)}`);
  const formula = describe(rule);
  const range = (min: number, max: number | null): CostEstimate => ({ min, max, exact: min === max, formula });
  switch (rule.kind) {
    case 'free':
      return range(0, 0);
    case 'flat':
      return range(rule.usd, rule.usd);
    case 'tokens':
      return range(rule.minUsd, null);
    case 'media': {
      if (endpoint !== '/v1/media/queue') return range(0, 0);
      const p = asDict(params);
      const estimate = estimateMediaUsd(String(p.model ?? ''), String(p.prompt ?? ''), asDict(p.options) as { duration?: string });
      return range(estimate, estimate);
    }
  }
}

export interface CallCost {
  costUsd: number;
  /** False only when the figure came from the API itself (or the endpoint is free). */
  costEstimated: boolean;
}

/**
 * USD cost of a successful call. YepAPI reports a cost on chat (`data.costUsd`) and on completed
 * media jobs (the status's `costUsd`); everything else is the documented price.
 */
export function computeCost<E extends YepEndpoint>(
  endpoint: E,
  _params: EndpointParams<E> | undefined,
  data: EndpointData<E> | unknown,
): CallCost {
  const rule = pricing[endpoint];
  const d = asDict(data);
  switch (rule.kind) {
    case 'free':
      return { costUsd: 0, costEstimated: false };
    case 'flat':
      return { costUsd: rule.usd, costEstimated: true };
    case 'tokens': {
      const reported = finite(d.costUsd);
      // YepAPI bills at least `minUsd` per request; a lower reported figure is the raw token cost.
      if (reported === undefined || reported < rule.minUsd) return { costUsd: rule.minUsd, costEstimated: true };
      return { costUsd: reported, costEstimated: false };
    }
    case 'media':
      // The submit is free; a status reports the charge once, when the job has completed.
      if (endpoint === '/v1/media/status' && d.status === 'completed') return { costUsd: finite(d.costUsd) ?? 0, costEstimated: false };
      return { costUsd: 0, costEstimated: false };
  }
}
