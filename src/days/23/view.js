import { useState, useEffect } from 'react';

import Stack from 'react-bootstrap/Stack';
import Loader from 'react-spinners/PulseLoader';

import Readout from 'components/readout';

import useGeneratorCallback from 'lib/use-generator-callback';
import HashGrid from 'lib/hash-grid';

import styles from './view.module.css';

import { step } from './part-one';

function *run(grid) {
  let i = 0;
  let prev;
  do {
    prev = grid;
    grid = step(grid, i++);
    yield { grid, i };
  } while (prev !== grid);

  const happy = HashGrid();
  grid.forEach((pos, { key }) => happy.set(pos, { key, happy: true }));
  yield { grid: happy, i };
}

const SCALE = 10;

const Elf = ({ pos, happy, sad, lazy }) => {
  const classNames = [styles.elf];
  if (happy) classNames.push(styles.happy);
  if (sad) classNames.push(styles.sad);
  if (lazy) classNames.push(styles.lazy);

  return <div className={classNames.join(' ')}
              style={{
                left: pos.x * SCALE + 'px',
                top: pos.y * SCALE + 'px'
              }} />;
};

const View = ({ grid: input }) => {
  const { min, max } = input;

  const [{ grid, i }, setState] = useState({ grid: input, i: 0 });
  useEffect(() => { setState({ grid: input, i: 0 }); }, [input]);
  useGeneratorCallback(run, [input], 100_000 / (i + 100), setState);

  const [partOne, setPartOne] = useState(null);
  useEffect(() => {
    if (!i) setPartOne(null);

    if (i === 10)
      setPartOne((grid.max.x - grid.min.x + 1) * (grid.max.y - grid.min.y + 1) - grid.count);
  }, [grid, i]);

  const elves = new Array(grid.count);
  grid.forEach((pos, { key, happy, sad, lazy }) => elves[key] = { pos, happy, sad, lazy });

  return <Stack gap={2}>
    <Stack gap={3} direction="horizontal" className="mx-auto">
      <div className={styles.partOne}>
        Part one: {partOne ? <Readout value={partOne} /> : <Loader color="#0dcaf0" />}
      </div>
      <div>Part two: {i}</div>
    </Stack>
    <div className={styles.field}
         style={{
           width: (max.x - min.x + 1) * SCALE + 'px',
           height: (max.y - min.y + 1) * SCALE + 'px'
         }}>
      {elves.map((elf, key) => <Elf key={key} {...elf} />)}
    </div>
  </Stack>;
};

export default View;
