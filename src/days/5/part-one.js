const cloneStacks = (stacks) => stacks.map(stack => Array.from(stack));

const applyMove = (stacks, { from, to, count }) => {
  for (let i = 0; i < count; ++i)
    stacks[to].push(stacks[from].pop())
};

export const message = (stacks) => (
  stacks.map(stack => stack[stack.length - 1]).join('')
);

const partOne = ({ stacks, moves }) => {
  const clone = cloneStacks(stacks);
  moves.forEach(move => applyMove(clone, move));
  return message(clone);
}

export const asPartTwoMoves = (moves) => (
  moves.map(({ count, from, to }) => [...Array(count)].map(() => ({ count: 1, from, to }))).flat()
);

export default partOne;
