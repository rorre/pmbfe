/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondaryText: "rgb(130, 130, 130)",
        primary: "rgb(0, 91, 248)",
      },
    },
  },
  plugins: [],
};
