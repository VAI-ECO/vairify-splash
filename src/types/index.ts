export type Tier = 'founding_council' | 'first_mover' | 'early_access';

export type ReservationStatus = 'reserved' | 'converted' | 'expired' | 'cancelled';

export interface Reservation {
  id: string;
  email: string;
  phone: string | null;
  tier: Tier;
  coupon_code: string;
  referral_code_used: string | null;
  referral_link: string;
  voting_commitment: boolean;
  terms_accepted: boolean;
  reserved_at: string;
  converted_at: string | null;
  status: ReservationStatus;
}

export interface TierCount {
  tier: Tier;
  reserved: number;
  total: number;
  remaining: number;
}

export interface TierConfig {
  id: Tier;
  name: string;
  spots: number;
  icon: string;
  color: string;
  borderColor: string;
}

export const TIER_CONFIG: Record<Tier, TierConfig> = {
  founding_council: {
    id: 'founding_council',
    name: 'Founding Council',
    spots: 500,
    icon: '🔥',
    color: 'text-vai-gold',
    borderColor: 'border-vai-gold',
  },
  first_mover: {
    id: 'first_mover',
    name: 'First Movers',
    spots: 2500,
    icon: '⚡',
    color: 'text-vai-blue',
    borderColor: 'border-vai-blue',
  },
  early_access: {
    id: 'early_access',
    name: 'Early Access',
    spots: 7000,
    icon: '🚀',
    color: 'text-vai-blue',
    borderColor: 'border-vai-blue',
  },
};
