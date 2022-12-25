import Grid3d from 'lib/grid-3d';
import StormTracker from './storm-tracker';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

function *adjacency({ x, y }) {
  yield { x: x + 1, y };
  yield { x, y: y + 1 };
  yield { x: x - 1, y };
  yield { x, y: y - 1 };
}

function *moves(pos, step, width, height, isBlizzard) {
  for (const { x, y } of adjacency(pos)) {
    if (0 <= x && x < width &&
        0 <= y && y < height &&
        !isBlizzard({ x, y }, step))
      yield { x, y };
  }

  if (!isBlizzard(pos, step))
    yield pos;
}

const estimation = (pos, finish) => (
  Math.abs(pos.x - finish.x) + Math.abs(pos.y - finish.y)
);

export const commonMultiple = (a, b) => {
  if (a > b) [a, b] = [b, a];

  let c = a;
  while (c % b) c += a;

  return c;
};

export const search = ({ start, finish, width, height, isBlizzard, loop }) => {
  const queue = new MinPriorityQueue(pos => pos.estimate);
  const visited = Grid3d();

  queue.push(start);
  visited.set({ ...start, z: start.step % loop });

  while (!queue.isEmpty()) {
    const pos = queue.pop();
    const step = pos.step + 1;
    if (pos.x === finish.x && Math.abs(pos.y - finish.y) === 1)
      return step;

    for (const move of moves(pos, step, width, height, isBlizzard)) {
      if (visited.get({ ...move, z: step % loop })) continue;

      queue.push({ ...move, step, estimate: step + estimation(move, finish) });
      visited.set({ ...move, z: step % loop });
    }
  }
};

const partOne = ({ width, height, start, finish, blizzards }) => {
  const loop = commonMultiple(width, height);
  const isBlizzard = StormTracker(blizzards, loop);

  return search({
    start: { x: start, y: -1, step: 0 },
    finish: { x: finish, y: height },
    width, height, isBlizzard, loop
  });
};

export default partOne;
