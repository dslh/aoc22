import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/15.txt';
import sample from 'input/15.sample.txt';

import parser from './15/parser';
import partOne from './15/part-one';

import View from './15/view';

const Fifteen = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) => (
    <Stack gap={2}>
      <Memoizer title="Part one" data={data} func={partOne} />
      <View sensors={data} />
    </Stack>
  )}</SourceLoader>
);

export default Fifteen;
