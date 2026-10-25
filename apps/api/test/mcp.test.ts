import { describe, expect, it } from "vitest";
import { getApp, readyUser, signUp, YEP_KEY } from "./client";
import { harness } from "./harness";

let id = 0;

async function rpc(auth: { apiKey?: string; cookie?: string }, method: string, params: Record<string, unknown> = {}) {
  const headers: Record<string, string> = { accept: "application/json, text/event-stream", "content-type": "application/json" };
  if (auth.apiKey) headers.authorization = `Bearer ${auth.apiKey}`;
  if (auth.cookie) headers.cookie = auth.cookie;
  const res = await (await getApp()).inject({ method: "POST", url: "/mcp", headers, payload: { jsonrpc: "2.0", id: ++id, method, params } });
  return { status: res.statusCode, body: res.body ? JSON.parse(res.body) : null };
}

async function agent() {
  const user = await readyUser();
  const { key } = await user.api.ok<{ key: string }>("POST", "/api-keys", { name: "agent" });
  const call = async (name: string, args: Record<string, unknown> = {}) => {
    const res = await rpc({ apiKey: key }, "tools/call", { name, arguments: args });
    const result = res.body.result as { content: { text: string }[]; isError?: boolean };
    const text = result.content[0]?.text ?? "";
    return { isError: result.isError === true, text, json: (() => { try { return JSON.parse(text); } catch { return null; } })() };
  };
  return { ...user, key, call };
}

describe("MCP server", () => {
  it("only accepts OpenPromo API keys, not browser sessions", async () => {
    const user = await readyUser();
    expect((await rpc({}, "tools/list")).status).toBe(401);
    expect((await rpc({ cookie: user.cookie }, "tools/list")).status).toBe(401);
    const app = await getApp();
    expect((await app.inject({ method: "GET", url: "/mcp" })).statusCode).toBe(405);
  });

  it("initialises and lists the account and brand tools, marking free reads read-only", async () => {
    const { key } = await agent();
    const init = await rpc({ apiKey: key }, "initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "test", version: "1" } });
    expect(init.body.result.serverInfo.name).toBe("openpromo");
    const { body } = await rpc({ apiKey: key }, "tools/list");
    const tools = body.result.tools as { name: string; annotations?: { readOnlyHint?: boolean } }[];
    const names = tools.map((t) => t.name);
    // The README and the site quote this number.
    expect(names).toHaveLength(18);
    expect(names).toEqual(expect.arrayContaining(["whoami", "get_balance", "get_usage", "list_projects", "create_project", "get_brand", "update_brand", "refresh_brand", "update_project_context"]));
    for (const name of ["whoami", "get_balance", "list_projects", "get_brand"]) expect(tools.find((t) => t.name === name)?.annotations?.readOnlyHint, name).toBe(true);
    expect(tools.find((t) => t.name === "refresh_brand")?.annotations?.readOnlyHint).toBe(false);
  });

  it("uses the only project when project_id is left out, and never shows user ids", async () => {
    const { call, project } = await agent();
    const listed = await call("list_projects");
    expect(listed.json[0].id).toBe(project.id);
    expect(listed.text).not.toContain("userId");
    const brand = await call("get_brand");
    expect(brand.json).toMatchObject({ id: project.id, brandStatus: "ingesting" });
  });

  it("reports refusals as tool errors the agent can read", async () => {
    const { call } = await agent();
    const refused = await call("update_brand", { brand: { identity: {} } });
    expect(refused.isError).toBe(true);
    expect(refused.text).toMatch(/not ready/);
    await call("create_project", { url: "https://93.184.216.34/" });
    const ambiguous = await call("get_brand");
    expect(ambiguous.isError).toBe(true);
    expect(ambiguous.text).toMatch(/several projects/);
  });

  it("ships skills and a plugin that only name tools that exist", async () => {
    const { key } = await agent();
    const { body } = await rpc({ apiKey: key }, "tools/list");
    const names = new Set((body.result.tools as { name: string }[]).map((t) => t.name));
    const { readdir, readFile } = await import("node:fs/promises");
    const root = new URL("../../../plugins/openpromo/skills/", import.meta.url);
    const skills = await readdir(root).catch(() => [] as string[]);
    for (const skill of skills) {
      const text = await readFile(new URL(`${skill}/SKILL.md`, root), "utf8");
      for (const [, tool] of text.matchAll(/`([a-z_]+)`/g)) if (/^(get|list|create|update|refresh|run|generate|render)_/.test(tool!)) expect(names.has(tool!), `${skill} names ${tool}`).toBe(true);
    }
  });
});
