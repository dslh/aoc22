import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/12.txt';
import sample from 'input/12.sample.txt';

import parser from './12/parser';
import partOne from './12/part-one';

const Twelve = () => (
  <SourceLoader showParsed {...{input, sample, parser}}>{(data) => (
    <Stack gap={2}>
      <Stack gap={3} direction="horizontal" className="mx-auto">
        <Memoizer title="Part one" data={data} func={partOne} />
      </Stack>
    </Stack>
  )}</SourceLoader>
);

export default Twelve;
