export type McpGroup = 'Account' | 'Projects and brand' | 'Ideas' | 'Creations and renders' | 'Library';

export interface McpTool {
  name: string;
  group: McpGroup;
  /** One line: what it does. */
  does: string;
  /** What a call costs, as the server describes it (apps/api/src/mcp/server.ts). */
  cost: string;
}

export const MCP_GROUPS: McpGroup[] = ['Account', 'Projects and brand', 'Ideas', 'Creations and renders', 'Library'];

/** Every tool of the MCP server, in the order the server registers them. */
export const MCP_TOOLS: McpTool[] = [
  { name: 'whoami', group: 'Account', does: 'The signed-in user and whether a YepAPI key is connected.', cost: 'Free' },
  { name: 'get_balance', group: 'Account', does: 'Remaining YepAPI balance, and this month’s spend and limit.', cost: 'Free' },
  { name: 'get_usage', group: 'Account', does: 'This month’s spend by feature and by day, with the 10 latest calls.', cost: 'Free' },
  { name: 'list_projects', group: 'Projects and brand', does: 'Your projects, one per website, and whether each brand profile is ready.', cost: 'Free' },
  {
    name: 'create_project',
    group: 'Projects and brand',
    does: 'Add a website as a project. The site is read in the background (about a minute); poll get_brand until it is ready.',
    cost: 'About $0.10',
  },
  {
    name: 'get_brand',
    group: 'Projects and brand',
    does: 'The brand profile: identity, audience, selling points with their sources, voice, colors, fonts, products and flows.',
    cost: 'Free',
  },
  { name: 'update_brand', group: 'Projects and brand', does: 'Replace the brand profile with an edited copy. Edited fields are kept when the site is read again.', cost: 'Free' },
  { name: 'refresh_brand', group: 'Projects and brand', does: 'Read the website again and rebuild the profile; hand edits are kept unless reset is true.', cost: 'About $0.10' },
  {
    name: 'update_project_context',
    group: 'Projects and brand',
    does: 'Replace the project’s shared notes for agents: campaigns, goals, things to avoid.',
    cost: 'Free',
  },
  { name: 'list_ideas', group: 'Ideas', does: 'Saved post ideas, newest first, with hook, caption and hashtags.', cost: 'Free' },
  {
    name: 'generate_ideas',
    group: 'Ideas',
    does: 'Write new post ideas from the brand profile, by goal, channel and type, each with the selling points it uses.',
    cost: 'About $0.02 – $0.06',
  },
  { name: 'list_creations', group: 'Creations and renders', does: 'Images, carousels, reels, promo videos and tutorials, with status and latest render.', cost: 'Free' },
  {
    name: 'create_creation',
    group: 'Creations and renders',
    does: 'Write a new image, carousel, reel, promo video or tutorial from an idea or a brief. Returns scenes and checks; nothing is rendered yet.',
    cost: 'About $0.03 – $0.08',
  },
  { name: 'get_creation', group: 'Creations and renders', does: 'A creation’s scenes, post caption, checks and renders.', cost: 'Free' },
  {
    name: 'update_creation',
    group: 'Creations and renders',
    does: 'Save edits to a creation: its scenes, style, audio and captions, title or post caption. The checks run again.',
    cost: 'Free',
  },
  {
    name: 'render_creation',
    group: 'Creations and renders',
    does: 'Render a creation to files in the background, at its own size or another one; poll get_render.',
    cost: 'Images $0 unless AI pictures are used ($0.04 – $0.20 each). Videos: voice about $0.01 a scene, music $0.08, AI clips about $0.11 a second',
  },
  { name: 'get_render', group: 'Creations and renders', does: 'A render’s status and progress, and when done its output, thumbnail and caption file ids.', cost: 'Free' },
  {
    name: 'list_assets',
    group: 'Library',
    does: 'Files in the library: screenshots, logo, product photos, uploads, AI pictures, voice, music and finished media.',
    cost: 'Free',
  },
];
