import { useState } from 'react';

import Branch from './branch';

import { Y_STEP, Y_OFFSET } from './consts';

const OP_TXT = {
  '+': '➕',
  '-': '➖',
  '/': '➗',
  '*': '✖️'
}

const LiteralMonkey = ({ monkey: { name, literal, depth, offset } }) => <>
  <circle cx={offset} cy={depth * Y_STEP + Y_OFFSET} r={5} fill={name === 'humn' ? '#F4743B' : '#BEEE62'} />
  <text x={offset} y={depth * Y_STEP + 54}
        fontSize="10px" fontWeight="bold" textAnchor="middle" fill="black">
    {literal}
  </text>
</>;

const ListenerMonkey = ({ monkeys, monkey: { a, b, op, depth, offset } }) => {
  const x = offset;
  const y = depth * Y_STEP + Y_OFFSET;

  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);

  const aChild = monkeys[a];
  const bChild = monkeys[b];

  return <>
    <Branch x1={x} y={y} x2={aChild.offset} onDrawn={() => setShowA(true)} />
    <Branch x1={x} y={y} x2={bChild.offset} onDrawn={() => setShowB(true)} />
    {showA && <Monkey monkeys={monkeys} monkey={aChild} />}
    {showB && <Monkey monkeys={monkeys} monkey={bChild} />}
    <circle cx={x} cy={y} r={5} stroke="#70AE6E" fill="white" />
    <text x={x} y={y + 4} fontSize="10px" fontWeight="bold" textAnchor="middle" fill="black">
      {OP_TXT[op]}
    </text>
  </>;
};

const Monkey = ({ monkeys, monkey }) => (
  monkey.literal ? <LiteralMonkey monkey={monkey} /> :
                   <ListenerMonkey monkeys={monkeys} monkey={monkey} />
);

export default Monkey;
