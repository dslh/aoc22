const partOne = (elves) => (
  Math.max(...elves.map(elf => elf.reduce((sum, meal) => sum + meal)))
);

export default partOne;
