import { OPS, compileRegistry } from './part-one';

/**
 * Works in much the same way as part one, where each monkey is converted
 * to a function that recursively calls other monkeys in the registry.
 * Additionally, when called, each monkey caches the value it shouts,
 * and also caches the name of the parent monkey that invoked it.
 * This information can then be used for backtracking.
 */
const compileOp = ({ name, literal, a, b, op }) => {
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

    /**
     * Inverts a monkeys operation, returning the value that would
     * have been needed from the given child in order to produce the
     * expected result.
     */
    invert(registry, child, result) {
      const otherValue = registry[otherChild(child)].value;

      switch (op) {
        case '+': // If r = a + b, then
          // a = r - b
          // b = r - a
          return result - otherValue;

        case '*': // If r = a * b, then
          // a = r / b
          // b = r / a
          return result / otherValue;

        case '-': // If r = a - b, then
          if (child === a)
            // a = r + b
            return result + otherValue;
          else
            // b = a - r
            return otherValue - result;

        case '/': // If r = a / b
          if (child === a)
            // a = r * b
            return result * otherValue;
          else
            // b = a / r
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

/**
 * Starting from (presumably) 'humn', recurse back to the root then invert each
 * operation until we get back to the named child.
 */
const backtrack = (registry, name, child) => {
  const monkey = registry[name];

  // We're at the start, i.e. humn
  if (!child)
    return backtrack(registry, monkey.caller, name);

  // We're at the root
  if (!monkey.caller)
    return registry[monkey.otherChild(child)].value;

  // Invert the operation of each monkey between humn and root
  return monkey.invert(registry, child, backtrack(registry, monkey.caller, name));
};

const partTwo = (monkeys) => {
  const registry = compileRegistry(monkeys, compileOp);
  registry['root'].compute(registry);

  // registry['root'].value is the answer for part one

  return backtrack(registry, 'humn');
};

export default partTwo;
