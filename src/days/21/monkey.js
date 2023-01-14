import { useState, useEffect } from 'react';

import useTrackedRef from 'lib/use-tracked-ref';

import Branch from './branch';

import { Y_STEP, Y_OFFSET } from './consts';
import { OPS } from './part-one';

const OP_TXT = {
  '+': '➕',
  '-': '➖',
  '/': '➗',
  '*': '✖️'
}

const LiteralMonkey = ({ monkey: { name, depth, offset }, literal, onShout }) => {
  const shout = useTrackedRef(onShout);
  useEffect(() => {
    const timer = setTimeout(() => shout.current(literal), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  return <>
    <circle cx={offset} cy={depth * Y_STEP + Y_OFFSET} r={5} fill={name === 'humn' ? '#F4743B' : '#BEEE62'} />
    <text x={offset} y={depth * Y_STEP + 54}
          fontSize="10px" fontWeight="bold" textAnchor="middle" fill="black">
      {literal}
    </text>
  </>;
};

const ListenerMonkey = ({ monkeys, monkey: { a, b, op, depth, offset }, onShout }) => {
  const x = offset;
  const y = depth * Y_STEP + Y_OFFSET;

  const [aVisible, setAVisible] = useState(false);
  const [aValue, setAValue] = useState(null);
  const [aReported, setAReported] = useState(false);

  const [bVisible, setBVisible] = useState(false);
  const [bValue, setBValue] = useState(null);
  const [bReported, setBReported] = useState(false);

  const [branchesVisible, setBranchesVisible] = useState(true);

  const hideChildren = () => {
    setAVisible(false);
    setBVisible(false);
    setBranchesVisible(false);
  };
  const setA = (value) => {
    setAValue(value);
    if (bValue !== null)
      hideChildren();
  };
  const setB = (value) => {
    setBValue(value);
    if (aValue !== null)
      hideChildren();
  };

  const aDrawn = () => {
    if (aValue === null) {
      setAVisible(true);
    } else {
      setAReported(true);
      if (bReported)
        onShout(OPS[op](aValue, bValue));
    }
  }
  const bDrawn = () => {
    if (bValue === null) {
      setBVisible(true);
    } else {
      setBReported(true);
      if (aReported)
        onShout(OPS[op](aValue, bValue));
    }
  }

  const aChild = monkeys[a];
  const bChild = monkeys[b];

  return <>
    <Branch x1={x} y={y} x2={aChild.offset}
            visible={branchesVisible} onDrawn={aDrawn} />
    <Branch x1={x} y={y} x2={bChild.offset}
            visible={branchesVisible} onDrawn={bDrawn} />
    {aVisible && <Monkey monkeys={monkeys} monkey={aChild} onShout={setA} />}
    {bVisible && <Monkey monkeys={monkeys} monkey={bChild} onShout={setB} />}
    <circle cx={x} cy={y} r={5} stroke="#70AE6E" fill="white" />
    <text x={x} y={y + 4} fontSize="10px" fontWeight="bold" textAnchor="middle" fill="black">
      {OP_TXT[op]}
    </text>
  </>;
};

const Monkey = ({ monkeys, monkey, onShout }) => {
  const [literal, setLiteral] = useState(monkey.literal);

  if (literal === undefined)
    return <ListenerMonkey monkeys={monkeys} monkey={monkey} onShout={setLiteral} />;
  else
    return <LiteralMonkey monkey={monkey} onShout={onShout} literal={literal} />;
};

export default Monkey;
