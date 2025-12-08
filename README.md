# Vairify Splash Page

Complete splash page for Vairify - The first V.A.I. platform where safety is FREE. Features 11 comprehensive pre-registration sections, post-registration flow, and full Supabase integration.

## Features

### Core Features
- **Video Carousel Hero**: 7 rotating videos with auto-advance every 20 seconds
- **Live Tier Counters**: Real-time spot availability for all three tiers
- **Countdown Timers**: Dynamic countdowns to registration opening and deadline
- **Tier Assignment**: Automatic assignment to the best available tier
- **Confirmation Modal**: Beautiful confirmation with tier details and coupon code
- **Real-time Updates**: Supabase real-time subscriptions for instant counter updates

### New Sections
- **Manifesto**: Dramatic text reveal explaining Vairify's mission
- **V.A.I. Explainer**: Interactive 4-step identity verification flow
- **7 Pillars of Protection**: Complete safety feature showcase
- **Roadmap Timeline**: 4-phase development timeline
- **Social Proof**: Live viewer counter + real-time signup notifications

### Design
- **Mobile Responsive**: Fully optimized for all device sizes
- **Dark Theme**: Sleek dark design with purple/pink gradients (#7c3aed to #ec4899)
- **Glassmorphism**: Modern glass-effect cards with backdrop blur
- **Smooth Animations**: Fade-in effects and transitions throughout

## Tech Stack

- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Tailwind CSS** for styling
- **Supabase** for backend (database + real-time subscriptions)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `supabase-schema.sql` in your Supabase SQL Editor
3. Copy your project URL and anon key

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the landing page.

### 5. Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## Tier Structure

### Founding Council (500 spots) 🔥
- Premium: **FREE FOREVER**
- Voting: Phase 1 & 2 + **Tiebreaker**
- Partner Coupon: **100% OFF**

### First Movers (2,500 spots) ⚡
- Premium: FREE 1 year, then **50% OFF FOREVER**
- Voting: Phase 1 & 2
- Partner Coupon: **50% OFF**

### Early Access (7,000 spots) 🚀
- Premium: FREE 6 months, then **20% OFF FOREVER**
- Voting: Phase 1 only
- Partner Coupon: **20% OFF**

## Database Schema

### `tier_counts` Table
Tracks available spots for each tier with real-time updates.

### `waitlist_signups` Table
Stores all signups with tier assignment and partner coupon codes.

### `get_available_tier()` Function
PostgreSQL function that automatically assigns the best available tier.

## Key Features

### Live Counters
The hero section displays real-time spot availability for the Founding Council tier. All tier cards show current signups vs. maximum capacity.

### Countdown Timers
Two separate countdown timers:
- Registration Opens: December 5, 2025
- Registration Deadline: January 7, 2026

### Smart Tier Assignment
When a user signs up:
1. System checks for duplicate email
2. Calls `get_available_tier()` to get best available tier
3. Generates unique coupon code (e.g., FC00001, FM00501, EA01001)
4. Updates tier count atomically
5. Shows beautiful confirmation modal

### Real-time Updates
Uses Supabase real-time subscriptions to update spot counters across all connected clients instantly.

## Customization

### Colors
Update the gradient colors in `tailwind.config.js`:

```js
colors: {
  'vairify-purple': '#7c3aed',
  'vairify-pink': '#ec4899',
}
```

### Countdown Dates
Modify the countdown dates in `LandingPage.tsx` (lines ~77-78):

```typescript
const regDate = new Date('2024-12-15T00:00:00').getTime();
const deadlineDate = new Date('2025-01-03T23:59:59').getTime();
```

### Tier Limits
Current limits: FC: 500, FM: 2,500, EA: 7,000. To adjust via SQL:

```sql
UPDATE tier_counts SET max_count = 1000 WHERE tier = 'founding_council';
UPDATE tier_counts SET max_count = 5000 WHERE tier = 'first_movers';
UPDATE tier_counts SET max_count = 10000 WHERE tier = 'early_access';
```

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard.

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

Add environment variables in Netlify dashboard.

## Support

For questions or issues, contact: support@vairify.com

## License

Proprietary - All rights reserved by Vairify
