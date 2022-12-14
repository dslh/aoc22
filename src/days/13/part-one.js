export const compare = (a, b) => {
  let i;
  for (i = 0; i < a.length && i < b.length; ++i) {
    const x = a[i];
    const y = b[i];
    if (Array.isArray(x)) {
      if (Array.isArray(y)) {
        const cmp = compare(x, y);
        if (cmp) return cmp;
      } else {
        const cmp = compare(x, [y]);
        if (cmp) return cmp;
      }
    } else {
      if (Array.isArray(y)) {
        const cmp = compare([x], y);
        if (cmp) return cmp;
      } else {
        if (x < y) return -1;
        if (y < x) return 1;
      }
    }
  }

  if (i === a.length) {
    if (i === b.length)
      return 0;
    else
      return -1;
  } else {
    return 1;
  }
}

const partOne = (data) => (
  data.map((pair, i) => ([pair, i + 1]))
      .filter(([[a, b], i]) => compare(a, b) !== 1)
      .reduce((sum, [_, i]) => sum + i, 0)
);

export default partOne;
