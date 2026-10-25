import { describe, expect, it } from "vitest";
import { AGENT_SKILLS, agentSetupPrompt, brandProfile, CREATION_TYPES, creationSpec, MEDIA_FORMATS, totalDurationMs } from "./index";

describe("agent setup prompt", () => {
  const prompt = agentSetupPrompt({ mcpUrl: "https://api.example.com/mcp", docsUrl: "https://example.com/docs/mcp" });

  it("points at the install and its docs", () => {
    expect(prompt).toContain("URL: https://api.example.com/mcp");
    expect(prompt).toContain("https://example.com/docs/mcp");
  });

  it("keeps the key out of chat and verifies with free calls only", () => {
    expect(prompt).toMatch(/Never ask me to paste the key into this chat/);
    expect(prompt).toMatch(/OPENPROMO_API_KEY/);
    expect(prompt).toMatch(/whoami and list_projects\. Both are free/);
    expect(prompt).toMatch(/do not run any paid generation/);
  });

  it("lists skills with unique names", () => {
    expect(new Set(AGENT_SKILLS.map((s) => s.name)).size).toBe(AGENT_SKILLS.length);
  });
});

describe("formats", () => {
  it("only offers each creation type formats that exist", () => {
    for (const type of Object.values(CREATION_TYPES)) {
      for (const format of type.formats) expect(MEDIA_FORMATS[format]).toBeDefined();
    }
  });
});

describe("brand profile", () => {
  it("fills defaults around the required fields", () => {
    const profile = brandProfile.parse({
      identity: { name: "Acme", url: "https://acme.test" },
      audience: {},
      positioning: {},
      voice: {},
      visual: {
        colors: { background: "#ffffff", text: "#111111", primary: "#ff5a36", onPrimary: "#ffffff", accent: "#1d4ed8", muted: "#6b7280" },
        fonts: { heading: { family: "Inter" }, body: { family: "Inter" } },
      },
    });
    expect(profile.voice.tone).toBe("friendly");
    expect(profile.positioning.points).toEqual([]);
    expect(profile.visual.fonts.heading.weights).toEqual([400, 700]);
  });

  it("rejects colours that are not six-digit hex", () => {
    const result = brandProfile.shape.visual.shape.colors.safeParse({ background: "white" });
    expect(result.success).toBe(false);
  });
});

describe("creation spec", () => {
  it("adds up scene durations", () => {
    const spec = creationSpec.parse({
      scenes: [
        { id: "a", layout: "hero", text: { headline: "Hi" }, durationMs: 2000 },
        { id: "b", layout: "cta", text: { cta: "Try it" }, durationMs: 2500 },
      ],
    });
    expect(totalDurationMs(spec)).toBe(4500);
    expect(spec.audio.music.volume).toBeCloseTo(0.18);
    expect(spec.captions).toBe("word");
  });
});
