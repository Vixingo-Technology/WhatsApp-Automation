import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring, useVelocity, useTransform } from 'framer-motion';
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

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const velocityMagnitude = useTransform(smoothVelocity, (v) => Math.abs(v));
  
  // Rotate the ball 
  const rotateX = useTransform(smoothVelocity, [-2000, 0, 2000], [10, 0, -10]);
  
  // Scale down the entire ball proportionally
  const scale = useTransform(velocityMagnitude, [0, 2000], [1, 0.85], { clamp: true });
  
  // Calculate border radius explicitly (forming the circular "ball" curve on the left/right)
  const borderRadius = useTransform(velocityMagnitude, [0, 2000], ["0px", "40%"], { clamp: true });

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

      {/* The Ball Mask Layer */}
      <div className="fixed inset-0 z-10 w-full h-full pointer-events-none" style={{ perspective: '2000px' }}>
        <motion.div
          style={{
            rotateX,
            scale,
            borderRadius,
            transformOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
          className="w-full h-full overflow-hidden pointer-events-auto"
        >
          {/* Internal Native Scroll container replacing Body */}
          <div 
             ref={wrapperRef} 
             className="w-full h-full overflow-y-auto"
             // Hide standard scrollbar across browsers to keep the ball edges clean
             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
             {/* Extra inner wrapper just ensures CSS scrollbars don't take layout space in WebKit */}
             <style>{`
               div::-webkit-scrollbar { display: none; }
             `}</style>
             
             <div className="w-full min-h-full pb-32">
                {/* Navigation inside the ball, passing the scroll target */}
                <Navbar containerRef={wrapperRef} />

                {/* Sections */}
                <Hero containerRef={wrapperRef} />
                <ProblemSection />
                <HowItWorks />
                <FeaturesSection />
                <ImmersiveBreak />
                <RemainingSections />
             </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default App;
