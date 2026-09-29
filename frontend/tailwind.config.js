/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode manually using class strategy
  theme: {
    extend: {
      colors: {
        ires: {
          dark: '#0f172a',
          darker: '#020617',
          light: '#f8fafc',
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          accent: '#10b981',
          surface: '#1e293b',
          surfaceLight: '#ffffff',
          textDark: '#f1f5f9',
          textLight: '#1e293b'
        }
      },
      animation: {
        'blob': 'blob 7s infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        shimmer: {
          'from': { transform: 'translateX(-100%)' },
          'to': { transform: 'translateX(100%)' }
        }
      }
    },
  },
  plugins: [],
}
