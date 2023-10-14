import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        background2: "var(--color-background2)",
        white: "var(--color-white)",
        white_10: "var(--color-white_10)",
        white_5: "var(--color-white_5)",
      },
    },
  },
  plugins: [],
};
export default config;
