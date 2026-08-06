import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/typography/eyebrow';

interface FactBlockProps {
  /** Short heading for the group, e.g. "Verified". */
  title?: string;
  /**
   * Each entry is a single checkable fact: an entity name, a location, a
   * rating, a jurisdiction. Facts are structurally costly to fake, which is
   * why they persuade. Claims do not belong here.
   */
  facts: readonly string[];
  className?: string;
}

/**
 * A checked list of verifiable facts. Used for the trust strip's credential
 * column and anywhere a claim needs to be stated as a record rather than a
 * sentence.
 */
export function FactBlock({ title, facts, className }: FactBlockProps) {
  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      {title ? <Eyebrow className="mb-1.5">{title}</Eyebrow> : null}
      <ul className="flex flex-col gap-2.5">
        {facts.map((fact) => (
          <li
            key={fact}
            className="flex items-baseline gap-2.5 font-mono text-caption tabular-nums"
          >
            <span
              aria-hidden="true"
              className="text-[var(--accent-text,currentColor)]"
            >
              ✓
            </span>
            <span>{fact}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
