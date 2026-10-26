"use client";

import { type CreationSpec, estimateSpecUsd, getTemplate } from "@openpromo/shared";
import { Clapperboard, Mic, MessageSquareQuote, Type } from "lucide-react";
import { Button } from "./ui";

const seconds = (ms: number) => `${Math.round(ms / 100) / 10}s`;

/**
 * The script, read like a storyboard, before anything is paid for: each shot's picture and action,
 * what is said, the words on screen and how long it lasts. Approving it starts production.
 */
export function Storyboard({ spec, onApprove, approving, disabled }: { spec: CreationSpec; onApprove: () => void; approving: boolean; disabled?: boolean }) {
  const template = spec.templateId ? getTemplate(spec.templateId) : undefined;
  const usd = estimateSpecUsd(spec);
  const total = spec.scenes.reduce((sum, s) => sum + s.durationMs, 0);
  return (
    <div className="space-y-4">
      {spec.cast.length > 0 && (
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-faint">Cast</p>
          <ul className="space-y-1 text-[13px]">
            {spec.cast.map((c) => (
              <li key={c.id}>
                <span className="font-semibold">{c.name}</span> <span className="text-muted">{c.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ol className="space-y-3">
        {spec.scenes.map((scene, i) => {
          const recipe = scene.media?.generate ?? scene.media?.made;
          const picture = recipe?.keyframe ?? (recipe?.kind === "image" ? recipe.prompt : null);
          const action = recipe?.kind === "video" ? recipe.prompt : null;
          const words = [scene.text.headline, scene.text.body, scene.text.cta].filter((w) => w.trim()).join(" · ");
          return (
            <li key={scene.id} className="grid grid-cols-[2rem_1fr] gap-2 rounded-lg border border-line p-3">
              <span className="grid size-7 place-items-center rounded-full bg-sunken text-xs font-semibold">{i + 1}</span>
              <div className="min-w-0 space-y-1 text-[13px]">
                {(picture || action) && (
                  <p className="flex gap-1.5">
                    <Clapperboard className="mt-0.5 size-3.5 shrink-0 text-muted" aria-label="Shot" />
                    <span>
                      {picture}
                      {action && <span className="text-muted">{picture ? " Then: " : ""}{action}</span>}
                    </span>
                  </p>
                )}
                {scene.dialogue.trim() && (
                  <p className="flex gap-1.5">
                    <MessageSquareQuote className="mt-0.5 size-3.5 shrink-0 text-muted" aria-label="Said on camera" />
                    <span className="italic">“{scene.dialogue}”</span>
                  </p>
                )}
                {scene.narration.trim() && (
                  <p className="flex gap-1.5">
                    <Mic className="mt-0.5 size-3.5 shrink-0 text-muted" aria-label="Voiceover" />
                    <span>{scene.narration}</span>
                  </p>
                )}
                {words && (
                  <p className="flex gap-1.5 text-muted">
                    <Type className="mt-0.5 size-3.5 shrink-0" aria-label="On screen" />
                    <span>{words}</span>
                  </p>
                )}
                <p className="text-[11px] text-faint">{seconds(scene.durationMs)}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
        <p className="text-xs text-muted">
          {template ? `${template.name} · ` : ""}
          {spec.scenes.length} shots · about {seconds(total)} · making it costs about ${usd.toFixed(2)}
        </p>
        <Button variant="primary" onClick={onApprove} loading={approving} disabled={disabled}>
          Approve and make it
        </Button>
      </div>
    </div>
  );
}
