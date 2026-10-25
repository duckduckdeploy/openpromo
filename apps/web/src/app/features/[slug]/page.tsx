import { AppScreenshot } from '@/components/app-screenshot';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { ButtonLink } from '@/components/button';
import { CtaBand } from '@/components/cta-band';
import { ExampleGallery } from '@/components/example-gallery';
import { FaqList } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { PriceTable } from '@/components/price-table';
import { StatusNote } from '@/components/section';
import { YepapiOffer } from '@/components/yepapi-offer';
import { features, getFeature } from '@/content/features';
import { pageMeta } from '@/lib/metadata';
import { breadcrumbList, faqPage } from '@/lib/schema';
import { SIGN_UP_URL, SITE_NAME, SITE_URL } from '@/lib/site';

interface FeaturePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return features.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({ params }: FeaturePageProps): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) return {};

  return pageMeta({
    title: feature.seoTitle,
    description: feature.description,
    path: `/features/${feature.slug}`,
    absoluteTitle: feature.absoluteTitle,
  });
}

const textLink = 'font-medium text-accent-text underline decoration-accent-line underline-offset-4 hover:decoration-accent';

export default async function FeaturePage({ params }: FeaturePageProps) {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) notFound();

  const Icon = feature.icon;
  const related = feature.related.map((other) => getFeature(other)).filter((other) => other !== undefined);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'SoftwareApplication',
              name: `${SITE_NAME} ${feature.name}`,
              url: `${SITE_URL}/features/${feature.slug}`,
              description: feature.description,
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web, Linux, Windows, macOS (Docker)',
              license: 'https://opensource.org/license/mit',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            },
            breadcrumbList([
              { name: 'Features', path: '/features' },
              { name: feature.h1, path: `/features/${feature.slug}` },
            ]),
            faqPage(feature.faqs),
          ],
        }}
      />
      <article>
        {/* Header */}
        <header className="band-cream relative overflow-hidden">
          <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="container-page relative py-20 md:py-28">
            <nav aria-label="Breadcrumb" className="text-center text-sm text-muted">
              <Link href="/features" className="underline-offset-4 hover:text-ink hover:underline">
                Features
              </Link>
              <span className="mx-2 text-faint" aria-hidden="true">
                /
              </span>
              <span aria-current="page" className="font-medium text-ink">
                {feature.h1}
              </span>
            </nav>

            <div className="mx-auto mt-10 max-w-3xl text-center">
              <span className="tile size-14 rounded-lg shadow-hard-sm">
                <Icon className="size-7" aria-hidden="true" strokeWidth={1.75} />
              </span>
              <h1 className="text-display mt-7 text-balance">{feature.h1}</h1>
              <p className="mt-6 font-display text-2xl font-semibold text-balance text-ink md:text-[1.75rem]">{feature.headline}</p>
              <p className="mt-5 text-xl leading-relaxed text-pretty text-muted md:text-[1.375rem]">{feature.summary}</p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href={SIGN_UP_URL} size="lg">
                  Get started
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="#costs" variant="secondary" size="lg">
                  What it costs
                </ButtonLink>
              </div>
            </div>
          </div>
        </header>

        {/* Examples */}
        <section aria-labelledby="examples-title" className="band-white border-y border-line">
          <div className="container-page py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Examples</p>
              <h2 id="examples-title" className="text-title mt-4">
                {feature.examplesTitle}
              </h2>
              <p className="mt-6 text-xl leading-relaxed text-pretty text-muted">
                {feature.examplesNote} Made with OpenPromo’s templates for Crumb &amp; Co, a fictional bakery.
              </p>
            </div>
            <div className="mx-auto mt-14 max-w-6xl">
              <ExampleGallery ids={feature.examples} />
            </div>
            {feature.screen ? <AppScreenshot id={feature.screen} className="mt-16" /> : null}
          </div>
        </section>

        {/* How it works */}
        <section aria-labelledby="how-title" className="band-peach">
          <div className="container-page py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">How it works</p>
              <h2 id="how-title" className="text-title mt-4">
                {feature.howTitle}
              </h2>
            </div>
            <ol className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {feature.steps.map((step, index) => (
                <li key={step.title} className="card p-7">
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-orange font-display text-base font-bold text-night">{index + 1}</span>
                  <h3 className="card-title mt-5">{step.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What you can do */}
        <section aria-labelledby="can-title" className="band-night">
          <div className="container-page py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">What you can do</p>
              <h2 id="can-title" className="text-title mt-4">
                {feature.capabilitiesTitle}
              </h2>
            </div>
            <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2">
              {feature.capabilities.map((capability) => (
                <li key={capability.title} className="card flex gap-5 p-7">
                  <span className="tile size-10 shrink-0">
                    <Check className="size-4" aria-hidden="true" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="card-title">{capability.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted [overflow-wrap:anywhere]">{capability.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What each action costs */}
        <section id="costs" aria-labelledby="costs-title" className="band-cream container-page scroll-mt-20 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">What it costs</p>
            <h2 id="costs-title" className="text-title mt-4">
              {feature.costsTitle}
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-pretty text-muted">
              OpenPromo charges nothing. AI calls are billed to your own YepAPI key at YepAPI’s prices, shown here at the time of
              writing. Settings and usage lists every call with its cost.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <PriceTable caption={`What ${feature.name} actions cost`} rows={feature.costs} />
            <div className="mt-6 space-y-3 text-center text-[0.9375rem] text-muted">
              {feature.costNote ? <p>{feature.costNote}</p> : null}
              <p>
                <Link href="/pricing" className={textLink}>
                  See all pricing
                </Link>
              </p>
            </div>
            <div className="mt-10">
              <StatusNote>OpenPromo is an early project in active development. Parts of what this page describes may change.</StatusNote>
            </div>
          </div>
        </section>

        <YepapiOffer />

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="band-white border-b border-line">
          <div className="container-page py-20 md:py-28">
            <div className="mx-auto max-w-3xl">
              <h2 id="faq-title" className="text-title text-center">
                {feature.h1} FAQ
              </h2>
              <div className="mt-12">
                <FaqList faqs={feature.faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* Related features and the setup guide */}
        <nav aria-labelledby="related-title" className="container-page py-20 md:py-28">
          <h2 id="related-title" className="text-title text-center">
            More AI marketing tool features
          </h2>
          <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((other) => (
              <li key={other.slug}>
                <Link href={`/features/${other.slug}`} className="card card-link group flex h-full flex-col gap-2 p-6">
                  <span className="font-display text-xl font-semibold transition-colors group-hover:text-accent-text">{other.h1}</span>
                  <span className="text-[0.9375rem] leading-relaxed text-muted">{other.summary}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/docs/getting-started" className="card card-link group flex h-full flex-col gap-2 p-6">
                <span className="font-display text-xl font-semibold transition-colors group-hover:text-accent-text">Getting started</span>
                <span className="text-[0.9375rem] leading-relaxed text-muted">Add your key, set a limit, add your website and make your first post.</span>
              </Link>
            </li>
          </ul>
        </nav>
      </article>
      <CtaBand />
    </>
  );
}
