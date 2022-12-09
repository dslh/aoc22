const DIRS = {
  'U': { x:  0, y:  1 },
  'D': { x:  0, y: -1 },
  'L': { x: -1, y:  0 },
  'R': { x:  1, y:  0 }
};

const moveHead = (head, dir) => {
  const v = DIRS[dir];
  head.x += v.x;
  head.y += v.y;
}

const moveTail = (head, tail) => {
  if (Math.abs(head.x - tail.x) < 2 &&
      Math.abs(head.y - tail.y) < 2)
    return;

  if (head.x > tail.x) tail.x++;
  else if (head.x < tail.x) tail.x--;

  if (head.y > tail.y) tail.y++;
  else if (head.y < tail.y) tail.y--;
}

const visit = (visited, { x, y }) => {
  visited[x] ||= {};
  visited[x][y] = true;
}

const run = (instructions) => (
  instructions.reduce((state, { dir, count }) => {
    console.log(state);
    const { head, tail, visited } = state;

    for (let i = 0; i < count; i++) {
      moveHead(head, dir);
      moveTail(head, tail);
      visit(visited, tail);
    }

    return state;
  }, {
    head: { x: 0, y: 0 },
    tail: { x: 0, y: 0 },
    visited: { 0: { 0: true } }
  })
);

const mapSize = (visited) => (
  Object.values(visited).reduce((sum, col) => sum + Object.keys(col).length, 0)
);

const partOne = (instructions) => mapSize(run(instructions).visited);

export default partOne;
