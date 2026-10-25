import { EXAMPLE_REEL, SCREENS, type ScreenId } from '@/content/screens';

/** A screenshot of the dashboard in the site's glowing frame, with a caption. */
export function AppScreenshot({ id, className = '' }: { id: ScreenId; className?: string }) {
  const screen = SCREENS[id];
  return (
    <figure className={`mx-auto max-w-5xl ${className}`}>
      <div className="frame-glow">
        {/* eslint-disable-next-line @next/next/no-img-element -- a static WebP at its real size */}
        <img src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} loading="lazy" decoding="async" className="block h-auto w-full rounded-lg border border-line" />
      </div>
      <figcaption className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted">{screen.caption}</figcaption>
    </figure>
  );
}

/** The example reel, playable inline. */
export function ExampleReel({ className = '' }: { className?: string }) {
  return (
    <figure className={`mx-auto max-w-xs ${className}`}>
      <video
        src={EXAMPLE_REEL.src}
        poster={EXAMPLE_REEL.poster}
        width={EXAMPLE_REEL.width}
        height={EXAMPLE_REEL.height}
        controls
        playsInline
        preload="none"
        className="block h-auto w-full rounded-xl border border-line bg-night shadow-hard"
      />
      <figcaption className="mt-4 text-center text-sm text-muted">{EXAMPLE_REEL.caption}</figcaption>
    </figure>
  );
}
