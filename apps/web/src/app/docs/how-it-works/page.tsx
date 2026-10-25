import Link from 'next/link';
import { Callout, DocTable } from '@/components/doc-blocks';
import { DocArticle } from '@/components/doc-page';
import { getDoc } from '@/content/docs';
import { pageMeta } from '@/lib/metadata';

const slug = 'how-it-works';
const doc = getDoc(slug);

export const metadata = pageMeta({ title: doc.seoTitle, description: doc.description, path: `/docs/${slug}`, absoluteTitle: doc.absoluteTitle });

export default function HowItWorksPage() {
  return (
    <DocArticle slug={slug}>
      <p>
        OpenPromo turns a website into promo media in a fixed order: read the site, build a brand profile, write ideas, write
        a creation, check it, preview it and render it. Each step is visible and editable, and nothing is generated from a
        blank prompt.
      </p>

      <h2 id="projects">Projects and the brand profile</h2>
      <p>
        A project is one website. When you add it, OpenPromo opens a handful of pages in headless Chrome, saves a screenshot of
        each, and reads the text. An AI model then writes the brand profile, while colors, fonts and the logo are measured
        from the rendered pages.
      </p>
      <DocTable
        caption="What the brand profile holds"
        head={['Part', 'What it contains']}
        rows={[
          ['Identity', 'Name, tagline, what the business does, its category, website and social links.'],
          ['Audience', 'Who it is for, their problems and the outcomes they want, and common objections.'],
          ['Positioning', 'Selling points, each with the exact sentence and page it came from, plus calls to action and offers.'],
          ['Voice', 'Tone, how casual and playful it is, sample lines and words to avoid.'],
          ['Visual', 'Brand colors, text and background colors, heading and body fonts, the logo and its color.'],
          ['Products', 'Products or plans the site describes.'],
          ['Flows', 'Getting-started steps a new customer takes, for tutorials.'],
        ]}
      />
      <p>
        Every field is editable. OpenPromo remembers which fields you changed, so reading the site again later keeps your
        edits unless you ask for a reset.
      </p>

      <h2 id="ideas">Ideas</h2>
      <p>
        Ideas are short plans for posts: a title, a hook, a caption, hashtags, a call to action and the selling points they
        use. Write a batch by goal (launch, offer, tip, social proof, feature or behind the scenes) and channel. <strong>Make
        it</strong> turns an idea into a creation.
      </p>

      <h2 id="creations">Creations are storyboards</h2>
      <p>
        A creation is an image, carousel, reel, promo video or tutorial. It is stored as a list of scenes, each with a layout,
        on-screen text, an optional picture, narration and a duration, plus a style, audio settings and a post caption. Renders
        are outputs of that storyboard: edit a scene and render again.
      </p>
      <DocTable
        caption="Creation types and sizes"
        head={['Type', 'Sizes', 'Output']}
        rows={[
          ['Image', 'Square 1:1, portrait 4:5, story 9:16, link banner 1200×628, X header 1500×500, LinkedIn banner 1584×396', 'PNG'],
          ['Carousel', 'Square or portrait', 'PNG per slide and a PDF'],
          ['Reel', 'Story 9:16', 'MP4, poster and SRT'],
          ['Promo video', '16:9, 1:1 or 9:16', 'MP4, poster and SRT'],
          ['Tutorial', '16:9 or 9:16', 'MP4, poster and SRT'],
        ]}
      />
      <p>
        There are ten scene layouts: hero, statement, big number, list, quote, screenshot in a device frame, product, picture
        and text, offer, and call to action, each in a clean, bold or photo look.
      </p>

      <h2 id="checks">Checks</h2>
      <p>Every creation is checked when it is written and again on every save. Errors block rendering; warnings do not.</p>
      <ul>
        <li>Hype words such as &ldquo;revolutionize&rdquo; or &ldquo;seamless&rdquo;.</li>
        <li>Figures that cannot be found on your website, to stop invented claims.</li>
        <li>Missing pictures, reading time per scene and voiceover pace.</li>
        <li>A missing hook or call to action.</li>
      </ul>

      <h2 id="rendering">Rendering</h2>
      <p>
        Scenes are HTML and CSS templates rendered in headless Chrome, so text is always real text in your brand fonts. A fit
        pass shrinks text until nothing overflows, and color pairs below WCAG AA contrast are fixed automatically. Videos are
        put together with Hyperframes (Apache-2.0) and FFmpeg, which add the voiceover, music and word-by-word captions.
      </p>
      <Callout title="What AI does, and what it does not">
        <p>
          AI reads your site and writes ideas, captions and scripts. It can make backdrop pictures, B-roll clips, voiceovers
          and music. It never draws your text, so there is no garbled lettering.
        </p>
      </Callout>
      <p>
        Renders run in the background. Generated pieces (voice lines, music, AI pictures and clips) are cached, so rendering
        again after an edit only makes, and pays for, what changed. See <Link href="/docs/costs-and-limits">Costs, caching and limits</Link>.
      </p>

      <h2 id="library">The library</h2>
      <p>
        Every file of a project is in its library: website screenshots, the logo, uploads, AI pictures, voice, music and
        finished media. Use any of them in a scene.
      </p>

      <h2 id="storage">What is stored, and where</h2>
      <p>
        Accounts, encrypted YepAPI keys, API keys and the usage log live in one Postgres database; projects, brand profiles,
        ideas, creations and renders in a second one. Files live in a media folder (<code>MEDIA_DIR</code>, a Docker volume when
        self-hosted) and are served only to their owner. See <Link href="/docs/self-hosting">Self-hosting</Link>.
      </p>
    </DocArticle>
  );
}
