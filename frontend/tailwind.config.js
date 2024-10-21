// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Ensure Tailwind scans your src files
  ],
  theme: {
    extend: {
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],  // Add Lato as a font family
        'roboto-slab': ['"Roboto Slab"', 'serif'], // Add Roboto Slab as a custom font
      },
      colors: {
        'tertiary-purple': '#5D5A88', // Add the custom color
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enables class-based dark mode
  // Other configurations...
};