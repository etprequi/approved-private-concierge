import { Vehicle } from '../types';
import { INITIAL_VEHICLES } from '../constants';
import React, { useState } from 'react';
import { getUsers, createUser, updatePasswordForEmail, AppUser } from '../lib/users';
import { motion, AnimatePresence } from 'motion/react';
import { User, LayoutDashboard, Car, Calendar, Users, CreditCard, AlertTriangle, ArrowUpRight, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import AdminSidebar from '../components/AdminSidebar';

interface AdminPageProps {
  onExit: () => void;
  vehicles: Vehicle[];
  onVehiclesChange: (v: Vehicle[]) => void;
}

export default function AdminPage({ onExit, vehicles, onVehiclesChange }: AdminPageProps) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  React.useEffect(() => {
    if (currentPage === 'public') {
      onExit();
    }
  }, [currentPage, onExit]);

  if (currentPage === 'public') return null;

  const renderStat = (label: string, value: string, trend: string) => (
    <div key={label} className="bg-[#111111] border border-white/5 p-8 rounded-3xl group hover:border-gold/30 transition-all duration-500">
      <span className="text-[10px] tracking-[0.3em] text-silver font-bold block mb-4 uppercase group-hover:text-gold transition-colors">{label}</span>
      <p className="font-serif text-4xl text-white mb-2">{value}</p>
      <span className="text-[10px] text-gold tracking-widest uppercase">{trend}</span>
    </div>
  );

  const renderTabContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {renderStat('LIFETIME VOLUME', '$4.8M', '+12.4% GROWTH')}
              {renderStat('ACTIVE FLEET', '32 UNITS', '88% UTILIZATION')}
              {renderStat('INQUIRY QUEUE', '18 LEADS', '5 NEW TODAY')}
              {renderStat('VIP RETENTION', '92%', 'TOP TIER')}
            </div>
            <div className="bg-[#111111] border border-white/5 rounded-3xl p-12 min-h-[400px] flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full border border-white/5 flex items-center justify-center mb-8 relative">
                 <div className="absolute inset-0 rounded-full border border-gold/20 animate-ping" />
                 <LayoutDashboard className="text-silver" size={28} strokeWidth={1} />
              </div>
              <h2 className="font-serif text-3xl italic text-white mb-4">Command Center Active</h2>
              <p className="text-silver text-[13px] tracking-widest uppercase font-light max-w-sm leading-relaxed mb-10">
                Real-time telemetry and management systems are fully synchronized for your oversight.
              </p>
            </div>
          </div>
        );
      case 'fleet':
  return (
    <div className="space-y-8">
      {/* Add Vehicle Form */}
      <div className="bg-[#111111] border border-white/5 rounded-3xl p-8">
        <h3 className="font-serif text-2xl italic mb-6">Add New Vehicle</h3>
        <AddVehicleForm onAdd={(v) => onVehiclesChange([...vehicles, v])} />
      </div>

      {/* Vehicle List */}
      <div className="bg-[#111111] border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-white/5">
          <h3 className="font-serif text-2xl italic">Fleet Management</h3>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {vehicles.map((v) => (
            <div key={v.id} className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden group">
              <div className="relative h-40">
                <img src={v.photo} alt={v.make} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-[9px] tracking-[0.3em] uppercase px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white">{v.category}</span>
                </div>
              </div>
              <div className="p-5 flex justify-between items-start">
                <div>
                  <p className="text-white font-medium">{v.make} {v.model}</p>
                  <p className="text-dim text-[10px] tracking-widest uppercase mt-1">{v.year} · {v.seats} seats</p>
                  {v.dailyRate > 0 && <p className="text-gold text-[11px] mt-1">${v.dailyRate}/day</p>}
                  {v.dailyRate === 0 && <p className="text-gold font-serif italic text-[13px] mt-1">Inquire</p>}
                </div>
                <div className="flex flex-col space-y-2">
                  <span className={cn(
                    "text-[9px] px-3 py-1 rounded-full font-bold tracking-widest uppercase",
                    v.status === 'available' ? 'bg-green-400/10 text-green-400' :
                    v.status === 'booked' ? 'bg-gold/10 text-gold' :
                    'bg-red-400/10 text-red-400'
                  )}>{v.status}</span>
                  <button
                    onClick={() => onVehiclesChange(vehicles.filter(x => x.id !== v.id))}
                    className="text-[9px] tracking-[0.2em] font-bold text-red-400 hover:text-white transition-colors uppercase text-right"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
      case 'bookings':
        return (
          <div className="space-y-8">
            <div className="bg-[#111111] border border-white/5 rounded-3xl overflow-hidden">
               <div className="p-8 border-b border-white/5 flex justify-between items-center">
                  <h3 className="font-serif text-2xl italic">Reservation Manifest</h3>
                  <div className="flex space-x-4">
                     <button className="bg-white/5 border border-white/10 text-white px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em]">CALENDAR VIEW</button>
                     <button className="bg-gold text-white px-8 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-all">+ MANUAL BOOKING</button>
                  </div>
               </div>
               <div className="p-8">
                  {/* Reuse table layout from fleet but with booking data */}
                  <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] tracking-[0.3em] text-dim uppercase border-b border-white/5">
                          <th className="pb-6 px-4">Subject & Client</th>
                          <th className="pb-6 px-4">Asset</th>
                          <th className="pb-6 px-4">Status</th>
                          <th className="pb-6 px-4 text-right">Enforcement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3].map(i => (
                          <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                            <td className="py-6 px-4">
                              <p className="text-white font-medium">Cassie Arandel</p>
                              <p className="text-dim text-[10px] tracking-widest">VIP · AUTHENTICATED</p>
                            </td>
                            <td className="py-6 px-4 text-silver">Lamborghini Urus</td>
                            <td className="py-6 px-4">
                               <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-[9px] font-bold tracking-widest uppercase">Confirmed</span>
                            </td>
                            <td className="py-6 px-4 text-right">
                               <button className="text-silver hover:text-white text-[10px] tracking-[0.2em] font-bold uppercase transition-colors">Dispatch</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
               </div>
            </div>
         );
      case 'customers':
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#111111] border border-white/5 p-8 rounded-3xl group hover:border-gold/30 transition-all">
                <span className="text-[10px] tracking-[0.3em] text-silver font-bold block mb-4 uppercase group-hover:text-gold transition-colors">HIGH SPENDERS</span>
                <div className="flex flex-col space-y-4">
                  {['Marcus W.', 'Sofia C.', 'Julian B.'].map(name => (
                    <div key={name} className="flex justify-between items-center text-[12px]">
                      <span className="text-white font-medium">{name}</span>
                      <span className="text-gold tracking-widest">$250k+</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#111111] border border-white/5 p-8 rounded-3xl">
                <span className="text-[10px] tracking-[0.3em] text-silver font-bold block mb-4 uppercase">VIP BLACKLIST</span>
                <p className="text-red-400 font-serif text-xl italic">2 Flagged Profiles</p>
                <p className="text-[9px] text-dim tracking-widest uppercase mt-2">Restricted Access Enabled</p>
              </div>
              <div className="bg-[#111111] border border-white/5 p-8 rounded-3xl">
                <span className="text-[10px] tracking-[0.3em] text-gold font-bold block mb-4 uppercase">LIFETIME RETENTION</span>
                <p className="font-serif text-4xl text-white mb-2">91%</p>
                <div className="h-1 w-full bg-white/5 rounded-full">
                  <div className="h-full w-[91%] bg-gold rounded-full" />
                </div>
              </div>
            </div>

            <div className="bg-[#111111] border border-white/5 rounded-3xl overflow-hidden">
               <div className="p-8 border-b border-white/5 flex justify-between items-center">
                  <h3 className="font-serif text-2xl italic">Client Confidential Records</h3>
                  <div className="flex space-x-4">
                     <button className="bg-white text-black px-8 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] hover:bg-gold hover:text-white transition-all uppercase">
                       + NEW IDENTITY
                     </button>
                  </div>
               </div>
               <div className="p-8">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] tracking-[0.3em] text-dim uppercase border-b border-white/5">
                        <th className="pb-6 px-4 font-bold">Client</th>
                        <th className="pb-6 px-4 font-bold">Lifetime Value</th>
                        <th className="pb-6 px-4 font-bold">Risk Level</th>
                        <th className="pb-6 px-4 text-right font-bold">Audit</th>
                      </tr>
                    </thead>
                    <tbody className="text-[12px] tracking-wide">
                      {[1, 2, 3].map(i => (
                        <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors group">
                           <td className="py-6 px-4">
                              <p className="text-white font-medium mb-1">Confidential Client {i}</p>
                              <p className="text-dim text-[10px] tracking-widest uppercase">ENCRYPTED ID: {120 * i}X</p>
                           </td>
                           <td className="py-6 px-4 font-serif text-xl text-white">${20 + i}K</td>
                           <td className="py-6 px-4">
                              <span className="px-3 py-1 rounded-full bg-green-400/10 text-green-400 text-[9px] font-bold tracking-widest uppercase">Minimal</span>
                           </td>
                           <td className="py-6 px-4 text-right">
                              <button className="text-silver hover:text-gold transition-colors text-[10px] tracking-[0.2em] font-bold uppercase">Profile</button>
                           </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </div>
          </div>
        );
      case 'payments':
        return (
          <div className="space-y-8">
             <div className="bg-[#111111] border border-white/5 rounded-3xl p-12">
                <div className="flex justify-between items-end mb-12">
                   <div>
                      <h3 className="font-serif text-3xl italic text-white mb-2">Liquidity & Invoices</h3>
                      <p className="text-dim text-[10px] tracking-[0.4em] uppercase font-bold">Secured via Stripe Elite</p>
                   </div>
                   <button className="bg-white text-black px-12 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] hover:bg-gold hover:text-white transition-all uppercase shadow-xl shadow-black">
                      Revenue Report
                   </button>
                </div>
                
                <div className="space-y-4">
                   {[
                     { desc: 'Invoice #INV-2041 Approved', amount: '+$5,400', date: 'Just now' },
                     { desc: 'Deposit Released - #RES-442', amount: '-$1,200', date: '2 hours ago' },
                     { desc: 'Monthly Retention Fee - VIP', amount: '+$12,000', date: 'Yesterday' }
                   ].map((log, i) => (
                     <div key={i} className="flex justify-between items-center p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                        <div>
                           <p className="text-white text-[13px] font-medium">{log.desc}</p>
                           <p className="text-dim text-[10px] tracking-widest uppercase">{log.date}</p>
                        </div>
                        <span className={cn(
                          "font-serif text-2xl tracking-widest",
                          log.amount.startsWith('+') ? "text-green-400" : "text-white"
                        )}>{log.amount}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        );
     case 'users': {
  const users = getUsers();
  return (
    <div className="space-y-8">
      <div className="bg-[#111111] border border-white/5 rounded-3xl p-8">
        <h3 className="font-serif text-2xl italic mb-6">User Management</h3>
        <UserList users={users} />
      </div>
      <UserCreateForm onCreate={(u) => { createUser(u); }} onReset={(email, pass) => updatePasswordForEmail(email, pass)} />
    </div>
  );
}
case 'damage':
  return (
    <div className="space-y-8">
      <div className="bg-[#111111] border border-white/5 rounded-3xl p-12 text-center">
        <AlertTriangle className="text-gold mx-auto mb-6" size={40} strokeWidth={1} />
        <h3 className="font-serif text-3xl italic text-white mb-4">Integrity Reports</h3>
        <p className="text-silver text-[13px] tracking-widest uppercase font-light max-w-sm mx-auto mb-12">
          Zero active incident reports. The fleet maintains 100% operational integrity.
        </p>
        <button className="bg-white/5 border border-white/10 text-white px-10 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] hover:bg-red-400/10 hover:text-red-400 hover:border-red-400/30 transition-all uppercase">
          File Incident Report
        </button>
      </div>
    </div>
  );
                  <div className="space-y-8">
                    <div className="bg-[#111111] border border-white/5 rounded-3xl p-8">
                      <h3 className="font-serif text-2xl italic mb-6">User Management</h3>
                      <UserList users={users} />
                    </div>
                    <UserCreateForm onCreate={(u) => {
                      createUser(u);
                    }} onReset={(email, pass) => updatePasswordForEmail(email, pass)} />
                  </div>
                );
        return (
          <div className="space-y-8">
            <div className="bg-[#111111] border border-white/5 rounded-3xl p-12 text-center">
              <AlertTriangle className="text-gold mx-auto mb-6" size={40} strokeWidth={1} />
              <h3 className="font-serif text-3xl italic text-white mb-4">Integrity Reports</h3>
              <p className="text-silver text-[13px] tracking-widest uppercase font-light max-w-sm mx-auto mb-12">
                 Zero active incident reports. The fleet maintains 100% operational integrity.
              </p>
              <button className="bg-white/5 border border-white/10 text-white px-10 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] hover:bg-red-400/10 hover:text-red-400 hover:border-red-400/30 transition-all uppercase">
                 File Incident Report
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-[#111111] border border-white/5 rounded-3xl overflow-hidden">
             <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="font-serif text-2xl italic capitalize">{currentPage} Management</h3>
                <button className="text-silver hover:text-white transition-colors">
                  <ArrowUpRight size={20} />
                </button>
             </div>
             <div className="p-12 text-center">
                <p className="text-dim font-serif italic text-2xl mb-4">Module accessing secure archives...</p>
                <div className="w-12 h-[1px] bg-gold/30 mx-auto" />
             </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black-pure overflow-hidden">
      <AdminSidebar 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex-1 overflow-y-auto p-4 md:p-12 custom-scrollbar transition-all duration-500">
        <motion.div
           key={currentPage}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <header className="flex justify-between items-center mb-12">
            <div>
              <h1 className="font-serif text-4xl mb-2 text-white capitalize">{currentPage}</h1>
              <p className="text-silver text-[12px] tracking-widest uppercase font-light">Global Hub · Management Console</p>
            </div>
            <div className="flex items-center space-x-8">
               <div className="text-right hidden md:block">
                  <p className="text-white text-[12px] font-bold tracking-[0.1em]">ALEXANDER VANCE</p>
                  <p className="text-gold text-[10px] tracking-[0.3em] uppercase">Super Admin</p>
               </div>
               <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white hover:border-gold/50 transition-colors cursor-pointer group shadow-xl shadow-black">
                  <User size={22} strokeWidth={1} className="group-hover:text-gold transition-colors" />
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {renderStat('LIFETIME VOLUME', '$2.4M', '+18.4% GROWTH')}
            {renderStat('ACTIVE FLEET', '24 UNITS', '92% UTILIZATION')}
            {renderStat('INQUIRY QUEUE', '12 LEADS', '8 NEW TODAY')}
            {renderStat('VIP RETENTION', '88%', 'TOP TIER')}
          </div>

          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
}

function UserList({ users }: { users: AppUser[] }) {
  return (
    <div className="space-y-4">
      {users.map(u => (
        <div key={u.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-white font-medium">{u.name || u.username || u.email}</p>
            <p className="text-dim text-[11px]">{u.role.toUpperCase()} • {u.email || 'no-email'}</p>
          </div>
          <div className="text-[11px] text-silver">ID: {u.id.slice(0,8)}</div>
        </div>
      ))}
    </div>
  );
}

function UserCreateForm({ onCreate, onReset }: { onCreate: (u: { username?: string; email?: string; password: string; role: 'staff' | 'customer'; name?: string }) => void; onReset: (email: string, pass: string) => boolean }) {
  const [role, setRole] = useState<'staff' | 'customer'>('staff');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetPass, setResetPass] = useState('');

  return (
    <div className="bg-[#111111] border border-white/5 rounded-3xl p-8">
      <h4 className="text-[11px] tracking-[0.4em] text-silver font-bold uppercase mb-4">Create New User</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl" />
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="username" className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl" />
      </div>
      <div className="flex items-center space-x-4 mb-6">
        <select value={role} onChange={e => setRole(e.target.value as any)} className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
          <option value="staff">Staff</option>
          <option value="customer">Customer</option>
        </select>
        <button onClick={() => { onCreate({ username: username || undefined, email: email || undefined, password: password || 'password', role, name: name || undefined }); setUsername(''); setEmail(''); setPassword(''); setName(''); }} className="bg-gold text-black px-6 py-2 rounded-full">Create</button>
      </div>

      <h4 className="text-[11px] tracking-[0.4em] text-silver font-bold uppercase mb-4">Reset Password (mock)</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input value={resetEmail} onChange={e => setResetEmail(e.target.value)} placeholder="user email" className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl" />
        <input value={resetPass} onChange={e => setResetPass(e.target.value)} placeholder="new password" className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl" />
        <button onClick={() => { const ok = onReset(resetEmail, resetPass); setResetEmail(''); setResetPass(''); alert(ok ? 'Password updated (mock)' : 'Email not found'); }} className="bg-white/5 text-white px-6 py-2 rounded-full">Reset</button>
      </div>
    </div>
  );
}
function AddVehicleForm({ onAdd }: { onAdd: (v: Vehicle) => void }) {
  const [form, setForm] = React.useState({
    make: '', model: '', year: new Date().getFullYear(), category: 'CARS' as 'CARS' | 'YACHT' | 'JET',
    color: '', colorHex: '#000000', dailyRate: 0, deposit: 0, seats: 2,
    status: 'available' as 'available' | 'booked' | 'maintenance',
    photo: '', description: '', features: ''
  });

  const handleAdd = () => {
    if (!form.make || !form.model || !form.photo) {
      alert('Please fill in make, model and photo URL.');
      return;
    }
    const newVehicle: Vehicle = {
      id: `v-${Date.now()}`,
      make: form.make,
      model: form.model,
      year: form.year,
      category: form.category,
      color: form.color || 'Default',
      colorHex: form.colorHex,
      dailyRate: form.dailyRate,
      deposit: form.deposit,
      seats: form.seats,
      status: form.status,
      photo: form.photo,
      description: form.description,
      features: form.features.split(',').map(f => f.trim()).filter(Boolean),
    };
    onAdd(newVehicle);
    setForm({ make: '', model: '', year: new Date().getFullYear(), category: 'CARS', color: '', colorHex: '#000000', dailyRate: 0, deposit: 0, seats: 2, status: 'available', photo: '', description: '', features: '' });
  };

  const input = "w-full bg-white/[0.02] border border-white/5 rounded-2xl p-3 text-[11px] tracking-wide outline-none focus:border-gold/50 text-white placeholder:text-dim";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <input className={input} placeholder="Make (e.g. Ferrari)" value={form.make} onChange={e => setForm({...form, make: e.target.value})} />
      <input className={input} placeholder="Model (e.g. 488 GTB)" value={form.model} onChange={e => setForm({...form, model: e.target.value})} />
      <input className={input} placeholder="Year" type="number" value={form.year} onChange={e => setForm({...form, year: +e.target.value})} />
      <select className={input} value={form.category} onChange={e => setForm({...form, category: e.target.value as any})}>
        <option value="CARS">CARS</option>
        <option value="YACHT">YACHT</option>
        <option value="JET">JET</option>
      </select>
      <input className={input} placeholder="Color name (e.g. Rosso Red)" value={form.color} onChange={e => setForm({...form, color: e.target.value})} />
      <div className="flex items-center space-x-3 bg-white/[0.02] border border-white/5 rounded-2xl p-3">
        <input type="color" value={form.colorHex} onChange={e => setForm({...form, colorHex: e.target.value})} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none" />
        <span className="text-[11px] text-dim">Color Hex</span>
      </div>
      <input className={input} placeholder="Daily Rate ($0 for Inquire)" type="number" value={form.dailyRate} onChange={e => setForm({...form, dailyRate: +e.target.value})} />
      <input className={input} placeholder="Deposit ($)" type="number" value={form.deposit} onChange={e => setForm({...form, deposit: +e.target.value})} />
      <input className={input} placeholder="Seats" type="number" value={form.seats} onChange={e => setForm({...form, seats: +e.target.value})} />
      <select className={input} value={form.status} onChange={e => setForm({...form, status: e.target.value as any})}>
        <option value="available">Available</option>
        <option value="booked">Booked</option>
        <option value="maintenance">Maintenance</option>
      </select>
      <input className={input} placeholder="Photo URL or /images/filename.jpg" value={form.photo} onChange={e => setForm({...form, photo: e.target.value})} />
      <input className={input} placeholder="Features (comma separated)" value={form.features} onChange={e => setForm({...form, features: e.target.value})} />
      <textarea className={cn(input, "md:col-span-2 lg:col-span-3 min-h-[80px] resize-none")} placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
      <button onClick={handleAdd} className="md:col-span-2 lg:col-span-3 bg-gold text-black py-4 rounded-2xl text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-white transition-all">
        ADD TO FLEET
      </button>
    </div>
  );
}