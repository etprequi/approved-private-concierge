import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Car, 
  Calendar, 
  Users, 
  CreditCard, 
  AlertTriangle, 
  ArrowUpRight,
  ChevronLeft,
  ChevronRight
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

  return (
    <div 
      className={cn(
        "bg-black-soft border-r border-white/5 flex flex-col transition-all duration-500 overflow-hidden",
        isOpen ? "w-[260px]" : "w-[80px]"
      )}
    >
      <div className="p-8 border-b border-white/5 flex items-center space-x-4">
        <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-serif text-lg font-bold shadow-lg">A</div>
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex flex-col"
            >
              <span className="font-serif text-lg tracking-[0.2em] font-medium uppercase text-white">APPROVED</span>
              <span className="text-[9px] tracking-[0.3em] text-silver font-light uppercase">CONCIERGE OFFICE</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 py-8 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-300 group",
                active ? "bg-white text-black shadow-lg" : "text-silver hover:bg-white/[0.03] hover:text-white"
              )}
            >
              <Icon size={20} strokeWidth={active ? 2 : 1.5} />
              {isOpen && (
                <span className="text-[11px] tracking-[0.2em] font-bold">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={onToggle}
          className="w-full flex items-center justify-center p-3 text-silver hover:text-white transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
}
