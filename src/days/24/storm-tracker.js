import Grid from 'lib/grid';

const logStep = (step, state) => {
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
};

const StormTracker = (blizzards, loop) => {
  const steps = [];

  const stateAt = (step) => {
    const state = Grid();
    for (const blizzard of blizzards)
      state.set(blizzard(step));

    // logStep(step, state);

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
