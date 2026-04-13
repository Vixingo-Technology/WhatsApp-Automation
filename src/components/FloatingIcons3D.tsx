import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Box, Sphere, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

interface ScrollAnimatedIconProps {
  children: React.ReactNode;
  index: number;
  position: [number, number, number];
  scrollStart: number;
  scrollEnd: number;
  scrollY: MotionValue<number>;
}

function ScrollAnimatedIcon({ children, index, position, scrollStart, scrollEnd, scrollY }: ScrollAnimatedIconProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!scrollY || !groupRef.current) return;
    const currentY = scrollY.get();
    
    // Simplistic scroll reveal logic:
    const progress = Math.max(0, Math.min(1, (currentY - scrollStart) / (scrollEnd - scrollStart)));
    
    // We want them to fly in from the bottom with a slight rotation staggering
    const targetY = position[1] + (1 - progress) * -10; // Reduced distance
    const targetScale = progress; 

    // Smoothly interpolate current to target
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08));
    groupRef.current.rotation.y += 0.003 * (index + 1);
    groupRef.current.rotation.x += 0.001 * (index + 1);
  });

  return (
    <group ref={groupRef} position={[position[0], position[1] - 10, position[2]]} scale={0}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        {children}
      </Float>
    </group>
  );
}

interface FloatingIcons3DProps {
  scrollY: MotionValue<number>;
}

export function FloatingIcons3D({ scrollY }: FloatingIcons3DProps) {
  const material = useRef(new THREE.MeshPhysicalMaterial({
    color: '#25D366',
    metalness: 0.1,
    roughness: 0.2,
    transmission: 0.8,
    ior: 1.5,
    thickness: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  })).current;

  return (
    <group>
      <ScrollAnimatedIcon index={1} position={[-4, -5, -2]} scrollStart={800} scrollEnd={1500} scrollY={scrollY}>
        <Box args={[1.2, 1.2, 1.2]} material={material} />
      </ScrollAnimatedIcon>

      <ScrollAnimatedIcon index={2} position={[4, -12, -4]} scrollStart={1200} scrollEnd={2000} scrollY={scrollY}>
        <Octahedron args={[1.2]} material={material} />
      </ScrollAnimatedIcon>

      <ScrollAnimatedIcon index={3} position={[-3, -19, -1]} scrollStart={1800} scrollEnd={2600} scrollY={scrollY}>
        <Torus args={[0.8, 0.3, 16, 48]} material={material} />
      </ScrollAnimatedIcon>
      
      <ScrollAnimatedIcon index={4} position={[3, -26, -3]} scrollStart={2400} scrollEnd={3200} scrollY={scrollY}>
        <Sphere args={[1, 24, 24]} material={material} />
      </ScrollAnimatedIcon>
    </group>
  );
}
