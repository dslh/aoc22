import Grid from 'lib/grid';

function *downwards({ x, y }) {
  y += 1;
  yield { x, y };
  yield { x: x - 1, y };
  yield { x: x + 1, y };
}

const partOne = (rocks) => {
  const sand = Grid();
  const filled = (pos) => rocks.get(pos) || sand.get(pos);

  let current = { x: 500, y: 0 };
  const flow = [current];
  for (; current.y < rocks.max.y; current = flow[flow.length - 1]) {
    for (const next of downwards(current)) {
      if (!filled(next)) {
        flow.push(next);
        break;
      }
    }

    if (current === flow[flow.length - 1]) {
      sand.set(current);
      flow.pop();
    }
  }

  return sand.count;
};

export default partOne;
