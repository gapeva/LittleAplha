/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clinical Trust - Refined Medical Palette
        biotech: {
          blue: "#0ea5e9",
          dark: "#0369a1",
          light: "#e0f2fe",
        },
        // Health Status
        safe: "#10b981",
        caution: "#f59e0b",
        danger: "#ef4444",
        // Gamification
        streak: "#facc15",
        achievement: "#a855f7",
        // Warm accents for AGS patients
        warmth: "#fef3c7",
        trust: "#dbeafe",
      },
      borderRadius: {
        'medical': '16px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 40px -10px rgba(14, 165, 233, 0.3)',
        'card': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
        'button': '0 4px 14px 0 rgba(14, 165, 233, 0.4)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
