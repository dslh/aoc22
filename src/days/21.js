import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/21.txt';
import sample from 'input/21.sample.txt';

import parser from './21/parser';
import partOne from './21/part-one';
import partTwo from './21/part-two';

const TwentyOne = () => (
  <SourceLoader showParsed {...{input, sample, parser}}>{(data) => (
    <Stack gap={2}>
      <Stack gap={3} direction="horizontal" className="mx-auto">
        <Memoizer title="Part one" data={data} func={partOne} />
        <Memoizer title="Part two" data={data} func={partTwo} />
      </Stack>
    </Stack>
  )}</SourceLoader>
);

export default TwentyOne;
