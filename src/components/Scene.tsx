"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { MotionValue } from "framer-motion";
import Boxes from "./Boxes";

interface SceneProps {
  scrollYProgress: MotionValue<number>;
}

export default function Scene({ scrollYProgress }: SceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />

      <Boxes scrollYProgress={scrollYProgress} />

      <Environment preset="city" />

      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.2} />
      </EffectComposer>
    </Canvas>
  );
}
