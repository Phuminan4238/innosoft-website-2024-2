const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F37220",
          dark: "#4C535D",
          light: "#5184FA",
          title: "#2E3238",
        },
        natural: {
          DEFAULT: "#131B43",
          dark: "#333333",
          light: "#CCCCCC",
          white: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F3533B",
          dark: "#EF6D5D",
          light: "#F87854",
          lightGreen: "#8CD77A",
          blue: "#50B6FA",
          gray: "#E8E8E8",
          paleYellow: "#FFF3DF",
        },
      },
      fontFamily: {
        sans: ["Raleway", ...defaultTheme.fontFamily.sans], // Use Raleway as primary font
        thai: ["IBM Plex Sans Thai", ...defaultTheme.fontFamily.sans], // Use IBM Plex Sans Thai for Thai language
      },
      fontSize: {
        
        h1: "48px", // equivalent to 36px
        h2: "40px", // equivalent to 30px
        h3: "32px", // equivalent to 24px
        h4: "28px", // equivalent to 20px
        headline: "24px", // equivalent to 16px
        body: "20px", // equivalent to 16px
        subtitle: "16px", // equivalent to 14px
        caption: "12px", // equivalent to 12px
        footnote: "12px", // equivalent to 10px
      },
      fontWeight: {
        regular: 400,
        bold: 700,
        light: 300,
      },
      fontStyle: {
        italic: "italic",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio"), require("flowbite/plugin")],
};
