import { useMemo } from 'react';
import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/11.txt';
import sample from 'input/11.sample.txt';

import parser from './11/parser';

import partOne, { itemSlinger } from './11/part-one';
import partTwo from './11/part-two';

import View from './11/view';

const Eleven = () => {
  const partOneSlinger = useMemo(() => itemSlinger(value => Math.floor(value / 3)), []);
  const partTwoSlinger = useMemo(() => itemSlinger(value => value % 9699690), []);

  return <SourceLoader {...{input, sample, parser}}>{(data) =>
    <Stack className="justify-content-md-center">
      <Memoizer title="Part one" data={data} func={partOne} />
      <View data={data} rounds={20} slingItem={partOneSlinger} />
      <Memoizer title="Part two" data={data} func={partTwo} />
      <View data={data} rounds={10000} slingItem={partTwoSlinger} />
    </Stack>
  }</SourceLoader>
};

export default Eleven;
