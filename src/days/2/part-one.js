const VALUES = {
  'A': 1, 'B': 2, 'C': 3,
  'X': 1, 'Y': 2, 'Z': 3
};

const score = ([a, b]) => (
  a === b ? 3 : (a % 3 === (b - 1) % 3 ? 6 : 0)
);

const partOne = (data) => (
  data.map(game => game.map(rps => VALUES[rps]))
      .map(game => score(game) + game[1])
      .reduce((sum, value) => sum + value)
);

export default partOne;
