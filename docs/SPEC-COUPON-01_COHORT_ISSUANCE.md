# SPEC-COUPON-01 — COHORT COUPON ISSUANCE

⚠️ **SUPERSEDES: NONE**

**15 August 2026. Owner ruling. ⚠️⚠️ NEEDED NOW — the splash page is registering.**

---

# 1 — ⚠️⚠️ THE SEPARATION

> ⚠️⚠️ **VAIRIFY RECEIVES A LIST OF STRINGS AND NOTHING ELSE.**

| | ChainPass | Vairify |
|---|---|---|
| **Generates the codes** | ✅ | ❌ |
| ⚠️⚠️ **HOLDS THE VALUE** | ✅ | ⚠️⚠️ **NEVER** |
| **Validates at redemption** | ✅ | ❌ |
| **Assigns a code to a person** | ❌ | ✅ |

⚠️ **Vairify hands over a code. It never knows what it is worth, never validates it, never
redeems it.** ✅ **This is what keeps `A3` intact — no V.A.I. price anywhere in Vairify.**

---

# 2 — ⚠️ THE THREE BATCHES

**Generated once, at ChainPass.**

| Cohort | Count | Value | ⚠️ Vairify sees |
|---|---|---|---|
| **Founding Council** | **100 — hard stop** | 100% | ⚠️ **the cohort label only** |
| **First Movers** | 2,900 | 50% | ⚠️ **the cohort label only** |
| **Early Access** | 7,000 | 25% | ⚠️ **the cohort label only** |

⚠️⚠️ **EXPORT THREE CSVs OF CODES ONLY. NO VALUES IN THE EXPORT.**

---

# 3 — ⚠️ WHAT VAIRIFY STORES

**One table. Four fields that matter.**

```
code          the string, from the CSV
cohort        founding_council | first_movers | early_access
issued_to     null until assigned
issued_at     null until assigned
```

⚠️⚠️ **NO PERCENTAGE. NO DOLLAR VALUE. NO REDEMPTION STATE.** **Redemption happens at
ChainPass and Vairify is never told.**

---

# 4 — ⚠️⚠️ THE COUNT IS THE ENFORCEMENT

> ⚠️⚠️ **100 CODES MEANS THE FOUNDING COUNCIL CANNOT EXCEED 100, WHATEVER ANY SCREEN SAYS.**

⚠️ **The hard stop becomes a fact in the database rather than a rule someone has to
remember.** **When a cohort's codes run out, that cohort is full and the next registration
falls to the cohort below.**

---

# 5 — ⚠️⚠️ THE ATOMIC TAKE — THE ONE HARD PART

> ⚠️⚠️ **TWO PEOPLE REGISTERING IN THE SAME SECOND MUST NOT GET THE SAME CODE.**

**Select the next unissued row for that cohort, lock it, stamp it — ONE operation.**

⚠️⚠️ **DONE WRONG IT LOOKS FINE IN TESTING AND BREAKS ON LAUNCH NIGHT WHEN A HUNDRED PEOPLE
REGISTER AT ONCE.**

⚠️ **A read-then-write in application code is wrong.** ⚠️ **A `SELECT ... FOR UPDATE SKIP
LOCKED` or an equivalent single statement is right.**

---

# 6 — ⚠️⚠️ THE SPLASH PAGE — WHERE THIS ACTUALLY HAPPENS

> ⚠️ **"We have a splash page that's registering that's going to issue these coupons via
> email."**

```
1  She registers on the splash page          email
        ↓
2  ⚠️ COHORT DECIDED BY COUNT                which codes remain
        ↓
3  ⚠️⚠️ ATOMIC TAKE — next unissued code for that cohort   §5
        ↓
4  ⚠️ STAMPED TO HER                          §7 — to WHAT?
        ↓
5  ⚠️ EMAILED TO HER
        ↓
6  She takes it to ChainPass at enrolment
        ↓
7  ChainPass validates, applies the value, marks it redeemed
```

⚠️ **`20251201_splash_reservations.sql` already exists. The new schema must carry this
forward, not reinvent it.**

---

# 7 — ⚠️⚠️ THE RISK, STATED PLAINLY

> ⚠️⚠️ **AT THE SPLASH PAGE, AN EMAIL ADDRESS IS NOT A PERSON.**

⚠️ **A V.A.I. does not exist yet — she has not enrolled.** **So the code is stamped to an
email, and one person with a hundred email addresses can take the entire Founding Council.**

⚠️⚠️ **THE 100 HARD STOP BECOMES 100 EMAIL ADDRESSES, NOT 100 PEOPLE.**

**And a code emailed at splash is a code that may never be used — burned by someone who never
enrols, while a real member is pushed into the cohort below.**

## 7.1 — ⬜ Three ways to close it. Owner rules.

| | | |
|---|---|---|
| **A** | ⚠️ **RESERVE AT SPLASH, ISSUE AT ENROLMENT** | **The email holds a place in the cohort. The code is generated when she has a V.A.I.** ⚠️ **Nothing is burned by a no-show.** |
| **B** | **Issue at splash with an expiry** | **Unredeemed codes return to the pool after N days.** **Simpler, but a real member can lose her place to a squatter for N days.** |
| **C** | **Issue at splash, accept the loss** | **Fastest. ⚠️ A hundred throwaway addresses take the whole Council.** |

⚠️ **My instruction is A.** **It costs one extra step and it is the only one where the hard
stop means people.**

---

# 8 — ⬜ OPEN

| # | | Blocks |
|---|---|---|
| 1 | ⚠️⚠️ **A, B or C** — §7.1 | **The splash mechanic** |
| 2 | **Does she see the code at registration, or is it applied automatically at ChainPass?** | The email copy |
| 3 | **One coupon, one redemption — or can a batch code be multi-use?** | The ChainPass table |

---

**Last updated:** 15 August 2026
