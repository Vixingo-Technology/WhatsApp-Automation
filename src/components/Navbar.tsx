import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '../utils/cn';

interface NavbarProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function Navbar({ containerRef }: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll({ container: containerRef });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    // Hide when scrolling down past 150px, show when scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -120, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-5xl pointer-events-none"
    >
      <nav
        className={cn(
          "glass rounded-full py-3 px-4 md:px-10 flex items-center justify-between pointer-events-auto",
          "border border-slate-200 shadow-sm bg-white/60"
        )}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-whatsapp-green flex items-center justify-center text-white font-black text-lg group-hover:rotate-12 transition-transform">
            V
          </div>
          <span className="hidden sm:block text-xl font-black tracking-tighter text-slate-900">Vixingo</span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {['How It Works', 'Features', 'Compare', 'Testimonials'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-[11px] font-bold text-slate-600 hover:text-whatsapp-green transition-colors uppercase tracking-widest"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3 md:gap-6">
          <a href="#" className="hidden sm:block text-[11px] font-bold text-slate-600 hover:text-slate-800 transition-colors uppercase tracking-widest">
            Login
          </a>
          <button className="px-5 py-2.5 rounded-full bg-whatsapp-green text-white font-bold text-[11px] hover:bg-slate-800 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(37,211,102,0.3)]">
            Start Free
          </button>
        </div>
      </nav>
    </motion.div>
  );
}


