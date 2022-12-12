import { useMemo } from 'react';

import View from './view';

const ViewTwo = ({ grid, end }) => {
  const drig = useMemo(() => grid.map(row => row.map(height => 25 - height).reverse()), [grid]);
  const dne = useMemo(() => ({ row: end.row, col: grid[0].length - end.col }), [end]);

  const isEnd = useMemo(() => ({ row, col }) => drig[row][col] === 25, [grid]);

  return <View grid={drig} start={dne} isEnd={isEnd} />;
};

export default ViewTwo;
