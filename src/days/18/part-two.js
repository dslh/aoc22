import { Grid3d } from './parser';
import { adjacency } from './part-one';

const IS_POCKET = 1;
const NOT_POCKET = 2;
const CANDIDATE = 3;

const fillPocket = (droplet, pockets, start) => {
  let isPocket = true;

  pockets.set(start, CANDIDATE);
  const blob = [start];
  for (let i = 0; isPocket && i < blob.length; ++i) {
    const pos = blob[i];
    for (const neighbour of adjacency(pos)) {
      if (droplet.get(neighbour)) continue;

      const state = pockets.get(neighbour);
      if (state === CANDIDATE) continue;
      if (state === NOT_POCKET || !droplet.inBounds(neighbour)) {
        isPocket = false;
        break;
      }

      pockets.set(neighbour, CANDIDATE);
      blob.push(neighbour);
    }
  }

  const value = isPocket ? IS_POCKET : NOT_POCKET;
  for (const pos of blob)
    pockets.set(pos, value);
};

const isPocket = (droplet, pockets, pos) => {
  const isPocket = pockets.get(pos);
  if (isPocket) return isPocket === IS_POCKET;

  fillPocket(droplet, pockets, pos);
  return pockets.get(pos) == IS_POCKET;
}

const partTwo = droplet => {
  let faces = 0;
  const pockets = Grid3d();

  droplet.forEach(cube => {
    for (const neighbour of adjacency(cube))
      if (!(droplet.get(neighbour) || isPocket(droplet, pockets, neighbour)))
        faces++
  });

  return faces;
};

export default partTwo;
