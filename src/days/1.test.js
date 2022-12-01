import partOne from './1/part-one';
import partTwo from './1/part-two';

const SAMPLE = [[1000,2000,3000],[4000],[5000,6000],[7000,8000,9000],[10000]];

test('part one matches the example result', () => {
  expect(partOne(SAMPLE)).toEqual(24000);
});

test('part two matches the example result', () => {
  expect(partTwo(SAMPLE)).toEqual(34000);
});
