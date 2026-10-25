import { brandProfile, type BrandProfile } from "@openpromo/shared";
import type { YepApi } from "@openpromo/yepapi";
import { eq } from "drizzle-orm";
import type { HTTPResponse } from "puppeteer";
import sharp from "sharp";
import { dataDb, schema } from "../../db";
import { env } from "../../env";
import { saveAsset } from "../../lib/media-store";
import { ingestGuardOptions } from "../../lib/ingest-guard";
import { assertSafeUrl } from "../../lib/ssrf";
import { errorMessage, getYep } from "../../lib/yep";
import { withPage } from "../browser";
import { extractBrand, findQuote, type PageText } from "./extract";
import { logoColor, normaliseLogo, svgToPng } from "./logo";
import { READ_PAGE_SCRIPT, type ReadPage } from "./page-script";
import { choosePages, googleFamilies, pickColors, pickFont } from "./visual";

type Project = typeof schema.projects.$inferSelect;

async function setProgress(projectId: string, step: string, percent: number) {
  await dataDb.update(schema.projects).set({ brandProgress: { step, percent } }).where(eq(schema.projects.id, projectId));
}

const MAX_DOWNLOAD = 12 * 1024 * 1024;

/** Opens a page in Chrome and reads it; the homepage also gets desktop and phone screenshots. */
async function readInBrowser(url: string, screenshots: boolean) {
  return withPage({ width: 1280, height: 800, untrusted: true }, async (page) => {
    const response = await page.goto(url, { waitUntil: "networkidle2", timeout: 30_000 }).catch(async (error: Error) => {
      // Busy sites never go quiet: use what loaded.
      if (/timeout/i.test(error.message)) return null;
      throw error;
    });
    if (response && response.status() >= 400) throw new Error(`The site answered ${response.status()}`);
    // Cookie banners cover the hero in screenshots; most close with a button that says so.
    await page
      .evaluate(String.raw`(() => { const b = [...document.querySelectorAll("button,a")].find((e) => /^(accept|accept all|allow all|agree|got it|ok|i agree)$/i.test((e.innerText || "").trim())); if (b) b.click(); })()`)
      .catch(() => {});
    await new Promise((r) => setTimeout(r, 800));
    const read = (await page.evaluate(READ_PAGE_SCRIPT)) as ReadPage;
    let desktop: Buffer | undefined;
    if (screenshots) desktop = Buffer.from(await page.screenshot({ type: "jpeg", quality: 85 }));
    return { read, desktop };
  });
}

async function phoneScreenshot(url: string): Promise<Buffer | undefined> {
  return withPage({ width: 390, height: 844, deviceScaleFactor: 2, untrusted: true }, async (page) => {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30_000 }).catch(() => null);
    await new Promise((r) => setTimeout(r, 800));
    return Buffer.from(await page.screenshot({ type: "jpeg", quality: 85 }));
  }).catch(() => undefined);
}

/** Downloads images through Chrome, so the same SSRF guard applies to every request and redirect. */
async function downloadImages(urls: string[]): Promise<Array<{ url: string; bytes: Buffer; mime: string } | null>> {
  if (!urls.length) return [];
  return withPage({ width: 800, height: 600, untrusted: true }, async (page) => {
    const out: Array<{ url: string; bytes: Buffer; mime: string } | null> = [];
    for (const url of urls) {
      try {
        const response: HTTPResponse | null = await page.goto(url, { waitUntil: "load", timeout: 20_000 });
        const mime = response?.headers()["content-type"]?.split(";")[0]?.trim() ?? "";
        if (!response?.ok() || !mime.startsWith("image/")) {
          out.push(null);
          continue;
        }
        const bytes = Buffer.from(await response.buffer());
        out.push(bytes.length > 0 && bytes.length <= MAX_DOWNLOAD ? { url, bytes, mime } : null);
      } catch {
        out.push(null);
      }
    }
    return out;
  });
}

function productsFromJsonLd(jsonLd: unknown[], pageUrl: string): Array<{ name: string; description: string; price: string | null; url: string | null; image: string | null }> {
  const found: Array<{ name: string; description: string; price: string | null; url: string | null; image: string | null }> = [];
  const visit = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== "object") return;
    const n = node as Record<string, unknown>;
    const types = ([] as unknown[]).concat(n["@type"] ?? []).map(String);
    if (types.includes("Product") && typeof n.name === "string") {
      const offer = ([] as unknown[]).concat(n.offers ?? [])[0] as Record<string, unknown> | undefined;
      const price = offer?.price != null ? `${offer.priceCurrency ?? ""} ${offer.price}`.trim() : null;
      const image = ([] as unknown[]).concat(n.image ?? [])[0];
      found.push({
        name: n.name,
        description: typeof n.description === "string" ? n.description.slice(0, 600) : "",
        price,
        url: typeof n.url === "string" ? n.url : null,
        image: absolute(typeof image === "string" ? image : typeof (image as { url?: unknown })?.url === "string" ? (image as { url: string }).url : null, pageUrl),
      });
    }
    for (const value of Object.values(n)) if (value && typeof value === "object") visit(value);
  };
  jsonLd.forEach(visit);
  return found.slice(0, 12);
}

function absolute(url: string | null, base: string): string | null {
  if (!url) return null;
  try {
    return new URL(url, base).href;
  } catch {
    return null;
  }
}

const get = (object: unknown, dotted: string): unknown =>
  dotted.split(".").reduce<unknown>((o, k) => (o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined), object);

function set(object: Record<string, unknown>, dotted: string, value: unknown) {
  const keys = dotted.split(".");
  let target = object;
  for (const key of keys.slice(0, -1)) {
    if (!target[key] || typeof target[key] !== "object") target[key] = {};
    target = target[key] as Record<string, unknown>;
  }
  target[keys.at(-1)!] = value;
}

/** A fresh profile, with every field the user edited by hand kept from the old one. */
export function mergeProfile(previous: BrandProfile | null, fresh: BrandProfile): BrandProfile {
  if (!previous?.edited.length) return fresh;
  const merged = structuredClone(fresh) as unknown as Record<string, unknown>;
  for (const path of previous.edited) {
    const value = get(previous, path);
    if (value !== undefined) set(merged, path, value);
  }
  merged.edited = previous.edited;
  return brandProfile.parse(merged);
}

/**
 * Reads a page with YepAPI when Chrome cannot (the site blocks headless browsers, or times out):
 * the plain fetch first ($0.01), then a rendered one ($0.02), then residential proxies ($0.03).
 */
async function readWithYep(yep: YepApi, url: string): Promise<PageText> {
  const attempts = [
    () => yep.scrape.page({ url, format: "markdown" }, { timeoutMs: 45_000 }),
    () => yep.scrape.js({ url, format: "markdown", waitFor: 2000 }, { timeoutMs: 60_000 }),
    () => yep.scrape.stealth({ url, format: "markdown", waitFor: 2500 }, { timeoutMs: 120_000 }),
  ];
  let lastError: unknown;
  for (const attempt of attempts) {
    try {
      const data = (await attempt()).data as { content?: string; markdown?: string; title?: string; statusCode?: number };
      const markdown = (data.markdown ?? data.content ?? "").slice(0, 40000);
      if (markdown.length > 200 && (data.statusCode ?? 200) < 400) return { url, title: data.title ?? null, markdown };
      lastError = new Error(`The page came back empty or blocked (${data.statusCode ?? "no status"})`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

/**
 * Builds (or rebuilds) a project's brand profile from its website. Runs as a background job;
 * progress and failures are written to the project row for the UI.
 */
export async function ingestProject(project: Project): Promise<void> {
  const projectId = project.id;
  const yep = await getYep({ userId: project.userId, projectId, feature: "brand" });
  await assertSafeUrl(project.url, ingestGuardOptions());

  await setProgress(projectId, "Reading the homepage", 5);
  let home: ReadPage | null = null;
  let desktop: Buffer | undefined;
  try {
    ({ read: home, desktop } = await readInBrowser(project.url, true));
  } catch (error) {
    console.warn(`ingest ${projectId}: browser read failed (${(error as Error).message}); using YepAPI`);
  }

  const pages: PageText[] = [];
  if (home && home.markdown.length > 200) {
    pages.push({ url: home.url, title: home.metadata.title, markdown: home.markdown });
  } else {
    pages.push(await readWithYep(yep, project.url));
    if (!desktop) {
      const shot = await yep.scrape.screenshot({ url: project.url, width: 1280, height: 800 });
      desktop = Buffer.from(shot.data.image, "base64");
    }
  }

  await setProgress(projectId, "Taking screenshots", 15);
  const phone = await phoneScreenshot(home?.url ?? project.url);
  const screenshotIds: string[] = [];
  if (desktop) {
    const asset = await saveAsset({ projectId, source: "website", role: "screenshot", name: "Homepage (desktop)", bytes: desktop, mime: "image/jpeg", meta: { url: project.url, device: "desktop" } });
    screenshotIds.push(asset.id);
  }
  if (phone) {
    const asset = await saveAsset({ projectId, source: "website", role: "screenshot", name: "Homepage (phone)", bytes: phone, mime: "image/jpeg", meta: { url: project.url, device: "phone" } });
    screenshotIds.push(asset.id);
  }

  // Other pages: the ones the homepage links to that say most about the business.
  const targets = home ? choosePages(home, env.INGEST_MAX_PAGES - 1) : [];
  const reads: ReadPage[] = home ? [home] : [];
  for (const [i, url] of targets.entries()) {
    await setProgress(projectId, `Reading ${new URL(url).pathname}`, 20 + Math.round((i / Math.max(1, targets.length)) * 40));
    try {
      const { read, desktop: shot } = await readInBrowser(url, true);
      if (read.markdown.length < 80) continue;
      reads.push(read);
      pages.push({ url: read.url, title: read.metadata.title, markdown: read.markdown });
      if (shot) {
        const asset = await saveAsset({ projectId, source: "website", role: "screenshot", name: read.metadata.title || new URL(url).pathname, bytes: shot, mime: "image/jpeg", meta: { url: read.url, device: "desktop" } });
        screenshotIds.push(asset.id);
      }
    } catch (error) {
      console.warn(`ingest ${projectId}: could not read ${url}: ${(error as Error).message}`);
    }
  }

  await dataDb.delete(schema.brandPages).where(eq(schema.brandPages.projectId, projectId));
  if (pages.length) {
    await dataDb.insert(schema.brandPages).values(
      pages.map((p, i) => ({ projectId, url: p.url, title: p.title, markdown: p.markdown, screenshotAssetId: i === 0 ? (screenshotIds[0] ?? null) : null })),
    );
  }

  // Logo: the best header candidate, else the largest icon.
  await setProgress(projectId, "Finding the logo and images", 65);
  let logoAssetId: string | null = null;
  let logoHex: string | null = null;
  if (home) {
    for (const candidate of home.logos) {
      let file: { bytes: Buffer; mime: string } | null = null;
      if (candidate.type === "svg") {
        const png = await svgToPng(candidate.markup, candidate.color);
        if (png) file = await normaliseLogo(png, "image/png");
      } else if (candidate.src) {
        const [download] = await downloadImages([candidate.src]);
        if (download) file = await normaliseLogo(download.bytes, download.mime);
      }
      if (file) {
        logoHex = await logoColor(file.bytes).catch(() => null);
        const asset = await saveAsset({ projectId, source: "website", role: "logo", name: "Logo", bytes: file.bytes, mime: file.mime, meta: { url: project.url, color: logoHex } });
        logoAssetId = asset.id;
        break;
      }
    }
    if (!logoAssetId) {
      const icon = home.icons.filter((i) => i.href).sort((a, b) => (Number.parseInt(b.sizes) || 0) - (Number.parseInt(a.sizes) || 0))[0];
      const [download] = icon?.href ? await downloadImages([icon.href]) : [];
      const file = download ? await normaliseLogo(download.bytes, download.mime) : null;
      if (file) logoAssetId = (await saveAsset({ projectId, source: "website", role: "logo", name: "Icon", bytes: file.bytes, mime: file.mime })).id;
    }
  }

  // Product photos (from structured data) and the biggest pictures on the pages.
  const jsonProducts = reads.flatMap((r) => productsFromJsonLd(r.jsonLd, r.url));
  const imageUrls = [
    ...jsonProducts.map((p) => p.image).filter((u): u is string => Boolean(u)),
    ...reads.flatMap((r) => r.images.sort((a, b) => b.width * b.height - a.width * a.height).map((i) => i.src)).filter((u): u is string => Boolean(u)),
  ];
  const uniqueImages = [...new Set(imageUrls)].slice(0, 8);
  const downloaded = await downloadImages(uniqueImages).catch(() => []);
  const productImageIds = new Map<string, string>();
  for (const download of downloaded) {
    if (!download) continue;
    // SVG artwork is stored as PNG: image models and templates take raster images.
    const file = download.mime === "image/svg+xml" ? { ...download, bytes: await sharp(download.bytes, { density: 192 }).png().toBuffer().catch(() => Buffer.alloc(0)), mime: "image/png" } : download;
    const meta = await sharp(file.bytes).metadata().catch(() => null);
    if (!meta?.width || meta.width < 300) continue;
    const isProduct = jsonProducts.some((p) => p.image === file.url);
    const asset = await saveAsset({ projectId, source: "website", role: isProduct ? "product" : "photo", name: isProduct ? "Product photo" : "Website image", bytes: file.bytes, mime: file.mime, meta: { url: file.url } });
    productImageIds.set(file.url, asset.id);
  }

  await setProgress(projectId, "Writing the brand profile", 75);
  const visual = home
    ? {
        colors: pickColors(home.colors, home.metadata.themeColor, logoHex),
        heading: pickFont(home.fonts.heading, googleFamilies(home.fonts.googleLinks)),
        body: pickFont(home.fonts.body, googleFamilies(home.fonts.googleLinks)),
        radius: Math.max(0, Math.min(48, Math.round(home.radius ?? 12))),
      }
    : null;
  const hints = [
    `Website: ${project.url}`,
    home?.metadata.siteName ? `Site name: ${home.metadata.siteName}` : "",
    home?.metadata.description ? `Meta description: ${home.metadata.description}` : "",
    jsonProducts.length ? `Structured product data: ${JSON.stringify(jsonProducts.map(({ image: _image, ...p }) => p)).slice(0, 4000)}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const { data: extracted } = await extractBrand(yep, { pages, screenshot: desktop ? { mimeType: "image/jpeg", bytes: desktop } : undefined, hints });

  // Grounding: a selling point keeps its source only when the quote is really on the site.
  const points = extracted.points.slice(0, 20).map((p, i) => {
    const url = findQuote(p.quote, pages, p.url);
    return {
      id: `p${i + 1}`,
      title: p.title.slice(0, 120),
      detail: p.detail.slice(0, 600),
      kind: p.kind,
      source: url ? { quote: p.quote.slice(0, 600), url } : null,
    };
  });

  const fresh = brandProfile.parse({
    identity: {
      name: extracted.name || home?.metadata.siteName || project.name,
      tagline: extracted.tagline,
      description: extracted.description,
      category: extracted.category,
      url: project.url,
      socials: home?.socials ?? {},
    },
    audience: { segments: extracted.audience.slice(0, 6), objections: extracted.objections.slice(0, 8) },
    positioning: { points, ctas: extracted.ctas.slice(0, 6), offers: extracted.offers.slice(0, 6) },
    voice: {
      tone: extracted.tone,
      casual: Math.round(Math.max(0, Math.min(100, extracted.casual))),
      playful: Math.round(Math.max(0, Math.min(100, extracted.playful))),
      sampleLines: extracted.sampleLines.slice(0, 6),
      avoid: extracted.avoid.slice(0, 30),
    },
    visual: {
      colors: visual?.colors ?? { background: "#ffffff", text: "#111111", primary: "#e5484d", onPrimary: "#ffffff", accent: "#1d4ed8", muted: "#6b7280", palette: [] },
      fonts: { heading: visual?.heading ?? { family: "Inter", google: true }, body: visual?.body ?? { family: "Inter", google: true } },
      logoAssetId,
      radius: visual?.radius ?? 12,
      imageryStyle: extracted.imageryStyle.slice(0, 8),
    },
    products: extracted.products.slice(0, 24).map((p) => {
      const json = jsonProducts.find((j) => j.name.toLowerCase() === p.name.toLowerCase());
      const imageId = json?.image ? productImageIds.get(json.image) : undefined;
      return { ...p, imageAssetIds: imageId ? [imageId] : [] };
    }),
    flows: extracted.flows.slice(0, 8),
  });

  const [current] = await dataDb.select({ brand: schema.projects.brand }).from(schema.projects).where(eq(schema.projects.id, projectId));
  const brand = mergeProfile(current?.brand ?? null, fresh);
  await dataDb
    .update(schema.projects)
    // A project named after its domain (the default) takes the business name once it is known.
    .set({ brand, brandStatus: "ready", brandError: null, brandProgress: null, brandUpdatedAt: new Date(), name: !project.name || project.name === project.domain ? brand.identity.name : project.name })
    .where(eq(schema.projects.id, projectId));
}

/** The job wrapper: records a failure on the project instead of throwing it away. */
export async function runIngest(projectId: string): Promise<void> {
  const [project] = await dataDb.select().from(schema.projects).where(eq(schema.projects.id, projectId));
  if (!project) return;
  try {
    await ingestProject(project);
  } catch (error) {
    await dataDb
      .update(schema.projects)
      .set({ brandStatus: "failed", brandError: errorMessage(error), brandProgress: null })
      .where(eq(schema.projects.id, projectId));
    throw error;
  }
}
