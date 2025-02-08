/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], 
        inter: ['Inter', 'sans-serif'], 
      },
      screens: {
        '3xl': '1920px',
      },
  },
},
  plugins: [],
}

