"use client";

import { type CreationSpec } from "@openpromo/shared";
import { useMutation } from "@tanstack/react-query";
import { SendHorizontal, Sparkles } from "lucide-react";
import { useState } from "react";
import { api } from "@/lib/api";
import type { Creation } from "@/lib/hooks";
import { Button, cx, ErrorNote, Textarea } from "./ui";

type Turn = { role: "user" | "assistant"; text: string; changes?: string[]; estimateUsd?: number };
type ChatResult = { reply: string; changes: string[]; estimateUsd: number; creation: Creation };

const SUGGESTIONS = ["Make the colours warmer", "Shorter, punchier voiceover", "Change the main character to a cat", "Use a bolder caption style"];

/**
 * Change a creation by saying what you want. Each message becomes edits to the scenes, cast,
 * colours, voice, music or captions; the next render only remakes what the edits touched.
 */
export function ChatPanel({ creationId, onApplied }: { creationId: string; onApplied: (spec: CreationSpec, creation: Creation) => void }) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [message, setMessage] = useState("");
  const send = useMutation({
    mutationFn: (text: string) =>
      api<ChatResult>(`/creations/${creationId}/chat`, { method: "POST", body: { message: text, history: turns.map(({ role, text }) => ({ role, text })) } }),
    onSuccess: (result) => {
      setTurns((t) => [...t, { role: "assistant", text: result.reply, changes: result.changes, estimateUsd: result.estimateUsd }]);
      onApplied(result.creation.spec, result.creation);
    },
  });
  const submit = (text: string) => {
    const clean = text.trim();
    if (!clean || send.isPending) return;
    setTurns((t) => [...t, { role: "user", text: clean }]);
    setMessage("");
    send.mutate(clean);
  };

  return (
    <div className="space-y-3">
      {turns.length === 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" onClick={() => submit(s)} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted hover:border-edge hover:text-ink">
              {s}
            </button>
          ))}
        </div>
      ) : (
        <ol className="max-h-72 space-y-2 overflow-y-auto pr-1">
          {turns.map((turn, i) => (
            <li key={i} className={cx("max-w-[90%] rounded-lg px-3 py-2 text-[13px]", turn.role === "user" ? "ml-auto bg-accent/10" : "bg-sunken")}>
              <p>{turn.text}</p>
              {turn.changes?.length ? (
                <p className="mt-1 text-[11px] text-muted">
                  Changed: {turn.changes.join(" · ")}
                  {turn.estimateUsd ? ` · next render about $${turn.estimateUsd.toFixed(2)}` : " · next render reuses everything else"}
                </p>
              ) : null}
            </li>
          ))}
          {send.isPending && <li className="w-fit rounded-lg bg-sunken px-3 py-2 text-[13px] text-muted">Working on it…</li>}
        </ol>
      )}
      <form
        className="flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          submit(message);
        }}
      >
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit(message);
            }
          }}
          rows={2}
          placeholder="e.g. Change red to blue, make the owl wear glasses, end on the free trial"
          className="min-h-10 flex-1"
          aria-label="Describe a change"
        />
        <Button type="submit" variant="primary" loading={send.isPending} disabled={!message.trim()} aria-label="Send">
          <SendHorizontal className="size-4" aria-hidden />
        </Button>
      </form>
      <p className="flex items-center gap-1 text-[11px] text-faint">
        <Sparkles className="size-3" aria-hidden /> Each message costs about a cent. Changes save at once; render again to see them.
      </p>
      {send.error && <ErrorNote error={send.error} />}
    </div>
  );
}
