const partOne = (grid) => {
  const height = grid.length;
  const width = grid[0].length;

  const visible = [...Array(height)].map(() => new Array(width).fill(false));
  console.log(visible);

  for (let row = 0; row < height; ++row) {
    let max = -1;
    for (let col = 0; col < width; ++col) {
      const tree = grid[row][col];
      if (tree > max) {
        visible[row][col] = true;
        max = tree;
      }
    }

    max = -1;
    for (let col = height - 1; col >= 0; --col) {
      const tree = grid[row][col];
      if (tree > max) {
        visible[row][col] = true;
        max = tree;
      }
    }
  }

  for (let col = 0; col < height; ++col) {
    let max = -1;
    for (let row = 0; row < width; ++row) {
      const tree = grid[row][col];
      if (tree > max) {
        visible[row][col] = true;
        max = tree;
      }
    }

    max = -1;
    for (let row = width - 1; row >= 0; --row) {
      const tree = grid[row][col];
      if (tree > max) {
        visible[row][col] = true;
        max = tree;
      }
    }
  }

  return visible.reduce((sum, row) => sum + row.filter(v => v).length, 0);
};

export default partOne;
