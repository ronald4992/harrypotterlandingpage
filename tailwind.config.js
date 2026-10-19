/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        magic: {
          dark: '#0c0b10',
          darker: '#060509',
          card: '#161424',
          border: '#392d52',
          gold: '#e6ca65',
          goldDark: '#b89328',
          goldLight: '#fbf0b9',
        },
        gryffindor: {
          scarlet: '#740001',
          gold: '#eeba30',
          dark: '#4a0000',
        },
        slytherin: {
          green: '#1a472a',
          silver: '#aaaaaa',
          dark: '#0d2818',
        },
        ravenclaw: {
          blue: '#0e1a40',
          bronze: '#946b2d',
          dark: '#070f28',
        },
        hufflepuff: {
          yellow: '#ecb939',
          black: '#372e29',
          dark: '#25201d',
        },
      },
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        cinzelDeco: ['"Cinzel Decorative"', 'serif'],
        medieval: ['"MedievalSharp"', 'cursive'],
        body: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
