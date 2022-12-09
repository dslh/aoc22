import { useEffect, useMemo, useRef } from 'react';

import useTimedGenerator from 'lib/use-timed-generator';

import { tailVisitation, moveRope } from './part-one';

import './style.css'

const useExtents = (data) => useMemo(() => {
  const visited = tailVisitation(data);

  const minX = Math.min(...Object.keys(visited));
  const maxX = Math.max(...Object.keys(visited));

  const minY = Math.min(...Object.values(visited).map(row => Math.min(...Object.keys(row))));
  const maxY = Math.max(...Object.values(visited).map(row => Math.max(...Object.keys(row))));

  return [minX, maxX, minY, maxY];
}, [data]);

const SCALE = 3;

function *generator(instructions) {
  for (const rope of moveRope(instructions, 10))
    yield [...rope];
}

const View = ({ data }) => {
  const [minX, maxX, minY, maxY] = useExtents(data);
  const canvas = useRef(null);
  const width = (maxX - minX) * SCALE;
  const height = (maxY - minY) * SCALE;

  const ropeStyle = (x, y, i) => ({
    top: `${height - (y - minY + 1) * SCALE}px`,
    left: `${(x - minX) * SCALE}px`,
    backgroundColor: `hsl(${24 * i}, 100%, 50%)`
  });

  const coords = ({ x, y }) => ([
    (x - minX) * SCALE,
    height - (y - minY + 1) * SCALE + 1
  ]);
  const drawLine = (a, b, hue) => {
    const cnv = canvas.current.getContext('2d');
    cnv.strokeStyle = `hsla(${hue}, 100%, 50%, 0.5)`;
    cnv.beginPath();
    cnv.moveTo(...coords(a));
    cnv.lineTo(...coords(b));
    cnv.stroke();
  };

  const rope = useTimedGenerator(generator, [data], [], data.length > 10 ? 10 : 100);

  const onePrev = useRef({ x: 0, y: 0 });
  const one = rope[1] || { x: 0, y: 0 };
  useEffect(() => {
    drawLine(onePrev.current, one, 24);
    onePrev.current.x = one.x;
    onePrev.current.y = one.y;
  }, [one, one.x, one.y]);

  const ninePrev = useRef({ x: 0, y: 0 });
  const nine = rope[9] || { x: 0, y: 0 };
  useEffect(() => {
    drawLine(ninePrev.current, nine, 24 * 9);
    ninePrev.current.x = nine.x;
    ninePrev.current.y = nine.y;
  }, [nine, nine.x, nine.y]);

  useEffect(() => {
    onePrev.current = { x: 0, y: 0 };
    ninePrev.current = { x: 0, y: 0 };

    if (!canvas.current) return;

    const cnv = canvas.current.getContext('2d');
    cnv.clearRect(0, 0, canvas.current.width, canvas.current.height);
  }, [data]);

  return <div className="dayNine mx-auto" style={{ width: `${width + 1}px`, height: `${height + 1}px` }}>
    <canvas ref={canvas} width={width + 1} height={height + 1} />
    {rope.map(({ x, y }, i) =>
      <div key={i} className="rope" style={ropeStyle(x, y, i)} />
    )}
  </div>;
};

export default View;
