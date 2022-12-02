import { useMemo } from 'react';

import Stack from 'react-bootstrap/Stack';

import useAcceleratedCounter from 'lib/use-accelerated-counter';

import { VALUES, score as result, scores as calcScores } from './part-one';

import Game from './game';

const ViewOne = ({ data }) => {
  const i = useAcceleratedCounter(data.length, 1000, 0.9);
  const scores = useMemo(() => calcScores(data), [data]);

  if (!data[i]) return;

  return <Stack gap={3}>
    <Game game={data[i]} score={scores[i]} result={result(data[i].map(i => VALUES[i]))} />
    <div>Part one: {scores.slice(0, i + 1).reduce((s, v) => s + v)}</div>
  </Stack>;
};

export default ViewOne;
