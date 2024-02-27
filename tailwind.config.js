/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      'yellow-active': '#FFDA2B',
      'white': '#fff',
      'black': '#000',
    },
    screens: {
      '2xl': '1440px',
    },
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        formular: ['var(--font-formular)'],
        gilroy: ['var(--font-gilroy)'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
