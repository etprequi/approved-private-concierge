import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import FleetPage from './pages/FleetPage';
import BookingModal from './components/BookingModal';
import AdminPage from './pages/AdminPage';
import CustomerDashboard from './pages/CustomerDashboard';
import AviationPage from './pages/AviationPage';
import SecurityPage from './pages/SecurityPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import { signInWithFirebase, signOutFirebase, isFirebaseConfigured } from './lib/firebase';
import { INITIAL_VEHICLES } from './constants';
import { Vehicle } from './types';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [page, setPage] = useState('home');
  const [auth, setAuth] = useState<{ type: 'customer' | 'staff'; identifier: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [bookingVehicle, setBookingVehicle] = useState<{ vehicle: Vehicle; selectedColor?: { label: string; hex: string } } | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<string | undefined>(undefined);

  useEffect(() => {
    const saved = localStorage.getItem('approved-auth');
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as { type: 'customer' | 'staff'; identifier: string };
      if (parsed?.type === 'customer') {
        setAuth(parsed);
        setIsLoggedIn(true);
        setIsAdmin(false);
        setPage('dashboard');
      } else if (parsed?.type === 'staff') {
        setAuth(parsed);
        setIsLoggedIn(true);
        setIsAdmin(true);
        setPage('admin');
      }
    } catch {
      localStorage.removeItem('approved-auth');
    }
  }, []);

  const handleCustomerLogin = async (email: string, password: string) => {
    if (!email.trim()) return 'Email is required.';
    if (!password.trim()) return 'Password is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return 'Please enter a valid email address.';
    }

    try {
      const usersModule = await import('./lib/users');
      const valid = usersModule.validateCredentials(email.trim(), password.trim(), 'customer');
      if (valid) {
        const authState = { type: 'customer' as const, identifier: email.trim() };
        setAuth(authState);
        setIsLoggedIn(true);
        setIsAdmin(false);
        setPage('dashboard');
        localStorage.setItem('approved-auth', JSON.stringify(authState));
        return undefined;
      }
    } catch {
      // ignore
    }

    if (isFirebaseConfigured) {
      try {
        await signInWithFirebase(email.trim(), password.trim());
      } catch {
        return 'Unable to authenticate with Firebase. Please verify your credentials.';
      }
    }

    const authState = { type: 'customer' as const, identifier: email.trim() };
    setAuth(authState);
    setIsLoggedIn(true);
    setIsAdmin(false);
    setPage('dashboard');
    localStorage.setItem('approved-auth', JSON.stringify(authState));
    return undefined;
  };

  const handleStaffLogin = async (username: string, password: string) => {
    if (!username.trim()) return 'Staff username is required.';
    if (!password.trim()) return 'Staff password is required.';

    try {
      const usersModule = await import('./lib/users');
      const valid = usersModule.validateCredentials(username.trim(), password.trim(), 'staff');
      if (valid) {
        const authState = { type: 'staff' as const, identifier: username.trim() };
        setAuth(authState);
        setIsLoggedIn(true);
        setIsAdmin(true);
        setPage('admin');
        localStorage.setItem('approved-auth', JSON.stringify(authState));
        return undefined;
      }
    } catch {
      // ignore
    }

    if (isFirebaseConfigured) {
      try {
        await signInWithFirebase(username.trim(), password.trim());
      } catch {
        return 'Unable to authenticate with Firebase. Please verify your staff credentials.';
      }
    }

    const validStaffNames = ['staff', 'admin', 'operations'];
    const isValidStaff = validStaffNames.includes(username.trim().toLowerCase()) || username.trim().toLowerCase().endsWith('@approved.com');
    if (!isValidStaff) return 'Invalid staff credentials.';

    const authState = { type: 'staff' as const, identifier: username.trim() };
    setAuth(authState);
    setIsLoggedIn(true);
    setIsAdmin(true);
    setPage('admin');
    localStorage.setItem('approved-auth', JSON.stringify(authState));
    return undefined;
  };

  const handleLogout = async () => {
    if (isFirebaseConfigured) {
      await signOutFirebase();
    }
    setAuth(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setPage('home');
    localStorage.removeItem('approved-auth');
  };

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

  const handleContact = (service?: string) => {
    setSelectedInquiry(service);
    setPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative font-sans text-off-white bg-black-rich min-h-screen">
      <AnimatePresence mode="wait">
        {page === 'admin' ? (
          isAdmin ? (
            <motion.div
              key="admin-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AdminPage onExit={handleLogout} />
            </motion.div>
          ) : (
            <motion.div
              key="admin-login-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoginPage onCustomerLogin={handleCustomerLogin} onStaffLogin={handleStaffLogin} />
            </motion.div>
          )
        ) : page === 'dashboard' ? (
          isLoggedIn ? (
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Header onNavClick={handleNav} />
              <CustomerDashboard onLogout={handleLogout} />
            </motion.div>
          ) : (
            <motion.div
              key="customer-login-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoginPage onCustomerLogin={handleCustomerLogin} onStaffLogin={handleStaffLogin} />
            </motion.div>
          )
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
  onBook={(v, color) => setBookingVehicle({ vehicle: v, selectedColor: color })}
  onViewFleet={() => setPage('fleet')} 
  onContact={() => setPage('contact')}
  onInquire={(name) => { setSelectedInquiry(name); setPage('contact'); }}
/>
              )}
              {page === 'fleet' && (
                <FleetPage 
                  vehicles={vehicles} 
                  onBook={(v, color) => setBookingVehicle({ vehicle: v, selectedColor: color })}
                  onSelect={setSelectedVehicle}
                  onInquire={(name) => { setSelectedInquiry(name); setPage('contact'); }}
                />
              )}
              {page === 'aviation' && (
                <AviationPage />
              )}
              {page === 'security' && (
                <SecurityPage onContact={handleContact} />
              )}
              {page === 'about' && (
                <AboutPage />
              )}
              {page === 'contact' && (
                <ContactPage selectedService={selectedInquiry} />
              )}
              {page === 'login' && (
                <LoginPage onCustomerLogin={handleCustomerLogin} onStaffLogin={handleStaffLogin} />
              )}
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bookingVehicle && (
          <BookingModal
            booking={bookingVehicle}
            onClose={() => setBookingVehicle(null)}
            onConfirm={(data) => {
              console.log('Confirmed:', data);
              setBookingVehicle(null);
              alert("RESERVATION CONFIRMED. Reference: APR-" + Math.floor(Math.random() * 1000000));
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}