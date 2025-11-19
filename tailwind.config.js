/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-green': {
          DEFAULT: '#00FF41',
          light: '#33FF66',
          dark: '#00CC34',
        },
      },
    },
  },
  plugins: [],
};
