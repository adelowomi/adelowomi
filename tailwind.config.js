/** @type {import('tailwindcss').Config} */
module.exports = {
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
        secondary: "#8F6302"
      },
      backgroundImage: {
        'hero-pattern': "url('~/public/assets/about-image.png')",
      },
      animation: {
        rotate: "rotate 6s linear infinite",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      fontFamily: {
        archivo: ['Archivo', 'sans-serif'],
        besley: ['Besley', 'serif'],
      }
    },
  },
  plugins: [],
}

