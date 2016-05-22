let colors: string[] = [];

colors[1] = 'FFC05D';
colors[2] = 'fbf6bd';
colors[3] = 'eed1f7';
colors[4] = '7CF2AA';
colors[5] = 'f2b3b3';
colors[6] = 'edd961';
colors[7] = 'bdcafc';
colors[8] = 'dbcdeb';
colors[9] = 'd6f8c0';

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