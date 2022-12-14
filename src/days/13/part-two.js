import { compare } from './part-one';

const partTwo = (data) => {
  data = data.flat();

  const dividers = [ [[2]], [[6]] ];
  dividers.forEach(divider => data.push(divider));

  data.sort(compare);

  const [a, b] = dividers.map(divider => data.indexOf(divider) + 1);
  return a * b;
};

export default partTwo;
