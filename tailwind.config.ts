/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0a0a0f",
        midnight: "#12121a",
        depth: "#1a1a2e",
        surface: "#252538",
        cyan: {
          400: "#22d3ee",
          300: "#67e8f9",
        },
        teal: {
          400: "#2dd4bf",
          500: "#14b8a6",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px -5px rgba(34, 211, 238, 0.2)" },
          "100%": { boxShadow: "0 0 40px -5px rgba(20, 184, 166, 0.4)" },
        },
      },
    },
  },
  plugins: [],
}