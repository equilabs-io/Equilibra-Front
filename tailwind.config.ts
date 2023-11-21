import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sora)"],
        mono: ["var(--font-roboto-mono)"],
      },
      colors: {
        primary: "var(--color-primary)",
        primary_var: "var(--color-primary-var)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        surface_var: "var(--color-surface-var)",
        highlight: "var(--color-highlight)",
        surface_secondary: "var(--color-surface-secondary)",
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
