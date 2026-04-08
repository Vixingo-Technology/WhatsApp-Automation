import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Link, Brain, Send, Zap, TrendingUp, MessageSquare, Bot, ShoppingBag, Globe, Briefcase, Package, Calendar, MessageCircle } from 'lucide-react';
import { cn } from '../utils/cn';

const STEPS = [
  {
    id: 1,
    title: "Connect Your WhatsApp",
    description: "Link your Meta Business Manager in minutes. 100% official WhatsApp Cloud API — zero technical knowledge needed.",
    icon: <Link size={24} />
  },
  {
    id: 2,
    title: "Train the AI",
    description: "Upload your product catalog, website URL, or business knowledge. Our AI learns your business deeply in seconds.",
    icon: <Brain size={24} />
  },
  {
    id: 3,
    title: "Deploy Agent",
    description: "Your AI agent is now live on WhatsApp. It starts greeting customers, qualifying leads, and answering FAQs immediately.",
    icon: <Send size={24} />
  },
  {
    id: 4,
    title: "Automate Everything",
    description: "From booking appointments to processing orders, everything happens automatically in the chat.",
    icon: <Zap size={24} />
  },
  {
    id: 5,
    title: "Scale Your Business",
    description: "Monitor performance through your dashboard. Reach thousands of customers without adding a single staff member.",
    icon: <TrendingUp size={24} />
  }
];

const AnimationCanvas = ({ scrollYProgress, activeStep }) => {
  // --- MOUSE TRACKING FOR ROBOT EYES ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Offset max 12px relative to screen proportion
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 24);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 24);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const eyeX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const eyeY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  // --- SCRUB THEATER MAPPINGS (0 to 1 over 400vh) ---

  // Robot global movement
  const robotRotate = useTransform(scrollYProgress, [0, 0.1], [90, 0]);
  const robotGlow = useTransform(scrollYProgress, [0, 0.05], ["rgba(0,0,0,0)", "rgba(37,211,102,0.8)"]);
  const robotOpacity = useTransform(scrollYProgress, [0, 0.1], [0.5, 1]);
  const RobotY = useTransform(scrollYProgress, [0, 0.1, 0.35, 0.45, 0.6, 0.65, 0.85, 0.95], [200, 0, 0, -150, -150, 0, 0, -250]);
  const RobotX = useTransform(scrollYProgress, [0.65, 0.7, 0.75, 0.8, 0.85, 0.95], [0, -150, 150, 0, 0, 350]);

  // Step 1: WhatsApp Connect
  const waX = useTransform(scrollYProgress, [0, 0.1], [-500, -30]);
  const waY = useTransform(scrollYProgress, [0, 0.1], [-200, -20]);
  const waScale = useTransform(scrollYProgress, [0.08, 0.1, 0.12], [1, 1.5, 0]);

  // Step 2: Floating Pages learning the logic
  const p1Y = useTransform(scrollYProgress, [0.15, 0.18, 0.22, 0.25], [300, -150, -150, -300]);
  const p1Scale = useTransform(scrollYProgress, [0.15, 0.18, 0.22, 0.25], [0, 1, 1, 0]);

  const p2Y = useTransform(scrollYProgress, [0.18, 0.21, 0.25, 0.28], [300, -150, -150, -300]);
  const p2Scale = useTransform(scrollYProgress, [0.18, 0.21, 0.25, 0.28], [0, 1, 1, 0]);

  const p3Y = useTransform(scrollYProgress, [0.21, 0.24, 0.28, 0.31], [300, -150, -150, -300]);
  const p3Scale = useTransform(scrollYProgress, [0.21, 0.24, 0.28, 0.31], [0, 1, 1, 0]);

  const jetpackScale = useTransform(scrollYProgress, [0.32, 0.35], [0, 1]);

  // Step 3: Fast Jetpack popups (Looping handled via local state)
  const isLooping = activeStep === 2;
  const isRedFlames = activeStep >= 3;

  // Step 4: Machine Order/Booking Data Input
  const machineY = useTransform(scrollYProgress, [0.60, 0.70], [500, 200]);
  const machineOpacity = useTransform(scrollYProgress, [0.60, 0.70], [0, 1]);

  const chat1X = useTransform(scrollYProgress, [0.70, 0.74], [0, -250]);
  const chat1Y = useTransform(scrollYProgress, [0.70, 0.74], [0, 150]);
  const chat1Op = useTransform(scrollYProgress, [0.69, 0.70, 0.73, 0.74], [0, 1, 1, 0]);

  const chat2X = useTransform(scrollYProgress, [0.75, 0.79], [0, 250]);
  const chat2Y = useTransform(scrollYProgress, [0.75, 0.79], [0, 150]);
  const chat2Op = useTransform(scrollYProgress, [0.74, 0.75, 0.78, 0.79], [0, 1, 1, 0]);

  // Step 5: Master Dashboard & Analytics Pipeline
  const dashScale = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const dashY = useTransform(scrollYProgress, [0.85, 0.95], [100, -200]);
  const pathLength = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);

  return (
    <div className="relative w-full h-[100vh] flex items-center justify-center pointer-events-none">

      {/* Step 1: Glowing WhatsApp Connect Message */}
      <motion.div style={{ x: waX, y: waY, scale: waScale }} className="absolute z-40">
        <div className="w-24 h-24 rounded-full bg-whatsapp-green flex items-center justify-center shadow-[0_0_60px_rgba(37,211,102,0.8)] border-4 border-white/20">
          <MessageSquare size={48} className="text-black ml-1 mt-1 drop-shadow-md" />
        </div>
      </motion.div>

      {/* Step 2: Floating Booklets */}
      <motion.div style={{ y: p1Y, scale: p1Scale, x: -220 }} className="absolute glass-card p-6 rounded-[32px] border-white/20 w-52 text-center shadow-2xl">
        <ShoppingBag className="mx-auto mb-4 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.8)]" size={48} />
        <p className="text-white font-bold text-lg">Product Catalog</p>
      </motion.div>
      <motion.div style={{ y: p2Y, scale: p2Scale, x: 0 }} className="absolute glass-card p-6 rounded-[32px] border-white/20 w-52 text-center shadow-2xl">
        <Globe className="mx-auto mb-4 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" size={48} />
        <p className="text-white font-bold text-lg">www.website.com</p>
      </motion.div>
      <motion.div style={{ y: p3Y, scale: p3Scale, x: 220 }} className="absolute glass-card p-6 rounded-[32px] border-white/20 w-52 text-center shadow-2xl">
        <Briefcase className="mx-auto mb-4 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" size={48} />
        <p className="text-white font-bold text-lg">Business Details</p>
      </motion.div>

      {/* Step 3 Infinite Jetpack Sequence */}
      <AnimatePresence>
        {isLooping && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -400, scale: 0 }}
              animate={{ opacity: [0, 1, 1, 0], x: [-400, -200, -50, -800], y: [200, 100, 0, 800], rotate: [0, 10, 45, 180] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
              className="absolute glass-card p-5 rounded-2xl border-red-500/40 shadow-2xl"
            >
              <MessageSquare className="text-red-400" size={40} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 400, scale: 0 }}
              animate={{ opacity: [0, 1, 1, 0], x: [400, 200, 50, 800], y: [-100, 0, 100, 600], rotate: [0, -10, -45, -180] }}
              transition={{ repeat: Infinity, duration: 2.8, delay: 0.8, ease: "linear" }}
              className="absolute glass-card p-5 rounded-2xl border-amber-500/40 shadow-2xl"
            >
              <MessageSquare className="text-amber-400" size={40} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Step 4: Output Machines & Processing Data */}
      <motion.div style={{ y: machineY, opacity: machineOpacity, x: -250 }} className="absolute w-64 h-64 glass-card rounded-[48px] border-t-8 border-l-8 border-blue-500/50 flex flex-col items-center justify-center shadow-[0_0_80px_rgba(59,130,246,0.3)] z-10">
        <Package className="text-blue-400 mb-6 animate-bounce" size={64} />
        <p className="text-sm font-black uppercase tracking-widest text-white/50">Order Engine</p>
        <div className="w-24 h-3 bg-blue-500/20 rounded-full mt-6 overflow-hidden">
          <motion.div animate={{ x: [-30, 96] }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} className="w-8 h-full bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]" />
        </div>
      </motion.div>

      <motion.div style={{ y: machineY, opacity: machineOpacity, x: 250 }} className="absolute w-64 h-64 glass-card rounded-[48px] border-t-8 border-r-8 border-amber-500/50 flex flex-col items-center justify-center shadow-[0_0_80px_rgba(245,158,11,0.3)] z-10">
        <Calendar className="text-amber-400 mb-6 animate-[spin_4s_linear_infinite]" size={64} />
        <p className="text-sm font-black uppercase tracking-widest text-white/50">Booking Engine</p>
        <div className="w-24 h-3 bg-amber-500/20 rounded-full mt-6 overflow-hidden">
          <motion.div animate={{ x: [-30, 96] }} transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }} className="w-8 h-full bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]" />
        </div>
      </motion.div>

      <motion.div style={{ x: chat1X, y: chat1Y, opacity: chat1Op }} className="absolute w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,1)] z-50">
        <MessageCircle className="text-black" size={28} />
      </motion.div>
      <motion.div style={{ x: chat2X, y: chat2Y, opacity: chat2Op }} className="absolute w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,1)] z-50">
        <MessageCircle className="text-black" size={28} />
      </motion.div>

      {/* Step 5: Dashboard and Data Pipe Network */}
      <svg viewBox="-500 -500 1000 1000" className="absolute w-[1000px] h-[1000px] pointer-events-none z-10">
        <motion.path
          d="M -250 200 L -250 -100 L 0 -100"
          fill="none"
          stroke="rgba(37,211,102,0.8)"
          strokeWidth="6"
          strokeDasharray="15 15"
          style={{ pathLength }}
          className="drop-shadow-[0_0_10px_rgba(37,211,102,0.8)]"
        />
        <motion.path
          d="M 250 200 L 250 -100 L 0 -100"
          fill="none"
          stroke="rgba(37,211,102,0.8)"
          strokeWidth="6"
          strokeDasharray="15 15"
          style={{ pathLength }}
          className="drop-shadow-[0_0_10px_rgba(37,211,102,0.8)]"
        />
      </svg>

      <motion.div style={{ scale: dashScale, y: dashY }} className="absolute w-[800px] h-[550px] glass-card border-t-8 border-whatsapp-green/40 rounded-[48px] p-12 shadow-[0_0_150px_rgba(37,211,102,0.25)] z-30">
        <div className="flex items-center justify-between border-b-[3px] border-white/10 pb-8 mb-10">
          <h3 className="text-3xl font-black text-white tracking-widest">VIXINGO COMMAND CENTER</h3>
          <div className="flex gap-4">
            <span className="w-5 h-5 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
            <span className="w-5 h-5 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
            <span className="w-5 h-5 rounded-full bg-whatsapp-green shadow-[0_0_20px_rgba(37,211,102,0.8)] animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="h-40 bg-white/5 rounded-3xl border border-white/10 flex flex-col justify-end p-6 shadow-inner">
            <div className="text-5xl font-black text-whatsapp-green mb-3 drop-shadow-md">1,248</div>
            <div className="text-sm font-bold text-white/50 uppercase tracking-widest">Leads Gathered</div>
          </div>
          <div className="h-40 bg-white/5 rounded-3xl border border-white/10 flex flex-col justify-end p-6 shadow-inner">
            <div className="text-5xl font-black text-blue-400 mb-3 drop-shadow-md">342</div>
            <div className="text-sm font-bold text-white/50 uppercase tracking-widest">Orders Handled</div>
          </div>
          <div className="h-40 bg-white/5 rounded-3xl border border-white/10 flex flex-col justify-end p-6 shadow-inner">
            <div className="text-5xl font-black text-amber-400 mb-3 drop-shadow-md">156</div>
            <div className="text-sm font-bold text-white/50 uppercase tracking-widest">Bookings Fixed</div>
          </div>
        </div>
        <div className="h-40 bg-gradient-to-t from-whatsapp-green/20 via-whatsapp-green/5 to-transparent rounded-3xl border border-whatsapp-green/30 relative overflow-hidden shadow-[inset_0_-20px_50px_rgba(37,211,102,0.1)]">
          {/* Simulated Growth Chart */}
          <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_10px_rgba(37,211,102,0.6)]" preserveAspectRatio="none">
            <path d="M 0 160 Q 150 140 300 100 T 500 120 T 700 40 L 900 20" fill="none" stroke="#25D366" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>
      </motion.div>


      {/* The 3D AI Robot Companion */}
      <motion.div style={{ x: RobotX, y: RobotY, rotateZ: robotRotate, opacity: robotOpacity }} className="absolute z-50">
        <motion.div
          animate={isLooping ? { y: [-40, 40], x: [-20, 20], rotate: [-8, 8] } : { y: [-10, 10], x: 0, rotate: 0 }}
          transition={{ repeat: Infinity, duration: isLooping ? 2.5 : 5, repeatType: 'mirror', ease: "easeInOut" }}
          className="relative"
        >
          {/* Robot Head / LED Screen */}
          <motion.div style={{ boxShadow: useMotionTemplate`0 0 80px ${robotGlow}, inset 0 0 20px rgba(255,255,255,0.1)` }} className="w-32 h-32 rounded-[40px] bg-zinc-900 border-[4px] border-zinc-700 flex items-center justify-center relative overflow-hidden z-10 shadow-2xl">
            {/* LED Screen Hardware */}
            <div className="w-[80%] h-[60%] bg-black rounded-xl relative overflow-hidden shadow-inner flex items-center justify-center border border-white/10">
               {/* Retro Scanlines */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-20 pointer-events-none opacity-50" />
               
               {/* Animated Cursor-Tracking Pixeled Eyes */}
               <motion.div style={{ x: eyeX, y: eyeY }} className="flex gap-4 relative z-10">
                  {/* Left Eye */}
                  <div className="w-6 h-7 grid grid-cols-4 grid-rows-4 gap-[2px]">
                     {[
                       0,1,1,0,
                       1,1,1,1,
                       1,1,1,1,
                       0,1,1,0
                     ].map((val, i) => (
                        <div key={`l-${i}`} className={cn("w-full h-full rounded-[1px]", val ? "bg-whatsapp-green shadow-[0_0_8px_#25D366]" : "bg-transparent")} />
                     ))}
                  </div>
                  {/* Right Eye */}
                  <div className="w-6 h-7 grid grid-cols-4 grid-rows-4 gap-[2px]">
                     {[
                       0,1,1,0,
                       1,1,1,1,
                       1,1,1,1,
                       0,1,1,0
                     ].map((val, i) => (
                        <div key={`r-${i}`} className={cn("w-full h-full rounded-[1px]", val ? "bg-whatsapp-green shadow-[0_0_8px_#25D366]" : "bg-transparent")} />
                     ))}
                  </div>
               </motion.div>
            </div>
          </motion.div>

          {/* Dual Thruster Jetpack */}
          <motion.div
            style={{ scale: jetpackScale, opacity: jetpackScale }}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-0 flex gap-6"
          >
            <div className="w-8 h-14 bg-zinc-800 rounded-b-[20px] rounded-t-lg border-2 border-zinc-600 relative overflow-visible shadow-xl">
              <motion.div
                animate={
                  isLooping ? { scaleY: [1, 2.5], opacity: [0.9, 1] }
                    : isRedFlames ? { scaleY: [1, 4], opacity: [0.9, 1] }
                      : { scaleY: [1, 1.3], opacity: [0.5, 0.7] }
                }
                transition={{ repeat: Infinity, duration: 0.08, repeatType: 'mirror' }}
                className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 w-6 h-20 rounded-full origin-top blur-[2px] transition-colors duration-500",
                  isRedFlames ? "bg-gradient-to-b from-yellow-300 via-red-600 to-transparent shadow-[0_20px_50px_rgba(239,68,68,0.8)]" : "bg-gradient-to-b from-cyan-300 via-blue-600 to-transparent shadow-[0_20px_30px_rgba(59,130,246,0.5)]"
                )}
              />
            </div>
            <div className="w-8 h-14 bg-zinc-800 rounded-b-[20px] rounded-t-lg border-2 border-zinc-600 relative overflow-visible shadow-xl">
              <motion.div
                animate={
                  isLooping ? { scaleY: [1, 2.5], opacity: [0.9, 1] }
                    : isRedFlames ? { scaleY: [1, 4], opacity: [0.9, 1] }
                      : { scaleY: [1, 1.3], opacity: [0.5, 0.7] }
                }
                transition={{ repeat: Infinity, duration: 0.08, repeatType: 'mirror' }}
                className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 w-6 h-20 rounded-full origin-top blur-[2px] transition-colors duration-500",
                  isRedFlames ? "bg-gradient-to-b from-yellow-300 via-red-600 to-transparent shadow-[0_20px_50px_rgba(239,68,68,0.8)]" : "bg-gradient-to-b from-cyan-300 via-blue-600 to-transparent shadow-[0_20px_30px_rgba(59,130,246,0.5)]"
                )}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

    </div>
  )
}

export function HowItWorks({ containerRef }) {
  const [activeStep, setActiveStep] = useState(0);
  const trackRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    container: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Precise bounds mapping for activeStep
    let stepIndex = 0;
    if (latest >= 0.125 && latest < 0.375) stepIndex = 1;
    else if (latest >= 0.375 && latest < 0.625) stepIndex = 2;
    else if (latest >= 0.625 && latest < 0.875) stepIndex = 3;
    else if (latest >= 0.875) stepIndex = 4;

    if (stepIndex !== activeStep) {
      setActiveStep(stepIndex);
    }
  });

  return (
    <section id="how-it-works" className="relative w-full text-white">
      {/* Intro Header */}
      <div className="pt-32 pb-16 text-center max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-2 rounded-full glass mb-8 border-whatsapp-green/30"
        >
          <span className="text-sm font-black uppercase tracking-widest text-whatsapp-green">The Automated Journey</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-gradient pb-2"
        >
          Deploy Magic <br />
          <span className="text-whatsapp-green italic">in Minutes</span>
        </motion.h2>
      </div>

      <div ref={trackRef} className="relative w-full h-[500vh]">
        {/* The Sticky Animation Theater spanning the background */}
        <div className="sticky top-0 w-full h-[100vh] overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-5" />
          <AnimationCanvas scrollYProgress={scrollYProgress} activeStep={activeStep} />
        </div>

        {/* Scrolling Text Overlays floating on the left side */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col">
          {STEPS.map((step, index) => (
            <div key={step.id} className="h-[100vh] w-full flex items-center justify-start px-6 lg:px-[10%]">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                viewport={{ margin: "-30% 0px -30% 0px" }}
                className={cn(
                  "max-w-md 2xl:max-w-lg glass-card p-10 2xl:p-12 rounded-[40px] border-l-8 pointer-events-auto transition-all duration-700 shadow-2xl backdrop-blur-xl",
                  activeStep === index ? "border-whatsapp-green scale-100 opacity-100 shadow-[0_20px_50px_rgba(37,211,102,0.15)]" : "border-white/10 scale-90 opacity-40 shadow-none"
                )}
              >
                <div className={cn(
                  "w-20 h-20 rounded-[24px] flex items-center justify-center mb-8 shadow-xl border-2 transition-all duration-500",
                  activeStep === index ? "bg-whatsapp-green/20 border-whatsapp-green text-whatsapp-green shadow-[0_0_30px_rgba(37,211,102,0.3)]" : "bg-white/5 border-white/10 text-white/50"
                )}>
                  {React.cloneElement(step.icon, { size: 40 })}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <span className={cn(
                    "font-black tracking-widest text-lg uppercase transition-colors duration-500",
                    activeStep === index ? "text-whatsapp-green" : "text-white/30"
                  )}>
                    Step 0{step.id}
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <h2 className={cn(
                  "text-3xl md:text-5xl font-black mb-6 tracking-tight transition-colors duration-500",
                  activeStep === index ? "text-white" : "text-white/60"
                )}>
                  {step.title}
                </h2>

                <p className="text-white/70 leading-relaxed text-lg font-body">
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
