import { TYPES } from './parser';

const canAssemble = (robot, production) => {
  for (const resource of Object.keys(robot))
    if (!production[resource])
      return false;

  return true;
};

const timeToAssemble = (robot, production, stock) => (
  Math.max(...Object.keys(robot).map(resource => (
    Math.max(0, Math.ceil((robot[resource] - stock[resource]) / production[resource]))
  ))) + 1
);

const increaseProduction = (production, type) => {
  const increased = { ...production };
  increased[type]++;
  return increased;
};

const increaseStock = (production, stock, robot, time) => {
  const increased = {};
  for (const type of TYPES)
    increased[type] = stock[type] + production[type] * time - (robot[type] || 0);
  return increased;
};

export const evalBlueprint = (
  blueprint,
  timeRemaining = 24,
  production = { ore: 1, clay: 0, obsidian: 0, geode: 0 },
  stock = { ore: 0, clay: 0, obsidian: 0, geode: 0 }
) => {
  let max = 0;

  if (timeRemaining === 1) return production.geode;

  if (timeRemaining === 2)
    return production.geode * 2 +
      (stock.ore >= blueprint.geode.ore && stock.obsidian >= blueprint.geode.obsidian ? 1 : 0);

  for (const type of TYPES) {
    const robot = blueprint[type];
    if (!canAssemble(robot, production)) continue;

    if (type !== 'geode' && blueprint.consumption[type] === production[type]) continue;

    const time = timeToAssemble(robot, production, stock);
    if (time >= timeRemaining) continue;

    const value = time * production.geode + evalBlueprint(
      blueprint,
      timeRemaining - time,
      increaseProduction(production, type),
      increaseStock(production, stock, robot, time)
    );

    if (value > max) max = value;
  }

  if (!max) max = timeRemaining * production.geode;

  return max;
};

const partOne = (blueprints) => blueprints.reduce((sum, blueprint) =>
  sum + blueprint.id * evalBlueprint(blueprint), 0
);


export default partOne;
