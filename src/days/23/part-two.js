import { step } from './part-one';

const partTwo = (grid) => {
  let i = 0;
  let prev;
  do {
    prev = grid;
    grid = step(grid, i++);
  } while (prev !== grid);

  return i;
}

export default partTwo;
