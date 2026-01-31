/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          pink: '#ffa8e0',
          blue: '#a8d5ff',
          green: '#a8ffb5',
          yellow: '#fffda8',
          purple: '#dca8ff',
          text: '#1a1a1a',
          bg: '#ffffff'
        },
        pastel: {
          pink: '#ffe6f2',
          blue: '#e6f2ff',
          green: '#e6fff0',
          yellow: '#ffffe6',
          purple: '#f2e6ff',
        },
        main: '#1a1a1a',
        muted: '#64748b',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      boxShadow: {
        'neo': '5px 5px 0px 0px #1a1a1a',
        'neo-sm': '3px 3px 0px 0px #1a1a1a',
        'neo-lg': '8px 8px 0px 0px #1a1a1a',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}


