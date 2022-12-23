const TURN = {
  L: {
    U: 'L',
    D: 'R',
    L: 'D',
    R: 'U'
  },
  R: {
    U: 'R',
    D: 'L',
    L: 'U',
    R: 'D'
  }
};
const changeDir = (turn, dir) => TURN[turn][dir];

const DIRS = {
  U: [ 0, -1],
  D: [ 0,  1],
  L: [-1,  0],
  R: [ 1,  0]
};
const nextPos = (map, pos, dir) => {
  const [dX, dY] = DIRS[dir];
  const next = { x: pos.x + dX, y: pos.y + dY };

  const maybe = map[next.y][next.x];
  if (typeof maybe === 'object') {
    if (dX) next.x = maybe.x;
    if (dY) next.y = maybe.y;
  }

  if (map[next.y][next.x] === '.')
    return next;
};

const DIR_SCORE = ['R', 'D', 'L', 'U'];
const score = ({ x, y }, dir) => (y + 1) * 1000 + (x + 1) * 4 + DIR_SCORE.indexOf(dir);

const partOne = ({ map, moves }) => {
  let pos = { x: map[0].indexOf('.'), y: 0 };
  let dir = 'R';

  for (const { move, turn } of moves) {
    if (move) {
      for (let i = 0; i < move; ++i) {
        const next = nextPos(map, pos, dir);
        if (!next) break;
        pos = next;
      }
    } else {
      dir = changeDir(turn, dir);
    }
  }

  return score(pos, dir);
};

export default partOne;
