const MONKEY_RE = /Monkey \d+:/
const addMonkey = ({ monkeys }) => monkeys.push({});

const ITEMS_RE = /Starting items: (?<items>\d+(, \d+)*)/
const setItems = ({ monkey, items }) => (
  monkey.items = items.split(', ').map(item => Number.parseInt(item))
);

const OPERATION_RE = /Operation: new = old (?<op>[*+]) (?<operand>old|\d+)/
const setOperation = ({ monkey, op, operand }) => {
  if (op === '*')
    monkey.operation = (old, val) => old * val;
  else if (op === '+')
    monkey.operation = (old, val) => old + val;

  if (operand === 'old')
    monkey.operand = (old) => old;
  else {
    const out = Number.parseInt(operand);
    monkey.operand = () => out;
  }
}

const TEST_RE = /Test: divisible by (?<modulo>\d+)/
const setTest = ({ monkey, modulo }) => monkey.test = Number.parseInt(modulo);

const OUTCOME_RE = /If (?<outcome>true|false): throw to monkey (?<index>\d+)/
const setOutcome = ({ monkey, outcome, index }) => monkey[outcome] = Number.parseInt(index);

const OPERATIONS = [
  { pattern: MONKEY_RE, func: addMonkey },
  { pattern: ITEMS_RE, func: setItems },
  { pattern: OPERATION_RE, func: setOperation },
  { pattern: TEST_RE, func: setTest },
  { pattern: OUTCOME_RE, func: setOutcome }
];

const parser = (input) => {
  const monkeys = [];

  input.split('\n').forEach(line => {
    if (line === '') return;

    let match;
    const { func } = OPERATIONS.find(({ pattern }) => match = line.match(pattern));
    func({ monkeys, monkey: monkeys[monkeys.length - 1], ...match.groups });
  });

  return monkeys;
};

export default parser;
