import { useMemo } from 'react';

import Stack from 'react-bootstrap/Stack';

import useAcceleratedCounter from 'lib/use-accelerated-counter';

import Game from './game';

import { scores as calcScores, VALUES } from './part-two';

const ViewTwo = ({ data }) => {
  const i = useAcceleratedCounter(data.length, 1000, 0.9);
  const scores = useMemo(() => calcScores(data), [data]);

  if (!data[i]) return;

  return <Stack gap={3}>
    <Game game={data[i]} score={scores[i]} result={VALUES[data[i][1]]} />
    <div> Part two: {scores.slice(0, i + 1).reduce((s, v) => s + v)}</div>
  </Stack>;
};

export default ViewTwo;
