import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fcfcfc",
        secondary: "#732383",
        accent: "#b73fa0",
        "purple-gradient-start": "#732383",
        "purple-gradient-end": "#b73fa0",
        "purple-light": "#9f3596",
        "purple-dark": "#5a1c66",
        background: "#1a0d1f",
        surface: "#2a1d2f",
        "dark-surface": "#0f0a12",
        // background: "var(--background)",
        // foreground: "var(--foreground)",
      },
      fontFamily: {
        besley: ["Besley", "serif"],
        archivo: ["Archivo", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
