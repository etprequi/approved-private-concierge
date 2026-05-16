import React from 'react';
import VehicleCard from '../components/VehicleCard';
import FleetFilter from '../components/FleetFilter';
import { Vehicle } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';

interface FleetPageProps {
  vehicles: Vehicle[];
  onBook: (v: Vehicle, color?: { label: string; hex: string }) => void;
  onSelect: (v: Vehicle) => void;
  onInquire: (vehicleName: string) => void;
}

export default function FleetPage({ vehicles, onBook, onSelect, onInquire }: FleetPageProps) {
  const [filter, setFilter] = React.useState('ALL');
  const [search, setSearch] = React.useState('');
  
  const filteredVehicles = vehicles.filter(v => {
    const matchesFilter = filter === 'ALL' || v.category.toUpperCase() === filter;
    const matchesSearch = `${v.make} ${v.model}`.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-black-rich min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
           <span className="text-[11px] tracking-[0.6em] text-silver uppercase mb-6 block font-light">OUR COLLECTION</span>
           <h1 className="font-serif text-6xl md:text-8xl italic font-light tracking-wide mb-8 text-white">The Fleet</h1>
           
           <div className="relative max-w-xl mx-auto mt-12 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-silver transition-colors group-focus-within:text-gold" size={18} strokeWidth={1.5} />
              <input 
                type="text"
                placeholder="CAR OR JET..."
                className="w-full bg-[#141414] border border-white/5 px-16 py-5 rounded-full text-[11px] tracking-[0.2em] font-medium focus:ring-1 focus:ring-gold/40 focus:border-gold/40 transition-all placeholder:text-dim outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
        </header>

        <FleetFilter selected={filter} onSelect={setFilter} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <VehicleCard 
                  vehicle={vehicle} 
                  onSelect={onSelect}
                  onBook={(v, color) => onBook(v, color)}
                  onInquire={onInquire}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredVehicles.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-silver font-serif italic text-2xl">No vehicles matching your criteria.</p>
            <button 
              onClick={() => { setFilter('ALL'); setSearch(''); }}
              className="mt-8 text-gold border-b border-gold/20 pb-1 text-[11px] tracking-[0.2em] font-medium"
            >
              RESET ALL FILTERS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}