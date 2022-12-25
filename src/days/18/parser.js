import Grid3d from 'lib/grid-3d';

const parser = (data) => {
  const grid = Grid3d();

  data.split('\n').forEach(line => {
    const [x,y,z] = line.split(',').map(i => Number.parseInt(i));
    grid.set({ x, y, z });
  });

  return grid;
};

export default parser;
