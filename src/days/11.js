import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/11.txt';
import sample from 'input/11.sample.txt';

import parser from './11/parser';

import partOne from './11/part-one';
import partTwo from './11/part-two';

import View from './11/view';

const Eleven = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) =>
    <Stack className="justify-content-md-center">
      <Stack gap={3} direction="horizontal" className="mx-auto">
        <Memoizer title="Part one" data={data} func={partOne} />
        <Memoizer title="Part two" data={data} func={partTwo} />
      </Stack>
      <View data={data} />
    </Stack>
  }</SourceLoader>
);

export default Eleven;
