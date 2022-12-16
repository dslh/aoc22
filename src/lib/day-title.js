const DAY_TITLES = [
  'Calorie Counting',
  'Rock Paper Scissors',
  'Rucksack Reorganization',
  'Camp Cleanup',
  'Supply Stacks',
  'Tuning Trouble',
  'No Space Left On Device',
  'Treetop Tree House',
  'Rope Bridge',
  'Cathode-Ray Tube',
  'Monkey in the Middle',
  'Hill Climbing Algorithm',
  'Distress Signal',
  'Regolith Reservoir',
  'Beacon Exclusion Zone',
  'Proboscidea Volcanium'
];

const dayTitle = (day) => DAY_TITLES[Number.parseInt(day) - 1];

export default dayTitle;