import { evalBlueprint } from './part-one';

const partTwo = blueprints => blueprints.slice(0, 3).reduce((product, blueprint) =>
  product * evalBlueprint(blueprint, 32), 1
);

export default partTwo;
