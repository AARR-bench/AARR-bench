import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Monochrome paper palette (conductor.build inspired)
        paper: {
          DEFAULT: "#ffffff",
          50: "#fafafa",
          100: "#f5f5f4",
          200: "#ececea",
        },
        ink: {
          DEFAULT: "#0a0a0a",
          900: "#111111",
          800: "#1c1c1c",
          700: "#2a2a2a",
          600: "#404040",
          500: "#6b6b6b",
          400: "#8a8a8a",
          300: "#b5b5b5",
          200: "#d4d4d4",
          100: "#e7e7e5",
        },
        // Terminal surface (dark)
        term: {
          bg: "#0c0c0d",
          bar: "#1a1a1c",
          text: "#e8e8e8",
          green: "#3ecf8e",
          dim: "#8a8a8a",
        },
      },
      fontFamily: {
        // Courier New as the primary type, per request
        sans: ['"Courier New"', "Courier", "ui-monospace", "monospace"],
        mono: ['"Courier New"', "Courier", "ui-monospace", "monospace"],
        ui: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        container: "1180px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.8s ease both",
        blink: "blink 1s steps(1) infinite",
        marquee: "marquee 30s linear infinite",
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)",
        "dots-light":
          "radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [typography],
};

export default config;
