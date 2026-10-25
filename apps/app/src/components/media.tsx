"use client";

import { MEDIA_FORMATS, type MediaFormat } from "@openpromo/shared";
import { FileAudio, FileText, ImageOff } from "lucide-react";
import { type Asset, assetUrl, type CreationStatus } from "@/lib/hooks";
import { Badge, cx } from "./ui";

/** A file from the project library as a thumbnail; video plays on hover. */
export function AssetThumb({ asset, className, fit = "cover" }: { asset: Pick<Asset, "id" | "kind" | "name" | "mime">; className?: string; fit?: "cover" | "contain" }) {
  const src = assetUrl(asset.id);
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";
  if (asset.kind === "image") return <img src={src} alt={asset.name} loading="lazy" className={cx("size-full", fitClass, className)} />;
  if (asset.kind === "video")
    return (
      <video
        src={src}
        muted
        playsInline
        preload="metadata"
        className={cx("size-full", fitClass, className)}
        onMouseEnter={(e) => void e.currentTarget.play().catch(() => {})}
        onMouseLeave={(e) => e.currentTarget.pause()}
      />
    );
  const Icon = asset.kind === "audio" ? FileAudio : asset.mime === "application/pdf" ? FileText : ImageOff;
  return (
    <div className={cx("grid size-full place-items-center bg-sunken text-muted", className)}>
      <Icon className="size-6" aria-hidden />
    </div>
  );
}

/** A frame with the format's aspect ratio, for previews and render results. */
export function FormatFrame({ format, className, children }: { format: MediaFormat; className?: string; children: React.ReactNode }) {
  const { width, height } = MEDIA_FORMATS[format];
  return (
    <div className={cx("relative overflow-hidden rounded-md border border-line bg-sunken", className)} style={{ aspectRatio: `${width} / ${height}` }}>
      {children}
    </div>
  );
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      {label && <p className="mb-1.5 text-[13px] text-muted">{label}</p>}
      <div className="h-1.5 overflow-hidden rounded-full bg-sunken" role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${Math.max(3, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}

const STATUS: Record<CreationStatus, { label: string; tone: "neutral" | "pos" | "neg" | "warn" | "accent" }> = {
  draft: { label: "Draft", tone: "neutral" },
  generating: { label: "Writing", tone: "accent" },
  ready: { label: "Ready to render", tone: "neutral" },
  rendering: { label: "Rendering", tone: "accent" },
  done: { label: "Rendered", tone: "pos" },
  failed: { label: "Failed", tone: "neg" },
};

export function CreationStatusBadge({ status }: { status: CreationStatus }) {
  const s = STATUS[status];
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

/** Colour swatch with its hex code. */
export function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="size-8 shrink-0 rounded-md border border-line shadow-card" style={{ background: color }} aria-hidden />
      <div className="min-w-0">
        <p className="text-[13px] font-medium">{label}</p>
        <p className="font-mono text-[11px] text-muted uppercase">{color}</p>
      </div>
    </div>
  );
}

export const formatDuration = (ms: number | null | undefined) => {
  if (!ms) return "";
  const s = Math.round(ms / 1000);
  return s >= 60 ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : `${s}s`;
};
