import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, MapPin, CreditCard, ChevronRight } from 'lucide-react';
import { Vehicle, Addon } from '../types';
import { ADDONS } from '../constants';
import { fmtMoney, cn } from '../lib/utils';

interface BookingModalProps {
  vehicle: Vehicle;
  onClose: () => void;
  onConfirm: (data: any) => void;
}

export default function BookingModal({ vehicle, onClose, onConfirm }: BookingModalProps) {
  const [step, setStep] = React.useState(1);
  const [dates, setDates] = React.useState({ start: '', end: '' });
  const [selectedAddons, setSelectedAddons] = React.useState<string[]>([]);
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pickup: '',
    dropoff: '',
    payment: 'card'
  });

  const nights = React.useMemo(() => {
    if (!dates.start || !dates.end) return 1;
    const a = new Date(dates.start);
    const b = new Date(dates.end);
    return Math.max(1, Math.round((b.getTime() - a.getTime()) / 86400000));
  }, [dates]);

  const total = React.useMemo(() => {
    const base = vehicle.dailyRate * nights;
    const extras = selectedAddons.reduce((sum, id) => {
      const a = ADDONS.find(x => x.id === id);
      if (!a) return sum;
      return sum + (a.unit === 'per_day' ? a.price * nights : a.price);
    }, 0);
    return base + extras;
  }, [vehicle, nights, selectedAddons]);

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col md:flex-row h-full max-h-[90vh]"
      >
        {/* Left Sidebar - Summary */}
        <div className="md:w-1/3 bg-[#111] p-10 border-r border-white/5 flex flex-col justify-between overflow-y-auto">
          <div>
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase mb-6 block font-bold">YOUR RESERVATION</span>
            <div className="aspect-video rounded-2xl overflow-hidden mb-8">
              <img src={vehicle.photo} className="w-full h-full object-cover" />
            </div>
            <h2 className="font-serif text-3xl mb-2">{vehicle.make} {vehicle.model}</h2>
            <p className="text-silver text-[12px] tracking-[0.2em] uppercase font-light mb-10">{vehicle.year} · {vehicle.color}</p>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center text-[12px] font-medium tracking-wide">
                <span className="text-silver uppercase tracking-widest text-[10px]">DURATION</span>
                <span>{nights} DAY{nights > 1 ? 'S' : ''}</span>
              </div>
              <div className="flex justify-between items-center text-[12px] font-medium tracking-wide">
                <span className="text-silver uppercase tracking-widest text-[10px]">BASE RATE</span>
                <span>{fmtMoney(vehicle.dailyRate * nights)}</span>
              </div>
              {selectedAddons.length > 0 && (
                <div className="pt-4 border-t border-white/5 space-y-4">
                  {selectedAddons.map(id => {
                    const addon = ADDONS.find(x => x.id === id);
                    return (
                      <div key={id} className="flex justify-between items-center text-[12px] font-medium tracking-wide">
                        <span className="text-silver uppercase tracking-widest text-[10px]">{addon?.name}</span>
                        <span>{fmtMoney(addon?.unit === 'per_day' ? addon.price * nights : addon!.price)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex justify-between items-end mb-2">
               <span className="text-silver uppercase tracking-[0.3em] text-[11px] font-bold">TOTAL PRICE</span>
               <span className="font-serif text-4xl text-white">{fmtMoney(total)}</span>
            </div>
            <p className="text-[10px] text-dim tracking-[0.1em] text-right font-light italic">Includes all taxes and fees</p>
          </div>
        </div>

        {/* Right Section - Steps */}
        <div className="flex-1 p-10 relative overflow-y-auto bg-black-rich">
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 text-silver hover:text-white transition-colors"
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          <div className="max-w-xl mx-auto">
            <div className="flex space-x-12 mb-16">
              {[1, 2, 3].map(i => (
                <div key={i} className={cn(
                  "relative flex flex-col items-center",
                  step >= i ? "text-white" : "text-dim"
                )}>
                  <span className="text-[10px] tracking-[0.4em] font-bold uppercase mb-2">STEP 0{i}</span>
                  <div className={cn(
                    "w-12 h-[1px] transition-all duration-700",
                    step >= i ? "bg-gold" : "bg-white/10"
                  )} />
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="font-serif text-4xl mb-12 italic font-light">Select Your Journey</h3>
                  <div className="grid grid-cols-2 gap-8 mb-12">
                    <div>
                      <label className="text-[10px] tracking-[0.4em] text-silver font-bold uppercase mb-4 block">START DATE</label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-dim" size={16} />
                        <input 
                          type="date" 
                          value={dates.start}
                          onChange={(e) => setDates(prev => ({ ...prev, start: e.target.value }))}
                          className="w-full bg-white/[0.03] border border-white/5 py-4 pl-16 pr-6 rounded-2xl outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.4em] text-silver font-bold uppercase mb-4 block">END DATE</label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-dim" size={16} />
                        <input 
                          type="date" 
                          value={dates.end}
                          onChange={(e) => setDates(prev => ({ ...prev, end: e.target.value }))}
                          className="w-full bg-white/[0.03] border border-white/5 py-4 pl-16 pr-6 rounded-2xl outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <label className="text-[10px] tracking-[0.4em] text-silver font-bold uppercase mb-6 block">PREMIUM ADD-ONS</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {ADDONS.map(addon => (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={cn(
                          "flex justify-between items-center p-6 rounded-2xl border transition-all duration-300 text-left",
                          selectedAddons.includes(addon.id) 
                            ? "bg-white/5 border-gold shadow-lg shadow-gold/5" 
                            : "bg-white/[0.02] border-white/5 hover:border-white/20"
                        )}
                      >
                        <div>
                          <p className="text-[11px] font-bold tracking-[0.1em] mb-1">{addon.name}</p>
                          <p className="text-[10px] text-silver tracking-widest">{addon.unit.toUpperCase().replace('_', ' ')}</p>
                        </div>
                        <span className="text-[11px] font-medium text-gold">{fmtMoney(addon.price)}</span>
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={next}
                    className="w-full py-5 bg-white text-black rounded-full text-[11px] font-bold tracking-[0.3em] hover:bg-gold hover:text-white transition-all duration-500 flex items-center justify-center space-x-4"
                  >
                    <span>CONTINUE TO DETAILS</span>
                    <ChevronRight size={16} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="font-serif text-4xl mb-12 italic font-light">Client Information</h3>
                  <div className="grid grid-cols-2 gap-6 mb-8">
                     <input 
                       placeholder="FIRST NAME" 
                       className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl text-[11px] tracking-widest outline-none focus:border-gold/50"
                       value={form.firstName}
                       onChange={e => setForm({...form, firstName: e.target.value})}
                     />
                     <input 
                       placeholder="LAST NAME" 
                       className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl text-[11px] tracking-widest outline-none focus:border-gold/50"
                       value={form.lastName}
                       onChange={e => setForm({...form, lastName: e.target.value})}
                     />
                  </div>
                  <div className="space-y-6 mb-12">
                     <input 
                       placeholder="EMAIL ADDRESS" 
                       className="w-full bg-white/[0.03] border border-white/5 p-5 rounded-2xl text-[11px] tracking-widest outline-none focus:border-gold/50"
                       value={form.email}
                       onChange={e => setForm({...form, email: e.target.value})}
                     />
                     <input 
                       placeholder="PHONE NUMBER" 
                       className="w-full bg-white/[0.03] border border-white/5 p-5 rounded-2xl text-[11px] tracking-widest outline-none focus:border-gold/50"
                       value={form.phone}
                       onChange={e => setForm({...form, phone: e.target.value})}
                     />
                  </div>

                  <h4 className="text-[10px] tracking-[0.4em] text-silver font-bold uppercase mb-6">LOGISTICS</h4>
                  <div className="space-y-6 mb-12">
                     <div className="relative">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-dim" size={16} />
                        <input 
                          placeholder="PICKUP LOCATION" 
                          className="w-full bg-white/[0.03] border border-white/5 py-5 pl-16 pr-6 rounded-2xl text-[11px] tracking-widest outline-none focus:border-gold/50"
                          value={form.pickup}
                          onChange={e => setForm({...form, pickup: e.target.value})}
                        />
                     </div>
                     <div className="relative">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-dim" size={16} />
                        <input 
                          placeholder="DROPOFF LOCATION" 
                          className="w-full bg-white/[0.03] border border-white/5 py-5 pl-16 pr-6 rounded-2xl text-[11px] tracking-widest outline-none focus:border-gold/50"
                          value={form.dropoff}
                          onChange={e => setForm({...form, dropoff: e.target.value})}
                        />
                     </div>
                  </div>

                  <div className="flex space-x-6">
                    <button 
                      onClick={back}
                      className="flex-1 py-5 border border-white/10 text-white rounded-full text-[11px] font-bold tracking-[0.3em] hover:bg-white/5 transition-all"
                    >
                      BACK
                    </button>
                    <button 
                      onClick={next}
                      className="flex-[2] py-5 bg-white text-black rounded-full text-[11px] font-bold tracking-[0.3em] hover:bg-gold hover:text-white transition-all"
                    >
                      CONTINUE TO PAYMENT
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="font-serif text-4xl mb-12 italic font-light">Secure Reservation</h3>
                  
                  <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 mb-12">
                    <div className="flex items-center space-x-4 mb-8">
                       <CreditCard className="text-gold" size={24} />
                       <span className="text-[12px] tracking-[0.2em] font-bold">SELECT PAYMENT METHOD</span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                       <button 
                         onClick={() => setForm({...form, payment: 'card'})}
                         className={cn(
                           "flex justify-between items-center p-6 rounded-2xl border transition-all",
                           form.payment === 'card' ? "bg-white/5 border-gold" : "bg-transparent border-white/5"
                         )}
                       >
                         <span className="text-[11px] font-bold tracking-[0.1em]">CREDIT / DEBIT CARD</span>
                         {form.payment === 'card' && <div className="w-2 h-2 rounded-full bg-gold" />}
                       </button>
                       <button 
                         onClick={() => setForm({...form, payment: 'cash'})}
                         className={cn(
                           "flex justify-between items-center p-6 rounded-2xl border transition-all",
                           form.payment === 'cash' ? "bg-white/5 border-gold" : "bg-transparent border-white/5"
                         )}
                       >
                         <span className="text-[11px] font-bold tracking-[0.1em]">PAY ON ARRIVAL</span>
                         {form.payment === 'cash' && <div className="w-2 h-2 rounded-full bg-gold" />}
                       </button>
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl border border-gold/20 bg-gold/[0.02] mb-12 text-center">
                     <p className="text-[11px] text-silver tracking-widest mb-2 font-light italic">Immediate Deposit Required</p>
                     <p className="font-serif text-3xl font-medium text-gold">{fmtMoney(vehicle.deposit)}</p>
                  </div>

                  <div className="flex space-x-6">
                    <button 
                      onClick={back}
                      className="flex-1 py-5 border border-white/10 text-white rounded-full text-[11px] font-bold tracking-[0.3em] hover:bg-white/5 transition-all"
                    >
                      BACK
                    </button>
                    <button 
                      onClick={() => onConfirm({ vehicle, dates, addons: selectedAddons, form, total })}
                      className="flex-[2] py-5 bg-gold text-white rounded-full text-[11px] font-bold tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-xl shadow-gold/20"
                    >
                      CONFIRM RESERVATION
                    </button>
                  </div>
                  
                  <p className="text-[9px] text-dim text-center mt-8 tracking-[0.1em] font-light italic">
                    By clicking confirm, you agree to our terms and conditions.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
