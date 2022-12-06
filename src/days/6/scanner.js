import { useRef, useMemo, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { findUniqueSubstr } from './part-one';

import useAcceleratedCounter from 'lib/use-accelerated-counter';

const duplicateChars = (str) => {
  const seen = new Set();
  const dups = new Set();
  for (let i = 0; i < str.length; ++i) {
    const chr = str.charAt(i);
    if (seen.has(chr)) dups.add(chr);
    seen.add(chr);
  }

  return dups;
};

const Scanner = ({ data, size }) => {
  const list = useMemo(() => data.split(''), [data]);
  const end = useMemo(() => findUniqueSubstr(data, size), [data, size]);

  const container = useRef(null);

  const pos = useAcceleratedCounter(end + 1, 1000, 0.95, 50);
  useEffect(() => {
    if (container.current)
      container.current.scrollTo({ top: 0, left: 16 * pos, behavior: 'smooth' });
  }, [pos]);

  const dups = duplicateChars(data.slice(pos, pos + size));
  const charStyle = pos === end ?
    (chr, i) => ((i >= pos && i < (pos + size)) ? 'good' : '') :
    (chr, i) => ((i >= pos && i < (pos + size) && dups.has(chr)) ? 'bad' : '');

  const width = `${size * 16 + 3}px`;
  return <Container>
    <Row>
      <Col md="12" className="scannerContainer">
        <div className="window" style={{ width }} />
        <div className="scanner" ref={container}>
          {list.map((chr, i) => 
            <span key={i} className={charStyle(chr, i)}>{chr}</span>
          )}
          <div className="deadspace" />
        </div>
      </Col>
    </Row>
    <Row>
      <Col md="12">
        <div className="counter" style={{ width }}>
          {pos + size}
        </div>
      </Col>
    </Row>
  </Container>;
};

export default Scanner;
