
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        alexandria: ['"Alexandria"', 'sans-serif'],
        robotoSlab: ['"Roboto Slab"', 'serif'],
        orbitron:['"Orbitron"',"sans"],
        righteous: ['"Righteous"', "sans"],
        'marck-script': ['"Marck Script"', 'cursive'],
        'salsa': ['Salsa', 'cursive'],
      },
    },
  },
  plugins: [
  
  ],
}

