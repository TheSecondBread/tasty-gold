/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 25px 50px -12px rgba(0, 0, 0, 0.85)', // Custom shadow
      },
    },
  },
  plugins: [],
}