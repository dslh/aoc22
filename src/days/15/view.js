import { useEffect, useState, useMemo, useRef } from 'react';

import Stack from 'react-bootstrap/Stack';

import Readout from 'components/readout';

import styles from './sensor.module.css';
import Sensor from './sensor';
import Scanner from './scanner';

import { spaceCoords } from './part-two';

const WIDTH = 800;

const View = ({ sensors }) => {
  const [count, setCount] = useState(0);
  const timeout = useRef(null);
  const resetTimer = () => {
    clearTimeout(timeout.current);
    timeout.current = null;
  }
  const onFound = () => {
    console.log(2000 / (count / 5 + 1));
    timeout.current = setTimeout(() => setCount(count + 1), 2000 / (count / 5 + 1));
  }
  useEffect(() => {
    setCount(-1);
    setTimeout(() => setCount(0));
    resetTimer();
  }, [sensors]);

  const partTwo = useMemo(() => spaceCoords(sensors), [sensors]);
  const extents = useMemo(() => ({
    min: {
      x: Math.min(...sensors.map(({ pos, radius }) => pos.x - radius)),
      y: Math.min(...sensors.map(({ pos, radius }) => pos.y - radius))
    },
    max: {
      x: Math.max(...sensors.map(({ pos, radius }) => pos.x + radius)),
      y: Math.max(...sensors.map(({ pos, radius }) => pos.y + radius))
    }
  }), [sensors]);
  const width = extents.max.x - extents.min.x;
  const height = extents.max.y - extents.min.y;
  const scale = WIDTH / width;
  const adjustedHeight = Math.round(WIDTH / width * height);

  const sensorCount = Math.min(count + 1, sensors.length);
  return <Stack className="justify-content-md-center">
    <div>Part two: {partTwo.row + partTwo.col * 4_000_000}</div>
    <div className={styles.field} style={{ width: WIDTH + 'px', height: adjustedHeight + 'px' }}>
      {sensors.slice(0, sensorCount)
              .map((sensor, i) => (
                <Sensor key={i} sensor={sensor}
                        scale={scale} min={extents.min}
                        onFound={i === count && onFound} />
              ))}
      <Scanner partTwo={partTwo} topLeft={extents.min}
               scale={scale} dimension={sensors.length === 14 ? 20 : 4_000_000}
               showSpace={count === sensors.length} />
    </div>
  </Stack>;
};

export default View;
