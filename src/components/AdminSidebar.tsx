import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Car, Calendar, Users, CreditCard, 
  AlertTriangle, ArrowUpRight, ChevronLeft, ChevronRight, X, Menu
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AdminSidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ currentPage, onPageChange, isOpen, onToggle }: AdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'fleet', label: 'FLEET', icon: Car },
    { id: 'bookings', label: 'BOOKINGS', icon: Calendar },
    { id: 'customers', label: 'CUSTOMERS', icon: Users },
    { id: 'users', label: 'USERS', icon: Users },
    { id: 'payments', label: 'PAYMENTS', icon: CreditCard },
    { id: 'damage', label: 'DAMAGE LOG', icon: AlertTriangle },
    { id: 'public', label: 'CUSTOMER PORTAL', icon: ArrowUpRight },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-serif text-lg font-bold">A</div>
          {isOpen && (
            <div className="flex flex-col">
              <span className="font-serif text-base tracking-[0.2em] font-medium uppercase text-white">APPROVED</span>
              <span className="text-[9px] tracking-[0.3em] text-silver font-light uppercase">CONCIERGE OFFICE</span>
            </div>
          )}
        </div>
        <button onClick={onToggle} className="text-silver hover:text-white transition-colors md:hidden">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { onPageChange(item.id); if (window.innerWidth < 768) onToggle(); }}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300",
                active ? "bg-white text-black shadow-lg" : "text-silver hover:bg-white/[0.03] hover:text-white"
              )}
            >
              <Icon size={18} strokeWidth={active ? 2 : 1.5} className="shrink-0" />
              {isOpen && (
                <span className="text-[10px] tracking-[0.2em] font-bold truncate">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/5 hidden md:block">
        <button onClick={onToggle} className="w-full flex items-center justify-center p-3 text-silver hover:text-white transition-colors">
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-black-pure border border-white/10 rounded-xl text-white"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/60 z-40"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25 }}
            className="md:hidden fixed top-0 left-0 h-full w-[260px] bg-black-soft border-r border-white/5 z-50"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className={cn(
        "hidden md:flex flex-col bg-black-soft border-r border-white/5 transition-all duration-500 overflow-hidden shrink-0",
        isOpen ? "w-[240px]" : "w-[72px]"
      )}>
        <SidebarContent />
      </div>
    </>
  );
}