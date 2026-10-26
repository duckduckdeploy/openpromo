import type { MetadataRoute } from 'next';
import { comparisons } from '@/content/compare';
import { docPages } from '@/content/docs';
import { features } from '@/content/features';
import { TEMPLATES } from '@openpromo/shared';
import { glossary, glossaryCategories } from '@/content/glossary';
import { templateKinds } from '@/content/templates';
import { videoPage } from '@/content/video-generator';
import { SITE_URL } from '@/lib/site';

// Language alternates live in each page's <head>; with one language they add nothing here.
// Add them back with the translations. Privacy and terms are unreviewed drafts marked noindex, so they are left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number }[] = [
    { path: '/', priority: 1 },
    { path: videoPage.path, priority: 0.9 },
    { path: '/features', priority: 0.9 },
    ...features.map((feature) => ({ path: `/features/${feature.slug}`, priority: 0.8 })),
    { path: '/compare', priority: 0.6 },
    ...comparisons.map((comparison) => ({ path: `/compare/${comparison.slug}`, priority: 0.7 })),
    { path: '/pricing', priority: 0.8 },
    { path: '/docs', priority: 0.7 },
    ...docPages.map((doc) => ({ path: `/docs/${doc.slug}`, priority: 0.6 })),
    { path: '/templates', priority: 0.8 },
    ...templateKinds.map((kind) => ({ path: `/templates/kind/${kind.id}`, priority: 0.7 })),
    ...TEMPLATES.map((t) => ({ path: `/templates/${t.id}`, priority: 0.6 })),
    { path: '/glossary', priority: 0.7 },
    ...glossaryCategories.map((category) => ({ path: `/glossary/topics/${category.id}`, priority: 0.5 })),
    ...glossary.map((term) => ({ path: `/glossary/${term.slug}`, priority: 0.5 })),
  ];

  return paths.map(({ path, priority }) => ({ url: `${SITE_URL}${path === '/' ? '' : path}`, changeFrequency: 'weekly', priority }));
}
