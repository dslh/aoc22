export function *adjacency({ x, y, z }) {
  yield { x, y, z: z - 1 };
  yield { x, y, z: z + 1 };

  yield { x, y: y - 1, z };
  yield { x, y: y + 1, z };

  yield { x: x - 1, y, z };
  yield { x: x + 1, y, z };
}

const partOne = droplet => {
  let faces = 0;

  droplet.forEach(cube => {
    for (const neighbour of adjacency(cube))
      if (!droplet.get(neighbour))
        faces++;
  });

  return faces;
};

export default partOne;
