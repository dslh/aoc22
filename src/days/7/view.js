import { useMemo, useState, useEffect } from 'react';

import Stack from 'react-bootstrap/Stack';

import useRedraw from 'lib/use-redraw';

import { exec, newdir } from './parser';

import Terminal from './terminal';
import Dir from './dir';

const rootOf = (cwd) => {
  while (cwd.parent) cwd = cwd.parent;
  return cwd;
}

const addFileSize = (cwd, command) => {
  // Depending on the fact that a file listing is the only command
  // that starts with a parseable integer.
  const fileSize = Number.parseInt(command);
  if (!fileSize) return;

  for (let dir = cwd; dir; dir = dir.parent) {
    dir.size ||= 0;
    dir.size += fileSize;
  }
}

const View = ({ commands }) => {
  const root = useMemo(() => newdir('/'), [commands]);
  const [cwd, setCwd] = useState(null);
  useEffect(() => { setCwd(root) }, [root]);

  const redraw = useRedraw();

  const callback = (command) => {
    const newWd = exec(command, cwd);
    // In case we've switched filesystems
    if (newWd && rootOf(newWd) === root)
      setCwd(newWd);

    addFileSize(cwd, command);

    redraw();
  };

  return <Stack direction="horizontal">
    <Terminal input={commands} key={commands} callback={callback} />
    <div className="browser">
      <Dir dir={root} cwd={cwd} />
    </div>
  </Stack>;
};

export default View;
