import Grid from 'lib/grid';

const commonMultiple = (a, b) => {
  if (a > b) [a, b] = [b, a];

  let c = a;
  while (c % b) c += a;

  return c;
};

const StormTracker = (blizzards, width, height) => {
  const steps = [];
  const loop = commonMultiple(width, height);
  console.log(width, height, loop);

  const stateAt = (step) => {
    const state = Grid();
    for (const blizzard of blizzards)
      state.set(blizzard(step));

    console.log(step);
    console.log(state.min, state.max);
    let str = '';
    for (let y = 0; y <= state.max.y; ++y) {
      for (let x = 0; x <= state.max.x; ++x) {
        if (state.get({ x, y }))
          str += '#';
        else
          str += '.';
      }
      str += '\n';
    }
    console.log(str);

    return state;
  };

  return (pos, step) => {
    step %= loop;
    while (step >= steps.length)
      steps.push(stateAt(steps.length));

    return steps[step].get(pos);
  };
};

export default StormTracker;
