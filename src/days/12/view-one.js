import { useMemo } from 'react';

import View from './view';

const ViewOne = ({ grid, start, end }) => {
  const isEnd = useMemo(() => ({ row, col }) => row === end.row && col === end.col, [end]);

  return <View grid={grid} start={start} end={end} isEnd={isEnd} />;
};

export default ViewOne;
