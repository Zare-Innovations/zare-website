import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { Eyebrow } from '@/components/typography/eyebrow';
import { MonoLabel } from '@/components/typography/mono-label';
import { FactBlock } from '@/components/data/fact-block';
import { Reveal } from '@/components/motion/reveal';
import { clients, verifiedFacts } from '@/content/clients';

/**
 * S2 — Trust.
 *
 * Clears the "has anyone real hired them" disqualifier within one scroll.
 *
 * Deliberately the least animated section on the page: one entrance reveal and
 * nothing else. Motion on credibility content reads as salesmanship; stillness
 * reads as fact. Full contrast throughout, because a client name at reduced
 * opacity says "we are not sure we are allowed to show this".
 */
export function TrustStrip() {
  return (
    <Section tone="paper" label="Clients" compact>
      <div className="grid gap-14 lg:grid-cols-[2.1fr_1fr] lg:gap-16">
        <div>
          {/* The eyebrow is a span, so without this the section has no entry
              in the document outline and the page skips h1 -> h3. */}
          <Heading level={2} size="heading" className="sr-only">
            Clients
          </Heading>
          <Eyebrow>Teams and software delivered for</Eyebrow>

          <Reveal>
            <ul className="mt-9 grid gap-x-10 gap-y-7 sm:grid-cols-2 xl:grid-cols-3">
              {clients.map((client) => (
                <li key={client.name} className="flex flex-col gap-1">
                  <span className="font-display text-body font-semibold text-[var(--heading-color)]">
                    {client.name}
                  </span>
                  <MonoLabel size="caption" className="text-[var(--accent-text)]">
                    {client.engagement}
                  </MonoLabel>
                  <MonoLabel muted size="caption">
                    {client.industry}
                    {client.duration ? ` · ${client.duration}` : ''}
                  </MonoLabel>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="border-t border-[var(--rule-color)] pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
          <FactBlock
            title="Verified"
            facts={verifiedFacts.map((f) => f.fact)}
          />
        </div>
      </div>
    </Section>
  );
}
