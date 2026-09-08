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
        hero: "var(--hero-bg)",
        accent: {
          blue: "#6366F1",
          purple: "#A855F7",
          gold: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(168,85,247,0.12) 50%, rgba(245,158,11,0.08) 100%)",
      },
      boxShadow: {
        glow: "0 4px 24px rgba(99, 102, 241, 0.15)",
        "glow-lg": "0 8px 32px rgba(99, 102, 241, 0.22)",
        "glow-dark": "0 0 40px rgba(99, 102, 241, 0.25)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
