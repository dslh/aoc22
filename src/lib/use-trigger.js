import { useState, useEffect } from 'react';

const useTrigger = (after, callback) => {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFlag(true);
      if (callback) callback();
    }, after);
    return () => clearTimeout(timeout);
  }, [after, callback]);

  return flag;
};

export default useTrigger;
