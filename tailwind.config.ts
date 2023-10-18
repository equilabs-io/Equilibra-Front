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
        surface: "var(--color-surface)",
        textSecondary: "var(--color-text-secondary)",
        white: "var(--color-white)",
        grey_light: "var(--color-grey-light)",
        grey_mlight: "var(--color-grey-mlight)",
        grey_mdark: "var(--color-grey-mdark)",
        grey_dark: "var(--color-grey-dark)",
      },
    },
  },
  plugins: [],
};
export default config;
