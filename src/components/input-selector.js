import Button from 'react-bootstrap/Button';

const InputSelector = ({ source, setSource, value, children }) => (
  <Button variant={source === value ? 'primary' : 'outline-primary'}
          onClick={() => setSource(value)}>
    {children}
  </Button>
);

export default InputSelector
