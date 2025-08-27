/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 10px 25px -10px rgba(0,0,0,0.15)"
      },
      borderRadius: {
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
}
