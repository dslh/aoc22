import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/13.txt';
import sample from 'input/13.sample.txt';

import parser from './13/parser';
import partOne from './13/part-one';
import partTwo from './13/part-two';

import Packet from './13/packet';

const Thirteen = () => (
  <SourceLoader showParsed {...{input, sample, parser}}>{(data) => (
    <Stack gap={2}>
      <Stack gap={3} direction="horizontal" className="mx-auto">
        <Memoizer title="Part one" data={data} func={partOne} />
        <Memoizer title="Part two" data={data} func={partTwo} />
      </Stack>
      <div>
        <Packet packet={[[10,[6,2,5,10,[6,5]],7,5,0]]} />
      </div>
    </Stack>
  )}</SourceLoader>
);

export default Thirteen;
