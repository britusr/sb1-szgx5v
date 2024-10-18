import React from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

const Tree: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  let treeModel;
  try {
    treeModel = useGLTF('/models/tree.glb');
  } catch (error) {
    console.warn("Couldn't load tree model, using fallback");
  }

  return (
    <RigidBody type="fixed" position={position}>
      {treeModel ? (
        <primitive object={treeModel.scene} scale={[0.1, 0.1, 0.1]} />
      ) : (
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 4, 8]} />
          <meshStandardMaterial color="green" />
        </mesh>
      )}
      <CuboidCollider args={[0.5, 2, 0.5]} />
    </RigidBody>
  );
};

const Ground: React.FC = () => {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>
    </RigidBody>
  );
};

const Environment: React.FC = () => {
  return (
    <>
      <Ground />
      <Tree position={[5, 0, 5]} />
      <Tree position={[-5, 0, -5]} />
      <Tree position={[10, 0, -10]} />
      <Tree position={[-10, 0, 10]} />
    </>
  );
};

export default Environment;