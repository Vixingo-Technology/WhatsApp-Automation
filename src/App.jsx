import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring, useVelocity, useTransform, useMotionTemplate } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';

import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { FeaturesSection } from './sections/FeaturesSection';
import { ProblemSection } from './sections/ProblemSection';
import { HowItWorks } from './sections/HowItWorks';
import { ImmersiveBreak } from './sections/ImmersiveBreak';
import { RemainingSections } from './sections/RemainingSections';

function App() {
  const wrapperRef = useRef(null);

  const { scrollY, scrollYProgress } = useScroll({ container: wrapperRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });



  useEffect(() => {
    // Disable native body scroll as we are using a custom wrapper
    document.body.style.overflow = 'hidden';

    if (!wrapperRef.current) return;

    const lenis = new Lenis({
      wrapper: wrapperRef.current,
      content: wrapperRef.current.firstElementChild,
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
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <main className="selection:bg-whatsapp-green selection:text-black min-h-screen bg-black">
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

      {/* Full Screen Scroll Wrapper */}
      <div className="fixed inset-0 z-10 w-full h-full pointer-events-auto">
        <div
          ref={wrapperRef}
          className="w-full h-full overflow-y-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', perspective: '1200px' }}
        >
          {/* Hide native scrollbars to maintain immersion */}
          <style>{`
             div::-webkit-scrollbar { display: none; }
           `}</style>

          <div className="w-full min-h-full pb-32 flex flex-col relative z-20">
            <Navbar containerRef={wrapperRef} />

            {/* Sections */}
            <Hero containerRef={wrapperRef} />
            <ProblemSection />
            <HowItWorks containerRef={wrapperRef} />
            <FeaturesSection />
            <ImmersiveBreak />
            <RemainingSections />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
