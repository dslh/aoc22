import { useMemo, useEffect, useState } from 'react';

import Forest from './forest';

function* illuminate(grid) {
  const height = grid.length;
  const width = grid[0].length;

  const visible = [...Array(height)].map(() => new Array(width).fill(false));

  for (let row = 0; row < height; ++row) {
    let max = -1;
    for (let col = 0; col < width - 1; ++col) {
      const tree = grid[row][col];
      if (tree > max) {
        visible[row][col] = true;
        max = tree;
      }

      yield { visible, focus: { row, col } };
      if (max === 9) break;
    }

    max = -1;
    for (let col = height - 1; col >= 1; --col) {
      const tree = grid[row][col];
      if (tree > max) {
        visible[row][col] = true;
        max = tree;
      }

      yield { visible, focus: { row, col } };
      if (max === 9) break;
    }
  }

  for (let col = 1; col < height - 1; ++col) {
    let max = -1;
    for (let row = 0; row < width - 1; ++row) {
      const tree = grid[row][col];
      if (tree > max) {
        visible[row][col] = true;
        max = tree;
      }

      yield { visible, focus: { row, col } };
      if (max === 9) break;
    }

    max = -1;
    for (let row = width - 1; row >= 1; --row) {
      const tree = grid[row][col];
      if (tree > max) {
        visible[row][col] = true;
        max = tree;
      }

      yield { visible, focus: { row, col } };
      if (max === 9) break;
    }
  }

  yield { visible };
}

const ViewOne = ({ data }) => {
  const iterator = useMemo(() => illuminate(data), [data]);
  const [{ visible, focus }, setState] = useState({});

  useEffect(() => {
    let timeoutId;
    const timeout = () => {
      const { value, done } = iterator.next();
      if (done) return;

      setState(value);
      timeoutId = setTimeout(timeout, 80);
    };
    timeoutId = setTimeout(timeout);

    return () => clearTimeout(timeoutId);
  }, [iterator]);

  return <Forest data={data} visible={visible} focus={focus} />;
};

export default ViewOne;
