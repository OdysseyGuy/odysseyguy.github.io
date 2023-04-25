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
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
