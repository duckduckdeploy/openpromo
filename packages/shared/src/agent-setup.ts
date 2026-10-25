/** The skills that ship in the OpenPromo plugin (plugins/openpromo/skills). */
export const AGENT_SKILLS = [
  { name: "brand-check", title: "Brand check", summary: "Read your website and tidy up the brand profile every tool builds from." },
  { name: "content-plan", title: "Content plan", summary: "A month of post ideas from your selling points, with captions." },
  { name: "social-posts", title: "Social posts", summary: "On-brand images and carousels for Instagram, LinkedIn and ads." },
  { name: "promo-reel", title: "Promo reel", summary: "A short vertical video with voiceover and captions for Reels, TikTok and Shorts." },
  { name: "tutorial-video", title: "Tutorial video", summary: "A getting-started walkthrough of your product, narrated." },
] as const;

/** Agents with tested setup instructions in the docs. */
export const AGENT_CLIENTS = ["ChatGPT", "Claude", "Claude Code", "Cursor", "VS Code", "Codex", "Gemini CLI", "OpenCode", "Windsurf"] as const;

/**
 * A prompt the user pastes into their agent so it connects itself to OpenPromo. It never asks
 * for the key in chat, and verifies the connection with free calls only.
 */
export function agentSetupPrompt({ mcpUrl, docsUrl }: { mcpUrl: string; docsUrl: string }): string {
  return `Connect yourself to OpenPromo, an open-source promo media studio, over MCP. Work through these steps in order and stop at any step that needs me.

1. Check first. Work out which agent you are (for example Claude Code, Claude Desktop, Cursor, VS Code, Codex, Gemini CLI, OpenCode or Windsurf) and whether an MCP server named "openpromo" is already set up. If it is and its tools work, go to step 5.
   If you are ChatGPT, or Claude on the web or in the desktop app, you cannot add servers yourself: tell me to add a custom connector in your settings with the URL ${mcpUrl} and OAuth sign-in, which needs no API key, then stop.

2. The key. The connection needs an OpenPromo API key, which starts with opro_. Ask me to create one in the OpenPromo app under Settings, API keys, and to store it in an environment variable named OPENPROMO_API_KEY. Never ask me to paste the key into this chat, and never write it into a file inside a code repository.

3. Add the server. Add a remote MCP server named "openpromo" with:
   - URL: ${mcpUrl}
   - Transport: streamable HTTP
   - Header: Authorization: Bearer <value of OPENPROMO_API_KEY>
   Use your own supported way of adding MCP servers, and read the key from the environment variable. If you cannot change your own configuration, tell me exactly what to add and where. Instructions for each agent: ${docsUrl}

4. Reload. If the openpromo tools are not available yet, tell me how to restart or reload you, and stop.

5. Verify, for free. Call whoami and list_projects. Both are free. During setup, do not run any paid generation, create projects or change settings.

6. Report back in under 120 words: what you set up, whether whoami worked, the projects you found, and three things I could ask you next. Mention that paid generations show their price first, and that I can give you a spending limit for any request.`;
}
