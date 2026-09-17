# Zare Bench — the staff portal at /portal

Internal talent bench for Zare Innovations. A standing pool of pre-assessed
candidates whose **availability is kept fresh**, so a client request can be
answered in 24–48 hours instead of starting recruitment from zero.

Assessment data is permanent; availability data is perishable. Everything in
the portal is judged by whether it keeps availability current.

Staff reach it at **zareinnovations.com/portal**. It is part of this app, not
a separate one.

---

## Where it lives in this repo

| Path | What |
|---|---|
| `src/app/(bench)/portal/` | The routes: dashboard, queue, candidates, requests, shortlist, settings, email previews, sign-in |
| `src/app/(bench)/portal/layout.tsx` | Loads the portal's fonts and styles, wraps pages in its app shell, sets `noindex` |
| `src/bench/data/` | **The data layer.** Every screen reads and writes through `@/bench/data` and nowhere else |
| `src/bench/jobs/` | Scheduled jobs as pure functions (scarcity alert, Monday decay warning, Friday summary) |
| `src/bench/emails/` | Staff email templates (subject, preheader, HTML, plain text) |
| `src/bench/export/` | The client shortlist: field whitelist, leak check, PDF |
| `src/bench/components/` | Portal-only components: shell, form controls, candidate and request pieces |
| `src/bench/bench.css` | Portal styles, all scoped under `[data-bench]`; loaded only under `/portal` |
| `src/app/globals.css` | The `--color-bench-*` tokens, in the "ZARE BENCH" block of `@theme` |
| `supabase/` | The target database schema. Not executed by this build |
| `docs/bench/DEPLOY.md` | The temporary nginx password lock in front of `/portal` |

How it stays out of the marketing site's way:

- **Styles.** `bench.css` is imported only by the portal layout, and every
  rule is scoped under `[data-bench]`. Keyframes are prefixed `bench-`.
- **Tokens.** Portal colours are `bench-*` (`bg-bench-surface`,
  `text-bench-ink-dim`, …). The site's `ink` is a surface colour and the
  portal's is a text colour, so they can never share a name. Teal,
  bright teal, depth blue and text-on-teal are the site's own `accent*`
  tokens.
- **Fonts.** The site's own type system: the portal layout applies
  `fontVariables` from `src/styles/fonts.ts` (Sora, Manrope, IBM Plex Mono)
  and uses the same `--font-display`, `--font-body` and `--font-mono` tokens.
  That module also carries the weights the data screens need (Manrope 500,
  Plex Mono 400 and 600).
- **Search.** `noindex` metadata, an `X-Robots-Tag` header
  (`next.config.ts`) and `Disallow: /portal` in `robots.ts`.
- **Dependencies.** Two, used only by the portal: `@react-pdf/renderer`
  (loaded on demand when a PDF is built) and `lucide-react` (icons).

## Current state: demo build, no database

The portal runs on an **in-memory mock data layer**. There is no database
connection, no real authentication, and no email is sent.

| | |
|---|---|
| Data | `src/bench/data/`, seeded in memory, persisted to `sessionStorage` per browser tab |
| Sign-in | In demo mode (the default), `/portal/login` accepts any `@zareinnovations.com` email with any password, plus one-click demo access. Nothing is checked. Every write refuses a signed-out session |
| Email | Not sent. Rendered at `/portal/settings/email-preview` |
| PDF | Real, generated in the browser from the mock data |
| SQL | `supabase/migrations/`, the target schema |

Because it is still the demo, the server puts a password in front of
`/portal` until real sign-in exists. See [`DEPLOY.md`](DEPLOY.md).

### The one module that changes

Every screen imports data from `@/bench/data` and from nowhere else. Swapping
to a real database is a change to that module's implementation; the function
signatures, return types and business rules do not move.

```
src/bench/data/
  types.ts    domain types, mirroring the SQL exactly
  logic.ts    business rules, transcribed from the SQL (deleted when the DB lands)
  seed.ts     ~40 demo candidates, seeded relative to boot time
  store.ts    the in-memory snapshot + subscribers
  index.ts    THE public API
```

Reads are hooks (`useCandidates`, `useBenchHealth`); writes are async
functions (`logCall`, `archiveCandidate`) already shaped like network calls.
Reads being hooks means they are client-side; against a real database they
become server-fetched props or a query client with the same return types.

### Running it

```bash
pnpm dev
```

Open **http://localhost:3000/portal**. It opens on the sign-in page; use a
demo access button. Reset the demo data from Settings.

Tests for the business rules, job schedules and the export whitelist run with
the rest of the suite: `pnpm test`.

### Scheduled jobs

The jobs are designed to run on a schedule (hourly scarcity check, Monday
07:00 EAT decay warning, Friday 16:00 EAT summary). The site is served from
the company's own server, so in the real build they run from the host's cron,
calling job endpoints that arrive with the database. In the demo, Settings
has a Run now button for each.

---

## Self-hosted Postgres vs Supabase

Requested for a decision, not acted on. Both work. The question is not
technical capability — it is how much operational surface you want to own.

Supabase is Postgres plus four things you would otherwise build: an auth
system, file storage, an auto-generated API with row-level security wired
into it, and the operational care of the database itself.

### What you take on with self-hosted Postgres

| Area | What Supabase does today | What you would own |
|---|---|---|
| **Backups** | Automatic daily backups, point-in-time recovery on paid plans, restores from a dashboard | Choosing a tool (`pg_dump`, WAL-G, pgBackRest), scheduling it, storing backups **off the same machine**, and — the part teams skip — periodically restoring one to prove it works. An untested backup is not a backup. |
| **Uptime** | Managed host, monitoring, patching, failover on higher tiers | Provisioning, OS and Postgres security patching, disk monitoring, connection limits, alerting when it goes down at 02:00. Someone must be on the hook for that hour. |
| **Login system** | Email/password, magic links, sessions, password reset, JWT issuance — all built | Building it: password hashing, session management, reset flows, and the security review that comes with holding staff credentials. This is the single biggest hidden cost on the list. Alternatives exist (Auth0, Clerk, WorkOS) but they are another vendor, which weakens the "one less vendor" argument. |
| **CV file storage** | Object storage with access rules, signed URLs, straightforward uploads | S3 or equivalent, plus signed-URL generation, upload handling, and access control. CVs are personal data and must not be reachable by URL alone. |
| **RLS** | Same Postgres RLS either way — the migrations in this repo work unchanged | Identical. RLS is a Postgres feature, not a Supabase one. **This is not a differentiator.** |
| **Realtime** | Built in, used for the activity feed | Polling, or run your own websocket layer. Polling is fine for this product. |

### The honest read

The migrations in `supabase/migrations/` are **plain Postgres**. Nothing in
the schema, the views, the functions or the RLS policies is
Supabase-specific. If you self-host, that SQL runs unchanged. So the schema
is not the lock-in, and you are not choosing a database — you are choosing
whether to own auth, storage and operations.

For a team of this size, on an internal tool used by a handful of staff, the
work that actually decides it is **the login system**. Everything else on
that list is a day or two of setup; a credential system you host yourself is
an ongoing security responsibility for as long as the tool exists.

Two reasons that could legitimately flip it: an existing Postgres your
developer already operates and monitors (then the marginal cost is small,
though auth is still yours), or a data-residency requirement that rules out a
managed host abroad. Ethiopian data residency, if it applies, is a real
constraint and would settle the question on its own.

Worth stating plainly: whichever you pick, the portal's application code
changes in one module, `src/bench/data`. This is a reversible decision, so it does not need to be a slow
one.

---

## Target schema

`supabase/migrations/` (repo root) holds the schema the demo is modelled on.
It is not executed by this build.

| File | Contents |
|---|---|
| `0001_schema.sql` | 7 tables, `ZT-0001` ref-code sequence, constraints making the concern and exactly two strengths mandatory at assessment |
| `0002_derived.sql` | `candidates_view` (derived layer), `bench_health`, `call_queue`, `log_call()`, `archive_candidate()`, `call_stats()`, and the trigger that makes `last_verified_at` writable only by logging a call |
| `0003_rls.sql` | RLS on every table, `to authenticated` only, anon grants revoked, private storage buckets |
| `0004_anonymise_and_roles.sql` | `do_not_contact` anonymises instead of deleting; role changes restricted to exec |
| `0005_calculated_overall.sql` | Overall score calculated from weighted sub-scores per role; the assessor may move it by at most 0.5, with a reason |
| `0006_settings_and_jobs.sql` | Per-user notification preferences, last alerted health status for transition-only scarcity alerts, a `job_runs` audit table, and a guard so the last exec cannot be demoted |
| `0007_audit_fixes.sql` | Calendar days in EAT; calls record notice, start, shifts and recall dates; `log_call`, `undo_call`, `update_call_note`; the 48-hour no-answer cooldown for every layer; request requirements, outcomes and `placements`; `bench_contribution`; status and export guards; weights recalculating stored overalls; exec-only role settings and manual job runs |

**These have not been executed against a database.** They are reviewed SQL,
not verified SQL.

---

## Environment

The demo needs no environment variables. One is optional:

| Variable | Default | Effect |
|---|---|---|
| `NEXT_PUBLIC_BENCH_DEMO_MODE` | on | Set to `false` to turn off demo sign-in and signing in as someone else. Do this the day real sign-in lands; until then the portal has no other way in |

Who can do what, enforced in the data layer (and in `0007` for the database):

| Action | Who |
|---|---|
| Role targets, freshness windows, scoring weights, colours | Exec |
| Changing a staff member's role | Exec, and never the last exec |
| Running a scheduled job by hand | Exec. Weekly jobs send once per scheduled slot |
| Marking a request submitted, closing it, exporting a shortlist | Account manager or exec |
| Everything else: calls, assessments, shortlisting, archiving | Any signed-in staff member |
 The real build will need Supabase
(or Postgres) credentials, a Resend key and a cron secret. The service-role
key bypasses row level security entirely and must never reach the browser or
be committed.
