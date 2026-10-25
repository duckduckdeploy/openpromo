import { AppScreenshot } from '@/components/app-screenshot';
import Link from 'next/link';
import { Callout, Step, Steps, Ui } from '@/components/doc-blocks';
import { DocArticle } from '@/components/doc-page';
import { getDoc } from '@/content/docs';
import { pageMeta } from '@/lib/metadata';
import { SIGN_UP_URL, YEPAPI_URL } from '@/lib/site';

const slug = 'getting-started';
const doc = getDoc(slug);

export const metadata = pageMeta({ title: doc.seoTitle, description: doc.description, path: `/docs/${slug}`, absoluteTitle: doc.absoluteTitle });

export default function GettingStartedPage() {
  return (
    <DocArticle slug={slug}>
      <p>
        This guide covers the hosted app. To run OpenPromo on your own machine instead, see{' '}
        <Link href="/docs/self-hosting">Self-hosting</Link>; the steps after installing are the same.
      </p>
      <p>
        OpenPromo is open-source software and charges nothing. The AI work (reading your website, writing, voices, music
        and AI pictures) runs on your own YepAPI key, and YepAPI bills each call to it. A monthly limit in Settings caps
        what you spend.
      </p>

      <Steps>
        <Step title="Create a YepAPI account">
          <p>
            Sign up at{' '}
            <a href={YEPAPI_URL} rel="noopener">
              yepapi.com
            </a>{' '}
            and get $5 in free credit, for a limited time. Then copy your API key from the YepAPI dashboard.
          </p>
        </Step>
        <Step title="Create an OpenPromo account">
          <p>
            <a href={SIGN_UP_URL}>Sign up for OpenPromo</a>. The account is free.
          </p>
        </Step>
        <Step title="Add your key and a spending limit">
          <p>
            Open <Ui>Settings</Ui>, paste your YepAPI key and save. OpenPromo checks the key and stores it encrypted. Set a
            monthly spending limit on the same page: any call whose price would cross it is refused.
          </p>
        </Step>
        <Step title="Add your website">
          <p>
            Create a project with your website address. OpenPromo opens a handful of pages in headless Chrome, takes
            screenshots and builds your brand profile. It takes about a minute and costs about $0.05 to $0.15.
          </p>
        </Step>
        <Step title="Check the brand profile">
          <p>
            Read what OpenPromo found: what you do, who it is for, your voice and selling points, each with the sentence and
            page it came from, plus colors, fonts, logo and products. Fix anything that is wrong. Your edits are kept when the
            site is read again.
          </p>
        </Step>
        <Step title="Make your first post or reel">
          <p>
            Open <Ui>Ideas</Ui> and write a batch of post ideas, or start from a short brief. Click <Ui>Make it</Ui> on an idea,
            check the warnings, edit the text with the live preview, then render. Images cost nothing to render unless they use
            an AI picture; a 30-second reel is usually $0.15 to $0.50.
          </p>
        </Step>
      </Steps>
      <AppScreenshot id="brandProfile" className="my-10" />
      <AppScreenshot id="carouselEditor" className="my-10" />

      <Callout tone="cost" title="When credits run out">
        <p>
          Paid actions stop until you add credit in your YepAPI account. Your projects, files and edits stay as they are, and
          free actions (reading, editing, rendering images from templates) keep working. OpenPromo never tops up for you.
        </p>
      </Callout>

      <h2 id="next">Next steps after setup</h2>
      <ul>
        <li>
          <Link href="/docs/how-it-works">How OpenPromo works</Link>: projects, brand profiles, creations, checks and rendering.
        </li>
        <li>
          <Link href="/docs/costs-and-limits">Costs, caching and limits</Link>: what each action costs and how not to pay twice.
        </li>
        <li>
          <Link href="/docs/mcp">Connect an agent over MCP</Link> so Claude, ChatGPT or Cursor can make media for you.
        </li>
      </ul>
    </DocArticle>
  );
}
