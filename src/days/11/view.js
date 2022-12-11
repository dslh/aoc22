import { useMemo } from 'react';

import Readout from 'components/readout';

import { cloneMonkey } from './part-one';

import useTimedGenerator from 'lib/use-timed-generator';

import './style.css';

function *monkeyBusiness(monkeys, rounds, slingItem) {
  for (let i = 1; i <= rounds; ++i) {
    for (let j = 0; j < monkeys.length; ++j) {
      const monkey = monkeys[j];
      while (monkey.items.length) {
        slingItem(monkeys, monkey);
        yield { round: i, monkey: j };
      }
    }
  }

  yield { round: rounds };
}

const maxSlingers = (monkeys) => {
  let max = -1;
  let maxIndex = 0;
  for (let i = 0; i < monkeys.length; ++i) {
    const { slung } = monkeys[i];
    if (slung > max) {
      max = slung;
      maxIndex = i;
    }
  }

  let next = -1;
  let nextIndex = 0;
  for (let i = 0; i < monkeys.length; ++i) {
    if (i === maxIndex) continue;

    const { slung } = monkeys[i];
    if (slung > next) {
      next = slung;
      nextIndex = i;
    }
  }

  return {
    monkeys: [maxIndex, nextIndex],
    values: [max, next]
  };
};

const View = ({ data, rounds, slingItem }) => {
  const monkeys = useMemo(() => data.map(cloneMonkey), [data]);
  const items = useMemo(() => monkeys.map(monkey => monkey.items).flat(), [monkeys]);

  const itemOwner = (item) => {
    for (let monkey = 0; monkey < monkeys.length; ++monkey) {
      const index = monkeys[monkey].items.indexOf(item);
      if (index !== -1) return { index, monkey };
    }
  }

  const monkeyAngle = i => i / monkeys.length * 2 * Math.PI;
  const monkeyX = i => Math.sin(monkeyAngle(i)) * 250 + 300;
  const monkeyY = i => -Math.cos(monkeyAngle(i)) * 250 + 300;
  const monkeyStyle = i => ({ left: monkeyX(i) + 'px', top: monkeyY(i) + 'px' });

  const itemStyle = ({ monkey, index }) => ({
    left: monkeyX(monkey) + 'px', top: monkeyY(monkey) + index * 16 + 'px'
  });

  const { round, monkey: currentMonkey } = useTimedGenerator(monkeyBusiness, [monkeys, 20, slingItem], {});

  const mostActive = maxSlingers(monkeys);

  return <div className="dayEleven">
    <div>Round: {round}</div>
    <div>Monkey business: {mostActive.values[0]} * {mostActive.values[1]} = {mostActive.values[0] * mostActive.values[1]}</div>
    {monkeys.map((monkey, i) =>
      <div key={i} className={`monkey ${i === currentMonkey ? 'current': ''}`} style={monkeyStyle(i)}>
        🐵
        <span className={mostActive.monkeys.includes(i) ? 'most' : undefined}>
          {monkey.slung}
        </span>
      </div>
    )}
    {items.map((item) => {
      const owner = itemOwner(item);
      return <Readout key={item.id} value={item.level} className="item" style={itemStyle(owner)} />
    })}
  </div>;
};

export default View;
