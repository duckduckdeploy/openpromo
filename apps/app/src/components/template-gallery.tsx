"use client";

import {
  CREATION_TYPES,
  type CreationType,
  estimateTemplateUsd,
  type PromoTemplate,
  RECIPES,
  TEMPLATE_GROUPS,
  TEMPLATE_PREVIEWS,
  type TemplateGroup,
  TEMPLATES,
} from "@openpromo/shared";
import { Clock, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Badge, Button, cx } from "./ui";

const price = (usd: number) => (usd < 1 ? `about $${usd.toFixed(2)}` : `about $${usd.toFixed(usd % 1 ? 1 : 0)}`);
const seconds = (t: PromoTemplate) => (t.duration ? `${t.duration[0]}–${t.duration[1]} s` : null);

/** The template's preview: a looping muted clip for videos, a picture otherwise, or a plain card. */
function Preview({ template, playing, className }: { template: PromoTemplate; playing?: boolean; className?: string }) {
  const preview = TEMPLATE_PREVIEWS[template.id]?.[0];
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (playing) void el.play().catch(() => {});
    else {
      el.pause();
      el.currentTime = 0;
    }
  }, [playing]);
  if (!preview) {
    return (
      <div className={cx("grid place-items-center bg-sunken p-4 text-center", className)}>
        <p className="font-display text-sm font-semibold text-muted">{template.name}</p>
      </div>
    );
  }
  return preview.video ? (
    <video ref={video} src={preview.video} poster={preview.poster} muted loop playsInline preload="none" className={cx("object-cover", className)} />
  ) : (
    <img src={preview.poster} alt={`${template.name} example`} loading="lazy" className={cx("object-cover", className)} />
  );
}

function TemplateCard({ template, selected, onOpen }: { template: PromoTemplate; selected: boolean; onOpen: () => void }) {
  const [hover, setHover] = useState(false);
  const tall = template.formats[0] === "story";
  const wide = template.formats[0] === "landscape" || template.formats[0] === "link";
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className={cx(
        "group flex flex-col overflow-hidden rounded-lg border bg-surface text-left shadow-card transition-colors",
        selected ? "border-accent ring-2 ring-accent/30" : "border-line hover:border-edge",
      )}
    >
      <div className={cx("relative w-full overflow-hidden bg-sunken", tall ? "aspect-[9/16]" : wide ? "aspect-video" : "aspect-[4/5]")}>
        <Preview template={template} playing={hover} className="absolute inset-0 size-full" />
        {CREATION_TYPES[template.type].video && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
            <Play className="size-3" aria-hidden /> {seconds(template)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="text-[13px] font-semibold group-hover:text-accent-text">{template.name}</p>
        <p className="line-clamp-2 text-xs text-muted">{template.summary}</p>
        <p className="mt-auto pt-1 text-[11px] text-faint">
          {RECIPES[template.recipe].label} · {price(estimateTemplateUsd(template))}
        </p>
      </div>
    </button>
  );
}

function TemplateDialog({ template, onClose, onUse }: { template: PromoTemplate | null; onClose: () => void; onUse: (t: PromoTemplate) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (template && !el.open) el.showModal();
    if (!template && el.open) el.close();
  }, [template]);
  const previews = template ? (TEMPLATE_PREVIEWS[template.id] ?? []) : [];
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="template-title"
      className="m-auto w-[min(960px,calc(100vw-32px))] rounded-xl border border-line bg-surface p-0 text-ink shadow-xl backdrop:bg-black/50"
    >
      {template && (
        <div className="grid gap-6 p-5 md:grid-cols-[minmax(0,320px)_1fr]">
          <div className="space-y-2">
            {previews[0]?.video ? (
              <video src={previews[0].video} poster={previews[0].poster} controls autoPlay muted loop playsInline className="w-full rounded-lg bg-black" />
            ) : previews[0] ? (
              <img src={previews[0].poster} alt={`${template.name} example`} className="w-full rounded-lg" />
            ) : (
              <div className="grid aspect-[4/5] place-items-center rounded-lg bg-sunken text-sm text-muted">Example coming soon</div>
            )}
            {previews[0] && <p className="text-[11px] text-faint">Made for {previews[0].business}, a fictional business, from its website.</p>}
            {previews[0]?.slides && previews[0].slides.length > 1 && (
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {previews[0].slides.map((src) => (
                  <img key={src} src={src} alt="" loading="lazy" className="h-24 rounded border border-line" />
                ))}
              </div>
            )}
          </div>
          <div className="min-w-0 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="mb-1 flex flex-wrap gap-1.5">
                  <Badge tone="accent">{CREATION_TYPES[template.type].label}</Badge>
                  <Badge>{TEMPLATE_GROUPS[template.group].label}</Badge>
                  <Badge>{RECIPES[template.recipe].label}</Badge>
                </div>
                <h2 id="template-title" className="font-display text-xl font-semibold">
                  {template.name}
                </h2>
              </div>
              <button type="button" onClick={onClose} className="rounded p-1 text-muted hover:bg-sunken" aria-label="Close">
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <p className="text-sm">{template.what}</p>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-faint">When to use it</dt>
                <dd className="mt-1 text-muted">{template.when}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-faint">Why it works</dt>
                <dd className="mt-1 text-muted">{template.why}</dd>
              </div>
            </dl>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-faint">How it plays</p>
              <ol className="mt-2 space-y-1.5 text-sm">
                {template.beats.map((beat, i) => (
                  <li key={beat.role + i} className="flex gap-2">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sunken text-[11px] font-semibold">{i + 1}</span>
                    <span>
                      <span className="font-medium capitalize">{beat.role}</span>
                      {beat.seconds ? <span className="text-faint"> · {beat.seconds}s</span> : null}
                      <span className="text-muted">: {beat.direction}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
              {seconds(template) && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" aria-hidden /> {seconds(template)}
                </span>
              )}
              <span>{price(estimateTemplateUsd(template))} in AI credits</span>
              <span>Best for: {template.bestFor.join(", ")}</span>
            </p>
            <div className="flex justify-end gap-2 border-t border-line pt-4">
              <Button onClick={onClose}>Back</Button>
              <Button variant="primary" onClick={() => onUse(template)}>
                Use this template
              </Button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

/** The gallery a creation starts from: browse by look, preview, then pick. */
export function TemplateGallery({ types, selectedId, onPick }: { types: CreationType[]; selectedId: string | null; onPick: (t: PromoTemplate) => void }) {
  const [type, setType] = useState<CreationType | "all">(types.length > 1 ? "all" : types[0]!);
  const [group, setGroup] = useState<TemplateGroup | "all">("all");
  const [open, setOpen] = useState<PromoTemplate | null>(null);
  const inTypes = TEMPLATES.filter((t) => types.includes(t.type));
  const groups = (Object.keys(TEMPLATE_GROUPS) as TemplateGroup[]).filter((g) => inTypes.some((t) => t.group === g));
  const shown = inTypes.filter((t) => (type === "all" || t.type === type) && (group === "all" || t.group === group));

  const chip = (active: boolean) =>
    cx("rounded-full border px-3 py-1 text-[13px] transition-colors", active ? "border-accent bg-accent/10 font-medium text-accent-text" : "border-line text-muted hover:border-edge hover:text-ink");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {types.length > 1 && (
          <>
            <button type="button" className={chip(type === "all")} onClick={() => setType("all")}>
              All
            </button>
            {types.map((t) => (
              <button key={t} type="button" className={chip(type === t)} onClick={() => setType(t)}>
                {CREATION_TYPES[t].label}
              </button>
            ))}
            <span className="mx-1 h-5 w-px bg-line" aria-hidden />
          </>
        )}
        <button type="button" className={chip(group === "all")} onClick={() => setGroup("all")}>
          Every style
        </button>
        {groups.map((g) => (
          <button key={g} type="button" className={chip(group === g)} onClick={() => setGroup(g)} title={TEMPLATE_GROUPS[g].description}>
            {TEMPLATE_GROUPS[g].label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {shown.map((t) => (
          <TemplateCard key={t.id} template={t} selected={t.id === selectedId} onOpen={() => setOpen(t)} />
        ))}
      </div>
      <TemplateDialog
        template={open}
        onClose={() => setOpen(null)}
        onUse={(t) => {
          setOpen(null);
          onPick(t);
        }}
      />
    </div>
  );
}
