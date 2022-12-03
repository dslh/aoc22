const LOWER_VALUE = 1 - 'a'.charCodeAt(0);
const UPPER_VALUE = 27 - 'A'.charCodeAt(0);

const LOWER = new RegExp('[a-z]');

export const valueOf = (letter) => (
  letter.charCodeAt(0) + (
    letter.match(LOWER) ? LOWER_VALUE : UPPER_VALUE
  )
);

export const commonItem = (parts) => {
  const lists = parts.map(part => part.split(''));
  const sets = lists.slice(1).map(list => new Set(list));

  return lists[0].find(item => sets.every(set => set.has(item)));
};

export const halve = (rucksack) => {
  const limit = rucksack.length / 2;
  return [rucksack.slice(0, limit), rucksack.slice(limit)];
}

const partOne = (data) => (
  data.map(halve)
      .map(commonItem)
      .map(valueOf)
      .reduce((sum, value) => sum + value)
);

export default partOne;
