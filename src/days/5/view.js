import { useMemo } from 'react';

import useIntervalCounter from 'lib/use-interval-counter';

import { applyMove } from './part-two';

const BOX_DIM = 22;

const boxStyle = (x, y, maxHeight) => (
  {
    position: 'absolute',
    marginLeft: `${x * BOX_DIM}px`,
    marginTop: `${(maxHeight - y + 1) * BOX_DIM}px`
  }
);

const Box = ({ item, ...props }) => (
  <i {...props}>{item}</i>
);

const View = ({ data, speed }) => {
  const { stacks, moves } = data;
  const sequence = useMemo(() => {
    let key = 0;
    const keyed = stacks.map(stack => stack.map(item => ({ key: key++, item })));
    return moves.reduce((seq, move) => {
      const prev = seq[seq.length - 1];
      seq.push(applyMove(prev, move));
      return seq;
    }, [keyed]);
  }, [stacks, moves]);

  const maxHeight = useMemo(() => (
    Math.max(...sequence.map(state => Math.max(...state.map(stack => stack.length))))
  ), [sequence]);

  const position = useIntervalCounter(sequence.length, speed);
  if (position >= sequence.length) return;

  const state = sequence[position];
  return <div style={{ width: `${stacks.length * BOX_DIM}px`, height: `${maxHeight * BOX_DIM}px`, position: 'relative' }} className="dayFive">
    {state.map((stack, x) => stack.map(({ key, item }, y) => ({ key, item, x, y })))
          .flat().sort((a, b) => a.key - b.key).map(({ key, item, x, y }) =>
            <Box key={key} item={item} style={boxStyle(x, y, maxHeight)} />
          )
    }
  </div>;
};

export default View;
