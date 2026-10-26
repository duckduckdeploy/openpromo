import Link from 'next/link';
import type { PromoTemplate } from '@openpromo/shared';
import { isVideoTemplate, kindLayout, kindOf, previewOf, priceText, recipeName } from '@/content/templates';
import { PreviewVideo } from './preview-video';

/**
 * A gallery card: the template's example edge to edge, then its name, summary and price. Every card
 * in a grid has the same frame (set by the grid's kind); an example in another shape sits inside it.
 */
export function TemplateCard({ template }: { template: PromoTemplate }) {
  const preview = previewOf(template);
  const layout = kindLayout[kindOf(template)];
  const fit = template.formats[0] === layout.format ? 'object-cover' : 'object-contain';
  const media = `absolute inset-0 size-full ${fit}`;
  return (
    <li className="card card-link group flex flex-col overflow-hidden p-0">
      <div className={`relative overflow-hidden bg-sunken ${layout.aspect}`}>
        {preview?.video ? (
          <PreviewVideo src={preview.video} poster={preview.poster} label={`${template.name} example`} className={media} />
        ) : preview ? (
          <img src={preview.poster} alt={`${template.name} example`} loading="lazy" className={media} />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <span className="font-display text-lg text-muted">{template.name}</span>
            <span className="absolute bottom-4 text-xs text-faint">Example coming soon</span>
          </div>
        )}
        {isVideoTemplate(template) && template.duration ? (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-black/65 px-2 py-0.5 text-xs font-medium text-white">
            {template.duration[0]}–{template.duration[1]} s
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col border-t border-line p-3.5 sm:p-4">
        <h3 className="font-display text-base leading-snug font-semibold">
          <Link href={`/templates/${template.id}`} className="after:absolute after:inset-0 group-hover:text-accent-text focus-visible:outline-none">
            {template.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{template.summary}</p>
        <p className="mt-auto pt-3 text-xs text-faint">
          {recipeName(template)} · {priceText(template)}
        </p>
      </div>
    </li>
  );
}
