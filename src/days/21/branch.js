import { useRef, useEffect } from 'react';

import { Y_STEP } from './consts';

const pathStr = (x1, y1, x2) => (
  `m${x1} ${y1} c0 60 ${x2-x1} 40 ${x2-x1} ${Y_STEP}`
);

const Branch = ({ x1, x2, y, onDrawn }) => {
  const ref = useRef(null);
  const drawnRef = useRef(onDrawn);
  useEffect(() => { drawnRef.current = onDrawn; }, [onDrawn]);

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

    const timer = setTimeout(() => drawnRef.current(), time);

    return () => clearTimeout(timer);
  }, []);

  return <path ref={ref} d={pathStr(x1, y, x2)}
               stroke="none" fill="none" />
};

export default Branch;
