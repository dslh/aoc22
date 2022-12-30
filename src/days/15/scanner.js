import styles from './scanner.module.css';

import Readout from 'components/readout';

const spaceStyle = (showSpace) => {
  const style = [styles.space];
  if (!showSpace) style.push(styles.hidden);
  return style.join(' ');
}

const Scanner = ({ partTwo, topLeft, scale, dimension, showSpace }) => <>
  <div className={styles.frame}
       style={{
         top: -topLeft.y * scale + 'px',
         left: -topLeft.x * scale + 'px',
         width: dimension * scale + 'px',
         height: dimension * scale + 'px'
       }} />
  <div className={styles.xBar}
       style={{
         top: ((showSpace ? partTwo.row : 0) - topLeft.y) * scale + 'px',
         left: -topLeft.x * scale + 'px',
         width: dimension * scale + 'px'
       }} />
  <div className={styles.yBar}
       style={{
         top: -topLeft.y * scale + 'px',
         left: ((showSpace ? partTwo.col : 0) - topLeft.x) * scale + 'px',
         height: dimension * scale + 'px'
       }} />
  <div className={spaceStyle(showSpace)}
       style={{
         top: ((showSpace ? partTwo.row : 0) - topLeft.y) * scale + 'px',
         left: ((showSpace ? partTwo.col : 0) - topLeft.x) * scale + 'px',
       }}>
    <div className={styles.blip} />
    <div className={styles.readout}>
      x=<Readout value={partTwo.row} />, y=<Readout value={partTwo.col} />
    </div>
  </div>
</>;

export default Scanner;
