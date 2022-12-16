import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-spinners/GridLoader';

const InputDisplay = ({ data, loading, error }) => {
  if (error)
    return <h2><Badge bg="danger">Couldn't load data</Badge></h2>;

  if (loading)
    return <Spinner color="rgb(13, 202, 240)" />;

  return <pre className="bg-light border input">{data}</pre>;
};

export default InputDisplay;
