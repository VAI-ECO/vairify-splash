# Vairify Splash Page - Setup Guide

This guide covers the complete setup for the newly built Vairify splash page with all 11 sections, post-registration flow, and Supabase integration.

## What's Built

### ✅ Complete Features List

- **11 Pre-registration Sections**:
  1. Hero with animated background
  2. The Pain (emotional resonance)
  3. 7 Pillars of Protection Carousel
  4. Free Bomb (animated price reveal)
  5. Premium Features Carousel
  6. Business Packages
  7. Little Things (24 micro-features grid)
  8. We Built The Whole Thing (hybrid approach explanation)
  9. Real Decisions (governance voting preview)
  10. Tiers + 24-Hour Rule
  11. Final CTA with registration form

- **Post-Registration Flow**:
  - Spot Reserved screen with 24-hour countdown
  - Registration Complete screen with referral link

- **Reusable Components**:
  - Carousel (responsive, touch-enabled)
  - VideoModal (ready for real videos)
  - CountdownTimer (24-hour window tracking)
  - SpotCounter (real-time availability)
  - StickyCTA (scroll-triggered floating button)

- **Supabase Integration**:
  - Reservations table with auto-assignment
  - Decisions & Votes tables for governance
  - Helper functions for CRUD operations

## Quick Start

### 1. Install Dependencies

```bash
cd vairify-splash
npm install
```

### 2. Set Up Supabase

Create a new Supabase project and run this SQL:

```sql
-- Reservations Table
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  tier TEXT NOT NULL DEFAULT 'founding-council',
  position INTEGER,
  reserved_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  registration_completed BOOLEAN DEFAULT FALSE,
  first_vote_cast BOOLEAN DEFAULT FALSE,
  locked_in BOOLEAN DEFAULT FALSE,
  referral_code TEXT UNIQUE,
  referred_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-assign position and expiration
CREATE OR REPLACE FUNCTION assign_position()
RETURNS TRIGGER AS $$
BEGIN
  NEW.position := (SELECT COALESCE(MAX(position), 0) + 1 FROM reservations WHERE tier = NEW.tier);
  NEW.expires_at := NEW.reserved_at + INTERVAL '24 hours';
  NEW.referral_code := 'FC-' || SUBSTRING(MD5(NEW.email || NOW()::TEXT) FOR 8);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_position
BEFORE INSERT ON reservations
FOR EACH ROW EXECUTE FUNCTION assign_position();

-- Decisions Table
CREATE TABLE decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  context TEXT NOT NULL,
  options JSONB NOT NULL,
  tension TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  closes_at TIMESTAMPTZ
);

-- Votes Table
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  decision_id UUID REFERENCES decisions(id),
  user_email TEXT NOT NULL,
  selected_option TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(decision_id, user_email)
);

-- Enable RLS (adjust policies as needed)
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Basic policies for development
CREATE POLICY "Public can view reservation count" ON reservations FOR SELECT USING (true);
CREATE POLICY "Public can insert reservations" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view decisions" ON decisions FOR SELECT USING (status = 'active');
CREATE POLICY "Public can insert votes" ON votes FOR INSERT WITH CHECK (true);
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:5173

## Project Structure

```
src/
├── components/
│   ├── Carousel.jsx           # Reusable carousel (7 Pillars & Premium)
│   ├── VideoModal.jsx         # Video player overlay
│   ├── CountdownTimer.jsx     # 24-hour countdown
│   ├── SpotCounter.jsx        # Remaining spots display
│   └── StickyCTA.jsx          # Sticky floating CTA
│
├── sections/
│   ├── Hero.jsx               # Section 1: Main hero
│   ├── ThePain.jsx            # Section 2: Problem statement
│   ├── SevenPillars.jsx       # Section 3: 7 Pillars carousel
│   ├── FreeBomb.jsx           # Section 4: Price reveal
│   ├── Premium.jsx            # Section 5: Premium features
│   ├── Businesses.jsx         # Section 6: Business packages
│   ├── LittleThings.jsx       # Section 7: 24 micro-features
│   ├── WeBuiltIt.jsx          # Section 8: Hybrid approach
│   ├── RealDecisions.jsx      # Section 9: Governance preview
│   ├── Tiers.jsx              # Section 10: Tier comparison
│   ├── FinalCTA.jsx           # Section 11: Registration form
│   ├── SpotReserved.jsx       # Post-reg: Countdown screen
│   └── RegistrationComplete.jsx # Post-reg: Success screen
│
├── data/
│   └── pillars.js             # All content data
│
├── lib/
│   └── supabase.js            # Supabase client & helpers
│
├── App.jsx                    # Main app (routing logic)
├── main.jsx                   # Entry point
└── index.css                  # Global styles + fonts
```

## Design System

**Colors** (defined in `tailwind.config.js`):
```js
background: '#0a0a0f'    // Near black
card: '#1a1a2e'          // Dark card bg
accent: '#00d4aa'        // Teal (primary CTA)
gold: '#ffd700'          // Gold (secondary accent)
textPrimary: '#ffffff'
textSecondary: '#a0a0a0'
danger: '#ff4444'        // Urgency/warnings
```

**Fonts** (loaded in `index.css`):
- **Inter** (400, 700) - Headlines & body
- **JetBrains Mono** (400, 700) - Numbers & code

**Spacing**:
- Section padding: `py-20 px-6`
- Max width: `max-w-6xl mx-auto` (or `max-w-7xl` for carousels)
- Card padding: `p-6` to `p-8`

## Adding Real Videos

Currently using placeholder graphics. To add real videos:

1. **Add video files** to `public/videos/`:
   ```
   public/videos/pillar-1.mp4
   public/videos/pillar-2.mp4
   ...
   public/videos/premium-vairify-now.mp4
   etc.
   ```

2. **Add thumbnails** to `public/thumbnails/`:
   ```
   public/thumbnails/pillar-1.jpg
   public/thumbnails/premium-1.jpg
   etc.
   ```

3. **Update data** in `src/data/pillars.js` (paths already set, just add files)

4. **Enable video player** in `src/components/VideoModal.jsx`:
   - Uncomment the `<video>` element (line ~48)
   - Comment out the placeholder div

## Key Features Explained

### 24-Hour Window

When a user submits their email:
1. **Reservation created** in Supabase with position # and expiration time
2. **Countdown starts** - 24 hours to complete registration + first vote
3. **Spot expires** if not locked in within window
4. **Position released** to next person in queue

The `CountdownTimer` component:
- Updates every second
- Changes color when < 1 hour remaining (red)
- Triggers `onExpire` callback when timer hits zero

### Spot Counter

Shows "XXX of 500 Founding Council spots remaining"

- Fetches real-time count from Supabase
- Color-coded urgency:
  - Green (accent) when > 50 remaining
  - Gold when < 50 remaining
  - Red (danger) when < 10 remaining
- Pulsing animation for visual emphasis

### Referral System

Each reservation gets a unique code (e.g., `FC-A1B2C3D4`):
- Displayed on Registration Complete screen
- Used in referral link: `vairify.com/join/FC-A1B2C3D4`
- Generates 10% lifetime revenue share

### Decision Voting

Founding Council members vote on platform decisions:
- Questions stored in `decisions` table
- Votes stored in `votes` table
- User's first vote marks them as "locked in"

Example decisions:
- Should providers import existing reviews?
- Should bad reviews ever expire?

## Customization

### Change Copy

All copy is in plain text in section files. Edit directly:
- `src/sections/*.jsx` - All 11 sections
- `src/data/pillars.js` - Pillar & premium feature descriptions

### Change Colors

Edit `tailwind.config.js`:
```js
colors: {
  accent: '#your-color',
  gold: '#your-color',
  // etc.
}
```

### Change Tier Limits

Currently: 500 Founding Council spots

To change, update in:
- `src/components/SpotCounter.jsx` (line 4)
- Supabase tier logic if using multiple tiers

### Change Timings

**24-hour window**: Hardcoded in SQL trigger (can adjust)
**Carousel auto-advance**: Disabled by default (user controls)

## Deployment to Vercel

### Option 1: GitHub Integration (Recommended)

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/Brians-dev/vairify-splash.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow prompts, add env vars when asked.

## Testing Checklist

Before deploying:

- [ ] Supabase tables created successfully
- [ ] Environment variables set correctly
- [ ] Dev server runs without errors (`npm run dev`)
- [ ] All 11 sections render properly
- [ ] Carousel navigation works (arrows + dots)
- [ ] Email submission creates reservation
- [ ] Spot counter updates in real-time
- [ ] Countdown timer displays correctly
- [ ] StickyCTA appears after scrolling
- [ ] Mobile responsive (test on phone)
- [ ] Video modal opens/closes smoothly
- [ ] All CTAs scroll to registration form

## Troubleshooting

**"Cannot find module" errors**
- Run `npm install` again
- Check that all imports use `.jsx` extension

**Supabase connection fails**
- Verify `.env` file exists and has correct values
- Check Supabase project is active
- Ensure RLS policies allow public access (for dev)

**Carousel not showing items**
- Check `src/data/pillars.js` exports correctly
- Verify data structure matches expected format

**Countdown timer shows NaN**
- Ensure `expiresAt` prop is valid ISO date string
- Check browser console for errors

## Next Steps

1. **Add real videos** (see "Adding Real Videos" section)
2. **Test registration flow** end-to-end
3. **Set up email notifications** (for new reservations)
4. **Create admin dashboard** (to view reservations)
5. **Add analytics** (Vercel Analytics, Google Analytics, etc.)
6. **Configure custom domain** in Vercel
7. **Set up monitoring** (Sentry, LogRocket, etc.)

## Production Checklist

Before launch:

- [ ] Real videos uploaded and tested
- [ ] Supabase RLS policies reviewed (security)
- [ ] Email validation implemented
- [ ] Rate limiting on reservations
- [ ] Error handling for failed submissions
- [ ] Loading states for async operations
- [ ] SEO meta tags optimized
- [ ] OpenGraph images added
- [ ] Favicon updated
- [ ] Privacy policy & terms links work
- [ ] Tested on multiple devices/browsers
- [ ] Performance optimized (Lighthouse score > 90)

---

**Questions?**
Check the main README.md or create an issue on GitHub.

**Built with:** React + Vite + Tailwind + Supabase + Framer Motion
