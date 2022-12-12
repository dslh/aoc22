import { useEffect, useMemo } from 'react';

const useGeneratorCallback = (generator, args, interval, callback) => {
  const iterator = useMemo(() => generator(...args), [generator, ...args]);

  useEffect(() => {
    let timeoutId;
    const timeout = () => {
      const { value, done } = iterator.next();

      if (value !== undefined) callback(value);

      if (done) return;

      timeoutId = setTimeout(timeout, interval);
    };
    timeoutId = setTimeout(timeout, interval);
  
    return () => clearTimeout(timeoutId);
  }, [iterator, interval]);
};

export default useGeneratorCallback;
