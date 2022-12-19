import allShortestPaths from './all-shortest-paths';

const isDuplicate = (workers, w) => {
  const { valve, timeRemaining } = workers[w];
  for (let i = 0; i < w; ++i)
    if (workers[i].valve === valve && workers[i].timeRemaining === timeRemaining)
      return true;
}

const visit = (network, paths, workers, visited = {}) => {
  let max = 0;

  for (let w = 0; w < workers.length; ++w) {
    if (isDuplicate(workers, w)) continue;
    const { valve, timeRemaining } = workers[w];

    for (const { name, dist } of Object.values(paths[valve])) {
      if (visited[name]) continue;

      const newWorker = { valve: name, timeRemaining: timeRemaining - dist };
      if (newWorker.timeRemaining <= 0) continue;

      const newState = [...workers];
      newState[w] = newWorker;

      visited[name] = true;
      const value = newWorker.timeRemaining * network[name].rate +
        visit(network, paths, newState, visited);
      if (value > max) max = value;
      visited[name] = false;
    }
  }

  return max;
}

const partTwo = (network) => {
  const paths = allShortestPaths(network);
  return visit(network, paths, [{ valve: 'AA', timeRemaining: 26}, { valve: 'AA', timeRemaining: 26 }]);
};

export default partTwo;
