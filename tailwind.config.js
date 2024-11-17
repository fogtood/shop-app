/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#F9F9F9",
        text: "#4b5563",
        primary: "#d1d5db",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
