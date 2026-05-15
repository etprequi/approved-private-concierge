import React from 'react';
import Hero from '../components/Hero';
import ProcessSection from '../components/ProcessSection';
import VehicleCard from '../components/VehicleCard';
import FleetFilter from '../components/FleetFilter';
import { Vehicle } from '../types';
import { motion } from 'motion/react';

interface LandingPageProps {
  vehicles: Vehicle[];
  onBook: (v: Vehicle) => void;
  onViewFleet: () => void;
}

export default function LandingPage({ vehicles, onBook, onViewFleet }: LandingPageProps) {
  const featuredVehicles = vehicles.filter(v => v.category !== 'Jet').slice(0, 3);
  
  return (
    <div className="bg-black-rich min-h-screen">
      <Hero onCtaClick={onViewFleet} />
      
      {/* Featured Section */}
      <section className="py-32 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 space-y-8 md:space-y-0 text-center md:text-left">
            <div>
              <span className="text-[11px] tracking-[0.6em] text-gold uppercase mb-6 block font-bold">THE CORE COLLECTION</span>
              <h2 className="font-serif text-5xl md:text-7xl italic font-light tracking-tight text-white">Elite Automotive</h2>
            </div>
            <button 
              onClick={onViewFleet}
              className="px-10 py-4 border border-white/10 rounded-full text-[11px] tracking-[0.4em] font-medium hover:bg-white hover:text-black transition-all duration-500 uppercase"
            >
              Browse Full Fleet
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {featuredVehicles.map((vehicle, idx) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
              >
                <VehicleCard 
                   vehicle={vehicle} 
                   onSelect={(v) => console.log('Select', v)}
                   onBook={onBook} 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Aviation Teaser */}
      <section className="py-32 px-6 md:px-12 bg-black-pure border-b border-white/5">
        <div className="max-w-7xl mx-auto">
           <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="order-2 md:order-1">
                 <div className="rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=80" alt="Private Jet" className="w-full h-full object-cover aspect-[4/5]" />
                 </div>
              </div>
              <div className="order-1 md:order-2 space-y-10">
                 <span className="text-[11px] tracking-[0.6em] text-gold font-bold uppercase">ABOVE THE CLOUDS</span>
                 <h2 className="font-serif text-5xl md:text-7xl italic font-light text-white leading-tight">Private Aviation</h2>
                 <p className="text-silver text-[18px] font-light leading-relaxed tracking-wide">
                    Access a curated fleet of Standard, Mid-tier, and Presidential class jets. 
                    Our aviation partners provide global reach with absolute discretion.
                 </p>
                 <div className="space-y-4 pt-4">
                    {['Global Fleet Access', 'Discrete Terminal Entry', 'Bespoke In-Flight Service'].map(f => (
                      <div key={f} className="flex items-center space-x-4">
                         <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                         <span className="text-[11px] tracking-[0.3em] font-medium text-silver uppercase">{f}</span>
                      </div>
                    ))}
                 </div>
                 <button className="bg-white text-black px-12 py-4 rounded-full text-[11px] tracking-[0.3em] font-bold hover:bg-gold hover:text-white transition-all shadow-xl uppercase">
                    View Aircraft
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="py-40 px-6 text-center border-b border-white/5 bg-gradient-to-b from-black-pure to-black-rich">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="max-w-4xl mx-auto"
         >
            <p className="font-serif text-3xl md:text-5xl italic text-white leading-snug mb-12">
               “APPROVED was built for those who understand that true luxury is not status displayed to the public — it is access granted to a select few.”
            </p>
            <div className="w-24 h-[1px] bg-gold/30 mx-auto" />
         </motion.div>
      </section>

      {/* Security Teaser */}
      <section className="py-32 px-6 md:px-12 bg-black-rich">
        <div className="max-w-7xl mx-auto">
           <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                 <span className="text-[11px] tracking-[0.6em] text-gold font-bold uppercase">UNWAVERING PROTECTION</span>
                 <h2 className="font-serif text-5xl md:text-7xl italic font-light text-white leading-tight">Executive Protection</h2>
                 <p className="text-silver text-[18px] font-light leading-relaxed tracking-wide">
                    From armed close protection to presidential escort convoys. 
                    Your safety is managed with tactical precision and absolute confidentiality.
                 </p>
                 <button className="border border-white/20 text-white px-12 py-4 rounded-full text-[11px] tracking-[0.4em] font-bold hover:bg-white hover:text-black transition-all uppercase">
                    Security Enquiries
                 </button>
              </div>
              <div>
                 <div className="rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl relative">
                    <div className="absolute inset-0 bg-black/20" />
                    <img src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1200&q=80" alt="Security SUV" className="w-full h-full object-cover aspect-[4/5]" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      <ProcessSection />

      {/* Experience CTA */}
      <section className="py-40 px-6 text-center bg-black-pure relative overflow-hidden">
         <div className="absolute inset-0 bg-gold/5 opacity-30 pointer-events-none" />
         <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="max-w-4xl mx-auto relative z-10"
         >
           <h2 className="font-serif text-5xl md:text-7xl mb-12 italic tracking-tight text-white">Entry into Exclusivity</h2>
           <p className="text-silver text-[16px] md:text-[18px] mb-16 font-light leading-relaxed tracking-widest max-w-2xl mx-auto uppercase">
             NOT ADVERTISED. NOT ACCESSIBLE. <br />
             NOT FOR EVERYONE.
           </p>
           <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-10">
             <button 
               onClick={onViewFleet}
               className="bg-white text-black px-16 py-5 rounded-full text-[12px] tracking-[0.4em] font-bold hover:bg-gold hover:text-white transition-all duration-500 w-full md:w-auto shadow-2xl"
             >
               MEMBER ACCESS
             </button>
             <button className="text-white border border-white/10 px-16 py-5 rounded-full text-[12px] tracking-[0.4em] font-medium hover:bg-white/10 transition-all duration-500 w-full md:w-auto uppercase">
               Concierge Desk
             </button>
           </div>
         </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 md:px-12 border-t border-white/5 bg-black-pure relative z-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-20">
          <div className="md:col-span-1">
             <div className="flex flex-col mb-10">
               <span className="font-serif text-3xl tracking-[0.2em] font-medium text-white uppercase">APPROVED</span>
               <span className="text-[10px] tracking-[0.5em] text-gold font-light uppercase">Private Concierge</span>
             </div>
             <p className="text-silver text-[14px] font-light leading-relaxed tracking-wide italic">
               Exclusivity by design. Discretion by demand. We represent individuals who operate at the highest level.
             </p>
          </div>
          
          <div>
            <h4 className="text-[11px] tracking-[0.4em] font-bold mb-10 uppercase text-white">Directory</h4>
            <ul className="space-y-5">
              {['Aviation', 'Fleet', 'Protection', 'Estates', 'Lifestyle'].map(item => (
                <li key={item}><a href="#" className="text-silver text-[12px] tracking-[0.2em] hover:text-gold transition-colors uppercase font-medium">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
             <h4 className="text-[11px] tracking-[0.4em] font-bold mb-10 uppercase text-white">Identity</h4>
             <ul className="space-y-5">
               {['About Ethos', 'Membership', 'Confidentiality', 'Global Reach'].map(item => (
                 <li key={item}><a href="#" className="text-silver text-[12px] tracking-[0.2em] hover:text-gold transition-colors uppercase font-medium">{item}</a></li>
               ))}
             </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.4em] font-bold mb-10 uppercase text-white">Confidential Channel</h4>
            <p className="text-silver text-[12px] font-light mb-8 tracking-widest uppercase">Request a private encrypted communication channel.</p>
            <div className="flex bg-[#0f0f0f] border border-white/5 p-1 rounded-full group focus-within:border-gold/30 transition-all">
              <input 
                type="email" 
                placeholder="EMAIL@CLIENT.COM" 
                className="bg-transparent border-none text-[10px] px-8 focus:ring-0 w-full tracking-[0.2em]" 
              />
              <button className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] hover:bg-gold hover:text-white transition-all uppercase">
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-32 text-center border-t border-white/5 mt-32 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-[9px] tracking-[0.5em] text-dim uppercase">© 2026 APPROVED PRIVATE CONCIERGE. NO PART MAY BE REPRODUCED WITHOUT WRITTEN CONSENT.</p>
          <div className="flex space-x-12">
             {['TERMS', 'PRIVACY', 'CONDUCT'].map(l => (
               <a key={l} href="#" className="text-[9px] tracking-[0.3em] text-dim hover:text-gold transition-colors uppercase font-bold">{l}</a>
             ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
