import Link from 'next/link';
import type { PromoTemplate } from '@openpromo/shared';
import { isVideoTemplate, previewOf, priceText, recipeName } from '@/content/templates';

const ASPECT: Record<string, string> = { story: 'aspect-[9/16]', landscape: 'aspect-video', link: 'aspect-[1.91/1]', square: 'aspect-square', portrait: 'aspect-[4/5]' };

/** A gallery card: the template's preview (a muted looping clip for videos), name and summary. */
export function TemplateCard({ template }: { template: PromoTemplate }) {
  const preview = previewOf(template);
  const aspect = ASPECT[template.formats[0] ?? 'portrait'] ?? 'aspect-[4/5]';
  return (
    <li className="card card-link group flex flex-col overflow-hidden">
      <div className={`relative overflow-hidden border-b border-line bg-sunken ${aspect}`}>
        {preview?.video ? (
          <video src={preview.video} poster={preview.poster} muted loop playsInline autoPlay preload="none" className="absolute inset-0 size-full object-cover" aria-label={`${template.name} example`} />
        ) : preview ? (
          <img src={preview.poster} alt={`${template.name} example`} loading="lazy" className="absolute inset-0 size-full object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6 text-center font-display text-lg text-muted">{template.name}</div>
        )}
        {isVideoTemplate(template) && template.duration ? (
          <span className="absolute top-3 left-3 rounded-full bg-black/65 px-2.5 py-0.5 text-xs font-medium text-white">
            {template.duration[0]}–{template.duration[1]} s
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="card-title">
          <Link href={`/templates/${template.id}`} className="after:absolute after:inset-0 group-hover:text-accent-text focus-visible:outline-none">
            {template.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{template.summary}</p>
        <p className="mt-4 text-sm text-faint">
          {recipeName(template)} · {priceText(template)}
        </p>
      </div>
    </li>
  );
}
