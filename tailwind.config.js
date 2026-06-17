/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#22C55E",
        secondary: "#4ADE80",
        bg: "#050816",
        card: "#0F172A",
        muted: "#94A3B8",
      },
      borderRadius: { "3xl": "24px" },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        syne: ["Syne", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(34,197,94,0.35)",
        soft: "0 10px 40px -10px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-overlay":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-green":
          "radial-gradient(circle at 50% 0%, rgba(34,197,94,0.25), transparent 60%)",
      },
      animation: {
        shine: "shine 2.5s linear infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 35s linear infinite",
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
