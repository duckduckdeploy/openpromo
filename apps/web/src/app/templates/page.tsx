import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TEMPLATES } from '@openpromo/shared';
import { CtaBand } from '@/components/cta-band';
import { JsonLd } from '@/components/json-ld';
import { TemplateCard } from '@/components/template-card';
import { getTemplateById, templateKinds, templatesOfKind } from '@/content/templates';
import { pageMeta } from '@/lib/metadata';
import { breadcrumbList } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Social Media Templates for Posts, Reels and Videos',
  description: `${TEMPLATES.length} templates for Instagram posts, carousels, reels, TikToks and promo videos. OpenPromo fills each one from your website, in your colours and voice.`,
  path: '/templates',
});

const FEATURED = ['ugc-testimonial', 'mascot-skit', 'comic-story', 'cinematic-product', 'pov-meme', 'retro-ad'];

export default function TemplatesPage() {
  const featured = FEATURED.map(getTemplateById).filter((t) => t !== undefined);
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              name: 'OpenPromo templates',
              url: `${SITE_URL}/templates`,
              hasPart: templateKinds.map((kind) => ({ '@type': 'CollectionPage', name: kind.name, url: `${SITE_URL}/templates/kind/${kind.id}` })),
            },
            breadcrumbList([{ name: 'Templates', path: '/templates' }]),
          ],
        }}
      />

      <section aria-labelledby="templates-title" className="band-cream relative overflow-hidden">
        <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-page relative py-20 text-center md:py-28">
          <p className="eyebrow">{TEMPLATES.length} templates</p>
          <h1 id="templates-title" className="text-display mx-auto mt-5 max-w-3xl text-balance">
            Templates for posts, reels and promo videos
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-xl leading-relaxed text-pretty text-muted">
            Pick a style: a customer talking to camera, a 3D mascot, a comic strip, a cinematic product film or a bold text post. OpenPromo reads your website and
            writes it for your business, in your colours, fonts and voice.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-faint">Every example below was made for a fictional business, from its website, with no edits.</p>
        </div>
      </section>

      <section aria-labelledby="featured-title" className="container-page py-20 md:py-24">
        <h2 id="featured-title" className="text-title text-center">
          Most popular
        </h2>
        <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {featured.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </ul>
      </section>

      {templateKinds.map((kind, i) => (
        <section key={kind.id} aria-labelledby={`${kind.id}-title`} className={i % 2 === 0 ? 'band-peach' : ''}>
          <div className="container-page py-20 md:py-24">
            <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4">
              <div>
                <h2 id={`${kind.id}-title`} className="text-title">
                  {kind.heading}
                </h2>
                <p className="mt-3 max-w-2xl text-lg text-muted">{kind.summary}</p>
              </div>
              <Link href={`/templates/kind/${kind.id}`} className="inline-flex items-center gap-1.5 font-semibold text-accent-text hover:underline">
                All {templatesOfKind(kind.id).length} {kind.name.toLowerCase()}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {templatesOfKind(kind.id).slice(0, 8).map((t) => (
                <TemplateCard key={t.id} template={t} />
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CtaBand title="Your website in, promo media out." body="Add your site and pick a template. You approve the script before anything is made." />
    </>
  );
}
