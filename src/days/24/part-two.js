import StormTracker from './storm-tracker';
import { commonMultiple, search } from './part-one';

const partTwo = ({ width, height, start, finish, blizzards }) => {
  const loop = commonMultiple(width, height);
  const isBlizzard = StormTracker(blizzards, loop);

  const from = { x: start, y: -1 };
  const to = { x: finish, y: height };

  const there = search({
    width, height, isBlizzard, loop,
    start: { ...from, step: 0 },
    finish: to
  });
  const back = search({
    width, height, isBlizzard, loop,
    start: { ...to, step: there },
    finish: from
  });

  return search({
    width, height, isBlizzard, loop,
    start: { ...from, step: back },
    finish: to
  });
};

export default partTwo;
