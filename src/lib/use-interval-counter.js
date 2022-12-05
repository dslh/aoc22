import { useEffect, useState } from 'react';

const useIntervalCounter = (limit, interval) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0);
    const timer = setInterval(() => setValue(v => {
      if (v + 2 >= limit)
        clearInterval(timer);

      return v + 1;
    }), interval);

    return () => clearInterval(timer);
  }, [limit, interval]);

  return value;
};

export default useIntervalCounter;
