import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Globe, Zap } from 'lucide-react';
import { cn } from '../utils/cn';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SCROLL_FEATURES: Feature[] = [
  {
    icon: <MessageSquare size={32} className="text-whatsapp-green" />,
    title: "AI Auto-Reply",
    description: "Instant responses to common questions, product inquiries, and support requests. Stop losing customers to wait times."
  },
  {
    icon: <Users size={32} className="text-whatsapp-green" />,
    title: "Lead Qualification",
    description: "Automatically filter and score leads based on their responses. Engage only with the highest intent prospects."
  },
  {
    icon: <Globe size={32} className="text-whatsapp-green" />,
    title: "Multilingual Support",
    description: "Fluid conversations in over 50 languages. The AI detects the language and responds natively."
  },
  {
    icon: <Zap size={32} className="text-whatsapp-green" />,
    title: "Hyper-Personalization",
    description: "Connects with your CRM to remember past interactions and personalize every single automated message."
  }
];

function ScrollFeatureBlock({ feature, index }: { feature: Feature; index: number }) {
  // A tall block so the user has to scroll, triggering the 3D icon in the background Canvas
  return (
    <div className="min-h-[80vh] flex items-center w-full">
      <div className={cn(
        "w-full lg:w-1/2 flex flex-col justify-center",
        index % 2 === 0 ? "lg:pr-20 ml-auto text-right items-end" : "lg:pl-20 mr-auto text-left items-start"
      )}>
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, margin: "-200px" }}
           transition={{ duration: 0.6 }}
           className="glass-card p-10 max-w-lg bg-white/40 border-slate-200"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 shadow-xl border border-white/5">
            {feature.icon}
          </div>
          <h3 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter text-slate-900">
            {feature.title}
          </h3>
          <p className="text-lg text-slate-600 font-body leading-relaxed">
            {feature.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  // Features Section component
  return (
    <section id="features" className="relative py-32 overflow-visible">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full glass mb-6 border-slate-200"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">The Engine</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black leading-[1] tracking-tighter text-slate-900"
          >
            Intelligence that <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-whatsapp-green to-slate-900">
              Scales
            </span>
          </motion.h2>
        </div>

        {/* The tall scrolling container where 3D objects will appear globally */}
        <div className="flex flex-col relative w-full pt-10 pb-32">
          {SCROLL_FEATURES.map((feature, index) => (
            <ScrollFeatureBlock key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
