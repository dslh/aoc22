import { useMemo } from 'react';

import useIncrement from 'lib/use-increment';

import Writer from 'components/writer';

const Terminal = ({ input, height = 20, callback }) => {
  const commands = useMemo(() => input.split('\n'), [input]);
  const [position, nextPosition] = useIncrement(0);
  const onCommand = () => {
    if (callback)
      callback(commands[position]);
    nextPosition();
  };

  const done = position === commands.length;
  const history = (length) => commands.slice(Math.max(0, position - length), position);

  const current = commands[position];
  const isPrompt = current && current.startsWith('$');
  const onWrite = isPrompt ? () => setTimeout(onCommand, 500) : onCommand;

  return <div className="terminal">
    {history(done ? height : height - 1).map((line, i) => <div key={i}>{line}</div>)}
    {current && <Writer className="writer"
                        key={position}
                        line={current}
                        cursor={isPrompt}
                        delay={isPrompt ? 100 : 10}
                        callback={onWrite} />}
  </div>
};

export default Terminal;
