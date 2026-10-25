"use client";

import { CREATION_TYPES, type CreationType, MEDIA_FORMATS, type MediaFormat } from "@openpromo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Wand2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { dateTime } from "@/lib/api";
import { api } from "@/lib/api";
import { type Creation, type CreationListItem, assetUrl, useCreations, useProject } from "@/lib/hooks";
import { CreationStatusBadge, FormatFrame } from "./media";
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
  const [type, setType] = useState<CreationType>(types[0]!);
  const formats = CREATION_TYPES[type].formats as readonly MediaFormat[];
  const [format, setFormat] = useState<MediaFormat>(formats[0]!);
  const [brief, setBrief] = useState("");
  const [voice, setVoice] = useState(true);
  const [allowGenerated, setAllowGenerated] = useState(true);
  const isVideo = CREATION_TYPES[type].video;

  const create = useMutation({
    mutationFn: () => api<Creation>(`/projects/${projectId}/creations`, { method: "POST", body: { type, format, brief, voice, allowGenerated } }),
    onSuccess: (creation) => {
      void queryClient.invalidateQueries({ queryKey: ["creations", projectId] });
      router.push(`/p/${projectId}/c/${creation.id}`);
    },
  });
  const ready = Boolean(project.data?.brand);

  return (
    <Card className="mb-6 p-4">
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (brief.trim()) create.mutate();
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[180px_220px_1fr]">
          {types.length > 1 ? (
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
          ) : (
            <input type="hidden" value={type} />
          )}
          <Field label="Size">
            <Select value={format} onChange={(e) => setFormat(e.target.value as MediaFormat)}>
              {formats.map((f) => (
                <option key={f} value={f}>
                  {MEDIA_FORMATS[f].label} ({MEDIA_FORMATS[f].ratio})
                </option>
              ))}
            </Select>
          </Field>
          <div className={types.length > 1 ? "sm:col-span-2 lg:col-span-1" : "sm:col-span-1 lg:col-span-2"}>
            <Field label="What should it say?">
              <Textarea value={brief} onChange={(e) => setBrief(e.target.value)} placeholder={HINTS[type]} className="min-h-10" rows={2} />
            </Field>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {isVideo && (
            <label className="flex items-center gap-2 text-[13px]">
              <input type="checkbox" checked={voice} onChange={(e) => setVoice(e.target.checked)} className="accent-[var(--color-accent)]" /> Voiceover
            </label>
          )}
          <label className="flex items-center gap-2 text-[13px]">
            <input type="checkbox" checked={allowGenerated} onChange={(e) => setAllowGenerated(e.target.checked)} className="accent-[var(--color-accent)]" /> Allow AI pictures where your own don't fit
          </label>
          <Button type="submit" variant="primary" className="ml-auto" loading={create.isPending} disabled={!brief.trim() || !ready}>
            <Wand2 className="size-4" aria-hidden /> Write it
          </Button>
        </div>
        {create.isPending && <p className="text-xs text-muted">Writing the scenes from your brand profile… 10–30 seconds.</p>}
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
        <EmptyState title="Nothing here yet">Describe what you want above, or pick one from Post ideas.</EmptyState>
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
