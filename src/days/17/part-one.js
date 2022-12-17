import Grid from 'lib/grid';

let blockColour = 0;
const Block = (...coords) => {
  const block = coords;
  block.width = Math.max(...block.map(([x]) => x)) + 1;
  block.height = Math.max(...block.map(([,y]) => y)) + 1;
  block.colour = ++blockColour;
  return block;
};

const BLOCKS = [
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

const fixBlock = (grid, block, offsetX, offsetY) => {
  for (const [x, y] of block)
    grid.set({ x: x + offsetX, y: y + offsetY }, block.colour);
};

const blockFits = (grid, block, offsetX, offsetY) => {
  for (const [x, y] of block)
    if (grid.get({x : x + offsetX, y: y + offsetY }))
      return false;

  return true;
};

const inBounds = ({ width }, offsetX) => offsetX >= 0 && offsetX + width <= 7;

const dropBlock = (grid, block, wind, windPos) => {
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
    let str = '|';
    for (let x = 0; x < 7; ++x) {
      if (grid.get({ x, y}))
        str += '#';
      else
        str += '.';
    }
    lines.push(str + '|');
  }
  lines.push('+-------+');
  console.log(lines.join('\n'));
}

const partOne = (wind) => {
  const grid = Grid();
  let windPos = 0;
  for (let i = 0; i < 2022; i++)
    windPos = dropBlock(grid, BLOCKS[i % BLOCKS.length], wind, windPos);

  printGrid(grid);
  return grid.max.y + 1;
};

export default partOne;
