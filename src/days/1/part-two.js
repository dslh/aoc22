const total = (list) => list.reduce((sum, value) => sum + value);

const partTwo = (elves) => (
  total(elves.map(total).sort().reverse().slice(0, 3))
);

export default partTwo;
