import Link from 'next/link';
import { Callout, DocTable, Step, Steps } from '@/components/doc-blocks';
import { CodeBlock } from '@/components/code-block';
import { DocArticle } from '@/components/doc-page';
import { getDoc } from '@/content/docs';
import { selfHostClone } from '@/content/snippets';
import { pageMeta } from '@/lib/metadata';
import { GITHUB_URL } from '@/lib/site';

const slug = 'self-hosting';
const doc = getDoc(slug);

export const metadata = pageMeta({ title: doc.seoTitle, description: doc.description, path: `/docs/${slug}`, absoluteTitle: doc.absoluteTitle });

const secrets = `cp .env.example .env

# Then open .env and set these two:
AUTH_SECRET=        # any 32+ random characters
ENCRYPTION_KEY=     # the output of: openssl rand -base64 32`;

const secretsGenerate = `# Generate both with Docker if you have no openssl:
docker run --rm alpine sh -c "apk add -q openssl && echo AUTH_SECRET=\\$(openssl rand -hex 32) && echo ENCRYPTION_KEY=\\$(openssl rand -base64 32)"`;

const up = `docker compose up -d --build`;

const serverInstall = `# Ubuntu or Debian: install Docker
curl -fsSL https://get.docker.com | sh

# Get OpenPromo
git clone ${GITHUB_URL}.git openpromo
cd openpromo
cp .env.example .env`;

const serverEnv = `# .env on a server with the domain example.com
AUTH_SECRET=...
ENCRYPTION_KEY=...
POSTGRES_PASSWORD=...           # a long random password

OPENPROMO_DOMAIN=example.com
APP_URL=https://app.example.com
WEB_URL=https://example.com
PUBLIC_API_URL=https://api.example.com`;

const serverUp = `docker compose --profile https up -d --build`;

const update = `cd openpromo
git pull
docker compose up -d --build        # add --profile https on a server`;

const backup = `# Back up both databases to files: accounts and keys, then project data
docker compose exec -T postgres pg_dump -U openpromo openpromo | gzip > openpromo-$(date +%F).sql.gz
docker compose exec -T postgres pg_dump -U openpromo openpromo_data | gzip > openpromo_data-$(date +%F).sql.gz

# Restore them into an empty install
gunzip -c openpromo-2026-10-15.sql.gz | docker compose exec -T postgres psql -U openpromo openpromo
gunzip -c openpromo_data-2026-10-15.sql.gz | docker compose exec -T postgres psql -U openpromo openpromo_data

# Back up the media files (screenshots, uploads, AI pieces and renders)
docker compose cp api:/data/media ./media-$(date +%F)`;

const fromSource = `pnpm install
docker compose up -d postgres       # or point DATABASE_URL at your own Postgres
pnpm db:migrate
pnpm dev`;

export default function SelfHostingPage() {
  return (
    <DocArticle slug={slug}>
      <p>
        OpenPromo is open source under the MIT license, and everything the hosted app runs is in the repository: the
        dashboard, the API with its MCP server, background worker and renderer, the public site and the database schema. The
        Docker image includes headless Chrome, FFmpeg and fonts for rendering. With Docker, one command starts all of it.
      </p>
      <DocTable
        caption="Ways to run OpenPromo"
        head={['Where', 'Good for', 'You need']}
        rows={[
          ['Your own computer', 'Trying it out, or using it just for yourself', 'Docker Desktop (Windows, macOS) or Docker (Linux), with about 4 GB of memory for it'],
          ['A cloud server', 'Using it from anywhere, with a team, on your own domain', 'A server with about 2 vCPU and 4 GB of memory, and a domain'],
          ['From source', 'Changing the code', 'Node.js 26, pnpm 10 and Postgres'],
        ]}
      />

      <h2 id="computer">On your own computer</h2>
      <Steps>
        <Step title="Install Docker">
          <p>
            Install Docker Desktop on Windows or macOS, or Docker Engine on Linux, and start it. Give it at least 4 GB of
            memory: the first build compiles the dashboard and the site, and rendering video runs Chrome and FFmpeg.
          </p>
        </Step>
        <Step title="Get the code">
          <CodeBlock label="Terminal" code={selfHostClone} />
        </Step>
        <Step title="Set two secrets">
          <CodeBlock label="Terminal" code={secrets} />
          <p>
            <code>AUTH_SECRET</code> signs sign-in sessions. <code>ENCRYPTION_KEY</code> encrypts the YepAPI keys you
            store; keep a copy somewhere safe, because they cannot be read without it.
          </p>
          <CodeBlock label="Terminal" code={secretsGenerate} />
        </Step>
        <Step title="Start it">
          <CodeBlock label="Terminal" code={up} />
          <p>
            The first build takes a few minutes. Postgres starts, the database is set up, and then the API, dashboard
            and site come up. Open <code>http://localhost:3200</code>, create your account and follow the setup.
          </p>
        </Step>
      </Steps>
      <DocTable
        caption="Addresses on your computer"
        head={['Address', 'What it is']}
        mono={[0]}
        rows={[
          ['http://localhost:3200', 'The dashboard: where you work'],
          ['http://localhost:3101', 'This site and the docs, served locally'],
          ['http://localhost:4100', 'The API, and the MCP server at /mcp for your AI agent'],
        ]}
      />
      <p>
        These addresses are only reachable from your computer. To stop OpenPromo, run <code>docker compose down</code>;
        your database and media files stay in Docker volumes until you remove them with <code>docker compose down -v</code>.
      </p>

      <h2 id="server">On a cloud server, with your own domain</h2>
      <p>
        Any provider that gives you a Linux server works: a virtual server with about 2 vCPU, 4 GB of memory and 40 GB of
        disk is enough for one person or a small team. Videos and pictures add up, so give it more disk if you render a lot.
        Use Ubuntu 24.04 or Debian 12.
      </p>
      <Steps>
        <Step title="Point your domain at the server">
          <p>
            Create DNS records for your domain, <code>app.</code> and <code>api.</code> on it (for example{' '}
            <code>example.com</code>, <code>app.example.com</code> and <code>api.example.com</code>), all pointing at
            the server&apos;s IP address. Open ports 22, 80 and 443 in the provider&apos;s firewall, and nothing else.
          </p>
        </Step>
        <Step title="Install Docker and get the code">
          <CodeBlock label="On the server" code={serverInstall} />
        </Step>
        <Step title="Set the secrets and your domain">
          <CodeBlock label=".env" code={serverEnv} />
          <p>
            The public addresses are built into the dashboard and the site, so set them before you start, and rebuild
            if you change them.
          </p>
        </Step>
        <Step title="Start it with HTTPS">
          <CodeBlock label="On the server" code={serverUp} />
          <p>
            The <code>https</code> profile adds Caddy in front, which gets certificates from Let&apos;s Encrypt and
            renews them on its own. The app, site and API listen only on the server itself; Caddy is the only thing
            facing the internet.
          </p>
        </Step>
      </Steps>
      <Callout title="Behind Cloudflare or another proxy">
        <p>
          If a proxy such as Cloudflare sits in front of the server, use its full, strict TLS mode and add{' '}
          <code>CLIENT_IP_HEADER=cf-connecting-ip</code> (or your proxy&apos;s equivalent) to <code>.env</code>, so rate
          limits see each visitor&apos;s real address. Only do this if nothing but the proxy can reach the server; a
          header a visitor could set themselves would let them choose their own address.
        </p>
      </Callout>

      <h2 id="update">Updating</h2>
      <CodeBlock label="Terminal" code={update} />
      <p>Database changes are applied automatically when the API starts. Back up first if your data matters to you.</p>
      <p>
        OpenPromo keeps two Postgres databases: <code>openpromo</code> for accounts, keys and usage, and{' '}
        <code>openpromo_data</code> for projects, brand profiles, ideas, creations and renders. The second is created on first
        start, on the same server. To keep it elsewhere, set <code>DATA_DATABASE_URL</code>. Files live in the{' '}
        <code>media</code> Docker volume, mounted at <code>MEDIA_DIR</code> (<code>/data/media</code>) inside the API.
      </p>

      <h2 id="backup">Backups</h2>
      <CodeBlock label="Terminal" code={backup} />
      <p>
        Keep <code>.env</code> with your backups: the stored YepAPI keys cannot be read without the same{' '}
        <code>ENCRYPTION_KEY</code>. On a server, run the backup commands nightly with cron and copy the files off the
        machine.
      </p>

      <h2 id="settings">Settings</h2>
      <DocTable
        caption="Optional settings in .env"
        head={['Setting', 'What it does']}
        mono={[0]}
        rows={[
          ['RENDER_CONCURRENCY', 'Renders at once, 1 by default. Each one runs Chrome and FFmpeg; raise it only on a bigger server.'],
          ['MEDIA_JOB_CONCURRENCY', 'AI media jobs (voice, music, pictures, clips) at once, 4 by default.'],
          ['INGEST_MAX_PAGES', 'Pages read when building a brand profile, 8 by default.'],
          ['API_BIND, APP_BIND, WEB_BIND', 'Which address each service listens on. 127.0.0.1 by default, so only this machine can reach them.'],
          ['POSTGRES_PASSWORD', 'The database password. Set a long random one on a server.'],
        ]}
      />
      <p>
        After changing <code>.env</code>, run <code>docker compose up -d</code> again.
      </p>

      <h2 id="source">From source, for development</h2>
      <CodeBlock label="Terminal" code={fromSource} />
      <p>
        <code>pnpm dev</code> runs the API on <code>:4100</code>, the dashboard on <code>:3200</code> and the site on{' '}
        <code>:3101</code> with live reload. <code>pnpm typecheck</code> and <code>pnpm test</code> run the checks; the
        tests need no database or network, because they use an in-memory Postgres and a stand-in for YepAPI.
      </p>

      <h2 id="next">Connect your agent next</h2>
      <p>
        Connect your AI agent to your own install: your MCP endpoint is <code>{'{API_URL}'}/mcp</code>. See{' '}
        <Link href="/docs/mcp">Connect an agent over MCP</Link>.
      </p>
    </DocArticle>
  );
}
