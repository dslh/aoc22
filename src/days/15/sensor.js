import { useState, useEffect } from 'react';

import styles from './sensor.module.css';

import Readout from 'components/readout';

const PING_RADIUS = 1000;
const PING_TIME = 5000;

const Sensor = ({ sensor, scale, min, onFound }) => {
  const scanRadius = sensor.radius / Math.SQRT2 * scale;
  const { pos, beacon } = sensor;

  const [state, setState] = useState('seek');
  useEffect(() => {
    const distance = scale * Math.sqrt(
      (pos.x - beacon.x) ** 2 + (pos.y - beacon.y) ** 2
    );
    const time = Math.round(distance / PING_RADIUS * PING_TIME * 2);

    const timer = setTimeout(() => {
      setState('found');
      if (onFound) onFound();
    }, time);

    return () => clearTimeout(timer);
  }, []);

  const sensorStyle = [styles.sensor];
  const beaconStyle = [styles.beacon];
  if (state === 'seek') {
    sensorStyle.push(styles.seek);
    beaconStyle.push(styles.seek);
  }

  return <>
    <div className={sensorStyle.join(' ')}
        style={{
          top: (sensor.pos.y - min.y) * scale + 'px',
          left: (sensor.pos.x - min.x) * scale + 'px'
        }}> 
      <div className={styles.blip} />
      <div className={styles.ping} />
      <div className={styles.scan}
           style={{
             marginLeft: -scanRadius + 'px',
             marginTop: -scanRadius + 'px',
             width: scanRadius * 2 + 'px',
             height: scanRadius * 2 + 'px'
           }} />
      <div className={styles.readout}>
        x=<Readout value={sensor.pos.x} />, y=<Readout value={sensor.pos.y} />
      </div>
    </div>
    <div className={beaconStyle.join(' ')}
        style={{
          top: (sensor.beacon.y - min.y) * scale + 'px',
          left: (sensor.beacon.x - min.x) * scale + 'px'
        }}> 
      <div className={styles.blip} />
      {state === 'found' && <div className={styles.ping} />}
    </div>
  </>;
};

export default Sensor;
