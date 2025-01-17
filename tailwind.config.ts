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
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.btn': {
          width: '100%',
          padding: '1rem',
          borderRadius: '0.5rem',
          transition: 'colors',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          '&:hover': {
            '--tw-bg-opacity': '0.8',
          },
        },
        '.btn-primary': {
          '@apply btn bg-slate text-white border border-white': {},
        },
        '.btn-secondary': {
          '@apply btn bg-gold text-white': {},
          '&:hover': {
            backgroundColor: '#9a7209',
          },
        },
      })
    }),
  ],
} satisfies Config;
