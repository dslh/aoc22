import { useEffect, useMemo, useState } from 'react';

/**
 * Hook that starts a generator with the given arguments,
 * then calls .next() at regular intervals and returns the resulting state
 * as it changes, until the generator is done.
 *
 * If the given array of arguments changes, the generator will be restarted.
 */
const useTimedGenerator = (generator, args, initialState = null, interval = 100) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const iterator = useMemo(() => generator(...args), [generator, ...args]);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let timeoutId;
    const timeout = () => {
      const { value, done } = iterator.next();

      if (value !== undefined) setState(value);

      if (done) return;

      timeoutId = setTimeout(timeout, interval);
    };
    timeoutId = setTimeout(timeout, interval);

    return () => clearTimeout(timeoutId);
  }, [iterator, interval]);

  return state;
}

export default useTimedGenerator;
