import { AGENT_CLIENTS, AGENT_SKILLS } from '@openpromo/shared';
import { Plug } from 'lucide-react';
import { setupPrompt } from '@/content/snippets';
import { ButtonLink } from './button';
import { CopyPromptButton } from './copy-prompt-button';
import { SectionHeader } from './section';

type Line = { kind: 'prompt' | 'call' | 'out' | 'ok' | 'muted' | 'blank'; text: string };

// An example session for the fictional Crumb & Co bakery. Figures are illustrative.
const session: Line[] = [
  { kind: 'prompt', text: '› make a reel about our weekend offer for crumbandco.example' },
  { kind: 'blank', text: '' },
  { kind: 'call', text: '⏺ openpromo.get_brand()' },
  { kind: 'muted', text: '  free · brand ready · 6 selling points · offer: 20% off a first subscription' },
  { kind: 'blank', text: '' },
  { kind: 'call', text: '⏺ openpromo.create_creation(type: "reel", brief: "Weekend offer: 20% off")' },
  { kind: 'out', text: '  6 scenes · 27 s · hook: "Fresh sourdough, 20% off this weekend"' },
  { kind: 'muted', text: '  checks: no errors · spent $0.04' },
  { kind: 'blank', text: '' },
  { kind: 'out', text: '  Rendering will cost about $0.14 (voice 6 scenes, music). Go ahead?' },
  { kind: 'prompt', text: '› yes' },
  { kind: 'call', text: '⏺ openpromo.render_creation(creation_id: "…")' },
  { kind: 'ok', text: '✓ Reel ready: 1080×1920 MP4, poster and SRT. Spent $0.18 in total.' },
];

const tone: Record<Line['kind'], string> = {
  prompt: 'text-code-fg font-semibold',
  call: 'text-[#ffad99]',
  out: 'text-code-fg',
  ok: 'text-[#4ade94]',
  muted: 'text-code-muted',
  blank: '',
};

export function AgentFold() {
  return (
    <section aria-labelledby="agents-title" className="band-night relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_26rem_at_50%_0%,color-mix(in_srgb,var(--color-accent)_30%,transparent),transparent_70%),radial-gradient(36rem_22rem_at_100%_100%,color-mix(in_srgb,var(--color-orange)_22%,transparent),transparent_70%)]" aria-hidden="true" />
      <div className="container-page relative py-20 md:py-28 xl:py-32">
      <SectionHeader
        align="center"
        eyebrow="Agents and MCP"
        id="agents-title"
        title="Marketing MCP server for your agent"
        lede="Connect Claude, ChatGPT or Cursor in two minutes, then use the ready-made skills or just ask. Agents work from the same brand profile and the same spending limit as you."
      />

      <figure className="mx-auto mt-14 max-w-4xl md:mt-16">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-hard-lg ring-1 ring-white/5 backdrop-blur">
          <div className="flex items-center justify-between border-b border-code-line px-5 py-3 text-xs text-code-muted">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-code-line" />
              <span className="size-2.5 rounded-full bg-code-line" />
              <span className="size-2.5 rounded-full bg-code-line" />
            </span>
            <span>agent · openpromo mcp</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[0.75rem] leading-relaxed sm:p-7 sm:text-[0.875rem]" role="img" aria-label="Example agent session: the agent reads the brand profile, writes a reel about a weekend offer, asks before rendering and renders it for 18 cents in total.">
            {session.map((line, index) => (
              <span key={index} className={`block ${line.kind === 'out' ? '' : 'whitespace-pre-wrap break-words'} ${tone[line.kind]}`}>
                {line.text || ' '}
              </span>
            ))}
          </pre>
        </div>
        <figcaption className="mt-4 text-center text-sm text-faint">Example session for a fictional bakery, with illustrative figures.</figcaption>
      </figure>

      <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
        {AGENT_SKILLS.map((skill) => (
          <li key={skill.name} className="card card-link p-5">
            <p className="font-mono text-sm font-semibold text-orange-text">/{skill.name}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{skill.summary}</p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-10 max-w-2xl text-center">
        <ul className="flex flex-wrap justify-center gap-2">
          {AGENT_CLIENTS.map((name) => (
            <li key={name} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium">
              {name}
            </li>
          ))}
        </ul>
        <p className="mt-5 inline-flex flex-wrap items-center justify-center gap-1.5 text-[0.9375rem] text-muted">
          <Plug className="size-4" aria-hidden="true" />
          And any client that connects to an MCP server
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
          <CopyPromptButton text={setupPrompt} />
          <ButtonLink href="/docs/mcp" variant="secondary" size="lg">
            Setup guide
          </ButtonLink>
        </div>
        <p className="mt-4 text-sm text-faint">Paste the prompt into your agent. It connects itself and checks the connection without spending anything.</p>
      </div>
      </div>
    </section>
  );
}
