CREATE TABLE "api_cache" (
	"user_id" text NOT NULL,
	"key" text NOT NULL,
	"payload" jsonb NOT NULL,
	"cost_usd" double precision DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "api_cache_user_id_key_pk" PRIMARY KEY("user_id","key")
);
--> statement-breakpoint
CREATE TABLE "assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"kind" text NOT NULL,
	"source" text NOT NULL,
	"role" text NOT NULL,
	"name" text NOT NULL,
	"path" text NOT NULL,
	"mime" text NOT NULL,
	"bytes" integer DEFAULT 0 NOT NULL,
	"width" integer,
	"height" integer,
	"duration_ms" integer,
	"model" text,
	"prompt" text,
	"cost_usd" double precision DEFAULT 0 NOT NULL,
	"meta" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"creation_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brand_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"url" text NOT NULL,
	"title" text,
	"markdown" text DEFAULT '' NOT NULL,
	"screenshot_asset_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "creations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"idea_id" uuid,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"format" text NOT NULL,
	"spec" jsonb NOT NULL,
	"checks" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"caption" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ideas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"goal" text NOT NULL,
	"channel" text NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"hook" text NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"caption" text DEFAULT '' NOT NULL,
	"hashtags" text[] DEFAULT '{}' NOT NULL,
	"cta" text,
	"point_ids" text[] DEFAULT '{}' NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"planned_for" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"creation_id" uuid,
	"target" text,
	"kind" text NOT NULL,
	"role" text NOT NULL,
	"model" text NOT NULL,
	"prompt" text NOT NULL,
	"params" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"cache_key" text NOT NULL,
	"yep_job_id" text,
	"status" text DEFAULT 'queued' NOT NULL,
	"asset_id" uuid,
	"cost_usd" double precision DEFAULT 0 NOT NULL,
	"error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"domain" text NOT NULL,
	"language" text DEFAULT 'en' NOT NULL,
	"brand" jsonb,
	"brand_status" text DEFAULT 'new' NOT NULL,
	"brand_error" text,
	"brand_progress" jsonb,
	"brand_updated_at" timestamp with time zone,
	"context" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "renders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"creation_id" uuid NOT NULL,
	"format" text NOT NULL,
	"quality" text DEFAULT 'final' NOT NULL,
	"status" text DEFAULT 'queued' NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"output_asset_ids" uuid[] DEFAULT '{}' NOT NULL,
	"poster_asset_id" uuid,
	"captions_asset_id" uuid,
	"error" text,
	"started_at" timestamp with time zone,
	"finished_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brand_pages" ADD CONSTRAINT "brand_pages_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "creations" ADD CONSTRAINT "creations_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ideas" ADD CONSTRAINT "ideas_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_jobs" ADD CONSTRAINT "media_jobs_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "renders" ADD CONSTRAINT "renders_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "renders" ADD CONSTRAINT "renders_creation_id_creations_id_fk" FOREIGN KEY ("creation_id") REFERENCES "public"."creations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "api_cache_expiry_idx" ON "api_cache" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "assets_project_idx" ON "assets" USING btree ("project_id","role");--> statement-breakpoint
CREATE INDEX "assets_creation_idx" ON "assets" USING btree ("creation_id");--> statement-breakpoint
CREATE INDEX "brand_pages_project_idx" ON "brand_pages" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "creations_project_idx" ON "creations" USING btree ("project_id","type","created_at");--> statement-breakpoint
CREATE INDEX "ideas_project_idx" ON "ideas" USING btree ("project_id","created_at");--> statement-breakpoint
CREATE INDEX "media_jobs_project_idx" ON "media_jobs" USING btree ("project_id","created_at");--> statement-breakpoint
CREATE INDEX "media_jobs_cache_idx" ON "media_jobs" USING btree ("project_id","cache_key");--> statement-breakpoint
CREATE INDEX "media_jobs_status_idx" ON "media_jobs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "projects_user_idx" ON "projects" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "renders_creation_idx" ON "renders" USING btree ("creation_id","created_at");--> statement-breakpoint
CREATE INDEX "renders_status_idx" ON "renders" USING btree ("status");