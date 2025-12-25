import { useState, useEffect } from 'react';
import { supabase, isMockMode } from '../lib/supabase';
import type { Tier, TierCount } from '../types';
import { TIER_CONFIG } from '../types';

const DEFAULT_COUNTS: TierCount[] = [
  { tier: 'founding_council', reserved: 153, total: 500, remaining: 347 },
  { tier: 'first_mover', reserved: 0, total: 2500, remaining: 2500 },
  { tier: 'early_access', reserved: 0, total: 7000, remaining: 7000 },
];

export function useTierCounts() {
  const [counts, setCounts] = useState<TierCount[]>(DEFAULT_COUNTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isMockMode) {
      setLoading(false);
      return;
    }

    async function fetchCounts() {
      try {
        const { data, error: fetchError } = await supabase!
          .from('tier_counts')
          .select('*');

        if (fetchError) throw fetchError;
        if (data && data.length > 0) {
          setCounts(data);
        }
      } catch (err) {
        console.error('Error fetching tier counts:', err);
        setError('Failed to load tier counts');
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();

    const channel = supabase!
      .channel('tier_updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'reservations' },
        () => { fetchCounts(); }
      )
      .subscribe();

    return () => {
      supabase!.removeChannel(channel);
    };
  }, []);

  const getRemaining = (tier: Tier): number => {
    const found = counts.find(c => c.tier === tier);
    return found?.remaining ?? TIER_CONFIG[tier].spots;
  };

  const getReserved = (tier: Tier): number => {
    const found = counts.find(c => c.tier === tier);
    return found?.reserved ?? 0;
  };

  const decrementTier = (tier: Tier) => {
    setCounts(prev => prev.map(c => 
      c.tier === tier 
        ? { ...c, reserved: c.reserved + 1, remaining: c.remaining - 1 }
        : c
    ));
  };

  return { counts, loading, error, getRemaining, getReserved, decrementTier };
}
