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
        "fs-background": "rgba(17,25,40,0.75)",
        "fs-border": "rgba(255,255,255,0.125)",
      },
    },
  },
  plugins: [],
} satisfies Config;
