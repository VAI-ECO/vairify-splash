# RULES-REPO-01 — REPOSITORY INTAKE

**15 August 2026. Owner ruling, spoken. Standing rule.**

> ⚠️⚠️ **"THE REPO IS THE FINAL, FINAL THING OF TRUTH. IF WE CONTAMINATE IT, THERE IS NO
> REPO."**

---

# 1 — ⚠️⚠️ THE RULE

⚠️⚠️ **NOTHING ENTERS THE REPOSITORY WITHOUT A SUPERSESSION CHECK FIRST.**

**Before any document is committed, three questions are answered in writing:**

| # | Question |
|---|---|
| 1 | ⚠️ **Does a file already exist that covers this subject?** |
| 2 | ⚠️ **Does this contradict anything already in the repo?** |
| 3 | ⚠️⚠️ **WHAT DOES THIS REPLACE?** |

⚠️ **If the answer to 3 is anything other than "nothing," the replaced file is DELETED in the
same commit.** ❌ **Never left alongside.**

---

# 2 — ⚠️ WHY THIS RULE EXISTS

**The pattern, observed repeatedly:**

| # | |
|---|---|
| 1 | ⚠️ **`design/screens/` holds `Vairify Profile.html` AND `Vairify Profile.dc.html`.** **Nine files in two versions.** **Only the README says which is current.** |
| 2 | ⚠️ **`Vairify VAI-CHECK Mismatch.dc.html` carries four struck lines and is marked delete — and sits in the folder anyway.** |
| 3 | ⚠️⚠️ **`MIGRATION_ORDER.txt` CLAIMED "VERIFIED CLEAN RUN: ALL 54 MIGRATIONS SUCCEED."** **The push failed at the second file. Somebody wrote a verification claim they had not run.** |
| 4 | ⚠️ **`docs/SCHEMA-INVENTORY.md` describes `user_id` keying as fact. `SPEC-CP-02` rules it wrong.** **Neither says so.** |
| 5 | ⚠️ **Pilot and remix — two baseline schemas, both in the folder, both claiming to be first.** |

> ⚠️⚠️ **TWO FILES STATING OPPOSITE THINGS IS NOT A DISAGREEMENT. IT IS A COIN FLIP FOR
> WHOEVER READS FIRST.**

⚠️ **A README naming the current file is not enough. Nobody reads the README first.**

---

# 3 — ⚠️ WHAT EVERY DOCUMENT CARRIES, AT THE TOP

```
DATE
REPLACES:   [filename, or "nothing"]
SUPERSEDED BY:  [added when it is replaced — never deleted silently]
```

⚠️⚠️ **A FILE THAT REPLACES SOMETHING SAYS SO IN ITS OWN TEXT, NOT ONLY IN AN INDEX.**
**Indexes go stale. The file travels with itself.**

---

# 4 — ⚠️ WHEN A FILE IS SUPERSEDED

| ✅ Do | ❌ Never |
|---|---|
| **Delete it in the same commit that adds the replacement** | ❌ **Leave it "for reference"** |
| **Name it in the new file's REPLACES line** | ❌ **Rename it with `-old` or `-v1`** |
| **Let git hold the history — that is what git is for** | ❌ **Keep it because deleting feels risky** |

⚠️ **Git has every version ever committed. Nothing is lost by deleting. Everything is at risk
by keeping.**

## 4.1 — ⚠️ The one exception, and it must be labelled

⚠️ **A file kept deliberately as evidence** — like `VAI-CHECK Mismatch`, held so an audit can
be checked against it — **carries a first line saying so:**

```
⚠️ DO NOT BUILD FROM THIS FILE. Held as evidence only. Superseded by [x].
```

⚠️⚠️ **IF IT DOES NOT SAY THAT IN ITS OWN FIRST LINE, IT IS NOT AN EXCEPTION. IT IS
CONTAMINATION.**

---

# 5 — ⚠️ THE INTAKE CHECK, RUN BEFORE EVERY COMMIT OF A DOCUMENT

**Any agent committing a document runs this and reports the answer:**

```
1. What subject does this cover?
2. Which existing files cover the same subject? Name them.
3. Does this contradict any of them? Quote both sides.
4. What does this replace? Delete it in this commit.
5. If it replaces nothing, say so explicitly.
```

⚠️⚠️ **A COMMIT THAT ADDS A DOCUMENT AND ANSWERS NONE OF THESE IS INCOMPLETE.**

---

# 6 — ⚠️ PERIODIC AUDIT

⚠️ **The intake check catches what arrives. It does not catch what is already there.**

**Run a conflict audit at every checkpoint:**

| # | Look for |
|---|---|
| 1 | **Two files describing the same thing differently** |
| 2 | **The same subject under two filenames** |
| 3 | **A file superseded by another that says so nowhere in its own text** |
| 4 | ⚠️ **A README or index that contradicts the file it points at** |
| 5 | ⚠️ **Any file claiming a result nobody observed** — `MIGRATION_ORDER.txt` §2 item 3 |

---

# 7 — ⚠️⚠️ THE STANDARD

> ⚠️ **The repo is not a folder. It is the answer to "what is true."**

⚠️ **A person who reads only the repo, and nothing else, must arrive at the correct picture.**
**If two files can send them two directions, the repo has failed regardless of which one is
right.**

---

**Last updated:** 15 August 2026
