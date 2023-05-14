/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FAFAFA",
        primary: {
          500: "#9b59b6",
        },
        success: {
          600: "#299d82",
          500: "#299d82",
        },
        secondary: {
          500: "#f9a70d",
        },
      },
    },
  },
  plugins: [],
};
