import {
  CAMERA_MOVES,
  CREATION_TYPES,
  creationSpec,
  GENERIC_PHRASES,
  getTemplate,
  MEDIA_FORMATS,
  RECIPES,
  SCENE_LAYOUTS,
  type BrandProfile,
  type CreationSpec,
  type MediaRef,
  type PromoTemplate,
  type SceneLayout,
} from "@openpromo/shared";
import { readingSeconds } from "@openpromo/render";
import type { YepApi } from "@openpromo/yepapi";
import { z } from "zod";
import { chatJson, TEXT_MODELS } from "../lib/ai";
import { AppError } from "../lib/errors";
import { brandBrief, type DraftInput } from "./writer";

/**
 * Writes a creation from a gallery template: the template gives the look, the cast, the beats and
 * the recipe; the brand profile gives every fact. The result is a normal spec, so it is edited,
 * checked and rendered like any other creation.
 */

/** Voices the writer may cast for a voiceover (ElevenLabs v4). */
export const NARRATOR_VOICES = {
  sarah: "young woman, soft and confident, American",
  alice: "woman, clear and confident, British",
  bella: "young woman, warm and bright, American",
  george: "man, warm storyteller, British",
  brian: "man, deep and resonant narrator, American",
  adam: "man, deep and firm, American",
  bill: "older man, trustworthy documentary voice, American",
  callum: "man, intense and gravelly, transatlantic",
  charlie: "man, casual and natural, Australian",
  chris: "man, casual and friendly, American",
} as const;
type NarratorVoice = keyof typeof NARRATOR_VOICES;

const RECIPE_GUIDE: Record<string, string> = {
  layout: "Scenes are designed layouts in the brand's fonts. Use listed assets for pictures; ask for generated pictures only when no asset fits.",
  "motion-text": "Scenes are animated type only: statement, stat, list and cta layouts. No pictures.",
  screens: "Scenes are the business's real screenshots (screenshot layout, picture = a listed screenshot asset), one step or point each, with a short headline.",
  "ai-photo": "Each scene is an AI photo described in `visual` (no text in it), with the scene's text set on top. Use layout full (text over the photo), hero, product or split.",
  "ai-poster": "The scene is one fully designed picture including its lettering. Put the exact words to letter in `visual` in double quotes, and leave headline and body empty. Layout full.",
  "cast-story": "Define the cast first (1 to 3 characters with precise visual descriptions). Every scene is full-frame: `visual` is the first frame (who is where, doing what, framing), `motion` is what moves during the shot. Name who appears in castNames.",
  "on-camera": "Define the cast (the people who speak, with precise visual descriptions: age, hair, clothes, setting). Speaking scenes have `dialogue`: the exact words said on camera, natural and casual, at most about 2.5 words per second of the scene. Cutaway scenes (product, place) have no dialogue. `visual` is the first frame, `motion` what happens. Leave narration empty.",
  broll: "Every scene is a full-frame AI video shot: `visual` is the first frame (describe the product exactly as the brand profile does), `motion` is the camera move and action.",
  "stills-motion": "Every scene is a full-frame illustration (`visual`) with a camera move (`camera`). Keep the cast the same in every picture.",
};

const writtenScene = z.object({
  beat: z.string().describe("Which template beat this scene plays"),
  layout: z.enum(SCENE_LAYOUTS),
  eyebrow: z.string(),
  headline: z.string(),
  body: z.string(),
  stat: z.string(),
  bullets: z.array(z.string()),
  cta: z.string(),
  attribution: z.string(),
  picture: z.string().describe('"" for none; "asset:<id>" to use a listed asset; "generate:<description>" for a new picture (layout recipes only)'),
  productAsset: z.string().describe('"asset:<id>" of a listed product photo to use as the reference so the product looks real, or ""'),
  visual: z.string().describe("AI recipes: the picture or first frame, in one or two concrete sentences; empty otherwise"),
  motion: z.string().describe("Video AI recipes: what moves during the shot (action and camera); empty otherwise"),
  camera: z.enum(CAMERA_MOVES).describe("stills-motion: the camera move over the picture; none otherwise"),
  castNames: z.array(z.string()).describe("Names of cast members in this scene"),
  dialogue: z.string().describe("on-camera recipe: the exact words spoken on camera in this scene; empty otherwise"),
  narration: z.string().describe("Voiceover for this scene (videos with a voiceover); empty otherwise"),
  durationSeconds: z.number(),
  transition: z.enum(["cut", "fade", "slide", "zoom"]),
  pointIds: z.array(z.string()),
  emphasis: z.array(z.string()).describe("1 or 2 key words copied exactly from the narration or dialogue"),
});

const writtenTemplateCreation = z.object({
  title: z.string(),
  cast: z.array(z.object({ name: z.string(), description: z.string() })).describe("Recurring characters or people (cast-story, on-camera and comic templates); empty otherwise"),
  scenes: z.array(writtenScene).min(1),
  caption: z.string().describe("The post caption with hashtags at the end"),
  musicPrompt: z.string(),
  narrator: z.enum(Object.keys(NARRATOR_VOICES) as [NarratorVoice, ...NarratorVoice[]]).describe("The voiceover voice that fits the template and brand"),
});

/** Full-frame video recipes: the picture and the captions carry it, so titles are kept for the ends. */
const TITLES_AT_ENDS = "On-screen text: a short title (headline, under 6 words) on the first scene only, and the call to action (cta) on the last scene. Leave every other scene's headline, body and cta empty; the captions show what is said.";

function templateBrief(t: PromoTemplate): string {
  const videoClips = CREATION_TYPES[t.type].video && ["cast-story", "on-camera", "broll", "stills-motion"].includes(t.recipe);
  return [
    `Template: ${t.name}. ${t.what}`,
    `Why it works: ${t.why}`,
    `Recipe (${RECIPES[t.recipe].label}): ${RECIPE_GUIDE[t.recipe]}`,
    videoClips ? TITLES_AT_ENDS : "",
    t.look ? `Look of every picture and clip: ${t.look}` : "",
    t.cast !== "none" ? `Cast: ${t.cast}.` : "",
    `Beats, in order:\n${t.beats.map((b) => `  - ${b.role}${b.seconds ? ` (~${b.seconds}s)` : ""}: ${b.direction}`).join("\n")}`,
    `Hook: ${t.hook}`,
    `Rules:\n${t.rules.map((r) => `  - ${r}`).join("\n")}`,
    `Avoid: ${t.avoid.join("; ")}`,
    t.narration ? `Sound: ${t.narration === "on-camera" ? "people speak on camera" : t.narration === "voiceover" ? `voiceover, ${t.voice ?? "natural"}` : "no voice; on-screen text and music carry it"}.` : "",
    t.duration ? `Total length: ${t.duration[0]} to ${t.duration[1]} seconds.` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

/** What makes a draft unusable for its template, in words the writer can act on. */
function draftProblems(t: PromoTemplate, type: string, data: z.infer<typeof writtenTemplateCreation>): string[] {
  const problems: string[] = [];
  const min = type === "image" ? 1 : type === "carousel" ? Math.min(3, t.beats.length) : 3;
  if (data.scenes.length < min) problems.push(`it has ${data.scenes.length} scene(s) and needs at least ${min}`);
  const ai = !["layout", "screens", "motion-text"].includes(t.recipe);
  if (ai && data.scenes.some((s) => !s.visual.trim())) problems.push("every scene needs a `visual` description");
  if (["cast-story", "on-camera"].includes(t.recipe) && !data.cast.length) problems.push("the cast is empty");
  if (t.recipe === "on-camera" && !data.scenes.some((s) => s.dialogue.trim())) problems.push("nobody speaks on camera");
  return problems;
}

function assetRef(choice: string, known: Set<string>): string | null {
  const v = choice.trim();
  if (!v.startsWith("asset:")) return null;
  const id = v.slice(6).trim();
  return known.has(id) ? id : null;
}

function layoutFor(t: PromoTemplate, written: SceneLayout): SceneLayout {
  if (["cast-story", "on-camera", "broll", "stills-motion", "ai-poster"].includes(t.recipe)) return "full";
  if (t.recipe === "motion-text") return ["statement", "stat", "list", "cta"].includes(written) ? written : "statement";
  return written;
}

export async function writeFromTemplate(
  yep: YepApi,
  input: DraftInput & { templateId: string },
): Promise<{ title: string; caption: string; spec: CreationSpec; costUsd: number }> {
  const template = getTemplate(input.templateId);
  if (!template) throw new AppError(400, "unknown_template", `No template called ${input.templateId}`);
  if (template.type !== input.type) throw new AppError(400, "template_type", `${template.name} makes a ${CREATION_TYPES[template.type].label.toLowerCase()}, not a ${CREATION_TYPES[input.type].label.toLowerCase()}`);
  const { width, height } = MEDIA_FORMATS[input.format];
  const isVideo = CREATION_TYPES[input.type].video;
  const assetList = input.assets.length
    ? input.assets.map((a) => `  asset:${a.id}: ${a.role}: ${a.name}${a.device ? ` (${a.device})` : ""}${a.width && a.height ? `, ${a.width}×${a.height}` : ""}${a.url ? ` from ${a.url}` : ""}`).join("\n")
    : "  (none)";

  const user = [
    brandBrief(input.brand),
    `Available pictures (use their ids exactly):\n${assetList}`,
    templateBrief(template),
    `Make a ${CREATION_TYPES[input.type].label.toLowerCase()} at ${width}×${height}.`,
    input.type === "image" ? "Exactly 1 scene." : input.type === "carousel" ? "One scene per slide, following the beats." : "One scene per shot, following the beats; split a beat into several shots when it has several moments.",
    isVideo && ["cast-story", "on-camera", "broll"].includes(template.recipe) ? "AI clips last 4, 6 or 8 seconds; give each shot one of those lengths." : "",
    `Brief: ${input.brief || "Pick the strongest angle from the brand profile."}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  const system = `You are a senior creative director and scriptwriter for short social videos and posts. You follow the template closely, and take every fact (names, products, prices, claims, quotes) from the brand profile only. Never invent prices, reviews, customers or results. Write like the brand speaks. Never use: ${GENERIC_PHRASES.slice(0, 14).join(", ")}. Descriptions in visual and motion are concrete and filmable, and never ask for text, logos or brand names inside a picture (except designed posters).`;
  let costUsd = 0;
  let data: z.infer<typeof writtenTemplateCreation> | undefined;
  let note = "";
  // One retry when the draft is unusable: too few scenes for the template, or AI scenes with nothing to draw.
  for (let attempt = 0; attempt < 2; attempt++) {
    const result = await chatJson(yep, { model: TEXT_MODELS.write, system, user: user + note, schema: writtenTemplateCreation, name: "creation", temperature: 0.8, maxTokens: 14000 });
    costUsd += result.costUsd;
    data = result.data;
    const problems = draftProblems(template, input.type, data);
    if (!problems.length) break;
    note = `

Your previous draft was unusable: ${problems.join("; ")}. Write the whole thing again, complete.`;
  }
  if (!data) throw new AppError(502, "ai_bad_output", "The writer returned nothing. Try again.");

  const known = new Set(input.assets.map((a) => a.id));
  const points = new Set(input.brand.positioning.points.map((p) => p.id));
  const cast = data.cast.slice(0, 3).map((c, i) => ({ id: `c${i + 1}`, name: c.name.slice(0, 80), description: c.description.slice(0, 1000), sheetAssetId: null }));
  const castId = (name: string) => cast.find((c) => c.name.toLowerCase() === name.trim().toLowerCase())?.id;
  const limit = input.type === "image" ? 1 : input.type === "carousel" ? 10 : 14;
  const r = template.recipe;
  const videoClips = isVideo && ["cast-story", "on-camera", "broll"].includes(r);
  // Close-ups that live on their own sound (ASMR) and on-camera talk keep the clip's audio.
  const keepAudio = r === "on-camera" || (template.narration === "none" && !template.music);

  const scenes = data.scenes.slice(0, limit).map((s, i) => {
    const castIds = s.castNames.map(castId).filter((id): id is string => Boolean(id));
    const product = assetRef(s.productAsset, known);
    let media: Partial<MediaRef> | null = null;
    if (["layout", "screens", "motion-text"].includes(r)) {
      const id = assetRef(s.picture, known);
      const gen = s.picture.trim().startsWith("generate:") ? s.picture.trim().slice(9).trim() : "";
      media = id ? { assetId: id } : gen && r === "layout" ? { generate: { kind: "image", prompt: gen, model: null, sourceAssetId: null, keyframe: null, castIds: [], referenceAssetIds: [], allowText: false } } : null;
    } else if (s.visual.trim()) {
      const still = !videoClips;
      media = {
        generate: still
          ? { kind: "image", prompt: s.visual, model: null, sourceAssetId: null, keyframe: null, castIds, referenceAssetIds: product ? [product] : [], allowText: r === "ai-poster" }
          : { kind: "video", prompt: s.motion || "Subtle natural motion, gentle camera move", model: null, sourceAssetId: null, keyframe: s.visual, castIds, referenceAssetIds: product ? [product] : [], allowText: false },
        keepAudio: videoClips && keepAudio,
        motion: r === "stills-motion" ? (s.camera === "none" ? "push-in" : s.camera) : "none",
      };
    }
    const dialogue = r === "on-camera" ? s.dialogue.trim() : "";
    const narration = isVideo && input.voice !== false && template.narration === "voiceover" ? s.narration : "";
    const spoken = `${narration} ${dialogue}`.toLowerCase();
    const poster = r === "ai-poster";
    return {
      id: `s${i + 1}`,
      layout: layoutFor(template, s.layout),
      text: poster
        ? { eyebrow: "", headline: "", body: "", stat: "", bullets: [], cta: "", attribution: "" }
        : { eyebrow: s.eyebrow, headline: s.headline, body: s.body, stat: s.stat, bullets: s.bullets.slice(0, 5), cta: s.cta, attribution: s.attribution },
      media,
      background: null,
      durationMs: isVideo ? Math.round(Math.min(15, Math.max(1.5, s.durationSeconds || 4)) * 1000) : 3000,
      narration,
      dialogue,
      transition: s.transition,
      pointIds: s.pointIds.filter((id) => points.has(id)),
      emphasis: isVideo ? s.emphasis.filter((w) => w.trim() && w.length <= 40 && spoken.includes(w.toLowerCase())).slice(0, 3) : [],
    };
  });
  if (!scenes.length) throw new AppError(502, "ai_bad_output", "The writer returned no scenes. Try again.");
  // A video must hook in the first seconds; a silent opening shot gets the title on screen.
  const first = scenes[0]!;
  if (isVideo && !first.text.headline.trim() && !first.narration.trim() && !first.dialogue.trim()) first.text.headline = data.title.slice(0, 80);

  if (isVideo) {
    for (const scene of scenes) {
      const words = `${scene.narration} ${scene.dialogue}`.split(/\s+/).filter(Boolean).length;
      const needed = Math.max(scene.layout === "full" ? 0 : readingSeconds(scene as never), words ? words / 2.6 + 0.5 : 0);
      scene.durationMs = Math.round(Math.min(15, Math.max(scene.durationMs / 1000, needed)) * 1000);
    }
  }

  const music = template.music === "" ? "" : data.musicPrompt.trim() || template.music || "";
  const spec = creationSpec.parse({
    templateId: template.id,
    cast,
    style: "clean",
    scenes,
    audio: {
      voice: { enabled: isVideo && template.narration === "voiceover" && input.voice !== false, model: null, voice: data.narrator, assetId: null },
      music: { assetId: null, prompt: isVideo ? music : "", volume: r === "on-camera" ? 0.08 : 0.18 },
    },
    captions: isVideo && template.captions && template.captions !== "none" ? "word" : "none",
    captionStyle: { preset: template.captions && template.captions !== "none" ? template.captions : "bold-pop", position: "lower", accent: null },
    posterSceneId: "s1",
  });
  return { title: data.title.slice(0, 120) || template.name, caption: data.caption, spec, costUsd };
}

export type { BrandProfile };
