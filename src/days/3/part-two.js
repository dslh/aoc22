import { valueOf, commonChar } from './part-one';

const partTwo = (data) => (
  data.eachSlice(3, commonChar)
      .map(valueOf)
      .reduce((sum, value) => sum + value)
);

export default partTwo;
