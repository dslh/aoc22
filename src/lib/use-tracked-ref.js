import { useRef, useEffect } from 'react';

const useTrackedRef = (value) => {
  const ref = useRef(value);
  useEffect(() => { ref.current = value; }, [value]);
  return ref;
};

export default useTrackedRef;
