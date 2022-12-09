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

export function *moveRope(instructions, tailLength) {
  const rope = [...Array(tailLength + 1)].map(() => ({ x: 0, y: 0 }));

  for (const { dir, count } of instructions) {
    for (let i = 0; i < count; i++) {
      moveHead(rope[0], dir);
      for (let j = 1; j < rope.length; j++)
        moveTail(rope[j - 1], rope[j]);
      yield rope;
    }
  }
};

const visit = (visited, { x, y }) => {
  visited[x] ||= {};
  visited[x][y] = true;
}

export const tailVisitation = (instructions, tailLength = 1) => {
  const visited = { 0: { 0: true } };

  for (const rope of moveRope(instructions, tailLength))
    visit(visited, rope[tailLength]);

  return visited;
}

export const mapSize = (visited) => (
  Object.values(visited).reduce((sum, col) => sum + Object.keys(col).length, 0)
);

const partOne = (instructions) => mapSize(tailVisitation(instructions));

export default partOne;
