import { useRef, useEffect } from 'react';

import useTrackedRef from 'lib/use-tracked-ref';

import { Y_STEP } from './consts';

const pathStr = (x1, y1, x2) => (
  `m${x1} ${y1} c0 60 ${x2-x1} 40 ${x2-x1} ${Y_STEP}`
);

const Branch = ({ x1, x2, y, onDrawn, visible = true }) => {
  const ref = useRef(null);
  const drawn = useTrackedRef(onDrawn);

  useEffect(() => {
    const length = ref.current.getTotalLength();
    const { style } = ref.current;

    style.stroke = '#483C46';
    style.strokeDasharray = length;
    style.strokeDashoffset = length;
    ref.current.getBoundingClientRect();

    const time = Math.round(length / Y_STEP * 1000);
    style.transition = `stroke-dashoffset ${time}ms linear`;
    style.strokeDashoffset = 0;

    const timer = setTimeout(() => drawn.current(), time);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const { style } = ref.current;
    style.strokeDashoffset = visible ? 0 : style.strokeDasharray;

    const time = Math.round(ref.current.getTotalLength() / Y_STEP * 1000);
    const timer = setTimeout(() => drawn.current(), time);
    return () => clearTimeout(timer);
  }, [visible]);

  return <path ref={ref} d={pathStr(x1, y, x2)}
               stroke="none" fill="none" />
};

export default Branch;
