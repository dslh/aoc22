const MONKEY = /^(?<name>[a-z]{4}): ((?<literal>\d+)|(?<a>[a-z]{4}) (?<op>[-+*/]) (?<b>[a-z]{4}))$/;

/**
 * Pretty much just converting each line into an object, giving names to the key parts.
 */
const parseMonkey = (monkey) => {
  const { name, literal, a, b, op } = monkey.match(MONKEY).groups;
  return { name, a, b, op, literal: literal && Number.parseInt(literal) };
}

const parser = (data) => data.split('\n').map(parseMonkey);

export default parser;
