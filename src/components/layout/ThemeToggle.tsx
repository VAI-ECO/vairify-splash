import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="
        fixed top-20 right-6 z-50 
        p-3 rounded-full 
        bg-white dark:bg-[#1a1a2e] 
        shadow-lg 
        border border-gray-200 dark:border-[#2a2a4e] 
        hover:scale-110 
        transition-transform duration-200
        focus:outline-none focus:ring-2 focus:ring-[#4F7DF3] focus:ring-offset-2
        dark:focus:ring-offset-[#0a0a0f]
      "
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
}
