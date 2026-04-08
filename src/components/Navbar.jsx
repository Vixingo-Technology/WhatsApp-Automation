import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '../utils/cn';

export function Navbar({ containerRef }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll({ container: containerRef });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 py-6 px-6 lg:px-12 flex items-center justify-between",
        isScrolled ? "glass py-4" : "bg-transparent"
      )}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-2 group">
        <div className="w-10 h-10 rounded-xl bg-whatsapp-green flex items-center justify-center text-black font-black text-xl group-hover:rotate-12 transition-transform">
          V
        </div>
        <span className="text-2xl font-black tracking-tighter text-white">Vixingo</span>
      </a>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-12">
        {['How It Works', 'Features', 'Compare', 'Testimonials'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-sm font-bold text-white/40 hover:text-whatsapp-green transition-colors uppercase tracking-widest"
          >
            {link}
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-6">
        <a href="#" className="hidden sm:block text-sm font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest">
          Login
        </a>
        <button className="px-6 py-2.5 rounded-full bg-whatsapp-green text-black font-bold text-sm hover:bg-white hover:text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]">
          Start Free
        </button>
      </div>
    </motion.nav>
  );
}
