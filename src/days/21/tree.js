import { useMemo } from 'react';
import { compileRegistry } from './part-one';

const lineCoords = (x, y, width, horizontal) => {
  const rX = horizontal ? width : 0;
  const rY = horizontal ? 0 : width;

  return {
    x1: x - rX, y1: y - rY,
    x2: x + rX, y2: y + rY
  };
};

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
    const step = 1000 / (set.length + 1);
    set.forEach((monkey, i) => monkey.offset = (i + 1) * step);
  });
};

const Monkey = ({ x, y, width, horizontal, monkeys, monkey: { name, a, b, op, literal } }) => {
  const endpoints = lineCoords(x, y, width, horizontal);
  const subwidth = horizontal ? width : width / 2;

  return <>
    {op && <>
      <line stroke="black" {...endpoints} />
      <Monkey x={endpoints.x1} y={endpoints.y1} width={subwidth} horizontal={!horizontal}
              monkeys={monkeys} monkey={monkeys[a]} />
      <Monkey x={endpoints.x2} y={endpoints.y2} width={subwidth} horizontal={!horizontal}
              monkeys={monkeys} monkey={monkeys[b]} />
    </>}
    <circle cx={x} cy={y} r={6} stroke="red" fill="white" />
    <text x={x} y={y + 12} fontSize="6px" textAnchor="middle" fill="black">{name}</text>
    <text x={x} y={y + 3} fontSize="10px" fontWeight="bold" textAnchor="middle" fill="black">
      {literal ? literal : op}
    </text>
  </>;
}

const Tree = ({ monkeys: monkeyList }) => {
  const monkeys = compileRegistry(monkeyList, m => m);
  const depths = useMemo(() => {
    setPath(monkeys, monkeys.root);
    const depths = countDepths(monkys);
    setOffsets(monkeys);
    return depths;
  });

  return <svg width="1000" height="800" className="mx-auto">
    <Monkey x={400} y={400} width={200} horizontal={true}
            monkeys={monkeys} monkey={monkeys.root} />
  </svg>
};

export default Tree;
