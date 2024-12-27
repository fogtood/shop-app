/** @type {import('tailwindcss').Config} */
import tailwindScrollbarHide from "tailwind-scrollbar-hide";
import tailwindForms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#F9F9F9",
        text: "#4b5563",
        primary: "#d1d5db",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [
    tailwindScrollbarHide,
    tailwindForms({
      strategy: "class",
    }),
  ],
};
