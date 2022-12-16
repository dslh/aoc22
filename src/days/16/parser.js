const SPEC = /^Valve (?<name>[A-Z]{2}) has flow rate=(?<rate>\d+); tunnels? leads? to valves? (?<links>[A-Z]{2}(, [A-Z]{2})*)$/

const parser = (data) => {
  const network = {};
  data.split('\n').forEach(spec => {
    const match = spec.match(SPEC);
    const { name, rate, links } = match.groups;
    network[name] = { name, rate: Number.parseInt(rate), links: links.split(', ') };
  });

  network.valveCount = Object.values(network).filter(valve => valve.rate).length;
  network.availablePressure = Object.values(network).reduce((sum, node) => sum + node.rate, 0);

  return network;
}

export default parser;
