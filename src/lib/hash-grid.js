const toKey = (x, y) => `${x},${y}`;
const fromKey = (str) => str.split(',').map(n => Number.parseInt(n));

const HashGrid = () => ({
  grid: {},
  min: {},
  max: {},
  count: 0,

  set({ x, y }, value = true) {
    const { min, max, grid } = this;
    if (min.x === undefined || min.x > x) min.x = x;
    if (min.y === undefined || min.y > y) min.y = y;
    if (max.x === undefined || max.x < x) max.x = x;
    if (max.y === undefined || max.y < y) max.y = y;

    const key = toKey(x, y);
    if (grid[key] === undefined) ++this.count;

    grid[key] = value;
  },

  get({ x, y }) {
    return this.grid[toKey(x, y)];
  },

  del({ x, y }) {
    const key = toKey(x, y);
    if (this.grid[key] !== undefined) {
      --this.count;
      delete this.grid[key];
    }
  },

  forEach(callback)  {
    for (const [key, value] of Object.entries(this.grid)) {
      const [x, y] = fromKey(key);
      callback({ x, y }, value);
    }
  }
});

export default HashGrid;
