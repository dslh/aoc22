const KEY_CYCLES = [20, 60, 100, 140, 180, 220];

function *run(instructions) {
  let cycle = 0;
  let x = 1;

  for (const instruction of instructions) {
    cycle++;
    yield { cycle, x };

    if (instruction.startsWith('addx')) {
      cycle++;
      yield { cycle, x };
      x += Number.parseInt(instruction.split(' ')[1]);
    }
  }
}

const partOne = (data) => {
  let signal = 0;
  for (const { cycle, x } of run(data)) {
    if (((cycle + 20) % 40) === 0) {
      console.log(cycle, x, cycle * x);

      signal += cycle * x;
    }
  }

  return signal;
};

export default partOne;
