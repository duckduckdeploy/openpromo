import { and, eq, lt } from "drizzle-orm";
import { dataDb, schema } from "../db";
import { defineJob } from "./queue";

defineJob("maintenance.cleanup", 1, async (_data, log) => {
  const now = new Date();
  await dataDb.delete(schema.apiCache).where(lt(schema.apiCache.expiresAt, now));
  // An ingest whose worker died (restart, crash) would show "reading…" forever.
  const stale = await dataDb
    .update(schema.projects)
    .set({ brandStatus: "failed", brandError: "The website read was interrupted. Run it again.", brandProgress: null })
    .where(and(eq(schema.projects.brandStatus, "ingesting"), lt(schema.projects.updatedAt, new Date(now.getTime() - 30 * 60_000))))
    .returning({ id: schema.projects.id });
  if (stale.length) log.warn({ projects: stale.map((p) => p.id) }, "marked stale ingests failed");
});
