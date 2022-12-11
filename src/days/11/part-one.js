export const itemSlinger = (worryManager) => (monkeys, monkey) => {
  let item = monkey.items.shift();
  item.level = monkey.operation(item.level, monkey.operand(item.level));
  item.level = worryManager(item.level);

  const receiver = item.level % monkey.test === 0 ? monkey.true : monkey.false;
  monkeys[receiver].items.push(item);

  monkey.slung++;
}

export const cloneMonkey = (monkey) => ({ ...monkey, items: monkey.items.map(item => ({ ...item })) });

export const monkeyBusiness = (monkeys, rounds, slingItem) => {
  monkeys = monkeys.map(cloneMonkey);

  for (let i = 0; i < rounds; ++i)
    monkeys.forEach(monkey => {
      while (monkey.items.length) slingItem(monkeys, monkey);
    });

  const sorted = [...monkeys].sort((a, b) => b.slung - a.slung);
  return sorted[0].slung * sorted[1].slung;
};

const partOne = (monkeys) => monkeyBusiness(monkeys, 20, itemSlinger(item => Math.floor(item / 3)));

export default partOne;
