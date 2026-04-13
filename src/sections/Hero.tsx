import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { WhatsAppChat } from '../components/WhatsAppChat';
import { ArrowRight, Clock, TrendingUp } from 'lucide-react';

interface HeroProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function Hero({ containerRef }: HeroProps) {
  const { scrollY } = useScroll({ container: containerRef });
  
  // Create smoothed scroll value for more fluid transitions
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effects using smoothed scroll
  const yText = useTransform(smoothScrollY, [0, 1000], [0, 200]);
  const yImage = useTransform(smoothScrollY, [0, 1000], [0, 100]);
  const opacity = useTransform(smoothScrollY, [0, 800], [1, 0]);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center justify-center">
      {/* Container aligned with parallax */}
      <motion.div 
        style={{ y: yText, opacity }}
        className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center will-change-transform"
      >
        {/* Content */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border-whatsapp-green/20 shadow-[0_0_15px_rgba(37,211,102,0.1)]"
          >
            <span className="w-2 h-2 rounded-full bg-whatsapp-green animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-700">Next-Gen Support</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-black mb-6 leading-[1.05] tracking-tighter text-slate-800">
            Automate with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-whatsapp-green to-slate-900 relative inline-block">
              Absolute Precision.
               {/* Reduced Glow effect under text for performance */}
               <div className="absolute inset-0 bg-whatsapp-green/10 blur-xl -z-10 mix-blend-multiply" />
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-body font-light">
            Elevate your communication. An AI agent that speaks your brand's language natively on WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="px-8 py-4 rounded-full bg-whatsapp-green text-white font-extrabold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 group shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(0,0,0,0.1)]">
              Start Building
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full glass text-slate-800 font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Floating Chat visualization without local Canvas */}
        <motion.div
          style={{ y: yImage }}
          className="relative h-[600px] w-full flex items-center justify-center will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative z-20 w-[280px] sm:w-[320px]"
          >
            {/* Optimized backdrop glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-whatsapp-green/20 blur-[60px] pointer-events-none" />
            <WhatsAppChat />
          </motion.div>

          {/* Floating Badges */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] right-[5%] glass-card p-4 flex items-center gap-3 z-30 shadow-2xl"
          >
            <div className="w-12 h-12 rounded-full bg-whatsapp-green/20 flex items-center justify-center text-whatsapp-green shadow-[0_0_10px_rgba(37,211,102,0.2)]">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">Conversion</p>
              <p className="text-lg font-black text-slate-800">+142%</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[10%] left-[0%] glass-card p-4 flex items-center gap-3 z-30 shadow-2xl"
          >
            <div className="w-12 h-12 rounded-full bg-whatsapp-green/20 flex items-center justify-center text-whatsapp-green shadow-[0_0_10px_rgba(37,211,102,0.2)]">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">Response</p>
              <p className="text-lg font-black text-slate-800">&lt; 2 sec</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
