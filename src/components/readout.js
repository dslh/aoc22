import { useState, useEffect } from 'react';

const RATIO = 0.6;

const Readout = ({ value }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (display !== value) {
      const timeout = setTimeout(() => (
        setDisplay(display + Math.round((value - display) * RATIO))
      ), 50);

      return () => clearTimeout(timeout);
    }
  }, [display, value]);

  return <span>{display}</span>;
};

export default Readout;
