/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "media", // or 'class' for manual dark mode handling
  content: ["src/**/*.{html,php,js}"], // Ensure this includes all the files you are using
  theme: {
    extend: {
      // Corrected the nested 'extend'
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        stone: colors.stone, // Updated to match Tailwind's naming
        sky: colors.sky, // Updated to match Tailwind's naming
        neutral: colors.neutral, // Updated to match Tailwind's naming
        gray: colors.gray, // Updated to match Tailwind's naming
        slate: colors.slate, // Updated to match Tailwind's naming
        lime: colors.lime,
        rose: colors.rose,
        blue: colors.blue,
        green: colors.green,
        red: colors.red,
        purple: colors.purple, // Updated to match Tailwind's naming
      },
    },
  },
  // The purge option is now handled by the 'content' key
  // Uncomment and adjust if needed
  // purge: {
  //   content: ['src/**/*.{html,js}'],
  //   options: {
  //     safelist: [
  //       // Add the classes you want to exclude from DaisyUI here
  //       'hover:bg-base-300',
  //       'hover:rounded-md',
  //       'hover:text-white',
  //       'active:bg-base-300',
  //       'active:rounded-md',
  //       'active:text-white',
  //     ],
  //   },
  // },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [], // Keep empty if no themes are used, or configure as needed
    // Example theme configuration
    // themes: [
    //   {
    //     prime: {
    //       primary: '#2563eb',
    //       secondary: '#e0f2fe',
    //       accent: '#67e8f9',
    //       neutral: '#d1d5db',
    //       'base-100': '#e5e7eb',
    //       hover: '#1D4ED8',
    //       info: '#86efac',
    //       success: '#00a455',
    //       warning: '#fbbf24',
    //       error: '#e8002a',
    //     },
    //   },
    // ],
  },
};
