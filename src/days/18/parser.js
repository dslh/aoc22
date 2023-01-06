const parser = (data) => (
  data.split('\n').map(line => {
    const [x, y, z] = line.split(',').map(i => Number.parseInt(i));
    return { x, y, z };
  })
);

export default parser;
