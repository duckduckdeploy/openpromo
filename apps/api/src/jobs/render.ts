import { env } from "../env";
import { runRender } from "../services/render";
import { defineJob } from "./queue";

// Rendering runs Chrome and ffmpeg flat out; RENDER_CONCURRENCY keeps it within the server's means.
defineJob("render.run", env.RENDER_CONCURRENCY, async ({ renderId }, log) => {
  const started = Date.now();
  await runRender(renderId);
  log.info({ renderId, ms: Date.now() - started }, "render finished");
});
