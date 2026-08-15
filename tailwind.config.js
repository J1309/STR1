/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070E",
        surface: "#0B0F19",
        "surface-card": "#111625",
        border: "rgba(255, 255, 255, 0.1)",
        "sapphire": "#2563EB",
        "cobalt": "#1D4ED8",
        "ocean": "#3B82F6",
        "sky-soft": "#60A5FA",
        "ice-blue": "#93C5FD",
        "deep-navy": "#0A1020",
      },
      spacing: {
        '75': '18.75rem',
        '110': '27.5rem',
        '145': '36.25rem',
        '150': '37.5rem',
        '160': '40rem',
        '180': '45rem',
        '220': '55rem',
        '265': '66.25rem',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Space Grotesk"', 'sans-serif'],
        display: ['"Cinzel"', '"Syne"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'subtle-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'soft-blue': '0 10px 30px -10px rgba(37, 99, 235, 0.3)',
        'blue-glow': '0 0 40px rgba(59, 130, 246, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'spin-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.99)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
