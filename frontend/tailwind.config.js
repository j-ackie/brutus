/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'text': '#050315',
        'background': '#fbfbfe',
        'primary': '#311fd8',
        'secondary': '#e30544',
        'accent': '#e74683',
        'snow': "#f8f0f0",
        'lightcoral': "#ff8080",
        'paradisepink': "#ed3d63",
        'darkorchid': "#8d3fd0",
        'denimblue': "#2c44c7",
        'royalblue': "#161a58",
        'black': "#000000",
        'royalred': "#9B1C31",
      },
    },
  },
  plugins: [],
}

