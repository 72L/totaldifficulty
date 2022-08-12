/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Hammersmith One", "sans-serif"],
        numbers: ["Inconsolata", "monospace"],
      },
    },
  },
  plugins: [],
};
