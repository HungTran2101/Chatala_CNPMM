/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F7FBFC',
        secondary: '#D6E6F2',
        'light': '#a3c2d6',
        'lighter': '#769FCD',
      },
    },
  },
  plugins: [],
};
