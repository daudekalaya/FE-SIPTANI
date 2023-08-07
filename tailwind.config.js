/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        greenFarm: "#8DC73F",
        greenFarmHover: "#A3D556"
      },
    },
  },
  plugins: [require("daisyui")],
}

