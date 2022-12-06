import { findUniqueSubstr } from './part-one';

const WINDOW = 14;

const partTwo = (data) => findUniqueSubstr(data, WINDOW) + WINDOW;

export default partTwo;
