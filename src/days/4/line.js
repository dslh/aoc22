import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import useTrigger from 'lib/use-trigger';

import './style.css';

import { contains } from './part-one';
import { overlapping } from './part-two';

const style = ([l, r]) => {
  const width = r - l + 1;
  const half = Math.round(width / 2);
  return { left: `${l + half}%`, marginLeft: `-${half}%`, width: `${r - l + 1}%` }
};

const Line = ({ pair, incrementContains, incrementOverlaps }) => {
  const [a, b] = pair;

  const loaded = useTrigger(50);

  const aStyle = style(a);
  const bStyle = style(b);

  if (!loaded) {
    aStyle.width = bStyle.width = '1px';
    aStyle.marginLeft = bStyle.marginLeft = '0px';
  }

  const aContains = contains(a, b);
  const bContains = contains(b, a);
  const containment = aContains || bContains;
  const overlaps = overlapping(pair);

  const completed = useTrigger(1100, () => {
    if (containment) incrementContains();
    if (overlaps) incrementOverlaps();
  });

  let aClass = 'a';
  let bClass = 'b';
  const resultClass = completed ? '' : 'hidden';
  if (completed) {
    if (aContains) {
      aClass = aClass.concat(' contains');
      bClass = bClass.concat(' contained');
    } else if (bContains) {
      aClass = aClass.concat(' contained');
      bClass = bClass.concat(' contains');
    } else if (overlaps) {
      aClass = aClass.concat(' overlaps');
      bClass = bClass.concat(' overlaps');
    }
  }

  return <Container className="dayFour">
    <Row className="justify-content-md-center">
      <Col md="1" className={`containments ${resultClass}`}>
        {containment ? '🟢' : '🔴'}
      </Col>
      <Col md="9" className="bar">
        <div className={aClass} style={aStyle} />
        <div className={bClass} style={bStyle} />
      </Col>
      <Col md="1" className={`overlaps ${resultClass}`}>
        {overlaps ? '🟢' : '🔴'}
      </Col>
    </Row>
  </Container>;
};
      
export default Line;
