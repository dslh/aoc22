import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/10.txt';
import sample from 'input/10.sample.txt';

import partOne from './10/part-one';

const parser = (data) => data.split('\n');

const Ten = () => (
  <SourceLoader showParsed {...{input, sample, parser}}>{(data) =>
    <Memoizer title="Part one" data={data} func={partOne} />
  }</SourceLoader>
);

export default Ten;
