const MOVE = /((?<move>\d+)|(?<turn>[LR]))/g

const parseMoves = (moves) => [...moves.matchAll(MOVE)].map(match => {
  const { move, turn } = match.groups;

  if (turn) return { turn };

  return { move: Number.parseInt(move) };
});

const parseMap = (input) => {
  const lines = input.split('\n');
  const width = Math.max(...lines.map(row => row.length));

  const yWrap = new Array(width).fill(-1);

  const rows = [];
  rows[-1] = [];
  const wrapY = (x, y) => {
    if (yWrap[x] !== y - 1) {
      (rows[yWrap[x]][x] ||= {}).y = y - 1;
      (rows[y][x] ||= {}).y = yWrap[x] + 1;
    }

    yWrap[x] = y;
  };

  lines.forEach((str, y) => {
    const row = [];
    rows.push(row);

    let xWrap = -1;
    const wrapX = (x) => {
      if (xWrap !== x - 1) {
        (row[xWrap] ||= {}).x = x - 1;
        (row[x] ||= {}).x = xWrap + 1;
      }

      xWrap = x;
    }

    for (let x = 0; x < str.length; ++x) {
      const chr = str.charAt(x);
      if (chr === ' ') {
        wrapX(x);
        wrapY(x, y);
      } else {
        row[x] = chr;
      }
    }

    wrapX(str.length);

    for (let x = str.length; x < width; ++x) {
      wrapY(x, y);
    }

    return row;
  });

  rows.push([]);
  const y = lines.length;
  for (let x = 0; x < width; ++x)
    wrapY(x, y);

  return rows;
};

const parser = (data) => {
  const [map, moves] = data.split('\n\n');

  return { map: parseMap(map), moves: parseMoves(moves) };
}

export default parser;
