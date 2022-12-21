export const OPS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b
};

const compileOp = ({ literal, a, b, op }) => {
  if (literal) {
    const value = Number.parseInt(literal);
    return () => value;
  }

  const fn = OPS[op];
  return (registry) => (
    fn(registry[a](registry), registry[b](registry))
  )
};

export const compileRegistry = (monkeys, compiler = compileOp) => {
  const registry = {};

  for (const [name, op] of Object.entries(monkeys))
    registry[name] = compiler(op, name);

  return registry;
};

const partOne = (monkeys) => {
  const registry = compileRegistry(monkeys);

  return registry['root'](registry);
};

export default partOne;
