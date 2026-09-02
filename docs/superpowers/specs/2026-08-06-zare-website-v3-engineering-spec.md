# Zare Website v3 — Engineering Specification

**Date:** 2026-08-06
**Status:** Ready for implementation
**Branch:** `v3` (base) → feature branches → PR into `dev`
**Supersedes:** nothing. Complements `docs/zare-website-v3/CLAUDE.md` and `docs/zare-website-v3/design_handoff_particle_mobius_hero/README.md`, which remain authoritative for the Möbius hero and brand rules.

---

## 0. Scope

### In scope
Full rebuild of the public marketing site: routes, components, design system, motion, content, and the conversion layer. Isolation of the admin panel from the marketing bundle.

### Out of scope
- The admin panel's features, UI, or data layer. It is isolated, not rebuilt.
- The jobs backend API. Consumed as-is.
- Any CMS. Content lives in typed TypeScript modules.

### Non-goals (explicitly not building)
Character mascot · Rive/Lottie pipeline · Three.js particle globe (Phase 2) · custom cursor · preloader · dark/light toggle · i18n · blog with fewer than three real articles · testimonial carousel · scroll-jacking.

### Hard rules that gate every PR
1. No em dashes in site copy. Three exceptions: the hero sub-line, the footer ticker glyphs, the dimmed `[—]` results placeholder.
2. Banned words: `world-class`, `best-in-class`, `cutting edge`, `revolutionary`, `top tier`, `seamless`, `leverage`, `synergy`, `robust`, `transform` (as buzzword).
3. Never `BPO` or `outsourcing` in a headline or nav label. Body copy and meta description only.
4. No anonymous testimonials. No invented metrics. Unverified numbers render as a labelled placeholder.
5. No SOC 2 / ISO / GDPR badges. Not certified.
6. `--teal` and `--teal-bright` never carry text on light backgrounds. Use `--teal-deep`.
7. One `<h1>` per page. No duplicate DOM ids.
8. Never render "Road to Nasdaq", an exchange name, a ticker price, or market graphics. The dormant footer ticker stays as-is.

---

## 1. FINAL SITEMAP

| Route | Rendering | Phase | Source of content |
|---|---|---|---|
| `/` | Static | 1 | `src/content/*` |
| `/work` | Static | 1 | `src/content/work.ts` |
| `/work/[slug]` | SSG (`generateStaticParams`) | 1 | `src/content/work.ts` |
| `/contact` | Static shell + client form | 1 | `src/content/contact.ts` |
| `/careers` | Static shell + client list | 1 | jobs API (existing) |
| `/careers/[id]` | Dynamic, ISR 60s | 1 | jobs API (existing, unchanged) |
| `/technology-ai` | Static | 2 | `src/content/services.ts` |
| `/embedded-teams` | Static | 2 | `src/content/services.ts` |
| `/rate-calculator` | Static + client island | 2 | `src/content/rates.ts` |
| `/faq` | Static | 2 | `src/content/faq.ts` |
| `/about` | Static | 2 | `src/content/about.ts` |
| `/insights`, `/insights/[slug]` | SSG | 3 | deferred until 3 articles exist |
| `/admin/*` | unchanged | — | unchanged |
| `/sitemap.xml`, `/robots.txt` | existing, extend | 1 | `src/app/sitemap.ts` |

**Deleted routes:** none. Nothing currently public is removed.

**Redirects (add to `next.config.ts`):**
```
/our-work        → /work        (308)
/our-work/:path* → /work/:path* (308)
```
The current `/our-work` route is indexed. It must 308, not 404.

**Anchors on `/`** are used only for in-page navigation from the header. Every anchor id is unique. Canonical ids:
`#work` `#embedded` `#tech-ai` `#security` `#leadership` `#contact`

---

## 2. FINAL PAGE CONTENT STRUCTURE

### 2.1 `/` — Homepage

Twelve sections. Background rhythm alternates; no two adjacent sections share a value.

| # | Section | id | Background | Server/Client | Content source |
|---|---|---|---|---|---|
| 1 | Hero | `top` | radial gradient | client island (`MobiusHero`) inside server section | `content/home.ts` |
| 2 | Trust strip | — | `--paper` | server | `content/clients.ts` |
| 3 | Two categories | `tech-ai`, `embedded` | `--deep` / `--mist` | server | `content/services.ts` |
| 4 | Featured work | `work` | `--ink` | server | `content/work.ts` |
| 5 | Results | — | `--paper` | server + `<Counter>` islands | `content/metrics.ts` |
| 6 | How we build | — | `--mist` | server (inline SVG) | `content/home.ts` |
| 7 | Security & IP | `security` | `--ink` | server | `content/security.ts` |
| 8 | How we vet | — | `--paper` | server + `<Pipeline>` island | `content/vetting.ts` |
| 9 | Global delivery | — | `--ink` | client (`WorldMap`) | `content/markets.ts` |
| 10 | Leadership & people | `leadership` | `--paper` | server | `content/people.ts` |
| 11 | Impact + careers | — | `--mist` | server | `content/home.ts` |
| 12 | Contact | `contact` | `--ink` | server shell + form island | `content/contact.ts` |

**Client islands on `/`: 5.** `MobiusHero`, `Counter` (×6, one wrapper), `Pipeline`, `WorldMap`, `ContactForm`. Plus `Header` (scroll state) in the layout.

### 2.2 `/work` — index
Hero band (`PageHero`) → category filter (URL param `?category=`) → grouped `WorkCard` grid.
Filter state lives in the URL. `useSearchParams` + `router.replace(..., { scroll: false })`. Shareable, indexable, back-button correct.

### 2.3 `/work/[slug]` — case study
`PageHero` (client name, industry, location) → summary metrics row → Challenge → Solution → Results (revealed in that order) → stack chips → screenshot → verified quote if present → next/previous case → contact CTA band.

### 2.4 `/contact`
`PageHero` → two pathways (`<details>` for the embedded branch) → form (switches fields per pathway) → response promise → what-happens-next 3 steps → Calendly embed → both offices → direct email fallback → social row.

### 2.5 `/careers` and `/careers/[id]`
Restyled only. `CareersList` filter/search/debounce logic, `buildWhere`, `lib/jobs.ts`, `generateMetadata`, and `JobPosting` JSON-LD are **retained without functional change**. Add a "why Zare" band above the listings.

---

## 3. COMPONENT TREE

```
src/
  app/
    (site)/
      layout.tsx                 fonts · Header · Footer · SkipLink · Lenis
      page.tsx                   composes 12 sections
      work/page.tsx
      work/[slug]/page.tsx
      contact/page.tsx
      careers/page.tsx
      careers/[id]/page.tsx      unchanged logic
    (admin)/
      layout.tsx                 MantineProvider + Redux Provider live HERE
      ...                        unchanged
    api/send/route.ts            hardened
    layout.tsx                   html/body only. No providers.
    sitemap.ts robots.ts
  components/
    primitives/
      button.tsx                 cva: variant primary|ghost|link, size sm|md|lg
      kicker.tsx                 mono eyebrow + 26px teal rule
      card.tsx                   cva: tone dark|light|mist
      panel.tsx                  bordered content block
      chip.tsx                   mono tech tag
      metric.tsx                 value + label, mono, tabular-nums
      pathway.tsx                large row link with arrow
      placeholder-mat.tsx        labelled placeholder surface
      section.tsx                <section> + tone + padding + wrap
    motion/
      reveal.tsx
      stagger.tsx
      counter.tsx
      pipeline.tsx
      magnetic.tsx               Phase 2
      anim-gate.tsx              adds html.anim, see §5.1
    three/
      mobius-hero.tsx            client wrapper
      mobius.js                  ported verbatim from docs/
    map/
      world-map.tsx              client
      map-paths.generated.ts     build output, committed
    layout/
      header.tsx                 client (scroll state)
      mega-menu.tsx              client
      mobile-menu.tsx            client
      footer.tsx                 server
      skip-link.tsx              server
      page-hero.tsx              server, replaces 4 duplicate heroes
    sections/
      hero.tsx trust-strip.tsx categories.tsx featured-work.tsx
      results.tsx how-we-build.tsx security.tsx vetting.tsx
      global-delivery.tsx leadership.tsx impact.tsx contact-section.tsx
    work/
      work-card.tsx work-grid.tsx work-filter.tsx case-body.tsx
    forms/
      contact-form.tsx project-fields.tsx team-fields.tsx form-field.tsx
  content/
    home.ts clients.ts services.ts work.ts metrics.ts security.ts
    vetting.ts markets.ts people.ts contact.ts nav.ts
  lib/
    jobs.ts          unchanged
    query/           unchanged
    seo.ts           new: shared JSON-LD builders
  scripts/
    build-map.ts     TopoJSON → SVG paths, run manually, output committed
```

### Deletions
`_components/promise.tsx` · `projects-overview.tsx` · `call-booking.tsx` · `call-booking.module.css` · `contact-us.tsx` · `contact.tsx` · `companies.tsx` · `works.tsx` · `empowering.tsx` · `services.tsx` · `jobs.tsx` (marketing) · `careers/_components/jobs.tsx` · `job-card.tsx` · `hooks/useForm.tsx` · `our-work.module.css` · `calculator-section.module.css` · `components/ui/` · 53 orphan public assets.

`calculator-modal.tsx` and `saving-modal.tsx` are **retained on disk, unrouted**, until `/rate-calculator` lands in Phase 2. The `RATE_TABLE` is business IP.

---

## 4. DATA MODELS

All content models live in `src/content/`. Every module exports `as const satisfies Type[]` so slugs and keys stay literal.

### 4.1 Work

```ts
export type WorkCategory =
  | 'software-ai'
  | 'embedded-teams'
  | 'data-intelligence'
  | 'web';

export interface WorkMetric {
  value: string;        // ">99%" — string, never number. Ranges and symbols are content.
  label: string;        // "DEDUP ACCURACY"
  verified: boolean;    // false renders dimmed with a source note
}

export interface WorkAsset {
  src: string;
  alt: string;          // required, non-empty
  width: number;
  height: number;
}

export interface CaseStudy {
  slug: string;                    // URL segment, kebab-case, stable forever
  featured: boolean;               // homepage section 4
  featuredRank?: 1 | 2 | 3;
  category: WorkCategory;
  title: string;
  client: {
    name: string;
    url?: string;
    logo?: WorkAsset;              // undefined until permission cleared
    logoApproved: boolean;
  };
  industry: string;
  location: string;
  engagement: 'project' | 'embedded-team' | 'managed-operations';
  period?: string;                 // "January 2024 to present"
  summary: string;                 // one line, used on cards
  challenge: string;
  solution: string;
  results: string;
  metrics: WorkMetric[];
  stack: string[];
  shot?: WorkAsset;                // undefined renders <PlaceholderMat>
  quote?: {
    text: string;
    attribution: string;           // required if quote present
    role: string;                  // required if quote present
    source: string;                // "Verified Clutch review, February 2025"
  };
}
```

**Invariant:** `quote` is either fully populated or absent. A quote without `attribution` and `role` must fail typecheck. This enforces the no-anonymous-testimonials rule at compile time.

**Migration:** the 18 entries in `src/data/projects.ts` map into this model. The eight `Website development` entries currently have `name: ""`. They get `client.name` from their `title` and `category: 'web'`. The three hardcoded duplicates in `works.tsx` are discarded; `data/projects.ts` is the surviving source.

### 4.2 Client (trust strip)

```ts
export interface Client {
  name: string;
  logo?: WorkAsset;
  logoApproved: boolean;   // false → render name in a bordered mono cell, full contrast
  industry: string;
  market: string;          // "California, USA"
  order: number;
}
```

### 4.3 Metric (results grid)

```ts
export interface SiteMetric {
  value: string;           // "50-70%" | "80+" | "[—]"
  label: string;
  verified: boolean;       // false → opacity .22, labelled "placeholder"
  countable: boolean;      // true → animate; false for ranges like "50-70%"
}
```

`countable: false` for `50-70%`, `1-2 wks`, `12+ mo`. Only `6` and `80+` animate numerically. Non-countable values fade in instead. This avoids a counter that cannot count.

### 4.4 Market (global delivery)

```ts
export interface Market {
  code: string;            // ISO 3166-1 alpha-2
  name: string;
  lat: number;
  lon: number;
  isHome: boolean;         // Ethiopia only
  clients: string[];       // Client.name references
  industries: string[];
  utcOffset: number;
  overlapHours: number;    // with Addis working day. Requires founder input.
}
```

### 4.5 Person

```ts
export interface Person {
  name: string;
  role: string;
  photo?: WorkAsset;
  linkedin?: string;
  isFounder: boolean;
  quote?: { text: string; approved: boolean };  // renders only when approved
}
```

`quote.approved === false` suppresses the entire quote block. Ships safely without founder sign-off.

### 4.6 Existing models — consumed unchanged

```ts
// src/store/api/job.api.ts — DO NOT MODIFY
interface Job {
  id: string; title: string; yearsOfExperience: number; location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  workType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Freelance';
  skills: string; startDate: string; endDate: string; description: string;
  aboutJob?: string; aboutCompany?: string; createdAt: string; updatedAt: string;
}
```
`CollectionQuery` / `Where` / `Order` from `src/lib/query/types.ts` are unchanged.

### 4.7 Contact submission

```ts
export const projectInquirySchema = z.object({
  pathway: z.literal('project'),
  name: z.string().min(2).max(80),
  company: z.string().min(1).max(120),
  email: z.string().email(),
  building: z.string().min(20).max(2000),
  budget: z.enum(['under-50k', '50k-200k', '200k-plus', 'not-sure']),
  timeline: z.enum(['now', '1-3-months', '3-plus-months', 'exploring']),
  website: z.string().max(0),        // honeypot. Non-empty → silent 200, no send.
});

export const teamInquirySchema = z.object({
  pathway: z.literal('team'),
  name: z.string().min(2).max(80),
  company: z.string().min(1).max(120),
  email: z.string().email(),
  teamType: z.enum(['technology-talent', 'business-operations']),
  roles: z.string().min(3).max(500),
  headcount: z.enum(['1', '2-3', '4-10', '10-plus']),
  startWindow: z.enum(['asap', '1-month', '1-3-months', 'planning']),
  timezone: z.string().max(80).optional(),
  website: z.string().max(0),
});

export const inquirySchema = z.discriminatedUnion('pathway', [
  projectInquirySchema, teamInquirySchema,
]);
```

---

## 5. ANIMATION COMPONENT API

All motion primitives live in `src/components/motion/`. **No inline `animate` props in section code.** If a section needs motion not covered here, extend a primitive rather than writing one-off motion.

### 5.1 `<AnimGate />`

Ports the CTO prototype's `html.anim` pattern. Rendered once in `(site)/layout.tsx`.

```ts
// no props
```

Adds `anim` to `<html>` only when: `IntersectionObserver` exists AND `document.visibilityState === 'visible'` AND `!prefers-reduced-motion`. Plus a 3000ms failsafe that adds it regardless.

**Contract:** hidden initial states are declared under `html.anim` in CSS only. Without the class, all content is visible at rest. This is the rule that prevents content disappearing in prerendered, hidden-tab, or no-JS environments.

### 5.2 `<Reveal />`

```ts
interface RevealProps {
  children: React.ReactNode;
  as?: React.ElementType;              // default 'div'
  variant?: 'rise' | 'fade' | 'clip';  // default 'rise'
  delay?: number;                      // ms, default 0
  duration?: number;                   // ms, default 400 (700 for 'clip')
  once?: boolean;                      // default true
  amount?: number;                     // viewport threshold, default 0.25
  className?: string;
}
```
`rise`: `y: 26 → 0`, `opacity: 0 → 1`.
`fade`: opacity only.
`clip`: `clip-path: inset(0 0 100% 0) → inset(0)`, for images.
Returns children unwrapped in a plain element when `useReducedMotion()` is true.

### 5.3 `<Stagger />`

```ts
interface StaggerProps {
  children: React.ReactNode;           // each direct child is staggered
  gap?: number;                        // ms between children, default 80
  variant?: 'rise' | 'fade';
  as?: React.ElementType;
  className?: string;
}
```
Uses `staggerChildren`. Does not re-trigger. Children need no wrapper.

### 5.4 `<Counter />`

```ts
interface CounterProps {
  value: string;                       // "80+" | "6" | "50-70%"
  countable: boolean;                  // false → fade in, no counting
  duration?: number;                   // ms, default 1400
  className?: string;
}
```
**Triggers on intersection, not on mount.** This fixes the live site's bug where counters finish before they are scrolled into view.
Parses the leading integer, animates it, preserves prefix/suffix verbatim. `countable: false` renders the literal string with a fade.
Renders the final value immediately under reduced motion.
Always accompanied by a visually-hidden text node carrying the final value and label for assistive tech.

### 5.5 `<Pipeline />`

```ts
interface PipelineProps {
  steps: { n: string; label: string }[];   // exactly 8 for vetting
  className?: string;
}
```
Scroll-linked via `useScroll({ target, offset: ['start 0.8', 'end 0.4'] })` → `useTransform` → the connecting line's `scaleX` (desktop) or `scaleY` (mobile). Each node's ring fills when progress passes its index.
**Never alters scroll position or speed.**
Reduced motion: line fully drawn, all nodes filled, static.

### 5.6 `<WorldMap />`

```ts
interface WorldMapProps {
  markets: Market[];
  homeCode: string;                    // 'ET'
  onSelect?: (code: string) => void;
}
```
Renders committed SVG paths from `map-paths.generated.ts`. Arcs animate via `pathLength` on first view, 150ms apart. Home node pulses continuously (the only always-on motion outside the hero).
Desktop drag rotates ±25° then springs back.
Mobile: static projection, arcs still draw, no drag.
**Not `aria-hidden`.** Renders a visually-hidden `<ul>` of markets with client counts. Nodes are `<button>`s, keyboard reachable, `aria-pressed` reflecting selection.

### 5.7 `<MobiusHero />`

```ts
interface MobiusHeroProps {
  speed?: number;                      // default 1.4
  markers?: boolean;                   // default true
  particleCount?: { desktop: number; mobile: number };  // default 14000 / 5000
}
```
Client component. `next/dynamic` with `ssr: false` and a static radial-gradient placeholder matching `FALLBACK_BG`.
Imports `three`, assigns `window.THREE`, then defines the custom element. Guards against double definition on Fast Refresh.
Passes `data-route="B-P-S-E-L-E-C-A"` verbatim.
`aria-hidden="true"` on the canvas. Correct here: the hero's meaning lives entirely in the adjacent text.

### 5.8 Motion constants

```ts
export const EASE = {
  enter:  [0.16, 1, 0.3, 1],
  exit:   [0.4, 0, 1, 1],
  spring: { stiffness: 300, damping: 25, mass: 0.5 },
} as const;

export const DURATION = {
  feedback: 120, reveal: 400, section: 700, hero: 8000,
} as const;
```

### 5.9 Forbidden
`transition-all` anywhere. Parallax on text. Any always-on motion beyond the Möbius rotation and the Ethiopia pulse. Motion on the trust strip or security section beyond a single entrance reveal.

---

## 6. ASSET REQUIREMENTS

### 6.1 Fonts
| Family | Weights | Source | Subset |
|---|---|---|---|
| Sora | 600, 700 | `next/font/google` | `latin` |
| Manrope | 400, 600, 700 | `next/font/google` | `latin` |
| IBM Plex Mono | 500 | `next/font/google` | `latin` |

All with `display: 'swap'` and a CSS variable. **The four Gotham `.otf` files (664 KB, unsubsetted) are deleted.**

### 6.2 Brand marks
| Asset | Spec | Status |
|---|---|---|
| `zare-mark-white.svg` | slash mark, white, transparent | convert from `docs/.../assets/zare-mark-white.png` |
| `zare-mark-navy.svg` | navy variant | convert from PNG |
| `favicon.ico` + `icon.svg` + `apple-icon.png` | 32 / any / 180 | **new. Current `logo` is `/zare-logo.jpg`, a JPG.** |

### 6.3 Photography — **blocking, start day 1**
| Asset | Spec | Owner | Blocks |
|---|---|---|---|
| Team photo, Addis office | ≥2400px wide, landscape, AVIF+WebP | Zare | §10 Leadership, §11 Impact |
| Founder portrait | ≥1600px, portrait | Zare | §10 Leadership |
| Leadership portraits ×3 | ≥800px square | Zare | §10, degrades to initials |

### 6.4 Client logos — **blocking, start day 1**
SVG preferred, else PNG ≥400px with transparency. Per client, written permission to display.
Confirmed available today: LitPulse screenshot (`docs/zare-website-v3/litpulse-screenshot.png`).
Pending: Joveo, Pickrell, Kagool, Tenasol, Exelia, AFIG Funds, KEFI, Medrafa, ACMG, 251, KeySquare, CRDLE, 10.13.
**Fallback if unapproved by day 6:** bordered mono cell, client name at full contrast, plus industry and market. Never faint grey text.

### 6.5 Case study screenshots
1600×1000 minimum, AVIF + WebP, `alt` describing what the product does.
Existing files in `public/our-work/shots/` are reusable but **must be re-encoded**: eight exceed 500 KB, `crdle.png` is 1.09 MB.

### 6.6 Map data
Input `docs/zare-website-v3/build/countries-110m.json` (already present).
Output `src/components/map/map-paths.generated.ts`, committed. Target under 20 KB after simplification.
`scripts/build-map.ts` is a one-off, not part of `next build`.

### 6.7 Open Graph
Regenerate `og-home`, `og-work`, `og-careers`, `og-contact` at 1200×630 in the new visual language. Delete the two orphaned duplicates in `public/open-graphs/`.

### 6.8 Deletions — day 1
53 unreferenced files, approximately 10 MB. Notably:
`our-work/hero.svg` (3.8 MB, never referenced) · `project/realstate.svg` (1.7 MB) · `project/geotagging.svg` (1.4 MB) · `calculator/1-4.jpg` · `what-we-do/*.svg` (6 orphans) · `next.svg` `vercel.svg` `window.svg` `file.svg` `globe.svg`.
Re-encode and keep: `calculator/result-illustration.svg` (6.5 MB rendered at 400px) → export to AVIF at 800px.
`our-work/logos/betterlife.svg` (2.9 MB rendered at 65px) → export to PNG at 130px.

### 6.9 Budgets
| Metric | Budget |
|---|---|
| First-load JS on `/` | ≤ 190 KB gzipped |
| First-load JS, other marketing routes | ≤ 140 KB |
| CSS, all marketing routes | ≤ 45 KB |
| Largest image, any route | ≤ 200 KB |
| `public/` total | ≤ 8 MB (from 33 MB) |
| LCP / CLS / INP | < 2.0s / < 0.05 / < 200ms |
| Lighthouse, all four categories | ≥ 95 |

---

## 7. DEVELOPMENT ORDER

One developer. Fifteen working days. Each milestone is a branch off `v3`, PR into `v3`, then `v3` → `dev` at the end.

| Day | Milestone | Branch |
|---|---|---|
| 1 | M0 Security + isolation | `v3/m0-foundation` |
| 2–3 | M1 Design system | `v3/m1-design-system` |
| 4–5 | M2 Hero | `v3/m2-hero` |
| 6–9 | M3 Homepage sections | `v3/m3-homepage` |
| 10–11 | M4 Work | `v3/m4-work` |
| 12 | M5 Contact + conversion | `v3/m5-contact` |
| 13 | M6 Map + careers | `v3/m6-map-careers` |
| 14 | M7 Performance + a11y | `v3/m7-quality` |
| 15 | M8 QA + launch | `v3/m8-release` |

**Parallel track, started day 1, owned by Zare not the developer:** client logo permissions, founder quote approval, team photography, working-hours policy for the timezone statement.

**Cut order under time pressure:** magnetic CTA → page transitions → `/rate-calculator` → map degrades to a static image with the accessible market list. **M7 is never cut.**

---

## 8. ACCEPTANCE CRITERIA

Each milestone merges only when every box is verifiable by a command or a reviewer action. No box is checked from memory.

### M0 — Security + isolation (Day 1)
- [ ] Resend key rotated at the provider. New key in the deploy environment only.
- [ ] `grep -rn "re_" src/ Dockerfile` returns nothing.
- [ ] `Dockerfile` has no `ENV` secret; uses `pnpm install --frozen-lockfile`; multi-stage with `output: 'standalone'`.
- [ ] `/api/send` validates origin, rate-limits per IP, uses a fixed `from:`, honeypot rejects silently with 200.
- [ ] `MantineProvider` and Redux `Provider` appear only under `app/(admin)/`. `grep -rn "MantineProvider\|store/provider" "src/app/(site)"` returns nothing.
- [ ] Root `app/layout.tsx` renders `<html><body>{children}</body></html>` and nothing else.
- [ ] 53 orphan assets deleted. `du -sh public` under 20 MB at this stage.
- [ ] Analytics live and recording on production. **Baseline captured before any visual change ships.**
- [x] `pnpm build` succeeds. **RESOLVED VIA FALLBACK, not as predicted.** Provider isolation did *not* fix the OOM. Diagnosis: the machine has 12 cores and 12 GB RAM, Next spawns 11 static-generation workers, and a worker thread dies with `young object promotion failed` at roughly a 30 MB heap. This is memory pressure across workers, not a Mantine CSS problem as originally assumed. Fix applied: `NODE_OPTIONS=--max-old-space-size=4096` baked into the `build` script via `cross-env`, so local and Docker builds behave identically. If a future build host has fewer than 8 GB, reduce Next's worker count instead of raising the heap further.

### M1 — Design system (Days 2–3)
- [ ] `@theme` in `globals.css` carries the full CTO token set including `--teal-deep`.
- [ ] Zero raw hex in `src/components/` and `src/app/(site)/`. ESLint rule enforces it.
- [ ] Sora / Manrope / IBM Plex Mono load via `next/font`. Gotham `.otf` files deleted.
- [ ] Type scale `.d1 .d2 .d3` defined once. No section re-declares a heading size.
- [ ] Breakpoints reduced to `760 / 900 / 960`. `grep -rn "min-\[" "src/app/(site)" src/components` returns nothing.
- [ ] Eight primitives exist with cva variants and render in isolation.
- [ ] Six motion primitives exist. Each returns the final state under `useReducedMotion()`.
- [ ] `<AnimGate />` adds `html.anim` under the three conditions plus the 3s failsafe. Verified by disabling JS: all content visible.
- [ ] Header transitions transparent → solid at scrollY > 40. Mega-menu opens on hover **and** focus-within.
- [ ] Skip link is the first focusable element and moves focus to `#main`.

### M2 — Hero (Days 4–5)
- [ ] Möbius forms and reaches idle rotation on desktop Chrome, Firefox, Safari.
- [ ] `prefers-reduced-motion: reduce` renders the formed static strip, no rAF running (verified in the performance panel).
- [ ] WebGL disabled renders `FALLBACK_BG`. All hero copy legible and unmoved.
- [ ] Hero copy is visible at full opacity before the canvas initialises.
- [ ] Canvas does not intercept pointer events. Both CTAs clickable at every breakpoint.
- [ ] Hero is `min-height: 100svh`. No CTA clipping on iOS Safari with the toolbar expanded.
- [ ] Real mid-range Android: sustained ≥ 30 fps. **If not met, reduce to 3,500 particles and re-verify.**
- [ ] Tab hidden stops the rAF loop; visible resumes it.
- [ ] `data-route="B-P-S-E-L-E-C-A"` present verbatim. Console line intact.
- [ ] Exactly one `<h1>` on the page.

### M3 — Homepage sections (Days 6–9)
- [ ] All twelve sections render in the specified order with the specified backgrounds.
- [ ] Every DOM id unique. `grep -o 'id="[a-z-]*"' | sort | uniq -d` returns nothing.
- [ ] Every section is a `<section>` with an accessible name.
- [ ] Trust strip: full-contrast logos or full-contrast mono cells. No opacity below 1 on any client name.
- [ ] Clutch badge links to the real profile and opens in a new tab with `rel="noopener noreferrer"`.
- [ ] Results counters fire on intersection, not on mount. Verified by loading at the top and scrolling down.
- [ ] `countable: false` metrics do not attempt to count.
- [ ] The `[—]` placeholder renders dimmed with its label.
- [ ] Security section content matches `docs/zare-website-v3` verbatim, including "No badges before they are real."
- [ ] Vetting pipeline fills on scroll without altering scroll position or speed.
- [ ] Leadership section suppresses the founder quote when `approved: false`.
- [ ] Careers line links to `/careers`, not `mailto:`.
- [ ] Zero Mantine and zero Redux in the `/` client bundle. Verified with `pnpm analyze`.
- [ ] Homepage client islands ≤ 6.

### M4 — Work (Days 10–11)
- [ ] `src/content/work.ts` is the single source. `src/data/projects.ts` deleted. No hardcoded case study anywhere.
- [ ] All 18 case studies migrated. Eight `web` entries have a real `client.name`.
- [ ] `/work` filter writes `?category=` and survives reload, share, and back button.
- [ ] `/work/[slug]` statically generated for every slug via `generateStaticParams`.
- [ ] Each detail page emits `CreativeWork` JSON-LD and a unique canonical.
- [ ] Challenge → Solution → Results reveal in that order.
- [ ] `quote` present implies `attribution`, `role`, and `source` present. Typecheck enforces it.
- [ ] Missing `shot` renders `<PlaceholderMat>`, never a broken image.
- [ ] `/our-work` 308-redirects to `/work`.

### M5 — Contact + conversion (Day 12)
- [ ] Zero `mailto:` links serve as a primary CTA anywhere on the site. `grep -rn "mailto:" "src/app/(site)" src/components` returns only the explicit fallback line and the careers speculative-application line.
- [ ] Both forms validate client-side on blur and server-side with Zod.
- [ ] Honeypot returns 200 without sending.
- [ ] Rate limit returns 429 after the threshold.
- [ ] Success renders an inline state, not a toast. Failure preserves entered values.
- [ ] Response promise and the three what-happens-next steps are visible without scrolling past the submit button.
- [ ] Calendly loads dynamically and does not block LCP.
- [ ] Both office addresses and all social links from `src/constants.ts` render in the footer.
- [ ] Form is fully keyboard operable. Errors are associated via `aria-describedby` and announced.

### M6 — Map + careers (Day 13)
- [ ] `map-paths.generated.ts` committed, under 20 KB.
- [ ] Arcs draw on first view and not again.
- [ ] Every market node is a keyboard-reachable `<button>` with `aria-pressed`.
- [ ] A visually-hidden `<ul>` lists every market. Verified with a screen reader.
- [ ] Mobile renders the static projection with no drag handlers attached.
- [ ] Careers listing, filter, debounced search, and job detail behave exactly as before. **No regression in `CareersList` logic.**
- [ ] `JobPosting` JSON-LD unchanged and still valid in the Rich Results Test.
- [ ] `/careers` gains the "why Zare" band.

### M7 — Performance + accessibility (Day 14)
- [ ] Every budget in §6.9 met. Recorded in the PR description.
- [ ] `grep -rn "unoptimized" "src/app/(site)" src/components` returns nothing.
- [ ] `grep -rn "transition-all" "src/app/(site)" src/components` returns nothing.
- [ ] Every page has exactly one `<h1>`; heading levels never skip.
- [ ] Axe reports zero violations on `/`, `/work`, `/work/[slug]`, `/contact`, `/careers`.
- [ ] Every text/background pair meets WCAG AA. No teal text on white outside `--teal-deep`.
- [ ] Full keyboard traversal of every page with a visible focus ring throughout.
- [ ] Reduced-motion pass: no element animates; no content hidden.
- [ ] Lighthouse ≥ 95 on all four categories, mobile preset, on every marketing route.
- [ ] CI runs lint, typecheck, build, axe, the banned-word check, and the em-dash check. All green.

### M8 — QA + launch (Day 15)
- [ ] Chrome, Firefox, Safari, Edge. Desktop and mobile.
- [ ] Real iOS and real Android device pass.
- [ ] `sitemap.xml` includes every new route; `/work/[slug]` entries present.
- [ ] All redirects verified with `curl -I`.
- [ ] No console errors or warnings on any route.
- [ ] OG tags render correctly in a link-preview validator.
- [ ] Staging deploy via the existing Docker compose flow succeeds.
- [ ] Analytics recording on the new site; baseline comparison scheduled for day 30.
- [ ] `v3` → `dev` PR opened with the full acceptance record.

---

## 9. CONTENT COPY DRAFT

**Status:** ready for founder review. Em-dash free except where noted. No banned words. No "BPO" or "outsourcing" outside the meta description.

### 9.1 Navigation

**Header**
| Label | Target |
|---|---|
| What We Do ▾ | `/technology-ai` (Phase 1: `#tech-ai`) |
| Our Work | `/work` |
| Careers | `/careers` |
| Contact | `/contact` |
| **Start a project** (button) | `/contact?pathway=project` |

**Mega-menu**
```
TECHNOLOGY & AI                    EMBEDDED TEAMS
Build a digital product            Hire technical talent
Automate with AI                   Build a dedicated team
Modernize infrastructure           Scale business operations
```

**Mobile menu:** What We Do · Our Work · Careers · Contact · Start a project

**Footer columns**
```
ZARE                    COMPANY           OFFICES
Technology & AI         Our Work          REGISTERED OFFICE
Embedded Teams          Careers           Zare Innovations, LLC
Technology Talent       Contact           651 N Broad St, Suite 201
Business Operations                       Middletown, DE 19709
                                          DELIVERY CENTER
                                          Abyssinia Real Estate Building
                                          13th floor, Bole Japan
                                          Addis Ababa, Ethiopia
```
Footer tagline: `Technology, talent, and operations for ambitious companies. Built in Addis Ababa, delivered to the world.`
Footer note: `© 2026 Zare Innovations, LLC. All rights reserved.`
Ticker (unchanged, `aria-hidden`): `ZARE : ——.——` with blinking cursor.

### 9.2 Calls to action

| Context | Label | Target |
|---|---|---|
| Hero primary | `Start a project` | `/contact?pathway=project` |
| Hero secondary | `Explore our work →` | `/work` |
| Technology & AI | `Build with Zare` | `/contact?pathway=project` |
| Embedded Teams | `Build an embedded team` | `/contact?pathway=team` |
| Featured work | `All work →` | `/work` |
| Case study | `Read the case study →` | `/work/[slug]` |
| Leadership | `Meet our people` | `/about` (Phase 2) |
| Impact | `See open roles` | `/careers` |
| Contact pathway A | `Start a project` | form |
| Contact pathway B | `Build an embedded team` | expands |
| Sub-pathway A | `Technology Talent` | form |
| Sub-pathway B | `Business Operations` | form |
| Form submit | `Send inquiry` | — |

**Never used:** "Learn more" · "Get in touch" · "Submit" · "Click here".

### 9.3 Homepage copy

---

**SECTION 1 — HERO**

> Eyebrow: **ዛሬ · ZARE MEANS TODAY**
> *(Requires founder sign-off. See §11.)*
>
> H1: **The next leap starts here.**
>
> Sub: **Zare Innovations designs, engineers, and scales the systems behind tomorrow's growth — from Addis Ababa to the world.**
> *(Approved verbatim from design ref 4a. Carries the one permitted em dash.)*
>
> CTAs: `Start a project` · `Explore our work →`

**Category card A**
> **Technology & AI** →
> Software and AI, engineered end to end.

**Category card B**
> **Embedded Teams** →
> Vetted talent and managed operations, integrated into your business.
> `TECHNOLOGY TALENT` `BUSINESS OPERATIONS`

---

**SECTION 2 — TRUST STRIP**

> Kicker: **Teams and software delivered for**
>
> Joveo · Pickrell Global Technologies · Kagool · Tenasol · Exelia Technologies · AFIG Funds · KEFI Gold & Copper · Medrafa · Africa Communications Media Group · LitPulse
>
> Kicker: **Verified**
> ✓ Zare Innovations, LLC · Delaware, US
> ✓ Delivery center · Addis Ababa, Ethiopia
> ✓ 6 countries served
> ✓ 5.0 rating on Clutch *(links to profile)*

---

**SECTION 3 — THE TWO CATEGORIES**

**3A · Technology & AI**
> Kicker: **01 · Technology & AI**
> H2: **Software and AI, engineered end to end.**
> Body: Software, AI, cloud systems, and digital products engineered end to end by our Addis Ababa engineering base.
> List: Custom software and digital products / Web and mobile platforms / AI automation / Cloud infrastructure and systems integration / Technical consulting
> CTA: `Build with Zare`

**3B · Embedded Teams**
> Kicker: **02 · Embedded Teams**
> H2: **One team. Embedded in yours.**
> Body: Vetted professionals and managed operations embedded directly into your organization.
> **Highlight row:** `One monthly invoice, all-in` · `Risk-free trial on every placement` · `Dedicated placements, never shared`
> CTA: `Build an embedded team`

> **A · TECHNOLOGY TALENT**
> H3: **Vetted engineers, inside your standups.**
> Body: Engineers, developers, technical specialists, and dedicated product teams integrated into your organization.
> List: Dedicated engineers and managed development teams / Product and engineering specialists / Client-specific talent matching / First vetted candidate in 1 to 2 weeks / Dedicated placements, never shared

> **B · BUSINESS OPERATIONS**
> H3: **Managed operations, run as your own.**
> Body: Managed customer experience and back-office teams designed to operate as an extension of your business.
> List: Customer and technical support / Data processing and administrative operations / Virtual assistance and back-office workflows / Operational reporting

---

**SECTION 4 — FEATURED WORK**

> Kicker: **Featured work**
> H2: **Evidence, not adjectives.**

**Flagship · LitPulse**
> Meta: `LitPulse · Biomedical research · Washington DC`
> H3: **A federated research engine for biomedical science.**
> **Challenge:** researchers lose hours to duplicated results and paywalled sources scattered across databases.
> **Zare built:** LitPortal, the federated multi-agent research engine inside the LitPulse platform, unifying biomedical sources into one fast, deduplicated stream.
> Stack: `FastAPI` `LangGraph` `Next.js` `PostgreSQL` `Redis`
> Metrics: `>99%` DEDUP ACCURACY · `<2s` RESPONSE TIME · `>40%` FULL-TEXT RECOVERY
> CTA: `Read the case study →`

**Pickrell Global Technologies**
> Meta: `Pickrell Global Technologies · Technology services · Concord, NC`
> H3: **An embedded pod, running since January 2024.**
> Body: 3-developer embedded pod inside the client's delivery organization. **$50,000 to $199,999** engagement, ongoing.
> Quote: "They are constantly responsive and check in frequently to ensure that all expectations are being met."
> Source: `Verified 5.0 Clutch review · February 2025`

**Joveo**
> Meta: `Joveo · Programmatic recruitment advertising · California`
> H3: **A multi-tier pod shipping in a US ad-tech platform.**
> Body: Multi-tier engineering pod embedded alongside the in-house team for **12+ months**, working in the core platform codebase.
> `[VERIFIED RESULT · CLIENT APPROVAL REQUIRED]`

> CTA: `All work →`

---

**SECTION 5 — RESULTS**

> Kicker: **Results**

| Value | Label | Countable |
|---|---|---|
| `50-70%` | Cost savings vs US hiring | no |
| `1-2 wks` | To your first vetted candidate | no |
| `12+ mo` | Longest embedded engagement | no |
| `6` | Countries served | yes |
| `80+` | Placements in one month | yes |
| `[—]` | Platform uptime · placeholder | no |

---

**SECTION 6 — HOW WE BUILD**

> Kicker: **How we build**
> H2: **A stack chosen for outcomes, not logos.**

> **BUILD** — Product and AI engineering that ships fast without cutting corners.
> `React · Next.js` `NestJS · Python` `FastAPI · LangGraph`
>
> **RUN** — Managed cloud infrastructure sized to each product.
> `AWS · Azure` `Docker` `PostgreSQL · Redis`
>
> **DELIVER** — Automated pipelines, observable systems, access-controlled releases.
> `GitHub Actions · CI/CD` `Monitoring` `Secure deployment`

> Diagram: `ZARE POD · ADDIS ABABA · ENGINEERS · CI/CD` → `SECURE ACCESS · RBAC · NDA · YOUR PERMISSIONS` → `YOUR INFRASTRUCTURE · YOUR CLOUD · YOUR REPOS · MONITORED PRODUCTION`
> Caption: `ALL WORK PRODUCT: FULL IP ASSIGNMENT, IN EVERY CONTRACT`

> **Working hours line:** `Addis Ababa runs on UTC+3 with no daylight saving. [OVERLAP POLICY PENDING FOUNDER INPUT.]`
> *(See §11. Do not ship an invented overlap figure.)*

---

**SECTION 7 — SECURITY & IP**

> Kicker: **Security & trust**
> H2: **How we protect your work.**

> **PRACTICED TODAY**
> Access-controlled delivery: your infrastructure, your permissions. / Role-based permissions on every engagement. / Encrypted communication and secure cloud tooling. / NDA on day one, before any code or data is shared. / Employee confidentiality agreements across the roster. / Monitoring and backup procedures on managed systems.
>
> **CONTRACTUAL**
> Contracts under Delaware law. Zare Innovations, LLC is a US legal entity. / Full IP assignment on all work product, in every contract. / Dedicated placements, never shared across clients. / Service-level agreements on managed engagements.
>
> **ROADMAP**
> Formal certifications: published here as they are pursued and earned. / Data residency options under evaluation for regulated clients.
> Note: **No badges before they are real. Current status available on request.**

---

**SECTION 8 — HOW WE VET**

> Kicker: **How we vet**
> H2: **Eight steps between an application and your team.**

> `01` Application screening · `02` Communication assessment · `03` Technical assessment · `04` Practical project · `05` Technical interview · `06` Reference verification · `07` Client matching · `08` Ongoing performance review
>
> Footnote: `Step 02 assesses written and spoken English against the communication standard required for daily work inside a client team. [STANDARD TO BE SPECIFIED BY FOUNDER.]`

---

**SECTION 9 — GLOBAL DELIVERY**

> Kicker: **Global delivery**
> H2: **Rooted in Ethiopia. Connected to the world.**
> Sub: Delivery from Addis Ababa to teams across multiple markets.
> Node detail template: `{Country} · {n} client(s) · {industries} · {engagement type}`

---

**SECTION 10 — LEADERSHIP & PEOPLE**

> Kicker: **Leadership**
> Quote: **"We believe Africa should not only participate in the future of technology. We should help build it."**
> `[PENDING FOUNDER APPROVAL. Section renders without the quote until approved.]`
> Attribution: **Emanuel Nebiyu Samuel** · FOUNDER & CEO
> Row: **Nathnael Gebreselassie** CTO · **Michael Wondimu** COO · **Addis Alemayehou** STRATEGY ADVISOR
> Panel H3: **Built by people who understand both technology and opportunity.**
> Panel body: Our teams combine technical ability, local insight, and global ambition to help organizations build, operate, and grow.

---

**SECTION 11 — IMPACT + CAREERS**

> Kicker: **Impact**
> H2: **Business growth that creates opportunity.**
> Body: Every successful partnership helps create meaningful work, develop technical talent, and expand access to global opportunity in Ethiopia.
> Stat: **+50%** — Minimum above Ethiopia's national average salary, for every person on our roster
> Careers line: **Build a career as ambitious as the future we are creating.** Engineers, designers, and operators in Addis Ababa, working on products used around the world.
> CTA: `See open roles`

---

**SECTION 12 — CONTACT**

> Kicker: **Next step**
> H1-scale: **What should we build together?**

> **Start a project** →
> Scope a custom software, AI, or digital product engagement with our engineering team.
>
> **Build an embedded team** →
> Add vetted technical talent or launch a managed operations team integrated into your business.
> ├ **Technology Talent** → Engineers, specialists, and dedicated product teams in your codebase.
> └ **Business Operations** → Customer experience and back-office teams, run as your own.

> **Response promise:** We reply within one business day.
> **What happens next:** `01` You send the details. `02` We reply within one business day. `03` A 30-minute scoping call with the people who would do the work.
> Fallback: Or write to us directly: info@zareinnovations.com

### 9.4 Metadata

| Route | Title | Description |
|---|---|---|
| `/` | `Zare Innovations \| Technology, Talent, and Operations` | `Zare Innovations builds software and AI systems and embeds vetted engineering teams from Addis Ababa into companies worldwide. Delaware LLC, 5.0 on Clutch, 6 countries served.` |
| `/work` | `Our Work` | `Case studies in custom software, AI engineering, embedded teams, and managed operations, delivered from Addis Ababa to clients in six countries.` |
| `/work/[slug]` | `{title}` | `{summary}` |
| `/contact` | `Contact` | `Start a software project or build an embedded engineering team with Zare Innovations. We reply within one business day.` |
| `/careers` | `Careers` | *(unchanged)* |

Title template stays `%s | Zare Innovations`. "Revolutionize Your Business" is removed from the default title.

---

## 10. SEO CONTINUITY

The current metadata layer is the strongest asset in the codebase. It is preserved and extended, never rewritten.

**Retained unchanged:** `metadataBase` · title template · `robots.ts` · `sitemap.ts` with live job IDs · `Organization`, `WebSite`, and both `LocalBusiness` JSON-LD blocks · `JobPosting` on `/careers/[id]`.

**Fixed:** `siteNavigationJsonLd` is currently emitted as a bare array. Wrap it in an `ItemList`. Replace `logo: '/zare-logo.jpg'` with an SVG or PNG.

**Added:** `CreativeWork` per case study · `BreadcrumbList` on `/work/[slug]` · `FAQPage` in Phase 2 · `/work` and `/contact` in the sitemap.

---

## 11. OPEN QUESTIONS — blocking, owner is Zare not the developer

Homepage sections are referenced as **S1** to **S12** per §9.3, to avoid collision with this document's own section numbers.

| # | Question | Blocks | Needed by |
|---|---|---|---|
| 1 | Approve `ዛሬ · ZARE MEANS TODAY` as the public hero eyebrow. Confirm it does not encroach on the private ticker signal. | S1 Hero | Day 4 |
| 2 | Approve the founder quote, or confirm the section ships without it. | S10 Leadership | Day 8 |
| 3 | Which client logos have written display permission? | S2 Trust strip | Day 6 |
| 4 | Client approval for the Joveo result and the Pickrell image. | S4 Featured work | Day 10 |
| 5 | Working-hours policy for the timezone statement. Do teams shift to overlap with US clients, and by how much? | S6 How we build | Day 8 |
| 6 | The English/communication standard applied at vetting step 02. | S8 How we vet | Day 8 |
| 7 | Publish the `$50,000 to $199,999` engagement band as a general range, or keep it scoped to the Pickrell case? | S4, S12 | Day 12 |
| 8 | Real Clutch profile URL. | S2 Trust strip | Day 6 |
| 9 | Trial terms: duration, replacement policy, notice period. | S3B Embedded Teams | Day 12 |
| 10 | Platform uptime figure, or keep the `[—]` placeholder. | S5 Results | Day 8 |

**Every one of these has a defined fallback.** None blocks the build; each blocks only its own content slot.

---

## 12. RISK REGISTER

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Möbius port exceeds 2 days | Medium | High | Hard stop end of Day 5. Ship `FALLBACK_BG` + copy. The hero never blocks launch. |
| Mobile WebGL underperforms | Medium | Medium | `particleCount` is a prop. 14,000 → 5,000 → 3,500 → static poster. |
| Logo permissions not granted | High | Medium | Full-contrast mono cells with industry and market. Never faint text. |
| Build OOM persists after isolation | Low | High | Raise `NODE_OPTIONS` in the Dockerfile and document it. |
| Careers regression | Low | High | Restyle only. No edits to `CareersList` logic, `buildWhere`, or `lib/jobs.ts`. Diff must show CSS and markup only. |
| 15 days proves tight for one developer | **High** | Medium | Cut order in §7. M7 is never cut. A second developer on Days 10 to 13 removes the risk entirely. |

---

## 13. DEFINITION OF DONE

The site ships when: every M0 to M8 acceptance box is checked with evidence recorded in its PR; every budget in §6.9 is met and recorded; CI is green on lint, typecheck, build, axe, banned words, and em dashes; every open question in §11 is either answered or shipping under its documented fallback; and the `v3` → `dev` PR carries the full acceptance record.
