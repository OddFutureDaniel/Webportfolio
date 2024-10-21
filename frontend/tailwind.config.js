// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Ensure Tailwind scans your src files
  ],
  theme: {
    extend: {
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],  // Add Lato as a font family
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enables class-based dark mode
  // Other configurations...
};