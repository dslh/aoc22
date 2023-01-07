import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DoubleSide } from 'three';

const Droplet = ({ droplet, position=[0,0,0], rotation=[0,0,0], color='#F18F01' }) => {
  const mesh = useRef(null);
  // useFrame((state, delta) => mesh.current.rotation.y += delta);

  const geometry = <planeGeometry args={[1,1]} />;

  return <group ref={mesh} position={position} rotation={rotation}>
    <line>
      {geometry}
      <lineBasicMaterial color={color} transparent={true} opacity={0.9} />
    </line>
    <mesh>
      {geometry}
      <meshStandardMaterial color={color} side={DoubleSide} transparent={true} opacity={0.4} />
    </mesh>
  </group>;
};

export default Droplet;
