import React from 'react';
import { motion } from 'motion/react';

export default function AboutPage() {
  return (
    <div className="bg-black-pure text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <header className="mb-24 text-center">
            <span className="text-[11px] tracking-[0.5em] text-gold uppercase font-bold block mb-8">QUIET LUXURY · ABSOLUTE DISCRETION</span>
            <h1 className="font-serif text-5xl md:text-7xl italic font-light mb-12">The Approved Ethos</h1>
            <div className="w-24 h-[1px] bg-gold/30 mx-auto" />
          </header>

          <section className="space-y-16 text-[16px] md:text-[18px] font-light leading-relaxed tracking-wide text-silver text-center">
            <p className="font-serif text-3xl md:text-4xl italic text-white mb-12 leading-snug max-w-3xl mx-auto">
              “At APPROVED Private Concierge, discretion is the ultimate luxury.”
            </p>

            <p>
              Designed for an elite clientele who value privacy, exclusivity, and impeccable service, we deliver bespoke concierge and lifestyle management with absolute confidentiality and precision.
            </p>

            <p>
              We understand that true luxury is not loud — it is seamless, private, and effortlessly executed. From private aviation and luxury travel to VIP access, personal security coordination, fine dining reservations, estate services, and highly personalized requests, every detail is handled with sophistication, efficiency, and unwavering discretion.
            </p>

            <div className="py-24">
              <p className="font-serif text-3xl md:text-4xl text-gold mb-8 italic">
                “This is not a service built for everyone — and that is intentional.”
              </p>
              <div className="w-12 h-[1px] bg-gold/20 mx-auto" />
            </div>

            <p>
              Our clients include high-net-worth individuals, executives, public figures, athletes, and those accustomed to operating at the highest level. With 24/7 white-glove support, APPROVED Private Concierge ensures every experience is curated to the highest standard while maintaining the privacy and trust our clientele expect.
            </p>

            <p className="font-serif text-2xl italic border-y border-white/5 py-12">
               “APPROVED was built for those who understand that true luxury is not status displayed to the public — it is access granted to a select few.”
            </p>

            <p>
              Luxury is not simply what we provide — it is how we operate: quietly, flawlessly, and without compromise. In a world where exclusivity is often imitated, we remain intentionally private, highly selective, and dedicated to serving individuals who expect nothing short of excellence.
            </p>

            <div className="pt-24 pb-12">
               <span className="text-[10px] tracking-[0.6em] text-silver uppercase font-bold mb-8 block">ESTABLISHED FOR THE ELITE</span>
               <p className="text-dim text-[14px] italic max-w-2xl mx-auto">
                 APPROVED Private Concierge exists for individuals who operate at a different level, where trust is currency, discretion is expected, and luxury is measured not by visibility, but by access, ease, and exceptional standards.
               </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
