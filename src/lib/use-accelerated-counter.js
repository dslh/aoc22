import { useEffect, useState } from 'react';

const useAcceleratedCounter = (limit, interval, ratio, min = 0) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0);
    let nextInterval = interval;
    let id;

    const timeout = () => {
      setValue(v => {
        if (v + 2 < limit) {
          if (nextInterval > min)
            nextInterval *= ratio;
          else
            nextInterval = min;
          id = setTimeout(timeout, Math.round(nextInterval));
        }

        return v + 1;
      });
    };
    id = setTimeout(timeout, interval);

    return () => clearTimeout(id);
  }, [interval, ratio, limit, min]);

  return value;
};

export default useAcceleratedCounter;
