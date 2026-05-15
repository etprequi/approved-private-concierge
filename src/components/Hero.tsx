import React from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Media */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-20" />
        <img 
          src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=2000&q=90" 
          alt="Luxury Car Profile" 
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
      </div>

      {/* Content */}
      <div className="relative z-30 text-center px-6 max-w-5xl">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-[12px] md:text-[14px] tracking-[0.6em] text-silver font-light uppercase block mb-6">
            ESTABLISHED IN DISCRETION
          </span>
          <h1 className="font-serif text-4xl md:text-7xl leading-tight mb-10 tracking-tight text-white/90">
            Not Advertised. Not Accessible. <br />
            Not for <span className="italic font-light text-gold">Everyone.</span>
          </h1>
          <p className="text-silver text-[14px] md:text-[16px] max-w-2xl mx-auto mb-12 font-light leading-relaxed tracking-widest uppercase">
            APPROVED Private Concierge delivers bespoke lifestyle management 
            with absolute confidentiality and precision.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <button 
              onClick={onCtaClick}
              className="bg-white text-black px-12 py-4 rounded-full text-[12px] tracking-[0.3em] font-bold hover:bg-gold hover:text-white transition-all duration-500 w-full md:w-auto"
            >
              MEMBERS ENTRANCE
            </button>
            <button className="text-white border border-white/20 px-12 py-4 rounded-full text-[12px] tracking-[0.3em] font-medium hover:bg-white/10 transition-all duration-500 w-full md:w-auto uppercase">
              Private Inquiry
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 hidden md:block"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 to-white/40" />
      </motion.div>
    </section>
  );
}
