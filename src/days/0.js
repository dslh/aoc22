import { useState } from 'react';
import useFetch from 'use-http';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import InputDisplay from 'components/input-display';
import InputSelector from 'components/input-selector';

import input from '../input/0.txt';
import sample from '../input/0.sample.txt';

const Zero = () => {
  const [source, setSource] = useState(sample);
  const request = useFetch(source, [source]);

  return <Stack gap={3}>
    <Stack gap={3} direction="horizontal" className="mx-auto">
      <InputSelector value={sample} {...{source, setSource}}>Use sample</InputSelector>
      <InputSelector value={input} {...{source, setSource}}>Use challenge</InputSelector>
    </Stack>
    <Container>
      <Row>
        <Col>
          <Button variant="primary">Run</Button>
        </Col>
        <Col md="3">
          <InputDisplay {...request} />
        </Col>
      </Row>
    </Container>
  </Stack>;
};

export default Zero;
