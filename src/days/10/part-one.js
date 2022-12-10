const KEY_CYCLES = [20, 60, 100, 140, 180, 220];

export function *runProgram(instructions) {
  let cycle = 0;
  let x = 1;

  for (const instruction of instructions) {
    if (instruction === 'noop') {
      cycle++;
      yield { cycle, x, instruction };
    } else if (instruction.startsWith('addx')) {
      cycle++;
      yield { cycle, x };

      cycle++;
      yield { cycle, x, instruction };
      x += Number.parseInt(instruction.split(' ')[1]);
    }
  }

  cycle++;
  yield { cycle, x };
}

export const keyCycle = (cycle) => ((cycle + 20) % 40) === 0;

const partOne = (data) => {
  let signal = 0;
  for (const { cycle, x } of runProgram(data)) {
    if (keyCycle(cycle))
      signal += cycle * x;
  }

  return signal;
};

export default partOne;
