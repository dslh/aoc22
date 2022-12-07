const newdir = (name) => ({ name, dirs: {}, files: {} });

const cwd = (path) => path[path.length - 1];

const cd = (path, { dir }) => path.push(cwd(path).dirs[dir]);
const cdParent = (path) => path.pop();
const cdRoot = (path) => { while (path.length > 1) path.pop(); };
const mkdir = (path, { name }) => cwd(path).dirs[name] = newdir(name);
const touch = (path, { name, size }) => cwd(path).files[name] = Number.parseInt(size);

const COMMANDS = [
  { pattern: /^\$ cd \/$/,                         func: cdRoot },
  { pattern: /^\$ cd \.\.$/,                       func: cdParent },
  { pattern: /^\$ cd (?<dir>[a-z]+)$/,             func: cd },
  { pattern: /^dir (?<name>[a-z]+)$/,              func: mkdir },
  { pattern: /^(?<size>[0-9]+) (?<name>[a-z.]+)$/, func: touch },
  { pattern: /^\$ ls$/,                            func: () => {} }
];

const exec = (cmd, path) => {
  let match;
  const { func } = COMMANDS.find(({ pattern }) => match = cmd.match(pattern));
  func(path, match.groups);
}

const parser = (data) => {
  const cmds = data.split('\n');
  const root = newdir('/');

  const path = [root];
  cmds.forEach(cmd => exec(cmd, path));

  return root;
};

export default parser;
