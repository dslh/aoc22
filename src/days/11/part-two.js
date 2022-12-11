import { monkeyBusiness, itemSlinger } from './part-one';

const partTwo = (monkeys) => {
  const commonFactor = monkeys.reduce((product, monkey) => product * monkey.test, 1);
  return monkeyBusiness(monkeys, 10000, itemSlinger(item => item % commonFactor));
}

export default partTwo;
