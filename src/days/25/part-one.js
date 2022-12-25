const VALUES = {
  '2': 2,
  '1': 1,
  '0': 0,
  '-': -1,
  '=': -2
};

const fromSnafu = (str) => {
  let value = 0;

  for (let i = 0; i < str.length; ++i) {
    value *= 5;
    value += VALUES[str.charAt(i)];
  }

  return value;
};

const NUMERALS = ['0', '1', '2', '=', '-'];

const toSnafu = (value) => {
  let str = '';
  while (value > 0) {
    const digit = value % 5;
    str = NUMERALS[digit] + str;
    value = Math.floor(value / 5);
    if (digit > 2) value++;
  }
  return str;
};

const partOne = (numbers) => (
  toSnafu(numbers.map(fromSnafu).reduce((sum, value) => sum + value))
);

export default partOne;
