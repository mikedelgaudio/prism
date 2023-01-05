/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        indigo: {
          50: "#f3f6fc",
          100: "#e7edf7",
          200: "#c9d8ee",
          300: "#99b8e0",
          400: "#6293ce",
          500: "#4d82c3",
          600: "#2d5b9c",
          700: "#264a7e",
          800: "#234069",
          900: "#223758",
        },
      },
    },
  },
  plugins: [],
};
