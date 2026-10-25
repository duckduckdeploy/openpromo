import Link from 'next/link';
import { Callout, DocTable } from '@/components/doc-blocks';
import { DocArticle } from '@/components/doc-page';
import { getDoc } from '@/content/docs';
import { MCP_GROUPS, MCP_TOOLS } from '@/content/mcp-tools';
import { pageMeta } from '@/lib/metadata';
import { MCP_URL } from '@/lib/site';

const slug = 'mcp-tools';
const doc = getDoc(slug);

export const metadata = pageMeta({ title: doc.seoTitle, description: doc.description, path: `/docs/${slug}`, absoluteTitle: doc.absoluteTitle });

const anchor = (group: string) => group.toLowerCase().replace(/[^a-z]+/g, '-');

export default function McpToolsPage() {
  return (
    <DocArticle slug={slug}>
      <p>
        The OpenPromo MCP server at <code>{MCP_URL}</code> has {MCP_TOOLS.length} tools. Each one is a thin wrapper over the{' '}
        <Link href="/docs/rest-api">REST API</Link>, called with your own key, so agents get the same checks, prices and
        spending limit as the app. To connect, see <Link href="/docs/mcp">Marketing MCP server</Link>.
      </p>
      <Callout tone="cost" title="What spends">
        <p>
          Reading and editing are free. Five tools can spend from your YepAPI key: <code>create_project</code>,{' '}
          <code>refresh_brand</code>, <code>generate_ideas</code>, <code>create_creation</code> and <code>render_creation</code>.
          Prices are typical figures from the tool descriptions; your monthly limit refuses any call that would cross it.
        </p>
      </Callout>
      <p>
        Most tools take an optional <code>project_id</code>. When the account has exactly one project, it can be left out.
      </p>

      {MCP_GROUPS.map((group) => (
        <section key={group}>
          <h2 id={anchor(group)}>{group}</h2>
          <DocTable
            caption={`${group} tools`}
            head={['Tool', 'What it does', 'Cost']}
            mono={[0]}
            rows={MCP_TOOLS.filter((tool) => tool.group === group).map((tool) => [tool.name, tool.does, tool.cost])}
          />
        </section>
      ))}

      <h2 id="flow">A typical flow</h2>
      <ol>
        <li>
          <code>list_projects</code>, then <code>get_brand</code> to read the profile. Create a project with{' '}
          <code>create_project</code> if there is none, and poll <code>get_brand</code> until it is ready.
        </li>
        <li>
          <code>generate_ideas</code> for a goal and channel, or skip to a brief.
        </li>
        <li>
          <code>create_creation</code> with an <code>idea_id</code> or a <code>brief</code>. Read the checks it returns and fix
          errors with <code>update_creation</code>.
        </li>
        <li>
          <code>render_creation</code>, then poll <code>get_render</code>. Download files from{' '}
          <code>/api/assets/&#123;id&#125;/file</code> with the same key.
        </li>
      </ol>
    </DocArticle>
  );
}
