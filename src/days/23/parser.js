import HashGrid from 'lib/hash-grid';
const parser = (input) => {
  const grid = HashGrid();

  input.split('\n').forEach((line, y) => line.split('').forEach((chr, x) => {
    if (chr === '#') grid.set({ x, y });
  }));

  return grid;
}

export default parser;
