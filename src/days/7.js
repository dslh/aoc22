import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/7.txt';
import sample from 'input/7.sample.txt';

import parser from './7/parser';
import partOne from './7/part-one';
import partTwo from './7/part-two';

const Seven = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) =>
    <Stack gap={3} direction="horizontal" className="mx-auto">
      <Memoizer title="Part one" data={data} func={partOne} />
      <Memoizer title="Part two" data={data} func={partTwo} />
    </Stack>
  }</SourceLoader>
);

export default Seven;
