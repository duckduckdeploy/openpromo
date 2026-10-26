import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TEMPLATE_GROUPS, type TemplateGroup } from '@openpromo/shared';
import { CtaBand } from '@/components/cta-band';
import { JsonLd } from '@/components/json-ld';
import { TemplateCard } from '@/components/template-card';
import { kindLayout, templateKinds, templatesOfKind } from '@/content/templates';
import { pageMeta } from '@/lib/metadata';
import { breadcrumbList } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

interface KindPageProps {
  params: Promise<{ kind: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return templateKinds.map((kind) => ({ kind: kind.id }));
}

export async function generateMetadata({ params }: KindPageProps): Promise<Metadata> {
  const { kind: id } = await params;
  const kind = templateKinds.find((k) => k.id === id);
  if (!kind) return {};
  return pageMeta({ title: kind.title, description: `${templatesOfKind(kind.id).length} ${kind.name.toLowerCase()}. ${kind.summary}`, path: `/templates/kind/${kind.id}` });
}

export default async function TemplateKindPage({ params }: KindPageProps) {
  const { kind: id } = await params;
  const kind = templateKinds.find((k) => k.id === id);
  if (!kind) notFound();
  const templates = templatesOfKind(kind.id);
  const groups = (Object.keys(TEMPLATE_GROUPS) as TemplateGroup[]).filter((g) => templates.some((t) => t.group === g));

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              name: kind.heading,
              url: `${SITE_URL}/templates/kind/${kind.id}`,
              hasPart: templates.map((t) => ({ '@type': 'CreativeWork', name: t.name, url: `${SITE_URL}/templates/${t.id}` })),
            },
            breadcrumbList([
              { name: 'Templates', path: '/templates' },
              { name: kind.name, path: `/templates/kind/${kind.id}` },
            ]),
          ],
        }}
      />

      <section aria-labelledby="kind-title" className="band-cream">
        <div className="container-page py-16 text-center md:py-24">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/templates" className="hover:text-ink">
              Templates
            </Link>
          </nav>
          <h1 id="kind-title" className="text-display mx-auto mt-5 max-w-3xl text-balance">
            {kind.heading}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-pretty text-muted">{kind.summary}</p>
          <nav aria-label="Styles" className="mt-8">
            <ul className="flex flex-wrap justify-center gap-2">
              {groups.map((g) => (
                <li key={g}>
                  <a href={`#${g}`} className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-sm hover:border-accent-line hover:text-accent-text">
                    {TEMPLATE_GROUPS[g].label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {groups.map((g, i) => (
        <section key={g} id={g} aria-labelledby={`${g}-title`} className={`scroll-mt-20 ${i % 2 ? 'band-peach' : ''}`}>
          <div className="container-page py-16 md:py-20">
            <div className="mx-auto max-w-6xl">
              <h2 id={`${g}-title`} className="text-title">
                {TEMPLATE_GROUPS[g].label}
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-muted">{TEMPLATE_GROUPS[g].description}</p>
            </div>
            <ul className={`mx-auto mt-10 grid max-w-6xl gap-5 ${kindLayout[kind.id].grid}`}>
              {templates
                .filter((t) => t.group === g)
                .map((t) => (
                  <TemplateCard key={t.id} template={t} />
                ))}
            </ul>
          </div>
        </section>
      ))}

      <CtaBand title="Pick a style. We write it from your site." body="Add your website and every template fills itself with your products, prices, reviews and brand." />
    </>
  );
}
