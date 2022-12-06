const isUnique = (str) => (
  new Set(str.split('')).size === str.length
);

export const findUniqueSubstr = (str, size) => {
  for (let i = 0; i < str.length - size + 1; ++i)
    if (isUnique(str.slice(i, i + size)))
      return i;
}

const WINDOW = 4;

const partOne = (data) => findUniqueSubstr(data, WINDOW) + WINDOW;

export default partOne;
