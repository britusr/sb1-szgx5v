import React from 'react';
import { Plane } from '@react-three/drei';

const Ground: React.FC = () => {
  return (
    <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <meshStandardMaterial color="#4CAF50" />
    </Plane>
  );
};

export default Ground;