import Stack from 'react-bootstrap/Stack';

import SourceLoader from 'components/source-loader';
import Memoizer from 'components/memoizer';

import input from 'input/5.txt';
import sample from 'input/5.sample.txt';

import parser from './5/parser';
import partOne, { asPartTwoMoves } from './5/part-one';
import partTwo from './5/part-two';

import './5/style.css';

import View from './5/view';

const Five = () => (
  <SourceLoader {...{input, sample, parser}}>{(data) => {
    const { stacks, moves } = data;
    const partOneMoves = asPartTwoMoves(moves);

    return <Stack gap={2} className="dayFive">
      <Stack gap={3} direction="horizontal" className="mx-auto">
        <Memoizer title="Part one" data={data} func={partOne} />
        <Memoizer title="Part two" data={data} func={partTwo} />
      </Stack>
      <Stack className="mx-auto" direction="horizontal" gap={5}>
        <View data={{ stacks, moves: partOneMoves }} speed={100} />
        <View data={data} speed={400} />
      </Stack>
    </Stack>;
  }}</SourceLoader>
);

export default Five;
