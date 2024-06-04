/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        light: '#F8F6E3',
        lightgreen: '#97E7E1',
        green: '#6AD4DD',
        blue: '#7AA2E3',
      },
    },
  },
  plugins: [],
};
