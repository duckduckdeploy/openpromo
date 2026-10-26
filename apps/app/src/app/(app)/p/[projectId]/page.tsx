"use client";

import { type BrandProfile, type SellingPoint, VOICE_TONES } from "@openpromo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Plus, Quote, RefreshCw, Trash2, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProgressBar, Swatch } from "@/components/media";
import { Badge, Button, Card, CardHeader, ErrorNote, Field, Input, PageHeader, Select, Spinner, Textarea } from "@/components/ui";
import { api } from "@/lib/api";
import { assetUrl, type Project, useBrandPages, useProject } from "@/lib/hooks";
import { safeHref } from "@/lib/url";

type Draft = BrandProfile;

const COLOR_ROLES: Array<[Exclude<keyof Draft["visual"]["colors"], "palette">, string]> = [
  ["primary", "Primary"],
  ["onPrimary", "Text on primary"],
  ["background", "Background"],
  ["text", "Text"],
  ["accent", "Accent"],
  ["muted", "Muted text"],
];

const KIND_TONE = { benefit: "accent", feature: "neutral", proof: "pos", offer: "warn" } as const;

function lines(value: string): string[] {
  return value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function Reading({ project }: { project: Project }) {
  return (
    <Card className="p-6">
      <p className="font-display text-lg font-semibold">Reading {project.domain}…</p>
      <p className="mt-1 mb-5 text-sm text-muted">This takes about a minute. You can leave this page; the profile appears here when it is ready.</p>
      <ProgressBar value={project.brandProgress?.percent ?? 2} label={project.brandProgress?.step ?? "Starting"} />
    </Card>
  );
}

function PointRow({ point, onChange, onRemove }: { point: SellingPoint; onChange: (p: SellingPoint) => void; onRemove: () => void }) {
  return (
    <li className="grid gap-2 border-b border-line px-4 py-3 last:border-b-0 sm:grid-cols-[1fr_auto]">
      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={point.kind} onChange={(e) => onChange({ ...point, kind: e.target.value as SellingPoint["kind"] })} className="h-7 w-auto text-xs" aria-label="Kind">
            <option value="benefit">Benefit</option>
            <option value="feature">Feature</option>
            <option value="proof">Proof</option>
            <option value="offer">Offer</option>
          </Select>
          <Badge tone={KIND_TONE[point.kind]}>{point.id}</Badge>
          {!point.source && (
            <span className="inline-flex items-center gap-1 text-xs text-warn">
              <TriangleAlert className="size-3.5" aria-hidden /> Not found on the site: check it is true
            </span>
          )}
        </div>
        <Input value={point.title} onChange={(e) => onChange({ ...point, title: e.target.value })} aria-label="Selling point" className="font-medium" />
        <Input value={point.detail} onChange={(e) => onChange({ ...point, detail: e.target.value })} aria-label="Detail" placeholder="One sentence of detail" />
        {point.source && (
          <p className="flex gap-1.5 text-xs text-muted">
            <Quote className="mt-0.5 size-3 shrink-0" aria-hidden />
            <span>
              “{point.source.quote}”{" "}
              {safeHref(point.source.url) && (
                <a href={safeHref(point.source.url)} target="_blank" rel="noreferrer" className="text-accent-text underline-offset-2 hover:underline">
                  {new URL(point.source.url).pathname || "/"}
                </a>
              )}
            </span>
          </p>
        )}
      </div>
      <Button variant="ghost" size="sm" onClick={onRemove} aria-label={`Remove ${point.title}`}>
        <Trash2 className="size-4" aria-hidden />
      </Button>
    </li>
  );
}

function PagesRead({ projectId }: { projectId: string }) {
  const pages = useBrandPages(projectId);
  if (!pages.data?.length) return null;
  return (
    <Card>
      <CardHeader title="Pages read" description="Selling points and on-screen claims are checked against these pages." />
      <ul className="divide-y divide-line">
        {pages.data.map((page) => (
          <li key={page.id} className="flex items-center justify-between gap-3 px-4 py-2 text-[13px]">
            <span className="min-w-0 truncate">{page.title || page.url}</span>
            <a href={safeHref(page.url)} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-muted hover:text-ink">
              {new URL(page.url).pathname} <ExternalLink className="size-3" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function BrandPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = useProject(projectId);
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<Draft | null>(null);

  const saved = project.data?.brand ?? null;
  useEffect(() => {
    if (saved) setDraft(structuredClone(saved));
  }, [saved]);
  const dirty = useMemo(() => Boolean(draft && saved && JSON.stringify(draft) !== JSON.stringify(saved)), [draft, saved]);

  const save = useMutation({
    mutationFn: (brand: Draft) => api<Project>(`/projects/${projectId}/brand`, { method: "PUT", body: { brand } }),
    onSuccess: (updated) => queryClient.setQueryData(["project", projectId], updated),
  });
  const refresh = useMutation({
    mutationFn: () => api(`/projects/${projectId}/brand/refresh`, { method: "POST", body: {} }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["project", projectId] }),
  });

  if (project.isPending) return <Spinner />;
  if (project.error) return <ErrorNote error={project.error} />;
  const p = project.data;

  const set = (fn: (d: Draft) => void) =>
    setDraft((current) => {
      if (!current) return current;
      const next = structuredClone(current);
      fn(next);
      return next;
    });

  const header = (
    <PageHeader
      title={p.name}
      description={
        <a href={safeHref(p.url)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-mono text-xs hover:text-ink">
          {p.url} <ExternalLink className="size-3" aria-hidden />
        </a>
      }
      action={
        p.brandStatus !== "ingesting" && (
          <Button onClick={() => refresh.mutate()} loading={refresh.isPending}>
            <RefreshCw className="size-4" aria-hidden /> Read the site again
          </Button>
        )
      }
    />
  );

  if (p.brandStatus === "ingesting" && !draft) {
    return (
      <>
        {header}
        <Reading project={p} />
      </>
    );
  }
  if (!draft) {
    return (
      <>
        {header}
        <Card className="p-6">
          <p className="font-display text-lg font-semibold">The website could not be read</p>
          <p className="mt-1 text-sm text-muted">{p.brandError ?? "Something went wrong."}</p>
          <Button className="mt-4" variant="primary" onClick={() => refresh.mutate()} loading={refresh.isPending}>
            Try again
          </Button>
        </Card>
      </>
    );
  }

  const c = draft.visual.colors;
  return (
    <>
      {header}
      {p.brandStatus === "ingesting" && (
        <div className="mb-6">
          <Reading project={p} />
        </div>
      )}
      {p.brandStatus === "failed" && (
        <div className="mb-6">
          <ErrorNote error={new Error(`The last read failed: ${p.brandError}. The profile below is from the read before.`)} />
        </div>
      )}
      {refresh.error && <ErrorNote error={refresh.error} />}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <Card>
            <CardHeader title="Identity" description="How the business describes itself. Writers use this in every post." />
            <div className="grid gap-4 p-4 sm:grid-cols-2">
              <Field label="Name">
                <Input value={draft.identity.name} onChange={(e) => set((d) => void (d.identity.name = e.target.value))} />
              </Field>
              <Field label="Category">
                <Input value={draft.identity.category} onChange={(e) => set((d) => void (d.identity.category = e.target.value))} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Tagline">
                  <Input value={draft.identity.tagline} onChange={(e) => set((d) => void (d.identity.tagline = e.target.value))} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="What it is">
                  <Textarea value={draft.identity.description} onChange={(e) => set((d) => void (d.identity.description = e.target.value))} />
                </Field>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Selling points"
              description="Every claim in your media comes from this list. Each one shows the sentence on your site it came from."
              action={
                <Button
                  size="sm"
                  onClick={() =>
                    set((d) =>
                      d.positioning.points.push({ id: `p${Date.now().toString(36)}`, title: "", detail: "", kind: "benefit", source: null }),
                    )
                  }
                >
                  <Plus className="size-4" aria-hidden /> Add
                </Button>
              }
            />
            <ul>
              {draft.positioning.points.map((point, i) => (
                <PointRow
                  key={point.id}
                  point={point}
                  onChange={(next) => set((d) => void (d.positioning.points[i] = next))}
                  onRemove={() => set((d) => void d.positioning.points.splice(i, 1))}
                />
              ))}
            </ul>
            <div className="grid gap-4 border-t border-line p-4 sm:grid-cols-2">
              <Field label="Calls to action" hint="One per line, in your own words.">
                <Textarea value={draft.positioning.ctas.join("\n")} onChange={(e) => set((d) => void (d.positioning.ctas = lines(e.target.value)))} />
              </Field>
              <Field label="Current offers" hint="One per line. Leave empty when there are none.">
                <Textarea value={draft.positioning.offers.join("\n")} onChange={(e) => set((d) => void (d.positioning.offers = lines(e.target.value)))} />
              </Field>
            </div>
          </Card>

          <Card>
            <CardHeader title="Audience" />
            <ul className="divide-y divide-line">
              {draft.audience.segments.map((segment, i) => (
                <li key={i} className="grid gap-2 p-4 sm:grid-cols-3">
                  <Field label="Who">
                    <Input value={segment.who} onChange={(e) => set((d) => void (d.audience.segments[i]!.who = e.target.value))} />
                  </Field>
                  <Field label="Struggles with">
                    <Input value={segment.pain} onChange={(e) => set((d) => void (d.audience.segments[i]!.pain = e.target.value))} />
                  </Field>
                  <Field label="Wants">
                    <Input value={segment.outcome} onChange={(e) => set((d) => void (d.audience.segments[i]!.outcome = e.target.value))} />
                  </Field>
                </li>
              ))}
            </ul>
            <div className="border-t border-line p-4">
              <Field label="Objections to answer" hint="One per line.">
                <Textarea value={draft.audience.objections.join("\n")} onChange={(e) => set((d) => void (d.audience.objections = lines(e.target.value)))} />
              </Field>
            </div>
          </Card>

          <Card>
            <CardHeader title="Voice" description="How posts and voiceovers should sound." />
            <div className="grid gap-4 p-4 sm:grid-cols-3">
              <Field label="Tone">
                <Select value={draft.voice.tone} onChange={(e) => set((d) => void (d.voice.tone = e.target.value as Draft["voice"]["tone"]))}>
                  {VOICE_TONES.map((tone) => (
                    <option key={tone} value={tone}>
                      {tone[0]!.toUpperCase() + tone.slice(1)}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label={`Formal ↔ casual (${draft.voice.casual})`}>
                <input type="range" min={0} max={100} value={draft.voice.casual} onChange={(e) => set((d) => void (d.voice.casual = Number(e.target.value)))} className="w-full accent-[var(--color-accent)]" />
              </Field>
              <Field label={`Serious ↔ playful (${draft.voice.playful})`}>
                <input type="range" min={0} max={100} value={draft.voice.playful} onChange={(e) => set((d) => void (d.voice.playful = Number(e.target.value)))} className="w-full accent-[var(--color-accent)]" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Lines that sound like you" hint="Copied from your site; one per line.">
                  <Textarea value={draft.voice.sampleLines.join("\n")} onChange={(e) => set((d) => void (d.voice.sampleLines = lines(e.target.value)))} />
                </Field>
              </div>
              <Field label="Never say" hint="One per line.">
                <Textarea value={draft.voice.avoid.join("\n")} onChange={(e) => set((d) => void (d.voice.avoid = lines(e.target.value)))} />
              </Field>
            </div>
          </Card>

          {(draft.products.length > 0 || draft.flows.length > 0) && (
            <Card>
              <CardHeader title="Products and getting started" description="Products for product posts; flows for tutorial videos." />
              <div className="grid gap-6 p-4 lg:grid-cols-2">
                <div>
                  <p className="mb-2 text-[13px] font-medium">Products</p>
                  <ul className="space-y-2">
                    {draft.products.map((product, i) => (
                      <li key={i} className="flex items-start justify-between gap-2 rounded-md border border-line p-2.5 text-[13px]">
                        <div className="min-w-0">
                          <p className="font-medium">
                            {product.name} {product.price && <span className="text-muted">· {product.price}</span>}
                          </p>
                          <p className="line-clamp-2 text-muted">{product.description}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => set((d) => void d.products.splice(i, 1))} aria-label={`Remove ${product.name}`}>
                          <Trash2 className="size-4" aria-hidden />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-[13px] font-medium">Getting-started flows</p>
                  <ul className="space-y-2">
                    {draft.flows.map((flow, i) => (
                      <li key={i} className="rounded-md border border-line p-2.5 text-[13px]">
                        <p className="font-medium">{flow.title}</p>
                        <ol className="mt-1 list-decimal pl-5 text-muted">
                          {flow.steps.map((step, j) => (
                            <li key={j}>{step}</li>
                          ))}
                        </ol>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Look" description="Taken from your site. Templates use these, and fix any colour pair that would be hard to read." />
            <div className="space-y-5 p-4">
              <div className="flex h-28 items-center justify-center rounded-md border border-line" style={{ background: c.background }}>
                {draft.visual.logoAssetId ? (
                  <img src={assetUrl(draft.visual.logoAssetId)} alt="Logo" className="max-h-16 max-w-[70%] object-contain" />
                ) : (
                  <span className="font-display text-xl font-bold" style={{ color: c.primary }}>
                    {draft.identity.name}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {COLOR_ROLES.map(([role, label]) => (
                  <label key={role} className="relative cursor-pointer">
                    <Swatch color={c[role]} label={label} />
                    <input
                      type="color"
                      value={c[role]}
                      onChange={(e) => set((d) => void (d.visual.colors[role] = e.target.value))}
                      className="absolute inset-0 cursor-pointer opacity-0"
                      aria-label={`${label} colour`}
                    />
                  </label>
                ))}
              </div>
              <div className="rounded-md p-4" style={{ background: c.background, color: c.text }}>
                <p className="text-lg font-bold" style={{ fontFamily: `"${draft.visual.fonts.heading.family}", serif` }}>
                  {draft.identity.tagline || draft.identity.name}
                </p>
                <p className="mt-1 text-sm" style={{ fontFamily: `"${draft.visual.fonts.body.family}", sans-serif`, color: c.muted }}>
                  {draft.identity.description.slice(0, 90)}…
                </p>
                <span className="mt-3 inline-block px-3 py-1.5 text-sm font-semibold" style={{ background: c.primary, color: c.onPrimary, borderRadius: draft.visual.radius }}>
                  {draft.positioning.ctas[0] ?? "Learn more"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Heading font" hint={draft.visual.fonts.heading.google ? "Google font" : "Not a Google font: a close one is used"}>
                  <Input value={draft.visual.fonts.heading.family} onChange={(e) => set((d) => void (d.visual.fonts.heading.family = e.target.value))} />
                </Field>
                <Field label="Body font" hint={draft.visual.fonts.body.google ? "Google font" : "Not a Google font: a close one is used"}>
                  <Input value={draft.visual.fonts.body.family} onChange={(e) => set((d) => void (d.visual.fonts.body.family = e.target.value))} />
                </Field>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-3">
                <Field label="Theme">
                  <Select value={draft.visual.theme} onChange={(e) => set((d) => void (d.visual.theme = e.target.value as "light" | "dark"))}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </Select>
                </Field>
                <Field label="Type" hint="How the fonts feel together; used as art direction">
                  <Input value={draft.visual.typography} onChange={(e) => set((d) => void (d.visual.typography = e.target.value))} placeholder="e.g. A warm serif for headlines over a clean sans" />
                </Field>
              </div>
              <Field label={`Corner radius (${draft.visual.radius}px)`}>
                <input type="range" min={0} max={32} value={draft.visual.radius} onChange={(e) => set((d) => void (d.visual.radius = Number(e.target.value)))} className="w-full accent-[var(--color-accent)]" />
              </Field>
            </div>
          </Card>

          <Card className="p-4">
            <p className="font-display font-semibold">Make something</p>
            <p className="mt-1 mb-3 text-[13px] text-muted">Start from ideas, or go straight to a format.</p>
            <div className="grid grid-cols-2 gap-2">
              <Link href={`/p/${projectId}/ideas`} className="rounded-md border border-line px-3 py-2 text-[13px] font-medium hover:border-edge">
                Post ideas
              </Link>
              <Link href={`/p/${projectId}/images`} className="rounded-md border border-line px-3 py-2 text-[13px] font-medium hover:border-edge">
                Images
              </Link>
              <Link href={`/p/${projectId}/reels`} className="rounded-md border border-line px-3 py-2 text-[13px] font-medium hover:border-edge">
                Reels
              </Link>
              <Link href={`/p/${projectId}/videos`} className="rounded-md border border-line px-3 py-2 text-[13px] font-medium hover:border-edge">
                Videos
              </Link>
            </div>
          </Card>

          <PagesRead projectId={projectId} />
        </div>
      </div>

      {dirty && (
        <div className="sticky bottom-4 z-20 mt-6 flex items-center justify-between gap-3 rounded-lg border border-accent-line bg-surface px-4 py-3 shadow-pop">
          <p className="text-[13px] text-muted">Unsaved changes. Edited fields are kept when the site is read again.</p>
          <div className="flex gap-2">
            <Button onClick={() => saved && setDraft(structuredClone(saved))}>Discard</Button>
            <Button variant="primary" loading={save.isPending} onClick={() => save.mutate(draft)}>
              Save
            </Button>
          </div>
        </div>
      )}
      {save.error && <ErrorNote error={save.error} />}
    </>
  );
}
