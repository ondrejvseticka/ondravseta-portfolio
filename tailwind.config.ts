import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        surface: "var(--surface)",
        border: "var(--border)",
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
        },
        aurora: "var(--aurora)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 8px 32px rgba(194, 65, 12, 0.12)",
        "glow-dark": "0 8px 32px rgba(251, 191, 36, 0.1)",
      },
      animation: {
        "aurora-drift": "aurora-drift 18s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
