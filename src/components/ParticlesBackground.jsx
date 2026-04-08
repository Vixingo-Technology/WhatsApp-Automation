import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticlesBackground() {
  const mesh = useRef();
  const count = 3000;
  const { size, viewport } = useThree();

  // Create highly optimized dummy object for matrix calculations
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate initial particle data
  const particles = useMemo(() => {
    const temp = [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      // Store original positions and random factors
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
    }
    return temp;
  }, [count]);

  const mouse = useRef(new THREE.Vector2());

  // Track mouse movement
  useEffect(() => {
    const onMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame(() => {
    // Mouse intersection roughly in 3D space
    const targetX = (mouse.current.x * viewport.width) / 2;
    const targetY = (mouse.current.y * viewport.height) / 2;

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;

      // Update time for continuous movement
      t = particle.t += speed / 2;
      // Compute variables
      const s = Math.cos(t);

      // Base position with sine wave floating
      let x = (xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10) / 2;
      let y = (yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10) / 2;
      let z = (zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10) / 2;

      // Mouse attraction logic 
      // If particle is close enough to mouse projection, pull it
      const dx = targetX - x;
      const dy = targetY - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 5) {
        // Subtle pull towards mouse
        x += dx * 0.05;
        y += dy * 0.05;
      }

      // Parallax effect based on global scroll
      const scrollY = window.scrollY;
      y += scrollY * 0.005 * (z / 50); // particles deeper in z scroll slower

      // Update dummy object
      dummy.position.set(x, y, z);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.scale.set(s * 0.2, s * 0.2, s * 0.2);
      dummy.updateMatrix();
      
      // Apply to instanced mesh
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <icosahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial 
        color="#25D366" 
        emissive="#128C7E"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
        wireframe
      />
    </instancedMesh>
  );
}
