export const Grid3d = () => ({
  grid: [],
  min: {},
  max: {},

  set({ x, y, z }, value = true) {
    const { min, max, grid } = this;
    if (min.x === undefined || min.x > x) min.x = x;
    if (min.y === undefined || min.y > y) min.y = y;
    if (min.z === undefined || min.z > z) min.z = z;
    if (max.x === undefined || max.x < x) max.x = x;
    if (max.y === undefined || max.y < y) max.y = y;
    if (max.z === undefined || max.z < z) max.z = z;

    grid[x] ||= [];
    grid[x][y] ||= [];
    grid[x][y][z] = value;
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
  },

  inBounds({ x, y, z }) {
    const { min, max } = this;
    return min.x <= x && x <= max.x &&
           min.y <= y && y <= max.y &&
           min.z <= z && z <= max.z;
  }
});

const parser = (data) => {
  const grid = Grid3d();

  data.split('\n').forEach(line => {
    const [x,y,z] = line.split(',').map(i => Number.parseInt(i));
    grid.set({ x, y, z });
  });

  return grid;
};

export default parser;
