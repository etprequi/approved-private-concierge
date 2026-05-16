import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  onNavClick: (page: string) => void;
}

export default function Header({ onNavClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', id: 'home' },
    { label: 'FLEET', id: 'fleet' },
    { label: 'SECURITY', id: 'security' },
    { label: 'ABOUT', id: 'about' },
    { label: 'CONTACT', id: 'contact' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 md:px-12 flex justify-between items-center",
        isScrolled ? "bg-black-rich/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent"
      )}
    >
      <div className="cursor-pointer" onClick={() => onNavClick('home')}>
  <img 
    src="/images/logo.png" 
    alt="APPROVED Private Concierge" 
    className="h-30 md:h-34 w-auto object-contain"
  />
</div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-12">
        {navLinks.map((link) => (
          <button 
            key={link.id}
            onClick={() => onNavClick(link.id)}
            className="text-[11px] tracking-[0.2em] font-medium hover:text-gold transition-colors"
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center space-x-6">
        <button 
          className="hidden md:flex items-center space-x-2 text-[11px] tracking-[0.2em] font-medium hover:text-gold transition-colors"
          onClick={() => onNavClick('account')}
        >
          <User size={16} strokeWidth={1.5} />
          <span>ACCOUNT</span>
        </button>
        <button 
          className="bg-white text-black text-[11px] tracking-[0.2em] font-bold px-8 py-3 rounded-full hover:bg-gold hover:text-white transition-all duration-300"
          onClick={() => onNavClick('fleet')}
        >
          BOOK NOW
        </button>
        
        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black-rich border-b border-white/5 flex flex-col p-8 space-y-6 md:hidden"
          >
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => { onNavClick(link.id); setMobileMenuOpen(false); }}
                className="text-left text-[14px] tracking-[0.2em] font-medium"
              >
                {link.label}
              </button>
            ))}
            <button 
              className="text-left text-[14px] tracking-[0.2em] font-medium flex items-center space-x-2"
              onClick={() => { onNavClick('account'); setMobileMenuOpen(false); }}
            >
              <User size={18} strokeWidth={1.5} />
              <span>ACCOUNT</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
