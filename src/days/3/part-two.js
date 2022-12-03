import { valueOf } from './part-one';

const partTwo = (data) => (
  data.eachSlice(3, (slice) => {
                   const splits = slice.map(rucksack => rucksack.split(''));
                   const sets = splits.slice(1).map(rucksack => new Set(rucksack));

                   return splits[0].find(item => sets.every(set => set.has(item)));
                 })
      .map(common => valueOf(common))
      .reduce((sum, value) => sum + value)
);

export default partTwo;
