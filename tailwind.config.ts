import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f1f6f3",
          100: "#dce9e1",
          200: "#b9d3c3",
          300: "#8fb7a1",
          400: "#5f927b",
          500: "#3f7360",
          600: "#2d5c4b",
          700: "#24493c",
          800: "#193026", // primary dark green
          900: "#0f1f19",
        },
        amber: {
          50: "#fdf7ed",
          100: "#faebc9",
          200: "#f3d691",
          300: "#ecbd5c",
          400: "#e6a838", // warm accent
          500: "#d68f24",
          600: "#b3701a",
          700: "#8f5718",
          800: "#744719",
          900: "#5f3a18",
        },
        ink: {
          900: "#1b211e",
          700: "#3a433e",
          500: "#5c665f",
          300: "#8b968e",
          100: "#e6eae7",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 2px 10px -2px rgba(25, 48, 38, 0.08), 0 1px 2px rgba(25, 48, 38, 0.06)",
        cardHover: "0 8px 24px -4px rgba(25, 48, 38, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
