import { useState, useMemo } from 'react';
import useFetch from 'use-http';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import InputDisplay from 'components/input-display';
import InputSelector from 'components/input-selector';

import input from '../input/1.txt';
import sample from '../input/1.sample.txt';

import partOne from './1/part-one';
import partTwo from './1/part-two';

const PartOne = ({ data }) => {
  const max = useMemo(() => partOne(data), [data]);

  return <div>Part 1: {max}</div>;
};

const PartTwo = ({ data }) => {
  const total = useMemo(() => partTwo(data), [data]);

  return <div>Part 2: {total}</div>;
};

const One = () => {
  const [source, setSource] = useState(sample);
  const request = useFetch(source, [source]);

  const data  = useMemo(() => {
    if (!request.data) return;

    return request.data.split('\n\n').map(elf =>
      elf.split('\n').map(meal => Number.parseInt(meal))
    );
  }, [request.data]);

  return <Stack gap={3}>
    <Stack gap={3} direction="horizontal" className="mx-auto">
      <InputSelector value={sample} {...{source, setSource}}>Use sample</InputSelector>
      <InputSelector value={input} {...{source, setSource}}>Use challenge</InputSelector>
    </Stack>
    <Container>
      <Row>
        <Col md="9">
          {data && <Stack gap={3}>
            <pre>{JSON.stringify(data)}</pre>
            <PartOne data={data} />
            <PartTwo data={data} />
          </Stack>}
        </Col>
        <Col md="3">
          <InputDisplay {...request} />
        </Col>
      </Row>
    </Container>
  </Stack>;
};

export default One;
