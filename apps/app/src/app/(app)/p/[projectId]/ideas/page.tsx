"use client";

import { CHANNELS, CREATION_TYPES, type CreationType, IDEA_GOALS, type IdeaGoal } from "@openpromo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Archive, Check, Copy, Sparkles, Trash2, Wand2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Badge, Button, Card, EmptyState, ErrorNote, Field, Input, PageHeader, Select, Spinner } from "@/components/ui";
import { api } from "@/lib/api";
import { type Creation, type Idea, useIdeas, useProject } from "@/lib/hooks";

function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        void navigator.clipboard.writeText(text).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        });
      }}
    >
      {done ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />} {done ? "Copied" : "Copy caption"}
    </Button>
  );
}

function IdeaCard({ idea, projectId }: { idea: Idea; projectId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const make = useMutation({
    mutationFn: () => api<Creation>(`/projects/${projectId}/creations`, { method: "POST", body: { type: idea.type, ideaId: idea.id } }),
    onSuccess: (creation) => {
      void queryClient.invalidateQueries({ queryKey: ["ideas", projectId] });
      void queryClient.invalidateQueries({ queryKey: ["creations", projectId] });
      router.push(`/p/${projectId}/c/${creation.id}`);
    },
  });
  const update = useMutation({
    mutationFn: (body: Partial<Idea>) => api(`/ideas/${idea.id}`, { method: "PATCH", body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ideas", projectId] }),
  });
  const remove = useMutation({
    mutationFn: () => api(`/ideas/${idea.id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ideas", projectId] }),
  });
  const caption = `${idea.caption}\n\n${idea.hashtags.map((h) => `#${h}`).join(" ")}`.trim();

  return (
    <Card className="flex flex-col">
      <div className="flex flex-wrap items-center gap-1.5 border-b border-line px-4 py-2.5">
        <Badge tone="accent">{CREATION_TYPES[idea.type].label}</Badge>
        <Badge>{idea.channel}</Badge>
        <Badge>{IDEA_GOALS[idea.goal] ?? idea.goal}</Badge>
        {idea.status === "used" && <Badge tone="pos">Made</Badge>}
      </div>
      <div className="flex-1 space-y-2 p-4">
        <p className="font-display text-base font-semibold">{idea.title}</p>
        <p className="text-[15px] font-medium text-accent-text">“{idea.hook}”</p>
        {idea.body && <p className="text-[13px] text-muted">{idea.body}</p>}
        <p className="rounded-md bg-sunken px-3 py-2 text-[13px] whitespace-pre-line">{idea.caption}</p>
        {idea.hashtags.length > 0 && <p className="font-mono text-xs text-muted">{idea.hashtags.map((h) => `#${h}`).join(" ")}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-1 border-t border-line px-3 py-2">
        <Button variant="primary" size="sm" loading={make.isPending} onClick={() => make.mutate()}>
          <Wand2 className="size-4" aria-hidden /> Make it
        </Button>
        <CopyButton text={caption} />
        <div className="ml-auto flex gap-1">
          {idea.status !== "archived" && (
            <Button variant="ghost" size="sm" onClick={() => update.mutate({ status: "archived" })} aria-label="Archive">
              <Archive className="size-4" aria-hidden />
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => remove.mutate()} aria-label="Delete">
            <Trash2 className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
      {make.isPending && <p className="px-4 pb-3 text-xs text-muted">Writing it… this takes 10–30 seconds.</p>}
      {make.error && (
        <div className="px-4 pb-3">
          <ErrorNote error={make.error} />
        </div>
      )}
    </Card>
  );
}

export default function IdeasPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = useProject(projectId);
  const ideas = useIdeas(projectId);
  const queryClient = useQueryClient();
  const [form, setForm] = useState<{ count: number; goal: IdeaGoal | ""; channel: string; type: CreationType | ""; notes: string }>({ count: 8, goal: "", channel: "", type: "", notes: "" });
  const [show, setShow] = useState<"open" | "archived">("open");

  const generate = useMutation({
    mutationFn: () =>
      api<Idea[]>(`/projects/${projectId}/ideas`, {
        method: "POST",
        body: { count: form.count, goal: form.goal || undefined, channel: form.channel || undefined, type: form.type || undefined, notes: form.notes || undefined },
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ideas", projectId] }),
  });

  const ready = project.data?.brandStatus === "ready" || Boolean(project.data?.brand);
  const visible = (ideas.data ?? []).filter((i) => (show === "archived" ? i.status === "archived" : i.status !== "archived"));

  return (
    <>
      <PageHeader title="Post ideas" description="Specific posts built from your selling points, each with a hook, caption and hashtags. Make any of them in one click." />
      <Card className="mb-6 p-4">
        <form
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[90px_1fr_1fr_1fr_2fr_auto] lg:items-end"
          onSubmit={(e) => {
            e.preventDefault();
            generate.mutate();
          }}
        >
          <Field label="How many">
            <Input type="number" min={1} max={20} value={form.count} onChange={(e) => setForm({ ...form, count: Number(e.target.value) })} />
          </Field>
          <Field label="Goal">
            <Select value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value as IdeaGoal | "" })}>
              <option value="">Any</option>
              {Object.entries(IDEA_GOALS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Channel">
            <Select value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })}>
              <option value="">Any</option>
              {CHANNELS.map((c) => (
                <option key={c} value={c}>
                  {c[0]!.toUpperCase() + c.slice(1)}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Format">
            <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as CreationType | "" })}>
              <option value="">Best fit</option>
              {Object.entries(CREATION_TYPES).map(([key, t]) => (
                <option key={key} value={key}>
                  {t.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Notes (optional)">
            <Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="e.g. summer sale, new matcha range" />
          </Field>
          <Button type="submit" variant="primary" loading={generate.isPending} disabled={!ready}>
            <Sparkles className="size-4" aria-hidden /> Get ideas
          </Button>
        </form>
        {!ready && <p className="mt-2 text-xs text-muted">Ideas come once the brand profile is ready.</p>}
        {generate.error && (
          <div className="mt-3">
            <ErrorNote error={generate.error} />
          </div>
        )}
      </Card>

      <div className="mb-4 flex gap-1">
        <Button size="sm" variant={show === "open" ? "secondary" : "ghost"} onClick={() => setShow("open")}>
          Ideas
        </Button>
        <Button size="sm" variant={show === "archived" ? "secondary" : "ghost"} onClick={() => setShow("archived")}>
          Archived
        </Button>
      </div>

      {ideas.isPending ? (
        <Spinner />
      ) : ideas.error ? (
        <ErrorNote error={ideas.error} />
      ) : visible.length === 0 ? (
        <EmptyState title={show === "archived" ? "Nothing archived" : "No ideas yet"}>{show === "open" && "Ask for a batch above. They come from your own selling points, so nothing is made up."}</EmptyState>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {visible.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} projectId={projectId} />
          ))}
        </div>
      )}
    </>
  );
}
