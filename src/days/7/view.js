import { useState, useEffect } from 'react';

import Stack from 'react-bootstrap/Stack';

import { exec, newdir } from './parser';

import Terminal from './terminal';
import Dir from './dir';

const View = ({ commands }) => {
  const [path, setPath] = useState(null);
  const callback = (command) => {
    exec(command, path);
    setPath([...path]);
  };
  useEffect(() => {
    setPath([newdir('/')]);
  }, [commands]);

  return <Stack direction="horizontal">
    <Terminal input={commands} key={commands} callback={callback} />
    <div className="browser">
      {path && <Dir dir={path[0]} />}
    </div>
  </Stack>;
};

export default View;
