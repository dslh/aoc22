const Grid3d = () => ({
  grid: [],

  set({ x, y, z }, value = true) {
    this.grid[x] ||= [];
    this.grid[x][y] ||= [];
    this.grid[x][y][z] = value;
  },

  get({ x, y, z }) {
    return this.grid[x] && this.grid[x][y] && this.grid[x][y][z];
  },

  forEach(callback) {
    this.grid.forEach((col, x) =>
      col.forEach((stack, y) =>
        stack.forEach((value, z) => callback({ x, y, z }, value))
      )
    );
  }
});

const parser = (data) => {
  const grid = Grid3d();

  data.split('\n').forEach(line => {
    const [x,y,z] = line.split(',').map(i => Number.parseInt(i));
    grid.set({ x, y, z });
  });

  console.log(grid);
  return grid;
};

export default parser;
