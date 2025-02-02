import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        backgroundDark: "#CABFAA",
        foreground: "var(--foreground)",
        greener: "#15423b",
        gold: "#B8860B",
        slate: "#4C585B",
        mac: "#A2AAAD",
        greenish: "#91AC8F",
        dark: "#14213D",
      },
      spacing: {
        a4: '297mm', // Height of an A4 page
      },
      width: {
        a4: '210mm', // Width of an A4 page
      },
      fontFamily: {
        ricordi: ['TTRicordi', 'sans-serif'],
        eczar: ['var(--font-eczar)', 'sans-serif'], // Map to --font-eczar
      },
    },
  },
  plugins: [
  ],
} satisfies Config;
