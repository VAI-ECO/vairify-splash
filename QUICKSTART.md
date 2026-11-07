# Vairify Landing Page - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once created, go to **SQL Editor** in the sidebar
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click **Run** to create all tables and functions
5. Go to **Settings** → **API** and copy:
   - Project URL
   - Anon/Public key

### Step 2: Configure Environment

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 3: Install & Run

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` and you're live! 🎉

## 📊 Monitor Your Waitlist

### View Signups

```sql
SELECT * FROM waitlist_signups ORDER BY created_at DESC;
```

### Check Tier Counts

```sql
SELECT * FROM tier_counts;
```

### Export Signups

```sql
SELECT
  email,
  tier,
  tier_spot_number,
  partner_coupon_code,
  created_at
FROM waitlist_signups
ORDER BY tier_spot_number;
```

## 🔧 Common Customizations

### Change Countdown Dates

Edit `src/pages/LandingPage.tsx` (lines ~77-78):

```typescript
const regDate = new Date('2024-12-15T00:00:00').getTime();
const deadlineDate = new Date('2025-01-03T23:59:59').getTime();
```

### Adjust Tier Limits

Current: FC: 500, FM: 2,500, EA: 7,000. Run in Supabase SQL Editor to change:

```sql
UPDATE tier_counts SET max_count = 1000 WHERE tier = 'founding_council';
UPDATE tier_counts SET max_count = 5000 WHERE tier = 'first_movers';
UPDATE tier_counts SET max_count = 10000 WHERE tier = 'early_access';
```

### Reset Signups (Testing Only)

```sql
DELETE FROM waitlist_signups;
UPDATE tier_counts SET current_count = 0;
```

## 🎨 Styling Tips

All colors are in:
- `tailwind.config.js` - Theme colors
- `src/index.css` - Global styles
- `src/pages/LandingPage.tsx` - Component-specific gradients

## 📱 Mobile Testing

The page is fully responsive! Test on:
- iPhone: `http://your-local-ip:5173`
- Android: `http://your-local-ip:5173`

Find your local IP:
```bash
# Mac/Linux
ifconfig | grep "inet "

# Windows
ipconfig
```

## 🚀 Deploy

### Hetzner deployment

See [DEPLOY.md](DEPLOY.md) for the existing Hetzner deployment workflow.
Local development and production builds require only the project npm dependencies; no hosting CLI is required.

### Netlify

```bash
npm run build
```

Drag the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

## 🆘 Troubleshooting

**"Failed to fetch"**: Check your .env file has correct Supabase credentials

**Tier counters not updating**: Make sure Row Level Security policies are enabled in Supabase

**Signup not working**: Check browser console for errors, verify Supabase tables exist

## 📧 Need Help?

- Check the full README.md for detailed documentation
- Review the Supabase dashboard for database issues
- Inspect browser console for frontend errors

---

Built with ❤️ for Vairify
