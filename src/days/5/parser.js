const MOVE_RE = /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/;

const parseMove = (move) => {
  const match = move.match(MOVE_RE);

  return {
    count: Number.parseInt(match.groups.count),
    from:  Number.parseInt(match.groups.from) - 1,
    to:    Number.parseInt(match.groups.to) - 1
  };
};

const LAST_NUMBER = /\d+ $/;
const countStacks = (stackSpec) => (
  Number.parseInt(stackSpec[stackSpec.length - 1].match(LAST_NUMBER)[0])
);

const parseStacks = (stackSpec) => {
  const stacks = new Array(countStacks(stackSpec)).fill().map(() => ([]));
  stackSpec.slice(0, stackSpec.length - 1).reverse().forEach(line => {
    for (let i = 0; i < (line.length + 1) / 4; ++i) {
      const crate = line.charAt(i * 4 + 1);
      if (crate !== ' ')
        stacks[i].push(crate)
    }
  });
  return stacks;
};

const parser = (data) => {
  const [stackSpec, moveSpec] = data.split('\n\n').map(section => section.split('\n'));

  const stacks = parseStacks(stackSpec);
  const moves = moveSpec.map(parseMove);
  return { stacks, moves };
};

export default parser;
