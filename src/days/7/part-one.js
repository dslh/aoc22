// Recursively iterate over all directories in the tree,
// and call a given function for each directory.
const eachDir = (root, func, path = []) => {
  func(root, path);

  path.push(root);
  Object.values(root.dirs).forEach((dir) => eachDir(dir, func, path));
  path.pop();
};

// Returns a list of all directories
// for which a given predicate function returns true.
export const selectDirs = (root, predicate) => {
  const out = [];
  eachDir(root, dir => predicate(dir) && out.push(dir));
  return out;
};

// Adds a size property to all directories in the tree
// that is the size of all files in the directory and subdirectories
export const calcDirSizes = (root) => (
  eachDir(root, (dir, path) => {
    dir.size = 0;

    Object.values(dir.files).forEach(size => {
      dir.size += size;
      // Also add the size of the file to all parent directories
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
