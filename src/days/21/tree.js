import { useMemo } from 'react';
import { compileRegistry } from './part-one';

import { Y_STEP, Y_OFFSET } from './consts';

import Monkey from './monkey';

const setDepth = (monkeys, monkey, depth = 0) => {
  monkey.depth = depth;
  if (monkey.literal) return;

  setDepth(monkeys, monkeys[monkey.a], depth + 1);
  setDepth(monkeys, monkeys[monkey.b], depth + 1);
};

const setPath = (monkeys, monkey, path = '') => {
  monkey.path = path;
  if (monkey.literal) return;

  setPath(monkeys, monkeys[monkey.a], path + 'a');
  setPath(monkeys, monkeys[monkey.b], path + 'b');
};

const countDepths = (monkeys) => {
  setDepth(monkeys, monkeys.root);
  const depths = [];
  for (const monkey of Object.values(monkeys)) {
    depths[monkey.depth] ||= 0;
    depths[monkey.depth]++
  }
  return depths;
};

const setOffsets = (monkeys) => {
  const depthSets = [];
  for (const monkey of Object.values(monkeys))
    (depthSets[monkey.depth] ||= []).push(monkey);

  depthSets.forEach(set => {
    set.sort((a, b) => a.path.localeCompare(b.path))
    const step = 1200 / (set.length + 1);
    set.forEach((monkey, i) => monkey.offset = (i + 1) * step);
  });
};

const Tree = ({ monkeys: monkeyList }) => {
  const monkeys = useMemo(() => compileRegistry(monkeyList, m => m), [monkeyList]);
  const depths = useMemo(() => {
    setPath(monkeys, monkeys.root);
    const depths = countDepths(monkeys);
    setOffsets(monkeys);
    return depths;
  }, [monkeys]);

  return <svg width={1200} height={depths.length * Y_STEP + Y_OFFSET * 2} className="mx-auto">
    <Monkey key={monkeyList.length} monkeys={monkeys} monkey={monkeys.root} />
  </svg>
};

export default Tree;
