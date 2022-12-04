import { useEffect, useState } from 'react';

import Stack from 'react-bootstrap/Stack';

import Line from './line';

import useAcceleratedCounter from 'lib/use-accelerated-counter';

import './style.css';

const dummy = () => {};

const View = ({ data }) => {
  const i = useAcceleratedCounter(data.length, 1600, 0.95, 50);
  const [scroll, setScroll] = useState(true);
  if (scroll && i === data.length - 1)
    setScroll(false);

  useEffect(() => {
    if (!scroll) return;

    const timer = setInterval(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
    return () => clearInterval(timer);
  }, [scroll]);

  if (i >= data.length) return;

  return <Stack>
    {data.slice(0, i + 1).map((pair, j) => (
      <Line key={j} pair={pair} incrementContains={dummy} incrementOverlaps={dummy} />
    ))}
  </Stack>;
};

export default View;
