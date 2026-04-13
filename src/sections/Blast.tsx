"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useScroll, motion, useTransform, useSpring } from "framer-motion";

const Scene = dynamic(() => import("../components/Scene"), {
  ssr: false,
});

export default function Blast({ containerRef }: { containerRef?: React.RefObject<HTMLDivElement | null> }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  // Text animations
  const opacity = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [0.8, 1, 1, 1.2]);
  const y = useTransform(smoothProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-[#020617]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Scene scrollYProgress={smoothProgress} />
        
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            textAlign: "center",
            padding: "20px",
            opacity,
            scale,
            y,
            zIndex: 200
          }}
        >
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            Why Your WhatsApp Ads<br />
            <span className="text-red-500">Are Losing You Money</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
