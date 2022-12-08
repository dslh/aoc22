import { useEffect, useRef } from 'react';

import Readout from 'components/readout';

const selected = (dir, cwd) => {
  while (cwd) {
    if (dir === cwd) return true;
    cwd = cwd.parent;
  }
};

const Dir = ({ dir, cwd }) => {
  const { name, dirs, files, size } = dir;

  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && dir === cwd)
      ref.current.scrollIntoViewIfNeeded();
  }, [dir, cwd]);

  return <div ref={ref} className={`dir ${selected(dir, cwd) ? 'selected' : ''}`}>
    <div className="dirName">{name}{size && <Readout value={size} />}</div>
    <div className="dirContents">
      {Object.values(dirs).map((subdir, i) => <Dir key={i} dir={subdir} cwd={cwd} />)}
      {Object.entries(files).map(([name, size], i) =>
        <div className="file" key={i}>{name} <Readout value={size} /></div>
      )}
    </div>
  </div>;
};

export default Dir;
