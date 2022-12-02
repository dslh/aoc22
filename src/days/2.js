import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';

import input from '../input/2.txt';
import sample from '../input/2.sample.txt';

import parser from './2/parser';

import ViewOne from './2/view-one';
import ViewTwo from './2/view-two';

const Two = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) => (
    <Stack gap={3} direction="horizontal">
      <ViewOne data={data} />
      <ViewTwo data={data} />
    </Stack>
  )}</SourceLoader>
);

export default Two;
