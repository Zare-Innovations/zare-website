# ADR 004 — No generic design system components

**Date:** 2026-08-06
**Status:** Accepted
**Applies to:** everything under `src/components/`

## Context

Design systems drift. The usual path is well worn: a `Card` appears because two
sections look similar, then `variant="premium"`, then `variant="feature"`, then
a `ContentBox` because `Card` no longer fits, and eighteen months later the
repository contains a mediocre private clone of a UI library nobody chose.

The drift is not caused by bad engineers. It is caused by naming components
after **how they look** instead of **what they mean**. Once a component is named
for its appearance, every new appearance becomes a prop, and the props
accumulate faster than the meanings do.

Zare's site is a proof surface. Its components represent business objects: a
piece of delivered work, a person who built it, a verified fact, an attributed
quote. Those are stable concepts. "Card" is not.

## Decision

**Components are named for the business meaning they carry, never for their
visual form.**

Concretely:

1. **No generic container components.** No `Card`, `Box`, `Panel`, `Wrapper`,
   `ContentBlock`, `FeatureCard`, `PremiumCard`.
2. **Shared visual treatment is shared as styles, not as a component.**
   `src/components/content/surface.ts` exports class strings. It exports no
   component and is not a public API.
3. **No appearance props.** No `variant="premium"`, no `size="hero"`, no
   `emphasis`. Where a component genuinely has two modes, the prop names the
   *situation* (`compact`, `bleed`) rather than the *look*.
4. **No component that only renames an HTML element.** `<Body>` wrapping `<p>`
   and `<Grid>` wrapping `grid grid-cols-*` add an import, a props API, and an
   indirection in exchange for nothing. Use the utility.
5. **Typography components exist only where the brand has an opinion.**
   `Eyebrow` and `MonoLabel` are components because they encode rules (the
   26px accent rule; mono is for facts and never for prose). A paragraph
   encodes no rule, so it is a class.

### Applied in M1

| Built | Rejected | Why |
|---|---|---|
| `CaseStudyCard`, `PersonCard` | `Card` | They mean something |
| `FactBlock`, `Metric`, `QuoteBlock` | `InfoBox` | They mean something |
| `Eyebrow`, `MonoLabel`, `Heading` | `Text`, `Body` | They encode rules |
| `Section`, `Container` | `Grid`, `Stack`, `Flex` | Layout is CSS |
| `surface.ts` class strings | `<Surface>` | Style, not structure |

## Consequences

**Accepted costs.** Some duplication between components that look alike. Two
cards may repeat a border declaration. This is cheaper than the abstraction that
would remove it, because the duplication is visible and local while a leaky
abstraction is neither.

**A test for new components.** Before adding one, complete this sentence: *"This
component represents ___ in Zare's business."* If the blank can only be filled
with a shape ("a bordered box", "a two-column layout"), it is not a component.
It is a class name.

**Where a third similar card appears**, it gets its own name and imports the
same surface strings. It does not become `Card` with a variant.

## Related

Type-level enforcement of the same philosophy: `QuoteBlock` requires
`attribution` and `role`, so an anonymous testimonial fails typecheck rather
than failing review. `Metric.value` is a string, not a number, because ranges
and comparators are part of the fact. Editorial rules that can be made into
compile errors should be.
