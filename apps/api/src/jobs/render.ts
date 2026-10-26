import type { FastifyBaseLogger } from "fastify";
import { eq } from "drizzle-orm";
import { dataDb, schema } from "../db";
import { env } from "../env";
import { runRender } from "../services/render";
import { defineJob, enqueue } from "./queue";

// Several renders run at once while their media is made; RENDER_CONCURRENCY limits only the
// drawing (Chrome and ffmpeg), which is what loads the server (see withDrawSlot).
defineJob("render.run", env.RENDER_CONCURRENCY * 4, async ({ renderId }, log) => {
  const started = Date.now();
  await runRender(renderId);
  log.info({ renderId, ms: Date.now() - started }, "render finished");
});

/**
 * Renders that were running when the worker stopped (a deploy or a restart) are queued again
 * when it starts. There is one worker per install, so a "running" render at start-up is one
 * nobody is working on. Nothing is paid twice: finished pictures and clips are reused, and media
 * jobs still open at YepAPI are picked up where they were.
 */
export async function resumeInterruptedRenders(log: FastifyBaseLogger): Promise<void> {
  const rows = await dataDb.update(schema.renders).set({ status: "queued", progress: 0 }).where(eq(schema.renders.status, "running")).returning({ id: schema.renders.id });
  for (const row of rows) await enqueue("render.run", { renderId: row.id });
  if (rows.length) log.warn({ renders: rows.map((r) => r.id) }, "resumed renders interrupted by a restart");
}
