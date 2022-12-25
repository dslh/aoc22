const mod = (n, m) => ((n % m) + m) % m;

const RightBliz = (x, y, width) => (
  (step) => ({ x: mod(x + step, width), y })
);
const LeftBliz = (x, y, width) => (
  (step) => ({ x: mod(x - step, width), y })
);

const DownBliz = (x, y, height) =>  (
  (step) => ({ x, y: mod(y + step, height) })
);
const UpBliz = (x, y, height) => (
  (step) => ({ x, y: mod(y - step, height) })
);

const parseBlizzards = (lines, width, height) => {
  const blizzards = [];

  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      switch (lines[y + 1].charAt(x + 1)) {
        case '<':
          blizzards.push(LeftBliz(x, y, width));
          break;
        case '>':
          blizzards.push(RightBliz(x, y, width));
          break;
        case '^':
          blizzards.push(UpBliz(x, y, height));
          break;
        case 'v':
          blizzards.push(DownBliz(x, y, height));
          break;
      }
    }
  }

  return blizzards;
}

const parser = (input) => {
  const lines = input.split('\n');
  const height = lines.length - 2;
  const width = lines[0].length - 2;
  const start = lines[0].indexOf('.') - 1;
  const finish = lines[lines.length - 1].indexOf('.') - 1;

  const blizzards = parseBlizzards(lines, width, height);

  return { width, height, start, finish, blizzards };
};

export default parser;
