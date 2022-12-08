// This is the data structure we use to build a directory tree.
// dirs is a map containing more of the same data structure.
// files is a map of files and their sizes.
export const newdir = (name, parent) => ({ name, parent, dirs: {}, files: {} });

// "commands" that the parser uses to build the directory tree:
// They take the current working directory as a first argument, and return
// the new current working directory, or nothing if the cwd did not change.
const cd = (cwd, { dir }) => cwd.dirs[dir];
const cdParent = (cwd) => cwd.parent;
const cdRoot = (cwd) => {
  while (cwd.parent) cwd = cwd.parent;
  return cwd;
}
const mkdir = (cwd, { name }) => { cwd.dirs[name] = newdir(name, cwd); };
const touch = (cwd, { name, size }) => { cwd.files[name] = Number.parseInt(size); };

// A list of patterns that will match lines from the input,
// along with the function that should run when each pattern is matched.
const COMMANDS = [
  { pattern: /^\$ cd \/$/,                         func: cdRoot },
  { pattern: /^\$ cd \.\.$/,                       func: cdParent },
  { pattern: /^\$ cd (?<dir>[a-z]+)$/,             func: cd },
  { pattern: /^dir (?<name>[a-z]+)$/,              func: mkdir },
  { pattern: /^(?<size>[0-9]+) (?<name>[a-z.]+)$/, func: touch },
  { pattern: /^\$ ls$/,                            func: () => {} } // no-op
];

// Execute a single command from the input.
export const exec = (cmd, cwd) => {
  let match;
  const { func } = COMMANDS.find(({ pattern }) => match = cmd.match(pattern));
  // Any named groups in the matched pattern get passed to the command as parameters.
  return func(cwd, match.groups);
}

const parser = (data) => {
  const cmds = data.split('\n');
  const root = newdir('/');

  // Execute all commands in the input, starting from the root.
  let cwd = root;
  cmds.forEach(cmd => cwd = exec(cmd, cwd) || cwd);

  return root;
};

export default parser;
