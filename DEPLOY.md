# Deployment Instructions

Your Vairify splash page is ready to deploy! Here are your options:

## ✅ What's Ready

- ✅ All code built and tested
- ✅ Git repository initialized
- ✅ Initial commit created
- ✅ Development server tested successfully
- ✅ All 11 sections working
- ✅ Supabase integration configured

## Option 1: Deploy with Vercel CLI (Fastest)

From the project directory:

```bash
cd /Users/bmac/vairify-splash
vercel
```

Follow the prompts:
1. Set up and deploy? **Y**
2. Which scope? Select your account
3. Link to existing project? **N**
4. What's your project name? `vairify-splash` (or press Enter)
5. In which directory is your code? `.` (press Enter)
6. Want to override settings? **N**

Then add environment variables:
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

Finally, deploy to production:
```bash
vercel --prod
```

Your site will be live at: `https://vairify-splash.vercel.app`

## Option 2: Deploy via GitHub + Vercel Dashboard

### Step 1: Push to GitHub

If you want to use the existing repo at `github.com/Brians-dev/vairify-splash`:

```bash
git remote add origin https://github.com/Brians-dev/vairify-splash.git
git branch -M main
git push -u origin main --force
```

> **Note**: Using `--force` will overwrite the existing repo. Remove it if you want to merge instead.

Or create a new repo:

```bash
gh repo create vairify-splash-new --public --source=. --remote=origin
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Select "Import Git Repository"
3. Find `vairify-splash` in your GitHub repos
4. Click "Import"
5. Configure:
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add Environment Variables:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
7. Click "Deploy"

## Before Deploying - Supabase Setup

Make sure your Supabase project is ready:

### 1. Create Tables

Run the SQL from `SETUP.md` in your Supabase SQL Editor:
- `reservations` table
- `decisions` table
- `votes` table
- Auto-assignment trigger

### 2. Enable Row Level Security

The SQL in SETUP.md includes basic RLS policies. For production:

```sql
-- Tighten security
-- Only allow reads for public, require auth for writes
-- Adjust based on your security requirements
```

### 3. Get Your Credentials

From Supabase Project Settings > API:
- Copy **Project URL** (e.g., `https://abc123.supabase.co`)
- Copy **anon/public** key (long string starting with `eyJ...`)

## After Deployment

### 1. Test the Live Site

- [ ] Visit your deployment URL
- [ ] Scroll through all 11 sections
- [ ] Click carousel navigation
- [ ] Submit test email in registration form
- [ ] Verify spot counter updates
- [ ] Check countdown timer works
- [ ] Test on mobile device

### 2. Verify Supabase Connection

- [ ] Open Supabase dashboard
- [ ] Go to Table Editor > `reservations`
- [ ] Check for your test registration
- [ ] Verify position auto-assigned
- [ ] Check referral code generated

### 3. Configure Custom Domain (Optional)

In Vercel project settings:
1. Domains > Add Domain
2. Enter your domain (e.g., `vairify.com`)
3. Follow DNS configuration instructions

### 4. Set Up Monitoring (Recommended)

- **Vercel Analytics**: Enable in project settings (free)
- **Sentry**: For error tracking
- **Google Analytics**: Add to `index.html`

## Troubleshooting

### Build Fails on Vercel

**Error**: "Cannot find module '@supabase/supabase-js'"
- **Fix**: Ensure `package.json` includes all dependencies
- Run `npm install` locally first
- Push updated `package-lock.json`

**Error**: "Environment variable not set"
- **Fix**: Add env vars in Vercel dashboard
- Redeploy after adding them

### Site Loads But Supabase Doesn't Work

- Check browser console for errors
- Verify env vars are set correctly (no quotes, no spaces)
- Ensure Supabase tables exist
- Check RLS policies allow public access

### Countdown Timer Shows NaN

- This is expected without a real reservation
- Submit test email to create reservation
- Timer will display properly after submission

## Production Checklist

Before announcing to users:

- [ ] All sections reviewed for typos
- [ ] Real videos uploaded (currently showing placeholders)
- [ ] Supabase security policies reviewed
- [ ] Email validation added
- [ ] Rate limiting configured
- [ ] Error handling tested
- [ ] Loading states added
- [ ] SEO meta tags optimized
- [ ] Favicon replaced
- [ ] Privacy policy linked
- [ ] Terms of service linked
- [ ] Performance tested (Lighthouse score > 90)
- [ ] Cross-browser tested (Chrome, Safari, Firefox)
- [ ] Mobile tested (iOS, Android)

## Quick Reference

**Project Location**: `/Users/bmac/vairify-splash`

**Key Commands**:
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
vercel               # Deploy to Vercel
vercel --prod        # Deploy to production
```

**Environment Variables**:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Documentation**:
- `README.md` - Overview
- `SETUP.md` - Detailed setup guide
- `DEPLOY.md` - This file

---

## Ready to Deploy?

Choose your method:

**Quick Deploy**: `vercel --prod` (after `vercel` first time)

**GitHub Deploy**: Push to GitHub → Import to Vercel → Configure → Deploy

**Need Help?**
- Check SETUP.md for troubleshooting
- Review Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- Check Supabase docs: [supabase.com/docs](https://supabase.com/docs)

---

🚀 **Your splash page is ready to launch!**
