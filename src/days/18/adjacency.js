function *adjacency({ x, y, z }) {
  yield { x, y, z: z + 1, side: 'front' };
  yield { x, y, z: z - 1, side: 'back' };

  yield { x, y: y + 1, z, side: 'up' };
  yield { x, y: y - 1, z, side: 'down' };

  yield { x: x + 1, y, z, side: 'right' };
  yield { x: x - 1, y, z, side: 'left' };
}

export const INVERSE_SIDE = {
  front: 'back',
  back:  'front',
  up:    'down',
  down:  'up',
  right: 'left',
  left:  'right'
};

export default adjacency;
