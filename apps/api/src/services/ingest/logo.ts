import sharp from "sharp";

/** Inline SVG logos to PNG, with currentColor resolved to the colour the page painted them in. */
export async function svgToPng(markup: string, color: string): Promise<Buffer | null> {
  let svg = markup.replace(/currentColor/g, color);
  if (!/xmlns=/.test(svg)) svg = svg.replace(/<svg\b/i, '<svg xmlns="http://www.w3.org/2000/svg"');
  try {
    return await sharp(Buffer.from(svg), { density: 384 }).resize({ height: 512, withoutEnlargement: false }).png().toBuffer();
  } catch {
    return null;
  }
}

/**
 * The logo's main colour: the most common colourful, opaque pixel colour (in coarse buckets),
 * or null for black, white or grey logos.
 */
export async function logoColor(png: Buffer): Promise<string | null> {
  const { data, info } = await sharp(png).resize(64, 64, { fit: "inside" }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const buckets = new Map<string, { n: number; r: number; g: number; b: number }>();
  for (let p = 0; p < info.width * info.height; p++) {
    const [r, g, b, a] = [data[p * 4]!, data[p * 4 + 1]!, data[p * 4 + 2]!, data[p * 4 + 3]!];
    if (a < 200) continue;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max - min < 50 || max < 40) continue;
    const key = `${r >> 4},${g >> 4},${b >> 4}`;
    const bucket = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
    bucket.n++;
    bucket.r += r;
    bucket.g += g;
    bucket.b += b;
    buckets.set(key, bucket);
  }
  const top = [...buckets.values()].sort((x, y) => y.n - x.n)[0];
  if (!top || top.n < 12) return null;
  const hex = (v: number) => Math.round(v / top.n).toString(16).padStart(2, "0");
  return `#${hex(top.r)}${hex(top.g)}${hex(top.b)}`;
}

/** Plain image of the logo, cropped to its content. SVG and ICO sources become PNG. */
export async function normaliseLogo(bytes: Buffer, mime: string): Promise<{ bytes: Buffer; mime: string } | null> {
  if (mime === "image/x-icon" || mime === "image/vnd.microsoft.icon") return null;
  try {
    const png = await sharp(bytes, { density: 384 }).trim({ threshold: 4 }).png().toBuffer();
    return { bytes: png, mime: "image/png" };
  } catch {
    return null;
  }
}
