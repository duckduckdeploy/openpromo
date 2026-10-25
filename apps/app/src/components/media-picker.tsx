"use client";

import type { MediaRef } from "@openpromo/shared";
import { Clapperboard, ImagePlus, Sparkles, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { type Asset, assetUrl, useAssets } from "@/lib/hooks";
import { AssetThumb } from "./media";
import { Button, cx, ErrorNote, Field, Spinner, Textarea } from "./ui";

const ROLES = "screenshot,product,photo,background,broll,logo";

/** Uploads a file to the project library. */
export async function uploadAsset(projectId: string, file: File, role: string): Promise<Asset> {
  const form = new FormData();
  form.append("role", role);
  form.append("file", file);
  const response = await fetch(`/api/projects/${projectId}/assets`, { method: "POST", body: form, credentials: "include" });
  const json = (await response.json().catch(() => null)) as { ok?: boolean; data?: Asset; error?: { message?: string } } | null;
  if (!response.ok || !json?.ok || !json.data) throw new Error(json?.error?.message ?? `Upload failed (${response.status})`);
  return json.data;
}

/**
 * Picks a scene's picture: one from the library (website screenshots, product photos, uploads,
 * earlier generations), a new AI picture described in words, or none.
 */
export function MediaPicker({
  projectId,
  value,
  onChange,
  label,
  allowVideo = false,
}: {
  projectId: string;
  value: MediaRef | null;
  onChange: (ref: MediaRef | null) => void;
  label: string;
  allowVideo?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState(value?.generate?.prompt ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<unknown>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const assets = useAssets(projectId, ROLES);
  const selected = assets.data?.find((a) => a.id === value?.assetId);
  const choices = (assets.data ?? []).filter((a) => a.kind === "image" || (allowVideo && a.kind === "video"));

  const pick = (asset: Asset) => {
    onChange({ assetId: asset.id, generate: null, fit: value?.fit ?? (asset.role === "product" || asset.role === "logo" ? "contain" : "cover"), focus: null });
    setOpen(false);
  };

  return (
    <div>
      <p className="mb-1.5 text-[13px] font-medium">{label}</p>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => setOpen(true)} className="size-16 shrink-0 overflow-hidden rounded-md border border-edge bg-sunken hover:border-faint">
          {selected ? (
            <AssetThumb asset={selected} />
          ) : value?.generate ? (
            <span className="grid size-full place-items-center text-accent-text">
              <Sparkles className="size-5" aria-hidden />
            </span>
          ) : (
            <span className="grid size-full place-items-center text-muted">
              <ImagePlus className="size-5" aria-hidden />
            </span>
          )}
        </button>
        <div className="min-w-0 flex-1 text-xs text-muted">
          {selected
            ? selected.name
            : value?.generate?.kind === "video"
              ? `AI clip${value.generate.sourceAssetId ? " from a picture" : ""}: ${value.generate.prompt}`
              : value?.generate
                ? `AI picture: ${value.generate.prompt}`
                : "None"}
        </div>
        {value && (
          <Button variant="ghost" size="sm" onClick={() => onChange(null)} aria-label={`Remove ${label.toLowerCase()}`}>
            <X className="size-4" aria-hidden />
          </Button>
        )}
      </div>
      {allowVideo && selected?.kind === "image" && (
        <Button
          className="mt-2"
          size="sm"
          variant="ghost"
          onClick={() =>
            onChange({
              assetId: null,
              generate: { kind: "video", prompt: "Slow, gentle camera push-in with subtle natural motion. Keep the subject as it is.", model: null, sourceAssetId: selected.id },
              fit: "cover",
              focus: null,
            })
          }
        >
          <Clapperboard className="size-4" aria-hidden /> Animate it (AI clip, about $0.66)
        </Button>
      )}
      {value?.assetId && (
        <label className="mt-2 flex items-center gap-2 text-xs text-muted">
          <input type="checkbox" checked={value.fit === "contain"} onChange={(e) => onChange({ ...value, fit: e.target.checked ? "contain" : "cover" })} className="accent-[var(--color-accent)]" />
          Show the whole picture (no cropping)
        </label>
      )}

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-label={label} onClick={() => setOpen(false)}>
          <div className="flex max-h-[85dvh] w-full max-w-3xl flex-col rounded-lg border border-line bg-surface shadow-pop" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="font-display font-semibold">{label}</p>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)} aria-label="Close">
                <X className="size-4" aria-hidden />
              </Button>
            </div>
            <div className="overflow-y-auto p-4">
              <div className="mb-4 flex items-center gap-2">
                <Button size="sm" loading={uploading} onClick={() => fileInput.current?.click()}>
                  <Upload className="size-4" aria-hidden /> Upload
                </Button>
                <input
                  ref={fileInput}
                  type="file"
                  accept={allowVideo ? "image/*,video/mp4,video/webm" : "image/*"}
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploading(true);
                    setUploadError(null);
                    try {
                      const asset = await uploadAsset(projectId, file, "photo");
                      await queryClient.invalidateQueries({ queryKey: ["assets", projectId] });
                      pick(asset);
                    } catch (error) {
                      setUploadError(error);
                    } finally {
                      setUploading(false);
                      e.target.value = "";
                    }
                  }}
                />
                <p className="text-xs text-muted">Your website's screenshots and photos are already here.</p>
              </div>
              {uploadError ? <ErrorNote error={uploadError} /> : null}
              {assets.isPending ? (
                <Spinner />
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {choices.map((asset) => (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => pick(asset)}
                      title={asset.name}
                      className={cx("aspect-square overflow-hidden rounded-md border bg-sunken", asset.id === value?.assetId ? "border-accent ring-2 ring-accent/30" : "border-line hover:border-edge")}
                    >
                      <AssetThumb asset={asset} fit={asset.role === "logo" ? "contain" : "cover"} />
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-5 border-t border-line pt-4">
                <Field label="Or describe a new AI picture" hint="Made when you render (about $0.04–0.20). Pictures never contain text; your words are set in your fonts.">
                  <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g. a sunlit café counter with a pour-over in progress, soft morning light" rows={2} />
                </Field>
                <Button
                  className="mt-2"
                  variant="primary"
                  size="sm"
                  disabled={!prompt.trim()}
                  onClick={() => {
                    onChange({ assetId: null, generate: { kind: "image", prompt: prompt.trim(), model: null, sourceAssetId: null }, fit: "cover", focus: null });
                    setOpen(false);
                  }}
                >
                  <Sparkles className="size-4" aria-hidden /> Use this description
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
