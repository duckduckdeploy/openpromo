import Link from 'next/link';

/** The OpenPromo mark: a coral square with a play triangle and a spark, the same as the app's (apps/app/src/components/logo.tsx). */
export function LogoMark({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" fill="var(--color-accent)" />
      <path d="M11 9.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 11 9.5Z" fill="var(--color-accent-fg)" />
      <path d="M25 5.5v3M23.5 7h3" stroke="var(--color-accent-fg)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 rounded-sm" aria-label="OpenPromo home">
      <LogoMark />
      <span className="font-display text-lg font-bold tracking-tight text-ink">OpenPromo</span>
    </Link>
  );
}
