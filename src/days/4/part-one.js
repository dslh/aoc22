export const contains = (a, b) => a[0] <= b[0] && a[1] >= b[1];
const containment = ([a, b]) => contains(a, b) || contains(b, a);

const partOne = (data) => data.filter(containment).length;

export default partOne;
