const EXPRESSION = /^((?<literal>\d+)|(?<a>[a-z]{4}) (?<op>[-+*\/]) (?<b>[a-z]{4}))$/;

const parseExpression = (expression) => {
  const { literal, a, b, op } = expression.match(EXPRESSION).groups;
  return { a, b, op, literal: literal && Number.parseInt(literal) };
}

const parseMonkey = (monkey) => {
  const [name, expression] = monkey.split(': ');
  return [name, parseExpression(expression)];
}

const parser = (data) => {
  const registry = {};
  data.split('\n').map(parseMonkey).forEach(([name, op]) => registry[name] = op);
  return registry;
};

export default parser;
