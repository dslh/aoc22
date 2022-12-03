import { valueOf, commonItem } from './part-one';

const partTwo = (data) => (
  data.eachSlice(3, commonItem)
      .map(valueOf)
      .reduce((sum, value) => sum + value)
);

export default partTwo;
