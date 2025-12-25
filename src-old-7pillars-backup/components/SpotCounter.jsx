import { useState, useEffect } from 'react';

const SpotCounter = ({ total = 500, tierName = "Founding Council", currentCount = null }) => {
  const [count, setCount] = useState(currentCount || 347); // Default placeholder

  useEffect(() => {
    // TODO: Fetch real count from Supabase when integrated
    // For now, use the provided currentCount or default
    if (currentCount !== null) {
      setCount(currentCount);
    }
  }, [currentCount]);

  const remaining = total - count;
  const percentageFilled = (count / total) * 100;

  // Determine urgency level
  const isUrgent = remaining < 50;
  const isCritical = remaining < 10;

  return (
    <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/50 backdrop-blur-sm rounded-full border border-accent/20">
      <div className="relative w-2 h-2">
        <span className={`absolute inset-0 rounded-full ${
          isCritical ? 'bg-danger animate-pulse' :
          isUrgent ? 'bg-gold animate-pulse' :
          'bg-accent'
        }`} />
        <span className={`absolute inset-0 rounded-full ${
          isCritical ? 'bg-danger' :
          isUrgent ? 'bg-gold' :
          'bg-accent'
        } animate-ping opacity-75`} />
      </div>

      <span className="font-mono text-sm md:text-base">
        <span className={`font-bold ${
          isCritical ? 'text-danger' :
          isUrgent ? 'text-gold' :
          'text-accent'
        }`}>
          {remaining}
        </span>
        <span className="text-textSecondary"> of </span>
        <span className="text-textPrimary font-bold">{total}</span>
        <span className="text-textSecondary"> {tierName} spots remaining</span>
      </span>
    </div>
  );
};

export default SpotCounter;
