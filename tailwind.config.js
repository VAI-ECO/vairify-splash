/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'vai-navy': '#1a1a5e',
        'vai-blue': '#4F7DF3',
        'vai-blue-hover': '#3D6AE0',
        'vai-teal': '#00d4aa',
        'vai-teal-hover': '#00b892',
        'vai-gold': '#ffd700',
        'vai-dark': '#0a0a0f',
        'vai-dark-secondary': '#0d0d14',
        'vai-card': '#1a1a2e',
        'vai-border': '#2a2a4e',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
