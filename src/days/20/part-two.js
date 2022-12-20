import { toLinkedList, mix, score } from './part-one';

const DECRYPTION_KEY = 811589153;

const partTwo = array => {
  const list = toLinkedList(array.map(v => v * DECRYPTION_KEY));

  for (let i = 0; i < 10; ++i)
    mix(list);

  return score(list);
};

export default partTwo;
