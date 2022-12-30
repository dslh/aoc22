import HashGrid from 'lib/hash-grid';
const parser = (input) => {
  const grid = HashGrid();

  let key = 0;
  input.split('\n').forEach((line, y) => line.split('').forEach((chr, x) => {
    if (chr === '#') grid.set({ x, y }, { key: key++ });
  }));

  return grid;
}

export default parser;
