const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/_includes/**/*.html",
    "./src/_layouts/**/*.html",
    "./src/*.md",
    "./src/*.html",
  ],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
