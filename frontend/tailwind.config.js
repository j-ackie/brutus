/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
          'text': "#f8f0f0",
          'black': "#000000",
          'primary': "#161a58",
          'secondary': "#8d3fd0",
          'tertiary': "#ff8080",
          'accent': "#2c44c7",
          'accent2': "#9B1C31",
          'accent3': "#ed3d63",
          'lightblue': '#a9c8ff', 
          'red': "#dc3545",
          'green': "#28a745",
          'date': "#6c757d",
      },
    },
  },
  plugins: [],
}

