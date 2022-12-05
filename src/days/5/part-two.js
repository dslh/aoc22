import { message } from './part-one';

const applyMove = (stacks, { from, to, count }) => {
  const source = stacks[from];
  const cutoff = source.length - count;
  const chunk = source.slice(cutoff);

  const clone = Array.from(stacks);
  clone[from] = stacks[from].slice(0, cutoff);
  clone[to] = stacks[to].concat(...chunk);
  return clone;
};

const partTwo = ({ stacks, moves }) => (
  message(moves.reduce((state, move) => applyMove(state, move), stacks))
);

export default partTwo;
