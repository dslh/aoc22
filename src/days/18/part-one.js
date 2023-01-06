import Grid3d from 'lib/grid-3d';

export function *adjacency({ x, y, z }) {
  yield { x, y, z: z + 1, side: 'front' };
  yield { x, y, z: z - 1, side: 'back' };

  yield { x, y: y + 1, z, side: 'up' };
  yield { x, y: y - 1, z, side: 'down' };

  yield { x: x + 1, y, z, side: 'right' };
  yield { x: x - 1, y, z, side: 'left' };
}

export const toGrid = (coords) => {
  const grid = Grid3d();

  coords.forEach(coord => grid.set(coord));

  return grid;
};

const partOne = coords => {
  let faces = 0;

  const droplet = toGrid(coords);

  droplet.forEach(cube => {
    for (const neighbour of adjacency(cube))
      if (!droplet.get(neighbour))
        faces++;
  });

  return faces;
};

export default partOne;
