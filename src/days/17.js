import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/17.txt';
import sample from 'input/17.sample.txt';

import partOne from './17/part-one';
const parser = data => data;
const partTwo = () => '😵';

const Seventeen = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) => (
    <Stack gap={2}>
      <Stack gap={3} direction="horizontal" className="mx-auto">
        <Memoizer title="Part one" data={data} func={partOne} />
        <Memoizer title="Part two" data={data} func={partTwo} />
      </Stack>
    </Stack>
  )}</SourceLoader>
);

export default Seventeen;
