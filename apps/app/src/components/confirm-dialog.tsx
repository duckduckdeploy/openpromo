"use client";

import { type ReactNode, useEffect, useId, useRef } from "react";
import { Button, ErrorNote } from "@/components/ui";

/** A native <dialog> shown modally while `open` is true. */
function useDialog(open: boolean) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);
  return ref;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  children,
  confirmLabel,
  danger,
  pending,
  error,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children?: ReactNode;
  confirmLabel: string;
  danger?: boolean;
  pending?: boolean;
  error?: unknown;
}) {
  const ref = useDialog(open);
  const titleId = useId();
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-xl border border-line bg-surface p-0 text-ink shadow-pop backdrop:bg-bg/70"
    >
      {open && (
        <div className="space-y-3 p-4">
          <h2 id={titleId} className="font-display text-base font-semibold">
            {title}
          </h2>
          {children && <div className="space-y-2 text-[13px] text-muted">{children}</div>}
          <ErrorNote error={error} />
          <div className="flex flex-wrap justify-end gap-2 pt-1">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button variant={danger ? "danger" : "primary"} loading={pending} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </div>
        </div>
      )}
    </dialog>
  );
}

// ── Runs ────────────────────────────────────────────────────────────────────

