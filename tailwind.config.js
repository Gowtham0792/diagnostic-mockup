/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        panel: 'rgb(var(--panel) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        brand: 'rgb(var(--brand) / <alpha-value>)',
      },
      keyframes: {
        'tile-in': {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(0.94)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'tile-in': 'tile-in 0.3s cubic-bezier(0.2, 0.7, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}
