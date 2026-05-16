import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, Truck, Lock } from 'lucide-react';
import { SECURITY_PACKAGES } from '../constants';
import { cn } from '../lib/utils';

interface SecurityPageProps {
  onContact: (service?: string) => void;
}

export default function SecurityPage({ onContact }: SecurityPageProps) {
  return (
    <div className="bg-black-pure pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="text-center mb-24"
        >
          <span className="text-[11px] tracking-[0.5em] text-gold uppercase font-bold block mb-8">EXECUTIVE PROTECTION</span>
          <h1 className="font-serif text-5xl md:text-7xl italic font-light text-white mb-6">Tactical Discretion</h1>
          <p className="text-silver text-[15px] max-w-2xl mx-auto tracking-widest uppercase font-light leading-relaxed">
            State-level security coordination for high-profile transit and personal safety.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {SECURITY_PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#111111] border border-white/5 rounded-3xl p-10 flex flex-col h-full group hover:border-gold/30 transition-all duration-500"
            >
              <div className="mb-12 flex justify-between items-start">
                 <div className="p-4 rounded-2xl bg-white/5 text-gold group-hover:bg-gold group-hover:text-black transition-all duration-500">
                    {pkg.tier === 'Standard' && <UserCheck size={28} strokeWidth={1} />}
                    {pkg.tier === 'Premium' && <ShieldCheck size={28} strokeWidth={1} />}
                    {pkg.tier === 'Presidential' && <Lock size={28} strokeWidth={1} />}
                    {pkg.tier === 'Escort' && <Truck size={28} strokeWidth={1} />}
                 </div>
                 <span className="text-[10px] tracking-[0.3em] text-dim font-bold uppercase">{pkg.tier} TIER</span>
              </div>
              
              <h3 className="font-serif text-3xl text-white mb-4 italic">{pkg.name}</h3>
              <p className="text-silver text-[13px] mb-8 font-light leading-relaxed tracking-wide min-h-[3rem]">
                {pkg.description}
              </p>

              <div className="flex-1 space-y-4 mb-12">
                 {pkg.features.map((feature, i) => (
                   <div key={i} className="flex items-center space-x-3">
                      <div className="w-1 h-1 rounded-full bg-gold/50" />
                      <span className="text-dim text-[11px] tracking-widest uppercase">{feature}</span>
                   </div>
                 ))}
              </div>

              <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                 <span className="font-serif text-xl text-white italic">{pkg.price}</span>
                 <button
                   type="button"
                   onClick={() => onContact(pkg.name)}
                   className="text-[10px] tracking-[0.2em] font-bold text-gold hover:text-white transition-colors uppercase"
                 >
                    Inquire Now
                 </button>
              </div>
            </motion.div>
          ))}
        </div>

        <section className="bg-gradient-to-br from-zinc-900 to-black rounded-[3rem] overflow-hidden border border-white/10 relative">
           <div className="absolute inset-0 bg-black/40" />
           <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center p-12 md:p-24">
              <div className="space-y-8">
                 <span className="text-[11px] tracking-[0.5em] text-gold font-bold uppercase block">PRESIDENTIAL ESCORT</span>
                 <h2 className="font-serif text-4xl md:text-6xl italic font-light text-white leading-tight">
                    The Security Convoy
                 </h2>
                 <p className="text-silver text-[16px] font-light leading-relaxed tracking-wide">
                    Our Presidential Escort service provides a black luxury truck security convoy, 
                    ensuring maximum visibility protection or discrete high-speed transit. 
                    Coordinated by former government-level protection specialists.
                 </p>
                 <button
                   type="button"
                   onClick={() => onContact('Presidential Escort')}
                   className="bg-white text-black px-12 py-4 rounded-full text-[11px] tracking-[0.4em] font-bold hover:bg-gold hover:text-white transition-all shadow-2xl"
                 >
                    REQUEST CONVOY
                 </button>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                 <img src="/images/banner.jpg" alt="Security SUV" className="w-full h-full object-cover" />
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
