import Link from 'next/link';
import { CREATION_TYPES, FORMAT_KEYS, IDEA_GOALS } from '@openpromo/shared';
import { Callout, DocTable, Ui } from '@/components/doc-blocks';
import { CodeBlock } from '@/components/code-block';
import { DocArticle } from '@/components/doc-page';
import { getDoc } from '@/content/docs';
import { pageMeta } from '@/lib/metadata';
import { PUBLIC_API_URL } from '@/lib/site';

const slug = 'rest-api';
const doc = getDoc(slug);

export const metadata = pageMeta({ title: doc.seoTitle, description: doc.description, path: `/docs/${slug}`, absoluteTitle: doc.absoluteTitle });

const API = `${PUBLIC_API_URL}/api`;

const auth = `curl ${API}/me \\
  -H "Authorization: Bearer $OPENPROMO_API_KEY"`;

const envelope = `// Success
{ "ok": true, "data": { ... } }

// Success of a paid call: what it cost on your YepAPI key
{ "ok": true, "data": { ... }, "costUsd": 0.04 }

// Error
{ "ok": false, "error": { "code": "budget_reached", "message": "...", "details": ... } }`;

const flow = `# 1. Add a website. Reading it runs in the background (about a minute).
curl -X POST ${API}/projects \\
  -H "Authorization: Bearer $OPENPROMO_API_KEY" -H "Content-Type: application/json" \\
  -d '{"url": "crumbandco.example"}'

# 2. Poll until brandStatus is "ready".
curl ${API}/projects/PROJECT_ID -H "Authorization: Bearer $OPENPROMO_API_KEY"

# 3. Write a reel from a brief (one writing call).
curl -X POST ${API}/projects/PROJECT_ID/creations \\
  -H "Authorization: Bearer $OPENPROMO_API_KEY" -H "Content-Type: application/json" \\
  -d '{"type": "reel", "brief": "Weekend offer: 20% off a first subscription"}'

# 4. Render it, then poll the render until status is "done".
curl -X POST ${API}/creations/CREATION_ID/renders \\
  -H "Authorization: Bearer $OPENPROMO_API_KEY" -H "Content-Type: application/json" -d '{}'
curl ${API}/renders/RENDER_ID -H "Authorization: Bearer $OPENPROMO_API_KEY"

# 5. Download an output file by its asset id.
curl -L -o reel.mp4 "${API}/assets/ASSET_ID/file?download=1" \\
  -H "Authorization: Bearer $OPENPROMO_API_KEY"`;

const upload = `curl -X POST ${API}/projects/PROJECT_ID/assets \\
  -H "Authorization: Bearer $OPENPROMO_API_KEY" \\
  -F "file=@country-sourdough.jpg" -F "role=product"`;

const code = (text: string) => <code key={text}>{text}</code>;
const list = (values: readonly string[]) => values.map((value) => `"${value}"`).join(', ');

export default function RestApiPage() {
  return (
    <DocArticle slug={slug}>
      <p>
        Everything the dashboard does goes through this API, so scripts and your own tools can do the same. The{' '}
        <Link href="/docs/mcp">MCP server</Link> wraps the same routes for AI agents. The base address is{' '}
        <code>{API}</code>; on a self-hosted install, use your own API address.
      </p>

      <h2 id="auth">Authentication</h2>
      <p>
        Create an API key in <Ui>Settings and usage</Ui> under <strong>API keys</strong>. Keys start with <code>opro_</code>,
        are shown once and act as your account. Send one as a bearer token:
      </p>
      <CodeBlock label="Terminal" code={auth} />
      <p>
        A few account settings can only be changed from the dashboard while signed in: your YepAPI key, the spending limit and
        creating or deleting API keys. With an API key, those routes answer <code>403 forbidden</code>.
      </p>

      <h2 id="responses">Responses</h2>
      <CodeBlock label="JSON" code={envelope} />
      <p>
        Error codes are listed in <Link href="/docs/errors">Errors and troubleshooting</Link>. Request bodies are JSON unless
        noted; an invalid field answers <code>400 validation_error</code> with the field in <code>details</code>.
      </p>

      <h2 id="quickstart">From website to reel</h2>
      <CodeBlock label="Terminal" code={flow} />

      <h2 id="account">Account and usage</h2>
      <DocTable
        caption="Account routes"
        head={['Route', 'What it does']}
        mono={[0]}
        rows={[
          ['GET /api/me', 'You, whether a YepAPI key is connected, your spending limit, and this install’s MCP and docs addresses.'],
          ['GET /api/balance', 'Your remaining YepAPI balance, with this month’s spend, paid calls and limit. Free.'],
          ['GET /api/usage', 'This month’s spend: total, by feature, by day, and the 50 latest calls.'],
          ['GET /api/api-keys', 'Your API keys: name, prefix, last used. Never the key itself.'],
          [
            'POST /api/api-keys',
            <span key="k">
              Create a key. Body: {code('{ "name": string }')}. Returns the full key once. Dashboard only.
            </span>,
          ],
          ['DELETE /api/api-keys/:id', 'Revoke a key. Dashboard only.'],
          [
            'PUT /api/settings/yepapi-key',
            <span key="y">
              Save your YepAPI key after checking it. Body: {code('{ "apiKey": string }')}. Dashboard only.
            </span>,
          ],
          ['DELETE /api/settings/yepapi-key', 'Remove your YepAPI key. Dashboard only.'],
          [
            'PUT /api/settings/budget',
            <span key="b">
              Set the monthly limit in dollars, or remove it. Body: {code('{ "monthlyBudgetUsd": number | null }')}. Dashboard only.
            </span>,
          ],
        ]}
      />

      <h2 id="projects">Projects and brand profiles</h2>
      <DocTable
        caption="Project routes"
        head={['Route', 'What it does']}
        mono={[0]}
        rows={[
          ['GET /api/projects', 'Your projects with brand status, tagline, main colors and logo asset id.'],
          [
            'POST /api/projects',
            <span key="p">
              Add a website and start reading it. Body: {code('{ "url": string, "name"?: string }')}. Needs a YepAPI key. Answers{' '}
              <code>201</code> with <code>brandStatus: &quot;ingesting&quot;</code>. Costs about $0.05 – $0.15.
            </span>,
          ],
          ['GET /api/projects/:id', 'The project with its full brand profile, read status and progress, and agent notes (context).'],
          [
            'PATCH /api/projects/:id',
            <span key="pa">
              Rename it or replace the agent notes. Body: {code('{ "name"?: string, "context"?: object }')}.
            </span>,
          ],
          ['DELETE /api/projects/:id', 'Delete the project, everything in it and its files.'],
          [
            'PUT /api/projects/:id/brand',
            <span key="br">
              Save an edited brand profile. Body: {code('{ "brand": BrandProfile }')}, the whole profile as read from the project.
              Changed fields are remembered and survive a refresh.
            </span>,
          ],
          [
            'POST /api/projects/:id/brand/refresh',
            <span key="r">
              Read the website again. Body: {code('{ "reset"?: boolean }')}; <code>reset: true</code> also forgets your edits.{' '}
              <code>409</code> while a read is running.
            </span>,
          ],
          ['GET /api/projects/:id/pages', 'The pages the profile was built from, with their text, for checking where a claim came from.'],
        ]}
      />

      <h2 id="assets">Assets and files</h2>
      <DocTable
        caption="Asset routes"
        head={['Route', 'What it does']}
        mono={[0]}
        rows={[
          [
            'GET /api/projects/:id/assets',
            <span key="a">
              The library. Query: <code>role</code> (comma-separated), <code>creationId</code>, <code>limit</code> (1–500,
              default 200).
            </span>,
          ],
          [
            'POST /api/projects/:id/assets',
            <span key="u">
              Upload a file as multipart form data: field <code>file</code>, optional field <code>role</code> (logo, product,
              photo, screenshot, background, broll, music or voice; default photo). PNG, JPEG, WebP, SVG, GIF, MP4, WebM, MP3,
              WAV or M4A, up to 200 MB.
            </span>,
          ],
          [
            'GET /api/assets/:id/file',
            <span key="f">
              The file itself. Supports <code>Range</code> requests for video seeking; add <code>?download=1</code> to download
              it with a file name.
            </span>,
          ],
          [
            'PATCH /api/assets/:id',
            <span key="pa">
              Rename it or change its role. Body: {code('{ "name"?: string, "role"?: string }')}.
            </span>,
          ],
          ['DELETE /api/assets/:id', 'Delete the asset and its file.'],
        ]}
      />
      <CodeBlock label="Upload a product photo" code={upload} />

      <h2 id="ideas">Ideas</h2>
      <DocTable
        caption="Idea routes"
        head={['Route', 'What it does']}
        mono={[0]}
        rows={[
          ['GET /api/projects/:id/ideas', 'Saved ideas, newest first.'],
          [
            'POST /api/projects/:id/ideas',
            <span key="i">
              Write new ideas from the brand profile. Body: {code('{ "count"?: 1–20, "goal"?, "channel"?, "type"?, "notes"?: string }')}.
              Count defaults to 8. Answers <code>201</code> with the ideas and <code>costUsd</code>. About $0.02 – $0.08.
            </span>,
          ],
          [
            'PATCH /api/ideas/:id',
            <span key="pi">
              Edit an idea. Body: any of <code>title</code>, <code>hook</code>, <code>body</code>, <code>caption</code>,{' '}
              <code>hashtags</code> (array), <code>status</code> (new, used or archived) and <code>plannedFor</code>{' '}
              (YYYY-MM-DD or null).
            </span>,
          ],
          ['DELETE /api/ideas/:id', 'Delete an idea.'],
        ]}
      />
      <p>
        Goals: {list(Object.keys(IDEA_GOALS))}. Channels: &quot;instagram&quot;, &quot;tiktok&quot;, &quot;youtube&quot;,
        &quot;linkedin&quot;, &quot;facebook&quot;, &quot;x&quot;.
      </p>

      <h2 id="creations">Creations and renders</h2>
      <DocTable
        caption="Creation routes"
        head={['Route', 'What it does']}
        mono={[0]}
        rows={[
          ['GET /api/projects/:id/creations', <span key="l">Creations with their latest render. Query: <code>type</code>.</span>],
          [
            'POST /api/projects/:id/creations',
            <span key="c">
              Write a creation from an idea or a brief. Body:{' '}
              {code('{ "type", "format"?, "ideaId"?, "brief"?, "voice"?: boolean, "allowGenerated"?: boolean }')}. Give{' '}
              <code>ideaId</code> or <code>brief</code>. <code>voice</code> and <code>allowGenerated</code> default to true.
              Takes 10 to 30 seconds; answers <code>201</code> with the scenes, checks and <code>costUsd</code>.
            </span>,
          ],
          ['GET /api/creations/:id', 'The creation with its scenes (spec), checks, caption and its last 20 renders.'],
          [
            'PUT /api/creations/:id',
            <span key="u">
              Save edits. Body: {code('{ "spec"?, "title"?, "caption"?, "format"? }')}; send the whole spec as read. Checks run
              again. <code>409</code> while it is rendering.
            </span>,
          ],
          ['DELETE /api/creations/:id', 'Delete the creation.'],
          [
            'GET /api/creations/:id/preview',
            <span key="pv">
              One scene as an HTML page, as the editor shows it. Query: <code>scene</code> (default 0), <code>format</code>. Free.
            </span>,
          ],
          [
            'POST /api/creations/:id/renders',
            <span key="rd">
              Start a render. Body: {code('{ "format"?, "quality"?: "draft" | "final" }')}. Answers <code>202</code>. Refused
              while checks have errors or another render is running. Spends only on AI pieces that are not cached yet.
            </span>,
          ],
          ['GET /api/renders/:id', 'Status and progress; when done, the output, poster and caption file asset ids.'],
        ]}
      />
      <p>Types and the sizes each one can have:</p>
      <DocTable
        caption="Creation types"
        head={['Type', 'Formats']}
        mono={[0, 1]}
        rows={Object.entries(CREATION_TYPES).map(([type, info]) => [type, info.formats.join(', ')])}
      />
      <p>All formats: {list(FORMAT_KEYS)}.</p>

      <Callout tone="cost" title="Spending through the API">
        <p>
          API calls spend from the same YepAPI key and count toward the same monthly limit as the dashboard. A paid call that
          would cross the limit answers <code>402 budget_reached</code> and spends nothing.
        </p>
      </Callout>
    </DocArticle>
  );
}
