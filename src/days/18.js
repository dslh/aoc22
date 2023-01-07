import SourceLoader from 'components/source-loader';

import input from 'input/18.txt';
import sample from 'input/18.sample.txt';

import parser from './18/parser';

import View from './18/view';

const Eighteen = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) => (
    <View coords={data} />
  )}</SourceLoader>
);

export default Eighteen;

