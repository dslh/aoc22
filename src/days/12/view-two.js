import { useMemo } from 'react';

import View from './view';

const ViewTwo = ({ grid, end }) => {
  // Grid and end get reversed, so that search runs in the same direction as part one visually
  const drig = useMemo(() => grid.map(row => row.map(height => 25 - height).reverse()), [grid]);
  const dne = useMemo(() => ({ row: end.row, col: grid[0].length - end.col }), [grid, end]);

  const isEnd = useMemo(() => ({ row, col }) => drig[row][col] === 25, [drig]);

  return <View grid={drig} start={dne} isEnd={isEnd} />;
};

export default ViewTwo;
