import { runIngest } from "../services/ingest";
import { defineJob } from "./queue";

// Ingests open Chrome on several pages; two at a time is plenty for one server.
defineJob("brand.ingest", 2, async ({ projectId }, log) => {
  const started = Date.now();
  await runIngest(projectId);
  log.info({ projectId, ms: Date.now() - started }, "brand profile built");
});
