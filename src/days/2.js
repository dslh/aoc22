import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from '../input/2.txt';
import sample from '../input/2.sample.txt';

import parser from './2/parser';
import partOne from './2/part-one';

const Two = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) => (
    <Memoizer title="Part one" data={data} func={partOne} />
  )}</SourceLoader>
);

export default Two;
