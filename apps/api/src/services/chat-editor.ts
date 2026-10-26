import { CAPTION_PRESET_KEYS, creationSpec, getTemplate, type BrandProfile, type CaptionPreset, type CreationSpec, type MediaRef } from "@openpromo/shared";
import { estimateMediaUsd } from "@openpromo/yepapi";
import type { YepApi } from "@openpromo/yepapi";
import { z } from "zod";
import { chatJson, TEXT_MODELS } from "../lib/ai";
import { NARRATOR_VOICES } from "./template-writer";

/**
 * Edits a creation from a chat message ("make the colours blue", "the character should be a cat",
 * "shorter voiceover"). The model returns a list of edits; they are applied here, and only what an
 * edit touches is marked to be made again, so the next render pays for that and nothing else.
 */

/** Strips what the renderer adds to a prompt (style, cast and no-text notes), leaving the writer's words. */
function writerWords(prompt: string): string {
  return prompt
    .split(/\. Visual style:|\. Keep .+ exactly as in the reference sheet| One single full-frame shot| The person says,| No dialogue, no speech\.| Natural ambient sound only| No text, no letters, no logos\./)[0]!
    .trim();
}

export type MadeJob = { target: string | null; kind: string; model: string; prompt: string; assetId: string | null; params: Record<string, unknown> };

/**
 * Creations made before scenes kept their recipe (`made`) get it back from the media job log, so a
 * chat edit can still make their pictures and clips again.
 */
export function backfillRecipes(spec: CreationSpec, jobs: MadeJob[]): void {
  const byTarget = new Map(jobs.filter((j) => j.target && j.assetId).map((j) => [j.target!, j]));
  for (const scene of spec.scenes) {
    const ref = scene.media;
    if (!ref?.assetId || ref.made || ref.generate) continue;
    const job = byTarget.get(`scene:${scene.id}:media`);
    if (!job || job.assetId !== ref.assetId) continue;
    const frame = byTarget.get(`scene:${scene.id}:media:keyframe`);
    const castText = `${frame?.prompt ?? ""} ${job.prompt}`;
    ref.made = {
      kind: job.kind === "video" ? "video" : "image",
      prompt: writerWords(job.prompt),
      model: job.model,
      sourceAssetId: frame?.assetId ?? ((job.params.references as string[] | undefined)?.[0] ?? null),
      keyframe: frame ? writerWords(frame.prompt) : null,
      castIds: spec.cast.filter((c) => castText.includes(`Keep ${c.name}`) || castText.includes(` and ${c.name} exactly`)).map((c) => c.id),
      referenceAssetIds: [],
      allowText: false,
    };
  }
}

export type ChatTurn = { role: "user" | "assistant"; text: string };

const HEX = /^#[0-9a-f]{6}$/i;

const editSchema = z.object({
  reply: z.string().describe("One or two sentences to the user: what you changed, or what you need to know. Plain words."),
  edits: z.array(
    z.object({
      kind: z.enum(["colors", "cast", "scene", "voice", "music", "captions"]),
      target: z.string().describe("cast: the cast id (c1…); scene: the scene id (s1…); otherwise empty"),
      primary: z.string().describe('colors: new brand-colour hex like "#1d4ed8", or ""'),
      accent: z.string().describe('colors: new accent hex, or ""'),
      description: z.string().describe('cast: the full new visual description, or ""'),
      headline: z.string().describe('scene: new on-screen title, or "" to keep. Use "-" to remove it.'),
      body: z.string().describe('scene: new body text, or "" to keep. "-" removes it.'),
      cta: z.string().describe('scene: new button text, or "" to keep. "-" removes it.'),
      narration: z.string().describe('scene: new voiceover line, or "" to keep'),
      dialogue: z.string().describe('scene: new words spoken on camera, or "" to keep'),
      visual: z.string().describe('scene: the new picture or first frame, described in full, or "" to keep'),
      motion: z.string().describe('scene: the new action and camera move for a clip, or "" to keep'),
      voice: z.string().describe(`voice: one of ${Object.keys(NARRATOR_VOICES).join(", ")}, or ""`),
      musicPrompt: z.string().describe('music: the new music description, or ""'),
      captionPreset: z.string().describe(`captions: one of ${CAPTION_PRESET_KEYS.join(", ")} or "none", or ""`),
    }),
  ),
});

function specSummary(spec: CreationSpec): string {
  const template = spec.templateId ? getTemplate(spec.templateId) : undefined;
  const ref = (m: MediaRef | null) => m?.generate ?? m?.made;
  return JSON.stringify({
    template: template?.name ?? null,
    look: template?.look ?? null,
    colors: spec.colors,
    cast: spec.cast.map((c) => ({ id: c.id, name: c.name, description: c.description })),
    voice: spec.audio.voice.enabled ? spec.audio.voice.voice : "off",
    music: spec.audio.music.prompt,
    captions: spec.captions === "none" ? "none" : spec.captionStyle.preset,
    scenes: spec.scenes.map((s) => ({
      id: s.id,
      headline: s.text.headline,
      body: s.text.body,
      cta: s.text.cta,
      narration: s.narration,
      dialogue: s.dialogue,
      visual: ref(s.media)?.keyframe ?? (ref(s.media)?.kind === "image" ? ref(s.media)?.prompt : undefined),
      motion: ref(s.media)?.kind === "video" ? ref(s.media)?.prompt : undefined,
      cast: ref(s.media)?.castIds,
    })),
  });
}

/** Marks a scene's picture or clip to be made again from its recipe, with any changes applied. */
function remake(ref: MediaRef, change: { visual?: string; motion?: string; newFrame?: boolean }): boolean {
  const recipe = ref.generate ?? ref.made;
  if (!recipe) return false;
  const next = { ...recipe };
  if (next.kind === "video") {
    if (change.visual) next.keyframe = change.visual;
    if (change.motion) next.prompt = change.motion;
    // A new first frame is drawn when the picture changes; otherwise the old one is animated again.
    if (change.visual || change.newFrame) next.sourceAssetId = next.keyframe ? null : next.sourceAssetId;
  } else if (change.visual) {
    next.prompt = change.visual;
  }
  ref.generate = next;
  ref.assetId = null;
  return true;
}

export async function chatEdit(
  yep: YepApi,
  input: { brand: BrandProfile; spec: CreationSpec; message: string; history: ChatTurn[] },
): Promise<{ reply: string; spec: CreationSpec; changes: string[]; estimateUsd: number; costUsd: number }> {
  const history = input.history.slice(-8).map((t) => `${t.role === "user" ? "User" : "You"}: ${t.text}`).join("\n");
  const { data, costUsd } = await chatJson(yep, {
    model: TEXT_MODELS.write,
    system: `You edit a promo creation (a post, reel or video) for ${input.brand.identity.name} from the user's chat messages. Make exactly the changes asked for, and nothing else. Keep facts from the brand: never invent prices, claims or reviews. Describe pictures concretely, without text or logos in them. If the request is unclear, make no edits and ask one short question in reply.`,
    user: `The creation now:\n${specSummary(input.spec)}\n\n${history ? `Conversation so far:\n${history}\n\n` : ""}User: ${input.message}`,
    schema: editSchema,
    name: "edits",
    temperature: 0.3,
    maxTokens: 6000,
  });

  const spec = creationSpec.parse(structuredClone(input.spec));
  const changes: string[] = [];
  const remade = new Set<string>();
  const set = (value: string, apply: (v: string) => void) => {
    if (!value.trim()) return false;
    apply(value.trim() === "-" ? "" : value.trim());
    return true;
  };

  for (const edit of data.edits) {
    if (edit.kind === "colors") {
      if (HEX.test(edit.primary)) spec.colors.primary = edit.primary.toLowerCase();
      if (HEX.test(edit.accent)) spec.colors.accent = edit.accent.toLowerCase();
      if (HEX.test(edit.primary) || HEX.test(edit.accent)) changes.push("Colours");
    } else if (edit.kind === "cast") {
      const member = spec.cast.find((c) => c.id === edit.target);
      if (!member || !edit.description.trim()) continue;
      member.description = edit.description.trim().slice(0, 1000);
      member.sheetAssetId = null;
      changes.push(`${member.name}: new look`);
      // Every scene the character is in is drawn again from the new sheet.
      for (const scene of spec.scenes) {
        const recipe = scene.media?.generate ?? scene.media?.made;
        if (scene.media && recipe?.castIds.includes(member.id) && remake(scene.media, { newFrame: true })) remade.add(scene.id);
      }
    } else if (edit.kind === "scene") {
      const scene = spec.scenes.find((s) => s.id === edit.target);
      if (!scene) continue;
      const before = changes.length;
      set(edit.headline, (v) => (scene.text.headline = v.slice(0, 160)));
      set(edit.body, (v) => (scene.text.body = v.slice(0, 400)));
      set(edit.cta, (v) => (scene.text.cta = v.slice(0, 60)));
      if (set(edit.narration, (v) => (scene.narration = v.slice(0, 600)))) changes.push(`${scene.id}: voiceover`);
      const dialogue = set(edit.dialogue, (v) => (scene.dialogue = v.slice(0, 600)));
      const visual = edit.visual.trim();
      const motion = edit.motion.trim();
      // Speech is baked into on-camera clips, so new words mean a new clip from the same first frame.
      if ((visual || motion || dialogue) && scene.media && remake(scene.media, { visual, motion })) remade.add(scene.id);
      if (changes.length === before) changes.push(`${scene.id}: ${[edit.headline || edit.body || edit.cta ? "text" : "", visual ? "picture" : "", motion ? "motion" : "", dialogue ? "spoken line" : ""].filter(Boolean).join(", ") || "updated"}`);
    } else if (edit.kind === "voice" && edit.voice in NARRATOR_VOICES) {
      spec.audio.voice.voice = edit.voice;
      changes.push(`Voice: ${edit.voice}`);
    } else if (edit.kind === "music" && edit.musicPrompt.trim()) {
      spec.audio.music.prompt = edit.musicPrompt.trim().slice(0, 400);
      spec.audio.music.assetId = null;
      changes.push("Music");
    } else if (edit.kind === "captions") {
      if (edit.captionPreset === "none") spec.captions = "none";
      else if ((CAPTION_PRESET_KEYS as readonly string[]).includes(edit.captionPreset)) {
        spec.captions = "word";
        spec.captionStyle.preset = edit.captionPreset as CaptionPreset;
      } else continue;
      changes.push("Captions");
    }
  }

  // What the next render will pay for, roughly: remade pictures and clips, cast sheets and music.
  let estimateUsd = spec.cast.filter((c) => !c.sheetAssetId).length * 0.05 + (spec.audio.music.prompt && !spec.audio.music.assetId ? 0.08 : 0);
  for (const scene of spec.scenes) {
    const g = scene.media?.generate;
    if (!g || !remade.has(scene.id)) continue;
    if (g.kind === "image") estimateUsd += 0.05;
    else estimateUsd += (g.keyframe && !g.sourceAssetId ? 0.05 : 0) + estimateMediaUsd(g.model ?? "google/veo-3-lite", g.prompt, { duration: String(Math.ceil(scene.durationMs / 2000) * 2) });
  }
  return { reply: data.reply, spec: creationSpec.parse(spec), changes, estimateUsd: Math.round(estimateUsd * 100) / 100, costUsd };
}
