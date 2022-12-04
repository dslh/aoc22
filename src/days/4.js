import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/4.txt';
import sample from 'input/4.sample.txt';

import partOne from './4/part-one';
import partTwo from './4/part-two';

import View from './4/view';

const parser = (data) => (
  data.split('\n').map(pair =>
    pair.split(',').map(range => range.split('-').map(i => Number.parseInt(i)))
  )
);

const Four = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) => (
    <Stack gap={2}>
      <Stack gap={3} direction="horizontal" className="mx-auto">
        <Memoizer title="Part one" data={data} func={partOne} />
        <Memoizer title="Part two" data={data} func={partTwo} />
      </Stack>
      <View key={JSON.stringify(data)} data={data} />
    </Stack>
  )}</SourceLoader>
);

export default Four;
