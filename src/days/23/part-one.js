import HashGrid from 'lib/hash-grid';

const posAdd = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });

const DIRS = {
  N: { x:  0, y: -1 },
  S: { x:  0, y:  1 },
  E: { x:  1, y:  0 },
  W: { x: -1, y:  0 },

  NW: { x: -1, y: -1 },
  NE: { x:  1, y: -1 },
  SW: { x: -1, y:  1 },
  SE: { x:  1, y:  1 }
};

const SEEK = {
  N: [DIRS.NW, DIRS.N, DIRS.NE],
  S: [DIRS.SW, DIRS.S, DIRS.SE],
  W: [DIRS.NW, DIRS.W, DIRS.SW],
  E: [DIRS.NE, DIRS.E, DIRS.SE]
}

const DIR_ORDER = ['N', 'S', 'W', 'E'];
function *dirs(step) {
  for (let i = 0; i < DIR_ORDER.length; ++i)
    yield DIR_ORDER[(i + step) % DIR_ORDER.length];
}

const nextPos = (grid, pos, step) => {
  for (const dir of dirs(step)) {
    if (!SEEK[dir].some(seek => grid.get(posAdd(pos, seek))))
      return posAdd(pos, DIRS[dir]);
  }
}

const isHappy = (grid, pos) => (
  Object.values(DIRS).every(dir => !grid.get(posAdd(pos, dir)))
);

export const step = (grid, step) => {
  const next = HashGrid();

  let happy = 0;
  grid.forEach(pos => {
    if (isHappy(grid, pos)) {
      happy++;
      next.set(pos, [pos]);
      return;
    }

    const newPos = nextPos(grid, pos, step) || pos;

    const queue = next.get(newPos);
    if (queue)
      queue.push(pos);
    else
      next.set(newPos, [pos]);
  });

  if (happy === grid.count)
    return grid;

  next.forEach((pos, queue) => {
    if (queue.length === 1) {
      next.set(pos, true);
    } else {
      for (const oldPos of queue) {
        next.set(oldPos);
      }
      next.del(pos);
    }
  });

  return next;
}

const printGrid = (grid) => {
  console.log(grid);
  let str = '';
  for (let y = grid.min.y; y <= grid.max.y; ++y) {
    for (let x = grid.min.x; x <= grid.max.x; ++x) {
      if (grid.get({ x, y }))
        str += '#';
      else
        str += '.';
    }
    str += '\n';
  }
  console.log(str);
};

const partOne = (grid) => {
  for (let i = 0; i < 10; ++i)
    grid = step(grid, i);

  return (grid.max.x - grid.min.x + 1) * (grid.max.y - grid.min.y + 1) - grid.count;
}

export default partOne;
