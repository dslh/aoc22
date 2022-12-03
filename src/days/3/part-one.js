const LOWER_VALUE = 1 - 'a'.charCodeAt(0);
const UPPER_VALUE = 27 - 'A'.charCodeAt(0);

const LOWER = new RegExp('[a-z]');

export const valueOf = (letter) => (
  letter.charCodeAt(0) + (
    letter.match(LOWER) ? LOWER_VALUE : UPPER_VALUE
  )
);

const partOne = (data) => (
  data.map(rucksack => {
            const limit = rucksack.length / 2;
            return [rucksack.slice(0, limit), rucksack.slice(limit)].map(pocket => pocket.split(''));
          })
      .map(([a, b]) => {
            const set = new Set(b);
            return a.find(item => set.has(item));
          })
      .map(common => valueOf(common))
      .reduce((sum, value) => sum + value)
);

export default partOne;
