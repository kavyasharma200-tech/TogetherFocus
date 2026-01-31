/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#667EEA',
          DEFAULT: '#764BA2',
          dark: '#5a3780',
        },
        secondary: {
          light: '#F093FB',
          DEFAULT: '#F5576C',
          dark: '#d0455b',
        },
        accent: {
          light: '#4FACFE',
          DEFAULT: '#00F2FE',
          dark: '#00c4ce',
        },
        background: {
          darkest: '#0F0C29',
          dark: '#1A1538',
          light: '#2D2654',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        caveat: ['Caveat', 'cursive'],
        mono: ['Roboto Mono', 'monospace'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'brightness(100%)' },
          '50%': { opacity: '0.7', filter: 'brightness(130%)' }, 
        }
      }
    },
  },
  plugins: [],
}
