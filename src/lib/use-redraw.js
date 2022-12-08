import useIncrement from 'lib/use-increment';

const useRedraw = () => {
  const [, redraw] = useIncrement();
  return redraw;
}

export default useRedraw;
