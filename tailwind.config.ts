import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // World 48 brand tokens
        brand: {
          cyan: "#00D9FF",
          green: "#00D98E",
          gold: "#FFB74D",
          red: "#E53E3E",
        },
        // Surface palette for dark-first premium feel
        surface: {
          0: "#0A0C10", // page background
          1: "#10141B", // card background
          2: "#1A1F29", // elevated card / hover
          3: "#262C38", // border / divider
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #00D9FF 0%, #00D98E 50%, #FFB74D 100%)",
        "hero-radial":
          "radial-gradient(ellipse at top, rgba(0, 217, 255, 0.18), transparent 55%), radial-gradient(ellipse at bottom right, rgba(255, 183, 77, 0.10), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(0, 217, 255, 0.35)",
        "card-hover": "0 20px 40px -20px rgba(0, 217, 255, 0.25)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
