import { useRef, useEffect } from 'react';

import { visit } from './part-one';

import useGeneratorCallback from 'lib/use-generator-callback';

import makeGradient from 'lib/make-gradient';

const COLOURS = makeGradient([182, 193, 151], [98, 110, 73], 26);
const START = '#931F1D';

const SCALE = 10;

const circle = (context, x, y, radius, fill, stroke, lineWidth = 2) => {
  context.beginPath();
  context.arc(x * SCALE + SCALE / 2, y * SCALE + SCALE / 2, radius, 0, 2 * Math.PI);

  if (fill) {
    context.fillStyle = fill;
    context.fill();
  }

  if (stroke) {
    context.strokeStyle = stroke;
    context.lineWidth = lineWidth;
    context.stroke();
  }
};

const line = (context, from, to, color, width = 2) => {
  context.beginPath();
  context.moveTo(from.row * SCALE + SCALE / 2, from.col * SCALE + SCALE / 2);
  context.lineTo(to.row * SCALE + SCALE / 2, to.col * SCALE + SCALE / 2);
  context.strokeStyle = color;
  context.lineWidth = width;
  context.stroke();
};

function *search(grid, start, isEnd) {
  const toVisit = [start];
  const touched = [...Array(grid.length)].map(() => new Array(grid[0].length).fill(false));

  while (toVisit.length) {
    const next = toVisit.shift();
    yield next;

    if (isEnd(next)) {
      let reverse = next;
      while (reverse.prev) {
        reverse.done = true;
        yield reverse;
        reverse = reverse.prev;
      }
      return;
    }

    visit(grid, next, touched, toVisit);
  }
}

const View = ({ grid, start, end, isEnd }) => {
  const canvas = useRef();
  const width = grid.length;
  const height = grid[0].length;

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

    for (let row = 0; row < width; ++row) {
      for (let col = 0; col < height; ++col) {
        ctx.fillStyle = COLOURS[grid[row][col]];

        const x = row * SCALE;
        const y = col * SCALE;
        ctx.fillRect(x, y, SCALE, SCALE);
      }
    }

    if (start)
      circle(ctx, start.row, start.col, 3, null, START);
    if (end)
      circle(ctx, end.row, end.col, 3, START);
  }, [grid, start, end, width, height]);

  useGeneratorCallback(search, [grid, start, isEnd], 10, (pos) => {
    const { prev } = pos;
    if (!prev) return;

    const ctx = canvas.current.getContext('2d');
    line(ctx, prev, pos, pos.done ? START : '#937B63');
  });

  return <canvas ref={canvas} width={width * SCALE} height={height * SCALE} />
};

export default View;
