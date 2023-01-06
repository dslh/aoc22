import { useState, useEffect, useLayoutEffect, useMemo } from 'react';

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, ScrollControls } from "@react-three/drei";

import Stack from 'react-bootstrap/Stack';

import Grid3d from 'lib/grid-3d';
import useAcceleratedCounter from 'lib/use-accelerated-counter';

import { adjacency } from './part-one';

import Cube from './cube';

const INVERSE_SIDE = {
  front: 'back',
  back:  'front',
  up:    'down',
  down:  'up',
  right: 'left',
  left:  'right'
};

const toCubes = (coords) => {
  const list = [];
  const grid = Grid3d();

  coords.forEach(position => {
    const cube = { position, faces: {} };
    list.push(cube);
    grid.set(position, cube);
  });

  return { list, grid };
};

const enableCube = (grid, list, index) => {
  const { position, faces } = list[index];
  list[index].added = true;

  let added = 0;
  for (const neighbour of adjacency(position)) {
    const adjacent = grid.get(neighbour);
    if (adjacent && adjacent.added) {
      delete adjacent.faces[INVERSE_SIDE[neighbour.side]];
      added--;
    } else {
      faces[neighbour.side] = 'hot';
      added++;
    }
  }

  return added;
};

const geometricIndex = (step) => (
  (step + step ** 2) / 2
);
const geometricLimit = (count) => Math.ceil(
  Math.sqrt(count * 8 + 1) / 2 - 0.5
);

const Framing = ({ grid }) => {
  const { camera } = useThree();
  const target = useMemo(() => ([
    (grid.max.x + grid.min.x) / 2,
    (grid.max.y + grid.min.y) / 2,
    (grid.max.z + grid.min.z) / 2
  ]), [grid]);

  useEffect(() => {
    camera.position.x = grid.max.x + 1;
    camera.position.y = grid.max.y + 1;
    camera.position.z = grid.max.z + 1;
    camera.lookAt(target);
  }, [grid]);

  return <>
    <OrbitControls target={target} />
    <ScrollControls />
    <pointLight color="white" position={[grid.max.x, grid.max.y, grid.max.z]} intensity={1} />
  </>;
};

const View = ({ coords }) => {
  const { list, grid } = useMemo(() => toCubes(coords), [coords]);
  const [partOne, setPartOne] = useState(0);

  const step = useAcceleratedCounter(geometricLimit(list.length), 1000, 0.95, 10);
  useLayoutEffect(() => {
    if (step === 0) setPartOne(0);

    const limit = Math.min(list.length, geometricIndex(step + 1));
    let added = 0;
    for (let i = geometricIndex(step); i < limit; ++i) {
      added += enableCube(grid, list, i);
    }
    setPartOne(v => v + added);
  }, [step, list, grid]);

  return <Stack gap={2}>
    <div className="mx-auto">
      Part one: {partOne}
    </div>
    <div style={{width: '800px', height: '800px'}}>
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [20, 0, 50] }} >
        <ambientLight intensity={0.4} />
        <Framing grid={grid} />
        {list.map((cube, i) => <Cube key={i} {...cube} />)}
      </Canvas>
    </div>
  </Stack>;
};

export default View;
