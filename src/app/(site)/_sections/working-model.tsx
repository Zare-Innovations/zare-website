import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { Eyebrow } from '@/components/typography/eyebrow';
import { MonoLabel } from '@/components/typography/mono-label';
import { FactBlock } from '@/components/data/fact-block';
import { Reveal } from '@/components/motion/reveal';
import {
  ADDIS_UTC_OFFSET,
  clientRegions,
  communicationModel,
  OVERLAP_POLICY_PENDING,
} from '@/content/working-model';

/**
 * The offset band.
 *
 * A horizontal scale anchored on Addis, with each client region placed by how
 * far behind it sits. This is the whole point of the section: a reader finds
 * their own region and gets a number, which a world map cannot give them.
 *
 * Rendered as a definition list rather than a graphic so it survives with no
 * CSS, reads correctly to a screen reader, and needs no image.
 */
/** "Same time" reads better than "0h", and "−1h / −0h" reads like a typo. */
function formatOffset(std: number, dst?: number): string {
  const one = (h: number) => (h === 0 ? 'same time' : `−${h}h`);
  if (dst === undefined || dst === std) {
    return std === 0 ? 'Same time' : one(std);
  }
  return `${one(std)} / ${one(dst)}`;
}

function OffsetBand() {
  const max = Math.max(...clientRegions.map((r) => r.hoursBehind));

  return (
    <dl className="flex flex-col">
      {clientRegions.map((r, i) => {
        // Bar length is proportional to distance from Addis. Purely
        // illustrative; the number beside it is the actual information.
        const width = max === 0 ? 0 : (r.hoursBehind / max) * 100;

        return (
          <Reveal
            key={r.region}
            delay={i * 60}
            className="grid items-center gap-2 border-t border-[var(--rule-color)] py-5 sm:grid-cols-[150px_1fr_auto] sm:gap-6"
          >
            <dt className="font-display text-body font-semibold text-[var(--heading-color)]">
              {r.region}
            </dt>

            <dd className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px bg-accent"
                style={{ width: `${Math.max(width, 2)}%` }}
              />
              <MonoLabel muted size="caption" className="whitespace-nowrap">
                {r.evidence}
              </MonoLabel>
            </dd>

            <dd className="font-mono text-body tabular-nums text-[var(--accent-text)] sm:text-right">
              {formatOffset(r.hoursBehind, r.hoursBehindDst)}
            </dd>
          </Reveal>
        );
      })}
    </dl>
  );
}

/**
 * How we work with your team.
 *
 * Replaces what earlier drafts called the "global presence" section. Country
 * counts and arcs on a globe are a flex; this answers the operational question
 * a buyer actually has before they can picture working with a team abroad.
 */
export function WorkingModel() {
  return (
    <Section tone="mist" id="working-model" label="How we work with your team">
      <Eyebrow>Working together</Eyebrow>
      <Heading level={2} className="mt-6 max-w-[15em]">
        One engineering centre. Your working day.
      </Heading>

      <p className="mt-6 max-w-[38em] text-body text-[var(--muted-color)]">
        Our engineers work from one place, Addis Ababa, at UTC{ADDIS_UTC_OFFSET}
        . Ethiopia does not observe daylight saving, so the distance between
        your team and ours only changes when your clocks change, never when
        ours do.
      </p>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <MonoLabel muted>Hours behind Addis · standard / daylight saving</MonoLabel>
          <div className="mt-6">
            <OffsetBand />
          </div>

          {OVERLAP_POLICY_PENDING ? (
            <div className="mt-8 border border-dashed border-[var(--rule-color)] p-6">
              <MonoLabel className="text-[var(--accent-text)]">
                Overlap commitment · pending
              </MonoLabel>
              <p className="mt-3 max-w-[40em] text-body-sm text-[var(--muted-color)]">
                How many hours of your working day our engineers cover is a
                commitment, not a calculation, and we will publish it when it is
                agreed rather than estimate it here. Ask us and you will get the
                real answer for your timezone.
              </p>
            </div>
          ) : null}
        </div>

        <div className="border-t border-[var(--rule-color)] pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
          <FactBlock title="How the work happens" facts={communicationModel} />

          <p className="mt-8 max-w-[30em] text-body-sm text-[var(--muted-color)]">
            An embedded engineer is reachable the way your own team is
            reachable. There is no account manager between you and the person
            writing the code.
          </p>
        </div>
      </div>
    </Section>
  );
}
