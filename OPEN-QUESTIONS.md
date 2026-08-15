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

## 2. voting_commitment field removed without specification

**File:** `src/components/sections/ReservationForm.tsx` (original line 128, also lines 16, 24, 43, 78, 93-94, 229-250)

**Original behavior:**
- Boolean checkbox field shown conditionally for Founding Council and First Movers tiers only
- Required field validation: user must check the box to proceed with those tiers
- Sent to database as `voting_commitment: formData.votingCommitment` (boolean value)
- Field was removed from UI and database submission when tier selection was replaced with RPC call (commit 62f8b77)

**Code removed:**
```typescript
// Line 78:
const needsVotingCommitment = formData.tier === 'founding_council' || formData.tier === 'first_mover';

// Lines 93-94 (validation):
if (needsVotingCommitment && !formData.votingCommitment) {
  newErrors.votingCommitment = t('form.fields.votingCommitment.required');
}

// Line 128 (sent to database):
voting_commitment: formData.votingCommitment,

// Lines 229-250 (UI):
{needsVotingCommitment && (
  <div className="...">
    <Checkbox
      label={t('form.fields.votingCommitment.label')}
      checked={formData.votingCommitment}
      onChange={(e) => setFormData(prev => ({ ...prev, votingCommitment: e.target.checked }))}
      error={errors.votingCommitment}
    />
    <div className="mt-3 text-sm">
      <span className="text-gray-500 dark:text-gray-400">
        {t('form.switchTier.prompt')}{' '}
      </span>
      <button type="button" onClick={switchToEarlyAccess} className="...">
        {t('form.switchTier.link')}
      </button>
    </div>
  </div>
)}
```

**Issue:** This field appears in no specification. It was tied to tier selection, which has been removed.

**Questions:**
1. Was voting_commitment intended to track Founding Council governance participation commitment?
2. Should this be tracked differently (e.g., separate step after cohort assignment)?
3. Does the reserve_spot RPC need to receive or track this commitment?
4. Is this commitment required before reservation, or before receiving benefits?

**Current state:** Field removed from form, validation, and database submission. No voting commitment is collected or stored during reservation.

**Recommendation:** If governance commitment tracking is required, specify:
- When it should be collected (reservation vs. later onboarding step)
- How it should be stored (reservations table vs. separate governance table)
- Whether it blocks reservation or only blocks benefit activation

---
