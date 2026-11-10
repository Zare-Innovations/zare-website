# Zare v3 — Content Checklist

Everything the build is waiting on. Owned by Zare, not the developer. Each item
names what blocks, what ships if it never arrives, and when it is needed.

Nothing here blocks the build. Every slot has a working fallback already
implemented. The fallbacks are honest, and several of them are good — but each
one is weaker than the real thing.

---

## Blocking before public launch

| # | Item | Blocks | Fallback in place | Needed by |
|---|---|---|---|---|
| 1 | **Rotate the Resend API key.** Removed from the tree in M0 but still live in git history at `a78a3ca`. | Contact flow | Contact form returns 503. Deliberate. | **Now** |
| 2 | **Plausible account + script.** Approved; not implemented. | Analytics baseline | None. **The baseline is unrecoverable after launch.** | Before M3 ships publicly |
| 3 | **Clutch profile URL.** | Trust strip | Rating renders unlinked. An unlinked rating is an assertion; a linked one is evidence. | Launch |
| 4 | **Root metadata rewrite.** Default description still says "talent outsourcing" and keywords contain the typo `Offshore Talen`. | Every page | Old copy inherited. Contradicts the new category. | Launch |
| 5 | **Client display permissions.** Which of the 12 named clients may be shown. | Trust strip | All 12 render as text with engagement shape. No logos anywhere yet. | Launch |

---

## Blocking specific sections

| # | Item | Blocks | Fallback in place |
|---|---|---|---|
| 8 | **Joveo outcome approval.** Marked `CLIENT APPROVAL REQUIRED` in the CTO prototype. | Promotion to featured case | Held in `workReferences` with only verifiable facts and no outcome claim. |
| 9 | **Replacement policy, notice period, trial duration.** | S3 highlights, S6 | `Risk-free trial on every placement` renders without terms. Vague where it should be concrete. |
| 10 | **Step 02 communication standard.** What "Communication assessment" actually measures. | S5 embed track | Step renders with its label only. |
| 11 | **Average placement tenure.** Not the maximum. | S4 results | Currently shows `12+ mo longest engagement`, a maximum. A maximum says what is possible; an average says what is likely, and churn is the embedded buyer's primary fear. |
| 12 | **Platform uptime figure.** | S4 results | Ships as a dimmed `[—]` placeholder. Keep it if the number is not solid: the admitted gap is what makes the other three believable. |
| 13 | **Tenasol and KEFI Gold & Copper engagement shape.** | Trust strip | Held in `pendingClients`, not rendered. A bare name with no context is the pattern we are avoiding. |
| 14 | **Team photography, founder portrait, leadership portraits.** | S7, `/about` | `PersonCard` degrades to initials. Photography is the anti-imitation device; initials are not. |
| 15 | **Named engineer consent.** One or two, with stack and shipped work. | S7 | Leadership only. Forfeits the strongest differentiator available: most competitors structurally cannot show who does the work. |
| 16 | **Founder quote approval.** | S7 | Suppressed by the data model when unapproved. Section renders without it. |
| 17 | **Working hours and timezone overlap policy.** | S6 | UTC+3 statable; the overlap commitment is not. |

---

## Rules that govern every item above

- A visible gap is a trust signal. A smoothed-over gap is a liability.
- Never invent specificity. One filler sentence discredits every real claim
  on the page.
- If a client cannot be named, say so and explain why.
- Every number carries its basis, or renders as a labelled placeholder.
- No SOC 2, ISO or GDPR badges. Not certified.
