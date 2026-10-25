/**
 * The project database: brand profiles, assets, ideas, creations and renders, kept apart from
 * accounts and billing (core-schema.ts). Users live in the core database, so the userId columns
 * here carry no foreign key: anything that deletes a user must delete the user's projects and
 * cache rows here too. Files themselves live on disk under MEDIA_DIR (lib/media-store.ts); rows
 * hold their paths.
 */
import { relations } from "drizzle-orm";
import { doublePrecision, index, integer, jsonb, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";

import type { BrandProfile, CreationSpec, CreationType, IdeaGoal, MediaFormat } from "@openpromo/shared";
import { createdAt, updatedAt } from "./columns";

export const apiCache = pgTable(
  "api_cache",
  {
    userId: text("user_id").notNull(),
    key: text("key").notNull(),
    payload: jsonb("payload").notNull(),
    costUsd: doublePrecision("cost_usd").notNull().default(0),
    createdAt: createdAt(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.key] }), index("api_cache_expiry_idx").on(t.expiresAt)],
);

// ── Projects and their brand profile ───────────────────────────────────────

export type BrandStatus = "new" | "ingesting" | "ready" | "failed";

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    // The website the project is about: the start page of the ingest.
    url: text("url").notNull(),
    domain: text("domain").notNull(),
    language: text("language").notNull().default("en"),
    // What the ingest found, merged with the user's edits. Edited fields are listed in
    // brand.edited, so a later ingest leaves them alone.
    brand: jsonb("brand").$type<BrandProfile | null>(),
    brandStatus: text("brand_status").$type<BrandStatus>().notNull().default("new"),
    brandError: text("brand_error"),
    // Progress of a running ingest, for the UI: a step label and 0–100.
    brandProgress: jsonb("brand_progress").$type<{ step: string; percent: number } | null>(),
    brandUpdatedAt: timestamp("brand_updated_at", { withTimezone: true }),
    // Free-form notes shared with agents over MCP (goals, campaigns, things to avoid).
    context: jsonb("context").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("projects_user_idx").on(t.userId)],
);

/** Pages read during the ingest: the text that selling points and on-screen claims are checked against. */
export const brandPages = pgTable(
  "brand_pages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    title: text("title"),
    markdown: text("markdown").notNull().default(""),
    screenshotAssetId: uuid("screenshot_asset_id"),
    fetchedAt: createdAt(),
  },
  (t) => [index("brand_pages_project_idx").on(t.projectId)],
);

// ── Assets: every file a project has ───────────────────────────────────────

export type AssetKind = "image" | "video" | "audio" | "document";
/** Where the file came from. */
export type AssetSource = "website" | "upload" | "generated" | "render";
/** What it is for; drives where the library shows it and what tools offer it for. */
export type AssetRole =
  | "logo"
  | "screenshot"
  | "product"
  | "photo"
  | "background"
  | "broll"
  | "voice"
  | "music"
  | "output"
  | "poster"
  | "captions";

export const assets = pgTable(
  "assets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    kind: text("kind").$type<AssetKind>().notNull(),
    source: text("source").$type<AssetSource>().notNull(),
    role: text("role").$type<AssetRole>().notNull(),
    name: text("name").notNull(),
    // Relative to MEDIA_DIR, e.g. "<projectId>/<assetId>.webp".
    path: text("path").notNull(),
    mime: text("mime").notNull(),
    bytes: integer("bytes").notNull().default(0),
    width: integer("width"),
    height: integer("height"),
    durationMs: integer("duration_ms"),
    // For generated files: the model and prompt, so a result can be explained and re-made.
    model: text("model"),
    prompt: text("prompt"),
    costUsd: doublePrecision("cost_usd").notNull().default(0),
    // The page an asset was taken from, alt text, colours, word timings for voice…
    meta: jsonb("meta").$type<Record<string, unknown>>().notNull().default({}),
    creationId: uuid("creation_id"),
    createdAt: createdAt(),
  },
  (t) => [index("assets_project_idx").on(t.projectId, t.role), index("assets_creation_idx").on(t.creationId)],
);

// ── Ideas ──────────────────────────────────────────────────────────────────

export type IdeaStatus = "new" | "used" | "archived";

export const ideas = pgTable(
  "ideas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    goal: text("goal").$type<IdeaGoal>().notNull(),
    channel: text("channel").notNull(),
    // What the idea is best made as.
    type: text("type").$type<CreationType>().notNull(),
    title: text("title").notNull(),
    hook: text("hook").notNull(),
    body: text("body").notNull().default(""),
    caption: text("caption").notNull().default(""),
    hashtags: text("hashtags").array().notNull().default([]),
    cta: text("cta"),
    // Selling points (by id in brand.positioning) the idea rests on.
    pointIds: text("point_ids").array().notNull().default([]),
    status: text("status").$type<IdeaStatus>().notNull().default("new"),
    // Optional slot on the content calendar (a date, no time).
    plannedFor: text("planned_for"),
    createdAt: createdAt(),
  },
  (t) => [index("ideas_project_idx").on(t.projectId, t.createdAt)],
);

// ── Creations: one image, carousel, reel, promo video or tutorial ─────────

export type CreationStatus = "draft" | "generating" | "ready" | "rendering" | "done" | "failed";

export const creations = pgTable(
  "creations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    ideaId: uuid("idea_id"),
    type: text("type").$type<CreationType>().notNull(),
    title: text("title").notNull(),
    format: text("format").$type<MediaFormat>().notNull(),
    // The source of truth: scenes or slides with text, layout, assets, timing and audio. Renders
    // are made from it; editing a scene and rendering again never re-runs the rest.
    spec: jsonb("spec").$type<CreationSpec>().notNull(),
    // The last run of the checks (contrast, overflow, reading time, grounding).
    checks: jsonb("checks").$type<Array<{ id: string; level: "error" | "warning"; message: string; target?: string }>>().notNull().default([]),
    caption: text("caption").notNull().default(""),
    status: text("status").$type<CreationStatus>().notNull().default("draft"),
    error: text("error"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("creations_project_idx").on(t.projectId, t.type, t.createdAt)],
);

// ── AI media jobs at YepAPI (images, clips, voice, music) ─────────────────

export type MediaJobStatus = "queued" | "running" | "done" | "failed";

/**
 * One YepAPI media generation. Kept so a restart can pick up a job that YepAPI is still working
 * on, rather than paying for it twice.
 */
export const mediaJobs = pgTable(
  "media_jobs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull(),
    creationId: uuid("creation_id"),
    // Where in the creation the result goes (a scene or slide id and layer).
    target: text("target"),
    kind: text("kind").$type<AssetKind>().notNull(),
    role: text("role").$type<AssetRole>().notNull(),
    model: text("model").notNull(),
    prompt: text("prompt").notNull(),
    params: jsonb("params").$type<Record<string, unknown>>().notNull().default({}),
    // Same model, prompt and params: the earlier asset is reused instead of paying again.
    cacheKey: text("cache_key").notNull(),
    yepJobId: text("yep_job_id"),
    status: text("status").$type<MediaJobStatus>().notNull().default("queued"),
    assetId: uuid("asset_id"),
    costUsd: doublePrecision("cost_usd").notNull().default(0),
    error: text("error"),
    createdAt: createdAt(),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
  },
  (t) => [
    index("media_jobs_project_idx").on(t.projectId, t.createdAt),
    index("media_jobs_cache_idx").on(t.projectId, t.cacheKey),
    index("media_jobs_status_idx").on(t.status),
  ],
);

// ── Renders ────────────────────────────────────────────────────────────────

export type RenderStatus = "queued" | "running" | "done" | "failed";

export const renders = pgTable(
  "renders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    creationId: uuid("creation_id")
      .notNull()
      .references(() => creations.id, { onDelete: "cascade" }),
    format: text("format").$type<MediaFormat>().notNull(),
    quality: text("quality").$type<"draft" | "final">().notNull().default("final"),
    status: text("status").$type<RenderStatus>().notNull().default("queued"),
    progress: integer("progress").notNull().default(0),
    // Outputs: the media (or several, for a carousel), the poster frame and captions.
    outputAssetIds: uuid("output_asset_ids").array().notNull().default([]),
    posterAssetId: uuid("poster_asset_id"),
    captionsAssetId: uuid("captions_asset_id"),
    error: text("error"),
    startedAt: timestamp("started_at", { withTimezone: true }),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [index("renders_creation_idx").on(t.creationId, t.createdAt), index("renders_status_idx").on(t.status)],
);

export const projectsRelations = relations(projects, ({ many }) => ({
  pages: many(brandPages),
  assets: many(assets),
  ideas: many(ideas),
  creations: many(creations),
}));

export const creationsRelations = relations(creations, ({ one, many }) => ({
  project: one(projects, { fields: [creations.projectId], references: [projects.id] }),
  renders: many(renders),
}));

export const rendersRelations = relations(renders, ({ one }) => ({
  creation: one(creations, { fields: [renders.creationId], references: [creations.id] }),
}));
