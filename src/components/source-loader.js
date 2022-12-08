import { useState, useMemo } from 'react';
import useFetch from 'use-http';

import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import InputDisplay from 'components/input-display';
import InputSelector from 'components/input-selector';

const SourceLoader = ({ input, sample, parser, children }) => {
  const [source, setSource] = useState(sample);
  const request = useFetch(source, [source]);

  const data = useMemo(() => (request.data && parser(request.data)), [request.data, parser]);

  return <Stack gap={3}>
    <Stack gap={3} direction="horizontal" className="mx-auto">
      <InputSelector value={sample} {...{source, setSource}}>Use sample</InputSelector>
      <InputSelector value={input} {...{source, setSource}}>Use challenge</InputSelector>
    </Stack>
    <Container>
      <Row>
        <Col md="9">
          {data && children(data, request.data)}
        </Col>
        <Col md="3">
          <InputDisplay {...request} />
        </Col>
      </Row>
    </Container>
  </Stack>;
};

export default SourceLoader;
