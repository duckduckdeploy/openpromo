import { spawn } from "node:child_process";
import { createRequire } from "node:module";

let resolved: string | null = null;

/**
 * FFMPEG_PATH, else the binary ffmpeg-static downloaded (development), else "ffmpeg" on the PATH.
 * Read from process.env rather than env.ts so the test fake can use it before the app's env exists.
 */
export function ffmpegPath(): string {
  if (resolved) return resolved;
  if (process.env.FFMPEG_PATH) return (resolved = process.env.FFMPEG_PATH);
  try {
    const bundled = createRequire(import.meta.url)("ffmpeg-static") as string | null;
    if (bundled) return (resolved = bundled);
  } catch {
    // Not installed (the Docker image uses the system ffmpeg).
  }
  return (resolved = "ffmpeg");
}

/** Runs ffmpeg with these arguments; resolves with its stderr (where it reports), rejects on a non-zero exit. */
export function ffmpeg(args: string[], options: { signal?: AbortSignal } = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath(), ["-hide_banner", "-nostdin", ...args], { signal: options.signal, windowsHide: true });
    let stderr = "";
    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
      // Keep the tail only: long renders print a progress line per frame.
      if (stderr.length > 200_000) stderr = stderr.slice(-100_000);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve(stderr);
      else reject(new Error(`ffmpeg exited with ${code}: ${stderr.trim().split("\n").slice(-4).join(" | ")}`));
    });
  });
}

/** Duration of an audio or video file in milliseconds, read from ffmpeg's report (no ffprobe needed). */
export async function mediaDurationMs(file: string): Promise<number | null> {
  // "-f null -" decodes the whole file, which gives an exact time even for VBR MP3s.
  const report = await ffmpeg(["-i", file, "-f", "null", "-"]).catch((error: Error) => error.message);
  const times = [...report.matchAll(/time=(\d+):(\d+):(\d+(?:\.\d+)?)/g)];
  const last = times.at(-1) ?? report.match(/Duration: (\d+):(\d+):(\d+(?:\.\d+)?)/);
  if (!last) return null;
  const [, h, m, s] = last;
  return Math.round((Number(h) * 3600 + Number(m) * 60 + Number(s)) * 1000);
}

/** Video width and height from ffmpeg's stream report. */
export async function videoSize(file: string): Promise<{ width: number; height: number } | null> {
  const report = await ffmpeg(["-i", file, "-f", "null", "-t", "0", "-"]).catch((error: Error) => error.message);
  const match = report.match(/Video:.*?, (\d{2,5})x(\d{2,5})/);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : null;
}
