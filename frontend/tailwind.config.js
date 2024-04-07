/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
          // white
          'text': "#f8f0f0",
          // black
          'black': "#000000",
          // royal blue
          'primary': "#161a58",
          // dark orchid
          'secondary': "#8d3fd0",
          // light coral
          'tertiary': "#ff8080",
          // denim blue
          'accent': "#2c44c7",
          // royal red
          'accent2': "#9B1C31",
          // paradise pink
          'accent3': "#ed3d63",
          // light blue
          'lightblue': '#a9c8ff', 
          // red button
          'red': "#dc3545",
          // green button
          'green': "#28a745",
          // date gray
          'date': "#6c757d",
      },
    },
  },
  plugins: [],
}

