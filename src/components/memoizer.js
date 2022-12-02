import { useMemo } from 'react';

const Memoizer = ({ title, data, func }) => {
  const result = useMemo(() => func(data), [data]);

  return <div>{title}: {result}</div>;
}

export default Memoizer;
