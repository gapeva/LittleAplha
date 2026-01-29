/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clinical Trust
        biotech: {
          blue: "#0ea5e9", // Primary
          dark: "#0369a1",
        },
        // Health Status
        safe: "#10b981",    // Emerald Life
        caution: "#f59e0b", // Amber Alert
        // Gamification
        streak: "#facc15",  // Gold
        achievement: "#a855f7", // Purple
      },
      borderRadius: {
        'medical': '12px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
