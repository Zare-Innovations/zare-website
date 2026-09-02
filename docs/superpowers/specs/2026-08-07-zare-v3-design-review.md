# Zare v3 — Design Review

**Date:** 2026-08-07 · **Build:** `16a77c4` · **Method:** route-by-route inspection of rendered production HTML
**Lens:** a CTO or founder arriving for the first time, with a real need and twenty minutes
**Supersedes:** `2026-08-07-zare-v3-post-launch-audit.md`, which this re-cuts by review area and scores

---

# 1. BUSINESS POSITIONING

## Critical

### P-C1 · Two of the three sections that carry the positioning were never built
**Location:** `src/app/(site)/page.tsx:43-48`
**Current:** The homepage renders six sections. The approved architecture is eight.

| Approved | Built |
|---|---|
| S6 Working with Zare (engagement **+ security**) | security half absent |
| S7 The people, and why they stay | absent |
| S8 Contact | absent |

**Why it matters:** The positioning rests on three claims: US contractual safety, engineering depth, and retention. Security and IP is where the first is proven. The people section is the only place the third becomes concrete rather than asserted. Both are missing, so two thirds of the argument is stated in prose and never evidenced.

This is a planning gap and it is mine. M3 was scoped S2–S5, M6 was scoped "map and careers", and these fell between the two without being flagged.

**Recommend:** Build both. Security content exists verbatim in `docs/zare-website-v3`. The people section ships with leadership only until engineer consent lands.
**Impact:** High. **Effort:** 1 day.

## Important

### P-I1 · The hero and section three present the identical choice twice
**Location:** `_sections/hero.tsx:96-131` and `_sections/two-paths.tsx:43-108`
**Current:** Hero cards read `Technology & AI` / `Software and AI, engineered end to end` linking to `/contact?pathway=project`. Two screens later S3 uses the same headline and `Build with Zare` to the same URL. Measured on one page: "Technology & AI" ×2, "Embedded Teams" ×2, "Technology Talent" ×2, "Business Operations" ×2.
**Why it matters:** Repeating a decision does not reinforce it. The second instance reads as the site having lost its place, which undercuts the precision the whole design is arguing for.
**Recommend:** Hero routes, S3 deepens. Change S3 from "here are the two paths" to "here is what each includes", leading with capabilities and commercial terms rather than restating names.
**Impact:** Medium-high. **Effort:** 0.5 day.

### P-I2 · Repetition dulls the strongest phrases
**Location:** homepage, all sections
**Current:** "Addis Ababa" ×8, "engineering centre" ×4, "US contracts" ×2, "Dedicated placements" ×2.
**Why it matters:** "Addis Ababa" is a differentiator the first three times and wallpaper by the eighth.
**Recommend:** Reduce to three deliberate placements: hero, working model, footer.
**Impact:** Medium. **Effort:** 0.25 day.

### P-I3 · No commercial terms anywhere
**Location:** `content/services.ts:71-75`
**Current:** "Risk-free trial on every placement" appears as a highlight line with no terms. Notice period, replacement policy and trial duration appear nowhere.
**Why it matters:** Identified in strategy as the question competitors dodge, and therefore the cheapest available differentiator. An unqualified "risk-free" is weaker than either stating the terms or not claiming it.
**Recommend:** Fold into S6 once terms are confirmed. Content-blocked.
**Impact:** Medium-high for the embedded-teams buyer. **Effort:** 0.5 day.

## Polish

### P-P1 · Hero H1 carries no information
**Location:** `_sections/hero.tsx:75-80` · `The next leap starts here.`
Flagged in strategy as emotionally right and strategically empty. It survives because the eyebrow and sub-line carry the specificity, and the sub-line does that well: 63 words above the fold that name software, AI, engineers, embedded teams, US contracts and Addis. Worth testing an alternative, not urgent.
**Effort:** 0.25 day plus founder approval.

**Positioning verdict:** The argument itself is genuinely differentiated and no competitor category can make it. It is under-evidenced, not unclear.

---

# 2. USER JOURNEY AND CONVERSION FLOW

## Critical

### J-C1 · The homepage has no closing call to action
**Location:** `src/app/(site)/page.tsx:47-48`
**Current:** Measured CTA order on the homepage:
```
hero paths → Build with Zare → Build an embedded team
→ two case links → All work → [nothing] → footer
```
`All work →` sits roughly 60% down. Two full sections follow (How we deliver, How we work with your team) with zero conversion links.
**Why it matters:** The reader most likely to convert is the one who reached the end. That reader is handed a footer. Recovering means scrolling back up or hunting the nav. This is the largest single conversion defect on the site.
**Recommend:** Build S8 as the homepage closer. Content and components already exist on `/contact`; this is composition.
**Impact:** High, directly on the only metric that matters. **Effort:** 0.5 day.

### J-C2 · The contact form cannot send
**Location:** `src/app/(site)/contact/actions.ts:118-129`
**Current:** `RESEND_API_KEY` unset, so every submission returns "temporarily unavailable" plus the direct email address.
**Why it matters:** The primary conversion path is closed. The behaviour is correct and deliberate, but the consequence is total.
**Recommend:** Rotate the key, set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`. **Blocked externally.**
**Impact:** Total. **Effort:** minutes once rotated.

### J-C3 · No analytics
**Current:** Plausible approved, not integrated. The redesign shipped with no baseline.
**Why it matters:** Unrecoverable retroactively. There is now no way to prove the redesign worked.
**Recommend:** Integrate when the domain exists; treat the first 30 days as a new baseline rather than a comparison. **Blocked externally.**
**Impact:** No user effect, high organisational cost. **Effort:** 0.25 day.

## Important

### J-I1 · The primary CTA probably sits below the fold
**Location:** `_sections/hero.tsx:36` and `:83`
**Current:** Hero is `min-h-[100svh]` with `pt-[176px]` desktop, copy centred in a `flex-1` block, and the two path cards appended after it with `mt-10`. On a 1440×800 laptop the cards are likely cut off.
**Why it matters:** Those cards are the hero's entire purpose. We deliberately replaced a generic button pair with them because self-identification is the most important interaction on the site. If they are below the fold that decision is undone.
**Recommend:** Verify at 1440×800 and 1366×768. Reduce top padding, tighten the centred block's vertical gap, or drop hero to `min-h-[88svh]` so the cards are guaranteed visible.
**Impact:** High. **Effort:** 0.25 day.

### J-I2 · `/work` is dominated by the list, not the proof
**Location:** `src/app/(site)/work/page.tsx:55-90`
**Current:** Two featured cases, then eleven reference rows. Measured: the reference list is roughly five times the vertical space of the evidence.
**Why it matters:** `/work` is the page a referred visitor is most likely to land on directly. They currently see mostly a list of things with no stories, which inverts the depth-over-quantity intent.
**Recommend:** Give the two featured cases substantially more weight; collapse the reference list into a denser table or a `<details>` disclosure.
**Impact:** Medium-high. **Effort:** 0.5 day.

### J-I3 · The eight vetting steps appear twice
**Location:** `_sections/how-we-deliver.tsx:143-158` and `careers/page.tsx:96-108`
**Current:** Same eight chips on the homepage and `/careers`.
**Why it matters:** Defensible, since the audiences and framing differ, but a visitor who browses both sees them twice and they cheapen.
**Recommend:** Keep both, differentiate: compact band for the client, expanded with what each step measures for the candidate.
**Impact:** Medium. **Effort:** 0.25 day.

## Polish

### J-P1 · `/careers` has no filtering
The retired page had debounced search across title, description and skills. The new one lists four roles unfiltered. Fine at four, not at twenty.
**Effort:** 0.5 day when the count justifies it.

**Journey verdict:** Landing → understanding → proof is well sequenced and the navigation is clear. Trust → conversion breaks down completely: the argument ends, then nothing happens.

---

# 3. VISUAL AND UX QUALITY

## Critical

### V-C1 · There is not one image on the entire site
**Location:** every route
**Current:** Measured `<img>` count — homepage **0**, `/work` **0**, both case studies **0**, `/contact` **0**, `/careers` **0**.
**Why it matters:** The strategy identified photography of real people in Addis Ababa as the one thing Linear, Vercel and Stripe structurally cannot copy, because their positioning depends on humans being invisible while Zare's product *is* people. It is entirely absent, so the site has exactly the visual vocabulary it was built to differentiate from. It also means "real people, real place" is claimed only in prose.

No amount of spacing, typography or motion refinement substitutes for this.

**Recommend:** Team photography as a full-bleed band and in the people section; founder and leadership portraits; the LitPulse architecture diagram; case screenshots where cleared. Where an asset does not exist, use the labelled placeholder already built into `PersonCard` and `PlaceholderMat` rather than stock.
**Impact:** Highest of any visual change. **Effort:** 1 day implementation. The real cost is asset lead time.

### V-C2 · The trust strip has no visual weight
**Location:** `_sections/trust-strip.tsx:29-48`
**Current:** Twelve client names as plain text in a three-column list. No logos, Clutch rating unlinked, little separation from surrounding prose.
**Why it matters:** This section clears the "has anyone real hired them" disqualifier and is the highest-value-per-pixel real estate on the page. It currently reads as a list of words. The engagement labels were the right decision and are good; they are just not doing visual work.
**Recommend:** Logos where permission is cleared, full-contrast bordered mono cells where not, Clutch badge promoted and linked, more vertical separation so it reads as a distinct proof moment.
**Impact:** High. **Effort:** 0.5 day, partly blocked on permissions.

### V-C3 · The 404 page is unstyled
**Location:** no `not-found.tsx` in `(site)`
**Current:** Default Next error page. Verified: no site chrome, no design system classes.
**Why it matters:** Every broken inbound link, stale search result and mistyped URL drops the visitor out of the brand onto something that looks like a crash. Careless in a way that undercuts an engineering-reliability pitch.
**Recommend:** `not-found.tsx` using Header, Footer and the design system, linking to `/work` and `/contact`.
**Impact:** Medium-high on trust. **Effort:** 0.25 day.

## Important

### V-I1 · No measure scale
**Location:** 40 instances across 10 distinct values, e.g. `careers/page.tsx:35,38,51,61,87,122` uses `15em, 36em, 17em, 34em, 18em, 42em` — six different measures in one file
**Current:** Line lengths from `max-w-[12em]` to `max-w-[42em]`, each chosen locally.
**Why it matters:** No two prose blocks share a measure. It reads as slight misalignment rather than an obvious error, and it makes the design system less useful to whoever extends it.
**Recommend:** Three tokens — `--measure-tight` 34em, `--measure` 38em, `--measure-wide` 42em for display headings. Replace all 40.
**Impact:** Medium visually, high on maintainability. **Effort:** 0.5 day.

### V-I2 · Header offset is a hand-copied magic number
**Location:** `work/page.tsx`, `work/[slug]/page.tsx`, `contact/page.tsx`, `careers/page.tsx`, `(marketing)/layout.tsx` — five files
**Current:** `pt-[76px] md:pt-24` repeated, matching header height by hand.
**Why it matters:** Changing header height silently breaks five pages.
**Recommend:** A `--header-h` token consumed by both header and offset.
**Impact:** Low visually, medium structurally. **Effort:** 0.25 day.

## Polish

### V-P1 · Two case studies is thin for a work index
Correct given the approval gates. Revisit when Joveo clears. **Effort:** 0.25 day when unblocked.

**Visual verdict:** Typography, colour and tonal structure are disciplined and consistent. The system is good. What is missing is everything that would make it *Zare's* rather than a competent implementation of the current house style.

---

# 4. MOTION AND INTERACTION

## Important

### M-I1 · Motion is under-designed and inconsistent
**Location:** full site inventory
**Current:** 10 `transition-colors`, 3 `transition-transform`, one `duration-500`, one `duration-300`, one always-on blink, 12 `<Reveal>` instances. The design system defines `--duration-feedback/reveal/section` and `--ease-enter/exit`; almost nothing consumes them.
**Why it matters:** We guarded hard against over-animation and overshot. Two hard-coded durations matching neither token mean hover feedback differs between components for no reason. Duration is how a page signals what matters, and right now it signals nothing.
**Recommend:** Route every transition through the tokens. Add no new motion.
**Impact:** Medium on perceived quality. **Effort:** 0.25 day.

## Polish

### M-P1 · Reveal is well-judged, leave it alone
12 instances, once-only, gated behind `html.anim`, skipped under reduced motion, driven by one shared observer with zero per-instance client JS. This is the part of the motion system that is right.

### M-P2 · Footer ticker is the only always-on motion
`animate-[blink_1.8s_steps(1)_infinite]`. Deliberate founder easter egg with a reduced-motion guard. Noted, not a recommendation.

**Motion verdict:** Nothing decorative, nothing gratuitous, nothing that slows the experience. Also nothing that communicates. The Möbius earns its place; the rest is functional and forgettable.

---

# 5. TECHNICAL QUALITY

## Critical

### T-C1 · The flagship case study has an empty core
**Location:** `content/work.ts:122` — `decisions: []`
**Current:** `/work/litpulse-federated-research-engine` renders Engineering Decisions as a labelled gap. Confirmed live.
**Why it matters:** LitPulse is the strongest technical asset and the Decisions block is what separates an engineering proof page from a portfolio entry. The honest placeholder is the right call over fabrication, but it is a hole in the page most likely to convince a CTO.
**Recommend:** The 45-minute engineering interview; five questions already written in `docs/CONTENT-CHECKLIST.md`. **Blocked externally.**
**Impact:** High. **Effort:** 0.5 day to write up once the transcript exists.

### T-C2 · Banned vocabulary reaches production through job data
**Location:** `/careers`, sourced from the admin API
**Current:** "robust" renders from a live job description.
**Why it matters:** The rule is enforceable in CI on authored copy but never on API content. One leak is minor; the unguarded mechanism is not.
**Recommend:** Editorial note in the admin job form plus a CI check scoped to `src/content/` and `src/app/(site)/`.
**Impact:** Low individually, compounding. **Effort:** 0.25 day.

## Polish

### T-P1 · Initial JS 3% over budget
196 KB gzipped against 190 on every site route. Unchanged after removing eight packages, so it is the Next 16 / React 19 floor, not application code. **Recommend:** revise the budget to 200 KB rather than chase it. **Effort:** none.

### T-P2 · No FAQ
Objection handling plus `FAQPage` schema, one of the last high-yield SEO surfaces available. **Effort:** 0.5 day plus content.

## Verified correct — protect in refinement

- One `h1` per page, **zero heading-level skips** across all five routes
- Zero banned words in authored copy
- Every page fully readable with JavaScript disabled, including the hero and the contact form
- CSS 12 KB gzipped on site routes, down from 46
- Structured data: Organization, WebSite, ItemList, two LocalBusiness, plus CreativeWork and BreadcrumbList per case and JobPosting on job detail
- All redirects verified 308; sitemap 9 URLs including four job pages never previously listed
- Server-first: one client component on the homepage
- The honest-gap pattern (dimmed `[—]`, "Pending engineering review", `pendingClients`) is working

**Technical verdict:** The strongest area by a distance. Genuinely above the standard of most sites in this category.

---

# OVERALL ASSESSMENT

**A strong skeleton with thin flesh.**

The engineering is excellent and the strategy is sound and genuinely differentiated. What has not happened is the evidencing: no photographs, no security section, no people section, no engineering decisions on the flagship case, no visual weight on the client list, and no closing ask.

The result reads as a well-built site by a company that has not yet shown you very much. For a first-time CTO visitor the experience is: *this is clearly competent, the argument is unusually precise, and I still do not know who these people are or what they have actually built.* Then the page ends without asking for anything.

None of that is a design failure in the conventional sense. Every mechanism needed to fix it already exists in the codebase. The gap is composition and content, not capability.

## Scores

| Area | Score | Reasoning |
|---|---|---|
| **Positioning** | **8 / 10** | Genuinely differentiated, no competitor category can make the same claim. Loses for the hero/S3 duplication and repetition dulling the strongest phrases. |
| **Trust** | **5 / 10** | Mechanisms are excellent: honest gaps, verified facts, named clients, type-enforced attribution. Evidence on screen is thin: no faces, no security section, no logos, flagship case incomplete, Clutch unlinked. |
| **Visual design** | **5 / 10** | Disciplined type, colour and tonal structure. Zero imagery and no measure scale. Currently reads as a competent implementation of the 2026 house style rather than as Zare. |
| **UX** | **6 / 10** | Logical journey, clear nav, works without JavaScript, clean heading structure. Loses heavily for no closing CTA and a primary CTA likely below the fold. |
| **Technical quality** | **8.5 / 10** | Server-first, zero-JS readable, structured data, redirects, 12 KB CSS, no heading skips. Loses for the unstyled 404 and 3% JS overage. |
| **Conversion readiness** | **3 / 10** | The form cannot send, there is no closing CTA, and there is no analytics to measure any of it. Mostly external blockers, but the number is the number. |

**Weighted overall: 6 / 10.** Built well, not yet finished.

---

# TOP 10 HIGHEST-IMPACT IMPROVEMENTS

Ranked by impact per unit of effort, external blockers included because they dominate.

| # | Improvement | Area | Effort | Blocked |
|---|---|---|---|---|
| 1 | **Rotate the Resend key** — conversion is zero until this happens | Journey | minutes | you |
| 2 | **Homepage closing CTA (S8)** — the largest self-inflicted conversion defect | Journey | 0.5 d | no |
| 3 | **Photography** — the single highest-impact visual change available, and the only defence against looking generic | Visual | 1 d | assets |
| 4 | **Security and IP section (S6)** — clears the largest technical-buyer objection | Positioning | 0.5 d | no |
| 5 | **People / why they stay (S7)** — the only place retention becomes concrete | Positioning | 0.5 d | partly |
| 6 | **Trust strip visual weight + linked Clutch** — highest value per pixel on the page | Visual | 0.5 d | partly |
| 7 | **LitPulse engineering decisions** — completes the strongest proof page | Technical | 0.5 d | interview |
| 8 | **Hero paths above the fold** — restores the hero's entire purpose | Journey | 0.25 d | no |
| 9 | **Styled 404** — stops broken links dumping visitors out of the brand | Visual | 0.25 d | no |
| 10 | **Plausible** — without it none of the above can be proven to have worked | Journey | 0.25 d | you |

**Unblocked work in the top ten totals about 2 days** (#2, #4, #5, #8, #9) and addresses the two most serious findings. That is the sequence I would take first.
