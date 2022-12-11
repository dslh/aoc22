const slingItem = (monkeys, monkey) => {
  let item = monkey.items.shift();
  item = monkey.operation(item, monkey.operand(item));
  item = Math.floor(item / 3);

  const receiver = item % monkey.test === 0 ? monkey.true : monkey.false;
  monkeys[receiver].items.push(item);

  monkey.slung++;
}

const evacuateMonkey = (monkeys, monkey) => {
  while (monkey.items.length) slingItem(monkeys, monkey);
};

const cloneMonkey = (monkey) => ({ ...monkey, items: [...monkey.items] });

export const monkeyBusiness = (monkeys, zenFactor = 3, rounds = 20) => {
  monkeys = monkeys.map(cloneMonkey);
  monkeys.forEach(monkey => monkey.slung = 0);

  for (let i = 0; i < rounds; ++i)
    monkeys.forEach(monkey => evacuateMonkey(monkeys, monkey));

  const sorted = [...monkeys].sort((a, b) => b.slung - a.slung);
  return sorted[0].slung * sorted[1].slung;
};

const partOne = (monkeys) => monkeyBusiness(monkeys);

export default partOne;
