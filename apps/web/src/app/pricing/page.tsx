import Link from 'next/link';
import { ArrowRight, Check, Info } from 'lucide-react';
import { ButtonLink } from '@/components/button';
import { CtaBand } from '@/components/cta-band';
import { FaqList } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { PriceTable } from '@/components/price-table';
import { SectionHeader } from '@/components/section';
import { YepapiOffer } from '@/components/yepapi-offer';
import { priceRows, pricingFaqs } from '@/content/pricing';
import { pageMeta } from '@/lib/metadata';
import { breadcrumbList, faqPage } from '@/lib/schema';
import { GITHUB_URL, SIGN_UP_URL } from '@/lib/site';

export const metadata = pageMeta({
  title: 'OpenPromo Pricing: Free to Self-Host, Pay per Use',
  absoluteTitle: true,
  description:
    'OpenPromo pricing: free to self-host, every feature unlimited on the hosted app today, and you pay only your own YepAPI usage, under a limit you set.',
  path: '/pricing',
});

const textLink = 'font-medium text-accent-text underline decoration-accent-line underline-offset-4 transition-colors hover:decoration-accent';

const everything = [
  'Brand profile from your website',
  'Post ideas with captions and hashtags',
  'Posts, stories, carousels and banners',
  'Reels with voiceover, music and captions',
  'Promo videos and tutorials',
  'Editor with live preview, and a library of every file',
  'MCP server, REST API and Claude plugin for AI agents',
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [breadcrumbList([{ name: 'Pricing', path: '/pricing' }]), faqPage(pricingFaqs)] }} />

      {/* Header */}
      <section aria-labelledby="pricing-title" className="band-cream relative overflow-hidden">
        <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-page relative py-20 text-center md:py-28">
          <p className="eyebrow">Pricing</p>
          <h1 id="pricing-title" className="text-display mx-auto mt-5 max-w-3xl text-balance">
            OpenPromo <span className="mark">pricing</span>
          </h1>
          <p className="mt-6 font-display text-2xl font-semibold text-balance text-ink md:text-[1.75rem]">Every feature, hosted or on your own server.</p>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-pretty text-muted">
            OpenPromo is open source and free to self-host. The hosted app costs nothing today. What you pay for is the AI work,
            billed per use to your own YepAPI key, under a monthly limit you set.
          </p>
        </div>
      </section>

      {/* Hosted vs self-hosted */}
      <section aria-labelledby="plans-title" className="band-cream container-page pb-20 md:pb-28">
        <h2 id="plans-title" className="sr-only">
          Hosted and self-hosted plans
        </h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Hosted */}
          <article aria-labelledby="hosted-title" className="card flex flex-col rounded-xl p-8 shadow-hard md:p-10">
            <p className="text-sm font-medium text-muted">openpromo.gg</p>
            <h3 id="hosted-title" className="text-heading mt-1">Hosted</h3>
            <p className="mt-5 font-display text-5xl font-bold tracking-tight">$0</p>
            <p className="mt-2 text-muted">Every feature, unlimited, today.</p>
            <ul className="mt-7 space-y-3">
              {everything.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem]">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden="true" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-start gap-3 rounded-lg border border-line bg-sunken p-4 text-[0.9375rem] leading-relaxed text-muted">
              <Info className="mt-0.5 size-4 shrink-0 text-ink" aria-hidden="true" />
              <p>
                <strong className="font-semibold text-ink">An honest note.</strong> OpenPromo is an early, independent project, and
                running the hosted app costs us servers, storage and rendering time. Everything is unlimited now. Depending on how
                the project is funded, the hosted app may get limits later. If it does, we will say so well in advance, and nothing
                you have saved is lost.
              </p>
            </div>
            <div className="mt-auto pt-8">
              <ButtonLink href={SIGN_UP_URL} size="lg" className="w-full">
                Get started
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </article>

          {/* Self-hosted */}
          <article aria-labelledby="self-title" className="card card-featured relative flex flex-col rounded-xl p-8 md:p-10">
            <span className="absolute -top-3.5 left-8 rounded-full bg-orange px-3 py-1 text-xs font-bold tracking-wide text-night uppercase">Every feature, forever</span>
            <p className="text-sm font-medium text-muted">Your own server</p>
            <h3 id="self-title" className="text-heading mt-1">Self-hosted</h3>
            <p className="mt-5 font-display text-5xl font-bold tracking-tight">$0, always</p>
            <p className="mt-2 text-muted">Every feature, with no limits, for good.</p>
            <ul className="mt-7 space-y-3">
              {[
                'Every feature of the hosted app, with no limits',
                'No feature gates, no license keys, no seat counts',
                'Open source under the MIT license: read and change every line',
                'Brand profiles in your own database, media in your own folder',
                'One Docker command on any machine with about 2 vCPU and 4 GB of memory',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem]">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden="true" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-lg border border-accent-line bg-accent-soft p-4 text-[0.9375rem] leading-relaxed text-ink">
              Whatever happens to the hosted app, the self-hosted version stays complete and free to run. It is the same code
              that runs openpromo.gg.
            </p>
            <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
              <ButtonLink href="/docs/self-hosting" size="lg" variant="secondary" className="w-full">
                Self-hosting guide
              </ButtonLink>
              <ButtonLink href={GITHUB_URL} size="lg" variant="secondary" className="w-full">
                Source on GitHub
              </ButtonLink>
            </div>
          </article>
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-[0.9375rem] text-muted">
          Both use your own YepAPI key for AI work, billed per use. Rendering images and carousels from templates costs nothing.
        </p>
      </section>

      <YepapiOffer examples tone="peach" />

      {/* Price table */}
      <section aria-labelledby="table-title" className="band-cream container-page py-20 md:py-28">
        <SectionHeader
          eyebrow="Cost per action"
          id="table-title"
          title="AI cost per action"
          lede="Typical prices at the time of writing. Settings and usage lists every call you make with its cost."
        />
        <div className="mx-auto mt-14 max-w-4xl md:mt-16">
          <PriceTable caption="Typical prices for common actions" rows={priceRows} />
          <ul className="mt-6 space-y-3 text-[0.9375rem] text-muted">
            <li>Prices at the time of writing, set by YepAPI, which may change them.</li>
            <li>Generated pieces are cached: rendering again after an edit only pays for what is new.</li>
            <li>A monthly limit in Settings refuses any call whose price would cross it.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="band-night">
        <div className="container-page py-20 md:py-28">
          <SectionHeader eyebrow="FAQ" id="faq-title" title="OpenPromo pricing FAQ" />
          <div className="mx-auto mt-12 max-w-3xl">
            <FaqList faqs={pricingFaqs} />
            <p className="mt-6 text-muted">
              Want to run it yourself?{' '}
              <Link href="/docs/self-hosting" className={textLink}>
                Read the self-hosting guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
