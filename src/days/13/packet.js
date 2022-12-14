import styles from './packet.module.css';

const Card = ({ value }) => (
  <div className={`${styles.card} ${styles[`v${value}`]}`}>
    <div className={styles.inner} />
  </div>
);

const Subpacket = ({ packet }) => (
  <div className={styles.packet}>{
    packet.map((elem, i) => Array.isArray(elem) ?
      <Subpacket key={i} packet={elem} /> :
      <Card key={i} value={elem} />
    )
  }</div>
);

const Packet = ({ packet }) => (
  <div className={styles.outer}>
    <Subpacket packet={packet} />
  </div>
);

export default Packet;
