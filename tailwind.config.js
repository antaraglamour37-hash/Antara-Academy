/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D7263D',
          light: '#FF8A80',
          dark: '#7A0E17',
        },
        charcoal: '#241014',
        ivory: '#FFF5F5',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        luxe: '0 20px 60px -15px rgba(215, 38, 61, 0.3)',
        glass: '0 8px 32px rgba(36, 16, 20, 0.1)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FF8A80 0%, #D7263D 50%, #7A0E17 100%)',
      },
    },
  },
  plugins: [],
}
