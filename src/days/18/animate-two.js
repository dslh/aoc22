import adjacency, { INVERSE_SIDE } from './adjacency';
import WaterQueue from './water-queue';

const boundsOf = ({ min, max }) => ({
  min: { x: min.x - 1, y: min.y - 1, z: min.z - 1 },
  max: { x: max.x + 1, y: max.y + 1, z: max.z + 1 }
});

const outOfBounds = ({ min, max }, { x, y, z }) => (
  min.x > x || x > max.x ||
  min.y > y || y > max.y ||
  min.z > z || z > max.z
);

const faucet = ({ min, max }) => ({
  x: Math.round((max.x + min.x) / 2),
  y: max.y,
  z: Math.round((max.z + min.z) / 2)
});

const addWater = (position, grid, list, bounds, queue) => {
  if (grid.get(position)) return 0;

  const drop = { position, faces: {}, water: true };
  grid.set(position, drop);
  list.push(drop);

  let added = 0;
  for (const neighbour of adjacency(position)) {
    if (outOfBounds(bounds, neighbour)) continue;

    const adjacent = grid.get(neighbour);
    if (adjacent) {
      if (adjacent.water) {
        delete adjacent.faces[INVERSE_SIDE[neighbour.side]];
      } else {
        adjacent.faces[INVERSE_SIDE[neighbour.side]] = 'cold';
        added++;
      }
    } else {
      drop.faces[neighbour.side] = 'water';
      queue.push(neighbour);
    }
  }

  return added;
};

function *animateTwo(list, grid, setPartTwo) {
  const bounds = boundsOf(grid);
  const queue = WaterQueue();

  addWater(faucet(bounds), grid, list, bounds, queue);
  yield;
  
  while (!queue.empty()) {
    const positions = queue.popSome();
    let added = 0;
    for (let i = 0; i < positions.length; ++i) {
      const position = positions[i];
      if (grid.get(position))
        continue;

      added += addWater(position, grid, list, bounds, queue);
    }
    setPartTwo(v => v + added);
    yield;
  }
}

export default animateTwo;
