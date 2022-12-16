const COORD = /x=(?<x>-?\d+), y=(?<y>-?\d+)/g
const parseCoord = (match) => (
  { x: Number.parseInt(match.groups.x), y: Number.parseInt(match.groups.y) }
);

const Sensor = (spec) => {
  const [sensor, beacon] = [...spec.matchAll(COORD)].map(parseCoord);

  return {
    pos: sensor,
    beacon,
    radius: (Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y)),

    rowExtents(row) {
      const radius = this.radius - Math.abs(row - this.pos.y);

      if (radius >= 0) return [this.pos.x - radius, this.pos.x + radius];
    }
  }
};

const parser = (data) => (
  data.split('\n').map(Sensor)
);

export default parser;
