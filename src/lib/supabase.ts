import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface TierCount {
  tier: string;
  current_count: number;
  max_count: number;
}

export interface WaitlistSignup {
  id: string;
  email: string;
  phone?: string;
  tier: string;
  tier_spot_number: number;
  partner_coupon_code: string;
  created_at: string;
  registered_in_app: boolean;
}

// Generate coupon code based on tier and spot number
export const generateCouponCode = (tier: string, spotNumber: number): string => {
  const tierPrefix = {
    founding_council: 'FC',
    first_movers: 'FM',
    early_access: 'EA'
  }[tier] || 'EA';

  return `${tierPrefix}${String(spotNumber).padStart(5, '0')}`;
};

// Get tier discount percentage
export const getTierDiscount = (tier: string): number => {
  return {
    founding_council: 100,
    first_movers: 50,
    early_access: 20
  }[tier] || 0;
};

// Get tier badge emoji
export const getTierBadge = (tier: string): string => {
  return {
    founding_council: '🔥',
    first_movers: '⚡',
    early_access: '🚀'
  }[tier] || '🚀';
};

// Get tier display name
export const getTierDisplayName = (tier: string): string => {
  return {
    founding_council: 'FOUNDING COUNCIL',
    first_movers: 'FIRST MOVERS',
    early_access: 'EARLY ACCESS'
  }[tier] || 'EARLY ACCESS';
};
