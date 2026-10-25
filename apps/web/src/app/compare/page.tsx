import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CtaBand } from '@/components/cta-band';
import { JsonLd } from '@/components/json-ld';
import { SectionHeader } from '@/components/section';
import { comparisons } from '@/content/compare';
import { pageMeta } from '@/lib/metadata';
import { breadcrumbList } from '@/lib/schema';

export const metadata = pageMeta({
  title: 'OpenPromo Alternatives and Comparisons',
  description:
    'How OpenPromo compares with Canva, InVideo, Arcads, Creatify, Predis.ai and Google Pomelli: open source, self-hosted, and built from your own website.',
  path: '/compare',
});

export default function CompareIndexPage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', ...breadcrumbList([{ name: 'Compare', path: '/compare' }]) }} />
      <section aria-labelledby="compare-title" className="container-page py-20 md:py-28 xl:py-32">
        <SectionHeader
          as="h1"
          eyebrow="Compare"
          id="compare-title"
          title="OpenPromo compared"
          lede="Most marketing media tools are hosted, closed source and sold as subscriptions. OpenPromo is open source, runs on your own server, and you pay only your own AI usage. Here is how it compares, honestly."
        />
        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {comparisons.map((comparison) => (
            <li key={comparison.slug} className="card card-link group flex flex-col p-7">
              <h2 className="card-title">
                <Link href={`/compare/${comparison.slug}`} className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none">
                  {comparison.h1}
                </Link>
              </h2>
              <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-muted">{comparison.summary}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text" aria-hidden="true">
                Read the comparison
                <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
