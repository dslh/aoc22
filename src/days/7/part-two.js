import { selectDirs, calcDirSizes } from './part-one';

const SIZE_LIMIT = 40_000_000;

const partTwo = (data) => {
  calcDirSizes(data);
  const totalSize = data.size;

  return Math.min(
    ...selectDirs(data, dir => totalSize - dir.size <= SIZE_LIMIT).map(dir => dir.size)
  );
};

export default partTwo;
