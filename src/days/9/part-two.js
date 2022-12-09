import { run, mapSize } from './part-one';

const partTwo = (instructions) => mapSize(run(instructions, 9).visited);

export default partTwo;
