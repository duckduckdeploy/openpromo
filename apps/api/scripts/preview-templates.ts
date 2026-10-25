/**
 * Renders every scene layout in every format for a sample brand, as PNGs, to check the templates
 * by eye. No YepAPI calls.
 *
 *   pnpm --filter @openpromo/api exec tsx scripts/preview-templates.ts <out-dir> [style] [image]
 *
 * `image` is an optional picture used for screenshot, product and photo scenes.
 */
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { imageDocument } from "@openpromo/render";
import { brandProfile, creationSpec, FORMAT_KEYS, type MediaFormat, type Scene } from "@openpromo/shared";
import puppeteer from "puppeteer";

const out = path.resolve(process.argv[2] ?? "template-preview");
const style = process.argv[3] ?? "clean";
const picture = process.argv[4];

const brand = brandProfile.parse({
  identity: { name: "Crumb & Co", tagline: "Sourdough baked before sunrise", url: "https://crumbandco.example" },
  audience: {},
  positioning: { points: [{ id: "p1", title: "Baked before 6am", kind: "benefit" }] },
  voice: {},
  visual: {
    colors: { background: "#fffaf3", text: "#2b1d12", primary: "#c2410c", onPrimary: "#ffffff", accent: "#1d4ed8", muted: "#7c6a5a" },
    fonts: { heading: { family: "Fraunces", google: true }, body: { family: "Work Sans", google: true } },
    radius: 16,
  },
});

const media = picture ? { assetId: "pic", fit: "cover" as const } : null;
const scenes: Scene[] = creationSpec.parse({
  scenes: [
    { id: "hero", layout: "hero", text: { eyebrow: "New in Austin", headline: "Sourdough baked before sunrise", body: "Naturally leavened for 36 hours, on your table by breakfast.", cta: "Order for pickup" }, media },
    { id: "statement", layout: "statement", text: { eyebrow: "Our promise", headline: "Bread worth waking up for" } },
    { id: "stat", layout: "stat", text: { stat: "36h", headline: "Slow fermentation", body: "Every loaf rises for a day and a half." } },
    { id: "list", layout: "list", text: { headline: "Why Crumb & Co", bullets: ["Organic flour milled in Texas", "Baked before 6am every day", "Free pickup in East Austin"], cta: "See the menu" } },
    { id: "quote", layout: "quote", text: { headline: "The best bread in Austin, hands down.", attribution: "Austin Chronicle" } },
    { id: "screenshot", layout: "screenshot", text: { eyebrow: "Order online", headline: "Pick your loaves in two taps" }, media },
    { id: "product", layout: "product", text: { eyebrow: "Everyday loaf", headline: "Country Sourdough", body: "Crackly crust, open crumb.", stat: "$9", cta: "Order now" }, media },
    { id: "split", layout: "split", text: { headline: "From our oven to your door", body: "Pickup or delivery across Austin.", cta: "Start an order" }, media },
    { id: "offer", layout: "offer", text: { eyebrow: "This week only", stat: "20% off", headline: "your first subscription", cta: "Claim the offer" } },
    { id: "cta", layout: "cta", text: { headline: "Fresh bread, every morning", cta: "Order for pickup" } },
    { id: "photo", layout: "statement", text: { eyebrow: "Since 2019", headline: "Made by hand in East Austin" }, background: media },
  ],
}).scenes;

await mkdir(path.join(out, "assets"), { recursive: true });
const files: Record<string, { path: string; video: boolean }> = {};
if (picture) {
  await copyFile(picture, path.join(out, "assets", `pic${path.extname(picture)}`));
  files.pic = { path: `assets/pic${path.extname(picture)}`, video: false };
}

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--font-render-hinting=none"] });
const formats = (process.env.FORMATS?.split(",") as MediaFormat[] | undefined) ?? FORMAT_KEYS;
for (const format of formats) {
  for (const [i, scene] of scenes.entries()) {
    const spec = creationSpec.parse({ style, scenes: [scene] });
    const html = imageDocument({ brand, spec, format, assets: { files } }, 0);
    const file = path.join(out, `${format}-${String(i).padStart(2, "0")}-${scene.id}.html`);
    await writeFile(file, html);
    const page = await browser.newPage();
    const { MEDIA_FORMATS } = await import("@openpromo/shared");
    await page.setViewport({ width: MEDIA_FORMATS[format].width, height: MEDIA_FORMATS[format].height });
    await page.goto(pathToFileURL(file).href, { waitUntil: "networkidle0" });
    await page.waitForFunction("window.__openpromoReady === true", { timeout: 15_000 });
    const fit = await page.$eval(".scene", (el) => el.getAttribute("data-fit"));
    await page.screenshot({ path: file.replace(/\.html$/, ".png") as `${string}.png` });
    await page.close();
    console.log(`${format} ${scene.id} fit=${fit}`);
  }
}
await browser.close();
void readFile;
