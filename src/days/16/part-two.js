import allShortestPaths from './all-shortest-paths';

const rates = (network) => {
  const out = {};
  for (const [valve, { rate }] of Object.entries(network))
    out[valve] = rate;
  return out;
};

const visit = (
  rates, paths, valve, initialTime, timeRemaining = initialTime, agents = 2, visited = {}
) => {
  let max = 0;
  visited[valve] = true;
  for (const { name, dist } of Object.values(paths[valve])) {
    const newTime = timeRemaining - dist;
    if (visited[name] || newTime <= 0)
      continue;

    const value = visit(rates, paths, name, initialTime, newTime, agents, visited);

    if (value > max)
      max = value;
  }

  if (agents > 1) {
    const nextAgent = visit(rates, paths, 'AA', initialTime, initialTime, agents - 1, visited);
    if (nextAgent > max)
      max = nextAgent;
  }

  visited[valve] = false;

  return timeRemaining * rates[valve] + max;
};

const partTwo = (network) => {
  const paths = allShortestPaths(network);

  return visit(rates(network), paths, 'AA', 26);
};

export default partTwo;
