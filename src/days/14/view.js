import { useRef, useEffect, useState } from 'react';

import useGeneratorCallback from 'lib/use-generator-callback';
import Grid from 'lib/grid';

import { downwards } from './part-one';

const SCALE = 3;
const CENTRE = Math.floor(SCALE / 2);

const FLOW = '#D2BBA0';
const SAND1 = '#9F7E69';
const SAND2 = '#4D2938';
const ROCK = '#00241B';

function *fillCave(rocks) {
  const sand = Grid();

  let current = { x: 500, y: 0 };
  const flow = [current];

  const flowDownwards = () => {
    if (current.y === rocks.max.y + 1) return;

    for (const next of downwards(current))
      if (!(rocks.get(next) || sand.get(next)))
        return next;
  };

  for (; current; current = flow[flow.length - 1]) {
    const next = flowDownwards();
    if (next) {
      const vert = next.x === flow[flow.length - 1].x;
      flow.push(next);

      if (vert)
        yield { flow };
    } else {
      sand.set(current);
      flow.pop();

      yield { sand, current };
    }
  }

  return sand.count;
}

const View = ({ rocks }) => {
  const height = rocks.max.y + 3;
  const width = height * 2;
  const minX = 500 - height;

  const canvas = useRef(null);
  const hitBottom = useRef(false);
  const [interval, setInterval] = useState(1);

  useEffect(() => {
    hitBottom.current = false;

    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

    ctx.fillStyle = ROCK;
    rocks.forEach(({ x, y }) => {
      x -= minX;
      ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
    });

    ctx.fillRect(0, (height - 1) * SCALE, canvas.current.width, SCALE);
  }, [rocks]);

  const drawFlow = (flow) => {
    const from = flow[flow.length - 2];
    const to = flow[flow.length - 1];

    const ctx = canvas.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo((from.x - minX) * SCALE + CENTRE, from.y * SCALE + CENTRE);
    ctx.lineTo((to.x - minX) * SCALE + CENTRE, to.y * SCALE + CENTRE);
    ctx.strokeStyle = FLOW;
    ctx.lineWidth = 1;
    ctx.stroke();

    if (!hitBottom.current && to.y > rocks.max.y)
      hitBottom.current = true;
  };

  const drawSand = (_, pos) => {
    const ctx = canvas.current.getContext('2d');
    ctx.fillStyle = hitBottom.current ? SAND2 : SAND1;
    ctx.fillRect((pos.x - minX) * SCALE, pos.y * SCALE, SCALE, SCALE);
  };

  useGeneratorCallback(fillCave, [rocks], interval, ({ flow, sand, current }) => {
    if (flow)
      drawFlow(flow);
    else
      drawSand(sand, current);
  });

  return <canvas ref={canvas} width={width * SCALE} height={height * SCALE} />
};

export default View;
