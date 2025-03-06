import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class", // Enable class-based dark mode // change-to media for user preferences
  theme: {
    extend: {
      colors: {
        greenish: "#91ac8f",
        greenDark: "#15423b",
        greenDarkOpec: "#15423bb6",
        greenLight: "#91CEB8",
        gold: "#B8860B",
        beighDarkish: "#cdc2a6",
        backgroundBeigh: "#e1d8c6",
        beigh: "#eae4dc",
        price: "#303030",
        
        navRed: "#aa0000",
        navGreen: "#15423b",
        navBlue: "#0000aa",
        
        // Dark mode colors
        macbookGrey: "#1e1e1e", // Dark space grey color similar to MacBook
        macbookGreyLight: "#2d2d2d", // Lighter variant for UI elements
        macbookGreyDark: "#141414", // Darker variant for shadows/backgrounds
      },
    },
    width: {
      a4: "268mm", // A4 Width
    },
    height: {
      a4: "379mm", // A4 Height (fix to puppeeter route gaynes)
    },
    fontFamily: {
      ricordi: ["TTRicordi", "sans-serif"],
    }
  },
  plugins: [],
} satisfies Config;
