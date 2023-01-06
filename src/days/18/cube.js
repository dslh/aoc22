import Face from './face';

const toArgs = ({ x, y, z }) => ([x, y, z]);

const Cube = ({ position, faces }) => (
  Object.entries(faces).map(([side, color]) => {
    return <Face key={side} position={toArgs(position)} side={side} color={color} />
  })
);

export default Cube;
