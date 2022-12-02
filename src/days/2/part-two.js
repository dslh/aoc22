export const VALUES = {
  'A': 1, 'B': 2, 'C': 3,
  'X': 0, 'Y': 3, 'Z': 6
};

const CHOICE = {
  'X': 2, 'Y': 0, 'Z': 1
};

const choice = ([a, b]) => (
  (VALUES[a] - 1 + CHOICE[b]) % 3 + 1
);

export const scores = (data) => (
  data.map(game => choice(game) + VALUES[game[1]])
);

const partTwo = (data) => (
  scores(data).reduce((sum, value) => sum + value)
);

export default partTwo;
