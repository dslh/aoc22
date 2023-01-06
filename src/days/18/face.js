import { DoubleSide } from 'three';

const OFFSETS = {
  front: [   0,    0,  0.5],
  back:  [   0,    0, -0.5],
  up:    [   0,  0.5,    0],
  down:  [   0, -0.5,    0],
  right: [ 0.5,    0,    0],
  left:  [-0.5,    0,    0]
};

const offset = (position, side) => (
  OFFSETS[side].map((delta, i) => delta + position[i])
);

const XC = Math.PI / 2;
const ROTATION = {
  up:    [XC,  0, 0],
  down:  [XC,  0, 0],
  left:  [ 0, XC, 0],
  right: [ 0, XC, 0],
  front: [ 0,  0, 0],
  back:  [ 0,  0, 0]
};

const GEOMETRY = <planeGeometry args={[1, 1]} />;
const CORNERS = new Float32Array([
   0.5,  0.5, 0,
   0.5, -0.5, 0,
  -0.5, -0.5, 0,
  -0.5,  0.5, 0,
   0.5,  0.5, 0
]);
const OUTLINE = <bufferGeometry>
  <bufferAttribute attach="attributes-position"
                   array={CORNERS}
                   count={CORNERS.length / 3}
                   itemSize={3} />
</bufferGeometry>;

const LINE_MATERIALS = {
  hot: <lineBasicMaterial color="#F18F01" transparent={true} opacity={0.9} />,
  cold: <lineBasicMaterial color="#2F2D2E" transparent={true} opacity={0.9} />,
  water: <lineBasicMaterial color="#048BA8" transparent={true} opacity={0.9} />
};

const MESH_MATERIALS = {
  hot: <meshStandardMaterial color="#F18F01" side={DoubleSide} transparent={true} opacity={0.2} />,
  cold: <meshStandardMaterial color="#2F2D2E" side={DoubleSide} transparent={true} opacity={0.4} />,
  water: <meshStandardMaterial color="#048BA8" side={DoubleSide} transparent={true} opacity={0.4} />
};

const Face = ({ position, side, color = 'hot' }) => (
  <group position={offset(position, side)} rotation={ROTATION[side]}>
  {/*<line>
      {OUTLINE}
      {LINE_MATERIALS[color]}
    </line>*/}
    <mesh>
      {GEOMETRY}
      {MESH_MATERIALS[color]}
    </mesh>
  </group>
);

export default Face;
