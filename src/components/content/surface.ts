/**
 * Shared card surface styling.
 *
 * Deliberately NOT a component. There is no `<Card>` in this system: a card is
 * a visual similarity, not a business concept, and exporting one invites
 * `<Card variant="premium">` six months from now. Components that represent
 * something real, such as CaseStudyCard and PersonCard, import these strings
 * and own their own structure.
 *
 * See docs/decisions/004-no-generic-design-system-components.md
 */

/** Bordered panel that inherits the surrounding tone's hairline colour. */
export const panelSurface =
  'border border-[var(--rule-color)] bg-transparent';

/** Adds the hover affordance used by cards that are entirely one link. */
export const linkSurface =
  'transition-colors duration-150 hover:border-accent focus-visible:border-accent';
