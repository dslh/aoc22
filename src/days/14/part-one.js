import Grid from 'lib/grid';

export function *downwards({ x, y }) {
  y += 1;
  yield { x, y };
  yield { x: x - 1, y };
  yield { x: x + 1, y };
}

export const fillCave = (rocks, loopCondition) => {
  const sand = Grid();

  let current = { x: 500, y: 0 };
  const flow = [current];

  const flowDownwards = () => {
    if (current.y === rocks.max.y + 1) return;

    for (const next of downwards(current))
      if (!(rocks.get(next) || sand.get(next)))
        return next;
  };

  for (; loopCondition(current); current = flow[flow.length - 1]) {
    const next = flowDownwards();
    if (next) {
      flow.push(next);
    } else {
      sand.set(current);
      flow.pop();
    }
  }

  return sand.count;
};

const partOne = (rocks) => fillCave(rocks, pos => pos.y < rocks.max.y);

export default partOne;
