import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { CREATION_TYPES, TEMPLATE_GROUPS, TEMPLATES } from '@openpromo/shared';
import { ButtonLink } from '@/components/button';
import { CtaBand } from '@/components/cta-band';
import { FaqList } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { TemplateCard } from '@/components/template-card';
import { YepapiOffer } from '@/components/yepapi-offer';
import { getTemplateById, isVideoTemplate, kindOf, modelsOf, previewOf, priceText, recipeName, templateFaqs, templateKinds, templateTitles } from '@/content/templates';
import { pageMeta } from '@/lib/metadata';
import { breadcrumbList, faqPage } from '@/lib/schema';
import { SIGN_UP_URL, SITE_URL } from '@/lib/site';

interface TemplatePageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ id: t.id }));
}

const describe = (summary: string) => {
  const long = `${summary} Made from your website, in your colours and voice.`;
  return long.length <= 155 ? long : summary;
};

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const t = getTemplateById((await params).id);
  if (!t) return {};
  return pageMeta({ title: templateTitles[t.id] ?? `${t.name} Template`, description: describe(t.summary), path: `/templates/${t.id}` });
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const t = getTemplateById((await params).id);
  if (!t) notFound();
  const kind = templateKinds.find((k) => k.id === kindOf(t))!;
  const preview = previewOf(t);
  const video = isVideoTemplate(t);
  const faqs = templateFaqs(t);
  const models = modelsOf(t);
  const related = TEMPLATES.filter((o) => o.id !== t.id && (o.group === t.group || o.recipe === t.recipe)).slice(0, 4);
  const heading = templateTitles[t.id] ?? `${t.name} template`;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            preview
              ? video && preview.video
                ? { '@type': 'VideoObject', name: heading, description: t.what, thumbnailUrl: preview.poster, contentUrl: preview.video, uploadDate: '2026-10-26', url: `${SITE_URL}/templates/${t.id}` }
                : { '@type': 'ImageObject', name: heading, description: t.what, contentUrl: preview.poster, url: `${SITE_URL}/templates/${t.id}` }
              : { '@type': 'CreativeWork', name: heading, description: t.what, url: `${SITE_URL}/templates/${t.id}` },
            faqPage(faqs),
            breadcrumbList([
              { name: 'Templates', path: '/templates' },
              { name: kind.name, path: `/templates/kind/${kind.id}` },
              { name: t.name, path: `/templates/${t.id}` },
            ]),
          ],
        }}
      />

      <article>
        <section aria-labelledby="template-title" className="band-cream">
          <div className="container-page grid items-center gap-12 py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:py-20 lg:gap-20">
            <div>
              <nav aria-label="Breadcrumb" className="text-sm text-muted">
                <Link href="/templates" className="hover:text-ink">
                  Templates
                </Link>
                <span className="mx-2 text-faint" aria-hidden="true">
                  /
                </span>
                <Link href={`/templates/kind/${kind.id}`} className="font-medium text-accent-text hover:underline">
                  {kind.name}
                </Link>
              </nav>
              <h1 id="template-title" className="text-display mt-6 text-balance">
                {heading}
              </h1>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-pretty text-muted">{t.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2 text-sm">
                <li className="rounded-full bg-peach px-3 py-1 font-semibold text-peach-text">{CREATION_TYPES[t.type].label}</li>
                <li className="rounded-full border border-line px-3 py-1">{TEMPLATE_GROUPS[t.group].label}</li>
                {t.duration ? (
                  <li className="rounded-full border border-line px-3 py-1">
                    {t.duration[0]}–{t.duration[1]} seconds
                  </li>
                ) : null}
                <li className="rounded-full border border-line px-3 py-1">{priceText(t)} in AI credits</li>
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={SIGN_UP_URL} size="lg">
                  Make one for your business
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
            <figure>
              {preview?.video ? (
                <video src={preview.video} poster={preview.poster} controls muted loop playsInline preload="metadata" className="w-full rounded-xl border border-line bg-black shadow-hard" />
              ) : preview ? (
                <img src={preview.poster} alt={`${t.name} example for ${preview.business}`} className="w-full rounded-xl border border-line shadow-hard" />
              ) : (
                <div className="grid aspect-[4/5] place-items-center rounded-xl border border-line bg-sunken text-muted">Example coming soon</div>
              )}
              {preview ? <figcaption className="mt-3 text-center text-sm text-faint">Made for {preview.business}, a fictional business, from its website.</figcaption> : null}
              {preview?.slides && preview.slides.length > 1 ? (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                  {preview.slides.map((src, i) => (
                    <img key={src} src={src} alt={`Slide ${i + 1}`} loading="lazy" className="h-28 rounded-md border border-line" />
                  ))}
                </div>
              ) : null}
            </figure>
          </div>
        </section>

        <section className="container-page py-16 md:py-20">
          <div className="prose-doc mx-auto max-w-3xl">
            <h2 id="what">What it is</h2>
            <p>{t.what}</p>
            <h2 id="when">When to use it</h2>
            <p>{t.when}</p>
            <h2 id="why">Why it works</h2>
            <p>{t.why}</p>
            <h2 id="structure">How it plays</h2>
            <ol>
              {t.beats.map((beat, i) => (
                <li key={beat.role + i}>
                  <strong className="capitalize">{beat.role}</strong>
                  {beat.seconds ? ` (about ${beat.seconds} s)` : ''}: {beat.direction}
                </li>
              ))}
            </ol>
            <p>
              <strong>The hook:</strong> {t.hook}
            </p>
            <h2 id="made">How OpenPromo makes it</h2>
            <p>
              {recipeName(t)}. {models.length ? `Made with ${models.join(', ')}.` : 'No AI pictures needed.'} It suits {t.bestFor.join(', ')} businesses. The writer takes
              every fact from your website, so prices, products and reviews are yours, and you approve the script before anything is made.
            </p>
            <h2 id="faq">Questions</h2>
          </div>
          <div className="mx-auto mt-6 max-w-3xl">
            <FaqList faqs={faqs} />
          </div>
        </section>
      </article>

      <section aria-labelledby="related-title" className="band-peach">
        <div className="container-page py-16 md:py-20">
          <h2 id="related-title" className="text-title text-center">
            Similar templates
          </h2>
          <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-5 md:grid-cols-4">
            {related.map((o) => (
              <TemplateCard key={o.id} template={o} />
            ))}
          </ul>
        </div>
      </section>

      <YepapiOffer />

      <CtaBand title={`Make a ${t.name.toLowerCase()} for your business.`} body="Add your website, pick this template and approve the script. OpenPromo makes the rest." />
    </>
  );
}
