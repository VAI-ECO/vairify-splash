# Backend Implementation Checklist

This document outlines the backend work required to take the Founding Council finalization flow from frontend-only stubs to production-ready.

## Overview

The voting flow is currently **frontend-only** with stub implementations in `src/lib/governance.ts`. All components are structured to work with the backend once these tasks are complete—**no component changes required**.

---

## 1. Database Schema

### Create Supabase Tables

#### `questions` table
Admin-managed governance questions.

```sql
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  prompt TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of option strings
  active BOOLEAN DEFAULT true,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_questions_active ON questions(active);
CREATE INDEX idx_questions_order ON questions(order_index);
```

**Columns:**
- `id` - UUID primary key
- `section` - Category label (e.g., "Platform Priorities")
- `prompt` - Question text
- `options` - JSON array of answer options (e.g., `["Yes", "No"]`)
- `active` - Only active questions appear in voting UI
- `order_index` - Display order
- `created_at`, `updated_at` - Timestamps

#### `votes` table
Stores user votes linked to their reservation.

```sql
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  reservation_email TEXT NOT NULL REFERENCES reservations(email) ON DELETE CASCADE,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure one vote per user per question
  UNIQUE(question_id, reservation_email)
);

CREATE INDEX idx_votes_question ON votes(question_id);
CREATE INDEX idx_votes_email ON votes(reservation_email);
```

**Columns:**
- `id` - UUID primary key
- `question_id` - Foreign key to `questions.id`
- `reservation_email` - Foreign key to `reservations.email` (for auth)
- `answer` - The selected answer (must match one of the question's options)
- `created_at` - Vote timestamp
- **UNIQUE constraint** - One vote per email per question (upsert on re-vote)

---

## 2. Implement Service Functions

Replace the stub implementations in `src/lib/governance.ts`:

### `getQuestions()`

```typescript
export async function getQuestions(): Promise<Question[]> {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('active', true)
    .order('section')
    .order('order_index');

  if (error) throw error;

  return data.map(q => ({
    id: q.id,
    section: q.section,
    prompt: q.prompt,
    options: q.options, // Already an array from JSONB
  }));
}
```

**Caching:** Consider caching questions with a reasonable TTL (e.g., 5 minutes) to reduce DB load.

### `submitVote(questionId, answer, reservationEmail)`

```typescript
export async function submitVote(
  questionId: string,
  answer: string,
  reservationEmail: string
): Promise<void> {
  // Upsert: insert or update if user changes their vote
  const { error } = await supabase
    .from('votes')
    .upsert(
      {
        question_id: questionId,
        reservation_email: reservationEmail,
        answer,
      },
      {
        onConflict: 'question_id,reservation_email',
      }
    );

  if (error) throw error;
}
```

**Auth:** Ensure `reservationEmail` comes from authenticated session (see section 5).

### `getResults(questionId)`

```typescript
export async function getResults(questionId: string): Promise<VoteResults[]> {
  // Fetch vote counts grouped by answer
  const { data, error } = await supabase
    .from('votes')
    .select('answer')
    .eq('question_id', questionId);

  if (error) throw error;

  // Count votes per option
  const counts = data.reduce((acc, vote) => {
    acc[vote.answer] = (acc[vote.answer] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalVotes = data.length;

  // Build results array
  return Object.entries(counts).map(([option, count]) => ({
    option,
    count,
    percentage: totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0,
  }));
}
```

**Caching:** Cache results with short TTL (e.g., 30 seconds) to reduce DB load while keeping data fresh.

### `hasVoted(questionId, reservationEmail)`

```typescript
export async function hasVoted(
  questionId: string,
  reservationEmail: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('votes')
    .select('id')
    .eq('question_id', questionId)
    .eq('reservation_email', reservationEmail)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}
```

---

## 3. Email Integration

Send coupon code to user after successful reservation.

### Options

1. **Supabase Edge Function** + Email provider (SendGrid, Postmark, Resend)
2. **Webhook** to external service (Zapier, Make)
3. **Database trigger** → Supabase Edge Function

### Recommended: Edge Function

**Function:** `send-reservation-email`

```typescript
// supabase/functions/send-reservation-email/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  const { email, coupon_code, tier, spot_number } = await req.json();

  // Send email via provider (e.g., SendGrid)
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('SENDGRID_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email }] }],
      from: { email: 'noreply@vairify.com' },
      subject: `Welcome to Vairify ${tier}!`,
      content: [{
        type: 'text/html',
        value: `
          <h1>You're in! Welcome to Vairify.</h1>
          <p>Your ${tier} spot #${spot_number} is reserved.</p>
          <p><strong>Your coupon code:</strong> ${coupon_code}</p>
        `,
      }],
    }),
  });

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
```

**Trigger:** Call this Edge Function after successful `reservations` insert (from frontend or via database trigger).

**Environment Variables:**
- `SENDGRID_API_KEY` (or equivalent for your provider)

---

## 4. Admin Panel

Build an admin interface to manage questions without touching code.

### Requirements

- **Auth:** Restrict to admin users only (Supabase RLS + admin role)
- **CRUD operations:** Create, edit, archive questions
- **Reordering:** Drag-and-drop to change `order_index`
- **Preview:** See how questions render in voting UI
- **Analytics:** View vote counts and percentages per question

### Suggested Stack

- Same React/TypeScript stack as main app
- Protected route: `/admin/questions`
- Supabase RLS policy:
  ```sql
  CREATE POLICY "Admin only can manage questions"
    ON questions FOR ALL
    USING (auth.jwt() ->> 'role' = 'admin');
  ```

---

## 5. Auth & Access Control

### Gate `/finalize` Route

Only allow verified Founding Council reservations.

#### Option A: Email-based auth (simple)

1. User reserves spot → receives email with magic link
2. Magic link contains signed token: `https://vairify.com/finalize?token=xyz`
3. Token verifies `reservation_email` + `tier=founding_council`
4. Frontend stores email in session

#### Option B: Supabase Auth (robust)

1. On reservation, create Supabase Auth user with same email
2. Send email verification link
3. `/finalize` requires authenticated session
4. Check `tier=founding_council` from `reservations` table

### Row-Level Security (RLS)

#### Questions (read-only for public)
```sql
CREATE POLICY "Anyone can view active questions"
  ON questions FOR SELECT
  USING (active = true);
```

#### Votes (users can only vote for themselves)
```sql
CREATE POLICY "Users can insert their own votes"
  ON votes FOR INSERT
  WITH CHECK (reservation_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can view their own votes"
  ON votes FOR SELECT
  USING (reservation_email = auth.jwt() ->> 'email');
```

---

## 6. Testing Checklist

- [ ] Questions table populated with initial questions
- [ ] Frontend fetches real questions from `getQuestions()`
- [ ] Vote submission inserts into `votes` table
- [ ] Results reflect actual vote counts
- [ ] One vote per user per question (UNIQUE constraint works)
- [ ] Email sent on reservation with coupon code
- [ ] `/finalize` route gated to Founding Council only
- [ ] Admin panel can add/edit/reorder questions
- [ ] RLS policies prevent unauthorized access

---

## 7. Migration Path

### Step 1: Database Setup
- Create `questions` and `votes` tables
- Set up RLS policies
- Seed initial questions (migrate from `foundingQuestions.ts`)

### Step 2: Implement Service Layer
- Replace stubs in `governance.ts` with Supabase queries
- Test each function in isolation

### Step 3: Email Integration
- Deploy Edge Function
- Test email sending on reservation

### Step 4: Auth & Gating
- Implement auth flow (magic link or Supabase Auth)
- Protect `/finalize` route

### Step 5: Admin Panel
- Build admin UI
- Deploy with admin-only access

### Step 6: Remove Frontend Warnings
- Delete "Development Note" blue box from `Finalize.tsx`
- Remove "Sample — live results" labels from `VotingQuestion.tsx`

---

## Notes

- All frontend code is ready—**no component changes required** after backend implementation
- Service layer (`governance.ts`) is the **only file that needs backend work**
- Keep `foundingQuestions.ts` as fallback/seed data
- Consider analytics: track vote trends, completion rates, popular answers
