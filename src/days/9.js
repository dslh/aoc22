import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/9.txt';
import sample from 'input/9.sample.txt';

import partOne from './9/part-one';
import partTwo from './9/part-two';

import View from './9/view';

const parser = (data) => (
  data.split('\n').map(instruction => {
    const [dir, count] = instruction.split(' ');
    return { dir, count: Number.parseInt(count) };
  })
);

const Nine = () => (
  <SourceLoader showParsed {...{input, sample, parser}}>{(data) =>
    <Stack className="justify-content-md-center">
      <Stack gap={3} direction="horizontal" className="mx-auto">
        <Memoizer title="Part one" data={data} func={partOne} />
        <Memoizer title="Part two" data={data} func={partTwo} />
      </Stack>
      <View data={data} />
    </Stack>
  }</SourceLoader>
);

export default Nine;
