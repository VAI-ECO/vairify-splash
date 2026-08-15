# OPEN-QUESTIONS

**15 August 2026**

**REPLACES:** Nothing

**PURPOSE:** Open questions and blockers requiring owner decisions before proceeding.

---

## 1. Contact form table missing

**File:** `src/pages/Contact.tsx:86-93`

**Issue:** The contact form attempts to insert into a `contact_submissions` table that does not exist in the database.

**Code:**
```typescript
const { error } = await supabase!
  .from('contact_submissions')
  .insert([{
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
  }]);
```

**Current state:**
- Form is publicly accessible at `/contact`
- In mock mode (no env vars), form appears to succeed but writes nothing
- With database connected, this will fail with "relation does not exist"

**Questions:**
1. Should a `contact_submissions` table be created?
2. What fields should it have beyond name/email/subject/message?
3. What RLS policies should govern it?
4. Should submissions send an email notification to the team?
5. Alternative: Should contact form route to an external service (e.g., Formspree, Tally) instead?

**Recommendation:** Do not create `contact_submissions` table without specification. Either:
- Route contact form to external service
- Disable contact form until table spec is provided
- Create minimal table with explicit owner approval

**Blocked:** Contact form functionality

---

## Intake Check

1. **What subject does this cover?** Open questions and blockers requiring owner decisions
2. **Which existing files cover the same subject?** None (BACKEND_TODO.md covers implementation tasks, not open questions)
3. **Does this contradict any of them?** No
4. **What does this replace?** Nothing
5. **Replacing nothing?** Yes, this is a new file type for tracking blockers

---
