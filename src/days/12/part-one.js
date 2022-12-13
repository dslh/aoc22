function *adjacency({ row, col }) {
  yield { row, col: col - 1 };
  yield { row, col: col + 1 };
  yield { row: row - 1, col };
  yield { row: row + 1, col };
}

const outOfBounds = (grid, { row, col }) => (
  row < 0 || col < 0 || row >= grid.length || col >= grid[row].length
);

export const visit = (grid, pos, touched, toVisit) => {
  const height = grid[pos.row][pos.col];

  for (const neighbour of adjacency(pos)) {
    if (outOfBounds(grid, neighbour)) continue;

    if (touched[neighbour.row][neighbour.col]) continue;

    if (grid[neighbour.row][neighbour.col] > height + 1) continue;

    toVisit.push({ ...neighbour, prev: pos });
    touched[neighbour.row][neighbour.col] = true;
  }
};

const pathLength = (pos) => {
  let length = 0;
  while ((pos = pos.prev) !== undefined) length++;
  return length;
};

export const search = (grid, start, isEnd) => {
  const toVisit = [start];
  const touched = [...Array(grid.length)].map(() => new Array(grid[0].length).fill(false));

  while (toVisit.length) {
    const next = toVisit.shift();
    if (isEnd(next))
      return pathLength(next);

    visit(grid, next, touched, toVisit);
  }
};

const partOne = ({ grid, start, end }) => (
  search(grid, start, pos => pos.row === end.row && pos.col === end.col)
);

export default partOne;
