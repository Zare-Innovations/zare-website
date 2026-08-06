import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { Eyebrow } from '@/components/typography/eyebrow';
import { MonoLabel } from '@/components/typography/mono-label';
import { FactBlock } from '@/components/data/fact-block';
import { Reveal } from '@/components/motion/reveal';
import { buildStack, vettingSteps, embedFacts } from '@/content/delivery';

/**
 * The delivery model, as a diagram rather than a paragraph.
 *
 * Answers the question a technical buyer asks silently: where does my code
 * live, and who can reach it. A diagram answers that faster than prose and
 * signals that the answer is settled rather than improvised.
 */
function DeliveryDiagram() {
  return (
    <div
      className="border border-[var(--rule-color)] p-6 md:p-9"
      role="img"
      aria-label="Delivery model: a Zare pod in Addis Ababa connects through access-controlled channels, governed by role-based permissions and an NDA, to the client's own cloud and repositories. All work product carries full IP assignment."
    >
      <svg viewBox="0 0 960 190" fill="none" className="h-auto w-full">
        <rect
          x="20"
          y="45"
          width="240"
          height="100"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.55"
        />
        <text x="140" y="80" textAnchor="middle" className="fill-current text-[10.5px] font-semibold [font-family:var(--font-mono)]">
          ZARE POD
        </text>
        <text x="140" y="100" textAnchor="middle" className="fill-current text-[10.5px] opacity-60 [font-family:var(--font-mono)]">
          ADDIS ABABA
        </text>
        <text x="140" y="120" textAnchor="middle" className="fill-current text-[10.5px] opacity-60 [font-family:var(--font-mono)]">
          ENGINEERS · CI/CD
        </text>

        <path d="M260 95 H 380" stroke="var(--color-accent)" strokeWidth="1.5" />
        <path d="M374 89 L 382 95 L 374 101" stroke="var(--color-accent)" strokeWidth="1.5" />

        <rect x="382" y="60" width="180" height="70" stroke="var(--color-accent)" strokeWidth="1.5" />
        <text x="472" y="90" textAnchor="middle" className="fill-current text-[10.5px] font-semibold [font-family:var(--font-mono)]">
          SECURE ACCESS
        </text>
        <text x="472" y="110" textAnchor="middle" className="fill-current text-[10.5px] opacity-60 [font-family:var(--font-mono)]">
          RBAC · NDA · YOUR PERMISSIONS
        </text>

        <path d="M562 95 H 680" stroke="var(--color-accent)" strokeWidth="1.5" />
        <path d="M674 89 L 682 95 L 674 101" stroke="var(--color-accent)" strokeWidth="1.5" />

        <rect x="682" y="45" width="258" height="100" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <text x="811" y="80" textAnchor="middle" className="fill-current text-[10.5px] font-semibold [font-family:var(--font-mono)]">
          YOUR INFRASTRUCTURE
        </text>
        <text x="811" y="100" textAnchor="middle" className="fill-current text-[10.5px] opacity-60 [font-family:var(--font-mono)]">
          YOUR CLOUD · YOUR REPOS
        </text>
        <text x="811" y="120" textAnchor="middle" className="fill-current text-[10.5px] opacity-60 [font-family:var(--font-mono)]">
          MONITORED PRODUCTION
        </text>

        <text x="480" y="175" textAnchor="middle" className="fill-current text-[10.5px] opacity-60 [font-family:var(--font-mono)]">
          ALL WORK PRODUCT: FULL IP ASSIGNMENT, IN EVERY CONTRACT
        </text>
      </svg>
    </div>
  );
}

/**
 * S5 — How we deliver.
 *
 * Two parallel tracks, in strict visual symmetry. A project buyer reads the
 * left; a team buyer reads the right. Neither has to scroll through the
 * other's answer, and the dual model reads as structure rather than length.
 *
 * The vetting pipeline is a compact band, not a full section. Eight steps is a
 * credibility signal that needs to be *seen*, not studied: nobody reads all
 * eight, and giving them full-height treatment would say otherwise.
 */
export function HowWeDeliver() {
  return (
    <Section tone="paper" label="How we deliver">
      <Eyebrow>How we deliver</Eyebrow>
      <Heading level={2} className="mt-6 max-w-[16em]">
        Two ways in. One standard of delivery.
      </Heading>

      <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-16">
        {/* ------------------------------------------------ build track */}
        <div className="flex flex-col gap-8">
          <div className="border-t-2 border-accent pt-5">
            <MonoLabel className="text-[var(--accent-text)]">
              Build with us
            </MonoLabel>
            <p className="mt-3 max-w-[30em] text-body-sm text-[var(--muted-color)]">
              A stack chosen for outcomes, not logos.
            </p>
          </div>

          <ol className="flex flex-col">
            {buildStack.map((layer, i) => (
              <Reveal
                key={layer.name}
                as="li"
                delay={i * 70}
                className="border-t border-[var(--rule-color)] py-6 first:border-t-0 first:pt-0"
              >
                <MonoLabel className="text-[var(--heading-color)]">
                  {layer.name}
                </MonoLabel>
                <p className="mt-2 text-body-sm text-[var(--muted-color)]">
                  {layer.description}
                </p>
                <ul className="mt-3 flex flex-col gap-1 font-mono text-caption">
                  {layer.technologies.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* ------------------------------------------------ embed track */}
        <div className="flex flex-col gap-8">
          <div className="border-t-2 border-accent pt-5">
            <MonoLabel className="text-[var(--accent-text)]">
              Embed with us
            </MonoLabel>
            <p className="mt-3 max-w-[30em] text-body-sm text-[var(--muted-color)]">
              Eight steps between an application and your team.
            </p>
          </div>

          <ol className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {vettingSteps.map((step) => (
              <li key={step.n} className="flex flex-col gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-accent font-mono text-[11px] text-[var(--accent-text)]">
                  {step.n}
                </span>
                <span className="font-display text-caption font-semibold leading-tight text-[var(--heading-color)]">
                  {step.label}
                </span>
              </li>
            ))}
          </ol>

          <div className="border-t border-[var(--rule-color)] pt-7">
            <FactBlock facts={embedFacts} />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <DeliveryDiagram />
      </div>
    </Section>
  );
}
