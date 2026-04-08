import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { ParticlesBackground } from './ParticlesBackground';
import { FloatingIcons3D } from './FloatingIcons3D';

export function Scene() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#25D366" />
      <directionalLight position={[-10, 10, -5]} intensity={1} color="#ffffff" />
      <spotLight position={[0, -10, 10]} intensity={5} color="#128C7E" />

      {/* Futuristic HDRI lighting environment */}
      <Environment resolution={256} blur={0.5}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Lightformer form="circle" intensity={5} color="#25D366" position={[0, 10, 0]} scale={20} />
          <Lightformer form="ring" intensity={2} color="#128C7E" position={[10, 0, 10]} scale={10} />
        </group>
      </Environment>

      <ParticlesBackground />
      <FloatingIcons3D />
    </>
  );
}
