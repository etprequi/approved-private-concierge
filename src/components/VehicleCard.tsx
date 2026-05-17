import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Info, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Vehicle } from '../types';
import { fmtMoney, cn } from '../lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (v: Vehicle) => void;
  onBook: (v: Vehicle, color?: { label: string; hex: string }) => void;
  onInquire?: (vehicleName: string) => void;
}

export default function VehicleCard({ vehicle, onSelect, onBook, onInquire }: VehicleCardProps) {
  const [selectedColorIdx, setSelectedColorIdx] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalPhotoIdx, setModalPhotoIdx] = React.useState(0);

  const selectedPhoto = vehicle.colorOptions ? vehicle.colorOptions[selectedColorIdx]?.photo ?? vehicle.photo : vehicle.photo;
  const badgeColor = vehicle.colorOptions ? vehicle.colorOptions[selectedColorIdx]?.hex ?? vehicle.colorHex : vehicle.colorHex;
  const allPhotos = vehicle.photos && vehicle.photos.length > 0 ? vehicle.photos : [vehicle.photo];

  const prevPhoto = () => setModalPhotoIdx(i => (i - 1 + allPhotos.length) % allPhotos.length);
  const nextPhoto = () => setModalPhotoIdx(i => (i + 1) % allPhotos.length);

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        className="group relative bg-[#141414] rounded-3xl overflow-hidden border border-white/[0.03] transition-all duration-500 hover:border-white/10"
      >
        <div className="relative h-[280px] overflow-hidden">
          <img
            src={selectedPhoto}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

          <div className="absolute bottom-4 left-6 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
            <span className="text-[10px] tracking-[0.2em] font-medium text-white uppercase">{vehicle.category}</span>
          </div>

          {vehicle.status !== 'available' && (
            <div className="absolute top-4 right-6 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
              <span className="text-[10px] tracking-[0.2em] font-medium text-gold uppercase">{vehicle.status}</span>
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-serif text-2xl tracking-wide mb-1 transition-colors group-hover:text-gold">
                {vehicle.make} {vehicle.model}
              </h3>
              <p className="text-silver text-[12px] tracking-widest uppercase font-light">
                {vehicle.year} ·{' '}
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
              {vehicle.category === 'JET' || vehicle.category === 'YACHT' ? (
                <span className="font-serif text-2xl font-medium italic text-gold">Inquire</span>
              ) : (
                <>
                  <span className="font-serif text-3xl font-medium">{fmtMoney(vehicle.dailyRate)}</span>
                  <span className="text-silver text-[11px] ml-1 tracking-widest uppercase font-light">/ Day</span>
                </>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => { setModalPhotoIdx(0); setModalOpen(true); }}
                className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-silver hover:text-white"
              >
                <Info size={18} strokeWidth={1.5} />
              </button>
              {vehicle.category === 'JET' || vehicle.category === 'YACHT' ? (
                <button
                  onClick={() => onInquire?.(`${vehicle.make} ${vehicle.model}`)}
                  className="text-[10px] tracking-[0.2em] font-bold text-gold hover:text-white transition-colors uppercase"
                >
                  Inquire Now
                </button>
              ) : (
                <button
                  onClick={() => onBook(vehicle, vehicle.colorOptions ? vehicle.colorOptions[selectedColorIdx] : undefined)}
                  className="flex items-center space-x-2 bg-white text-black pl-5 pr-4 py-3 rounded-full text-[11px] font-bold tracking-[0.2em] hover:bg-gold hover:text-white transition-all duration-300"
                >
                  <span>BOOK</span>
                  <Plus size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Photo Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl w-full bg-[#111] rounded-3xl overflow-hidden border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:text-gold transition-colors"
              >
                <X size={20} />
              </button>

              {/* Image */}
              <div className="relative h-[60vh]">
                <img
                  src={allPhotos[modalPhotoIdx]}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
                {allPhotos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:text-gold transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:text-gold transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {allPhotos.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setModalPhotoIdx(i)}
                          className={cn('w-2 h-2 rounded-full transition-all', i === modalPhotoIdx ? 'bg-gold' : 'bg-white/30')}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Info */}
              <div className="p-8">
                <h2 className="font-serif text-3xl italic text-white mb-2">{vehicle.make} {vehicle.model}</h2>
                <p className="text-silver text-[13px] leading-relaxed mb-6">{vehicle.description}</p>
                <div className="flex flex-wrap gap-3">
                  {vehicle.features.map(f => (
                    <span key={f} className="text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-white/10 text-silver">{f}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}