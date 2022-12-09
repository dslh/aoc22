import useTimedGenerator from 'lib/use-timed-generator';

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
  const { visible, focus } = useTimedGenerator(illuminate, [data], {}, 80);

  return <Forest data={data} visible={visible} focus={focus} />;
};

export default ViewOne;
