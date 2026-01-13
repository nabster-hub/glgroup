/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {


    extend: {
      screens: {
        '2xl': '1280px',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      fontFamily: {
        formular: ["var(--font-formular)"],
        gilroy: ["var(--font-gilroy)"],
      },
      fontSize:{
          '12xl': '12.25rem',
          'desc': '0.8em',
      },
      lineHeight: {
        '3.5': '1.2'
      },
      colors: {
        current: 'currentColor',
        transparent: 'transparent',
        'yellow-active': '#FFDA2B',
        'green-active': '#3B604E',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
      require('@tailwindcss/line-clamp'),
  ],
};
