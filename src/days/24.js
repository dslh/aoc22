import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/24.txt';
import sample from 'input/24.sample.txt';

import parser from './24/parser';
import partOne from './24/part-one';
import partTwo from './24/part-two';

const TwentyFour = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) => (
    <Stack gap={2}>
      <Stack gap={3} direction="horizontal" className="mx-auto">
        <Memoizer title="Part one" data={data} func={partOne} />
        <Memoizer title="Part two" data={data} func={partTwo} />
      </Stack>
    </Stack>
  )}</SourceLoader>
);

export default TwentyFour;
