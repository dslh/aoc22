const eachDir = (root, func, path = []) => {
  func(root, path);

  path.push(root);
  Object.values(root.dirs).forEach((dir) => eachDir(dir, func, path));
  path.pop();
};

export const selectDirs = (root, predicate) => {
  const out = [];
  eachDir(root, dir => predicate(dir) && out.push(dir));
  return out;
};

export const calcDirSizes = (root) => (
  eachDir(root, (dir, path) => {
    dir.size = 0;

    Object.values(dir.files).forEach(size => {
      dir.size += size;
      path.forEach(ancestor => ancestor.size += size);
    })
  })
);

const partOne = (data) => {
  calcDirSizes(data);

  const smallDirs = selectDirs(data, dir => dir.size <= 100000);
  return smallDirs.reduce((sum, dir) => sum + dir.size, 0);
};

export default partOne;
