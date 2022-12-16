const visit = (network, node, valves = {}, from = null, depth = 0) => {
  const { rate, links } = network[node];

  let best = { steps: [], rate: 0 };
  if (depth >= 30) return best;

  if (rate && !valves[node]) {
    valves[node] = true;
    const base = { steps: [node, `+${node}`], rate: rate * (29 - depth) };

    for (const link of links) {
      const linkBest = visit(network, link, valves, node, depth + 2);
      if (linkBest.rate + base.rate > best.rate) {
        best.rate = linkBest.rate + base.rate;
        best.steps = base.steps.concat(linkBest.steps);
      }
    }

    delete valves[node];
  }

  for (const link of links) {
    if (link === from) continue;

    const linkBest = visit(network, link, valves, node, depth + 1);
    if (linkBest.rate > best.rate) {
      best.rate = linkBest.rate;
      best.steps = [node].concat(linkBest.steps);
    }
  }

  return best;
};

const partOne = (network) => visit(network, 'AA').rate;

export default partOne;
