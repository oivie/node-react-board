module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'light-blue': {
          100: '#cfe8ff',
          200: '#a3d1ff',
          300: '#76baff',
          400: '#49a3ff',
        },
        'blue': {
          500: '#3b82f6',
          800: '#1e40af',
        },
        'dark-blue': {
          800: '#1e3a8a',
        },
        'light-gray': '#f7f8fc',
        'dark-gray': '#1f2937',
        'gray-text': '#9ca3af',
        'orange': {
          400: '#fb923c',
          500: '#f97316',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
