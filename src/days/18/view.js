import { useState, useMemo } from 'react';

import { Canvas } from '@react-three/fiber';

import Stack from 'react-bootstrap/Stack';

import Grid3d from 'lib/grid-3d';
import useGeneratorCallback from 'lib/use-generator-callback';
import useRedraw from 'lib/use-redraw';

import Framing from './framing';
import Cube from './cube';

import animateOne from './animate-one';
import animateTwo from './animate-two';

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

function *animate(list, grid, setPartOne, setPartTwo, setInterval) {
  setPartOne(0);
  setPartTwo(0);

  setInterval(100);
  yield *animateOne(list, grid, setPartOne);

  setInterval(200);
  yield *animateTwo(list, grid, setPartTwo);
}

const View = ({ coords }) => {
  const { list, grid } = useMemo(() => toCubes(coords), [coords]);
  const [partOne, setPartOne] = useState(0);
  const [partTwo, setPartTwo] = useState(0);
  const [interval, setInterval] = useState(100);

  const redraw = useRedraw();
  useGeneratorCallback(animate, [list, grid, setPartOne, setPartTwo, setInterval], interval, redraw);

  return <Stack gap={2}>
    <Stack gap={3} direction="horizontal" className="mx-auto">
      <div>Part one: {partOne}</div>
      <div>Part two: {partTwo}</div>
    </Stack>
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
