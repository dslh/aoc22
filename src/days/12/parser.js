const findCoords = (lines, chr) => {
  for (let row = 0; row < lines.length; ++row) {
    const col = lines[row].indexOf(chr);
    if (col !== -1)
      return { row, col };
  }
};

const ZERO = 'a'.charCodeAt(0);
const START = 'S'.charCodeAt(0);
const END = 'E'.charCodeAt(0);

const parser = (input) => {
  const lines = input.split('\n');

  const start = findCoords(lines, 'S');
  const end = findCoords(lines, 'E');

  const grid = lines.map(line => line.split('').map(chr => {
    const code = chr.charCodeAt(0);
    if (code === START) return 0;
    if (code === END) return 25;
    return code - ZERO;
  }));

  return { grid, start, end };
};

export default parser;
