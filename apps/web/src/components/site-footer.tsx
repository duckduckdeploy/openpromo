import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { comparisons } from '@/content/compare';
import { docPages } from '@/content/docs';
import { features } from '@/content/features';
import { GITHUB_URL, SIGN_IN_URL, SIGN_UP_URL } from '@/lib/site';
import { Logo } from './logo';
import { ThemeSwitcher } from './theme-switcher';

const linkClass = 'text-[0.9375rem] text-muted transition-colors duration-150 hover:text-ink';

function FooterHeading({ children }: { children: string }) {
  return <h2 className="mb-5 text-sm font-semibold text-ink">{children}</h2>;
}

export function SiteFooter() {
  return (
    <footer className="band-night">
      <div className="container-page grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:py-20">
        <div className="col-span-2 max-w-xs md:col-span-1">
          <Logo />
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
            An open-source AI marketing tool that turns your website into on-brand posts, reels and videos. Run it yourself,
            or use it online.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1 text-xs text-muted">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            Early project, in active development
          </p>
        </div>

        <nav aria-label="Features">
          <FooterHeading>Features</FooterHeading>
          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature.slug}>
                <Link href={`/features/${feature.slug}`} className={linkClass}>
                  {feature.h1}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/open-source-ai-video-generator" className={linkClass}>
                Open-source AI video generator
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Docs and comparisons">
          <FooterHeading>Docs</FooterHeading>
          <ul className="space-y-3">
            {docPages.slice(0, 5).map((doc) => (
              <li key={doc.slug}>
                <Link href={`/docs/${doc.slug}`} className={linkClass}>
                  {doc.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/docs" className={linkClass}>
                All docs
              </Link>
            </li>
          </ul>
          <h2 className="mt-9 mb-5 text-sm font-semibold text-ink">Compare</h2>
          <ul className="space-y-3">
            {comparisons.map((comparison) => (
              <li key={comparison.slug}>
                <Link href={`/compare/${comparison.slug}`} className={linkClass}>
                  {comparison.h1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Project">
          <FooterHeading>Project</FooterHeading>
          <ul className="space-y-3">
            <li>
              <Link href="/pricing" className={linkClass}>
                Pricing
              </Link>
            </li>
            <li>
              <a href={SIGN_UP_URL} className={linkClass}>
                Get started
              </a>
            </li>
            <li>
              <a href={SIGN_IN_URL} className={linkClass}>
                Sign in
              </a>
            </li>
            <li>
              <a href={GITHUB_URL} className={`${linkClass} inline-flex items-center gap-2`} rel="noopener">
                <Code2 className="size-4" aria-hidden="true" />
                GitHub
              </a>
            </li>
            <li>
              <Link href="/privacy" className={linkClass}>
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                Terms
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-faint md:flex-row md:items-center md:justify-between">
          <p>MIT license. Open source and self-hostable.</p>
          <ThemeSwitcher />
          <p>Free to self-host. Your brand and media stay where you put them.</p>
        </div>
      </div>
    </footer>
  );
}
