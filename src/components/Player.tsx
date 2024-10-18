import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import * as THREE from 'three';

interface PlayerProps {
  position: [number, number, number];
  color: string;
  gender: string;
  isCurrentPlayer: boolean;
  onMove: (position: [number, number, number]) => void;
}

const Player: React.FC<PlayerProps> = ({ position, color, gender, isCurrentPlayer, onMove }) => {
  const group = useRef<THREE.Group>();
  let playerModel;
  try {
    playerModel = useGLTF(gender === 'male' ? '/models/male.glb' : '/models/female.glb');
  } catch (error) {
    console.warn(`Couldn't load ${gender} model, using fallback`);
  }
  const { actions } = useAnimations(playerModel?.animations || [], group);
  const rigidBody = useRef<any>();
  const movementRef = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (group.current) {
      group.current.position.set(...position);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
        movementRef.current[e.code] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
        movementRef.current[e.code] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [position]);

  useEffect(() => {
    if (actions?.walk) {
      actions.walk.play();
    }
  }, [actions]);

  useFrame((_, delta) => {
    if (isCurrentPlayer && rigidBody.current) {
      const moveSpeed = 5 * delta;
      const movement = new THREE.Vector3();

      if (movementRef.current['KeyW']) movement.z -= moveSpeed;
      if (movementRef.current['KeyS']) movement.z += moveSpeed;
      if (movementRef.current['KeyA']) movement.x -= moveSpeed;
      if (movementRef.current['KeyD']) movement.x += moveSpeed;

      if (movement.length() > 0) {
        movement.normalize().multiplyScalar(moveSpeed);
        rigidBody.current.setLinvel({ x: movement.x, y: 0, z: movement.z });
        group.current?.lookAt(group.current.position.x + movement.x, group.current.position.y, group.current.position.z + movement.z);
      } else {
        rigidBody.current.setLinvel({ x: 0, y: 0, z: 0 });
      }

      const worldPosition = rigidBody.current.translation();
      onMove([worldPosition.x, worldPosition.y, worldPosition.z]);
    }
  });

  return (
    <RigidBody ref={rigidBody} colliders={false} position={position} type={isCurrentPlayer ? 'dynamic' : 'fixed'}>
      <group ref={group}>
        {playerModel ? (
          <primitive object={playerModel.scene} scale={[0.01, 0.01, 0.01]} />
        ) : (
          <mesh>
            <capsuleGeometry args={[0.5, 1, 4, 8]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )}
      </group>
      <CuboidCollider args={[0.5, 1, 0.5]} />
    </RigidBody>
  );
};

export default Player;