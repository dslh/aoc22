const Grid = () => ({
  grid: [],
  min: {},
  max: {},
  count: 0,

  set({ x, y }, value = true) {
    const { min, max, grid } = this;
    if (min.x === undefined || min.x > x) min.x = x;
    if (min.y === undefined || min.y > y) min.y = y;
    if (max.x === undefined || max.x < x) max.x = x;
    if (max.y === undefined || max.y < y) max.y = y;

    this.count++;

    grid[x] ||= [];
    grid[x][y] = value;
  },

  get({ x, y }) {
    return this.grid[x] && this.grid[x][y];
  },

  forEach(callback) {
    this.grid.forEach((col, x) =>
      col.forEach((value, y) => callback({ x, y }, value))
    );
  }
});

export default Grid;
