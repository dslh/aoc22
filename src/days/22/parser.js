import Grid from 'lib/grid';

export const DIRS = ['up', 'down', 'left', 'right'];
export const INVERSE_DIRS = {
  up:    'down',
  down:  'up',
  left:  'right',
  right: 'left'
};
const DIR_COORDS = {
  right: ({ x, y }) => ({ x: x + 1, y }),
  left:  ({ x, y }) => ({ x: x - 1, y }),
  down:  ({ x, y }) => ({ x, y: y + 1 }),
  up:    ({ x, y }) => ({ x, y: y - 1 })
};

const MOVE = /((?<move>\d+)|(?<turn>[LR]))/g

const parseMoves = (moves) => [...moves.matchAll(MOVE)].map(match => {
  const { move, turn } = match.groups;

  if (turn) return { turn };

  return { move: Number.parseInt(move) };
});

const parseMap = (input) => {
  const grid = Grid();

  input.split('\n').forEach((line, y) => {
    for (let x = 0; x < line.length; ++x) {
      const chr = line.charAt(x);
      if (chr === ' ') continue;

      const pos = { x, y, wall: chr === '#' };
      grid.set(pos, pos);
    }
  });

  grid.forEach(({ x, y }, node) => {
    for (const dir of DIRS) {
      const to = grid.get(DIR_COORDS[dir](node));
      if (to) node[dir] = { to };
    }
  });

  return grid;
};

const parser = (data) => {
  const [map, moves] = data.split('\n\n');

  return { map: parseMap(map), moves: parseMoves(moves) };
}

export default parser;
