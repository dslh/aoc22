import { useState } from 'react';
import useFetch from 'use-http';

import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

import input from '../input/0.txt';
import sample from '../input/0.sample.txt';

const DisplayInput = ({ data, loading, error }) => {
  if (error)
    return <h2><Badge bg="danger">Couldn't load data</Badge></h2>;

  if (loading)
    return <Spinner animation="border" variant="info" />;

  return <pre className="bg-light border input">{data}</pre>;
};

const InputSelector = ({ source, setSource, value, children }) => (
  <Button variant={source === value ? 'primary' : 'outline-primary'}
          onClick={() => setSource(value)}>
    {children}
  </Button>
);

const Zero = () => {
  const [source, setSource] = useState(sample);
  const request = useFetch(source, [source]);

  return <Stack gap={3}>
    <Stack gap={3} direction="horizontal">
      <InputSelector value={sample} {...{source, setSource}}>Use sample</InputSelector>
      <InputSelector value={input} {...{source, setSource}}>Use challenge</InputSelector>
    </Stack>
    <DisplayInput {...request} />
  </Stack>;
};

export default Zero;
