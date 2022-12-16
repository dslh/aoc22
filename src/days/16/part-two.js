const visit = (network, workers, depth, worker = 0, valves = {}, availablePressure = network.availablePressure) => {
  if (availablePressure === 0) return 0;

  worker = worker % workers.length;
  if (worker === 0) depth--;
  if (depth === 0) return 0;

  const { pos, from } = workers[worker];
  const { rate, links } = network[pos];

  let max = 0;
  if (rate && !valves[pos]) {
    valves[pos] = true;
    const pressure = rate * depth +
      visit(network, workers, depth, worker + 1, valves, availablePressure - rate);
    if (pressure > max) max = pressure;
    delete valves[pos];
  }

  if (depth > 1) {
    for (const link of links) {
      if (link === from) continue;

      workers[worker] = { pos: link, from: pos };
      const pressure = visit(network, workers, depth, worker + 1, valves, availablePressure);
      if (pressure > max) max = pressure;
    }
    workers[worker] = { pos, from };
  }

  return max;
};

const partTwo = (network) => visit(network, [{ pos: 'AA' }, { pos: 'AA' }], 26);

export default partTwo;
