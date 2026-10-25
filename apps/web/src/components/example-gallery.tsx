import { getExample, type Example } from '@/content/examples';

interface ExampleGalleryProps {
  ids: readonly string[];
  /** Show each image's format under it. */
  labels?: boolean;
  /** Stack wide banners in one column instead of a grid. */
  layout?: 'grid' | 'stack';
  className?: string;
}

/** One example image at its real proportions. */
export function ExampleImage({ example, priority = false, className = '' }: { example: Example; priority?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- a static WebP at its real size
    <img
      src={example.src}
      alt={example.alt}
      width={example.width}
      height={example.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={`block h-auto w-full rounded-lg border border-line bg-surface shadow-hard ${className}`}
    />
  );
}

/**
 * Example media made with OpenPromo's templates for a fictional bakery. A grid aligns mixed formats
 * at the bottom so they sit on one line; `stack` puts wide banners one under another.
 */
export function ExampleGallery({ ids, labels = true, layout = 'grid', className = '' }: ExampleGalleryProps) {
  const examples = ids.map(getExample);
  const cols =
    layout === 'stack'
      ? 'mx-auto max-w-3xl'
      : `items-end ${examples.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : examples.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`;
  return (
    <ul className={`grid grid-cols-1 gap-6 ${cols} ${className}`}>
      {examples.map((example) => (
        <li key={example.id} className="min-w-0">
          <figure>
            <ExampleImage example={example} />
            {labels ? <figcaption className="mt-3 text-center text-sm text-muted">{example.label}</figcaption> : null}
          </figure>
        </li>
      ))}
    </ul>
  );
}
