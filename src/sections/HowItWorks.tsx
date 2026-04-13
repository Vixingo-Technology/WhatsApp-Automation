import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useMotionTemplate, useMotionValue, useSpring, type MotionValue } from 'framer-motion';
import { Link, Brain, Send, Zap, TrendingUp, MessageSquare, Bot, ShoppingBag, Globe, Briefcase, Package, Calendar, MessageCircle, Database } from 'lucide-react';
import { cn } from '../utils/cn';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
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

interface AnimationCanvasProps {
  scrollYProgress: MotionValue<number>;
  activeStep: number;
}

const AnimationCanvas = ({ scrollYProgress, activeStep }: AnimationCanvasProps) => {
  // --- MOUSE TRACKING FOR ROBOT EYES ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset max 12px relative to screen proportion
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 24);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 24);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const eyeX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const eyeY = useSpring(mouseY, { stiffness: 200, damping: 20 });
  
  const headRotateX = useTransform(mouseY, (v) => -v * 0.8);
  const headRotateY = useTransform(mouseX, (v) => v * 0.8);

  // --- SCRUB THEATER MAPPINGS (0 to 1 over 400vh) ---

  // Robot global movement
  const robotRotate = useTransform(scrollYProgress, [0, 0.1], [90, 0]);
  const robotGlow = useTransform(scrollYProgress, [0, 0.05], ["rgba(0,0,0,0)", "rgba(37,211,102,0.8)"]);
  const robotOpacity = useTransform(scrollYProgress, [0, 0.1], [0.5, 1]);
  const RobotY = useTransform(scrollYProgress, [0, 0.1, 0.35, 0.45, 0.6, 0.65, 0.85, 0.95], [200, 0, 0, -150, -150, 0, 0, -250]);
  const RobotX = useTransform(scrollYProgress, [0.65, 0.7, 0.75, 0.8, 0.85, 0.95], [0, -150, 150, 0, 0, 350]);

  // Eyes Visibility (Alive state)
  const isAlive = useTransform(scrollYProgress, [0.1, 0.12], [0, 1]);

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

  const jetpackScale = useTransform(scrollYProgress, [0.32, 0.35, 0.85, 0.9], [0, 1, 1, 1]);

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

  // Step 5: Data particles
  const dataParticleY = useTransform(scrollYProgress, [0.9, 1], [0, -300]);
  const dataParticleOp = useTransform(scrollYProgress, [0.88, 0.9, 0.98, 1], [0, 1, 1, 0]);

  return (
    <div className="relative w-full h-[100vh] flex items-center justify-center pointer-events-none">

      {/* Step 1: Glowing WhatsApp Connect Message */}
      <motion.div style={{ x: waX, y: waY, scale: waScale }} className="absolute z-40">
        <div className="w-24 h-24 rounded-full bg-whatsapp-green flex items-center justify-center shadow-[0_0_60px_rgba(37,211,102,0.8)] border-4 border-white/20">
          <MessageSquare size={48} className="text-black ml-1 mt-1 drop-shadow-md" />
        </div>
      </motion.div>

      {/* Step 2: Floating Booklets */}
      <motion.div style={{ y: p1Y, scale: p1Scale, x: -220 }} className="absolute glass-card p-6 rounded-[32px] w-52 text-center shadow-md">
        <ShoppingBag className="mx-auto mb-4 text-blue-500 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" size={48} />
        <p className="text-slate-800 font-bold text-lg">Product Catalog</p>
      </motion.div>
      <motion.div style={{ y: p2Y, scale: p2Scale, x: 0 }} className="absolute glass-card p-6 rounded-[32px] w-52 text-center shadow-md">
        <Globe className="mx-auto mb-4 text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" size={48} />
        <p className="text-slate-800 font-bold text-lg">www.website.com</p>
      </motion.div>
      <motion.div style={{ y: p3Y, scale: p3Scale, x: 220 }} className="absolute glass-card p-6 rounded-[32px] w-52 text-center shadow-md">
        <Briefcase className="mx-auto mb-4 text-amber-500 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" size={48} />
        <p className="text-slate-800 font-bold text-lg">Business Details</p>
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
      <motion.div style={{ y: machineY, opacity: machineOpacity, x: -250 }} className="absolute w-64 h-64 glass-card rounded-[48px] border-t-8 border-l-8 border-blue-500 flex flex-col items-center justify-center shadow-lg z-10 bg-white/80">
        <Package className="text-blue-500 mb-6 animate-bounce" size={64} />
        <p className="text-sm font-black uppercase tracking-widest text-slate-600">Order Engine</p>
        <div className="w-24 h-3 bg-slate-200 rounded-full mt-6 overflow-hidden">
          <motion.div animate={{ x: [-30, 96] }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} className="w-8 h-full bg-blue-500 rounded-full shadow-[0_0_5px_#60a5fa]" />
        </div>
      </motion.div>

      <motion.div style={{ y: machineY, opacity: machineOpacity, x: 250 }} className="absolute w-64 h-64 glass-card rounded-[48px] border-t-8 border-r-8 border-amber-500 flex flex-col items-center justify-center shadow-lg z-10 bg-white/80">
        <Calendar className="text-amber-500 mb-6 animate-[spin_4s_linear_infinite]" size={64} />
        <p className="text-sm font-black uppercase tracking-widest text-slate-600">Booking Engine</p>
        <div className="w-24 h-3 bg-slate-200 rounded-full mt-6 overflow-hidden">
          <motion.div animate={{ x: [-30, 96] }} transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }} className="w-8 h-full bg-amber-500 rounded-full shadow-[0_0_5px_#fbbf24]" />
        </div>
      </motion.div>

      <motion.div style={{ x: chat1X, y: chat1Y, opacity: chat1Op }} className="absolute w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg border border-slate-200 z-50">
        <MessageCircle className="text-black" size={28} />
      </motion.div>
      <motion.div style={{ x: chat2X, y: chat2Y, opacity: chat2Op }} className="absolute w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg border border-slate-200 z-50">
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

      {/* Final Step: Data particles sending to dashboard */}
      <AnimatePresence>
        {activeStep === 4 && (
          <motion.div 
            style={{ y: dataParticleY, opacity: dataParticleOp }}
            className="absolute z-40 flex flex-col items-center gap-4"
          >
            <div className="flex gap-8">
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1], y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="w-8 h-8 rounded-lg bg-whatsapp-green/20 border border-whatsapp-green/40 flex items-center justify-center"
                >
                  <Database size={16} className="text-whatsapp-green" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div style={{ scale: dashScale, y: dashY }} className="absolute w-[800px] h-[550px] glass-card border-[3px] border-white/50 rounded-[48px] p-12 shadow-2xl z-30 bg-white/90">
        <div className="flex items-center justify-between border-b-[3px] border-slate-200 pb-8 mb-10">
          <h3 className="text-3xl font-black text-slate-800 tracking-widest">VIXINGO COMMAND CENTER</h3>
          <div className="flex gap-4">
            <span className="w-5 h-5 rounded-full bg-red-400 shadow-sm" />
            <span className="w-5 h-5 rounded-full bg-amber-400 shadow-sm" />
            <span className="w-5 h-5 rounded-full bg-whatsapp-green shadow-[0_0_10px_rgba(37,211,102,0.5)] animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="h-40 bg-slate-50 rounded-3xl border border-slate-200 flex flex-col justify-end p-6 shadow-sm">
            <div className="text-5xl font-black text-whatsapp-green mb-3 drop-shadow-sm">1,248</div>
            <div className="text-sm font-bold text-slate-600 uppercase tracking-widest">Leads Gathered</div>
          </div>
          <div className="h-40 bg-slate-50 rounded-3xl border border-slate-200 flex flex-col justify-end p-6 shadow-sm">
            <div className="text-5xl font-black text-blue-500 mb-3 drop-shadow-sm">342</div>
            <div className="text-sm font-bold text-slate-600 uppercase tracking-widest">Orders Handled</div>
          </div>
          <div className="h-40 bg-slate-50 rounded-3xl border border-slate-200 flex flex-col justify-end p-6 shadow-sm">
            <div className="text-5xl font-black text-amber-500 mb-3 drop-shadow-sm">156</div>
            <div className="text-sm font-bold text-slate-600 uppercase tracking-widest">Bookings Fixed</div>
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
      <motion.div 
        style={{ 
          x: RobotX, 
          y: RobotY, 
          rotateZ: robotRotate, 
          opacity: robotOpacity,
          perspective: "1000px" 
        }} 
        className="absolute z-50 flex flex-col items-center"
      >
        <motion.div
          animate={isLooping ? { y: [-40, 40], x: [-20, 20], rotate: [-8, 8] } : { y: [-10, 10], x: 0, rotate: 0 }}
          transition={{ repeat: Infinity, duration: isLooping ? 2.5 : 5, repeatType: 'mirror', ease: "easeInOut" }}
          className="relative flex flex-col items-center"
        >
          {/* Step 3: Back Thrusters (2 blue lines) */}
          <motion.div
            style={{ opacity: activeStep === 2 ? 1 : 0 }}
            className="absolute -z-10 w-full flex justify-between px-4"
          >
            <motion.div 
              animate={{ height: [40, 100, 40], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="w-1.5 bg-cyan-400 blur-[2px] shadow-[0_0_10px_cyan]" 
            />
            <motion.div 
              animate={{ height: [40, 100, 40], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 0.1, delay: 0.05 }}
              className="w-1.5 bg-cyan-400 blur-[2px] shadow-[0_0_10px_cyan]" 
            />
          </motion.div>

          {/* Main Round Body */}
          <motion.div 
            style={{ 
              boxShadow: useMotionTemplate`0 0 50px ${robotGlow}, inset -10px -10px 30px rgba(0,0,0,0.05), inset 10px 10px 30px rgba(255,255,255,1)`,
              rotateX: headRotateX,
              rotateY: headRotateY,
              transformStyle: "preserve-3d"
            }} 
            className="w-40 h-40 rounded-full bg-white border border-slate-200 flex items-center justify-center relative z-20 shadow-2xl overflow-hidden"
          >
             {/* Center Eye / Core */}
             <div className="w-20 h-20 bg-slate-900 rounded-full relative shadow-[inset_0_0_20px_rgba(0,0,0,1)] flex items-center justify-center border-4 border-slate-300 overflow-hidden">
               {/* Pixelated Eye tracking */}
               <motion.div 
                 style={{ 
                   x: eyeX, 
                   y: eyeY,
                   opacity: isAlive
                 }} 
                 className="relative w-12 h-12 flex items-center justify-center"
               >
                 {/* Blinking Animation Wrapper */}
                 <motion.div
                   animate={{ scaleY: [1, 1, 1, 0, 1] }}
                   transition={{ repeat: Infinity, duration: 3, times: [0, 0.9, 0.95, 0.97, 1] }}
                   className="flex flex-col gap-1"
                 >
                    {/* Pixel-like eyes */}
                    <div className="flex gap-2">
                       <div className="w-4 h-4 bg-whatsapp-green shadow-[0_0_10px_#25D366]" />
                       <div className="w-4 h-4 bg-whatsapp-green shadow-[0_0_10px_#25D366]" />
                    </div>
                 </motion.div>
               </motion.div>
             </div>
             {/* Decorative rings */}
             <div className="absolute inset-0 rounded-full border-[10px] border-slate-100 border-dashed opacity-50 block animate-[spin_20s_linear_infinite]" />
          </motion.div>

          {/* Connection Ring */}
          <div className="w-16 h-6 bg-slate-200 rounded-full -mt-4 relative z-10 shadow-inner border border-slate-300" />
          
          {/* Single Rocket Booster Bottom */}
          <div className="w-24 h-16 bg-slate-800 rounded-b-full rounded-t-xl border-x-4 border-b-4 border-slate-700 relative z-0 flex justify-center -mt-2 overflow-hidden shadow-xl">
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
             {/* Inner engine glow */}
             <div className="w-12 h-6 bg-slate-900 mt-auto mb-2 rounded-full shadow-[inset_0_0_10px_#000] border-2 border-slate-600 flex justify-center" />
          </div>

          {/* Jetpack Flame */}
          <motion.div
            style={{ scale: jetpackScale, opacity: jetpackScale }}
            className="absolute top-[200px] flex justify-center -z-10"
          >
             <motion.div
                animate={
                  isLooping ? { scaleY: [1, 2.5], opacity: [0.9, 1] }
                    : isRedFlames ? { scaleY: [1, 4.5], opacity: [0.9, 1], scaleX: [1, 1.5, 1] }
                      : { scaleY: [1, 1.3], opacity: [0.5, 0.7] }
                }
                transition={{ repeat: Infinity, duration: 0.08, repeatType: 'mirror' }}
                className={cn(
                  "w-12 h-28 rounded-full origin-top blur-[3px] transition-all duration-500",
                  isRedFlames ? "bg-gradient-to-b from-yellow-300 via-orange-500 to-red-600 shadow-[0_40px_80px_rgba(239,68,68,0.9)]" : "bg-gradient-to-b from-cyan-300 via-blue-600 to-transparent shadow-[0_20px_40px_rgba(59,130,246,0.5)]"
                )}
              />
          </motion.div>
        </motion.div>
      </motion.div>

    </div>
  )
}

export function HowItWorks({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [activeStep, setActiveStep] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

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
    <section id="how-it-works" className="relative w-full text-slate-800">
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
          className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-slate-800 pb-2"
        >
          Deploy Magic <br />
          <span className="text-whatsapp-green italic drop-shadow-sm">in Minutes</span>
        </motion.h2>
      </div>

      <div ref={trackRef} className="relative w-full h-[500vh]">
        {/* The Sticky Animation Theater spanning the background */}
        <div className="sticky top-0 w-full h-[100vh] overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-[0.02]" />
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
                  "max-w-md 2xl:max-w-lg glass p-10 2xl:p-12 rounded-[40px] border-l-8 pointer-events-auto transition-all duration-700 shadow-xl backdrop-blur-xl bg-white/70",
                  activeStep === index ? "border-whatsapp-green scale-100 opacity-100 shadow-[0_20px_50px_rgba(37,211,102,0.05)]" : "border-slate-200 scale-90 opacity-40 shadow-none"
                )}
              >
                <div className={cn(
                  "w-20 h-20 rounded-[24px] flex items-center justify-center mb-8 shadow-sm border transition-all duration-500",
                  activeStep === index ? "bg-whatsapp-green/20 border-whatsapp-green text-whatsapp-green" : "bg-slate-100 border-slate-200 text-slate-600"
                )}>
                  {React.cloneElement(step.icon, { size: 40 })}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <span className={cn(
                    "font-black tracking-widest text-lg uppercase transition-colors duration-500",
                    activeStep === index ? "text-whatsapp-green" : "text-slate-600"
                  )}>
                    Step 0{step.id}
                  </span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                <h2 className={cn(
                  "text-3xl md:text-5xl font-black mb-6 tracking-tight transition-colors duration-500",
                  activeStep === index ? "text-slate-900" : "text-slate-600"
                )}>
                  {step.title}
                </h2>

                <p className="text-slate-600 leading-relaxed text-lg font-body">
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
