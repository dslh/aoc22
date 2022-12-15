import { orderedExtents } from './part-one';

const findSpace = (sensors, row, limit) => {
  let pos = -1;
  for (const [min, max] of orderedExtents(sensors, row)) {
    if (min > pos + 1) return pos + 1;

    pos = Math.max(max, pos);
    if (pos >= limit) return;
  }
};

const partTwo = (sensors) => {
  const limit = sensors.length === 14 ? 20 : 4_000_000;
  for (let row = 0; row < limit; ++row) {
    const space = findSpace(sensors, row, limit);
    if (space !== undefined)
      return space * 4_000_000 + row;
  }
}

export default partTwo;
