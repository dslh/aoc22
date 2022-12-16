import styles from './sensor.module.css';

import Readout from 'components/readout';

const Sensor = ({ sensor, scale, min }) => {
  const scanRadius = sensor.radius / Math.SQRT2 * scale;

  return <>
    <div className={styles.sensor}
        style={{
          top: (sensor.pos.y - min.y) * scale + 'px',
          left: (sensor.pos.x - min.x) * scale + 'px'
        }}> 
      <div className={styles.blip} />
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
    <div className={styles.beacon}
        style={{
          top: (sensor.beacon.y - min.y) * scale + 'px',
          left: (sensor.beacon.x - min.x) * scale + 'px'
        }}> 
      <div className={styles.blip} />
    </div>
  </>;
};

export default Sensor;
