import Grid3d from 'lib/grid-3d';
import StormTracker from './storm-tracker';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

function *adjacency({ x, y }) {
  yield { x: x + 1, y };
  yield { x, y: y + 1 };
  yield { x: x - 1, y };
  yield { x: x + 1, y };
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

const estimation = (pos, height, finish) => (
  Math.abs(pos.x - finish) + height - pos.y
);

const partOne = ({ width, height, start, finish, blizzards }) => {
  const isBlizzard = StormTracker(blizzards, width, height);

  const queue = new MinPriorityQueue(pos => pos.estimate);
  const visited = Grid3d();

  queue.push({ x: start, y: -1, step: 0, estimate: 0 });
  visited.set({ x: start, y: -1, z: 0 });

  while (!queue.isEmpty()) {
    const pos = queue.pop();
    const step = pos.step + 1;
    if (pos.x === finish && pos.y === height - 1)
      return step;

    for (const move of moves(pos, step, width, height, isBlizzard)) {
      if (visited.get({ ...move, z: step })) continue;

      queue.push({ ...move, step, estimate: step + estimation(move, height, finish) });
      visited.set({ ...move, z: step });
    }
  }
};

export default partOne;
