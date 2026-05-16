import React from 'react';
import { motion } from 'motion/react';
import { Plus, Info } from 'lucide-react';
import { Vehicle } from '../types';
import { fmtMoney, cn } from '../lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (v: Vehicle) => void;
  onBook: (v: Vehicle, color?: { label: string; hex: string }) => void;
}

export default function VehicleCard({ vehicle, onSelect, onBook }: VehicleCardProps) {
  const [selectedColorIdx, setSelectedColorIdx] = React.useState(0);
  const selectedPhoto = vehicle.colorOptions ? vehicle.colorOptions[selectedColorIdx]?.photo ?? vehicle.photo : vehicle.photo;
  const badgeColor = vehicle.colorOptions ? vehicle.colorOptions[selectedColorIdx]?.hex ?? vehicle.colorHex : vehicle.colorHex;
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative bg-[#141414] rounded-3xl overflow-hidden border border-white/[0.03] transition-all duration-500 hover:border-white/10"
    >
      {/* Image Container */}
      <div className="relative h-[280px] overflow-hidden">
        <img 
          src={selectedPhoto} 
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        {/* Category Badge */}
        <div className="absolute bottom-4 left-6 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
          <span className="text-[10px] tracking-[0.2em] font-medium text-white uppercase">{vehicle.category}</span>
        </div>

        {/* Status Badge */}
        {vehicle.status !== 'available' && (
          <div className="absolute top-4 right-6 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
            <span className="text-[10px] tracking-[0.2em] font-medium text-gold uppercase">{vehicle.status}</span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-serif text-2xl tracking-wide mb-1 transition-colors group-hover:text-gold">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-silver text-[12px] tracking-widest uppercase font-light">
              {vehicle.year} · 
              {vehicle.colorOptions ? (
                <span className="inline-flex items-center space-x-3">
                  {vehicle.colorOptions.map((c, idx) => (
                    <button
                      key={c.label}
                      onClick={() => setSelectedColorIdx(idx)}
                      aria-label={c.label}
                      className={cn(
                        'w-6 h-6 rounded-full border transition-transform transform hover:scale-110',
                        selectedColorIdx === idx ? 'ring-2 ring-gold/50' : 'border-white/10'
                      )}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </span>
              ) : (
                vehicle.color.split(' ')[0]
              )}
            </p>
          </div>
           <div className="flex -space-x-1">
             <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: badgeColor }} />
           </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <span className="font-serif text-3xl font-medium">{fmtMoney(vehicle.dailyRate)}</span>
            <span className="text-silver text-[11px] ml-1 tracking-widest uppercase font-light">/ Day</span>
          </div>
          
          <div className="flex space-x-3">
             <button 
               onClick={() => onSelect(vehicle)}
               className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-silver hover:text-white"
             >
               <Info size={18} strokeWidth={1.5} />
             </button>
             <button 
               onClick={() => onBook(vehicle, vehicle.colorOptions ? vehicle.colorOptions[selectedColorIdx] : undefined)}
               className="flex items-center space-x-2 bg-white text-black pl-5 pr-4 py-3 rounded-full text-[11px] font-bold tracking-[0.2em] hover:bg-gold hover:text-white transition-all duration-300"
             >
               <span>BOOK</span>
               <Plus size={16} />
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
