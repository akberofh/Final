/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ffc727",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
        dark: "#111111",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [],
};

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3490dc', // Örnek birincil renk
        'primary-dark': '#2779bd', // Örnek koyu birincil renk
      },
    },
  },
  variants: {},
  plugins: [],
};

