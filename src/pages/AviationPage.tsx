import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, ChevronRight, Gauge, Wind, Users } from 'lucide-react';
import { AVIATION_FLEET } from '../constants';
import { cn } from '../lib/utils';

type JetTier = 'All' | 'Standard' | 'Mid-Tier' | 'Presidential';

export default function AviationPage() {
  const [activeTier, setActiveTier] = useState<JetTier>('All');

  const filteredFleet = AVIATION_FLEET.filter(jet => {
    if (activeTier === 'All') return true;
    return jet.features.some(f => f.includes(activeTier));
  });

  const tiers: JetTier[] = ['All', 'Standard', 'Mid-Tier', 'Presidential'];

  return (
    <div className="bg-black-pure pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[11px] tracking-[0.5em] text-gold uppercase font-bold block mb-8">GLOBAL AVIATION HUB</span>
            <h1 className="font-serif text-5xl md:text-7xl italic font-light text-white mb-6">Wings of Discretion</h1>
            <p className="text-silver text-[15px] max-w-2xl mx-auto tracking-widest uppercase font-light leading-relaxed">
              Travel above the noise. Private charter solutions for those who value time and privacy.
            </p>
          </motion.div>
        </header>

        {/* Tier Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {tiers.map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={cn(
                "px-8 py-3 rounded-full text-[10px] tracking-[0.3em] font-bold transition-all border",
                activeTier === tier 
                  ? "bg-white text-black border-white" 
                  : "bg-transparent text-silver border-white/10 hover:border-gold/50"
              )}
            >
              {tier.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {filteredFleet.map((jet, idx) => (
            <motion.div
              key={jet.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-[2.5rem] bg-[#0c0c0c] border border-white/5 hover:border-gold/20 transition-all duration-700"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={jet.photo} 
                  alt={jet.model} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              <div className="p-10 relative">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="font-serif text-4xl text-white italic mb-2 tracking-tight">{jet.make} {jet.model}</h3>
                    <div className="flex flex-wrap gap-2">
                       {jet.features.map((feat, i) => (
                         <span key={i} className="text-[9px] tracking-[0.2em] font-bold text-gold uppercase px-2 py-1 rounded bg-gold/5 border border-gold/10">
                            {feat}
                         </span>
                       ))}
                    </div>
                  </div>
                  <Plane className="text-white/20 group-hover:text-gold transition-colors" size={32} strokeWidth={1} />
                </div>

                <div className="grid grid-cols-3 gap-8 mb-10 py-8 border-y border-white/5">
                   <div className="text-center">
                      <Users size={18} className="text-silver mx-auto mb-2" strokeWidth={1} />
                      <p className="text-white text-[14px] font-medium">{jet.seats}</p>
                      <p className="text-dim text-[8px] tracking-[0.2em] uppercase">Capacity</p>
                   </div>
                   <div className="text-center">
                      <Gauge size={18} className="text-silver mx-auto mb-2" strokeWidth={1} />
                      <p className="text-white text-[14px] font-medium">High</p>
                      <p className="text-dim text-[8px] tracking-[0.2em] uppercase">Cruising</p>
                   </div>
                   <div className="text-center">
                      <Wind size={18} className="text-silver mx-auto mb-2" strokeWidth={1} />
                      <p className="text-white text-[14px] font-medium">Bespoke</p>
                      <p className="text-dim text-[8px] tracking-[0.2em] uppercase">Range</p>
                   </div>
                </div>

                <div className="flex justify-between items-center">
                   <p className="text-silver text-[12px] font-light italic max-w-[60%] line-clamp-2">
                      {jet.description}
                   </p>
                   <button className="bg-white text-black px-10 py-3 rounded-full text-[10px] font-bold tracking-[0.3em] hover:bg-gold hover:text-white transition-all shadow-xl">
                      CHARTER NOW
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inquiry CTA */}
        <section className="mt-32 p-16 rounded-[3rem] border border-white/10 bg-white/[0.02] text-center max-w-4xl mx-auto">
           <span className="text-[11px] tracking-[0.4em] text-dim uppercase block mb-8">CUSTOM MISSION COORDINATION</span>
           <h2 className="font-serif text-4xl italic mb-12">Looking for a specific airframe?</h2>
           <p className="text-silver text-[15px] font-light leading-relaxed mb-12 tracking-wide">
             Not all aircraft are visible. Our global network grants access to presidential-scale jets and specialized helicopters globally. Our flight coordination team is available 24/7.
           </p>
           <button className="bg-white/5 border border-white/10 text-white px-12 py-4 rounded-full text-[11px] tracking-[0.4em] font-bold hover:bg-white hover:text-black transition-all">
              CONTACT FLIGHT DESK
           </button>
        </section>
      </div>
    </div>
  );
}
