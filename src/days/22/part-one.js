import parser, { DIRS, INVERSE_DIRS } from './parser';

const TURN = {
  L: {
    up:    'left',
    left:  'down',
    down:  'right',
    right: 'up'
  },
  R: {
    up:    'right',
    right: 'down',
    down:  'left',
    left:  'up'
  }
}
export const changeDir = (turn, dir) => TURN[turn][dir];

const DIR_SCORE = ['right', 'down', 'left', 'up'];
export const score = ({ node: { x, y }, dir }) => (y + 1) * 1000 + (x + 1) * 4 + DIR_SCORE.indexOf(dir);

const stitchEdges = (map) => map.forEach((_, node) => {
  for (const dir of DIRS) {
    if (node[dir]) continue;

    const invDir = INVERSE_DIRS[dir];
    let to = node;
    while (to[invDir]) to = to[invDir].to;
    node[dir] = { to };
    to[invDir] = { to: node };
  }
});

const doMove = (distance, node, dir) => {
  for (let i = 0; i < distance; ++i) {
    const dest = node[dir];
    if (dest.to.wall) break;

    dir = dest.dir || dir;
    node = dest.to;
  }

  return { node, dir };
};

export const followInstruction = ({ move, turn }, { node, dir }) => {
  if (turn)
    return { node, dir: changeDir(turn, dir) };
  else
    return doMove(move, node, dir);
};

export const startPos = (map, input) => (
  { node: map.get({ x: input.indexOf('.'), y: 0 }), dir: 'right' }
);

const partOne = (input) => {
  const { map, moves } = parser(input);
  stitchEdges(map);

  let pos = startPos(map, input);
  for (const instruction of moves)
    pos = followInstruction(instruction, pos);

  return score(pos);
};

export default partOne;
