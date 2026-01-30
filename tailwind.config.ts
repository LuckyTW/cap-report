import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        likelion: {
          primary: "hsl(var(--likelion-primary))",
          secondary: "hsl(var(--likelion-secondary))",
          accent: "hsl(var(--likelion-accent))",
        },
      },
    },
  },
  plugins: [],
};

export default config;
