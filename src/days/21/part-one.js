export const OPS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b
};

const compileOp = ({ literal, a, b, op }) => {
  if (literal)
    return () => literal;

  const fn = OPS[op];
  return (registry) => (
    fn(registry[a](registry), registry[b](registry))
  )
};

export const compileRegistry = (monkeys, compiler = compileOp) => {
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
