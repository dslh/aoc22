import { useLayoutEffect, useRef, useEffect, useMemo } from 'react';

const useGeneratorCallback = (generator, args, interval, callback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const iterator = useMemo(() => generator(...args), [generator, ...args]);

  const savedCallback = useRef(callback);
  useLayoutEffect(() => { savedCallback.current = callback; }, [callback]);

  useEffect(() => {
    let timeoutId;
    const timeout = () => {
      const { value, done } = iterator.next();

      if (!(value === undefined && done)) savedCallback.current(value);

      if (done) return;

      timeoutId = setTimeout(timeout, interval);
    };
    timeoutId = setTimeout(timeout, interval);
  
    return () => clearTimeout(timeoutId);
  }, [iterator, interval]);
};

export default useGeneratorCallback;
