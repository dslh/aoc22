export const OPS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b
};

/**
 * Each monkey is compiled into a function that either:
 *  - if the monkey shouts a literal number, just returns the number.
 *  - Otherwise, looks up the two child monkeys, calls their functions
 *    recursively, and performs the specified operation on the results.
 */
const compileMonkey = ({ literal, a, b, op }) => {
  if (literal)
    return () => literal;

  const fn = OPS[op];
  return (registry) => (
    fn(registry[a](registry), registry[b](registry))
  )
};

/**
 * Compile the monkeys into a map where they can be looked up by name.
 * Compiler function can be swapped out for part 2.
 */
export const compileRegistry = (monkeys, compiler = compileMonkey) => {
  const registry = {};

  for (const monkey of monkeys)
    registry[monkey.name] = compiler(monkey);

  return registry;
};

const partOne = (monkeys) => {
  const registry = compileRegistry(monkeys);

  return registry['root'](registry);
};

export default partOne;
