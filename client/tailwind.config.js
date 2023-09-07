/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F5385D",
      },
      backgroundImage: {
        nature: "url('./assets/nature.jpg')",
      },
    },
  },
  plugins: [],
};
