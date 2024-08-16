/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        black: "#222222",
        yellow: "#F6D776",
        yellowHover: "#FFDB6A",
        grey: "#EEF2F5",
        red: "#FF0509",
      },
      spacing: {},
    },
    fontSize: {
      inherit: "inherit",
    },
  },
  plugins: [],
};
