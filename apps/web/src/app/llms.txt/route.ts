import { comparisons } from '@/content/compare';
import { docPages } from '@/content/docs';
import { features } from '@/content/features';
import { videoPage } from '@/content/video-generator';
import { GITHUB_URL, MCP_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

// llms.txt (llmstxt.org): a plain Markdown map of the site for AI assistants, built from the same content as the pages.
export const dynamic = 'force-static';

const link = (title: string, path: string, note: string) => `- [${title}](${SITE_URL}${path}): ${note}`;

export function GET() {
  const body = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    'OpenPromo is an open-source (MIT), self-hostable promo media studio. You add your website as a project; OpenPromo reads it and builds an editable brand profile (what the business does, audience, voice, selling points with their sources, colors, fonts, logo, products). Every tool works from that profile: post ideas with captions, images and carousels, banners, 9:16 reels with voiceover and captions, promo videos and tutorials. AI work runs on the user’s own YepAPI key under a monthly spending limit. Agents can use it through an MCP server and a REST API.',
    '',
    `- Source code: ${GITHUB_URL}`,
    `- MCP server: ${MCP_URL}`,
    '',
    '## Features',
    '',
    link(videoPage.h1, videoPage.path, videoPage.description),
    ...features.map((feature) => link(feature.h1, `/features/${feature.slug}`, feature.summary)),
    '',
    '## Docs',
    '',
    ...docPages.map((doc) => link(doc.h1, `/docs/${doc.slug}`, doc.description)),
    '',
    '## Optional',
    '',
    link('Pricing', '/pricing', 'Free to self-host; AI work is paid per use to your own YepAPI key, under a monthly limit.'),
    ...comparisons.map((comparison) => link(comparison.h1, `/compare/${comparison.slug}`, comparison.summary)),
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
