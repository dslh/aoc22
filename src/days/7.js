import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/7.txt';
import sample from 'input/7.sample.txt';

import parser from './7/parser';
import partOne from './7/part-one';
import partTwo from './7/part-two';

import './7/style.css'

import View from './7/view';

const Seven = () => (
  <SourceLoader {...{input, sample, parser}}>{(data, commands) =>
    <Stack className="daySeven">
      <Stack gap={3} direction="horizontal" className="mx-auto">
        <Memoizer title="Part one" data={data} func={partOne} />
        <Memoizer title="Part two" data={data} func={partTwo} />
      </Stack>
      <View commands={commands} />
    </Stack>
  }</SourceLoader>
);

export default Seven;
