const OPS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b
};
const OP = /^((?<literal>\d+)|(?<a>[a-z]{4}) (?<op>[-+*\/]) (?<b>[a-z]{4}))$/;

const parseOp = expression => {
  const { literal, a, b, op } = expression.match(OP).groups;
  if (literal) {
    const value = Number.parseInt(literal);
    return () => value;
  }

  const fn = OPS[op];
  return (registry) => (
    fn(registry[a](registry), registry[b](registry))
  )
}

const parseMonkey = (monkey) => {
  const [name, expression] = monkey.split(': ');
  return [name, parseOp(expression)];
}

const parser = (data) => {
  const registry = {};
  data.split('\n').map(parseMonkey).forEach(([name, op]) => registry[name] = op);
  return registry;
};

export default parser;
