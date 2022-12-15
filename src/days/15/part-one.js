const rowCoverage = (sensors, row) => (
  sensors.map(sensor => sensor.rowExtents(row))
         .filter(s => s)
         .sort((a, b) => a[0] - b[0])
         .reduce(({ pos, count }, [min, max]) => {
           if (pos === undefined) pos = min;
           max = Math.max(pos, max);
           min = Math.max(pos, min);
           return {
           count: count + max - min,
           pos: max
         }}, { count: 0 }).count
);

const partOne = (sensors) => JSON.stringify(
  sensors.length === 14 ? rowCoverage(sensors, 10) : rowCoverage(sensors, 2_000_000)
);

export default partOne;
