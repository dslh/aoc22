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

export const run = (instructions, tailLength = 1) => (
  instructions.reduce((state, { dir, count }) => {
    const { rope, visited } = state;

    for (let i = 0; i < count; i++) {
      moveHead(rope[0], dir);
      for (let j = 1; j < rope.length; j++)
        moveTail(rope[j - 1], rope[j]);
      visit(visited, rope[tailLength]);
    }

    return state;
  }, {
    rope: [...Array(tailLength + 1)].map(() => ({ x: 0, y: 0 })),
    visited: { 0: { 0: true } }
  })
);

export const mapSize = (visited) => (
  Object.values(visited).reduce((sum, col) => sum + Object.keys(col).length, 0)
);

const partOne = (instructions) => mapSize(run(instructions).visited);

export default partOne;
