import React from 'react';
import { motion } from 'framer-motion';

export function ImmersiveBreak() {
  return (
    <section className="h-[100vh] relative flex items-center justify-center overflow-hidden">
      {/* Content overlays global 3D Scene beautifully */}
      <div className="container mx-auto px-6 relative z-10 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto glass-card p-12 lg:p-24"
          style={{ pointerEvents: 'auto' }}
        >
          <h2 className="text-6xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter text-white">
            The Future of <br />
            <span className="text-whatsapp-green italic">Conversation</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-body leading-relaxed">
            Not just another chatbot. A fully autonomous AI agent that lives on WhatsApp, 
            understands your business, and grows your revenue while you sleep.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
