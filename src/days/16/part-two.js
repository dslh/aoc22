import allShortestPaths from './all-shortest-paths';

const rates = (network) => {
  const out = {};
  for (const [valve, { rate }] of Object.entries(network))
    out[valve] = rate;
  return out;
};

const explore = (rates, distances, valve, timeRemaining, paths, pressure = 0, visited = {}) => {
  for (const { name, dist } of Object.values(distances[valve])) {
    if (!visited[name] && dist < timeRemaining) {
      const newTime = timeRemaining - dist;
      const newPressure = newTime * rates[name] + pressure;
      visited[name] = true;

      paths.push({ pressure: newPressure, visited: { ...visited } });
      explore(rates, distances, name, newTime, paths, newPressure, visited);

      delete visited[name];
    }
  }
};

const partTwo = (network) => {
  const distances = allShortestPaths(network);
  const paths = [];

  explore(rates(network), distances, 'AA', 26, paths);

  let max = 0;
  for (let i = 1; i < paths.length; ++i) {
    const a = paths[i];

    for (let j = 0; j < i; ++j) {
      const b = paths[j];

      if (!Object.keys(a.visited).some(valve => b.visited[valve])) {
        const pressure = a.pressure + b.pressure;
        if (pressure > max)
          max = pressure;
      }
    }
  }

  return max;
};

export default partTwo;
