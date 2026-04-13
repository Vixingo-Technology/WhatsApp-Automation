"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { MotionValue } from "framer-motion";

// Use THREE.Timer if available, otherwise fallback to a simple performance.now() based approach
// This helps avoid the THREE.Clock deprecation warning in r183+
const fragments = [
  "Slow Responses",
  "Lost Leads",
  "Human Errors",
  "High Costs",
  "No Automation",
  "No Analytics",
  "Manual Work",
  "Missed Sales",
  "Unqualified Leads",
  "Poor Scaling"
];

interface BoxesProps {
  scrollYProgress: MotionValue<number>;
}

export default function Boxes({ scrollYProgress }: BoxesProps) {
  const group = useRef<THREE.Group>(null);
  const timer = useRef<any>(null);

  useEffect(() => {
    // @ts-ignore - THREE.Timer is available in r183 core
    if (THREE.Timer) {
      // @ts-ignore
      timer.current = new THREE.Timer();
    }
  }, []);

  const boxData = useMemo(() => {
    return fragments.map((text, i) => {
      const angle = (i / fragments.length) * Math.PI * 2;
      const radius = 4 + Math.random() * 2;
      return {
        text,
        angle,
        radius,
        offsetZ: (Math.random() - 0.5) * 10,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      };
    });
  }, []);

  useFrame((state) => {
    if (group.current) {
      const progress = scrollYProgress.get();
      
      // Use Timer for animation time if available, otherwise fallback to performance.now
      let time;
      if (timer.current) {
        timer.current.update();
        time = timer.current.getElapsedTime();
      } else {
        time = state.clock.getElapsedTime();
      }

      // Fluid rotation based on scroll
      group.current.rotation.y = progress * Math.PI * 2;
      group.current.rotation.x = Math.sin(time * 0.2) * 0.1;
      
      // Move boxes towards camera as we scroll
      group.current.position.z = progress * 10;
    }
  });

  return (
    <group ref={group}>
      {boxData.map((data, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh
            position={[
              Math.cos(data.angle) * data.radius,
              Math.sin(data.angle) * data.radius,
              data.offsetZ,
            ]}
          >
            <boxGeometry args={[1.6, 1.6, 1.6]} />
            <meshStandardMaterial
              color="#25D366"
              roughness={0.2}
              metalness={0.6}
              transparent
              opacity={0.8}
            />
            <Text
              position={[0, 0, 0.9]}
              fontSize={0.18}
              color="white"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.2}
              textAlign="center"
              font="/fonts/Inter-Bold.woff" // Assuming Inter is used or fallback
            >
              {data.text}
            </Text>
          </mesh>
        </Float>
      ))}
    </group>
  );
}
