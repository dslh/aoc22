import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';

import input from 'input/25.txt';
import sample from 'input/25.sample.txt';

import partOne from './25/part-one';

const parser = data => data.split('\n');

const TwentyFive = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) => (
    <Stack gap={2}>
      <Stack gap={3} direction="horizontal" className="mx-auto">
        {partOne(data)}
      </Stack>
    </Stack>
  )}</SourceLoader>
);

export default TwentyFive;

