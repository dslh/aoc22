import SourceLoader from 'components/source-loader';

import input from 'input/3.txt';
import sample from 'input/3.sample.txt';

import View from './3/view';

const parser = (data) => data.split('\n');

const Three = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) => (
    <View data={data} />
  )}</SourceLoader>
);

export default Three;
