import allShortestPaths from './all-shortest-paths';

const isDuplicate = (workers, i) => {
  for (let j = 0; j < i; ++j) {
    if (workers[i].valve === workers[j].valve &&
        workers[i].timeRemaining == workers[j].timeRemaining)
      return true;
  }

  return false;
};

const visit = (network, paths, workers, visited = {}) => {
  let max = 0;
  workers.forEach(({ valve }) => visited[valve] = true);
  for (let i = 0; i < workers.length; ++i) {
    if (isDuplicate(workers, i)) continue;
    const { valve, timeRemaining } = workers[i];

    for (const { name, dist } of paths[valve]) {
      if (!visited[name] && dist < timeRemaining) {
        workers[i].valve = name;
        workers[i].timeRemaining -= dist;
        const value = visit(network, paths, workers, visited);
        workers[i].valve = valve;
        workers[i].timeRemaining = timeRemaining;

        if (max < value) max = value;
      }
    }
  }
  workers.forEach(({ valve }) => visited[valve] = true);

  return workers.reduce((sum, { valve, timeRemaining }) => (
    sum + network[valve].rate * timeRemaining
  ), max);
};

const partTwo = (network) => {
  const paths = allShortestPaths(network);
  return visit(network, paths, [{ valve: 'AA', timeRemaining: 26}, { valve: 'AA', timeRemaining: 26 }]);
};

export default partTwo;
