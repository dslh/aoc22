import useIncrement from 'lib/use-increment';

const useRedraw = () => {
  const [_, redraw] = useIncrement();
  return redraw;
}

export default useRedraw;
