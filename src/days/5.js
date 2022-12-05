import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/5.txt';
import sample from 'input/5.sample.txt';

import parser from './5/parser';
import partOne from './5/part-one';
import partTwo from './5/part-two';

const Five = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) => (
    <Stack gap={3} direction="horizontal" className="mx-auto">
      <Memoizer title="Part one" data={data} func={partOne} />
      <Memoizer title="Part two" data={data} func={partTwo} />
    </Stack>
  )}</SourceLoader>
);

export default Five;
