import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/8.txt';
import sample from 'input/8.sample.txt';

import partOne from './8/part-one';
import partTwo from './8/part-two';

import './8/style.css';

import ViewOne from './8/view-one';

const parser = (data) => (
  data.split('\n').map(line => line.split('').map(tree => Number.parseInt(tree)))
);

const Eight = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) =>
    <Stack className="dayEight">
      <Stack gap={3} direction="horizontal" className="mx-auto">
        <Memoizer title="Part one" data={data} func={partOne} />
        <Memoizer title="Part two" data={data} func={partTwo} />
      </Stack>
      <ViewOne data={data} />
    </Stack>
  }</SourceLoader>
);

export default Eight;
