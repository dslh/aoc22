import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';

const InputDisplay = ({ data, loading, error }) => {
  if (error)
    return <h2><Badge bg="danger">Couldn't load data</Badge></h2>;

  if (loading)
    return <Spinner animation="border" variant="info" />;

  return <pre className="bg-light border input">{data}</pre>;
};

export default InputDisplay;
