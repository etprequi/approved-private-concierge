import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  MapPin, 
  CreditCard, 
  History, 
  Settings, 
  Calendar, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { cn, fmtMoney, fmtDate } from '../lib/utils';

interface CustomerDashboardProps {
  onLogout: () => void;
}

export default function CustomerDashboard({ onLogout }: CustomerDashboardProps) {
  const [activeTab, setActiveTab ] = useState('overview');

  const user = {
    firstName: 'Cassie',
    lastName: 'Arandel',
    email: 'Arandel.Cassie@gmail.com',
    phone: '+1 (305) 555-0123',
    vipStatus: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80'
  };

  const tabs = [
    { id: 'overview', label: 'OVERVIEW', icon: User },
    { id: 'bookings', label: 'MY BOOKINGS', icon: Calendar },
    { id: 'payments', label: 'SAVED PAYMENTS', icon: CreditCard },
    { id: 'profile', label: 'PROFILE', icon: Settings },
  ];

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-black-rich min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* Sidebar */}
        <aside className="md:w-1/4">
          <div className="glass-card rounded-3xl p-8 mb-8 text-center sticky top-32">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 rounded-full border-2 border-gold/30 p-1">
                <img src={user.avatar} className="w-full h-full object-cover rounded-full" alt="Avatar" />
              </div>
              {user.vipStatus && (
                <div className="absolute -bottom-2 -right-2 bg-gold text-white p-2 rounded-full shadow-lg">
                  <Heart size={14} fill="currentColor" />
                </div>
              )}
            </div>
            <h2 className="font-serif text-2xl mb-1">{user.firstName} {user.lastName}</h2>
            <p className="text-gold text-[10px] tracking-[0.3em] font-bold uppercase mb-8">VIP MEMBER</p>
            
            <nav className="space-y-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group",
                      activeTab === tab.id ? "bg-white text-black" : "text-silver hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div className="flex items-center space-x-4">
                      <Icon size={18} strokeWidth={activeTab === tab.id ? 2 : 1.5} />
                      <span className="text-[11px] font-bold tracking-[0.2em]">{tab.label}</span>
                    </div>
                    {activeTab !== tab.id && <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </button>
                );
              })}
              <button 
                onClick={onLogout}
                className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-400/5 transition-all mt-8"
              >
                <LogOut size={18} />
                <span className="text-[11px] font-bold tracking-[0.2em]">SIGN OUT</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <header>
                    <h1 className="font-serif text-5xl italic font-light mb-4">Welcome back, {user.firstName}</h1>
                    <p className="text-silver tracking-widest text-[12px] uppercase">Miami Central Hub · Local Time: 1:13 PM</p>
                  </header>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="glass-card rounded-3xl p-8">
                      <div className="flex justify-between items-center mb-8">
                        <span className="text-[11px] tracking-[0.4em] text-gold font-bold">UPCOMING RENTAL</span>
                        <Calendar size={18} className="text-silver" />
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="w-24 h-16 rounded-xl overflow-hidden">
                          <img src="/images/Lambo_Urus_Yellow.jpg" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-serif text-xl">Lamborghini Urus</p>
                          <p className="text-silver text-[12px] tracking-widest uppercase mt-1">JUL 20 - JUL 23</p>
                        </div>
                      </div>
                      <button className="w-full mt-8 py-4 border border-white/10 rounded-2xl text-[11px] tracking-[0.2em] font-bold hover:bg-white/5 transition-all">
                        VIEW RESERVATION DETAILS
                      </button>
                    </div>

                    <div className="glass-card rounded-3xl p-8">
                      <div className="flex justify-between items-center mb-8">
                        <span className="text-[11px] tracking-[0.4em] text-silver font-bold">LIFETIME STATUS</span>
                        <ShieldCheck size={18} className="text-gold" />
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-silver text-[12px] uppercase tracking-widest">Total Spend</span>
                          <span className="font-serif text-xl">$18,400</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-silver text-[12px] uppercase tracking-widest">Rentals Completed</span>
                          <span className="font-serif text-xl">6</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full mt-4">
                          <div className="h-full w-4/5 bg-gold rounded-full" />
                        </div>
                        <p className="text-[9px] text-silver tracking-[0.2em] uppercase text-right">80% to Platinum Tier</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-3xl p-8">
                    <h3 className="text-[11px] tracking-[0.4em] text-silver font-bold mb-8">SAVED ADDRESSES</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { label: 'HOME', icon: MapPin, address: 'Ocean Drive, Miami Beach' },
                        { label: 'OFFICE', icon: MapPin, address: 'Brickell Financial District' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-gold/30 transition-all">
                          <div className="p-4 rounded-xl bg-white/5 text-silver group-hover:text-gold transition-colors">
                            <item.icon size={20} strokeWidth={1} />
                          </div>
                          <div>
                            <p className="text-[10px] tracking-[0.3em] font-bold mb-1">{item.label}</p>
                            <p className="text-silver text-[12px] tracking-widest">{item.address}</p>
                          </div>
                        </div>
                      ))}
                      <button className="flex items-center justify-center space-x-4 p-6 rounded-2xl border border-dashed border-white/10 text-dim hover:text-silver hover:border-white/20 transition-all">
                        <span className="text-[11px] tracking-[0.2em] font-bold">+ ADD NEW LOCATION</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'bookings' && (
                <div className="space-y-6">
                   <h2 className="font-serif text-4xl italic mb-8">Booking History</h2>
                   {[1, 2, 3].map((i) => (
                     <div key={i} className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                           <img src={i === 1 ? "/images/Lambo_Urus_Yellow.jpg" : "/images/Learjet 45.jpg"} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-2">
                           <div className="flex justify-between items-start">
                              <div>
                                 <h4 className="font-serif text-2xl">{i === 1 ? 'Lamborghini Urus' : 'Learjet 45'}</h4>
                                 <p className="text-silver text-[12px] tracking-widest uppercase">JUNE 12 - JUNE 15, 2026</p>
                              </div>
                              <span className="px-4 py-1 rounded-full bg-green-400/10 text-green-400 text-[9px] font-bold tracking-widest uppercase">COMPLETED</span>
                           </div>
                           <div className="pt-4 flex items-center space-x-12">
                              <div>
                                 <p className="text-dim text-[9px] tracking-widest mb-1 uppercase">TOTAL COST</p>
                                 <p className="font-serif text-xl">{i === 1 ? '$5,400' : '$8,900'}</p>
                              </div>
                              <div>
                                 <p className="text-dim text-[9px] tracking-widest mb-1 uppercase">REFERENCE</p>
                                 <p className="text-silver text-[12px] font-medium">#APR-0092{i}</p>
                              </div>
                           </div>
                        </div>
                        <button className="px-8 py-3 rounded-full border border-white/10 text-[11px] tracking-[0.2em] font-bold hover:bg-white/5 transition-all">
                           VIEW INVOICE
                        </button>
                     </div>
                   ))}
                </div>
              )}

              {activeTab === 'payments' && (
                <div className="space-y-8">
                  <h2 className="font-serif text-4xl italic mb-8">Saved Methods</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-zinc-800 to-black-pure p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-8">
                          <CreditCard className="text-white/20 group-hover:text-gold transition-colors" size={40} />
                       </div>
                       <p className="text-[10px] tracking-[0.4em] text-silver font-bold mb-16 uppercase">AMEX PLATINUM</p>
                       <p className="font-serif text-3xl tracking-widest text-white mb-8">•••• •••• •••• 1004</p>
                       <div className="flex justify-between items-end">
                          <div>
                             <p className="text-dim text-[9px] tracking-widest uppercase mb-1">CARD HOLDER</p>
                             <p className="text-white text-[12px] tracking-widest font-medium uppercase">{user.firstName} {user.lastName}</p>
                          </div>
                          <p className="text-silver text-[12px] font-medium">10/28</p>
                       </div>
                    </div>

                    <button className="bg-white/[0.02] border border-dashed border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center space-y-6 group hover:border-gold/40 transition-all">
                       <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-dim group-hover:text-gold transition-colors">
                          <CreditCard size={32} strokeWidth={1} />
                       </div>
                       <p className="text-[11px] tracking-[0.3em] font-bold text-dim group-hover:text-silver uppercase transition-colors">AUTHORIZE NEW CARD</p>
                    </button>
                  </div>
                  
                  <div className="glass-card rounded-3xl p-10">
                     <p className="text-[11px] tracking-[0.4em] text-silver font-bold mb-8 uppercase text-center">STRIPE SECURE INTEGRATION</p>
                     <p className="text-dim text-[13px] font-light leading-relaxed tracking-wider text-center max-w-xl mx-auto italic">
                        Your payment data is encrypted and securely stored. APPROVED never stores full card details on our local servers. 
                        Multi-layered security ensures elite-level protection for every transaction.
                     </p>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="space-y-12">
                  <header>
                    <h2 className="font-serif text-4xl italic mb-4">Account Profile</h2>
                    <p className="text-silver text-[13px] tracking-widest font-light">Global Identity and Credentials</p>
                  </header>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                       <h4 className="text-[11px] tracking-[0.4em] text-gold font-bold uppercase mb-8">PERSONAL INTEL</h4>
                       <div className="space-y-6">
                         <div className="group">
                            <label className="text-dim text-[9px] tracking-widest uppercase mb-2 block">First Name</label>
                            <div className="text-white font-serif text-xl border-b border-white/5 pb-2 group-hover:border-gold/50 transition-colors">{user.firstName}</div>
                         </div>
                         <div className="group">
                            <label className="text-dim text-[9px] tracking-widest uppercase mb-2 block">Last Name</label>
                            <div className="text-white font-serif text-xl border-b border-white/5 pb-2 group-hover:border-gold/50 transition-colors">{user.lastName}</div>
                         </div>
                         <div className="group">
                            <label className="text-dim text-[9px] tracking-widest uppercase mb-2 block">Email Address</label>
                            <div className="text-white font-medium text-[14px] border-b border-white/5 pb-2 group-hover:border-gold/50 transition-colors">{user.email}</div>
                         </div>
                       </div>
                    </div>

                    <div className="space-y-8">
                       <h4 className="text-[11px] tracking-[0.4em] text-gold font-bold uppercase mb-8">LICENSING & ID</h4>
                       <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8">
                          <div className="flex items-center space-x-6 mb-8">
                             <ShieldCheck className="text-green-400" size={32} />
                             <div>
                                <p className="text-[11px] font-bold tracking-widest">DRIVERS LICENSE VERIFIED</p>
                                <p className="text-silver text-[10px] tracking-widest uppercase">VALID THROUGH MAR 2027</p>
                             </div>
                          </div>
                          <div className="p-6 rounded-2xl bg-black-pure border border-white/5 text-center">
                             <p className="text-dim text-[9px] tracking-widest uppercase mb-4">LICENSE DOCUMENT</p>
                             <div className="h-24 flex items-center justify-center opacity-40">
                                <LogOut className="rotate-90" size={40} strokeWidth={1} />
                             </div>
                             <button className="text-[10px] text-gold tracking-widest font-bold mt-4 uppercase hover:text-white transition-colors">UPDATE DOCUMENTATION</button>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="pt-12 border-t border-white/5 flex justify-end">
                     <button className="bg-white text-black px-12 py-4 rounded-full text-[11px] font-bold tracking-[0.3em] hover:bg-gold hover:text-white transition-all shadow-2xl">
                        SAVE ACCOUNT CHANGES
                     </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
