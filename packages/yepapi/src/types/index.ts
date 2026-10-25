import type * as Ai from './ai';
import type * as Media from './media';
import type * as Scrape from './scrape';

export type * from './ai';
export type * from './scrape';
export type * from './media';

/** Every endpoint the client covers, keyed by path. */
export interface EndpointMap {
  '/v1/ai/chat': { params: Ai.ChatParams; data: Ai.ChatData };
  '/v1/ai/models': { params: undefined; data: Ai.AiModelsData };
  '/v1/account/balance': { params: undefined; data: { balanceCents: number; balanceUsd: number; autoTopup?: boolean } };

  '/v1/scrape': { params: Scrape.ScrapeParams; data: Scrape.ScrapeData };
  '/v1/scrape/js': { params: Scrape.ScrapeJsParams; data: Scrape.ScrapeJsData };
  '/v1/scrape/stealth': { params: Scrape.ScrapeStealthParams; data: Scrape.ScrapeJsData };
  '/v1/scrape/extract': { params: Media.ExtractParams; data: Media.ExtractData };
  '/v1/scrape/screenshot': { params: Media.ScreenshotParams; data: Media.ScreenshotData };

  '/v1/media/queue': { params: Media.MediaQueueParams; data: Media.MediaQueueData };
  /** GET /v1/media/status/{jobId}: free to poll; the completed status carries the charge. */
  '/v1/media/status': { params: { jobId: string }; data: Media.MediaStatusData };
}

export type YepEndpoint = keyof EndpointMap;
export type EndpointParams<E extends YepEndpoint> = EndpointMap[E]['params'];
export type EndpointData<E extends YepEndpoint> = EndpointMap[E]['data'];
