import allShortestPaths from './all-shortest-paths';

const visit = (network, paths, valve, timeRemaining, visited = {}) => {
  let max = 0;
  visited[valve] = true;
  for (const { name, dist } of paths[valve]) {
    if (!visited[name] && dist < timeRemaining) {
      const value = visit(network, paths, name, timeRemaining - dist, visited);
      if (max < value) max = value;
    }
  }
  visited[valve] = false;

  return timeRemaining * network[valve].rate + max;
};

const partOne = (network) => {
  const paths = allShortestPaths(network);
  return visit(network, paths, 'AA', 30);
}

export default partOne;
