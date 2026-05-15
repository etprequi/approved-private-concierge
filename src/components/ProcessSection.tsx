import React from 'react';
import { motion } from 'motion/react';

export default function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'DISCOVERY',
      desc: 'Connect with our specialists for a private consultation on your aviation, fleet, or security requirements.'
    },
    {
      num: '02',
      title: 'CURATION',
      desc: 'We tailor a bespoke itinerary and ensemble, matching your exact standards for timing, assets, and personnel.'
    },
    {
      num: '03',
      title: 'EXECUTION',
      desc: 'Every detail is flawlessly managed with absolute discretion. Access granted. Mission complete.'
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-black-pure">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-[11px] tracking-[0.6em] text-gold uppercase mb-6 block font-bold">THE PROTOCOL</span>
          <h2 className="font-serif text-5xl md:text-7xl italic font-light tracking-tight text-white">Quietly Flawless</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-16 md:gap-24 relative">
          {/* Divider lines for desktop */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[1px] bg-white/[0.05]" />
          
          {steps.map((step) => (
            <div key={step.num} className="text-center group relative">
              <span className="font-serif text-8xl md:text-9xl text-white/[0.03] absolute -top-8 left-1/2 -translate-x-1/2 group-hover:text-gold/[0.05] transition-colors duration-700">
                {step.num}
              </span>
              <div className="relative z-10">
                 <h3 className="text-[12px] tracking-[0.4em] font-bold text-white mb-6 mt-12">{step.title}</h3>
                 <p className="text-silver text-[14px] leading-relaxed font-light tracking-wider max-w-[280px] mx-auto">
                   {step.desc}
                 </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
