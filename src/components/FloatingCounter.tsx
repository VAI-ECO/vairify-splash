import { useScrollPosition } from '../hooks/useScrollPosition';
import { useState, useEffect } from 'react';

// Get viewer count range based on time of day
const getViewerRange = (): [number, number] => {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return [15, 35]; // Morning
  if (hour >= 12 && hour < 18) return [25, 45]; // Afternoon
  if (hour >= 18 || hour < 2) return [35, 60]; // Evening/Night peak
  return [12, 25]; // Late night
};

// Generate random viewer count within range
const generateViewerCount = (): number => {
  const [min, max] = getViewerRange();
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Fluctuate count slightly with bias toward +1
const fluctuateCount = (current: number): number => {
  // Random value 0-1, with bias toward positive (60% chance of +1, 20% chance of +2, 10% chance of -1, 10% chance of -2)
  const rand = Math.random();
  let change: number;
  if (rand < 0.6) change = 1;      // 60% chance of +1
  else if (rand < 0.8) change = 2;  // 20% chance of +2
  else if (rand < 0.9) change = -1; // 10% chance of -1
  else change = -2;                 // 10% chance of -2

  const newCount = current + change;
  return Math.max(15, Math.min(65, newCount)); // Floor at 15, ceiling at 65
};

export default function FloatingCounter() {
  const { pastHero } = useScrollPosition();
  const [viewerCount, setViewerCount] = useState(generateViewerCount());

  useEffect(() => {
    // Fluctuate viewer count every 45-120 seconds
    const fluctuate = () => {
      setViewerCount(prev => fluctuateCount(prev));
      // Schedule next fluctuation with random interval
      const nextInterval = (45 + Math.random() * 75) * 1000; // 45-120 seconds
      setTimeout(fluctuate, nextInterval);
    };

    // Initial fluctuation
    const initialDelay = (45 + Math.random() * 75) * 1000;
    const timeout = setTimeout(fluctuate, initialDelay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`
        fixed bottom-6 left-6 z-40
        transition-all duration-300
        ${pastHero
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
        }
      `}
    >
      <div className="
        bg-white dark:bg-[#1a1a2e]
        border border-[#00d4aa]/50 dark:border-[#00d4aa]/30
        rounded-full py-3 px-6
        shadow-lg
        flex items-center gap-2
      ">
        {/* Pulsing live indicator */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2dd4bf]"></span>
        </span>

        <span className="text-[#2dd4bf] font-bold">{viewerCount}</span>
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          people viewing
        </span>
      </div>
    </div>
  );
}
