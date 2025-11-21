/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'linear-progress': 'linear-progress 2s linear infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
      },
      keyframes: {
        'linear-progress': {
          '0%': { left: '-33%' },
          '100%': { left: '100%' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}