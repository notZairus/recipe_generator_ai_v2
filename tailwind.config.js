/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'margin-x': "90dvw",
      },
      height: {
        screen_border: "90dvw"
      }
    },
  },
  plugins: [],
}

