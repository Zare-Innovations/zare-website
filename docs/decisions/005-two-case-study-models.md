# ADR 005 — Two case study models, depth over quantity, honest gaps

**Date:** 2026-08-06
**Status:** Accepted
**Applies to:** `src/content/work.ts`, `/work`, `/work/[slug]`, and the homepage featured-work section

## Context

Zare sells two different things. It builds systems, and it embeds engineers
into other people's teams. The website has to prove both, to buyers who ask
different questions.

The default agency format — logo, screenshot, technology badges, marketing
paragraph — proves neither. It is also actively harmful here: it positions Zare
as an agency, which is the category the whole redesign is trying to escape.

## Decision 1 — Two case models, not one

`CaseStudy` is a discriminated union on `kind`.

**`kind: 'system'`** — Zare designed and built something.
Problem → System → Engineering decisions → Outcome.
Requires `problem`, `system[]`, `decisions[]`, `stack[]`.

**`kind: 'engagement'`** — Zare supplied engineers who worked inside the
client's organisation.
Situation → Pod shape → Integration → Continuity → Outcome.
Requires `situation`, `podShape`, `integration[]`.

### Why not one template

We tried the single template first. Applied to Pickrell it forces three
falsehoods:

- a "System" section, when Zare designed no system
- an "Architecture" section, when the architecture was the client's
- "Engineering decisions", when the decisions were made by the client's team

The only way to fill those sections is to invent them. The only way to avoid
inventing them is to leave a system-build page mostly empty, which reads as a
weak engagement rather than a strong one.

A three-developer pod running since January 2024 is *excellent* evidence. It is
just evidence of a different thing: continuity, integration, and retention. It
deserves a format that shows that, and duration is the field that carries it.

## Decision 2 — Detail pages are earned

`hasDetailPage()` gates both `generateStaticParams` and every link. A case is
published only when it carries the problem or situation plus at least one
outcome. Everything else appears in a compact reference list with no link.

Eighteen projects exist in the old data. Two are published as case studies.

This is not modesty. **A case study page with no engineering reasoning behind
it actively weakens the pages that have it.** A reader who opens three pages and
finds two thin ones discounts the third. Depth is not a nice-to-have here; it is
what makes the deep pages believable.

The eight website builds with empty challenge/solution/results fields in the old
data are the clearest example. They were listed as case studies. They contained
nothing. They are now one line in a reference list, which is what they are.

## Decision 3 — Unpublished detail stays a labelled gap

`decisions` may be empty. When it is, `DecisionList` renders a bordered,
labelled block saying the reasoning is being documented with the engineers who
made it.

It is never filled with plausible-sounding invention.

The temptation is real: "PostgreSQL was chosen because relational consistency
mattered more than horizontal write scaling" is a sentence anyone can write
about any project. It is also exactly the sentence a CTO who knows the domain
identifies as filler, and one identified filler sentence discredits every real
claim on the page.

The same rule governs unnamed clients (`Client` carries a `reason` when
`named: false`) and unverified numbers (`Outcome.verified: false` renders
dimmed and labelled). A visible gap is a trust signal. A smoothed-over gap is a
liability.

## Decision 4 — Context is mandatory on every number

`Outcome.context` is a required field.

```
"40% improvement"                                      // cannot be expressed
"40% improvement in search recall after
 rebuilding the indexing strategy"                     // the only option
```

A number without its basis is not evidence, and a grid of them reads as
marketing. Making the field required means the component can always render it,
so there is no code path that produces a bare figure.

## Decision 5 — Technology appears only inside decisions

`stack` exists only on `kind: 'system'`, and the detail template renders
technologies inside decision blocks. There is no component that renders a
technology strip, and no schema field that would feed one.

`React · Node · AWS` tells a reader nothing. *"PostgreSQL, because relational
consistency mattered more than write throughput, at the cost of a harder
sharding story later"* tells them how the team thinks. Only the second is
evidence.

## Consequences

- Adding a case means choosing a model first. That choice is the useful part.
- `/work` ships with two featured cases rather than three. Joveo is held in the
  reference list until its outcome figures clear client approval.
- The homepage cannot accidentally grow full case studies: it consumes
  `summary`, the first `outcome`, and the link. Depth lives on the detail page.

## Related

ADR 004 (no generic design system components) is the same principle applied to
components: name the thing for what it means, and refuse the abstraction that
would let it mean anything.
