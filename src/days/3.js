import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/3.txt';
import sample from 'input/3.sample.txt';

import partOne from './3/part-one';
import partTwo from './3/part-two';

const parser = (data) => data.split('\n');

const Three = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) => (
    <Stack gap={3} direction="horizontal" className="mx-auto">
      <Memoizer title="Part one" data={data} func={partOne} />
      <Memoizer title="Part two" data={data} func={partTwo} />
    </Stack>
  )}</SourceLoader>
);

export default Three;
