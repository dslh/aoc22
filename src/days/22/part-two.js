import parser, { DIRS, INVERSE_DIRS } from './parser';
import { changeDir, score, followInstruction, startPos } from './part-one';

const insideCorner = (node) => {
  const open = DIRS.filter(dir => !node[dir]);

  if (open.length !== 1) return;
  const dir = open[0];

  let rightNode = node;
  let rightDir = changeDir('L', INVERSE_DIRS[dir]);
  for (let i = 0; i < 2; ++i) {
    const next = rightNode[rightDir];
    if (!next) return;

    rightDir = changeDir('L', next.dir || rightDir);
    rightNode = next.to;
  }

  if (rightNode[rightDir]) return;

  return { left: [node, dir], right: [rightNode, rightDir] };
};

function *insideCorners(map) {
  const edges = [];
  map.forEach((_, node) => {
    if (DIRS.some(dir => !node[dir]))
      edges.push(node);
  });

  let found;
  do {
    found = false;
    for (const node of edges) {
      const corner = insideCorner(node);
      if (corner) {
        yield corner;
        found = true;
      }
    }
  } while(found);
}

function *followEdge(node, dir, turn) {
  do {
    yield [node, dir];

    dir = changeDir(turn, INVERSE_DIRS[dir]);
    const next = node[dir];
    if (!next) return;
    node = next.to;
    dir = changeDir(turn, next.dir || dir);
  } while (!node[dir]);
}

const stitchFromCorner = (corner) => {
  let { left: [leftNode, leftDir], right: [rightNode, rightDir] } = corner;

  const leftEdge = followEdge(leftNode, leftDir, 'R');
  const rightEdge = followEdge(rightNode, rightDir, 'L');

  for (let left = leftEdge.next(), right = rightEdge.next();
       !(left.done || right.done); left = leftEdge.next(), right = rightEdge.next()) {
    [leftNode, leftDir] = left.value;
    [rightNode, rightDir] = right.value;

    leftNode[leftDir] = { to: rightNode, dir: INVERSE_DIRS[rightDir] };
    rightNode[rightDir] = { to: leftNode, dir: INVERSE_DIRS[leftDir] };
  }
};

const stitchEdges = (map) => {
  for (const corner of insideCorners(map))
    stitchFromCorner(corner);
};

const partTwo = (input) => {
  const { map, moves } = parser(input);
  stitchEdges(map);

  let pos = startPos(map, input);
  for (const instruction of moves)
    pos = followInstruction(instruction, pos);

  return score(pos);
};

export default partTwo;
