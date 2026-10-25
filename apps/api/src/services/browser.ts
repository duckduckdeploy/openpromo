import puppeteer, { type Browser, type Page } from "puppeteer";
import { env } from "../env";
import { ingestGuardOptions } from "../lib/ingest-guard";
import { createGuard, SsrfError } from "../lib/ssrf";

/**
 * One headless Chrome per process, shared by the website ingest and the renderer. Each task gets
 * its own incognito context, so cookies and storage never leak between projects.
 */

let launching: Promise<Browser> | null = null;

async function browser(): Promise<Browser> {
  if (launching) {
    const existing = await launching.catch(() => null);
    if (existing?.connected) return existing;
  }
  launching = puppeteer.launch({
    headless: true,
    executablePath: env.CHROME_PATH,
    args: [
      // Docker runs as a non-root user without user namespaces; /dev/shm is small there.
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--font-render-hinting=none",
      "--hide-scrollbars",
      "--mute-audio",
    ],
  });
  return launching;
}

export type PageOptions = {
  width: number;
  height: number;
  /** Loads pages from the internet: every request (redirects and sub-resources too) must pass the SSRF guard. */
  untrusted?: boolean;
  deviceScaleFactor?: number;
};

/**
 * Runs `task` with a fresh page and closes its context afterwards, whatever happens.
 *
 * For untrusted pages each request's host is resolved and refused when it points at a private
 * address. Chrome resolves the host again on its own, so a DNS answer that changes between the two
 * lookups is not caught; private networks are still unreachable by name or literal address.
 */
export async function withPage<T>(options: PageOptions, task: (page: Page) => Promise<T>): Promise<T> {
  const context = await (await browser()).createBrowserContext();
  try {
    const page = await context.newPage();
    await page.setViewport({ width: options.width, height: options.height, deviceScaleFactor: options.deviceScaleFactor ?? 1 });
    if (options.untrusted) {
      // Many sites refuse "HeadlessChrome"; read them as the ordinary Chrome it is.
      const agent = (await page.browser().userAgent()).replace("HeadlessChrome", "Chrome");
      await page.setUserAgent(agent);
      await page.setExtraHTTPHeaders({ "accept-language": "en-US,en;q=0.9" });
      const guard = createGuard(ingestGuardOptions());
      await page.setRequestInterception(true);
      page.on("request", (request) => {
        const url = request.url();
        if (url.startsWith("data:") || url.startsWith("blob:")) return void request.continue();
        guard.assert(url).then(
          () => request.continue(),
          () => request.abort("blockedbyclient"),
        );
      });
    }
    return await task(page);
  } finally {
    await context.close().catch(() => {});
  }
}

/** Closes the shared browser (shutdown and tests). */
export async function closeBrowser(): Promise<void> {
  const current = launching;
  launching = null;
  const instance = await current?.catch(() => null);
  await instance?.close().catch(() => {});
}

export { SsrfError };
