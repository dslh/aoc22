import Grid3d from 'lib/grid-3d';
import adjacency from './adjacency';

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
