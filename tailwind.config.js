/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        flicker: {
          '0%, 25%, 19%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '0%, 20%, 50% ,86%': { opacity: '0.2' },
        },
      },
      animation: {
        flicker: 'flicker 2s 4s',
      },
    },
  },
  darkMode: "class",
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark"], // or customize more themes
  },
};
