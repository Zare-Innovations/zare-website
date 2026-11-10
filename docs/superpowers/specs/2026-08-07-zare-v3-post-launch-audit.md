# Zare v3 — Post-Migration Audit

**Date:** 2026-08-07
**Audited:** production build at `16a77c4`, served and inspected route by route
**Method:** rendered HTML inspection, not source review. Counts below are measured.

---

## Summary

The site is architecturally sound and the argument is coherent. Two categories of
problem dominate:

1. **The homepage stops arguing before it asks.** Three of the eight approved
   sections were never built, including the closing CTA. A visitor who reads to
   the bottom has no conversion moment.
2. **There is not a single image anywhere on the site.** Zero `<img>` on the
   homepage, `/work`, every case study, `/contact` and `/careers`. Photography
   was identified as the one thing competitors structurally cannot copy and the
   defence against looking like every other dark-mode technical site. It is
   entirely absent, so the site currently *is* the generic outcome the strategy
   set out to avoid.

Nine Critical, eight Important, six Optional.

---

# CRITICAL

## C1 — The homepage has no closing call to action

**Issue.** The last conversion link is `All work →`, roughly 60% down the page.
Two full sections follow (How we deliver, How we work with your team) containing
zero CTAs, then the footer. Measured CTA order:

```
hero paths -> Build with Zare -> Build an embedded team
-> case links -> All work -> [nothing] -> footer
```

**Reasoning.** The reader most likely to convert is the one who read to the end.
That reader is handed a footer. Recovering requires scrolling back up or finding
the nav. This is the single largest conversion defect on the site.

**Recommendation.** Build the approved S8 Contact section as the homepage
closer: `What should we build together?`, the two pathway rows, the
one-business-day promise, and the three what-happens-next steps. The content and
components already exist on `/contact`; this is composition, not new work.

**Impact.** High. Direct effect on the only metric that matters.
**Effort.** 0.5 day.

## C2 — Three approved sections were never built

**Issue.** The approved architecture is eight sections. Seven render, and one of
those is missing half its content.

| Approved | Built |
|---|---|
| S1 Hero | yes |
| S2 Trust | yes |
| S3 Two paths | yes |
| S4 Work and results | yes |
| S5 How we deliver | yes |
| S6 Working with Zare (engagement **+ security**) | **security half missing** |
| S7 The people, and why they stay | **missing** |
| S8 Contact | **missing** |

**Reasoning.** This is a planning gap, and it is mine: M3 was scoped S2–S5, M6
was scoped "map + careers", and S6-security, S7 and S8 fell between the two.
The omissions are not cosmetic. Security and IP is the section that clears the
largest objection for a technical buyer, and the people section is the only
place the retention argument becomes concrete.

**Recommendation.** Build all three. Security content exists verbatim in
`docs/zare-website-v3`. The people section is content-blocked on named-engineer
consent and photography, so it can ship with leadership only and grow.

**Impact.** High. Two of the three answer top-three buyer objections.
**Effort.** 1.5 days total (security 0.5, people 0.5, contact 0.5).

## C3 — Zero images on the entire site

**Issue.** Measured `<img>` count: homepage 0, `/work` 0, both case studies 0,
`/contact` 0, `/careers` 0.

**Reasoning.** The strategy identified photography of real people in Addis Ababa
as the anti-imitation device, on the reasoning that Linear, Vercel and Stripe
structurally cannot show a team because their positioning depends on humans
being invisible, while Zare's product *is* people. Without it the site has
exactly the visual vocabulary it was supposed to differentiate from. It also
means the "real people, real place" claim is made only in prose.

**Recommendation.** Team photography in the people section and as a full-bleed
band; founder and leadership portraits; case
study screenshots where cleared. Where an asset does not exist, the labelled
placeholder pattern already built into `PersonCard` and `PlaceholderMat` should
be used rather than stock.

**Impact.** High, and irreplaceable by any other change.
**Effort.** 1 day of implementation. Blocked on assets, which is the real cost.

## C4 — The 404 page is unstyled

**Issue.** `/does-not-exist` returns the default Next error page: no header, no
footer, no design tokens. Verified: no site chrome, no design system classes.

**Reasoning.** Every broken inbound link, every stale search result and every
mistyped URL drops the visitor out of the brand entirely, onto a page that looks
like a crash. For a company selling engineering reliability this is a poor place
to be careless.

**Recommendation.** A `not-found.tsx` in `(site)` using Header, Footer and the
design system, with links to `/work` and `/contact`.

**Impact.** Medium-high on trust, low on volume.
**Effort.** 0.25 day.

## C6 — The trust strip has no visual weight

**Issue.** Twelve client names render as plain text in a three-column list. No
logos, no Clutch link, no separation from surrounding prose.

**Reasoning.** This section clears the "has anyone real hired them" disqualifier
and is the highest-value-per-pixel real estate on the page. It currently reads
as a list of words. The engagement labels are good and were the right decision;
they are just not doing visual work.

**Recommendation.** Logos where permission is cleared, bordered mono cells at
full contrast where not, the Clutch badge promoted and linked, and enough
vertical separation that the band reads as a distinct proof moment.

**Impact.** High.
**Effort.** 0.5 day. Partly blocked on logo permissions.

## C7 — Contact form is non-functional in production

**Issue.** `RESEND_API_KEY` is unset, so every submission returns "temporarily
unavailable" with the direct email address.

**Reasoning.** Correct and deliberate behaviour, but it means the site currently
cannot convert through its primary path. Listed here because it is Critical by
consequence, not by defect.

**Recommendation.** Rotate the key, set `RESEND_API_KEY` and
`CONTACT_FROM_EMAIL`. Blocked externally.

**Impact.** Total, on the primary conversion path.
**Effort.** Minutes, once rotated.

## C8 — No analytics

**Issue.** Plausible is approved but not integrated.

**Reasoning.** The redesign shipped without a baseline, so its effect cannot be
measured. This is unrecoverable retroactively.

**Recommendation.** Integrate as soon as the domain exists, and treat the first
30 days as the new baseline rather than a comparison.

**Impact.** No user-facing effect. High organisational cost.
**Effort.** 0.25 day. Blocked externally.

## C9 — Banned vocabulary reaches production through job data

**Issue.** `/careers` renders "robust" from a live job description authored in
the admin panel.

**Reasoning.** The banned-word rule is enforceable in CI on authored copy but
never on API content. One leak is minor; the mechanism is the problem.

**Recommendation.** An editorial note in the admin job form, plus a CI check
scoped to `src/content/` and `src/app/(site)/` so the rule is at least
guaranteed where it can be.

**Impact.** Low individually, compounding over time.
**Effort.** 0.25 day.

---

# IMPORTANT

## I1 — The hero and section three present the same choice twice

**Issue.** Hero cards read `Technology & AI / Software and AI, engineered end to
end` linking to `/contact?pathway=project`. Two screens later S3 uses the
identical headline and `Build with Zare` to the same URL. Measured: "Technology
& AI" x2, "Embedded Teams" x2, "Technology Talent" x2, "Business Operations" x2.

**Reasoning.** Repeating a decision does not reinforce it, it makes the second
instance feel like the site lost its place. The hero cards should route; S3
should deepen.

**Recommendation.** Keep the fork in the hero. Change S3's job from "here are
the two paths" to "here is what each one includes", leading with capabilities
and the commercial highlights rather than restating the names and headlines.

**Impact.** Medium-high on perceived tightness.
**Effort.** 0.5 day, copy and layout only.

## I2 — The eight vetting steps appear twice

**Issue.** Rendered on the homepage in How we deliver and again on `/careers`.

**Reasoning.** Defensible, since the audiences differ and the framing differs.
But a visitor who browses both sees the same eight chips twice, which cheapens
them.

**Recommendation.** Keep both, differentiate the treatment: compact horizontal
band on the homepage for the client, expanded with what each step measures on
`/careers` for the candidate.

**Impact.** Medium.
**Effort.** 0.25 day.

## I3 — `/work` is dominated by the list, not the proof

**Issue.** Two featured cases, then eleven reference rows.

**Reasoning.** The reference list is roughly five times the vertical space of
the evidence. A visitor scanning `/work` sees mostly a list of things without
stories, which inverts the depth-over-quantity intent.

**Recommendation.** Give the two featured cases substantially more weight,
collapse the reference list into a denser table, and consider a `<details>`
disclosure so it is available without dominating.

**Impact.** Medium-high on the page most likely to be linked directly.
**Effort.** 0.5 day.

## I4 — Repetition dulls the strongest phrases

**Issue.** Measured on the homepage: "Addis Ababa" x8, "engineering centre" x4,
"US contracts" x2, "Dedicated placements" x2, "First vetted candidate" x2.

**Reasoning.** "Addis Ababa" is a differentiator the first three times and
wallpaper by the eighth. The same applies to the retention phrasing.

**Recommendation.** Copy pass reducing "Addis Ababa" to roughly three deliberate
placements: the hero, the working model, and the footer.

**Impact.** Medium.
**Effort.** 0.25 day.

## I5 — No commercial terms anywhere

**Issue.** Trial, notice period, replacement policy and engagement shape appear
only as the three highlight lines in S3.

**Reasoning.** Identified in strategy as the question competitors dodge and
therefore the cheapest differentiator. Currently "Risk-free trial on every
placement" has no terms attached, which is weaker than either stating them or
not claiming it.

**Recommendation.** Fold into the S6 Working with Zare section once the terms
are confirmed. Content-blocked.

**Impact.** Medium-high for the embedded-teams buyer.
**Effort.** 0.5 day. Blocked externally.

## I6 — No measure scale

**Issue.** Ten distinct arbitrary line lengths in use: `max-w-[14em]` through
`[42em]`, 40 instances total across 10 values.

**Reasoning.** Every one was chosen locally. The result is that no two prose
blocks share a measure, which reads as slight misalignment rather than an
obvious error, and it makes the design system less useful to the next person.

**Recommendation.** Three tokens: `--measure-tight` 34em, `--measure` 38em,
`--measure-wide` 42em for display headings. Replace all 40.

**Impact.** Medium on visual rhythm, high on maintainability.
**Effort.** 0.5 day.

## I7 — Header offset is a magic number

**Issue.** `pt-[76px] md:pt-24` repeated in four page files, matching the header
height by hand.

**Reasoning.** Changing header height silently breaks four pages.

**Recommendation.** `--header-h` token, consumed by both the header and the
offset.

**Impact.** Low visually, medium structurally.
**Effort.** 0.25 day.

## I8 — Motion is thin and inconsistent

**Issue.** Full inventory: 10 `transition-colors`, 3 `transition-transform`,
one `duration-500`, one `duration-300`, one always-on blink, and 12 `<Reveal>`
usages. The design system defines `--duration-feedback/reveal/section` and
`--ease-enter/exit`; almost nothing uses them.

**Reasoning.** The site is not over-animated, which was the risk we guarded
against, but it has drifted to under-designed. Two hard-coded durations that
match neither token mean hover feedback differs between components.

**Recommendation.** Route every transition through the tokens. No new motion.

**Impact.** Medium on perceived quality.
**Effort.** 0.25 day.

---

# OPTIONAL

## O1 — Hero H1 carries no information
`The next leap starts here.` was flagged in strategy as emotionally right and
strategically empty. With no imagery behind it, it now carries more weight than
it can hold. Worth testing an alternative that states the structural advantage.
**Effort.** 0.25 day plus founder approval.

## O2 — Initial JS is 3% over budget
196 KB gzipped against a 190 KB budget on every site route. Unchanged after
removing eight packages, so it is the Next 16 and React 19 floor rather than
application code. **Recommendation:** revise the budget to 200 KB rather than
chase it. **Effort.** none.

## O3 — Footer ticker is the only always-on motion
`animate-[blink_1.8s_steps(1)_infinite]` runs forever. It is a deliberate
founder easter egg, so this is a note rather than a recommendation. It does have
a reduced-motion guard.

## O4 — Two case studies is thin for a work index
Correct given the approval gates, but worth revisiting once Joveo clears.
**Effort.** 0.25 day when unblocked.

## O5 — No FAQ
Objection handling plus `FAQPage` schema, one of the last high-yield SEO
surfaces available. **Effort.** 0.5 day plus content.

## O6 — `/careers` has no filtering
The old page had debounced search across title, description and skills. The new
one lists four roles unfiltered. Fine at four; not at twenty.
**Effort.** 0.5 day when the count justifies it.

---

# What is already correct

Recorded so it is not undone in refinement.

- Heading outlines: one `h1` per page, **zero level skips** across all five routes.
- Zero banned words in authored copy.
- Every page fully readable with JavaScript disabled, including the hero and the contact form.
- CSS 12 KB gzipped on site routes, down from 46.
- Structured data restored: Organization, WebSite, ItemList, two LocalBusiness, plus CreativeWork and BreadcrumbList per case study and JobPosting on job detail.
- All redirects verified 308. Sitemap 9 URLs including four job pages that were never listed before.
- The honest-gap pattern (dimmed `[—]`, "Pending engineering review", `pendingClients`) is working and should be protected.

---

# Suggested order

Not a decision, a proposal.

**First, unblocked and highest value:** C1 contact section, C2 the three missing
sections, C4 the 404 page. Roughly 2.25 days and it completes the argument.

**Second, once assets exist:** C3 photography, C6 trust strip.

**Third, refinement:** I1 hero/S3 overlap, I3 `/work` weight, I4 repetition,
I6 measure scale, I7 header token, I8 motion tokens. Roughly 2.5 days.

**Externally blocked and not on this list:** C7 Resend, C8 Plausible, I5
commercial terms.
