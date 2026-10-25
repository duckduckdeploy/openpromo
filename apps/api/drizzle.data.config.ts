import { defineConfig } from "drizzle-kit";

// The project database: brand profiles, assets, ideas, creations and renders. Accounts: drizzle.config.ts.
export default defineConfig({
  schema: "./src/db/data-schema.ts",
  out: "./drizzle-data",
  dialect: "postgresql",
});
