const SPEC = /^Valve (?<name>[A-Z]{2}) has flow rate=(?<rate>\d+); tunnels? leads? to valves? (?<links>[A-Z]{2}(, [A-Z]{2})*)$/

const parser = (data) => {
  const net = {};
  data.split('\n').forEach(spec => {
    const match = spec.match(SPEC);
    const { name, rate, links } = match.groups;
    net[name] = { name, rate: Number.parseInt(rate), links: links.split(', ') };
  });
  return net;
}

export default parser;
