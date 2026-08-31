# STATE — vairify-splash

Read this first. Written so a seat arriving cold knows where it is without asking the owner a
question. If something here is wrong, fix this file in the same commit as the work.

**Last verified:** 31 Aug 2026

---

## What this repo is

The public Vairify splash / waitlist site. **A real application, not a static export** — Vite +
React 18 + TypeScript, Supabase for data, i18next for 30 languages.

Do not confuse it with the design-tool exports of the same page that the owner produces for
review. Those are flat HTML with no backend and dead buttons. **This repo is the live one and its
buttons work.**

| | |
|---|---|
| Remote | `VAI-ECO/vairify-splash` (public) |
| Container path | `/data/vai-workspaces/vairify-splash` |
| Mac path | `~/vai-workspaces/vairify-splash` |
| Branch | `main`, in sync |
| Build | `tsc && vite build` → `dist` |
| Deploys via | Vercel (`vercel.json`, `DEPLOY.md`) |
| Data | Supabase (`supabase-schema.sql`) |

---

## What works

- **Tier reservation.** `reserve_spot` RPC against Supabase, fixed at `206ee25` (the response is
  an array, not an object). This is the site's one real conversion path and it functions.
- 30-language switching via i18next.
- All 11 sections build and render.

## What is broken or missing

1. **The contact form writes to a table that does not exist.** `src/pages/Contact.tsx:86-93`
   inserts into `contact_submissions`; there is no such table. Every submission fails. Recorded in
   `OPEN-QUESTIONS.md` on 15 Aug and still open — the owner was asked whether to create the table,
   use a form service, or drop the form, and never answered.
   This is the same defect as the ChainPass signup form: a form the visitor believes worked.
   **Whatever is decided, it must not silently accept and discard.**

2. **The coupon system is specified and unbuilt.** See below. This is the largest open item.

---

## The coupon system — decided 15 Aug, not started

`docs/SPEC-COUPON-01_COHORT_ISSUANCE.md` is an **owner ruling**, marked *"NEEDED NOW — the splash
page is registering."* It has sat unbuilt for two weeks while reservations accumulate.

The separation is the whole point and must not be softened:

| | ChainPass | Vairify |
|---|---|---|
| Generates the codes | yes | no |
| **Holds the value** | yes | **never** |
| Validates at redemption | yes | no |
| Assigns a code to a person | no | yes |

**Vairify hands out a code and never learns what it is worth.** It never validates and never
redeems. That is what keeps rule `A3` intact — no V.A.I. price appears anywhere in Vairify.

Three batches, generated once at ChainPass, exported as three CSVs of codes only, **no values in
the export**:

| Cohort | Count | Value | What Vairify sees |
|---|---|---|---|
| Founding Council | 100 — hard stop | 100% | the cohort label only |
| First Movers | 2,900 | 50% | the cohort label only |
| Early Access | 7,000 | 25% | the cohort label only |

Read the spec in full before building any of it. Do not infer the parts not quoted here.

---

## Docs in this repo

| File | What it is |
|---|---|
| `docs/SPEC-COUPON-01_COHORT_ISSUANCE.md` | Owner ruling, 15 Aug. Unbuilt. |
| `docs/RULES-01_SESSION_START_CLAUDE_CODE.md` | How a session starts here |
| `docs/RULES-REPO-01_INTAKE.md` | Intake rule for this repo |
| `OPEN-QUESTIONS.md` | Unanswered owner questions, 15 Aug. Item 1 still open. |
| `DEPLOY.md` | Vercel deploy steps |
| `supabase-schema.sql` | The schema as it should be |

Read `docs/RULES-01` and `docs/RULES-REPO-01` before writing. They are this repo's own rules and
they outrank general habit.

---

## Rules for working here

- **This is an app with a build.** `npm run build` must pass before anything is called done.
- **Supabase changes are schema changes.** Irreversible against live data — §18 tests 1 and 5.
  Escalate rather than deciding.
- **The coupon separation is not negotiable.** Any change that lets Vairify learn a code's value
  breaks the ruling. Stop and escalate instead.
- **No form may accept and discard.** If a submission cannot be stored, the visitor is told.
- **Done means pushed.** `git commit` exiting 0 proves bytes reached local disk and nothing else
  (§19).
