-- Vairify Waitlist Schema

-- Tier counts table
CREATE TABLE IF NOT EXISTS tier_counts (
  id SERIAL PRIMARY KEY,
  tier TEXT UNIQUE NOT NULL,
  current_count INTEGER DEFAULT 0,
  max_count INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial tier counts
INSERT INTO tier_counts (tier, current_count, max_count) VALUES
  ('founding_council', 0, 500),
  ('first_movers', 0, 2500),
  ('early_access', 0, 7000)
ON CONFLICT (tier) DO NOTHING;

-- Waitlist signups table
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  tier TEXT NOT NULL,
  tier_spot_number INTEGER NOT NULL,
  partner_coupon_code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  registered_in_app BOOLEAN DEFAULT FALSE
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_signups(email);

-- Create index on tier for analytics
CREATE INDEX IF NOT EXISTS idx_waitlist_tier ON waitlist_signups(tier);

-- Function to get next available tier
CREATE OR REPLACE FUNCTION get_available_tier()
RETURNS TABLE(tier_name TEXT, spot_number INTEGER) AS $$
DECLARE
  fc_count INTEGER;
  fm_count INTEGER;
  ea_count INTEGER;
BEGIN
  -- Get current counts
  SELECT current_count INTO fc_count FROM tier_counts WHERE tier = 'founding_council';
  SELECT current_count INTO fm_count FROM tier_counts WHERE tier = 'first_movers';
  SELECT current_count INTO ea_count FROM tier_counts WHERE tier = 'early_access';

  -- Determine available tier
  IF fc_count < 500 THEN
    RETURN QUERY SELECT 'founding_council'::TEXT, fc_count + 1;
  ELSIF fm_count < 2500 THEN
    RETURN QUERY SELECT 'first_movers'::TEXT, fm_count + 1;
  ELSIF ea_count < 7000 THEN
    RETURN QUERY SELECT 'early_access'::TEXT, ea_count + 1;
  ELSE
    RETURN QUERY SELECT NULL::TEXT, NULL::INTEGER;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE tier_counts ENABLE ROW LEVEL SECURITY;

-- Policies for public read access to tier counts
CREATE POLICY "Allow public read access to tier counts"
  ON tier_counts FOR SELECT
  USING (true);

-- Policies for waitlist signups (insert only for public)
CREATE POLICY "Allow public insert to waitlist"
  ON waitlist_signups FOR INSERT
  WITH CHECK (true);

-- Allow public to read their own signup (optional, for confirmation)
CREATE POLICY "Allow public read own signup"
  ON waitlist_signups FOR SELECT
  USING (true);
