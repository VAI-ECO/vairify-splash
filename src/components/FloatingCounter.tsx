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

// Fluctuate count slightly
const fluctuateCount = (current: number): number => {
  const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
  const newCount = current + change;
  return Math.max(12, Math.min(65, newCount)); // Clamp between 12-65
};

export default function FloatingCounter() {
  const { pastHero } = useScrollPosition();
  const [viewerCount, setViewerCount] = useState(generateViewerCount());

  useEffect(() => {
    // Fluctuate viewer count every 45-90 seconds
    const interval = setInterval(() => {
      setViewerCount(prev => fluctuateCount(prev));
    }, (45 + Math.random() * 45) * 1000); // 45-90 seconds

    return () => clearInterval(interval);
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
