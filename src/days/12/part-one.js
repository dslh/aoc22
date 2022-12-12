function *adjacency({ row, col }) {
  yield { row, col: col - 1 };
  yield { row, col: col + 1 };
  yield { row: row - 1, col };
  yield { row: row + 1, col };
}

const outOfBounds = (grid, { row, col }) => (
  row < 0 || col < 0 || row >= grid.length || col >= grid[row].length
);

const visit = (grid, pos, visited, toVisit) => {
  if (visited[pos.row][pos.col]) return;
  visited[pos.row][pos.col] = true;

  const height = grid[pos.row][pos.col];

  for (const neighbour of adjacency(pos)) {
    if (outOfBounds(grid, neighbour)) continue;

    if (visited[neighbour.row][neighbour.col]) continue;

    if (grid[neighbour.row][neighbour.col] > height + 1) continue;

    toVisit.push({ ...neighbour, prev: pos });
  }
};

const pathLength = (pos) => {
  let length = 0;
  while (pos = pos.prev) length++;
  return length;
};

const partOne = ({ grid, start, end }) => {
  const toVisit = [start];
  const visited = [...Array(grid.length)].map(() => new Array(grid[0].length).fill(false));

  while (toVisit.length) {
    const next = toVisit.shift();
    if (next.row === end.row && next.col === end.col)
      return pathLength(next);

    visit(grid, next, visited, toVisit);
  }
};

export default partOne;
