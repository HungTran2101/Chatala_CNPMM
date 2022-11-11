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
        dark: '#a3c2d6',
        darker: '#769FCD',
      },
    },
  },
  plugins: [],
};
