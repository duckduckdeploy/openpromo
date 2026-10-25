/**
 * Runs before every integration test file, in that file's module context:
 *  - a fake YepAPI on a random port (src/testing/fake-yepapi.ts)
 *  - the environment the API validates at import time
 *  - `../src/db` replaced by two in-memory Postgres databases (PGlite), core and project data,
 *    each with its real migrations applied
 *  - `../src/jobs/queue` replaced by a recorder, so tests run job handlers themselves
 *  - MEDIA_DIR in a temporary folder, removed afterwards
 */
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, vi } from "vitest";
import { startFakeYepApi } from "../src/testing/fake-yepapi";
import { harness } from "./harness";

const fake = await startFakeYepApi();
harness.fake = fake;
const mediaDir = await mkdtemp(path.join(tmpdir(), "openpromo-media-"));

Object.assign(process.env, {
  NODE_ENV: "test",
  DATABASE_URL: "postgres://unused-in-tests",
  AUTH_SECRET: "test-secret-that-is-long-enough-for-better-auth",
  ENCRYPTION_KEY: Buffer.alloc(32, 7).toString("base64"),
  YEPAPI_BASE_URL: fake.url,
  APP_URL: "http://localhost:3200",
  API_URL: "http://localhost:4100",
  WEB_URL: "http://localhost:3101",
  RUN_WORKER: "false",
  MEDIA_DIR: mediaDir,
  // The ingest test serves a sample website on 127.0.0.1. The guard itself is tested in src/lib/url-ssrf.test.ts.
  INGEST_ALLOW_PRIVATE_NETWORK: "true",
  INGEST_MAX_PAGES: "4",
});

vi.mock("../src/db", async () => {
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  const schema = await import("../src/db/schema");
  const coreSchema = await import("../src/db/core-schema");
  const dataSchema = await import("../src/db/data-schema");
  // Two separate in-memory databases, as in production: a query sent to the wrong one fails.
  const client = new PGlite();
  const dataClient = new PGlite();
  const db = drizzle(client, { schema: coreSchema });
  const dataDb = drizzle(dataClient, { schema: dataSchema });
  await migrate(db, { migrationsFolder: fileURLToPath(new URL("../drizzle", import.meta.url)) });
  await migrate(dataDb, { migrationsFolder: fileURLToPath(new URL("../drizzle-data", import.meta.url)) });
  const { harness } = await import("./harness");
  harness.pg = client;
  harness.dataPg = dataClient;
  const end = { end: async () => {} };
  return { db, dataDb, schema, pool: end, dataPool: end, dataDatabaseUrl: () => "postgres://unused-in-tests" };
});

vi.mock("../src/jobs/queue", async () => {
  const { harness } = await import("./harness");
  return {
    enqueue: async (name: string, data: unknown) => {
      if (harness.queueDown) throw new Error("queue is down");
      harness.enqueued.push({ name, data });
    },
    defineJob: (name: string, _concurrency: number, handler: (data: unknown, log: unknown) => Promise<void>) => {
      harness.jobs.set(name, handler);
    },
    startWorker: async () => {},
    stopWorker: async () => {},
  };
});

afterAll(async () => {
  const { closeBrowser } = await import("../src/services/browser");
  await closeBrowser();
  await fake.close();
  await rm(mediaDir, { recursive: true, force: true });
  await harness.pg?.close();
  await harness.dataPg?.close();
});
