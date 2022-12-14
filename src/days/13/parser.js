// Yes, it could be replaced by eval(line)
const parsePacket = (line, pos = { i: 0 }) => {
  const packet = [];

  let chr;
  const intRe = /\d+/y;
  let intMatch;

  while ((chr = line.charAt(++pos.i)) !== ']') {
    intRe.lastIndex = pos.i;
    if ((intMatch = intRe.exec(line)) !== null) {
      packet.push(Number.parseInt(intMatch[0]));
      pos.i += intMatch[0].length - 1;
    } else if (chr === '[') {
      packet.push(parsePacket(line, pos));
    }
  }

  return packet;
};

const parser = (input) => (
  input.split('\n\n').map(pair => pair.split('\n').map(line => parsePacket(line)))
);

export default parser;
