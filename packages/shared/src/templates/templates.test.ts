import { describe, expect, it } from "vitest";
import { CAPTION_PRESET_KEYS } from "../creation";
import { CREATION_TYPES } from "../formats";
import { RECIPES, TEMPLATE_GROUPS, TEMPLATES } from "./index";

const BANNED = /—|seamless|unlock|elevate|game-changer|leverage|robust|delve/i;

describe("template catalog", () => {
  it("has unique ids", () => {
    expect(new Set(TEMPLATES.map((t) => t.id)).size).toBe(TEMPLATES.length);
  });

  it("covers every creation type", () => {
    for (const type of Object.keys(CREATION_TYPES)) expect(TEMPLATES.some((t) => t.type === type), type).toBe(true);
  });

  it.each(TEMPLATES.map((t) => [t.id, t] as const))("%s is complete and consistent", (_, t) => {
    expect(TEMPLATE_GROUPS[t.group]).toBeDefined();
    expect(RECIPES[t.recipe]).toBeDefined();
    expect(t.summary.length).toBeLessThanOrEqual(120);
    expect(t.beats.length).toBeGreaterThan(0);
    const allowed: readonly string[] = CREATION_TYPES[t.type].formats;
    for (const f of t.formats) expect(allowed, `${t.id} format ${f}`).toContain(f);
    const video = CREATION_TYPES[t.type].video;
    if (video) {
      expect(t.duration, "video needs a duration").toBeDefined();
      expect(t.narration).toBeDefined();
      expect(t.captions === "none" || CAPTION_PRESET_KEYS.includes(t.captions as never)).toBe(true);
    }
    if (t.recipe === "on-camera") expect(t.narration).toBe("on-camera");
    if (t.recipe === "layout" || t.recipe === "motion-text" || t.recipe === "screens") expect(t.cast).toBe("none");
    const copy = [t.name, t.summary, t.what, t.when, t.why, t.hook, ...t.rules, ...t.beats.map((b) => b.direction)].join(" ");
    expect(copy).not.toMatch(BANNED);
  });
});
