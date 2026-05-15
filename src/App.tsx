import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import FleetPage from './pages/FleetPage';
import BookingModal from './components/BookingModal';
import AdminPage from './pages/AdminPage';
import CustomerDashboard from './pages/CustomerDashboard';
import AviationPage from './pages/AviationPage';
import SecurityPage from './pages/SecurityPage';
import AboutPage from './pages/AboutPage';
import { INITIAL_VEHICLES } from './constants';
import { Vehicle } from './types';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [page, setPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle | null>(null);

  const handleNav = (id: string) => {
    if (id === 'account') {
      if (isLoggedIn) setPage('dashboard');
      else setPage('login');
      return;
    }
    if (id === 'admin-dashboard') {
      setPage('admin');
      return;
    }
    setPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative font-sans text-off-white bg-black-rich min-h-screen">
      <AnimatePresence mode="wait">
        {page === 'admin' ? (
          <motion.div
            key="admin-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AdminPage onExit={() => setPage('home')} />
          </motion.div>
        ) : page === 'dashboard' ? (
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Header onNavClick={handleNav} />
            <CustomerDashboard onLogout={() => { setIsLoggedIn(false); setPage('home'); }} />
          </motion.div>
        ) : (
          <motion.div
            key="public-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Header onNavClick={handleNav} />
            
            <main>
              {page === 'home' && (
                <LandingPage 
                  vehicles={vehicles} 
                  onBook={setBookingVehicle} 
                  onViewFleet={() => setPage('fleet')} 
                />
              )}
              {page === 'fleet' && (
                <FleetPage 
                  vehicles={vehicles} 
                  onBook={setBookingVehicle} 
                  onSelect={setSelectedVehicle} 
                />
              )}
              {page === 'aviation' && (
                <AviationPage />
              )}
              {page === 'security' && (
                <SecurityPage />
              )}
              {page === 'about' && (
                <AboutPage />
              )}
              {(page === 'bookings' || page === 'login') && (
                <div className="pt-40 text-center py-60 bg-black-rich min-h-screen relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-20" />
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     className="max-w-xl mx-auto px-6 relative z-10"
                   >
                    <h2 className="font-serif text-5xl italic text-white mb-8">
                       {page === 'login' ? 'Private Entrance' : 'Elite Access'}
                    </h2>
                    <p className="text-silver tracking-[0.2em] text-[12px] mb-12 uppercase leading-loose max-w-sm mx-auto">
                       Authenticate to access your curated automotive history and upcoming luxury experiences.
                    </p>
                    <div className="space-y-6">
                       <button 
                         onClick={() => { setIsLoggedIn(true); setPage('dashboard'); }}
                         className="bg-white text-black px-16 py-4 rounded-full text-[11px] font-bold tracking-[0.3em] transition-all hover:bg-gold hover:text-white shadow-2xl w-full md:w-auto"
                       >
                         SIGN IN SECURELY
                       </button>
                       <div className="pt-8">
                          <button 
                            onClick={() => { setPage('admin'); setIsAdmin(true); }}
                            className="text-silver hover:text-gold transition-colors text-[10px] tracking-[0.4em] font-medium uppercase"
                          >
                            STAFF CREDENTIALS
                          </button>
                       </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bookingVehicle && (
          <BookingModal 
            vehicle={bookingVehicle} 
            onClose={() => setBookingVehicle(null)} 
            onConfirm={(data) => {
              console.log('Confirmed:', data);
              setBookingVehicle(null);
              // In a real app we'd navigate to a success page or show a toast
              alert("RESERVATION CONFIRMED. Reference: APR-" + Math.floor(Math.random()*1000000));
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
