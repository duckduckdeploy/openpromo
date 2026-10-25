import Link from 'next/link';
import { ArrowRight, Check, Container, X } from 'lucide-react';
import { Band } from '@/components/band';
import { ButtonLink } from '@/components/button';
import { CodeBlock } from '@/components/code-block';
import { CtaBand } from '@/components/cta-band';
import { ExampleGallery } from '@/components/example-gallery';
import { FaqList } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { PriceTable } from '@/components/price-table';
import { SectionHeader } from '@/components/section';
import { YepapiOffer } from '@/components/yepapi-offer';
import { LANDSCAPE_EXAMPLES, VIDEO_EXAMPLES } from '@/content/examples';
import { selfHostDocker } from '@/content/snippets';
import { aiLayers, pipeline, selfHostRequirements, videoCosts, videoFaqs, videoKinds, videoPage } from '@/content/video-generator';
import { pageMeta } from '@/lib/metadata';
import { breadcrumbList, faqPage } from '@/lib/schema';
import { SIGN_UP_URL, SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata = pageMeta({ title: videoPage.seoTitle, description: videoPage.description, path: videoPage.path });

export default function VideoGeneratorPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'SoftwareApplication',
              name: `${SITE_NAME} video generator`,
              url: `${SITE_URL}${videoPage.path}`,
              description: videoPage.description,
              applicationCategory: 'MultimediaApplication',
              operatingSystem: 'Web, Linux, Windows, macOS (Docker)',
              license: 'https://opensource.org/license/mit',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            },
            breadcrumbList([{ name: videoPage.h1, path: videoPage.path }]),
            faqPage(videoFaqs),
          ],
        }}
      />

      <section aria-labelledby="hero-title" className="band-cream relative overflow-hidden">
        <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-page relative py-20 text-center md:py-28">
          <p className="eyebrow">Open source · MIT license</p>
          <h1 id="hero-title" className="text-display mx-auto mt-5 max-w-4xl text-balance">
            {videoPage.h1}
          </h1>
          <p className="text-lede mx-auto mt-7 max-w-2xl">{videoPage.lede}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={SIGN_UP_URL} size="lg">
              Get started
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/docs/self-hosting" variant="secondary" size="lg">
              <Container className="size-5" aria-hidden="true" />
              Self-host with Docker
            </ButtonLink>
          </div>
        </div>
      </section>

      <Band tone="white" labelledBy="examples-title" className="border-y border-line">
        <SectionHeader
          eyebrow="Examples"
          id="examples-title"
          title="Open-source video generator examples"
          lede="Stills from a reel and a promo video made for Crumb & Co, a fictional bakery. In the videos, captions appear word by word over each scene."
        />
        <div className="mx-auto mt-14 max-w-5xl">
          <ExampleGallery ids={VIDEO_EXAMPLES} labels={false} />
        </div>
        <div className="mx-auto mt-6 max-w-6xl">
          <ExampleGallery ids={LANDSCAPE_EXAMPLES} labels={false} />
        </div>
        {/* TODO: embed a rendered example reel (MP4 with poster) here once one is published. */}
      </Band>

      <Band tone="peach" labelledBy="kinds-title">
        <SectionHeader eyebrow="What it makes" id="kinds-title" title="AI video for reels, promos and tutorials" />
        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
          {videoKinds.map((kind) => (
            <li key={kind.title} className="card flex flex-col p-7">
              <h3 className="card-title">{kind.title}</h3>
              <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-muted">{kind.body}</p>
              <Link href={kind.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text underline-offset-4 hover:underline">
                {kind.link}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="cream" labelledBy="pipeline-title">
        <SectionHeader
          eyebrow="How it renders"
          id="pipeline-title"
          title="How the video generator renders"
          lede="No hidden model makes the whole video. Each step is plain, open code you can run and change."
        />
        <ol className="mx-auto mt-14 max-w-3xl space-y-4">
          {pipeline.map((step, index) => (
            <li key={step.title} className="card flex gap-5 p-6">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-orange font-display text-base font-bold text-night">{index + 1}</span>
              <div>
                <h3 className="card-title">{step.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Band>

      <Band tone="night" labelledBy="ai-title">
        <SectionHeader
          eyebrow="Where AI fits"
          id="ai-title"
          title="AI video layers, never AI text"
          lede="Garbled lettering is the usual giveaway of AI video. OpenPromo keeps text out of the models’ hands."
        />
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
          <div className="card p-7">
            <h3 className="card-title">What AI makes</h3>
            <ul className="mt-5 space-y-3">
              {aiLayers.does.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem]">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden="true" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-7">
            <h3 className="card-title">What AI never does</h3>
            <ul className="mt-5 space-y-3">
              {aiLayers.never.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem]">
                  <X className="mt-0.5 size-4 shrink-0 text-orange-text" aria-hidden="true" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Band>

      <Band tone="cream" labelledBy="selfhost-title">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div className="max-w-xl">
            <p className="eyebrow">Self-host</p>
            <h2 id="selfhost-title" className="text-title mt-4">
              Self-host the video generator
            </h2>
            <p className="text-lede mt-6">The Docker image includes Chrome, FFmpeg and the fonts it needs. One command starts everything.</p>
            <ul className="mt-8 space-y-3">
              {selfHostRequirements.map((point) => (
                <li key={point} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg">
                    <Check className="size-3" aria-hidden="true" strokeWidth={3} />
                  </span>
                  <span className="text-[0.9375rem]">{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-9">
              <ButtonLink href="/docs/self-hosting" variant="night">
                Self-hosting guide
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
            </p>
          </div>
          <div className="frame-glow min-w-0">
            <CodeBlock label="Terminal" code={selfHostDocker} />
          </div>
        </div>
      </Band>

      <section id="costs" aria-labelledby="costs-title" className="band-white border-t border-line">
        <div className="container-page py-20 md:py-28">
          <SectionHeader
            eyebrow="What it costs"
            id="costs-title"
            title="AI video generator cost per video"
            lede="OpenPromo charges nothing. AI calls go to your own YepAPI key, at YepAPI’s prices at the time of writing. A 30-second reel with voice and music is usually $0.15 to $0.50."
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <PriceTable caption="What video actions cost" rows={videoCosts} />
            <p className="mt-6 text-center text-[0.9375rem] text-muted">
              Generated pieces are kept, so rendering again after an edit only pays for what is new.{' '}
              <Link href="/docs/costs-and-limits" className="font-medium text-accent-text underline underline-offset-4">
                Costs and limits
              </Link>
            </p>
          </div>
        </div>
      </section>

      <YepapiOffer tone="peach" />

      <Band tone="white" labelledBy="faq-title">
        <SectionHeader eyebrow="FAQ" id="faq-title" title="Open-source AI video generator FAQ" />
        <div className="mx-auto mt-12 max-w-3xl">
          <FaqList faqs={videoFaqs} />
        </div>
      </Band>

      <CtaBand />
    </>
  );
}
