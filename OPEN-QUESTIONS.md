# OPEN QUESTIONS

**15 August 2026**

---

## 1. Contact.tsx — contact_submissions table does not exist

**File:** `src/pages/Contact.tsx:86-93`

**Issue:** Contact form attempts to insert into `contact_submissions` table:

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

**Status:** Table does not exist in database.

**Questions:**
- Should we create this table?
- Should we use a different mechanism (email, third-party form service)?
- Should we remove the contact form entirely?

---

## 2. voting_commitment — collected but not in spec

**File:** `src/types/index.ts:27`

**Issue:** The `Reservation` interface includes `voting_commitment: boolean` field, but this appears in no specification.

**Questions:**
- What is this field for?
- Should it be collected?
- Should it be removed from the type?
- Is there documentation for this feature?

---
