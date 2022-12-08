import { useMemo, useEffect } from 'react';

import useIntervalCounter from 'lib/use-interval-counter';

const Writer = ({ line, delay = 50, cursor = false, callback, ...props }) => {
  const i = useIntervalCounter(line.length, delay);
  const chars = useMemo(() => line.split(''), [line]);

  useEffect(() => {
    if (callback && i === line.length - 1) callback();
  }, [i, callback, line]);

  return <div {...props}>
    {chars.slice(0, i + 1).map((chr, j) => <span key={j} className="char">{chr}</span>)}
    {cursor && <span className="cursor">_</span>}
  </div>;
};

export default Writer;
