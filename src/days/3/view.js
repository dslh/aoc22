import Stack from 'react-bootstrap/Stack';

import useAcceleratedCounter from 'lib/use-accelerated-counter';

import Display from './display';

import partOne from './part-one';
import partTwo from './part-two';

const View = ({ data }) => {
  const width = Math.max(...data.map(line => line.length)) / 2;
  const i = useAcceleratedCounter(data.length / 3, 1000, 0.9) * 3;

  if (i >= data.length) return;

  const current = data.slice(i, i + 3);
  const soFar = data.slice(0, i + 3);

  return <Stack gap={3}>
    <Display slice={current} width={width} />
    <Stack gap={3} direction="horizontal" className="mx-auto">
      <div>Part one: {partOne(soFar)}</div>
      <div>Part two: {partTwo(soFar)}</div>
    </Stack>
  </Stack>;
};

export default View;
