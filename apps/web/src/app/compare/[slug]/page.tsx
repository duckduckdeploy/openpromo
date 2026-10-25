import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { ButtonLink } from '@/components/button';
import { CtaBand } from '@/components/cta-band';
import { FaqList } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { comparisons, getComparison } from '@/content/compare';
import { pageMeta } from '@/lib/metadata';
import { breadcrumbList, faqPage } from '@/lib/schema';
import { SIGN_UP_URL } from '@/lib/site';

interface ComparePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return comparisons.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) return {};
  return pageMeta({ title: comparison.seoTitle, description: comparison.description, path: `/compare/${comparison.slug}` });
}

const th = 'border-b border-line bg-sunken px-5 py-3 text-left text-xs font-semibold tracking-wide text-faint uppercase';

export default async function ComparePage({ params }: ComparePageProps) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();
  const others = comparisons.filter((other) => other.slug !== comparison.slug);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            breadcrumbList([
              { name: 'Compare', path: '/compare' },
              { name: comparison.h1, path: `/compare/${comparison.slug}` },
            ]),
            faqPage(comparison.faqs),
          ],
        }}
      />
      <article>
        <header className="band-cream relative overflow-hidden">
          <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="container-page relative py-20 md:py-28">
            <nav aria-label="Breadcrumb" className="text-center text-sm text-muted">
              <Link href="/compare" className="underline-offset-4 hover:text-ink hover:underline">
                Compare
              </Link>
              <span className="mx-2 text-faint" aria-hidden="true">
                /
              </span>
              <span aria-current="page" className="font-medium text-ink">
                {comparison.h1}
              </span>
            </nav>
            <div className="mx-auto mt-10 max-w-3xl text-center">
              <h1 className="text-display text-balance">{comparison.h1}</h1>
              <p className="mt-6 font-display text-2xl font-semibold text-balance text-ink md:text-[1.75rem]">{comparison.headline}</p>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-pretty text-muted">
                {comparison.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href={SIGN_UP_URL} size="lg">
                  Try OpenPromo
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/docs/self-hosting" variant="secondary" size="lg">
                  Self-host it
                </ButtonLink>
              </div>
            </div>
          </div>
        </header>

        <section aria-labelledby="table-title" className="band-white border-y border-line">
          <div className="container-page py-20 md:py-28">
            <h2 id="table-title" className="text-title text-center">
              {comparison.name} vs OpenPromo at a glance
            </h2>
            <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-lg border border-line bg-surface shadow-hard-sm">
              <table className="stack-table w-full border-collapse text-sm">
                <caption className="sr-only">
                  OpenPromo and {comparison.name} compared
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className={th}>
                      <span className="sr-only">Aspect</span>
                    </th>
                    <th scope="col" className={th}>
                      OpenPromo
                    </th>
                    <th scope="col" className={th}>
                      {comparison.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((row) => (
                    <tr key={row.label} className="border-b border-line align-top last:border-b-0">
                      <th scope="row" className="px-5 py-4 text-left font-medium text-ink">
                        {row.label}
                      </th>
                      <td data-label="OpenPromo" data-highlight="" className="bg-accent-soft/50 px-5 py-4 text-ink">
                        {row.openpromo}
                      </td>
                      <td data-label={comparison.name} className="px-5 py-4 text-muted">
                        {row.them}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mx-auto mt-5 max-w-3xl text-center text-sm text-faint">
              Based on {comparison.name}’s public information at the time of writing. Products change; check their site for the
              current details.
            </p>
          </div>
        </section>

        <section aria-labelledby="diff-title" className="band-peach">
          <div className="container-page py-20 md:py-28">
            <h2 id="diff-title" className="text-title text-center">
              How OpenPromo differs from {comparison.name}
            </h2>
            <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2">
              {comparison.differences.map((difference) => (
                <li key={difference.title} className="card flex gap-5 p-7">
                  <span className="tile size-10 shrink-0">
                    <Check className="size-4" aria-hidden="true" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="card-title">{difference.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{difference.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="fit-title" className="band-cream">
          <div className="container-page py-20 md:py-28">
            <div className="mx-auto max-w-3xl">
              <h2 id="fit-title" className="text-title text-center">
                When {comparison.name} is the better choice
              </h2>
              <ul className="mt-10 space-y-3">
                {comparison.theirFit.map((item) => (
                  <li key={item} className="card flex items-start gap-3 p-5 text-[0.9375rem] text-ink">
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-orange-text" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-center text-muted">
                OpenPromo does not publish or schedule posts, and has no AI avatars. It makes the media, from your brand.{' '}
                <Link href="/features" className="font-medium text-accent-text underline underline-offset-4">
                  See every feature
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="faq-title" className="band-night">
          <div className="container-page py-20 md:py-28">
            <div className="mx-auto max-w-3xl">
              <h2 id="faq-title" className="text-title text-center">
                {comparison.h1} FAQ
              </h2>
              <div className="mt-12">
                <FaqList faqs={comparison.faqs} />
              </div>
            </div>
          </div>
        </section>

        <nav aria-labelledby="more-title" className="container-page py-20 md:py-28">
          <h2 id="more-title" className="text-title text-center">
            More OpenPromo comparisons
          </h2>
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link href={`/compare/${other.slug}`} className="card card-link inline-flex px-5 py-3 font-medium hover:text-accent-text">
                  {other.h1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
      <CtaBand />
    </>
  );
}
