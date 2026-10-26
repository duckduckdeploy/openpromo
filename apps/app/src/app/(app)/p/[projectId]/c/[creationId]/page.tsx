"use client";

import {
  CAPTION_PRESET_KEYS,
  CAPTION_PRESETS,
  type CaptionPreset,
  CREATION_TYPES,
  creationSpec,
  type CreationSpec,
  MEDIA_FORMATS,
  type MediaFormat,
  type Scene,
  SCENE_LAYOUTS,
} from "@openpromo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, ChevronLeft, CircleAlert, Copy, Download, Plus, Play, Trash2, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatPanel } from "@/components/chat-panel";
import { MediaPicker } from "@/components/media-picker";
import { ProductionBoard } from "@/components/production-board";
import { Storyboard } from "@/components/storyboard";
import { CreationStatusBadge, FormatFrame, formatDuration, ProgressBar } from "@/components/media";
import { Badge, Button, Card, CardHeader, cx, ErrorNote, Field, Input, Select, Spinner, Textarea } from "@/components/ui";
import { api, dateTime } from "@/lib/api";
import { assetUrl, type Creation, type Render, useCreation } from "@/lib/hooks";

const LAYOUT_LABELS: Record<(typeof SCENE_LAYOUTS)[number], string> = {
  hero: "Hero",
  statement: "Statement",
  stat: "Big number",
  list: "List",
  quote: "Quote",
  screenshot: "Screenshot",
  product: "Product",
  split: "Picture + text",
  offer: "Offer",
  cta: "Call to action",
  full: "Full-frame picture",
};

/** Renders the saved scene's HTML in a sandboxed frame, scaled to the column width. */
function ScenePreview({ creationId, scene, format, version }: { creationId: string; scene: number; format: MediaFormat; version: number }) {
  const { width, height } = MEDIA_FORMATS[format];
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setScale(el.clientWidth / width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/creations/${creationId}/preview?scene=${scene}&format=${format}`, { credentials: "include", signal: controller.signal })
      .then((r) => r.text())
      .then(setHtml)
      .catch(() => {});
    return () => controller.abort();
  }, [creationId, scene, format, version]);

  return (
    <div ref={box} className="relative w-full overflow-hidden rounded-md border border-line bg-sunken shadow-card" style={{ aspectRatio: `${width} / ${height}` }}>
      {html && (
        <iframe
          title="Scene preview"
          srcDoc={html}
          // Same origin so the frame can load library files with the session; the HTML is our own template.
          sandbox="allow-scripts allow-same-origin"
          className="absolute top-0 left-0 origin-top-left border-0"
          style={{ width, height, transform: `scale(${scale})` }}
        />
      )}
    </div>
  );
}

function ChecksBar({ checks }: { checks: Creation["checks"] }) {
  if (!checks.length) return <p className="mb-4 text-[13px] text-pos">All checks pass.</p>;
  return (
    <ul className="mb-4 space-y-1">
      {checks.map((check, i) => (
        <li key={i} className={cx("flex items-start gap-2 rounded-md px-3 py-1.5 text-[13px]", check.level === "error" ? "bg-neg/5 text-neg" : "bg-warn/5 text-warn")}>
          {check.level === "error" ? <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden /> : <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />}
          {check.message}
        </li>
      ))}
    </ul>
  );
}

function RenderResult({ render }: { render: Render }) {
  if (render.status === "queued" || render.status === "running") return <ProgressBar value={render.progress} label={render.status === "queued" ? "Waiting to start…" : `Rendering… ${render.progress}%`} />;
  if (render.status === "failed") return <ErrorNote error={new Error(render.error ?? "The render failed")} />;
  const [first] = render.outputAssetIds;
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted">
        {MEDIA_FORMATS[render.format].label} · {dateTime(render.finishedAt)}
      </p>
      <div className="flex flex-wrap gap-2">
        {render.outputAssetIds.map((id, i) => (
          <a key={id} href={assetUrl(id, true)} className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-1 text-xs hover:border-edge">
            <Download className="size-3.5" aria-hidden /> {render.outputAssetIds.length > 1 ? `File ${i + 1}` : "Download"}
          </a>
        ))}
        {render.captionsAssetId && (
          <a href={assetUrl(render.captionsAssetId, true)} className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-1 text-xs hover:border-edge">
            <Download className="size-3.5" aria-hidden /> Captions (.srt)
          </a>
        )}
        {render.posterAssetId && render.posterAssetId !== first && (
          <a href={assetUrl(render.posterAssetId, true)} className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-1 text-xs hover:border-edge">
            <Download className="size-3.5" aria-hidden /> Thumbnail
          </a>
        )}
      </div>
    </div>
  );
}

function newScene(isVideo: boolean): Scene {
  return {
    id: `s${Date.now().toString(36)}`,
    layout: "statement",
    text: { eyebrow: "", headline: "New scene", body: "", stat: "", bullets: [], cta: "", attribution: "" },
    media: null,
    background: null,
    dialogue: "",
    durationMs: isVideo ? 3000 : 3000,
    narration: "",
    transition: "fade",
    pointIds: [],
    emphasis: [],
  };
}

export default function CreationEditor() {
  const { projectId, creationId } = useParams<{ projectId: string; creationId: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const creation = useCreation(creationId);
  const [spec, setSpec] = useState<CreationSpec | null>(null);
  const [meta, setMeta] = useState<{ title: string; caption: string }>({ title: "", caption: "" });
  const [selected, setSelected] = useState(0);
  const [version, setVersion] = useState(0);
  const [renderFormat, setRenderFormat] = useState<MediaFormat | null>(null);
  const loadedFor = useRef<string | null>(null);

  // Load the server copy once per creation; later refetches (render polling) must not overwrite edits.
  useEffect(() => {
    if (creation.data && loadedFor.current !== creation.data.id) {
      loadedFor.current = creation.data.id;
      // Parsed so creations saved before a field existed get its default.
      setSpec(creationSpec.parse(structuredClone(creation.data.spec)));
      setMeta({ title: creation.data.title, caption: creation.data.caption });
    }
  }, [creation.data]);

  const save = useMutation({
    mutationFn: (body: { spec: CreationSpec; title: string; caption: string }) => api<Creation>(`/creations/${creationId}`, { method: "PUT", body }),
    onSuccess: (updated) => {
      queryClient.setQueryData(["creation", creationId], (old: (Creation & { renders: Render[] }) | undefined) => (old ? { ...old, ...updated } : old));
      setVersion((v) => v + 1);
    },
  });

  // Autosave: shortly after the last change.
  const pending = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queueSave = useCallback(
    (nextSpec: CreationSpec, nextMeta: { title: string; caption: string }) => {
      if (pending.current) clearTimeout(pending.current);
      pending.current = setTimeout(() => save.mutate({ spec: nextSpec, ...nextMeta }), 700);
    },
    [save],
  );

  const render = useMutation({
    mutationFn: (format: MediaFormat) => api<Render>(`/creations/${creationId}/renders`, { method: "POST", body: { format } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["creation", creationId] }),
  });
  const remove = useMutation({
    mutationFn: () => api(`/creations/${creationId}`, { method: "DELETE" }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["creations", projectId] });
      router.push(`/p/${projectId}`);
    },
  });

  if (creation.isPending || (creation.data && !spec)) return <Spinner />;
  if (creation.error) return <ErrorNote error={creation.error} />;
  if (!spec) return null;
  const c = creation.data;
  const type = CREATION_TYPES[c.type];
  const isVideo = type.video;
  const captionsOn = spec.captions !== "none";
  const captionValue = spec.captions === "none" ? "none" : spec.captions === "line" ? "minimal" : spec.captionStyle.preset;
  const scene = spec.scenes[Math.min(selected, spec.scenes.length - 1)]!;
  const index = spec.scenes.indexOf(scene);
  const busy = c.renders.some((r) => r.status === "queued" || r.status === "running");
  const errors = c.checks.filter((check) => check.level === "error");
  const totalMs = spec.scenes.reduce((sum, s) => sum + s.durationMs, 0);
  const listHref = `/p/${projectId}/${c.type === "image" || c.type === "carousel" ? "images" : c.type === "reel" ? "reels" : "videos"}`;
  const latest = c.renders[0];
  const latestVideo = latest?.status === "done" && isVideo ? latest.outputAssetIds[0] : undefined;

  const update = (fn: (draft: CreationSpec) => void) => {
    const next = structuredClone(spec);
    fn(next);
    setSpec(next);
    queueSave(next, meta);
  };
  const updateScene = (fn: (s: Scene) => void) => update((d) => fn(d.scenes[index]!));
  const setText = (key: keyof Scene["text"], value: string) => updateScene((s) => void ((s.text as Record<string, unknown>)[key] = value));
  const multiScene = c.type !== "image";

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link href={listHref} className="text-muted hover:text-ink" aria-label="Back">
            <ChevronLeft className="size-5" />
          </Link>
          <Input
            value={meta.title}
            onChange={(e) => {
              const next = { ...meta, title: e.target.value };
              setMeta(next);
              queueSave(spec, next);
            }}
            className="h-9 w-72 font-display text-base font-semibold"
            aria-label="Title"
          />
          <Badge tone="accent">{type.label}</Badge>
          <CreationStatusBadge status={c.status} />
          {save.isPending && <span className="text-xs text-faint">Saving…</span>}
        </div>
        <div className="flex items-center gap-2">
          <Select value={renderFormat ?? c.format} onChange={(e) => setRenderFormat(e.target.value as MediaFormat)} className="w-auto" aria-label="Size to render">
            {(type.formats as readonly MediaFormat[]).map((f) => (
              <option key={f} value={f}>
                {MEDIA_FORMATS[f].label} ({MEDIA_FORMATS[f].ratio})
              </option>
            ))}
          </Select>
          <Button variant="primary" loading={render.isPending} disabled={busy || errors.length > 0 || save.isPending} onClick={() => render.mutate(renderFormat ?? c.format)}>
            <Play className="size-4" aria-hidden /> {isVideo ? "Render video" : c.type === "carousel" ? "Render slides" : "Render image"}
          </Button>
          <Button variant="danger" onClick={() => confirm("Delete this creation?") && remove.mutate()} aria-label="Delete">
            <Trash2 className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
      {render.error && <ErrorNote error={render.error} />}
      {save.error && <ErrorNote error={save.error} />}
      <ChecksBar checks={c.checks} />

      {/* Template scripts are read and approved first; nothing is paid for until then. */}
      {spec.templateId && c.renders.length === 0 && (
        <Card className="mb-6">
          <CardHeader title="Your script" description="Read it through. Change anything below or by chat, then approve to start making it." />
          <div className="px-4 pb-4">
            <Storyboard spec={spec} approving={render.isPending} disabled={busy || errors.length > 0 || save.isPending} onApprove={() => render.mutate(renderFormat ?? c.format)} />
          </div>
        </Card>
      )}

      <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)_380px]">
        {/* Scenes */}
        {multiScene && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[13px] font-medium">
                {c.type === "carousel" ? "Slides" : "Scenes"} {isVideo && <span className="text-muted">· {formatDuration(totalMs)}</span>}
              </p>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  update((d) => void d.scenes.splice(index + 1, 0, newScene(isVideo)));
                  setSelected(index + 1);
                }}
                aria-label="Add scene"
              >
                <Plus className="size-4" aria-hidden />
              </Button>
            </div>
            <ol className="space-y-1.5">
              {spec.scenes.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    className={cx("w-full rounded-md border px-2.5 py-2 text-left", i === index ? "border-accent bg-accent-soft" : "border-line bg-surface hover:border-edge")}
                  >
                    <p className="flex justify-between font-mono text-[11px] text-muted uppercase">
                      <span>
                        {i + 1}. {LAYOUT_LABELS[s.layout]}
                      </span>
                      {isVideo && <span>{(s.durationMs / 1000).toFixed(1)}s</span>}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-[13px]">{s.text.headline || s.text.stat || s.narration || "—"}</p>
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-2 flex gap-1">
              <Button size="sm" variant="ghost" disabled={index === 0} onClick={() => (update((d) => void d.scenes.splice(index - 1, 0, d.scenes.splice(index, 1)[0]!)), setSelected(index - 1))} aria-label="Move up">
                <ArrowUp className="size-4" aria-hidden />
              </Button>
              <Button size="sm" variant="ghost" disabled={index === spec.scenes.length - 1} onClick={() => (update((d) => void d.scenes.splice(index + 1, 0, d.scenes.splice(index, 1)[0]!)), setSelected(index + 1))} aria-label="Move down">
                <ArrowDown className="size-4" aria-hidden />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => (update((d) => void d.scenes.splice(index + 1, 0, { ...structuredClone(scene), id: `s${Date.now().toString(36)}` })), setSelected(index + 1))} aria-label="Duplicate">
                <Copy className="size-4" aria-hidden />
              </Button>
              <Button size="sm" variant="ghost" disabled={spec.scenes.length <= 1} onClick={() => (update((d) => void d.scenes.splice(index, 1)), setSelected(Math.max(0, index - 1)))} aria-label="Delete scene">
                <Trash2 className="size-4" aria-hidden />
              </Button>
            </div>
          </div>
        )}

        {/* Preview and results */}
        <div className={cx("min-w-0 space-y-4", !multiScene && "xl:col-span-2")}>
          <div className={cx("mx-auto", MEDIA_FORMATS[renderFormat ?? c.format].height > MEDIA_FORMATS[renderFormat ?? c.format].width ? "max-w-sm" : "max-w-2xl")}>
            <ScenePreview creationId={creationId} scene={index} format={renderFormat ?? c.format} version={version} />
            <p className="mt-2 text-center text-xs text-faint">
              Live preview of {multiScene ? `scene ${index + 1}` : "the image"}. {isVideo ? "Motion, voice and captions appear in the render." : ""}
            </p>
          </div>
          {latestVideo && (
            <FormatFrame format={latest!.format} className="mx-auto max-w-sm">
              <video src={assetUrl(latestVideo)} poster={assetUrl(latest!.posterAssetId)} controls playsInline className="size-full" />
            </FormatFrame>
          )}
          {latest?.status === "done" && !isVideo && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {latest.outputAssetIds.map((id) => (
                <a key={id} href={assetUrl(id)} target="_blank" rel="noreferrer">
                  <img src={assetUrl(id)} alt="" className="w-full rounded-md border border-line" onError={(e) => (e.currentTarget.style.display = "none")} />
                </a>
              ))}
            </div>
          )}
          <Card>
            <CardHeader title="Change it by chat" description="Say what to change. Only the parts it touches are made again." />
            <div className="px-4 pb-4">
              <ChatPanel
                creationId={c.id}
                onApplied={(next, updated) => {
                  setSpec(creationSpec.parse(structuredClone(next)));
                  queryClient.setQueryData(["creation", creationId], (old: (Creation & { renders: Render[] }) | undefined) => (old ? { ...old, ...updated } : old));
                  setVersion((v) => v + 1);
                }}
              />
            </div>
          </Card>
          {(c.renders.length > 0 || spec.templateId) && (
            <Card>
              <CardHeader title="Production" description="Every picture, clip and sound as it is made. Finished ones are reused on the next render." />
              <div className="px-4 pb-4">
                <ProductionBoard creationId={c.id} scenes={spec.scenes} cast={spec.cast} live={c.renders.some((r) => r.status === "queued" || r.status === "running")} />
              </div>
            </Card>
          )}
          <Card>
            <CardHeader title="Renders" description={isVideo ? "Each render makes any missing pictures, voice and music first; those are reused next time." : undefined} />
            <ul className="divide-y divide-line">
              {c.renders.length === 0 && <li className="px-4 py-3 text-[13px] text-muted">Not rendered yet.</li>}
              {c.renders.slice(0, 6).map((r) => (
                <li key={r.id} className="px-4 py-3">
                  <RenderResult render={r} />
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Inspector */}
        <div className="space-y-4">
          <Card>
            <CardHeader title={multiScene ? `${c.type === "carousel" ? "Slide" : "Scene"} ${index + 1}` : "Content"} />
            <div className="space-y-3 p-4">
              <Field label="Layout">
                <Select value={scene.layout} onChange={(e) => updateScene((s) => void (s.layout = e.target.value as Scene["layout"]))}>
                  {SCENE_LAYOUTS.map((l) => (
                    <option key={l} value={l}>
                      {LAYOUT_LABELS[l]}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Small line above">
                <Input value={scene.text.eyebrow} onChange={(e) => setText("eyebrow", e.target.value)} />
              </Field>
              <Field label={scene.layout === "quote" ? "Quote" : "Headline"}>
                <Textarea value={scene.text.headline} onChange={(e) => setText("headline", e.target.value)} rows={2} className="min-h-0" />
              </Field>
              {["hero", "statement", "stat", "product", "split", "offer", "cta"].includes(scene.layout) && (
                <Field label="Text">
                  <Textarea value={scene.text.body} onChange={(e) => setText("body", e.target.value)} rows={2} className="min-h-0" />
                </Field>
              )}
              {["stat", "product", "offer"].includes(scene.layout) && (
                <Field label={scene.layout === "product" ? "Price" : scene.layout === "offer" ? "Offer badge" : "Big number"}>
                  <Input value={scene.text.stat} onChange={(e) => setText("stat", e.target.value)} />
                </Field>
              )}
              {["list", "split"].includes(scene.layout) && (
                <Field label="Points" hint="One per line, up to five.">
                  <Textarea
                    value={scene.text.bullets.join("\n")}
                    onChange={(e) =>
                      updateScene((s) => void (s.text.bullets = e.target.value.split("\n").slice(0, 5)))
                    }
                    rows={3}
                  />
                </Field>
              )}
              {scene.layout === "quote" && (
                <Field label="Who said it">
                  <Input value={scene.text.attribution} onChange={(e) => setText("attribution", e.target.value)} />
                </Field>
              )}
              <Field label="Button">
                <Input value={scene.text.cta} onChange={(e) => setText("cta", e.target.value)} />
              </Field>
              <MediaPicker projectId={projectId} label="Picture" value={scene.media} onChange={(ref) => updateScene((s) => void (s.media = ref))} allowVideo={isVideo} />
              <MediaPicker projectId={projectId} label="Backdrop (full-bleed photo behind the text)" value={scene.background} onChange={(ref) => updateScene((s) => void (s.background = ref))} allowVideo={isVideo} />
              {isVideo && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Seconds">
                      <Input
                        type="number"
                        min={0.5}
                        max={30}
                        step={0.5}
                        value={scene.durationMs / 1000}
                        onChange={(e) => updateScene((s) => void (s.durationMs = Math.round(Math.max(0.5, Math.min(30, Number(e.target.value) || 3)) * 1000)))}
                      />
                    </Field>
                    <Field label="Comes in with">
                      <Select value={scene.transition} onChange={(e) => updateScene((s) => void (s.transition = e.target.value as Scene["transition"]))}>
                        <option value="fade">Fade</option>
                        <option value="slide">Slide</option>
                        <option value="zoom">Zoom</option>
                        <option value="cut">Cut</option>
                      </Select>
                    </Field>
                  </div>
                  <Field label="Voiceover" hint="The scene lasts at least as long as this takes to say.">
                    <Textarea value={scene.narration} onChange={(e) => updateScene((s) => void (s.narration = e.target.value))} rows={3} />
                  </Field>
                  {spec.captions !== "none" && (
                    <Field label="Caption keywords" hint="Words from the voiceover the captions show in colour, separated by commas. Numbers are always highlighted.">
                      <Input
                        value={scene.emphasis.join(", ")}
                        onChange={(e) => updateScene((s) => void (s.emphasis = e.target.value.split(",").map((w) => w.trim()).filter(Boolean).slice(0, 4)))}
                        placeholder="sourdough, Saturday"
                      />
                    </Field>
                  )}
                </>
              )}
            </div>
          </Card>

          <Card>
            <CardHeader title="Whole post" />
            <div className="space-y-3 p-4">
              <Field label="Style">
                <Select value={spec.style} onChange={(e) => update((d) => void (d.style = e.target.value))}>
                  <option value="clean">Clean: your background colour</option>
                  <option value="bold">Bold: on your brand colour</option>
                </Select>
              </Field>
              {isVideo && (
                <>
                  <label className="flex items-center gap-2 text-[13px]">
                    <input type="checkbox" checked={spec.audio.voice.enabled} onChange={(e) => update((d) => void (d.audio.voice.enabled = e.target.checked))} className="accent-[var(--color-accent)]" />
                    Voiceover
                  </label>
                  <Field label="Music" hint="Described in words; made once (about $0.08) and reused.">
                    <Input value={spec.audio.music.prompt} onChange={(e) => update((d) => void ((d.audio.music.prompt = e.target.value), (d.audio.music.assetId = null)))} placeholder="calm lo-fi piano, 80 bpm" />
                  </Field>
                  <Field label={`Music volume (${Math.round(spec.audio.music.volume * 100)}%)`}>
                    <input type="range" min={0} max={60} value={Math.round(spec.audio.music.volume * 100)} onChange={(e) => update((d) => void (d.audio.music.volume = Number(e.target.value) / 100))} className="w-full accent-[var(--color-accent)]" />
                  </Field>
                  <Field label="Captions" hint={captionsOn ? CAPTION_PRESETS[captionValue as CaptionPreset].description : "No captions burned in. Most people watch without sound, so captions are worth it."}>
                    <Select
                      value={captionValue}
                      onChange={(e) =>
                        update((d) => {
                          if (e.target.value === "none") d.captions = "none";
                          else {
                            d.captions = "word";
                            d.captionStyle.preset = e.target.value as CaptionPreset;
                          }
                        })
                      }
                    >
                      {CAPTION_PRESET_KEYS.map((key) => (
                        <option key={key} value={key}>
                          {CAPTION_PRESETS[key].label}
                        </option>
                      ))}
                      <option value="none">No captions</option>
                    </Select>
                  </Field>
                  {captionsOn && (
                    <div className="grid grid-cols-[1fr_auto] items-end gap-3">
                      <Field label="Caption position">
                        <Select value={spec.captionStyle.position} onChange={(e) => update((d) => void (d.captionStyle.position = e.target.value as "lower" | "upper"))}>
                          <option value="lower">Lower, above the app&apos;s buttons</option>
                          <option value="upper">Upper, below the top bar</option>
                        </Select>
                      </Field>
                      <Field label="Highlight">
                        <div className="flex items-center gap-1.5">
                          <label className="relative block size-9 cursor-pointer overflow-hidden rounded-md border border-line" title="Highlight colour">
                            <span className="absolute inset-0" style={{ background: spec.captionStyle.accent ?? "conic-gradient(#ffe500, #3ce65a, #ffe500)" }} />
                            <input
                              type="color"
                              value={spec.captionStyle.accent ?? "#ffe500"}
                              onChange={(e) => update((d) => void (d.captionStyle.accent = e.target.value))}
                              className="absolute inset-0 cursor-pointer opacity-0"
                              aria-label="Caption highlight colour"
                            />
                          </label>
                          {spec.captionStyle.accent && (
                            <button type="button" onClick={() => update((d) => void (d.captionStyle.accent = null))} className="text-xs text-muted hover:text-ink">
                              Reset
                            </button>
                          )}
                        </div>
                      </Field>
                    </div>
                  )}
                </>
              )}
              <Field label="Post caption" hint="Copy this when you post.">
                <Textarea
                  value={meta.caption}
                  onChange={(e) => {
                    const next = { ...meta, caption: e.target.value };
                    setMeta(next);
                    queueSave(spec, next);
                  }}
                  rows={5}
                />
              </Field>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
