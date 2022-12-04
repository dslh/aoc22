const notAfter = (a, b) => a[0] <= b[1];
const overlapping = ([a, b]) => notAfter(a, b) && notAfter(b, a);

const partTwo = (data) => data.filter(overlapping).length;

export default partTwo;
