import React from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onBrowseFleet: () => void;
  onContact: () => void;
}

export default function Hero({ onBrowseFleet, onContact }: HeroProps) {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Media */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-20" />
        <img 
  src="/images/banner.jpg" 
  alt="Luxury Car Profile"  
  className="absolute inset-0 w-full h-full object-cover object-center scale-110 md:scale-100"
/>
      </div>

      {/* Content */}
      <div className="relative z-30 text-center px-6 max-w-5xl py-20 md:py-0">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-[12px] md:text-[14px] tracking-[0.6em] text-silver font-light uppercase block mb-6">
            ESTABLISHED IN DISCRETION
          </span>
          <h1 className="font-serif text-[48px] md:text-[72px] font-[100] leading-tight mb-8 md:mb-10 tracking-tight text-white/90 max-w-3xl mx-auto" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 200 }}>
            <span className="block">Reserved For The</span>
<span className="block italic">Exceptional</span>
          </h1>
          <p className="text-[14px] font-[400] leading-[22.75px] max-w-2xl mx-auto mb-12 tracking-widest px-4 md:px-0" style={{ fontFamily: '"Inter", sans-serif', color: 'rgba(255, 255, 255, 0.5)' }}>
            Luxury is not simply what we provide, it is how we operate: quiet, flawlessly and without compromise.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4">
            <button 
              onClick={onBrowseFleet}
              className="bg-white text-black px-8 md:px-10 py-4 rounded-sm text-[12px] tracking-[0.3em] font-bold hover:bg-gold hover:text-white transition-all duration-500 w-full md:w-auto"
            >
              BROWSE FLEET
            </button>
            <button 
              onClick={onContact}
              className="bg-transparent text-white px-8 md:px-10 py-4 rounded-sm text-[12px] tracking-[0.3em] font-medium hover:text-gold hover:bg-white/10 transition-all duration-500 w-full md:w-auto uppercase"
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
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-white/0 to-white/40" />
      </motion.div>
    </section>
  );
}
