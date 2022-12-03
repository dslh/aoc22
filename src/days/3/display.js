import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

import { halve, valueOf, commonItem } from './part-one';

const PART_ONE_CLASS = 'primary';
const PART_TWO_CLASS = 'danger';
const BOTH_CLASS = 'success';
const NEITHER_CLASS = 'dark';

const Spacer = ({ width, half }) => {
  console.log(width, half.length, half);
  return [...Array(width - half.length)].map((_, i) =>
    <Badge key={i} pill bg={NEITHER_CLASS}>&nbsp;</Badge>
  )
};

const className = (item, partOneItem, partTwoItem) => (
  item === partOneItem ?
    (item === partTwoItem ? BOTH_CLASS : PART_ONE_CLASS) :
    (item === partTwoItem ? PART_TWO_CLASS : NEITHER_CLASS)
);

const Item = ({ item, partOneItem, partTwoItem }) => (
  <Badge pill bg={className(item, partOneItem, partTwoItem)}>{item}</Badge>
);

const Half = ({ width, half, partOneItem, partTwoItem, left }) => (
  <Stack direction="horizontal">
    {left && <Spacer width={width} half={half} />}

    {half.split('').map((item, i) =>
      <Item {...{item, partOneItem, partTwoItem}} key={i} />
    )}

    {!left && <Spacer width={width} half={half} />}
  </Stack>
);

const Line = ({ width, halved, partOneItem, partTwoItem }) => (
  <Stack gap={2} direction="horizontal">
    <Half half={halved[0]} {...{width, partOneItem, partTwoItem}} left />
    <Half half={halved[1]} {...{width, partOneItem, partTwoItem}} />
  </Stack>
);

const Display = ({ slice, width }) => {
  const halves = slice.map(halve);
  const partOneItems = halves.map(commonItem);
  const partTwoItem = commonItem(slice);

  return <small><code>
    <Container>
      {halves.map((line, i) =>
        <Row key={i} className="justify-content-md-center">
          <Col md="auto">
            <Line halved={line} partOneItem={partOneItems[i]} {...{width, partTwoItem}} />
          </Col>
          <Col md="2">
            <Badge bg={PART_ONE_CLASS}>{partOneItems[i]} = {valueOf(partOneItems[i])}</Badge>
          </Col>
        </Row>
      )}
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Badge bg={PART_TWO_CLASS}>{partTwoItem} = {valueOf(partTwoItem)}</Badge>
        </Col>
        <Col md="2">&nbsp;</Col>
      </Row>
    </Container>
  </code></small>;
};

export default Display;
