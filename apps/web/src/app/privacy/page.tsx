import { LegalPage } from '@/components/legal-page';
import { pageMeta } from '@/lib/metadata';
import { YEPAPI_URL } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Privacy (draft)',
  description: 'A draft, plain-language outline of how OpenPromo expects to handle data. Not yet reviewed.',
  path: '/privacy',
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy">
      <p>
        This draft outlines how we expect the hosted version of OpenPromo to handle data. Details may change before
        launch.
      </p>

      <h2>What the hosted version stores</h2>
      <ul>
        <li>The account details you give us when you sign up.</li>
        <li>Your YepAPI key, stored encrypted, so the app can make calls on your behalf.</li>
        <li>
          Your projects: the website address, the pages read from it and their screenshots, and the brand profile built
          from them, including any edits you make.
        </li>
        <li>
          Media files: logos and pictures read from your website, files you upload, AI pictures, voice and music made for
          you, and the images and videos you render. They are kept until you delete them or the project.
        </li>
        <li>Your ideas and creations, and a log of each paid call with its cost, so you can see what you spent.</li>
      </ul>

      <h2>YepAPI</h2>
      <p>
        AI work (reading pages, writing, pictures, voice and music) goes through YepAPI using your key. The text and
        pictures needed for each request are sent to YepAPI and the models it uses. Your billing relationship is with
        YepAPI, and their handling of your account and payment data is covered by their own policies at{' '}
        <a href={YEPAPI_URL} rel="noopener">
          yepapi.com
        </a>
        . OpenPromo does not process payments.
      </p>

      <h2>Self-hosting</h2>
      <p>
        If you self-host OpenPromo, the database and the media folder run on infrastructure you control. We do not
        receive that data.
      </p>

      <h2>Still to be written</h2>
      <p>
        The final policy will cover retention, deletion, cookies, sub-processors, your rights and how to contact us.
        Those sections are not written yet.
      </p>
    </LegalPage>
  );
}
