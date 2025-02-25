import type { Config } from "tailwindcss";

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
            width: {
                a4: "268mm", // A4 Width
            },
            height: {
                a4: "379mm", // A4 Height (fix to puppeeter route gaynes)
            },
            fontFamily: {
                ricordi: ["TTRicordi", "sans-serif"],
                ariel: ["Arial"],
            },
        },
    },
    plugins: [],
} satisfies Config;
