const viewScore = (grid, row, col) => {
  const tree = grid[row][col];

  let east = 1;
  for (; (col + east) < grid[row].length - 1 && grid[row][col + east] < tree; east++);
  
  let west = 1;
  for (; (col - west) > 0 && grid[row][col - west] < tree; west++);

  let south = 1;
  for (; (row + south) < grid.length - 1 && grid[row + south][col] < tree; south++);

  let north = 1;
  for (; (row - north) > 0 && grid[row - north][col] < tree; north++);

  return north * south * east * west;
};

const partTwo = (grid) => {
  let max = -1;
  for (let row = 1; row < grid.length - 1; row++)
    for (let col = 1; col < grid[0].length - 1; col++) {
      const score = viewScore(grid, row, col);
      if (score >= max) max = score;
    }

  return max;
}

export default partTwo;
