/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        card: '#1a1a2e',
        accent: '#00d4aa',
        gold: '#ffd700',
        textPrimary: '#ffffff',
        textSecondary: '#a0a0a0',
        danger: '#ff4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        content: '1152px', // 72rem = max-w-6xl
      },
    },
  },
  plugins: [],
}
