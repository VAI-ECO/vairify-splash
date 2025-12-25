import type { Tier } from '../types';

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const TIER_PREFIX: Record<Tier, string> = {
  founding_council: 'FC',
  first_mover: 'FM',
  early_access: 'EA',
};

export function generateCouponCode(tier: Tier): string {
  const prefix = TIER_PREFIX[tier];
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return `${prefix}-${code}`;
}

export function generateReferralLink(couponCode: string): string {
  const code = couponCode.split('-')[1];
  return `vairify.io/r/${code}`;
}

export function extractReferralFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('ref');
}
