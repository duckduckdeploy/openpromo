"use client";

import { CREATION_TYPES, type CreationType, estimateTemplateUsd, MEDIA_FORMATS, type MediaFormat, type PromoTemplate } from "@openpromo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Wand2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { dateTime } from "@/lib/api";
import { api } from "@/lib/api";
import { type Creation, type CreationListItem, assetUrl, useCreations, useProject } from "@/lib/hooks";
import { CreationStatusBadge, FormatFrame } from "./media";
import { TemplateGallery } from "./template-gallery";
import { Button, Card, EmptyState, ErrorNote, Field, PageHeader, Select, Spinner, Textarea } from "./ui";

const HINTS: Record<CreationType, string> = {
  image: "e.g. Announce our new seasonal menu, with the photo of the pumpkin loaf",
  carousel: "e.g. Five reasons people switch to our subscription",
  reel: "e.g. A 20-second reel showing how fast it is to book a table",
  promo: "e.g. A 45-second video for the homepage: problem, how we solve it, proof, offer",
  tutorial: "e.g. How to get started: sign up, create your first invoice, send it",
};

function NewCreation({ projectId, types }: { projectId: string; types: CreationType[] }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const project = useProject(projectId);
  const [template, setTemplate] = useState<PromoTemplate | null>(null);
  const [custom, setCustom] = useState(false);
  const [type, setType] = useState<CreationType>(types[0]!);
  const kind = template?.type ?? type;
  const formats = (template?.formats ?? CREATION_TYPES[kind].formats) as readonly MediaFormat[];
  const [format, setFormat] = useState<MediaFormat>(formats[0]!);
  const [brief, setBrief] = useState("");
  const [voice, setVoice] = useState(true);
  const [allowGenerated, setAllowGenerated] = useState(true);
  const isVideo = CREATION_TYPES[kind].video;
  const picking = !template && !custom;

  const create = useMutation({
    mutationFn: () =>
      api<Creation>(`/projects/${projectId}/creations`, {
        method: "POST",
        body: { type: kind, format: formats.includes(format) ? format : formats[0], brief: brief.trim() || undefined, voice, allowGenerated, templateId: template?.id },
      }),
    onSuccess: (creation) => {
      void queryClient.invalidateQueries({ queryKey: ["creations", projectId] });
      router.push(`/p/${projectId}/c/${creation.id}`);
    },
  });
  const ready = Boolean(project.data?.brand);
  const canWrite = ready && (template ? true : Boolean(brief.trim()));

  if (picking) {
    return (
      <Card className="mb-6 p-4">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 className="font-display text-base font-semibold">Start from a template</h2>
            <p className="text-[13px] text-muted">Each one is a tested style and structure. It is written from your brand profile, in your colours and voice.</p>
          </div>
          <Button size="sm" onClick={() => setCustom(true)}>
            Or describe it yourself
          </Button>
        </div>
        <TemplateGallery
          types={types}
          selectedId={null}
          onPick={(t) => {
            setTemplate(t);
            setFormat(t.formats[0]!);
          }}
        />
      </Card>
    );
  }

  return (
    <Card className="mb-6 p-4">
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (canWrite) create.mutate();
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          {template ? (
            <p className="text-sm">
              <span className="text-muted">Template:</span> <span className="font-semibold">{template.name}</span>
              <span className="text-faint"> · {template.summary}</span>
            </p>
          ) : (
            <p className="text-sm font-semibold">Describe it yourself</p>
          )}
          <Button
            size="sm"
            onClick={() => {
              setTemplate(null);
              setCustom(false);
            }}
          >
            Change template
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[180px_220px_1fr]">
          {!template && types.length > 1 ? (
            <Field label="Make a">
              <Select
                value={type}
                onChange={(e) => {
                  const next = e.target.value as CreationType;
                  setType(next);
                  setFormat((CREATION_TYPES[next].formats as readonly MediaFormat[])[0]!);
                }}
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {CREATION_TYPES[t].label}
                  </option>
                ))}
              </Select>
            </Field>
          ) : null}
          <Field label="Size">
            <Select value={format} onChange={(e) => setFormat(e.target.value as MediaFormat)}>
              {formats.map((f) => (
                <option key={f} value={f}>
                  {MEDIA_FORMATS[f].label} ({MEDIA_FORMATS[f].ratio})
                </option>
              ))}
            </Select>
          </Field>
          <div className={!template && types.length > 1 ? "sm:col-span-2 lg:col-span-1" : "sm:col-span-1 lg:col-span-2"}>
            <Field label={template ? "Angle (optional)" : "What should it say?"}>
              <Textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder={template ? "Leave empty and the writer picks the strongest angle from your website, or name a product, offer or idea" : HINTS[kind]}
                className="min-h-10"
                rows={2}
              />
            </Field>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {isVideo && (!template || template.narration === "voiceover") && (
            <label className="flex items-center gap-2 text-[13px]">
              <input type="checkbox" checked={voice} onChange={(e) => setVoice(e.target.checked)} className="accent-[var(--color-accent)]" /> Voiceover
            </label>
          )}
          {!template && (
            <label className="flex items-center gap-2 text-[13px]">
              <input type="checkbox" checked={allowGenerated} onChange={(e) => setAllowGenerated(e.target.checked)} className="accent-[var(--color-accent)]" /> Allow AI pictures where your own don't fit
            </label>
          )}
          {template && <span className="text-xs text-muted">Making it costs {estimateTemplateUsd(template) < 1 ? `about $${estimateTemplateUsd(template).toFixed(2)}` : `about $${estimateTemplateUsd(template)}`} in AI credits. You review the script before anything is made.</span>}
          <Button type="submit" variant="primary" className="ml-auto" loading={create.isPending} disabled={!canWrite}>
            <Wand2 className="size-4" aria-hidden /> Write the script
          </Button>
        </div>
        {create.isPending && <p className="text-xs text-muted">Writing the scenes from your brand profile… 10–40 seconds.</p>}
        {!ready && <p className="text-xs text-muted">Available once the brand profile is ready.</p>}
        {create.error && <ErrorNote error={create.error} />}
      </form>
    </Card>
  );
}

function CreationCard({ creation, projectId }: { creation: CreationListItem; projectId: string }) {
  const render = creation.latestRender;
  const thumb = render?.status === "done" ? (render.posterAssetId ?? render.outputAssetIds[0]) : null;
  return (
    <Link href={`/p/${projectId}/c/${creation.id}`} className="group block rounded-lg border border-line bg-surface p-3 shadow-card transition-colors hover:border-edge">
      <FormatFrame format={render?.format ?? creation.format} className="mb-3">
        {thumb ? (
          <img src={assetUrl(thumb)} alt="" loading="lazy" className="size-full object-cover" />
        ) : (
          <div className="grid size-full place-items-center p-4 text-center">
            <p className="line-clamp-4 font-display text-sm font-semibold text-muted">{creation.spec.scenes[0]?.text.headline || creation.title}</p>
          </div>
        )}
      </FormatFrame>
      <p className="truncate text-[13px] font-semibold group-hover:text-accent-text">{creation.title}</p>
      <div className="mt-1 flex items-center justify-between gap-2">
        <CreationStatusBadge status={creation.status} />
        <span className="text-[11px] text-faint">{dateTime(creation.updatedAt)}</span>
      </div>
    </Link>
  );
}

export function CreationsPage({ projectId, title, description, types }: { projectId: string; title: string; description: string; types: CreationType[] }) {
  const creations = useCreations(projectId, types);
  return (
    <>
      <PageHeader title={title} description={description} />
      <NewCreation projectId={projectId} types={types} />
      {creations.isPending ? (
        <Spinner />
      ) : creations.error ? (
        <ErrorNote error={creations.error} />
      ) : creations.data.length === 0 ? (
        <EmptyState title="Nothing here yet">Pick a template above, or start from one of your post ideas.</EmptyState>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          {creations.data.map((creation) => (
            <CreationCard key={creation.id} creation={creation} projectId={projectId} />
          ))}
        </div>
      )}
    </>
  );
}
