import { OPS, compileRegistry } from './part-one';

const compileOp = ({ literal, a, b, op }, name) => {
  if (literal)
    return {
      value: literal,
      compute(_, caller) {
        this.caller = caller;
        return literal;
      }
    };

  const otherChild = (name) => {
    if (a === name)
      return b;
    else if (b === name)
      return a;
  };

  return {
    name,
    otherChild,

    invert(registry, child, result) {
      const otherValue = registry[otherChild(child)].value;

      switch (op) {
        case '+':
          return result - otherValue;

        case '*':
          return result / otherValue;

        case '-':
          if (child === a)
            return result + otherValue;
          else
            return otherValue - result;

        case '/':
          if (child === a)
            return result * otherValue;
          else
            return otherValue / result;
      }
    },

    compute(registry, caller) {
      this.caller = caller;

      this.value = OPS[op](
        registry[a].compute(registry, this.name),
        registry[b].compute(registry, this.name)
      );

      return this.value;
    }
  };
};

const backtrack = (registry, name, child) => {
  console.log(name);
  const monkey = registry[name];

  if (!child)
    return backtrack(registry, monkey.caller, name);

  if (!monkey.caller)
    return registry[monkey.otherChild(child)].value;

  return monkey.invert(registry, child, backtrack(registry, monkey.caller, name));
};

const partTwo = (monkeys) => {
  const registry = compileRegistry(monkeys, compileOp);
  registry['root'].compute(registry);

  for (const [name, { value }] of Object.entries(registry))
    console.log(name + ': ' + value);

  return backtrack(registry, 'humn');
};

export default partTwo;
