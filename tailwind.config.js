/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#F9F9F9",
        text: "#6b7280",
        primary: "#d1d5db",
      },
    },
  },
  plugins: [],
};
