import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Box, Sphere, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

// An individual icon that appears when the user scrolls down to its section
function ScrollAnimatedIcon({ children, index, position, scrollStart, scrollEnd }) {
  const groupRef = useRef();
  const { viewport } = useThree();

  useFrame(() => {
    const scrollY = window.scrollY;
    // Calculate global scroll progress using viewport height as a rough metric
    // It's usually better to sync with Lenis or exact DOM positions, but this works based on arbitrary height mapping points
    
    // Simplistic scroll reveal logic:
    // If scrollY is before scrollStart, it's far below viewport
    // As it approaches scrollEnd, it snaps to its actual position
    // If it passes scrollEnd, it scrolls up naturally

    const progress = Math.max(0, Math.min(1, (scrollY - scrollStart) / (scrollEnd - scrollStart)));
    
    // We want them to fly in from the bottom with a slight rotation staggering
    const targetY = position[1] + (1 - progress) * -15; // Start 15 units below
    const targetScale = progress * 1; 

    // Smoothly interpolate current to target
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1));
    groupRef.current.rotation.y += 0.005 * (index + 1);
    groupRef.current.rotation.x += 0.002 * (index + 1);
  });

  return (
    <group ref={groupRef} position={[position[0], position[1] - 15, position[2]]} scale={0}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        {children}
      </Float>
    </group>
  );
}

export function FloatingIcons3D() {
  const material = new THREE.MeshPhysicalMaterial({
    color: '#25D366',
    metalness: 0.1,
    roughness: 0.2,
    transmission: 0.9,
    ior: 1.5,
    thickness: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });

  return (
    <group>
      {/* 
        ScrollStart/ScrollEnd values are approx pixel values of scroll. 
        Will adjust these so they appear visually when the FeatureSection is reached.
        Assuming FeatureSection starts around 1500px to 3000px
      */}
      <ScrollAnimatedIcon index={1} position={[-3, -5, -2]} scrollStart={800} scrollEnd={1500}>
        <Box args={[1.5, 1.5, 1.5]} material={material} />
      </ScrollAnimatedIcon>

      <ScrollAnimatedIcon index={2} position={[3, -12, -4]} scrollStart={1200} scrollEnd={2000}>
        <Octahedron args={[1.5]} material={material} />
      </ScrollAnimatedIcon>

      <ScrollAnimatedIcon index={3} position={[-2, -19, -1]} scrollStart={1800} scrollEnd={2600}>
        <Torus args={[1, 0.4, 16, 64]} material={material} />
      </ScrollAnimatedIcon>
      
      <ScrollAnimatedIcon index={4} position={[2, -26, -3]} scrollStart={2400} scrollEnd={3200}>
        <Sphere args={[1.2, 32, 32]} material={material} />
      </ScrollAnimatedIcon>
    </group>
  );
}
