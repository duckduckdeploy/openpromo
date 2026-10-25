import Link from 'next/link';
import { CtaBand } from '@/components/cta-band';
import { FeatureGrid } from '@/components/feature-grid';
import { JsonLd } from '@/components/json-ld';
import { SectionHeader, StatusNote } from '@/components/section';
import { YepapiOffer } from '@/components/yepapi-offer';
import { features } from '@/content/features';
import { pageMeta } from '@/lib/metadata';
import { breadcrumbList } from '@/lib/schema';

export const metadata = pageMeta({
  title: 'AI Marketing Tool Features: Posts to Videos',
  description:
    'OpenPromo features: brand kit generator, Instagram posts, carousels, banners, AI reels, URL to video, product demos and captions, all from your website.',
  path: '/features',
});

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', ...breadcrumbList([{ name: 'Features', path: '/features' }]) }} />
      <section aria-labelledby="features-title" className="container-page py-20 md:py-28 xl:py-32">
        <SectionHeader
          as="h1"
          eyebrow={`${features.length} features`}
          id="features-title"
          title="OpenPromo features"
          lede="Each feature works from the brand profile OpenPromo builds from your website. Each page shows examples, how it works and what it costs."
        />
        <div className="mx-auto mt-10 max-w-2xl">
          <StatusNote>
            OpenPromo is an early project in active development. Features may change as it grows. For video, see the{' '}
            <Link href="/open-source-ai-video-generator" className="font-medium underline underline-offset-4">
              open-source AI video generator
            </Link>
            .
          </StatusNote>
        </div>
        <div className="mt-14 md:mt-16">
          <FeatureGrid headingLevel="h2" />
        </div>
      </section>
      <YepapiOffer />
      <CtaBand />
    </>
  );
}
