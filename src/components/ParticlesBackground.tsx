import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MotionValue } from "framer-motion";
import { seededRange } from "../utils/random";

interface ParticlesBackgroundProps {
    scrollYProgress: MotionValue<number>;
}

export function ParticlesBackground({
    scrollYProgress,
}: ParticlesBackgroundProps) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const count = 1200; // Reduced from 3000 for better performance
    const { viewport } = useThree();

    // Create highly optimized dummy object for matrix calculations
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate initial particle data
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = seededRange(i, 0, 100);
            const factor = seededRange(i + 1000, 10, 60); // Smaller spread
            const speed = seededRange(i + 2000, 0.01, 0.013333333333333334);
            const xFactor = seededRange(i + 3000, -40, 40);
            const yFactor = seededRange(i + 4000, -40, 40);
            const zFactor = seededRange(i + 5000, -40, 40);
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
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    useFrame(() => {
        if (!mesh.current) return;

        // Mouse intersection roughly in 3D space
        const targetX = (mouse.current.x * viewport.width) / 2;
        const targetY = (mouse.current.y * viewport.height) / 2;

        // Get actual scroll progress from motion value
        const progress = scrollYProgress ? scrollYProgress.get() : 0;

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;

            // Update time for continuous movement
            t = particle.t += speed / 2;
            // Compute variables
            const s = Math.cos(t);

            // Base position with sine wave floating
            let x =
                (xFactor +
                    Math.cos((t / 10) * factor) +
                    (Math.sin(t * 1) * factor) / 10) /
                2;
            let y =
                (yFactor +
                    Math.sin((t / 10) * factor) +
                    (Math.cos(t * 2) * factor) / 10) /
                2;
            let z =
                (zFactor +
                    Math.cos((t / 10) * factor) +
                    (Math.sin(t * 3) * factor) / 10) /
                2;

            // Mouse interaction
            const dx = targetX - x;
            const dy = targetY - y;
            const dist = dx * dx + dy * dy; // Use squared distance for speed

            if (dist < 25) {
                // 5^2
                const force = 0.02;
                x += dx * force;
                y += dy * force;
            }

            // Parallax effect based on actual scroll progress
            y -= progress * 20 * (z / 40);

            // Update dummy object
            dummy.position.set(x, y, z);
            dummy.rotation.set(s * 2, s * 2, s * 2);
            dummy.scale.set(s * 0.15, s * 0.15, s * 0.15);
            dummy.updateMatrix();

            // Apply to instanced mesh
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <icosahedronGeometry args={[0.15, 0]} />
            <meshStandardMaterial
                color="#25D366"
                emissive="#128C7E"
                emissiveIntensity={0.5}
                transparent
                opacity={0.4}
                wireframe
            />
        </instancedMesh>
    );
}
