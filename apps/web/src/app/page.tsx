import { AppScreenshot } from '@/components/app-screenshot';
import Link from 'next/link';
import { ArrowRight, Check, Code2, Container } from 'lucide-react';
import { AgentFold } from '@/components/agent-fold';
import { Band } from '@/components/band';
import { ButtonLink } from '@/components/button';
import { CodeBlock } from '@/components/code-block';
import { CtaBand } from '@/components/cta-band';
import { ExampleGallery, ExampleImage } from '@/components/example-gallery';
import { FaqList } from '@/components/faq';
import { FeatureGrid } from '@/components/feature-grid';
import { JsonLd } from '@/components/json-ld';
import { SectionHeader } from '@/components/section';
import { YepapiOffer } from '@/components/yepapi-offer';
import { BANNER_EXAMPLES, getExample, HERO_EXAMPLES, HOME_EXAMPLES } from '@/content/examples';
import { control, homeFaqs, howSteps, ledger, makes, selfHostPoints } from '@/content/home';
import { selfHostDocker } from '@/content/snippets';
import { pageMeta } from '@/lib/metadata';
import { faqPage } from '@/lib/schema';
import { GITHUB_URL, SIGN_UP_URL, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site';

export const metadata = pageMeta({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: '/',
  absoluteTitle: true,
});

const textLink = 'font-semibold text-accent-text underline-offset-4 hover:underline';

export default function HomePage() {
  const [left, middle, right] = HERO_EXAMPLES.map(getExample);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'SoftwareApplication',
              name: SITE_NAME,
              url: SITE_URL,
              description: SITE_DESCRIPTION,
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web, Linux, Windows, macOS (Docker)',
              license: 'https://opensource.org/license/mit',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            },
            faqPage(homeFaqs),
          ],
        }}
      />

      {/* Hero: cream with a coral and peach glow, example posts on the gradient frame */}
      <section aria-labelledby="hero-title" className="band-cream relative overflow-hidden">
        <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="hatch pointer-events-none absolute -top-24 left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 opacity-60" aria-hidden="true" />
        <div className="container-page relative pt-16 pb-20 md:pt-24 md:pb-24 xl:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-peach-strong bg-surface/80 px-4 py-1.5 text-sm font-medium text-ink shadow-hard-sm backdrop-blur">
              <span className="size-2 rounded-full bg-orange" aria-hidden="true" />
              Open source · MIT license · Self-hostable
            </p>

            <h1 id="hero-title" className="text-display animate-rise mt-8 text-balance [animation-delay:60ms]">
              <span className="mark">Open&#8209;source</span> AI marketing tool
            </h1>

            <p className="text-lede animate-rise mx-auto mt-7 max-w-2xl [animation-delay:120ms]">
              Add your website. OpenPromo reads it, builds your brand profile, and turns it into posts, carousels, banners,
              reels and promo videos in your own fonts and colors. Run it on your own server, keep your data, and set your own
              spending limit.
            </p>

            <div className="animate-rise mt-10 flex flex-col justify-center gap-3 [animation-delay:180ms] sm:flex-row">
              <ButtonLink href={SIGN_UP_URL} size="lg">
                Get started
                <ArrowRight className="size-4 transition-transform duration-150 group-hover/button:translate-x-0.5" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/docs/self-hosting" variant="secondary" size="lg">
                <Container className="size-5" aria-hidden="true" />
                Self-host with Docker
              </ButtonLink>
            </div>

            <p className="animate-rise mt-6 text-[0.9375rem] text-muted [animation-delay:240ms]">
              Or{' '}
              <Link href="/features" className={textLink}>
                see every feature
              </Link>
              , with examples.
            </p>
          </div>

          <figure className="animate-rise mx-auto mt-14 max-w-5xl [animation-delay:200ms] md:mt-16">
            <div className="frame-glow">
              <div className="grid grid-cols-3 items-center gap-3 sm:gap-6">
                {left ? <ExampleImage example={left} priority /> : null}
                {middle ? <ExampleImage example={middle} priority /> : null}
                {right ? <ExampleImage example={right} priority /> : null}
              </div>
            </div>
            <figcaption className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted">
              A post, a story and a portrait post made with OpenPromo’s templates for Crumb &amp; Co, a fictional bakery.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Stat strip */}
      <Band tone="night" space="sm" label="OpenPromo in four numbers">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {ledger.map((item) => (
            <div key={item.label} className="flex flex-col-reverse items-center gap-3 text-center lg:border-l lg:border-line lg:first:border-l-0">
              <dt className="max-w-[14rem] text-sm text-balance text-muted">{item.label}</dt>
              <dd className="figure text-orange">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Band>

      {/* How it works */}
      <Band tone="white" labelledBy="how-title">
        <SectionHeader
          eyebrow="How it works"
          id="how-title"
          title="How the AI marketing tool works"
          lede="Nothing starts from a blank prompt. Every tool works from a brand profile built from your own website."
        />
        <ol className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {howSteps.map((step, index) => (
            <li key={step.title} className="card p-7">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-orange font-display text-base font-bold text-night">{index + 1}</span>
              <h3 className="card-title mt-5">{step.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <AppScreenshot id="brandProfile" className="mt-14 md:mt-16" />
      </Band>

      {/* Examples */}
      <Band tone="peach" labelledBy="examples-title">
        <SectionHeader
          eyebrow="Examples"
          id="examples-title"
          title="AI social media content generator examples"
          lede="All made from one brand profile, for a fictional bakery. Text is real text in the brand’s fonts, so it stays sharp at every size."
        />
        <div className="mt-14 md:mt-16">
          <ExampleGallery ids={HOME_EXAMPLES} />
        </div>
        <div className="mt-10">
          <ExampleGallery ids={BANNER_EXAMPLES} layout="stack" />
        </div>
      </Band>

      {/* What it makes */}
      <Band tone="cream" labelledBy="makes-title">
        <SectionHeader
          eyebrow="What it makes"
          id="makes-title"
          title="Images, carousels, reels and videos"
          lede="Ten scene layouts in clean, bold and photo looks. A fit pass shrinks text until nothing overflows, and low-contrast color pairs are fixed for you."
        />
        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {makes.map((item) => (
            <li key={item.title} className="card card-link group p-7">
              <h3 className="card-title">
                <Link href={item.href} className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text" aria-hidden="true">
                Learn more
                <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-[0.9375rem] text-muted">
          Looking for video? See the{' '}
          <Link href="/open-source-ai-video-generator" className={textLink}>
            open-source AI video generator
          </Link>
          .
        </p>
      </Band>

      <AgentFold />

      {/* Every feature */}
      <Band tone="white" labelledBy="features-title" className="border-t border-line">
        <SectionHeader
          align="center"
          eyebrow="Features"
          id="features-title"
          title="Every AI marketing tool feature"
          lede="Each feature has its own page: what it does, examples and what it costs."
        />
        <div className="mt-14 md:mt-16">
          <FeatureGrid />
        </div>
      </Band>

      {/* You are in control */}
      <Band tone="peach" labelledBy="control-title">
        <SectionHeader
          align="center"
          eyebrow="You are in control"
          id="control-title"
          title="Why an open-source marketing tool"
          lede="Closed tools decide where your brand and media live and what you pay each month. OpenPromo is built the other way round."
        />
        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 lg:gap-6">
          {control.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="card p-8">
                <span className={`tile ${index % 2 === 1 ? 'tile-peach' : ''}`}>
                  <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
                </span>
                <h3 className="text-heading mt-6">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-10 text-center">
          <ButtonLink href="/compare" variant="ghost">
            How OpenPromo compares
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </p>
      </Band>

      {/* Self-host: copy on one side, the command on the other */}
      <Band tone="cream" labelledBy="selfhost-title">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div className="max-w-xl">
            <p className="eyebrow">Self-host</p>
            <h2 id="selfhost-title" className="text-title mt-4">
              Self-host your marketing tool
            </h2>
            <p className="text-lede mt-6">
              Everything the hosted app runs is in the repository. Start it on your own machine or server with Docker, and it
              is yours.
            </p>
            <ul className="mt-8 space-y-3">
              {selfHostPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg">
                    <Check className="size-3" aria-hidden="true" strokeWidth={3} />
                  </span>
                  <span className="text-[0.9375rem]">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/docs/self-hosting" variant="night">
                Self-hosting guide
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={GITHUB_URL} variant="secondary">
                <Code2 className="size-4" aria-hidden="true" />
                Source on GitHub
              </ButtonLink>
            </div>
          </div>
          <div className="frame-glow min-w-0">
            <CodeBlock label="Terminal" code={selfHostDocker} />
          </div>
        </div>
      </Band>

      <YepapiOffer />

      {/* FAQ */}
      <Band tone="night" labelledBy="faq-title">
        <SectionHeader eyebrow="FAQ" id="faq-title" title="AI marketing tool FAQ" />
        <div className="mx-auto mt-12 max-w-3xl">
          <FaqList faqs={homeFaqs} />
        </div>
      </Band>

      <CtaBand />
    </>
  );
}
