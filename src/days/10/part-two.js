import { useRef, useLayoutEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import Writer from 'components/writer';
import Readout from 'components/readout';

import useTimedGenerator from 'lib/use-timed-generator';

import { runProgram, keyCycle } from './part-one';

import './style.css';

const WIDTH = 40;

const PartTwo = ({ instructions }) => {
  const { current: display } = useRef([]);
  const { current: signals } = useRef([]);
  const { current: history } = useRef([]);

  const cursor = useRef(null);

  useLayoutEffect(() => {
    display.length = 0;
    signals.length = 0;
    history.length = 0;
    cursor.current.style.top = 0;
    cursor.current.style.left = 0;
  }, [instructions, display, signals, history]);

  const { cycle, x, instruction } = useTimedGenerator(runProgram, [instructions], {}, 100);

  useLayoutEffect(() => {
    if (!cycle) return;

    if (keyCycle(cycle))
      signals.push(cycle * x);

    if (cycle % WIDTH === 1) {
      display.push([]);
      cursor.current.style.top = (display.length - 1) * 36 + 'px';
    }

    if (x !== undefined)
      cursor.current.style.left = (x - 1) * 12 + 'px';

    const row = display[display.length - 1];
    row.push(Math.abs(row.length  -  x) <= 1);

    if (instruction) {
      history.push({ instruction, cycle });
      if (history.length > 10)
        history.shift();
    }
  }, [cycle, x, instruction, display, signals, history]);

  return <Container className="dayTen">
    <Row>
      <Col md="2" className="history">
        <Stack>
          {history.map(({ instruction, cycle }) =>
            <Writer key={cycle} line={instruction} delay={40} />
          )}
        </Stack>
      </Col>
      <Col md="8" className="display">
        <Stack>
          <div className="cursor" ref={cursor} />
          {display.map((row, i) =>
            <div key={i}>
              {row.map((pixel, j) =>
                <span key={j} className={j === 19 ? 'signal' : undefined}>{pixel ? '#' : '.'}</span>
              )}
            </div>
          )}
        </Stack>
      </Col>
      <Col md="2" className="signals">
        <Stack>
          {signals.map((signal, i) => <Readout key={i} value={signal} />)}
        </Stack>
      </Col>
    </Row>
  </Container>;
};

export default PartTwo;
