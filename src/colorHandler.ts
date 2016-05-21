let colors: string[] = [];

// colors[1] = 'E8B0D1';
// colors[2] = 'FFECB3';
// colors[3] = 'B2DFDB';
// colors[4] = 'D1C4E9';
// colors[5] = 'FF4F5A';
// colors[6] = 'FFF9C4';
// colors[7] = 'B2EBF2';
// colors[8] = 'E1B337';

function getRandomLightComponent() {
  return Math.floor(Math.random() * 52 + 196);
}

function getRandomRGB() {
  let r = getRandomLightComponent().toString(16);
  let g = getRandomLightComponent().toString(16);
  let b = getRandomLightComponent().toString(16);
  return `${ r }${ g }${ b }`;
}

function getColor(length: number): string {
  if (!colors[length]) {
    colors[length] = getRandomRGB();
  }
  
  return `#${ colors[length]}`; 
}

export { getColor };