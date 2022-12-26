import { BLOCKS, WIDTH, dropBlock, printGrid } from './part-one';
import Grid from 'lib/grid';

const COUNT = 1_000_000_000_000;

const rowsMatch = (grid, y1, y2) => (
  [...Array(WIDTH)].every((_,x) => {
    const p1 = grid.get({ x, y: y1 });
    const p2 = grid.get({ x, y: y2 });

    if (!p1 !== !p2) return false; // One is empty the other is not

    return !(p1 || p2) || (p1.wind === p2.wind && p1.colour === p2.colour);
  })
);

const findMatchingRow = (grid) => {
  for (let y = grid.max.y - 10; y > 10; --y)
    if ([...Array(10)].every((_,i) => rowsMatch(grid, y - i, grid.max.y - i)))
      return y;
};

const blockOnRow = (grid, y) => {
  for (let x = 0; x < WIDTH; ++x) {
    const p = grid.get({ x, y });
    if (p) return p.block;
  }
}

const partTwo = (wind) => {
  const grid = Grid();
  let windPos = 0;
  let block = -1;
  const nextBlock = () => (
    windPos = dropBlock(grid, ++block, wind, windPos)
  );

  while (windPos < wind.length)
    nextBlock();

  let loopStart;
  while ((block % BLOCKS.length) || !(loopStart = findMatchingRow(grid)))
    nextBlock();

  const startBlock = blockOnRow(grid, loopStart);

  const rowsInLoop = grid.max.y - loopStart;
  const blocksInLoop = block - startBlock;
  const remainingBlocks = COUNT - startBlock - 1;

  const loops = Math.floor(remainingBlocks / blocksInLoop) - 1;
  const remainder = remainingBlocks % blocksInLoop;

  for (let i = 0; i < remainder; ++i)
    nextBlock();

  return grid.max.y + 1 + rowsInLoop * loops;
};

export default partTwo;
