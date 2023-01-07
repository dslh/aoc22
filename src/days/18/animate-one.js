import adjacency, { INVERSE_SIDE } from './adjacency';

const enableCube = (grid, list, index) => {
  const { position, faces } = list[index];
  list[index].added = true;

  let added = 0;
  for (const neighbour of adjacency(position)) {
    const adjacent = grid.get(neighbour);
    if (adjacent && adjacent.added) {
      delete adjacent.faces[INVERSE_SIDE[neighbour.side]];
      added--;
    } else {
      faces[neighbour.side] = 'hot';
      added++;
    }
  }

  return added;
};

function *animateOne(list, grid, setPartOne) {
  for (let i = 0, j = -20; i < list.length; i += Math.max(1, j++)) {
    let added = 0;
    const limit = Math.min(list.length, i + Math.max(1, j));
    for (let k = i; k < limit; ++k)
      added += enableCube(grid, list, k);
    setPartOne(v => v + added);
    yield;
  }
}

export default animateOne;
