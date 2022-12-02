import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from '../input/1.txt';
import sample from '../input/1.sample.txt';

import partOne from './1/part-one';
import partTwo from './1/part-two';

import View from './1/view';

const parser = (data) => (
  data.split('\n\n').map(elf =>
    elf.split('\n').map(meal => Number.parseInt(meal))
  )
);

const One = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) => <>
    <View data={data} />
    <Stack gap={3} direction="horizontal" className="mx-auto">
      <Memoizer title="Part one" data={data} func={partOne} />
      <Memoizer title="Part two" data={data} func={partTwo} />
    </Stack>
  </>}</SourceLoader>
);

export default One;
