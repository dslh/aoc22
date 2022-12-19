const SPEC = /^Blueprint (?<id>\d+): Each ore robot costs (?<oreOre>\d+) ore. Each clay robot costs (?<clayOre>\d+) ore. Each obsidian robot costs (?<obsidianOre>\d+) ore and (?<obsidianClay>\d+) clay. Each geode robot costs (?<geodeOre>\d+) ore and (?<geodeObsidian>\d+) obsidian.$/

export const TYPES = ['ore', 'clay', 'obsidian', 'geode'];

const calcMaxConsumption = (blueprint) => {
  const consumption = {};
  blueprint.consumption = consumption;

  TYPES.forEach(t => consumption[t] = Math.max(
    ...TYPES.map(u => blueprint[u][t] || 0)
  ));

  return blueprint;
}

const parseSpec = (spec) => {
  const { groups } = spec.match(SPEC);
  Object.keys(groups).forEach(key => groups[key] = Number.parseInt(groups[key]));

  return {
    id: groups.id,
    ore: { ore: groups.oreOre },
    clay: { ore: groups.clayOre },
    obsidian: { ore: groups.obsidianOre, clay: groups.obsidianClay },
    geode: { ore: groups.geodeOre, obsidian: groups.geodeObsidian }
  };
};

const parser = (input) => input.split('\n').map(spec => calcMaxConsumption(parseSpec(spec)));

export default parser;
