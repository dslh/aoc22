import { createPortal } from 'react-dom';
import { useOutletContext } from 'react-router-dom';

const ButtonContainer = ({ children }) => {
  const [buttonContainer] = useOutletContext();

  const containerElem = buttonContainer && buttonContainer.current;

  if (containerElem)
    return createPortal(children, containerElem);
};

export default ButtonContainer;
