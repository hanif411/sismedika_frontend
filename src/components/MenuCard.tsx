import React from 'react';
import { Utensils, Plus } from 'lucide-react';
import { type Food } from '../types/types';

interface MenuCardProps {
    food: Food;
    onAdd: (food: { id: number; name: string; price: number }) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ food, onAdd }) => {
    return (
        <div className="group bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between h-full">
            <div className="relative h-40 bg-slate-50 rounded-[1.5rem] mb-5 flex items-center justify-center text-slate-200 group-hover:bg-blue-50 transition-colors overflow-hidden">
                <Utensils size={64} className="group-hover:scale-110 group-hover:text-blue-200 transition-transform duration-500" />
                
                <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-xl shadow-sm border border-slate-100">
                    <span className="text-blue-600 font-black text-sm">
                        Rp {food.price.toLocaleString()}
                    </span>
                </div>
            </div>

            <div className="px-1">
                <h3 className="font-extrabold text-xl text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {food.name}
                </h3>
            </div>

            <button 
                onClick={() => onAdd({ id: food.id, name: food.name, price: food.price })}
                className="group/btn relative w-full bg-slate-900 text-white py-2 mt-2 rounded-[1.2rem] font-bold overflow-hidden transition-all active:scale-95 shadow-lg shadow-slate-200 hover:bg-blue-600"
            >
                <div className="flex items-center justify-center gap-2 relative z-10">
                    <Plus size={18} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                    <span>Tambah Pesanan</span>
                </div>
            </button>
        </div>
    );
};