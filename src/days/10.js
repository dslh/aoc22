import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/10.txt';
import sample from 'input/10.sample.txt';

import partOne from './10/part-one';
import PartTwo from './10/part-two';

const parser = (data) => data.split('\n');

const Ten = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) =>
    <Stack>
      <Memoizer title="Part one" data={data} func={partOne} />
      <PartTwo instructions={data} />
    </Stack>
  }</SourceLoader>
);

export default Ten;
