"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Download, Trash2, Upload } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { AssetThumb, formatDuration } from "@/components/media";
import { uploadAsset } from "@/components/media-picker";
import { Badge, Button, cx, EmptyState, ErrorNote, PageHeader, Select, Spinner } from "@/components/ui";
import { api, dateTime } from "@/lib/api";
import { type Asset, assetUrl, useAssets } from "@/lib/hooks";

const FILTERS = [
  { key: "", label: "Everything" },
  { key: "output,poster", label: "Finished media" },
  { key: "screenshot", label: "Screenshots" },
  { key: "logo,product,photo", label: "Logo and photos" },
  { key: "background,broll", label: "AI pictures and clips" },
  { key: "voice,music", label: "Voice and music" },
] as const;

const SOURCE_LABEL: Record<Asset["source"], string> = { website: "From site", upload: "Uploaded", generated: "AI", render: "Rendered" };

function size(bytes: number) {
  return bytes > 1_000_000 ? `${(bytes / 1_000_000).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1000))} KB`;
}

export default function LibraryPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [filter, setFilter] = useState<string>("");
  const [role, setRole] = useState("photo");
  const assets = useAssets(projectId, filter || undefined);
  const queryClient = useQueryClient();
  const input = useRef<HTMLInputElement>(null);

  const upload = useMutation({
    mutationFn: async (files: File[]) => {
      for (const file of files) await uploadAsset(projectId, file, role);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["assets", projectId] }),
  });
  const remove = useMutation({
    mutationFn: (id: string) => api(`/assets/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["assets", projectId] }),
  });

  return (
    <>
      <PageHeader
        title="Library"
        description="Everything this project has: your site's screenshots and photos, uploads, AI pictures, voice and music, and finished media."
        action={
          <div className="flex items-center gap-2">
            <Select value={role} onChange={(e) => setRole(e.target.value)} className="w-auto" aria-label="Upload as">
              <option value="photo">Photo</option>
              <option value="product">Product photo</option>
              <option value="logo">Logo</option>
              <option value="screenshot">Screenshot</option>
              <option value="broll">Video clip</option>
              <option value="music">Music</option>
            </Select>
            <Button variant="primary" loading={upload.isPending} onClick={() => input.current?.click()}>
              <Upload className="size-4" aria-hidden /> Upload
            </Button>
            <input
              ref={input}
              type="file"
              multiple
              accept="image/*,video/mp4,video/webm,audio/mpeg,audio/wav,audio/mp4"
              className="hidden"
              onChange={(e) => {
                const files = [...(e.target.files ?? [])];
                if (files.length) upload.mutate(files);
                e.target.value = "";
              }}
            />
          </div>
        }
      />
      {upload.error && <ErrorNote error={upload.error} />}
      <div className="mb-4 flex flex-wrap gap-1">
        {FILTERS.map((f) => (
          <Button key={f.key} size="sm" variant={filter === f.key ? "secondary" : "ghost"} onClick={() => setFilter(f.key)}>
            {f.label}
          </Button>
        ))}
      </div>
      {assets.isPending ? (
        <Spinner />
      ) : assets.error ? (
        <ErrorNote error={assets.error} />
      ) : assets.data.length === 0 ? (
        <EmptyState title="Nothing here">Upload logos, product photos or clips, or make something: it all lands here.</EmptyState>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {assets.data.map((asset) => (
            <figure key={asset.id} className="group overflow-hidden rounded-lg border border-line bg-surface">
              <a href={assetUrl(asset.id)} target="_blank" rel="noreferrer" className={cx("block aspect-square bg-sunken", asset.role === "logo" && "p-4")}>
                <AssetThumb asset={asset} fit={asset.role === "logo" || asset.role === "product" ? "contain" : "cover"} />
              </a>
              <figcaption className="space-y-1 p-2.5">
                <p className="truncate text-[13px] font-medium" title={asset.name}>
                  {asset.name}
                </p>
                <div className="flex flex-wrap items-center gap-1">
                  <Badge>{asset.role}</Badge>
                  <Badge tone={asset.source === "generated" ? "accent" : "neutral"}>{SOURCE_LABEL[asset.source]}</Badge>
                </div>
                <p className="text-[11px] text-faint">
                  {[asset.width && asset.height ? `${asset.width}×${asset.height}` : "", formatDuration(asset.durationMs), size(asset.bytes), dateTime(asset.createdAt)].filter(Boolean).join(" · ")}
                </p>
                <div className="flex gap-1 pt-1">
                  <a href={assetUrl(asset.id, true)} className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-muted hover:bg-sunken hover:text-ink">
                    <Download className="size-3.5" aria-hidden /> Download
                  </a>
                  <button
                    type="button"
                    onClick={() => confirm(`Delete ${asset.name}?`) && remove.mutate(asset.id)}
                    className="ml-auto inline-flex items-center rounded-md px-1.5 py-1 text-xs text-muted hover:bg-sunken hover:text-neg"
                    aria-label={`Delete ${asset.name}`}
                  >
                    <Trash2 className="size-3.5" aria-hidden />
                  </button>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </>
  );
}
