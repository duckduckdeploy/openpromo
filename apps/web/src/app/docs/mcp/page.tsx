import Link from 'next/link';
import { AGENT_SKILLS } from '@openpromo/shared';
import { Callout, DocTable, Step, Steps, Ui } from '@/components/doc-blocks';
import { CodeBlock } from '@/components/code-block';
import { CopyPromptButton } from '@/components/copy-prompt-button';
import { DocArticle } from '@/components/doc-page';
import { getDoc } from '@/content/docs';
import { setupPrompt } from '@/content/snippets';
import { MCP_TOOLS } from '@/content/mcp-tools';
import { pageMeta } from '@/lib/metadata';
import { GITHUB_URL, MCP_URL } from '@/lib/site';

const slug = 'mcp';
const doc = getDoc(slug);

export const metadata = pageMeta({ title: doc.seoTitle, description: doc.description, path: `/docs/${slug}`, absoluteTitle: doc.absoluteTitle });

// "owner/repo" for plugin marketplaces, once the repository is public.
const repo = GITHUB_URL.replace(/^https?:\/\/github\.com\//, '');

const envKey = `# macOS and Linux: add to ~/.zshrc or ~/.bashrc
export OPENPROMO_API_KEY="opro_..."

# Windows (PowerShell), saved for new terminals
setx OPENPROMO_API_KEY "opro_..."`;

const clients: { id: string; name: string; where: string; code: string; note?: string }[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    where: 'Terminal',
    code: `claude mcp add --transport http openpromo ${MCP_URL} \\
  --header "Authorization: Bearer $OPENPROMO_API_KEY"`,
    note: 'Or install the plugin below, which adds the server and the skills together.',
  },
  {
    id: 'claude-desktop',
    name: 'Claude Desktop',
    where: 'claude_desktop_config.json (Settings, Developer, Edit config)',
    code: `{
  "mcpServers": {
    "openpromo": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "${MCP_URL}",
               "--header", "Authorization:Bearer \${OPENPROMO_API_KEY}"],
      "env": { "OPENPROMO_API_KEY": "opro_..." }
    }
  }
}`,
    note: 'Claude Desktop reaches remote servers with keys through the mcp-remote bridge, which needs Node.js. Restart Claude Desktop afterwards.',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    where: '~/.cursor/mcp.json, or .cursor/mcp.json in a project',
    code: `{
  "mcpServers": {
    "openpromo": {
      "url": "${MCP_URL}",
      "headers": { "Authorization": "Bearer \${env:OPENPROMO_API_KEY}" }
    }
  }
}`,
  },
  {
    id: 'vscode',
    name: 'VS Code (Copilot agent mode)',
    where: '.vscode/mcp.json, or MCP: Open User Configuration',
    code: `{
  "inputs": [
    { "type": "promptString", "id": "openpromo-key", "description": "OpenPromo API key", "password": true }
  ],
  "servers": {
    "openpromo": {
      "type": "http",
      "url": "${MCP_URL}",
      "headers": { "Authorization": "Bearer \${input:openpromo-key}" }
    }
  }
}`,
    note: 'VS Code asks for the key once and stores it securely.',
  },
  {
    id: 'codex',
    name: 'Codex',
    where: '~/.codex/config.toml',
    code: `[mcp_servers.openpromo]
url = "${MCP_URL}"
bearer_token_env_var = "OPENPROMO_API_KEY"`,
  },
  {
    id: 'gemini',
    name: 'Gemini CLI',
    where: '~/.gemini/settings.json',
    code: `{
  "mcpServers": {
    "openpromo": {
      "httpUrl": "${MCP_URL}",
      "headers": { "Authorization": "Bearer $OPENPROMO_API_KEY" }
    }
  }
}`,
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    where: 'opencode.json',
    code: `{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "openpromo": {
      "type": "remote",
      "url": "${MCP_URL}",
      "headers": { "Authorization": "Bearer {env:OPENPROMO_API_KEY}" }
    }
  }
}`,
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    where: '~/.codeium/windsurf/mcp_config.json',
    code: `{
  "mcpServers": {
    "openpromo": {
      "serverUrl": "${MCP_URL}",
      "headers": { "Authorization": "Bearer \${env:OPENPROMO_API_KEY}" }
    }
  }
}`,
  },
];

const pluginInstall = `/plugin install openpromo --marketplace ${repo}

# On older Claude Code versions, in two steps:
/plugin marketplace add ${repo}
/plugin install openpromo@openpromo`;

const skillsInstall = `# Any agent that reads SKILL.md files (Claude Code, Codex, OpenCode and others)
npx skills add ${repo}/plugins/openpromo/skills`;

const pluginUpdate = `/plugin marketplace update openpromo
/reload-plugins`;

export default function McpPage() {
  return (
    <DocArticle slug={slug}>
      <p>
        OpenPromo is a marketing MCP server: AI agents such as Claude, ChatGPT, Cursor, Codex and Gemini can read your brand
        profile, write post ideas, make images, carousels, reels and videos, and render them. Skills add ready-made marketing
        workflows on top. Setup takes a couple of minutes.
      </p>
      <DocTable
        caption="Connection details"
        head={['Setting', 'Value']}
        rows={[
          ['Endpoint', <code key="url">{MCP_URL}</code>],
          ['Transport', 'Streamable HTTP (stateless, POST only)'],
          ['Sign-in', <span key="auth">OAuth, or the header <code>Authorization: Bearer opro_…</code></span>],
          ['Tools', `${MCP_TOOLS.length}, listed in MCP tools`],
        ]}
      />

      <h2 id="chatgpt">ChatGPT and Claude: sign in with OpenPromo</h2>
      <p>
        ChatGPT and Claude (on the web and in the desktop app) connect through a custom connector and sign in with your
        OpenPromo account. No API key needed.
      </p>
      <Steps>
        <Step title="Add a connector">
          <p>
            <strong>ChatGPT:</strong> <Ui>Settings</Ui>, <Ui>Apps &amp; Connectors</Ui>, <Ui>Advanced settings</Ui>,
            turn on <strong>Developer mode</strong>, then <Ui>Create</Ui>. <strong>Claude:</strong> <Ui>Settings</Ui>,{' '}
            <Ui>Connectors</Ui>, <Ui>Add custom connector</Ui>.
          </p>
        </Step>
        <Step title="Point it at OpenPromo">
          <p>
            Name it OpenPromo, set the server URL to <code>{MCP_URL}</code>, and choose <strong>OAuth</strong> as the
            authentication. Leave the client ID and secret empty: the connector registers itself.
          </p>
        </Step>
        <Step title="Sign in and allow">
          <p>
            A window opens on OpenPromo. Sign in if you need to, check what the connector will be able to do, and click{' '}
            <Ui>Allow</Ui>. You are sent back and the tools appear.
          </p>
        </Step>
      </Steps>
      <p>
        Connected apps are listed in <Ui>Settings and usage</Ui> in OpenPromo, where you can disconnect them at once. The
        connector never sees your password or keys. Developer mode and custom connectors depend on your ChatGPT or Claude
        plan.
      </p>

      <h2 id="prompt">Other agents: a setup prompt</h2>
      <Steps>
        <Step title="Create an API key">
          <p>
            In the app, open <Ui>Settings and usage</Ui> and create an API key under <strong>API keys</strong>. It starts
            with <code>opro_</code> and is shown once. Treat it like a password.
          </p>
        </Step>
        <Step title="Put it in an environment variable">
          <CodeBlock label="Terminal" code={envKey} />
          <p>The prompt below never asks for the key in chat, so it stays out of your conversation history.</p>
        </Step>
        <Step title="Paste the setup prompt into your agent">
          <div className="not-prose my-3">
            <CopyPromptButton text={setupPrompt} />
          </div>
          <p>
            The agent works out what it is, adds the OpenPromo server its own way, asks you to reload if needed, and checks
            the connection with two free calls. It does not create anything or spend during setup. The prompt in{' '}
            <Ui>Settings</Ui> in the app is already filled in with your install&apos;s address.
          </p>
          <CodeBlock label="Setup prompt" code={setupPrompt} />
        </Step>
      </Steps>

      <h2 id="plugin">Claude marketing skills and plugin</h2>
      <p>
        Skills are written marketing workflows your agent follows, built on the MCP tools. Each one says the likely price before
        a paid step and asks before it renders.
      </p>
      <DocTable
        caption="OpenPromo skills"
        head={['Skill', 'What it does']}
        mono={[0]}
        rows={AGENT_SKILLS.map((skill) => [skill.name, skill.summary])}
      />
      <p>
        In Claude Code, the plugin installs the MCP server and all the skills together. It reads your key from{' '}
        <code>OPENPROMO_API_KEY</code> and connects to {MCP_URL}; set <code>OPENPROMO_MCP_URL</code> to use a self-hosted
        install instead.
      </p>
      <CodeBlock label="Claude Code" code={pluginInstall} />
      <p>
        Then try <code>/openpromo:promo-reel</code>. For other agents, connect the server as below and add the skills with
        the skills command, or copy the folders from <code>plugins/openpromo/skills</code> in the repository into your
        agent&apos;s skills folder.
      </p>
      <CodeBlock label="Terminal" code={skillsInstall} />
      <p>
        How you start a skill depends on the agent: a slash command in some, or just asking (&quot;run the content-plan
        skill&quot;) in others.
      </p>

      <h2 id="manual">Set it up by hand</h2>
      <p>
        Every client needs the same three things: the URL <code>{MCP_URL}</code>, the streamable HTTP transport, and
        the header <code>Authorization: Bearer</code> followed by your key. Field names differ by client:
      </p>
      {clients.map((client) => (
        <section key={client.id}>
          <h3 id={client.id}>{client.name}</h3>
          <CodeBlock label={client.where} code={client.code} />
          {client.note ? <p>{client.note}</p> : null}
        </section>
      ))}
      <p>
        Self-hosting? Use your own API address, for example <code>http://localhost:4100/mcp</code> on your computer. See{' '}
        <Link href="/docs/self-hosting">Self-hosting</Link>.
      </p>

      <h2 id="verify">Check it works</h2>
      <p>
        Ask your agent to call <code>whoami</code> and <code>list_projects</code>. Both are free. If they work, the agent
        sees all {MCP_TOOLS.length} tools, listed with their prices in <Link href="/docs/mcp-tools">MCP tools</Link>.
      </p>

      <Callout tone="cost" title="How agents spend">
        <p>
          MCP access costs nothing extra: an agent pays the same YepAPI prices as you do in the app, and each paid tool says
          its typical price in its description. The monthly limit in Settings refuses any call whose price would cross it,
          whether it comes from you or an agent. See <Link href="/docs/costs-and-limits">Costs, caching and limits</Link>.
        </p>
      </Callout>

      <h2 id="update">Updating</h2>
      <CodeBlock label="Claude Code" code={pluginUpdate} />
      <p>
        For skills added with the skills command, run <code>npx skills update</code>. Copied folders: replace them with
        the latest from the repository. The MCP connection itself never needs updating: new tools appear on their own.
      </p>

      <h2 id="troubleshooting">Troubleshooting</h2>
      <DocTable
        caption="Common problems"
        head={['Problem', 'What to do']}
        rows={[
          ['401 or "Send an OpenPromo API key"', 'The header is missing or the key is wrong or revoked. Check the variable is set in the environment the agent starts from, and that the header reads Bearer, a space, then the key.'],
          ['The agent does not see the tools', 'Restart or reload the agent after adding the server; most read their MCP configuration only at start.'],
          ['405 Method not allowed', 'The server is stateless and only answers POST. Choose the streamable HTTP transport, not SSE.'],
          ['Variables are not expanded', 'Some clients start without your shell environment. Put the key in the client’s own env setting, or restart it from a terminal where the variable is set.'],
          ['ChatGPT says the URL is unsafe', 'Use the full https:// address, and a server reachable from the internet; ChatGPT cannot reach localhost. Self-hosted installs need HTTPS on a public domain.'],
          ['The sign-in window says the request expired', 'Requests last ten minutes and work once. Start the connection again from the app.'],
          ['A connected app stopped working', 'If a refresh token is ever used twice, OpenPromo ends that connection for safety. Disconnect it in Settings and connect again.'],
          ['budget_reached', 'The call would cross your monthly spending limit. Raise the limit in Settings and usage, or wait for next month.'],
        ]}
      />

      <h2 id="rest">REST API</h2>
      <p>
        The same key works with the <Link href="/docs/rest-api">REST API</Link>, for scripts and your own tools. Send it
        in the same <code>Authorization</code> header.
      </p>
    </DocArticle>
  );
}
