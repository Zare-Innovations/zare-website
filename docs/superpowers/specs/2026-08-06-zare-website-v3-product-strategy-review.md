# Zare Website v3 — Final Product Strategy Review

**Date:** 2026-08-06
**Status:** Decision document. Supersedes strategic sections of the engineering spec where they conflict.
**Companion:** `2026-08-06-zare-website-v3-engineering-spec.md` (implementation detail, unchanged except where noted in Part 10)
**Decision at the end of this document: NOT READY. See Part 11.**

---

# PART 1 — FIRST PRINCIPLES

## 1.1 The reframe that changes everything

The engineering spec, the CTO proposal, and my own prior blueprints all quietly assumed the website's job is **to generate leads**. That assumption is wrong, and it has been distorting every decision downstream of it.

Nobody buys a $50,000 to $200,000 engineering engagement from a website. The real acquisition path for this business is:

```
Referral · Clutch · LinkedIn · outbound reply
        ↓
   "Let me look them up"
        ↓
   THE WEBSITE            ← the only moment we control
        ↓
   "These people check out" / "Something feels off"
        ↓
   Reply, or silence
```

The website is not the top of the funnel. **It is the verification step in the middle of the funnel.** Its job is to survive scrutiny from someone who already has a reason to be interested and is now looking for a reason to stop.

This reframe has hard consequences:

| Lead-gen site | Verification site |
|---|---|
| Big CTAs, gated content, chat widget | Scannable evidence, fast answers |
| Persuasion architecture | Elimination-resistance architecture |
| Optimize for form fills | Optimize for "nothing here worried me" |
| Homepage is the destination | `/work` may matter more than `/` |
| Emotional arc across a long scroll | Density and verifiability |

Every trendy conversion tactic we might have reached for — exit intent, chat, gated whitepapers, social proof popups — actively damages a verification site. They signal "we need this lead" to a buyer who is assessing whether we are the kind of company that needs leads.

**Design principle that follows: the site should feel like it does not need you.** Calm confidence is not an aesthetic here. It is an accurate signal of a company with a real pipeline, and it is the single most persuasive thing we can communicate.

## 1.2 Objectives

**Primary:** Survive qualification. A referred or self-sourced executive spends 3 to 20 minutes and leaves with "this is a real company that could do serious work for us."

Measured by: reply rate to outbound, inbound-qualified inquiries, and time-on-`/work` rather than raw traffic.

**Secondary, in priority order:**

1. **Referral enablement.** A happy client forwards the link to a peer. This means the homepage must be *shareable and self-explanatory in isolation*, not dependent on prior context.
2. **Price anchoring.** Move Zare off "cheap Ethiopian labour" and onto "engineering partner with a cost advantage." Every rate conversation for the next three years is easier or harder based on what this site implies.
3. **Recruiting.** Ethiopian engineers evaluating employers. Cheaper to serve than clients and compounding: better engineers produce better work, which produces better case studies.
4. **Procurement survivability.** Legal and vendor-management can complete their checks without a call.

**Explicit non-objective:** volume. More traffic to a verification site is not a goal. Higher-quality traffic converting at a higher rate is.

## 1.3 Visitor psychology

An executive evaluating vendors runs **elimination, not selection**. They hold three to five candidates and are looking for disqualifiers, in roughly this order:

| Order | Disqualifier | Time to trigger |
|---|---|---|
| 1 | "I can't tell what they do" | 10s |
| 2 | "No real clients" | 30s |
| 3 | "No evidence of technical depth" | 90s |
| 4 | "Unclear IP or security position" | silent deprioritization |
| 5 | "Can't tell if they can work with my team" | friction |
| 6 | "No idea who is accountable" | fatal for remote |
| 7 | "No sense of the commercial shape" | stall |

The homepage must clear these **in this order**. Any section that does not clear a disqualifier is scroll tax paid by every visitor.

Critically: **executives do not read, they scan and then drill.** They scan the whole page in 30 seconds, form a hypothesis, and then read one or two sections closely. This means every section must be legible from its heading and first line alone, and the deep content must reward the drill.

## 1.4 Trust-building strategy

Trust in B2B services is built from **verifiable specificity**, in this hierarchy:

1. **Third-party verified** — Clutch 5.0 review, named client confirmations. Highest value; we control it least.
2. **Structurally costly to fake** — a Delaware LLC, a physical Addis delivery centre, a published wage floor, a documented eight-step process. Expensive to lie about, therefore believed.
3. **Named and checkable** — real people with real titles and LinkedIn profiles; real clients with real URLs.
4. **Self-limiting statements** — "No badges before they are real." Admitting a boundary is the cheapest and most underused trust device available.
5. **Unverifiable claims** — near zero value; actively negative in volume.

**Strategy: build the entire site from tiers 1 to 4 and ruthlessly delete tier 5.** Where a tier-5 claim is unavoidable, mark it as a labelled placeholder. The current spec already does this with `[—]`, which is correct and should be extended.

## 1.5 Conversion strategy

There is only one conversion event that matters: **a qualified inbound message.** Everything else is vanity.

Two paths, and they should not be equally weighted:

- **Path A — high intent, ready now.** Two-pathway form. Qualification fields. One-business-day promise. This is the spec's current focus and it is correct.
- **Path B — high value, not ready.** An executive who is impressed but has no live need. Today's spec gives this person nothing. They leave and never return.

Path B is the larger population and we currently forfeit it. **Recommendation: give Path B one low-commitment, non-salesy artifact** — the rate calculator is the obvious candidate, since it is useful, self-serve, and requires no conversation. It converts an impressed non-buyer into a returning visitor with a reason to come back.

This raises `/rate-calculator` from Phase 2 to Phase 1 if any capacity exists, and it is the only scope addition I would argue for.

## 1.6 Brand positioning

> **Zare Innovations is a US-contracted engineering partner with an Addis Ababa delivery centre.**

Not an outsourcer. Not a staffing firm. Not an agency. The precise, defensible sentence is the one above, and every element of it is load-bearing:

- **US-contracted** — Delaware LLC, US law, full IP assignment. This is what makes the purchase safe.
- **Engineering partner** — long engagements, embedded, accountable. Not transactional.
- **Addis Ababa delivery centre** — a real place with real people, stated with confidence rather than hedged.

## 1.7 The unfair advantage

**What competitors can copy, and will:**
design language, animation, copy, stack lists, process diagrams, "rigorously vetted" claims, price points, a Möbius hero.

Assume every visual and verbal choice in this project is copyable within six months. It is not a moat and should not be treated as one.

**What competitors cannot copy:**

1. **The legal structure.** A US entity with an Ethiopian delivery centre is the whole product. Ethiopian competitors mostly are not US entities. US agencies mostly do not have Ethiopian delivery. This arbitrage is structural, expensive to replicate, and is the actual business. **It is currently mentioned once, in a footer address block.**
2. **The verified track record.** Clutch 5.0 verified February 2025. Pickrell running since January 2024. 80+ Kagool placements in one month. Third-party attestation cannot be manufactured.
3. **Engagement duration.** 12+ months on a live engagement is the single hardest metric to fake and the strongest quality proxy in this category.
4. **The wage floor.** +50% above the Ethiopian national average, as a stated policy. A policy is expensive; a claim is free. This is why it is credible.
5. **Named engineers with shipped work.** Most competitors in this category structurally cannot show you who will do the work. Zare can.
6. **The name.** Zare means today in Amharic. Nobody else owns it.

**Strategic conclusion:** the site's defensibility comes from items 1 to 5, and items 1, 3, 5 are currently under-used or absent. The design language is table stakes, not differentiation. **Budget attention accordingly: we have been over-investing in the hero and under-investing in proof.**

---

# PART 2 — AUDIENCE ANALYSIS

## 2.1 CTO buying software development

**Looking for:** evidence that this team has built something architecturally non-trivial and shipped it.

**Fears:** a team that produces a demo and cannot maintain it; no senior engineering judgment; being handed juniors; a codebase they inherit and regret.

**Objections that stop conversion:** "I see screenshots but no architecture." · "Who is the actual senior engineer?" · "What happens when it breaks at 2am?"

**Evidence that convinces:** an architecture artifact from a real system. A named engineer with a stack and shipped work. A technology choice explained with a reason rather than listed. Long engagement duration.

**Sections that serve them:** Work and results, How we deliver (build track), Security & IP, People.

**Gap:** the strongest system case is represented by a UI screenshot and five stack chips. A UI screenshot proves design. **An architecture diagram proves engineering.** This is the highest-leverage single addition available anywhere in the project.

## 2.2 CTO or VP Eng hiring embedded engineers

**Looking for:** predictability. Will this person show up, stay, and require less management than hiring locally?

**Fears — and these are sharper than the project buyer's:** churn (the engineer leaves in four months and I restart); a mismatch I cannot fire; timezone friction; English friction; discovering I am now the manager of a vendor rather than a team member.

**Objections:** "What is your average tenure?" · "What happens if it doesn't work out?" · "How many hours do we actually overlap?" · "Am I sharing this person with another client?"

**Evidence that convinces:** **average placement tenure** (not the maximum), replacement policy stated concretely, trial terms with a duration, overlap hours as a number, "dedicated placements, never shared" (already present and strong), a vetting process with a stated communication standard.

**Sections:** Two paths (embedded panel), How we deliver (embed track), How an engagement works, Security & IP.

**Critical gap:** the spec presents **`12+ mo longest embedded engagement`** — a maximum. A maximum tells a buyer what is possible; an **average tells them what is likely.** For an audience whose primary fear is churn, average tenure is the single most persuasive number Zare could publish, and it is absent from every document so far. If the average is good, publish it. If it is not yet, publish the retention rate or say nothing and lean on Pickrell's duration.

## 2.3 Founder or CEO looking for a technology partner

**Looking for:** someone who will tell them what to build, not only build what they say.

**Fears:** paying for engineering that solves the wrong problem; a partner who disappears after launch; being sold hours rather than outcomes.

**Objections:** "Do they understand my business or just my ticket?" · "What did this actually achieve?"

**Evidence:** case studies framed as outcomes, not deliverables. The Challenge/Solution/Results structure already in the data model is correct and should be preserved exactly. Business metrics alongside technical ones.

**Sections:** Hero, Work and results, Impact, People.

**Gap:** the case metrics are all technical. **None answers "what did this do for the business?"** For a founder, a technical figure needs one more sentence: what it saved, enabled, or unlocked.

## 2.4 Procurement, legal, vendor management

**Looking for:** the ability to complete a vendor file without booking a call.

**Fears:** an unincorporated entity; unclear IP chain; no contractable jurisdiction; data handling they cannot explain to their own compliance team.

**Objections:** "Who is the contracting entity?" · "Where does IP land?" · "What is the data residency position?" · "Are they certified?"

**Evidence:** the Security & IP section, essentially as the CTO proposal wrote it. `Contracts under Delaware law`, `Full IP assignment on all work product, in every contract`, `NDA on day one`, and critically **`No badges before they are real. Current status available on request.`**

**Sections:** Security & IP, footer entity details, Contact.

**Assessment: this audience is the best-served in the entire specification.** The security section is the strongest piece of work in the CTO proposal and I was wrong to cut it in my first blueprint. It should not be touched further.

**Small gap:** references. "References available on request" is a single line that costs nothing and removes a procurement step.

## 2.5 Potential employee (Ethiopian engineer)

**Looking for:** ambition, real work, and evidence that people here grow.

**Fears:** a body shop; being a resource; no learning; being underpaid relative to the value they create.

**Objections:** "Will I work on real products or maintenance tickets?" · "Who would I learn from?" · "Is the pay actually good?"

**Evidence:** the +50% wage floor, named engineers, the stack, the eight-step process signalling that peers were selected carefully.

**Sections:** Impact, People, Work, `/careers`.

**Strategic note:** the client-facing site does most of the recruiting work for free. `+50% above the national average` is simultaneously an impact claim to clients and a recruiting claim to engineers. **The named-engineer addition serves both audiences at once.** No section needs to be added for recruiting; the existing sections need to be built well.

---

# PART 3 — INFORMATION ARCHITECTURE REVIEW

## 3.1 Testing the current structure

Ten sections were proposed in the previous review. Each is now tested against a single question: **does this clear a disqualifier from §1.3?**

| Section | Clears | Verdict |
|---|---|---|
| Hero | 1 — what is this | Keep |
| Trust | 2 — real clients | Keep. Highest value per pixel on the page |
| Two paths | 1 — is it for me | Keep |
| Work + results | 3 — technical depth | Keep. Strengthen |
| How we deliver | 3 — capability | Keep. Merged, correct |
| How an engagement works | 5, 7 — fit and commercial shape | Keep. Was missing |
| Security & IP | 4 — risk | Keep unchanged |
| People | 6 — accountability | Keep. Strengthen |
| Impact | differentiation | Keep. Uncopyable |
| Contact | action | Keep |

All ten survive. I am confirming my own prior structure, which deserves scrutiny rather than comfort, so the challenges I applied and the results:

- **Merge "How we deliver" into "How an engagement works"?** No. Capability and commercial terms are different questions from different people. Merging produces one unreadable section.
- **Cut Impact for the executive audience?** No. It is the only uncopyable differentiator and it does double duty for recruiting. Late placement is correct.
- **Cut "How an engagement works" to save a section?** No. It is the newest section and answers the questions competitors dodge. Highest marginal value of anything added in this project.
- **Is ten still too many?** For a verification site, section *count* matters less than section *density*. Ten dense sections outperform seven airy ones. The real reduction target is vertical padding, not sections.

## 3.2 The one structural change I am still not certain about

`/work` may matter more than `/`. A referred executive frequently lands on a case study link, not the homepage. If that is true, `/work/[slug]` deserves more design attention than it currently gets and the homepage's featured-work section should function as a router rather than a summary.

**Decision: build `/work/[slug]` to homepage quality, not to secondary-page quality.** This is reflected in Part 10's engineering priorities. It is a resourcing decision, not a structural one, so it does not change the section list.

## 3.3 Final recommended homepage architecture

Three tonal acts. Ten sections. Tonal shifts mark act boundaries only — not every section.

---

### ACT I — ORIENTATION · dark ground

**S1 · Hero**
- **Purpose:** state the category and force self-identification.
- **Question:** "What is this and is it for me?"
- **Emotion:** curiosity resolving into recognition.
- **Content:** eyebrow (`ዛሬ · ZARE MEANS TODAY`, pending approval), H1, sub-line, **the two paths as the primary interactive element**, `Explore our work →` as a quiet text link. Möbius behind.
- **Do NOT include:** a redundant button pair duplicating the paths. Any adjective not attached to a noun that can be verified. Video. A newsletter capture.

**S2 · Trust**
- **Purpose:** clear disqualifier 2 within one scroll.
- **Question:** "Has anyone real hired them?"
- **Emotion:** recognition.
- **Content:** full-contrast client logos **each labelled with engagement shape** (`Joveo · 12+ mo embedded pod`). Verified facts row: Delaware LLC, Addis delivery centre, six countries, **linked** Clutch 5.0.
- **Do NOT include:** motion of any kind. Reduced opacity. Directory badges (GoodFirms is not a client). A carousel.

---

### ACT II — EVIDENCE · light ground

**S3 · The two paths**
- **Purpose:** route each visitor into the correct funnel.
- **Question:** "Which of these is me?"
- **Emotion:** self-recognition, then relief that the site already knew.
- **Content:** Technology & AI and Embedded Teams at strictly equal weight. Commercial highlights at display weight: one monthly invoice all-in · risk-free trial · dedicated placements, never shared. Sub-labels for Technology Talent and Business Operations.
- **Do NOT include:** visual hierarchy favouring either path. A third option. Pricing.

**S4 · Work and results**
- **Purpose:** clear disqualifier 3. The load-bearing section of the page.
- **Question:** "Show me something you actually built."
- **Emotion:** technical respect.
- **Content:** a flagship system case **with an architecture diagram**, plus one sentence of business outcome alongside its technical metrics. Pickrell with its attributed Clutch quote. Joveo. Results band closes the section.
- **Do NOT include:** unnamed clients. Metrics without a source. Stock imagery. More than three featured cases.

**S5 · How we deliver**
- **Purpose:** prove there is a system, for both buyers, without either reading the other's half.
- **Question:** "How do you actually do this?"
- **Emotion:** "there is a machine here, not improvisation."
- **Content:** two symmetrical tracks. *Build with us*: BUILD / RUN / DELIVER plus the delivery diagram. *Embed with us*: the eight-step vetting as a compact horizontal band, plus replacement policy and the communication standard.
- **Do NOT include:** the two tracks at different heights or weights. Logo walls of technologies. Methodology jargon.

**S6 · How an engagement works**
- **Purpose:** answer the operational questions competitors avoid.
- **Question:** "What is the first month actually like?"
- **Emotion:** "I can picture this."
- **Content:** commercial shape (invoice, no recruitment fee, notice period) · ramp timeline for weeks 1, 2 and 4 · timezone overlap as a number · the map with **overlap hours labelled on the arcs** · trial terms with a duration.
- **Do NOT include:** the map as a reach flex. Country counts as a headline. Vague terms like "flexible engagement models."

**S7 · Security and IP**
- **Purpose:** clear disqualifier 4 for the technical buyer and the procurement reader simultaneously.
- **Question:** "Is my code, data, and IP safe?"
- **Emotion:** "they have thought about this harder than we have."
- **Content:** exactly as written in `docs/zare-website-v3`. Three columns. `No badges before they are real` promoted to a full readable line. Add: `References available on request.`
- **Do NOT include:** certification badges. Motion. Softening of the roadmap column. Anything aspirational stated as current.

---

### ACT III — PEOPLE · dark ground

**S8 · The people who do the work**
- **Purpose:** clear disqualifier 6.
- **Question:** "Who is actually accountable, and who writes the code?"
- **Emotion:** "these are real, named, findable people."
- **Content:** founder portrait and approved quote · leadership row with LinkedIn links · **one or two named engineers with stack and shipped work.**
- **Do NOT include:** stock portraits. Unnamed "our team of 40+ experts." An org chart. A quote that is not approved.

**S9 · Impact**
- **Purpose:** the uncopyable differentiator and the emotional turn before the ask.
- **Question:** "Why them rather than an equivalent partner?"
- **Emotion:** alignment. "This is a good decision, not only an efficient one."
- **Content:** `+50%` at display scale against the team photograph. One number, one image, one sentence.
- **Do NOT include:** careers content (moved to footer). CSR language. Multiple statistics. Anything that reads as charity rather than economics.

**S10 · Contact**
- **Purpose:** convert with the right form for the right intent.
- **Question:** "What happens if I reach out?"
- **Emotion:** low risk.
- **Content:** two pathways backed by real forms · one-business-day promise · the three what-happens-next steps · Calendly · both offices · email fallback.
- **Do NOT include:** `mailto:` as a primary path. A chat widget. Required phone numbers. More than six fields per pathway.

**Footer band** — careers line to `/careers`, then standard footer.

---

# PART 4 — COMPETITIVE POSITIONING

## 4.1 The category to own

| Category | Status | Verdict |
|---|---|---|
| Software agency | Commoditized, price-pressured | Reject |
| Staff augmentation | Lowest status in the category | Reject |
| Offshore / nearshore dev | Geographically anchored to cheapness | Reject |
| Freelance marketplace | Transactional, zero accountability | Reject |
| AI consultancy | Currently over-claimed by everyone; credibility discount | Reject as primary |
| **Embedded engineering** | Under-claimed, accurate, defensible | **Own this** |

**Own the word "embedded."** It is precise, it is what Zare actually does, it is differentiated from staff-aug (transactional) and from agency (external), and it implies duration and accountability rather than hours. The CTO proposal already reached this conclusion. It should be defended against dilution.

AI capability is real and should be evidenced through shipped work rather than claimed as a category. In 2026, "AI consultancy" carries a credibility discount because everyone claims it. **Showing a shipped multi-agent system is worth more than the words "AI-powered" anywhere on the site.**

## 4.2 Positioning against each competitor set

| Against | Zare's line |
|---|---|
| Traditional agencies | We embed and stay. Twelve months, not twelve weeks. |
| Outsourcing firms | US contracts, full IP assignment, dedicated placements never shared. |
| Freelance marketplaces | An eight-step vetting process and a named accountable company. |
| Offshore dev shops | A Delaware entity you contract with, and a delivery centre you can visit. |
| AI consultancies | A shipped multi-agent system, with metrics. |

## 4.3 Words to avoid, permanently

**Banned outright:** outsourcing · BPO · offshore · staffing · resources · manpower · cheap · affordable · low-cost · rate arbitrage · talent solutions · virtual workers · world-class · best-in-class · cutting edge · revolutionary · seamless · leverage · synergy · robust · transform (as buzzword).

**Use with care:** "AI" only when attached to a shipped system. "Global" only when attached to a named market. "Scale" only when attached to a number.

**Own:** embedded · dedicated · vetted · integrated · engineered · delivered · accountable.

## 4.4 The perception to leave with

> "A US-contracted engineering partner with a serious Addis Ababa delivery centre. I could put these people in front of my board."

The board test is the right bar. It is higher than "I could hire them" and it is the standard that separates a partner from a vendor.

---

# PART 5 — BRAND EXPERIENCE

## 5.1 Visual language

**Typography personality.** Sora is geometric and technical; Manrope is humanist and warm; IBM Plex Mono is machine-precise. This pairing is genuinely well chosen and should be defended: it produces *precision with warmth*, which is exactly Zare's differentiation from the reference set. Linear, Vercel, and Stripe are deliberately cold because they sell to buyers who want to feel no people are involved. **Zare's entire product is people.** Copying that coldness would erase the differentiator.

**The mono rule is the highest-value typographic decision in the system:** IBM Plex Mono is used for facts only — numbers, dates, addresses, stack names, status labels, entity names. Never for prose. This single rule does most of the work of making Zare look like a systems company, and it makes verified facts *look* verified.

**Spacing philosophy.** Generous horizontal margins, tight vertical rhythm. This is the inverse of the current specification and it is the most important visual correction in this document.

In 2026, premium reads as **information density handled with total control**, not empty space around large claims. A page that is 60% whitespace with big assertions reads as a 2021 startup. A page with tight, information-rich bands where every number carries a source reads as a company that has something to say.

**Concrete change: reduce section padding from 120–140px to 88–104px desktop, 56–64px mobile.** Across ten sections this removes roughly 400px of scroll while removing zero content.

**Colour usage.** Ink, navy, deep, mist, white. Teal is a single accent used for: interactive affordance, the 26px kicker rule, data emphasis, and focus rings. Nothing else. `--teal-deep` for any teal text on light backgrounds. **Rule: if teal appears more than roughly six times in a viewport, it has become decoration and must be reduced.**

**Layout rhythm.** Three tonal acts, not eleven alternations. Within an act, vary density rather than background. This is what makes a page read as one authored document instead of stacked marketing modules.

**Image style.** Real photography of real people at the real office. Product screenshots and architecture diagrams. No stock. No illustration. No abstract 3D renders. Where an asset is unavailable, use the labelled `PlaceholderMat` from the CTO prototype — **a labelled placeholder is more trustworthy than a stock photograph**, because it tells the truth.

**Density.** Target roughly 40 to 60% ink coverage in Act II. Act II is where the evidence lives and it should feel substantive. Acts I and III can breathe.

## 5.2 Motion philosophy

**What moves:**
- The Möbius, once, in the hero. The signature.
- Map arcs drawing on first view, once.
- Section reveals: 26px rise, 400ms, once, never repeating.
- Counters, on intersection, once.
- The vetting pipeline filling with scroll.
- Interactive affordance: hover, focus, form state.

**What never moves:**
- The trust strip after its single entrance reveal.
- The security section.
- Any number after it has settled.
- Anything at all when the tab is hidden or reduced motion is set.

**Why it moves.** Motion is permitted for exactly three reasons: (1) to show formation or progression where sequence carries meaning, (2) to confirm an interaction, (3) to direct attention on first view. Motion for delight is not permitted. If a designer cannot state which of the three a given animation serves, it is removed.

**Timing philosophy.** 120ms confirms. 400ms reveals. 700ms transitions structure. 8s forms the hero, once. Uniform duration across all elements — the live site's `duration-300` on everything — destroys hierarchy. Duration is how the page tells you what matters.

**The discipline that matters most:** trust content does not move. Motion on credibility reads as salesmanship; stillness reads as fact. This is why the trust strip and the security section are deliberately the least animated parts of the page.

## 5.3 Interaction philosophy

**Hover.** Confirms interactivity; never reveals information a non-hovering user cannot reach. Border and colour shift, 120ms. Arrow translate 6px maximum. No scale on text. No lift or shadow.

**Navigation.** Fixed header, transparent over the hero, solid ink after 40px. Mega-menu opens on hover **and** focus-within, and is fully keyboard operable. Mobile is a full-screen panel with display-size links, not a cramped drawer.

**Cards.** The whole card is one link target. Hover shifts the border to teal and translates the arrow. Case-study images may scale to 1.04. Nothing else.

**Forms.** Validate on blur, never on keystroke. Errors sit adjacent to their field and are wired with `aria-describedby`. Success is an inline state transition, not a toast that disappears. Failure preserves every entered value. Never more than six fields per pathway.

**Transitions.** Route changes fade at 200ms. No page-level loaders. No scroll-jacking, no pinned horizontal sections, no scroll-driven takeovers. The scrollbar always belongs to the user.

---

# PART 6 — CONTENT STRATEGY

## 6.1 Critique of the current copy

Honest assessment of the draft in the engineering spec, including lines I wrote.

**Strong — keep unchanged:**

| Line | Why it works |
|---|---|
| `Evidence, not adjectives.` | Names the site's own standard and dares you to check |
| `No badges before they are real.` | Admits a boundary. Best line in the project |
| `One team. Embedded in yours.` | Most differentiated sentence available |
| `Eight steps between an application and your team.` | Specific, countable, verifiable |
| `A stack chosen for outcomes, not logos.` | Rejects a competitor behaviour without naming one |
| `Dedicated placements, never shared.` | Answers a fear directly |

**Weak — must be fixed:**

| Line | Problem |
|---|---|
| `The next leap starts here.` | Founder-approved, but genuinely vague. A leap for whom, from what? It could sit on any technology company's homepage. See §6.3 |
| `Technology, talent, and operations built to help ambitious companies scale.` | "Ambitious" and "scale" are filler. Cut in the current IA; do not reintroduce |
| `Built by people who understand both technology and opportunity.` | Warm but soft. Survives only because it sits next to real faces |
| `Business growth that creates opportunity.` | Abstract. The `+50%` beneath it does all the work |
| `Systems behind tomorrow's growth` | Approved verbatim, so it stays, but it is the weakest part of an otherwise strong hero |

**The pattern is unmistakable.** Every strong line is *specific and self-limiting*. Every weak line is *aspirational and expansive*. This yields the governing principle.

## 6.2 Copy principles

**Principle 1 — Prefer a sentence that limits a claim over a sentence that expands one.**
We do not say "world-class engineering talent" because it expands a claim nobody can check. We say "eight steps between an application and your team" because it limits the claim to something countable. Limiting language is read as honesty; expansive language is read as marketing, and marketing is discounted to zero by this audience.

**Principle 2 — Every number carries its source or its placeholder.**
We do not say "99.9% uptime" because we have not measured it. We render `[—] Platform uptime · placeholder` because a visible gap makes every other number more credible.

**Principle 3 — Name the client or delete the claim.**
We do not say "a leading US ad-tech company" because unnamed clients read as invented. We say "Joveo" or we say nothing.

**Principle 4 — Adjectives must attach to verifiable nouns.**
We do not say "seamless integration." We say "in your codebase, in your standups, on your permissions."

**Principle 5 — Never describe what can be shown.**
We do not say "we build sophisticated AI systems." We show the architecture and let the reader conclude it.

**Principle 6 — Write for scanning, reward drilling.**
Every heading must be legible alone. Every section must survive being read as heading-plus-first-line. The depth is there for the one or two sections a reader actually drills into.

**Principle 7 — Never use a word from the banned list, and never use "BPO" or "outsourcing" outside a meta description.**
Enforced in CI, not in review.

## 6.3 The H1 question

`The next leap starts here.` is founder-approved, and I am flagging it anyway because this is the decision document.

It is emotionally correct and strategically empty. It contains no information. Its saving grace is that it is *positioning-neutral* — it does not anchor on cheapness, which the current live site does badly.

**Recommendation: keep it, and make the eyebrow and sub-line carry all the specificity.** With `ዛሬ · ZARE MEANS TODAY` above it and the Addis-to-the-world sub-line below, the H1 functions as the emotional beat between two specific statements. That works.

**But it should be a decision, not an inheritance.** If the founder is open to it, one alternative worth testing: a line that states the structural advantage rather than an aspiration. The H1 is the only piece of copy on the site with no evidence behind it, and that is worth a conscious choice.

---

# PART 7 — TRUST AND PROOF STRATEGY

## 7.1 What would make a CTO say "send me their contact"

Ranked by persuasive power for this specific audience:

1. **A named engineer with shipped work I can verify.** Highest value. Almost entirely absent. Most competitors structurally cannot do this.
2. **A third-party verified review, linked.** Clutch 5.0 exists; the link does not. An unlinked rating is an assertion, a linked one is evidence. **Cheapest high-value fix in the project.**
3. **Engagement duration.** Pickrell since January 2024 is the strongest quality proxy available and is currently one line inside a secondary card.
4. **An architecture artifact.** Absent. Highest-leverage single addition.
5. **Average placement tenure.** Absent, and it is the number the embedded-teams buyer most wants.
6. **IP and contract clarity.** Present and excellent.
7. **Client logos.** Present, pending permissions.
8. **Aggregate metrics.** Present. Lowest value of the group, though visually powerful.

## 7.2 Proof audit

| Evidence | Status | Action |
|---|---|---|
| Client logos | Text at 36% opacity in the prototype; permissions unresolved | Full contrast, with engagement labels. **Permissions are a blocker** |
| Case studies | 18 in the codebase; 3 featured | Add architecture diagram; add one business-outcome line |
| Metrics | Six, five verified, one honest placeholder | Add average tenure. Keep the placeholder |
| Technical evidence | **Absent** | Architecture diagram. Named engineers |
| Testimonials | One verified attributed Clutch quote | Sufficient if kept attributed. Never add an anonymous one |
| Security | Excellent | Add "References available on request" |
| Team | Executives named, engineers absent | Add one or two named engineers |
| Third-party verification | Clutch rating present, unlinked | **Link it** |

## 7.3 The three additions that matter most

1. **An architecture diagram for the strongest system case.** Converts the strongest asset from "they made a UI" to "they engineered a system." One diagram.
2. **One or two named engineers**, with stack and shipped work. Serves the CTO, the VP Eng, and recruiting simultaneously. Requires consent.
3. **Average placement tenure**, if the number supports it. Directly answers the embedded buyer's primary fear.

All three are content, not engineering. None requires additional build time. All three require a decision from Zare.

---

# PART 8 — SECTION-BY-SECTION DECISIONS

| # | Section | Decision | Change required | Build impact |
|---|---|---|---|---|
| S1 | Hero | **Change** | Paths become the primary element; retire the duplicate button pair; `100svh` | Low |
| S2 | Trust | **Change** | Full contrast; engagement label per logo; link the Clutch badge | Low |
| S3 | Two paths | **Keep** | Commercial highlights to display weight | None |
| S4 | Work + results | **Change** | Merge results in; add architecture diagram; add one business-outcome line | Low build, content-blocked |
| S5 | How we deliver | **Change** | Merge build and vetting into two symmetrical tracks; add replacement policy | Medium |
| S6 | How an engagement works | **Add** | New section absorbing global delivery; overlap labelled on arcs | Medium, content-blocked |
| S7 | Security and IP | **Keep** | Promote one line; add references line | None |
| S8 | People | **Change** | Add named engineers | Low, consent-blocked |
| S9 | Impact | **Change** | Remove careers; give full weight | None |
| S10 | Contact | **Keep** | As specified | None |
| — | Careers on homepage | **Remove** | Move to footer band | Low |
| — | Insights | **Remove** | Until three real articles exist | None |
| — | Standalone "Who we are" | **Remove** | Already cut. Do not reintroduce | None |

**Net: 12 sections → 10. Two merges, one addition, two removals.** Build impact is modest; the constraint is content, not engineering.

---

# PART 9 — ENGINEERING REALITY CHECK

## 9.1 What is valuable and should not be touched

- **Provider isolation** (Mantine and Redux into `(admin)`). Largest single performance win. Everything depends on it.
- **Server-first architecture.** Five client islands on `/` versus 65 client components today.
- **The `AnimGate` / `html.anim` pattern** from the CTO prototype. Prevents the class of bug where content is permanently invisible in prerendered or hidden environments. Cheap and correct.
- **Type-level content invariants.** A `quote` without `attribution` failing typecheck turns an editorial rule into a compile error. This is the right way to enforce a brand rule.
- **Preserving the SEO layer and the careers system untouched.** Both work; both would be expensive to rebuild; neither is the problem.
- **Wrapping `mobius.js` rather than porting to R3F.** Saves two days and produces faster code.

## 9.2 What is unnecessary or over-engineered

- **`scripts/build-map.ts`.** A build script, a TopoJSON dependency, and a generated module for one section. A hand-exported static SVG achieves the same result. **Recommendation: hand-export once, delete the script.** Saves half a day and one dependency.
- **Fifteen primitives before any page exists.** Eight UI primitives plus seven motion primitives is three days of infrastructure for a ten-section site. Defensible for maintainability, but if Days 2–3 slip it consumes the buffer. **Recommendation: build eight primitives on Day 2 and add the remainder as sections demand them.**
- **`<Magnetic>`.** Phase 2 with no API defined. Delete from the tree until it is actually needed.
- **Four `WorkCategory` values.** Matches existing data. Fine, but the eight `web` entries with empty client names should be audited before migration rather than mechanically carried across.

## 9.3 A budget error in my own specification

I set a first-load budget of ≤190 KB for `/`. **Three.js is roughly 150 KB gzipped.** That budget only holds because the hero is dynamically imported with `ssr: false`, which excludes it from first load. But it means the hero becomes interactive substantially after first paint, and the total bytes for a complete `/` experience are closer to **340–400 KB**.

This is acceptable and normal for a WebGL hero, but it was stated misleadingly. **Correction:**

| Budget | Value |
|---|---|
| First-load JS, `/` (excluding lazy hero chunk) | ≤ 190 KB gz |
| Lazy hero chunk (Three + mobius) | ≤ 170 KB gz |
| Total `/` JS, fully interactive | ≤ 400 KB gz |
| LCP (text, not canvas) | < 2.0s |

LCP must be measured on the **hero text**, not the canvas. The canvas is decorative and must never be the LCP element.

## 9.4 The largest unaddressed risk in the entire project

**There is no visual design step in the plan.**

Fifteen days of engineering, ten sections, six routes, and no comps. The specification defines tokens, structure, copy, and behaviour — but not layout. A developer building ten sections without comps will produce ten subtly inconsistent layouts, and the inconsistency will read as exactly the "template agency website" the brief says to avoid.

Two viable resolutions:

- **(a) Design in-browser.** Viable for a strong developer working from the CTO prototype, which is a high-fidelity reference for roughly six of the ten sections. Adds ~20% to Days 6–9. **This is the realistic option and it should be planned for, not absorbed silently.**
- **(b) Comps for the four sections with no prototype reference** — S1 hero paths, S5 merged delivery, S6 engagement, S8 with engineers. Two days of design before Day 6.

**Decision: option (a), with the explicit acknowledgement that Days 6–9 becomes Days 6–10** and one of the Phase 2 items is cut. The CTO prototype is a genuine asset here — it removes design risk from more than half the page.

## 9.5 Schedule reality

Fifteen days for one developer covering M0 through M8 has **zero slack**, and §9.4 just consumed a day. Honest assessment:

- **Achievable:** M0, M1, M2, M3, M5, M7, M8 — homepage, contact, foundation, quality.
- **At risk:** M4 (`/work` + case studies) and M6 (map + careers).
- **Owner's call:** if a day must come from somewhere, take it from the map. Ship S6 with a static map image and the accessible market list; the section's value is the *content*, not the arcs. Do not take it from M7.

`/work/[slug]` must not be cut. Per §3.2 it may be more important than the homepage for referred traffic.

## 9.6 Maintainability

The architecture is sound for a solo maintainer: typed content modules, no CMS, server-first, one animation library, one UI system per app. The genuine long-term risk is **content staleness** — case studies and metrics decay, and no process owns them. Recommendation: a quarterly content review, with `verified` flags in the data model already providing the audit surface.

---

# PART 10 — FINAL RECOMMENDED SPECIFICATION

## 10.1 Sitemap

Unchanged from the engineering spec, with one promotion.

**Phase 1:** `/` · `/work` · `/work/[slug]` · `/contact` · `/careers` · `/careers/[id]`
**Phase 1 if capacity:** `/rate-calculator` — promoted from Phase 2 per §1.5, as the only artifact serving the impressed-but-not-ready visitor
**Phase 2:** `/technology-ai` · `/embedded-teams` · `/faq` · `/about`
**Phase 3:** `/insights`, `/insights/[slug]`
**Unchanged:** `/admin/*`, `sitemap.xml`, `robots.txt`
**Redirect:** `/our-work` → `/work` (308)

## 10.2 Homepage sections

Ten, in three acts, as specified in §3.3.

`Act I (dark)` Hero · Trust
`Act II (light)` Two paths · Work and results · How we deliver · How an engagement works · Security and IP
`Act III (dark)` People · Impact · Contact
`Footer` careers band

## 10.3 User journey

```
Arrive (referral, Clutch, LinkedIn, outbound)
  → Hero: category understood, self-identification offered        [10s]
  → Trust: real clients, verified entity                          [30s]
  → Paths: "that one is me"                                       [45s]
  → Work: technical depth confirmed                               [2m]
  → Deliver / Engagement: mechanics and commercial shape          [4m]
  → Security: risk cleared                                        [5m]
  → People: accountability confirmed                              [6m]
  → Impact: preference formed
  → Contact: qualified inquiry
```

Most visitors exit after the Work section having formed a judgment. **The page must be winnable in the first four sections.** Sections 5 to 9 exist to survive the drill, not to carry the argument.

## 10.4 Conversion paths

| Path | Trigger | Destination | Priority |
|---|---|---|---|
| Primary A | Hero path card, S3 CTA, S10 | `/contact?pathway=project` | Highest |
| Primary B | Hero path card, S3 CTA, S10 | `/contact?pathway=team` | Highest |
| Secondary | Case study CTAs | `/work/[slug]` → contact | High |
| Low-commitment | S3, S6 | `/rate-calculator` | Medium |
| Call | S10 | Calendly | Medium |
| Recruiting | Footer | `/careers` | Separate funnel |
| Fallback | S10 only | `mailto:` | Last resort |

**Zero `mailto:` links serve as a primary CTA anywhere on the site.**

## 10.5 Design principles

1. Every element clears a disqualifier or it is removed.
2. Prefer a sentence that limits a claim over one that expands it.
3. Every number carries its source or its placeholder.
4. Never describe what can be shown.
5. Mono for facts, never for prose.
6. Motion serves formation, confirmation, or first-view attention. Nothing else.
7. Trust content does not move.
8. Density over whitespace. Three tonal acts, not eleven alternations.
9. Real photography or a labelled placeholder. Never stock.
10. The site should feel like it does not need you.

## 10.6 Engineering priorities

1. **M0 provider isolation and key rotation.** Everything depends on it. Strategy-independent; can start immediately.
2. **M1 design system.** Eight primitives on Day 2; motion primitives as needed.
3. **M4 `/work/[slug]` at homepage quality.** Elevated per §3.2.
4. **M7 performance and accessibility.** Never cut.
5. **M2 hero.** Hard stop at Day 5; falls back to the static gradient.
6. **M6 map.** First candidate for reduction; ship static if needed.

**Deleted from scope:** `scripts/build-map.ts` (hand-export instead) · `<Magnetic>` · page transitions if time is short.

---

# PART 11 — IMPLEMENTATION READINESS DECISION

## DECISION: **NOT READY**

Not because the strategy is wrong. The strategy is now clear, the architecture is sound, and the engineering plan is realistic. **It is not ready because five decisions that Zare owns are load-bearing for six of the ten sections, and building around unknowns produces rework that a 15-day budget cannot absorb.**

## What must be resolved before Day 6

| # | Decision | Blocks | Owner | Fallback if unresolved |
|---|---|---|---|---|
| 1 | **Client logo permissions.** Which of the eleven can be displayed? | S2, the highest-value-per-pixel section | Zare | Full-contrast mono cells with name, industry, market. Materially weaker |
| 2 | **Named engineer consent.** One or two engineers, with stack and shipped work. | S8, and the top-ranked missing proof | Zare | Leadership only. Forfeits the strongest available differentiator |
| 3 | **Commercial terms.** Trial duration, notice period, replacement policy, average placement tenure. | S3, S5, S6 | Zare | S6 ships thin; the section loses most of its value |
| 4 | **Working-hours and overlap policy.** | S6, and the embedded buyer's second-largest fear | Zare | Publish UTC+3 only. Weak |
| 5 | **Founder quote approval, and the `ዛሬ · ZARE MEANS TODAY` eyebrow.** | S1, S8 | Founder | Quote suppressed by the data model; eyebrow reverts to the CTO's original |

**Plus one internal decision:**

| 6 | **Confirm design-in-browser** (§9.4) and accept Days 6–9 becoming 6–10, cutting one Phase 2 item. | The whole build | Project owner | Silent slippage into M7, which is the one milestone that must not be cut |

## What can start immediately

**M0 is strategy-independent and should begin now**, in parallel with resolving the above:

- Rotate the Resend API key. It is committed in `src/app/api/send/route.ts` and in the `Dockerfile`, and is in git history.
- Harden `/api/send`: origin check, rate limit, fixed `from:`, honeypot.
- Move `MantineProvider` and the Redux `Provider` out of the root layout into `(admin)`.
- Delete the 53 orphaned assets, roughly 10 MB.
- Rebuild the `Dockerfile` as multi-stage with `output: 'standalone'` and `--frozen-lockfile`.
- Install analytics and **capture the pre-redesign baseline.** This becomes impossible the moment the redesign ships.

None of this is affected by any strategic decision above, and all of it is required regardless of what the site ends up looking like.

## First implementation milestone

**M0 — Security, isolation, and baseline.** One day. Branch `v3/m0-foundation`.

Acceptance is defined in §8 of the engineering spec and is unchanged. It merges when: the key is rotated and absent from the tree, `grep -rn "MantineProvider\|store/provider" "src/app/(site)"` returns nothing, the root layout renders only `<html><body>`, `public/` is under 20 MB, `pnpm build` succeeds at default Node heap, and analytics is recording on production.

## The path to READY

Resolve items 1 to 6. Realistically **three to five days**, and almost all of it is email and one internal conversation, not work. Run M0 concurrently. On resolution, the project moves to READY and M1 begins with no remaining strategic uncertainty.

**Do not start M1 through M8 before items 1 to 5 are answered.** Every one of them changes content that changes layout, and layout rework is the most expensive thing that can happen inside a fifteen-day budget.
