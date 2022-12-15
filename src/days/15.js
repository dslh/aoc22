import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/15.txt';
import sample from 'input/15.sample.txt';

import parser from './15/parser';
import partOne from './15/part-one';
const partTwo = () => '🙃';

const Fifteen = () => (
  <SourceLoader showParsed {...{input, sample, parser}}>{(data) => (
    <Stack gap={2}>
      <Stack gap={3} direction="horizontal" className="mx-auto">
        <Memoizer title="Part one" data={data} func={partOne} />
        <Memoizer title="Part two" data={data} func={partTwo} />
      </Stack>
    </Stack>
  )}</SourceLoader>
);

export default Fifteen;
