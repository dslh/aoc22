import SourceLoader from 'components/source-loader';

import input from 'input/23.txt';
import sample from 'input/23.sample.txt';

import parser from './23/parser';

import View from './23/view';

const TwentyThree = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) => (
    <View grid={data} />
  )}</SourceLoader>
);

export default TwentyThree;
