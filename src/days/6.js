import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import './6/style.css';

import input from 'input/6.txt';
import sample from 'input/6.sample.txt';

import partOne from './6/part-one';
import partTwo from './6/part-two';

import Scanner from './6/scanner';

const parser = (data) => data;

const Six = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) =>
    <Stack className="daySix">
      <Stack gap={3} direction="horizontal" className="mx-auto">
        <Memoizer title="Part one" data={data} func={partOne} />
        <Memoizer title="Part two" data={data} func={partTwo} />
      </Stack>
      <Scanner data={data} size={4} />
      <Scanner data={data} size={14} />
    </Stack>
  }</SourceLoader>
);

export default Six;
