
function hexToRGB(hex : string) {
  let r = 0, g = 0, b = 0;
  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6 digits
  else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return { r, g, b };
}

function rgbaToHex(r: number, g: number, b: number, a: number): string {
  const red = Math.max(0, Math.min(255, r));
  const green = Math.max(0, Math.min(255, g));
  const blue = Math.max(0, Math.min(255, b));
  const alpha = Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, '0');
  return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}${alpha}`;
}

const accentColorRGB = hexToRGB('#2c44c7');
const accentColorHex = rgbaToHex(accentColorRGB.r, accentColorRGB.g, accentColorRGB.b, 0.45);

const COLORS = {
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
  'lightaccent': accentColorHex, 
  // red button
  'red': "#dc3545",
  // green button
  'green': "#28a745",
  // date gray
  'date': "#6c757d",

}

export { COLORS }


