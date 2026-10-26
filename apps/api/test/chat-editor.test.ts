import { creationSpec } from "@openpromo/shared";
import { describe, expect, it } from "vitest";
import { backfillRecipes } from "../src/services/chat-editor";

describe("backfillRecipes", () => {
  it("rebuilds a scene's recipe from the media job log, without the renderer's additions", () => {
    const spec = creationSpec.parse({
      cast: [{ id: "c1", name: "Poppy", description: "A clay groomer", sheetAssetId: "sheet" }],
      scenes: [
        { id: "s1", layout: "full", text: {}, media: { assetId: "clip-1" } },
        { id: "s2", layout: "full", text: {}, media: { assetId: "clip-2", made: { kind: "image", prompt: "kept" } } },
      ],
    });
    backfillRecipes(spec, [
      { target: "scene:s1:media", kind: "video", model: "google/veo-3-lite", prompt: "She waves at the dog. Visual style: claymation. No dialogue, no speech.", assetId: "clip-1", params: { references: ["frame-1"] } },
      {
        target: "scene:s1:media:keyframe",
        kind: "image",
        model: "openai/gpt-image-2",
        prompt: "Poppy kneels by a muddy dog. Visual style: claymation. Keep Poppy exactly as in the reference sheet (same face). One single full-frame shot: not a collage. No text, no letters, no logos.",
        assetId: "frame-1",
        params: {},
      },
    ]);
    expect(spec.scenes[0]!.media!.made).toMatchObject({ kind: "video", prompt: "She waves at the dog", keyframe: "Poppy kneels by a muddy dog", sourceAssetId: "frame-1", castIds: ["c1"], model: "google/veo-3-lite" });
    expect(spec.scenes[1]!.media!.made!.prompt).toBe("kept");
  });

  it("leaves scenes alone when the job made a different asset", () => {
    const spec = creationSpec.parse({ scenes: [{ id: "s1", layout: "full", text: {}, media: { assetId: "uploaded" } }] });
    backfillRecipes(spec, [{ target: "scene:s1:media", kind: "image", model: "m", prompt: "p", assetId: "other", params: {} }]);
    expect(spec.scenes[0]!.media!.made).toBeNull();
  });
});
