import { search } from './part-one';

const partTwo = ({ grid, end }) => {
  grid = grid.map(row => row.map(height => 25 - height));
  return search(grid, end, pos => grid[pos.row][pos.col] === 25);
};

export default partTwo;
