import { useMemo } from 'react';

import Stack from 'react-bootstrap/Stack';

import Readout from 'components/readout';

import styles from './sensor.module.css';
import Sensor from './sensor';

import { spaceCoords } from './part-two';

const WIDTH = 800;

const View = ({ sensors }) => {
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

  const frameDim = sensors.length === 14 ? 20 : 4_000_000;

  return <Stack className="justify-content-md-center">
    <div>Part two: {partTwo.row + partTwo.col * 4_000_000}</div>
    <div className={styles.field} style={{ width: WIDTH + 'px', height: adjustedHeight + 'px' }}>
      {sensors.map((sensor, i) => <Sensor key={i} sensor={sensor} scale={scale} min={extents.min} />)}
      <div className={styles.space}
           style={{
             top: (partTwo.row - extents.min.y) * scale + 'px',
             left: (partTwo.col - extents.min.x) * scale + 'px'
           }}>
        <div className={styles.blip} />
        <div className={styles.readout}>
          x=<Readout value={partTwo.row} />, y=<Readout value={partTwo.col} />
        </div>
      </div>
      <div className={styles.frame}
           style={{
             top: -extents.min.y * scale + 'px',
             left: -extents.min.x * scale + 'px',
             width: frameDim * scale + 'px',
             height: frameDim * scale + 'px'
           }} />
    </div>
  </Stack>;
};

export default View;
