import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export function SpotCounter({ total = 500, tierName = "Founding Council" }) {
  const [taken, setTaken] = useState(15); // Default to 15 taken (485 remaining)
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initial fetch
    fetchCount();

    // Try to set up real-time subscription
    try {
      const channel = supabase
        .channel('reservations')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reservations' }, () => {
          fetchCount();
        })
        .subscribe();

      return () => {
        try {
          supabase.removeChannel(channel);
        } catch (err) {
          // Silent fail
        }
      };
    } catch (err) {
      // Silent fail - use static count
    }
  }, []);

  async function fetchCount() {
    try {
      const { count, error } = await supabase
        .from('reservations')
        .select('*', { count: 'exact', head: true })
        .eq('tier', 'founding-council');

      if (!error && count !== null) {
        setTaken(count);
        setIsConnected(true);
      }
    } catch (err) {
      // Silent fail - keep static count
    }
  }

  const remaining = total - taken;

  // Determine urgency level
  const isUrgent = remaining < 50;
  const isCritical = remaining < 10;

  return (
    <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/50 backdrop-blur-sm rounded-full border border-primary/20">
      <div className="relative w-2 h-2">
        <span className={`absolute inset-0 rounded-full ${
          isCritical ? 'bg-danger animate-pulse' :
          isUrgent ? 'bg-accent animate-pulse' :
          'bg-primary'
        }`} />
        <span className={`absolute inset-0 rounded-full ${
          isCritical ? 'bg-danger' :
          isUrgent ? 'bg-accent' :
          'bg-primary'
        } animate-ping opacity-75`} />
      </div>

      <span className="font-mono text-sm md:text-base">
        <span className={`font-bold ${
          isCritical ? 'text-danger' :
          isUrgent ? 'text-accent' :
          'text-primary'
        }`}>
          {remaining}
        </span>
        <span className="text-textMuted"> of </span>
        <span className="text-white font-bold">{total}</span>
        <span className="text-textMuted"> {tierName} spots remaining</span>
      </span>
    </div>
  );
}
