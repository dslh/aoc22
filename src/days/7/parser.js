// This is the data structure we use to build a directory tree.
// dirs is a map containing more of the same data structure.
// files is a map of files and their sizes.
export const newdir = (name) => ({ name, dirs: {}, files: {} });

// "Current working directory"
// The parser works with a path structure that is a list of directories.
// The first item in the list is the root, the last item in the list is the current dir
const cwd = (path) => path[path.length - 1];

// "commands" that the parser uses to build the directory tree:

// Navigate from the current directory to one of its subdirectories,
// by adding it to the end of the path list.
const cd = (path, { dir }) => path.push(cwd(path).dirs[dir]);
// Navigate up one level, removing the current directory from the path.
const cdParent = (path) => path.pop();
// Navigate to the root directory, by removing all other directories from the path
const cdRoot = (path) => { while (path.length > 1) path.pop(); };
// Add a new subdirectory to the current working directory
const mkdir = (path, { name }) => cwd(path).dirs[name] = newdir(name);
// Add a new file to the current working directory
const touch = (path, { name, size }) => cwd(path).files[name] = Number.parseInt(size);

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
export const exec = (cmd, path) => {
  let match;
  const { func } = COMMANDS.find(({ pattern }) => match = cmd.match(pattern));
  // Any named groups in the matched pattern get passed to the command as parameters.
  func(path, match.groups);
}

const parser = (data) => {
  const cmds = data.split('\n');
  const root = newdir('/');

  // Execute all commands in the input, starting from the root.
  const path = [root];
  cmds.forEach(cmd => exec(cmd, path));

  return root;
};

export default parser;
