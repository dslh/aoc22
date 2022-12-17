import Grid from 'lib/grid';

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

const fixBlock = (grid, block, x, y) => {
  for (const pos of block.withOffset({ x, y }))
    grid.set(pos, block.colour);
};

const blockFits = (grid, block, x, y) => {
  for (const pos of block.withOffset({ x, y }))
    if (grid.get(pos))
      return false;

  return true;
};

const inBounds = ({ width }, offsetX) => offsetX >= 0 && offsetX + width <= 7;

export const dropBlock = (grid, block, wind, windPos) => {
  let x = 2;
  let y = (grid.max.y === undefined ? 0 : grid.max.y + 1) + 3;
  
  for (let i = windPos; ; ++i, --y) {
    const shift = wind.charAt(i % wind.length) === '<' ? -1 : 1;
    if (inBounds(block, x + shift) && blockFits(grid, block, x + shift, y))
      x += shift;

    if (!y || !blockFits(grid, block, x, y - 1)) {
      fixBlock(grid, block, x, y);
      return i + 1;
    }
  }
};

const printGrid = (grid) => {
  const lines = [];
  for (let y = grid.max.y; y >= 0; --y) {
    let str = '';
    for (let x = 0; x < 7; ++x) {
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
  for (let i = 0; i < count; i++)
    windPos = dropBlock(grid, BLOCKS[i % BLOCKS.length], wind, windPos);

  return grid;
};

const partOne = (wind) => dropBlocks(wind, 2022).max.y + 1;

export default partOne;
