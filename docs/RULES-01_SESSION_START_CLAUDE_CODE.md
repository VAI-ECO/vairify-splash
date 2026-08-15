# RULES-01 — LOAD THIS FIRST — CLAUDE CODE

⚠️ **SUPERSEDES: NONE**

**Paste this as the first message of every Claude Code session.**

---

# 1 — ⚠️⚠️ ABSOLUTE PROHIBITIONS

**No exceptions. No verification shortcuts. Not even to check something.**

| # | ❌ NEVER |
|---|---|
| 1 | ⚠️⚠️ **`ssh` · `scp` · `docker` · `psql` — ANY command reaching another machine.** **There is a live production database at the other end of the key on this laptop.** |
| 2 | ⚠️⚠️ **`supabase db reset`** — never suggest it, never run it |
| 3 | ⚠️ **`supabase db push` or `migration up` without my explicit instruction in this session.** ⚠️⚠️ **YOU WRITE MIGRATIONS. I RUN THEM.** |
| 4 | ⚠️ **Free-form SQL against any database** |
| 5 | ⚠️ **`git push --force` · rebase · amending a pushed commit** |
| 6 | ⚠️ **Touching `.env`, credentials, or deploy config** |
| 7 | ⚠️ **`npm audit fix`** — it upgrades majors and breaks the build |
| 8 | ⚠️ **Working outside this repository** |
| 9 | ⚠️ **Installing anything** without asking first |

---

# 2 — ⚠️⚠️ EVIDENCE, OR IT DID NOT HAPPEN

> ⚠️⚠️ **NEVER REPORT A RESULT YOU DID NOT SEE IN TOOL OUTPUT.**

| # | |
|---|---|
| 1 | ⚠️ **Every claim gets a FILE AND A LINE, or the command and its ACTUAL output.** |
| 2 | ⚠️ **If output is truncated, RE-RUN NARROWER.** |
| 3 | ⚠️⚠️ **AN INFERRED PASS IS A FABRICATION.** |
| 4 | ⚠️ **"I already did that" is not evidence.** ⚠️⚠️ **SHOW ME, DO NOT TELL ME — run the grep.** |
| 5 | ⚠️ **If something is ambiguous, WRITE DOWN THE AMBIGUITY.** Do not resolve it. |

## 2.1 — ⚠️ Why this rule exists

| # | |
|---|---|
| 1 | ⚠️ **`FaceScanProvider` was hardcoded to fail** — every door check to an unstaffed review |
| 2 | ⚠️ **`verify-complycube-biometric` returned `verified: true` unconditionally** |
| 3 | ⚠️⚠️ **`MIGRATION_ORDER.txt` claimed "VERIFIED CLEAN RUN: ALL 54 MIGRATIONS SUCCEED ON A FRESH EMPTY DATABASE."** **The push failed at the second file.** |
| 4 | ⚠️ **An RLS policy read `USING (true)` under a comment describing a token check** |

> ⚠️⚠️ **ALL FOUR LOOKED CORRECT. THE COMMENT, THE NAME AND THE CLAIM ALL SAID THE RIGHT
> THING.**

---

# 3 — ⚠️ HOW TO WORK

| # | |
|---|---|
| 1 | ⚠️ **Work on a branch. Never commit to `dev` or `main` directly.** |
| 2 | ⚠️ **COMMIT AFTER EVERY NUMBERED ITEM. Small commits. Never batch.** |
| 3 | ⚠️⚠️ **NEVER DELETE, SKIP, RENAME OR WEAKEN A TEST.** **If a test fails, fix the code. If you believe the test is wrong, STOP and leave a note.** |
| 4 | ⚠️ **Test counts may only go UP.** |
| 5 | ⚠️ **If an item needs a ruling, STOP that item**, write it to `/tmp/OPEN-QUESTIONS.md`, move to the next. |
| 6 | ⚠️ **Change only what the item names.** ❌ **No refactors, no tidying, no renames beyond the item.** |
| 7 | ⚠️⚠️ **WHEN THE QUEUE IS DONE, STOP. DO NOT FIND ADDITIONAL WORK.** |
| 8 | ⚠️ **Do not re-run work already done.** Check `docs/` first. |

---

# 4 — ⚠️⚠️ THE REPO IS THE ONLY TRUTH

> ⚠️ **"If we contaminate it, there is no repo."** — `docs/RULES-REPO-01_INTAKE.md`

**Before committing ANY document, answer in writing:**

```
1. What subject does this cover?
2. Which existing files cover the same subject? Name them.
3. Does this contradict any of them? Quote both sides.
4. What does this replace? DELETE IT IN THIS COMMIT.
5. If it replaces nothing, say so explicitly.
```

⚠️⚠️ **A SUPERSEDED FILE IS DELETED IN THE SAME COMMIT. NEVER LEFT ALONGSIDE. NEVER RENAMED
`-old` OR `-v1`.** **Git holds every version. Nothing is lost by deleting.**

---

# 5 — ⚠️ ARCHITECTURE — DO NOT VIOLATE THESE IN CODE

| # | |
|---|---|
| 1 | ⚠️⚠️ **VAIRIFY HOLDS NO FACE, NO VECTOR, NO PHOTO, NO LEGAL NAME.** **All face calls route to ChainPass.** |
| 2 | ⚠️⚠️ **NO PASSWORD ANYWHERE.** `signInWithPassword` and `resetPasswordForEmail` must return zero results. |
| 3 | ⚠️ **Vairify never sees or displays a confidence score.** |
| 4 | ⚠️⚠️ **THE V.A.I. IS THE IDENTITY, NOT `user_id`.** **A person can exist with no account.** |
| 5 | ⚠️⚠️ **TIER IS DERIVED FROM REQUIREMENTS. NEVER STORED.** |
| 6 | ⚠️ **ONE ADDRESS PER VALUE.** ⚠️ **Never store a computed figure — a price, a commission, a total.** |
| 7 | ⚠️ **`affiliate` is banned. Use `revenue sharing`.** "Commission" is permitted. |

---

# 6 — ⚠️ READ THESE BEFORE STARTING

| File | |
|---|---|
| **`docs/RULES-REPO-01_INTAKE.md`** | **Intake rule** |
| **`docs/SCHEMA-INVENTORY.md`** | **What the code actually queries. 2,751 lines.** |
| **`docs/SPEC-CP-02_CREDENTIAL_AND_PLATFORM_MODEL.md`** | **What the schema must get right** |
| **`design/briefs/DESIGN-BRIEF-25_MASTER_CHANGE_ORDER.md`** | **The specification** |
| **`design/README.md`** | ⚠️ **Which design files are current, which are stale** |

⚠️ **`design/text/` is plain text. Grep those, not the HTML.**

---

# 7 — ⚠️ AT THE END OF EVERY BLOCK

**Write a log. State:**

1. **What you completed, with the commit hash for each item.**
2. **What you stopped on and why.**
3. ⚠️ **Anything you changed that you are not confident about.**

⚠️ **Then stop. Do not push. Do not merge. Do not find more work.**

---

**Last updated:** 15 August 2026
