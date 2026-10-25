import Link from 'next/link';
import { Callout, DocTable } from '@/components/doc-blocks';
import { DocArticle } from '@/components/doc-page';
import { getDoc } from '@/content/docs';
import { pageMeta } from '@/lib/metadata';

const slug = 'errors';
const doc = getDoc(slug);

export const metadata = pageMeta({ title: doc.seoTitle, description: doc.description, path: `/docs/${slug}`, absoluteTitle: doc.absoluteTitle });

export default function ErrorsPage() {
  return (
    <DocArticle slug={slug}>
      <p>
        Errors in the app, the REST API and the MCP tools carry the same code and message. In the REST API they come back as{' '}
        <code>{'{ "ok": false, "error": { "code", "message", "details?" } }'}</code> with the HTTP status below. MCP tools
        return the message as an error result.
      </p>

      <h2 id="money">Keys, credit and limits</h2>
      <DocTable
        caption="Key, credit and limit errors"
        head={['Code', 'Status', 'What to do']}
        mono={[0, 1]}
        rows={[
          ['yepapi_key_missing', '400', 'Add your YepAPI key under Settings and usage. A project needs one before the website can be read.'],
          ['yepapi_key_invalid', '400', 'YepAPI rejected the key. Copy the whole key again from YepAPI and replace it in Settings.'],
          ['yepapi_no_credits', '402', 'Your YepAPI balance is empty. Top up at yepapi.com; OpenPromo cannot do it for you.'],
          ['yepapi_account_frozen', '402', 'YepAPI reports the account as frozen. Contact YepAPI support.'],
          ['budget_reached', '402', 'The call would cross your monthly spending limit, so nothing was spent. Raise or clear the limit in Settings, or wait for the next month (months start on the 1st, UTC).'],
        ]}
      />

      <h2 id="requests">Requests</h2>
      <DocTable
        caption="Request errors"
        head={['Code', 'Status', 'What to do']}
        mono={[0, 1]}
        rows={[
          ['unauthorized', '401', 'Sign in, or send a valid API key: Authorization: Bearer opro_…'],
          ['forbidden', '403', 'This setting can only be changed from the dashboard while signed in: the YepAPI key, the spending limit and API keys.'],
          ['forbidden_origin', '403', 'A signed-in browser request came from another site. Call the API with an API key instead.'],
          ['validation_error', '400', 'A field is missing or invalid. The message names it, and details lists every problem.'],
          ['bad_request', '400', 'The request cannot be done as asked, for example a format the creation type does not support, or a render while checks have errors. The message says what to change.'],
          ['not_found', '404', 'The project, idea, creation, render or asset does not exist, or belongs to another account.'],
          ['conflict', '409', 'Something is still running: the website is being read, the brand profile is not ready yet, or the creation is rendering. Wait and try again.'],
          ['payload_too_large', '413', 'The upload is over 200 MB, or the JSON body is over 1 MB.'],
          ['rate_limited', '429', 'Too many requests from your address. Wait a little.'],
        ]}
      />

      <h2 id="generation">Writing, generation and rendering</h2>
      <DocTable
        caption="Generation errors"
        head={['Code', 'Status', 'What to do']}
        mono={[0, 1]}
        rows={[
          ['ai_bad_output', '502', 'The model’s answer could not be used, for example a creation with no scenes. Try again; a short, clear brief helps.'],
          ['generation_failed', '502', 'A picture, clip, voice or music job failed at the model. You were not charged for it. Try again, or use your own picture.'],
          ['yepapi_validation', '400', 'YepAPI rejected the request. The message has its reason.'],
          ['yepapi_rate_limited', '429', 'YepAPI is limiting requests. Try again shortly.'],
          ['yepapi_timeout', '504', 'YepAPI took too long. You were not charged if the call failed.'],
          ['yepapi_error', '502', 'YepAPI returned another error. The message has the details.'],
          ['queue_unavailable', '503', 'The background queue is not available, so nothing was started or spent. Try again in a moment.'],
        ]}
      />

      <h2 id="troubleshooting">Troubleshooting</h2>
      <DocTable
        caption="Common problems"
        head={['Problem', 'What to do']}
        rows={[
          ['The website could not be read', 'The project shows the reason. Check the address is public and opens in a browser, then read it again. Self-hosted installs cannot read private or local addresses unless INGEST_ALLOW_PRIVATE_NETWORK is on.'],
          ['The brand profile is thin', 'The site has little text. Add selling points, audience and voice by hand; your edits are kept.'],
          ['A render will not start', 'Open the creation and fix the checks marked as errors, such as a missing headline, a missing picture or a missing hook.'],
          ['A render failed', 'The creation shows the error. Fix it and render again; pieces already made are reused, so you do not pay twice.'],
          ['Video renders are slow or fail on a small server', 'Rendering runs Chrome and FFmpeg. Give the server about 2 vCPU and 4 GB of memory, and keep RENDER_CONCURRENCY at 1.'],
        ]}
      />

      <Callout title="Still stuck?">
        <p>
          Check <Link href="/docs/costs-and-limits">Costs, caching and limits</Link> for spending questions, and{' '}
          <Link href="/docs/self-hosting">Self-hosting</Link> for install problems.
        </p>
      </Callout>
    </DocArticle>
  );
}
