import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        greenish: "#91ac8f",
        greenDark: "#15423b",
        greenDarkOpec: "#15423bb6",
        greenLight: "#91CEB8",
        beighDarkish: "#cdc2a6",
        backgroundBeigh: "#e1d8c6",
        beigh: "#eae4dc",
        price: "#303030",
      },
    },
  },
  plugins: [],
} satisfies Config;
