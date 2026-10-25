import Link from 'next/link';
import { Callout, DocTable, Ui } from '@/components/doc-blocks';
import { DocArticle } from '@/components/doc-page';
import { getDoc } from '@/content/docs';
import { priceRows } from '@/content/pricing';
import { pageMeta } from '@/lib/metadata';

const slug = 'costs-and-limits';
const doc = getDoc(slug);

export const metadata = pageMeta({ title: doc.seoTitle, description: doc.description, path: `/docs/${slug}`, absoluteTitle: doc.absoluteTitle });

export default function CostsPage() {
  return (
    <DocArticle slug={slug}>
      <p>
        OpenPromo charges nothing. Every paid action is billed by YepAPI to your own key at YepAPI&apos;s price. This page
        lists typical prices, explains what is cached so you do not pay twice, and shows where to see and cap your spending.
        Prices are YepAPI&apos;s at the time of writing; YepAPI sets them.
      </p>

      <h2 id="prices">What each action costs</h2>
      <DocTable caption="Typical prices" head={['Action', 'What it covers', 'Price']} mono={[2]} rows={priceRows.map((row) => [row.action, row.unit, row.price])} />
      <p>Free actions include reading and editing the brand profile, ideas and creations, the live preview, uploads and the library.</p>

      <h2 id="ranges">Why prices are ranges</h2>
      <p>
        Writing calls are priced by the length of what is read and written, so a long website or a long video costs more than a
        short one. Reading a site depends on how many pages it reads. Voice depends on the number of scenes, and AI clips on
        their length in seconds.
      </p>

      <h2 id="caching">What is cached</h2>
      <p>
        Generated pieces (voice lines, music, AI pictures and AI clips) are kept per project, keyed by exactly what was asked
        for. When you edit a creation and render again, unchanged pieces are reused for free, and only new or changed ones are
        made and paid for. Rendering images and carousels from templates is always free.
      </p>
      <Callout tone="cost" title="Re-rendering is cheap">
        <p>
          Fix a typo in one scene of a reel and render again: the other scenes&apos; voice lines and the music are reused, so
          you pay for one voice line, about $0.01.
        </p>
      </Callout>

      <h2 id="usage">Where to see what you spent</h2>
      <p>
        <Ui>Settings and usage</Ui> shows this month&apos;s total, spend by feature and by day, and the latest calls with their
        cost. Your remaining YepAPI balance is shown there too. Agents read the same figures with <code>get_usage</code> and{' '}
        <code>get_balance</code>, and scripts with <code>GET /api/usage</code> and <code>GET /api/balance</code>.
      </p>

      <h2 id="limit">The monthly spending limit</h2>
      <p>
        Set a monthly limit in <Ui>Settings and usage</Ui>. Before every paid call, OpenPromo adds up this month&apos;s spend,
        the calls still running and the call&apos;s own estimated price. If the total would cross the limit, the call is
        refused with <code>budget_reached</code> and nothing is spent.
      </p>
      <ul>
        <li>The limit applies to everything: you in the app, the REST API, agents over MCP and background renders.</li>
        <li>A background render stops at the limit instead of running on.</li>
        <li>Calls priced by length reserve their lowest price, so a month can end a few cents over the limit.</li>
        <li>Free actions keep working when the limit is reached.</li>
      </ul>

      <h2 id="credits">When your YepAPI credit runs out</h2>
      <p>
        Paid calls fail with <code>yepapi_no_credits</code> until you top up at YepAPI. OpenPromo cannot top up for you and will
        not charge you. Your projects, files and edits are not affected. See <Link href="/docs/errors">Errors and troubleshooting</Link>.
      </p>
    </DocArticle>
  );
}
