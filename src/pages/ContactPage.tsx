import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, User, MessageSquare } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

interface ContactPageProps {
  selectedService?: string;
}

export default function ContactPage({ selectedService }: ContactPageProps) {
  const [state, handleSubmit] = useForm('xvzypqre');

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-black-rich min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_0.7fr] items-center">
          <div>
            <span className="text-[11px] tracking-[0.6em] text-gold uppercase font-bold mb-6 inline-block">PRIVATE INQUIRY</span>
            <h1 className="font-serif text-5xl md:text-6xl italic text-white leading-tight mb-8">Contact Us Confidentially</h1>
            <p className="text-silver text-[18px] leading-relaxed tracking-wide max-w-2xl">
              Send your request, preferred dates, and requirements. Our concierge team will review it and reach back out to you directly.
            </p>
            <div className="mt-16 space-y-8">
              {selectedService && (
                <div className="rounded-3xl bg-white/5 border border-white/10 p-6 text-white">
                  <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-gold mb-3">Selected Service</p>
                  <p className="text-[14px] leading-relaxed">{selectedService}</p>
                </div>
              )}
              {[
                { icon: Mail, label: 'Private Channel', value: 'approvedprivateconcierge@gmail.com' },
                { icon: User, label: 'Member Services', value: '+1 (305) 555-0198' },
                { icon: MessageSquare, label: 'Response Window', value: 'Under 2 business hours' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 text-silver">
                  <item.icon className="text-gold mt-1" size={20} />
                  <div>
                    <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-white/70">{item.label}</p>
                    <p className="text-[14px] font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#111111] border border-white/5 rounded-[2rem] p-10 shadow-2xl">
            <h2 className="font-serif text-3xl text-white mb-6">Request Contact</h2>
            {state.succeeded ? (
              <div className="rounded-3xl bg-green-500/10 border border-green-500/20 p-8 text-center text-white">
                <p className="font-semibold text-lg mb-4">Request received.</p>
                <p className="text-[14px] text-silver leading-relaxed">Our concierge team will review your inquiry and get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="First Name"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-3xl py-4 px-5 text-[11px] tracking-[0.2em] outline-none focus:border-gold/50"
                    />
                    <ValidationError field="firstName" errors={state.errors} className="text-red-400 text-[11px] mt-1 px-2" />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="Last Name"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-3xl py-4 px-5 text-[11px] tracking-[0.2em] outline-none focus:border-gold/50"
                    />
                    <ValidationError field="lastName" errors={state.errors} className="text-red-400 text-[11px] mt-1 px-2" />
                  </div>
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-3xl py-4 px-5 text-[11px] tracking-[0.2em] outline-none focus:border-gold/50"
                  />
                  <ValidationError field="email" errors={state.errors} className="text-red-400 text-[11px] mt-1 px-2" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone Number"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-3xl py-4 px-5 text-[11px] tracking-[0.2em] outline-none focus:border-gold/50"
                />
                {selectedService && (
                  <input type="hidden" name="service" value={selectedService} />
                )}
                <div>
                  <textarea
                    name="message"
                    required
                    placeholder="Message / Inquiry Details"
                    defaultValue={selectedService ? `I would like to inquire about: ${selectedService}` : ''}
                    className="w-full min-h-[180px] bg-white/[0.03] border border-white/5 rounded-3xl py-4 px-5 text-[11px] tracking-[0.2em] outline-none focus:border-gold/50 resize-none"
                  />
                  <ValidationError field="message" errors={state.errors} className="text-red-400 text-[11px] mt-1 px-2" />
                </div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full py-5 rounded-3xl bg-gold text-black font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all disabled:opacity-50"
                >
                  {state.submitting ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}