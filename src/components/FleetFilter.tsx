import React from 'react';
import { Category } from '../types';
import { cn } from '../lib/utils';

interface FleetFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export default function FleetFilter({ selected, onSelect }: FleetFilterProps) {
  const categories = ['ALL', 'CARS', 'JET'];

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center py-12">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={cn(
            "px-8 py-3 rounded-full text-[10px] tracking-[0.3em] font-bold transition-all duration-500 border",
            selected === cat 
              ? "bg-white text-black border-white" 
              : "bg-transparent text-silver border-white/10 hover:border-white/40"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
