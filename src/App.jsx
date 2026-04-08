import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';

import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { FeaturesSection } from './sections/FeaturesSection';

// Simplify remaining sections into placeholders for the scrolling space, 
// since we will integrate the 3D features section primarily.
import { ProblemSection } from './sections/ProblemSection';
import { HowItWorks } from './sections/HowItWorks';
import { ImmersiveBreak } from './sections/ImmersiveBreak';
import { RemainingSections } from './sections/RemainingSections';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="selection:bg-whatsapp-green selection:text-black">
      {/* 3D Global Canvas Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
          <Scene />
        </Canvas>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-whatsapp-green z-[110] origin-left"
        style={{ scaleX }}
      />

      {/* DOM Layer overlaid on top of 3D Canvas */}
      <div className="relative z-10 w-full">
        {/* Navigation */}
        <Navbar />

        {/* Sections */}
        <Hero />
        <ProblemSection />
        <HowItWorks />
        {/* FeaturesSection will be where the 3D scroll objects appear alongside DOM content */}
        <FeaturesSection />
        <ImmersiveBreak />
        <RemainingSections />
      </div>
    </main>
  );
}

export default App;
