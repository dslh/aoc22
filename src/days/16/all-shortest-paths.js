const makePath = (node) => {
  const path = [];
  while ((node = node.prev) !== undefined) {
    path.push(node.name);
  }
  return path.reverse();
}

const shortestPaths = (network, from, toBeFound, visited = {}) => {
  const toVisit = network[from].links.map(name => ({ name, dist: 2 }));

  const paths = [];
  while (toVisit.length) {
    const node = toVisit.shift();
    const { name, dist } = node;

    if (visited[name]) continue;
    visited[name] = true;

    const valve = network[name];
    if (valve.rate) {
      paths.push({ name, dist, path: makePath(node) });
      if (paths.length === toBeFound) return paths;
    }

    for (const next of valve.links)
      if (!visited[next])
        toVisit.push({ name: next, dist: dist + 1, prev: node });
  }

  throw 'Missed something';
};

const allShortestPaths = (network) => {
  const valves = Object.values(network).filter(valve => valve.rate);
  const toBeFound = valves.length;

  const distances = { AA: shortestPaths(network, 'AA', toBeFound) };
  for (const valve of valves)
    distances[valve.name] = shortestPaths(network, valve.name, toBeFound);

  return distances;
};

export default allShortestPaths;
