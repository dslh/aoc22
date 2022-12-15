import { useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import dayTitle from 'lib/day-title';

const SUFFIX = new RegExp('[^/]+$');

const Days = () => {
  const { pathname } = useLocation();
  const day = pathname.match(SUFFIX)[0];
  const buttons = useRef(null);

  return <>
    <Container>
      <Row>
        <Col md="8">
          <h1>Day {day} – {dayTitle(day)}</h1>
        </Col>
        <Col md="4">
          <Stack direction="horizontal" gap={2} ref={buttons} style={{marginTop: '4px'}} />
        </Col>
      </Row>
    </Container>
    <Outlet context={[buttons]} />
  </>;
}

export default Days;
