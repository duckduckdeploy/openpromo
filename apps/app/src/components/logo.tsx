/** The OpenPromo mark and wordmark, the same as the website's (apps/web/src/components/logo.tsx). */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="size-6 shrink-0" aria-hidden="true" focusable="false">
        <rect width="32" height="32" rx="8" fill="var(--color-accent)" />
        <path d="M11 9.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 11 9.5Z" fill="var(--color-accent-fg)" />
        <path d="M25 5.5v3M23.5 7h3" stroke="var(--color-accent-fg)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="font-display font-bold tracking-tight text-ink">OpenPromo</span>
    </span>
  );
}
