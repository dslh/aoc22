import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/11.txt';
import sample from 'input/11.sample.txt';

import parser from './11/parser';

import partOne from './11/part-one';
import partTwo from './11/part-two';

const Eleven = () => (
  <SourceLoader showParsed {...{input, sample, parser}}>{(data) =>
    <Stack>
      <Memoizer title="Part one" data={data} func={partOne} />
      <Memoizer title="Part two" data={data} func={partTwo} />
    </Stack>
  }</SourceLoader>
);

export default Eleven;
