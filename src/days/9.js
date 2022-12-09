import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/9.txt';
import sample from 'input/9.sample.txt';

import partOne from './9/part-one';

const parser = (data) => (
  data.split('\n').map(instruction => {
    const [dir, count] = instruction.split(' ');
    return { dir, count: Number.parseInt(count) };
  })
);

const Nine = () => (
  <SourceLoader showParsed {...{input, sample, parser}}>{(data) =>
    <Memoizer title="Part one" data={data} func={partOne} />
  }</SourceLoader>
);

export default Nine;
