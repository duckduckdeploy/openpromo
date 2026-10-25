export type DocSection = 'Start here' | 'Run it yourself' | 'Reference';

export interface DocPage {
  /** Path under /docs. */
  slug: string;
  /** Short label for navigation, cards and previous/next links. */
  title: string;
  /** Page H1: keyword-led. */
  h1: string;
  /** Title tag, keyword first. The " · OpenPromo" suffix is added by the template. */
  seoTitle: string;
  /** Use seoTitle as the whole title tag, without the suffix. */
  absoluteTitle?: boolean;
  /** Meta description and the intro under the H1. */
  description: string;
  section: DocSection;
}

export const docSections: DocSection[] = ['Start here', 'Run it yourself', 'Reference'];

/** Every docs page, in reading order. Navigation, previous/next links and the sitemap come from this list. */
export const docPages: DocPage[] = [
  {
    slug: 'getting-started',
    title: 'Getting started',
    h1: 'Getting started with OpenPromo',
    seoTitle: 'Getting Started: Your First Brand Profile',
    description:
      'Get started with OpenPromo: add your YepAPI key, set a spending limit, add your website, check the brand profile and make your first post or reel.',
    section: 'Start here',
  },
  {
    slug: 'how-it-works',
    title: 'How OpenPromo works',
    h1: 'How OpenPromo works',
    seoTitle: 'How OpenPromo Works: Brand Profile to Render',
    description:
      'How OpenPromo works: reading a website into a brand profile, ideas, creations as scenes, checks, rendering with templates and video, and what is stored.',
    section: 'Start here',
  },
  {
    slug: 'costs-and-limits',
    title: 'Costs, caching and limits',
    h1: 'Costs, caching and spending limits',
    seoTitle: 'AI Costs, Caching and Spending Limits',
    description:
      'What each action costs on your YepAPI key, what is cached so you do not pay twice, where to see your usage and how the monthly spending limit works.',
    section: 'Start here',
  },
  {
    slug: 'self-hosting',
    title: 'Self-hosting',
    h1: 'Self-host OpenPromo with Docker',
    seoTitle: 'How to Self-Host OpenPromo with Docker',
    description:
      'How to self-host OpenPromo with Docker: one command on your computer or a cloud server, HTTPS for your own domain, media storage, updates and backups.',
    section: 'Run it yourself',
  },
  {
    slug: 'mcp',
    title: 'Connect your agent',
    h1: 'Marketing MCP server',
    seoTitle: 'Marketing MCP Server for Claude and ChatGPT',
    description:
      'Connect Claude, ChatGPT, Cursor or Codex to the OpenPromo marketing MCP server: OAuth or an API key, a setup prompt, and skills for posts and reels.',
    section: 'Reference',
  },
  {
    slug: 'mcp-tools',
    title: 'MCP tools',
    h1: 'OpenPromo MCP tools',
    seoTitle: 'MCP Tools: Every OpenPromo Tool Explained',
    description:
      'Every tool of the OpenPromo MCP server: account, projects and brand, ideas, creations, renders and the library, with what each one does and costs.',
    section: 'Reference',
  },
  {
    slug: 'rest-api',
    title: 'REST API',
    h1: 'OpenPromo REST API',
    seoTitle: 'REST API Reference: Projects, Creations, Renders',
    description:
      'The OpenPromo REST API: API keys, the response format and every route for projects, brand profiles, assets, ideas, creations, renders and usage.',
    section: 'Reference',
  },
  {
    slug: 'errors',
    title: 'Errors and troubleshooting',
    h1: 'Errors and troubleshooting',
    seoTitle: 'Errors and Troubleshooting',
    description:
      'OpenPromo error codes and what to do about them: missing or rejected YepAPI keys, the spending limit, brand profiles that are not ready and failed renders.',
    section: 'Reference',
  },
];

export const docsIn = (section: DocSection) => docPages.filter((doc) => doc.section === section);

export function getDoc(slug: string): DocPage {
  const doc = docPages.find((page) => page.slug === slug);
  if (!doc) throw new Error(`Unknown doc page: ${slug}`);
  return doc;
}
