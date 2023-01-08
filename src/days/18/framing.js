import { useMemo, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls, ScrollControls } from "@react-three/drei";

const Framing = ({ grid }) => {
  const { camera } = useThree();
  const target = useMemo(() => ([
    (grid.max.x + grid.min.x) / 2,
    (grid.max.y + grid.min.y) / 2,
    (grid.max.z + grid.min.z) / 2
  ]), [grid]);

  useEffect(() => {
    camera.position.x = grid.max.x * 1.5;
    camera.position.y = grid.max.y * 1.5;
    camera.position.z = grid.max.z * 1.5;
    camera.lookAt(target);
  }, [grid, target, camera]);

  return <>
    <OrbitControls target={target} />
    <ScrollControls />
    <pointLight color="white" position={[grid.max.x, grid.max.y, grid.max.z]} intensity={1} />
  </>;
};

export default Framing;
