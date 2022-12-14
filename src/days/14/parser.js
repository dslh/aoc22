import Grid from 'lib/grid';

const parseLine = (grid, line) => {
  const coords = line.split(' -> ').map(
    coord => coord.split(',').map(i => Number.parseInt(i))
  );

  for (let i = 1; i < coords.length; ++i) {
    let [x,y] = coords[i-1];
    let [X,Y] = coords[i];

    if (X - x < 0) [x,X] = [X,x];
    if (Y - y < 0) [y,Y] = [Y,y];

    for (; x <= X; x++) grid.set({ x, y });
    x--;
    for (; y <= Y; y++) grid.set({ x, y });
  }

  return grid;
};

const parser = (data) => (
  data.split('\n').reduce(parseLine, Grid())
);

export default parser;
