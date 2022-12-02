import { useMemo } from 'react';

import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';

import input from '../input/1.txt';
import sample from '../input/1.sample.txt';

import partOne from './1/part-one';
import partTwo from './1/part-two';

import View from './1/view';

const PartOne = ({ data }) => {
  const max = useMemo(() => partOne(data), [data]);

  return <div>Part 1: {max}</div>;
};

const PartTwo = ({ data }) => {
  const total = useMemo(() => partTwo(data), [data]);

  return <div>Part 2: {total}</div>;
};

const parser = (data) => (
  data.split('\n\n').map(elf =>
    elf.split('\n').map(meal => Number.parseInt(meal))
  )
);

const One = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) => (
    <Stack gap={3}>
      <pre>{JSON.stringify(data)}</pre>
      <View data={data} />
      <Stack gap={3} direction="horizontal" className="mx-auto">
        <PartOne data={data} />
        <PartTwo data={data} />
      </Stack>
    </Stack>
  )}</SourceLoader>
);

export default One;
