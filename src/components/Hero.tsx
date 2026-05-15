import React from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onBrowseFleet: () => void;
  onContact: () => void;
}

export default function Hero({ onBrowseFleet, onContact }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Media */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-20" />
        <img 
          src="/images/banner.jpg" 
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
          <h1 className="font-serif text-[72px] font-[300] leading-tight mb-10 tracking-tight text-white/90 max-w-3xl mx-auto" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
            <span className="block">Reserved for t he <span className="italic">Exceptional</span></span>
          </h1>
          <p className="text-[14px] font-[400] leading-[22.75px] max-w-2xl mx-auto mb-12 tracking-widest" style={{ fontFamily: '"Inter", sans-serif', color: 'rgba(255, 255, 255, 0.5)' }}>
            Luxury is not simply what we provide, it is how we operate: quiet, flawlessly and without compromise.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={onBrowseFleet}
              className="bg-white text-black px-10 py-4 rounded-sm text-[12px] tracking-[0.3em] font-bold hover:bg-gold hover:text-white transition-all duration-500 w-full md:w-auto"
            >
              BROWSE FLEET
            </button>
            <button 
              onClick={onContact}
              className="bg-transparent text-white px-10 py-4 rounded-sm text-[12px] tracking-[0.3em] font-medium hover:text-gold hover:bg-white/10 transition-all duration-500 w-full md:w-auto uppercase"
            >
              CONTACT US
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
