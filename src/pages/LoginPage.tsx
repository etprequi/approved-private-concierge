import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, ShieldCheck } from 'lucide-react';

interface LoginPageProps {
  onCustomerLogin: (email: string, password: string) => Promise<string | undefined>;
  onStaffLogin: (username: string, password: string) => Promise<string | undefined>;
}

export default function LoginPage({ onCustomerLogin, onStaffLogin }: LoginPageProps) {
  const [mode, setMode] = useState<'customer' | 'staff'>('customer');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPassword, setCustomerPassword] = useState('');
  const [staffUsername, setStaffUsername] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mode === 'customer') {
      if (!customerEmail.trim() || !customerPassword.trim()) {
        setError('Please enter your email and password.');
        return;
      }
      const errorMessage = await onCustomerLogin(customerEmail.trim(), customerPassword.trim());
      if (errorMessage) {
        setError(errorMessage);
      }
      return;
    }

    if (!staffUsername.trim() || !staffPassword.trim()) {
      setError('Staff credentials are required.');
      return;
    }

    const staffError = await onStaffLogin(staffUsername.trim(), staffPassword.trim());
    if (staffError) {
      setError(staffError);
    }
  };

  return (
    <div className="pt-40 text-center py-60 bg-black-rich min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent opacity-20" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto px-6 relative z-10"
      >
        <span className="text-[11px] tracking-[0.6em] text-gold uppercase font-bold mb-6 inline-block">SECURE ACCESS</span>
        <h2 className="font-serif text-5xl italic text-white mb-6">Authenticate to Enter</h2>
        <p className="text-silver tracking-[0.2em] text-[12px] mb-12 uppercase leading-loose max-w-xl mx-auto">
          Choose your access path: customer account access or staff credential entry for administrative control.
        </p>

        <div className="flex justify-center gap-4 mb-10">
          <button
            type="button"
            onClick={() => { setMode('customer'); setError(''); }}
            className={"px-8 py-3 rounded-full text-[11px] tracking-[0.3em] font-bold transition-all " +
              (mode === 'customer'
                ? 'bg-white text-black shadow-2xl'
                : 'bg-white/5 text-silver hover:bg-white/10')}
          >
            <User size={16} />
            CUSTOMER
          </button>
          <button
            type="button"
            onClick={() => { setMode('staff'); setError(''); }}
            className={"px-8 py-3 rounded-full text-[11px] tracking-[0.3em] font-bold transition-all " +
              (mode === 'staff'
                ? 'bg-gold text-black shadow-2xl'
                : 'bg-white/5 text-silver hover:bg-white/10')}
          >
            <ShieldCheck size={16} />
            STAFF
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111] border border-white/5 rounded-3xl p-10 shadow-2xl"> 
          <div className="mb-10 text-left">
            <p className="text-[11px] tracking-[0.4em] text-gold uppercase font-bold mb-4">
              {mode === 'customer' ? 'Customer Sign In' : 'Staff Portal'}
            </p>
            <p className="text-silver text-[13px] leading-relaxed">
              {mode === 'customer'
                ? 'Enter your registered email and password to continue to the customer dashboard.'
                : 'Enter staff credentials to access operations, bookings, and asset management.'}
            </p>
          </div>

          {mode === 'customer' ? (
            <div className="space-y-6">
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-silver font-bold mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="approvedprivateconcierge@gmail.com"
                  className="w-full bg-white/[0.03] border border-white/5 py-4 px-5 rounded-2xl text-[11px] tracking-[0.2em] outline-none focus:border-gold/50"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-silver font-bold mb-2 block">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={customerPassword}
                  onChange={(e) => setCustomerPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-white/[0.03] border border-white/5 py-4 px-5 rounded-2xl text-[11px] tracking-[0.2em] outline-none focus:border-gold/50"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-silver font-bold mb-2 block">
                  Staff Username
                </label>
                <input
                  type="text"
                  required
                  value={staffUsername}
                  onChange={(e) => setStaffUsername(e.target.value)}
                  placeholder="staff@example.com"
                  className="w-full bg-white/[0.03] border border-white/5 py-4 px-5 rounded-2xl text-[11px] tracking-[0.2em] outline-none focus:border-gold/50"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-silver font-bold mb-2 block">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  placeholder="Enter your staff password"
                  className="w-full bg-white/[0.03] border border-white/5 py-4 px-5 rounded-2xl text-[11px] tracking-[0.2em] outline-none focus:border-gold/50"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="mt-8 rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-200 text-left">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="mt-10 w-full py-5 rounded-full bg-white text-black font-bold tracking-[0.3em] text-[11px] uppercase hover:bg-gold hover:text-white transition-all shadow-2xl"
          >
            {mode === 'customer' ? 'Sign In Securely' : 'Staff Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
