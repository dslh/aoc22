import Grid from 'lib/grid';

export const WIDTH = 7;

let blockColour = 0;
const Block = (...coords) => {
  const block = coords;

  block.width = Math.max(...block.map(([x]) => x)) + 1;
  block.height = Math.max(...block.map(([,y]) => y)) + 1;
  block.colour = ++blockColour;

  block.withOffset = function *(offset) {
    for (const [x, y] of this)
      yield { x: x + offset.x, y: y + offset.y };
  };

  return block;
};

export const BLOCKS = [
  // ####
  Block([0,0], [1,0], [2,0], [3,0]),

  //  #
  // ###
  //  #
  Block([1,0], [0,1], [1,1], [2,1], [1,2]),

  //   #
  //   #
  // ###
  Block([0,0], [1,0], [2,0], [2,1], [2,2]),

  // #
  // #
  // #
  // #
  Block([0,0], [0,1], [0,2], [0,3]),

  // ##
  // ##
  Block([0,0], [0,1], [1,0], [1,1])
];

const fixBlock = (grid, b, x, y, w) => {
  const block = BLOCKS[b % BLOCKS.length];
  const value = { wind: w, block: b, colour: block.colour };

  for (const pos of block.withOffset({ x, y }))
    grid.set(pos, value);
};

const blockFits = (grid, block, x, y) => {
  for (const pos of block.withOffset({ x, y }))
    if (grid.get(pos))
      return false;

  return true;
};

const inBounds = ({ width }, offsetX) => offsetX >= 0 && offsetX + width <= WIDTH;

export const dropBlock = (grid, blockPos, wind, windPos) => {
  let x = 2;
  let y = (grid.max.y === undefined ? 0 : grid.max.y + 1) + 3;
  const block = BLOCKS[blockPos % BLOCKS.length];
  
  for (let i = windPos; ; ++i, --y) {
    const w = i % wind.length;
    const shift = wind.charAt(w) === '<' ? -1 : 1;
    if (inBounds(block, x + shift) && blockFits(grid, block, x + shift, y))
      x += shift;

    if (!y || !blockFits(grid, block, x, y - 1)) {
      fixBlock(grid, blockPos, x, y, w);
      return i + 1;
    }
  }
};

export const printGrid = (grid) => {
  const lines = [];
  for (let y = grid.max.y; y >= 0; --y) {
    let str = '';
    for (let x = 0; x < WIDTH; ++x) {
      if (grid.get({ x, y}))
        str += '#';
      else
        str += '.';
    }
    lines.push('|' + str + '|');
  }
  lines.push('+-------+');
  console.log(lines.join('\n'));
}

export const dropBlocks = (wind, count) => {
  const grid = Grid();
  let windPos = 0;
  for (let block = 0; block < count; block++)
    windPos = dropBlock(grid, block, wind, windPos);

  return grid;
};

const partOne = (wind) => dropBlocks(wind, 2022).max.y + 1;

export default partOne;
