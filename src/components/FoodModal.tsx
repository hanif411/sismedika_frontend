import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { type Food } from '../types/types';

interface FoodModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: number | null, data: any) => Promise<any>;
    initialData?: Food | null;
}

export const FoodModal = ({ isOpen, onClose, onSave, initialData }: FoodModalProps) => {
    const [form, setForm] = useState({ name: '', price: 0 });

    useEffect(() => {
        if (initialData) setForm({ name: initialData.name, price: initialData.price });
        else setForm({ name: '', price: 0 });
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await onSave(initialData?.id || null, form);
        if (res.success) onClose();
        else alert(res.msg);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden">
                <div className="p-8 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-black text-slate-800">{initialData ? 'Edit Menu' : 'Tambah Menu'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition"><X /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Nama Makanan</label>
                        <input 
                            required type="text" value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                            placeholder="Contoh: Nasi Goreng Gila"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Harga (Rp)</label>
                        <input 
                            required type="number" value={form.price}
                            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-blue-200">
                        <Save size={20} /> SIMPAN MENU
                    </button>
                </form>
            </div>
        </div>
    );
};