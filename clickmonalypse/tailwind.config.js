// clickmonalypse/tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        monadPurple: '#4B0082',
        monadBlue: '#1E90FF',
      },
    },
  },
  plugins: [],
}