"use client";

import type { CastMember, Scene } from "@openpromo/shared";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, AudioLines, Check, Clapperboard, ImageIcon, Loader2, Music, User } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { assetUrl } from "@/lib/hooks";
import { cx } from "./ui";

type ProductionItem = {
  id: string;
  target: string | null;
  kind: "image" | "video" | "audio";
  model: string;
  prompt: string;
  status: "queued" | "running" | "done" | "failed";
  assetId: string | null;
  costUsd: number;
  error: string | null;
  createdAt: string;
  finishedAt: string | null;
};

const MODEL_NAMES: Record<string, string> = {
  "openai/gpt-image-2": "GPT Image 2",
  "google/veo-3-lite": "Veo 3.1 Lite",
  "x-ai/grok-imagine-video-1.5": "Grok Video 1.5",
  "elevenlabs/eleven-v4": "ElevenLabs v4",
  "google/lyria-3-clip": "Lyria 3",
};

/** "cast:c1", "scene:s2:media:keyframe", "scene:s2:voice", "music" → what it is, in words. */
function describe(target: string | null, scenes: Scene[], cast: CastMember[]): { label: string; group: "cast" | "scene" | "sound" } {
  if (!target) return { label: "Picture", group: "scene" };
  if (target.startsWith("cast:")) return { label: `Cast: ${cast.find((c) => c.id === target.slice(5))?.name ?? "character"}`, group: "cast" };
  if (target === "music") return { label: "Music", group: "sound" };
  const [, sceneId, layer, extra] = target.split(":");
  const n = scenes.findIndex((s) => s.id === sceneId) + 1;
  const scene = n ? `Scene ${n}` : "Scene";
  if (layer === "voice") return { label: `${scene} voice`, group: "sound" };
  if (extra === "keyframe") return { label: `${scene} first frame`, group: "scene" };
  if (layer === "background") return { label: `${scene} background`, group: "scene" };
  return { label: scene, group: "scene" };
}

function Elapsed({ from, to }: { from: string; to: string | null }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (to) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [to]);
  const s = Math.max(0, Math.round(((to ? new Date(to).getTime() : now) - new Date(from).getTime()) / 1000));
  return <>{s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`}</>;
}

function Tile({ item, label }: { item: ProductionItem; label: string }) {
  const done = item.status === "done" && item.assetId;
  const Icon = item.kind === "video" ? Clapperboard : item.kind === "audio" ? (label === "Music" ? Music : AudioLines) : label.startsWith("Cast") ? User : ImageIcon;
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-surface">
      <div className={cx("relative grid place-items-center bg-sunken", item.kind === "audio" ? "h-16" : "aspect-[9/16] max-h-56")}>
        {done && item.kind === "image" && <img src={assetUrl(item.assetId)} alt={label} className="absolute inset-0 size-full object-cover" />}
        {done && item.kind === "video" && <video src={assetUrl(item.assetId)} muted loop playsInline autoPlay className="absolute inset-0 size-full object-cover" />}
        {done && item.kind === "audio" && <audio src={assetUrl(item.assetId)} controls preload="none" className="w-[92%]" />}
        {!done && item.status !== "failed" && (
          <div className="flex flex-col items-center gap-1.5 text-muted">
            <Loader2 className="size-5 animate-spin" aria-hidden />
            <span className="text-[11px]">
              Making… <Elapsed from={item.createdAt} to={null} />
            </span>
          </div>
        )}
        {item.status === "failed" && (
          <div className="flex flex-col items-center gap-1 p-2 text-center text-neg">
            <AlertTriangle className="size-5" aria-hidden />
            <span className="line-clamp-3 text-[11px]">{item.error ?? "Failed"}</span>
          </div>
        )}
      </div>
      <figcaption className="space-y-0.5 p-2">
        <p className="flex items-center gap-1 text-[12px] font-semibold">
          <Icon className="size-3.5 shrink-0 text-muted" aria-hidden /> <span className="truncate">{label}</span>
          {done && <Check className="ml-auto size-3.5 shrink-0 text-pos" aria-label="Done" />}
        </p>
        <p className="truncate text-[11px] text-faint">
          {MODEL_NAMES[item.model] ?? item.model}
          {item.costUsd ? ` · $${item.costUsd.toFixed(2)}` : ""}
          {item.finishedAt && (
            <>
              {" "}
              · <Elapsed from={item.createdAt} to={item.finishedAt} />
            </>
          )}
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * What is being made for a creation, as it happens: cast sheets, each scene's first frame and
 * clip, the voice lines and the music. Polls while `live` is true.
 */
export function ProductionBoard({ creationId, scenes, cast, live }: { creationId: string; scenes: Scene[]; cast: CastMember[]; live: boolean }) {
  const production = useQuery({
    queryKey: ["production", creationId],
    queryFn: () => api<{ items: ProductionItem[]; spentUsd: number }>(`/creations/${creationId}/production`),
    refetchInterval: live ? 3000 : false,
  });
  const items = production.data?.items ?? [];
  if (!items.length) return live ? <p className="text-xs text-muted">Starting… the first pictures appear here in a few seconds.</p> : null;
  const groups = { cast: [] as Array<{ item: ProductionItem; label: string }>, scene: [] as Array<{ item: ProductionItem; label: string }>, sound: [] as Array<{ item: ProductionItem; label: string }> };
  for (const item of items) {
    const d = describe(item.target, scenes, cast);
    groups[d.group].push({ item, label: d.label });
  }
  const made = items.filter((i) => i.status === "done").length;
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted">
        {made} of {items.length} made · ${(production.data?.spentUsd ?? 0).toFixed(2)} spent on this creation
      </p>
      {(["cast", "scene", "sound"] as const).map((g) =>
        groups[g].length ? (
          <div key={g}>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-faint">{g === "cast" ? "Cast" : g === "scene" ? "Scenes" : "Sound"}</p>
            <div className={cx("grid gap-2", g === "sound" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6")}>
              {groups[g].map(({ item, label }) => (
                <Tile key={item.id} item={item} label={label} />
              ))}
            </div>
          </div>
        ) : null,
      )}
    </div>
  );
}
