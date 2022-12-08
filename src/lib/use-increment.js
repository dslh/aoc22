import { useState } from 'react';

const useIncrement = (initial = 0) => {
  const [value, setValue] = useState(initial);
  return [value, () => setValue(v => v + 1)];
};

export default useIncrement;
