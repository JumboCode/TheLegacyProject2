/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "drop-inner":
          "inset 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.2)",
      },

      rotate: {
        60: "60deg",
      },
    },
    screens: {
      xs: "320px",
      sm: "680px",
      md: "900px",
      lg: "1180px",
      xl: "1480px",
    },
    borders: {
      test: "border-4 border-red-400 border-dashed",
    },
    colors: {
      teal: "#36696E",
      "dark-teal": "#22555A",
      "light-teal": "#5E898D",
      "dark-rust": "#8A423A",
      "light-rust": "#C58078",
      "light-moss": "#CDD3C8",
      "off-white": "#F5F5F5",
      tan: "#F5F0EA",
      "dark-tan": "#D4CCC1",
      "darker-tan": "#CAC2B7",
      "darkest-tan": "#665E53",
      "med-tan": "#E8E0D5",
      "dark-green": "#22555A",
      "offer-white": "#F0F0F0",
      "light-sage": "#AEBDB6",
      "dark-sage": "#94A59C",
      "dark-gray": "#515151",
      "dark-plum": "#000022",
      "tag-rust": "#A8584F",
      "tag-tan": "#AB7D55",
      "tag-gold": "#BA9D4F",
      "tag-lime": "#A3A865",
      "tag-moss": "#768E64",
      "tag-teal": "#698C8A",
      "tag-blue": "#586D87",
      "tag-violet": "#6F617F",
      "tag-rose": "#A0687F",
      "sunset-orange": "#EF6767",
    },

    // TODO(nickbar01234) - Deprecate font
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Playfair Display", "serif"],
    },

    letterSpacing: {
      easy: ".015em",
    },

    screen: {
      xs: "320px",
      sm: "640px",
      md: "760px",
      lg: "1024px",
      xl: "1280px",
      "2x": "1536px",
    },
  },
  plugins: [],
});
