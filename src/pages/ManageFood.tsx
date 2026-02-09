import { useFoodCrud } from '../hooks/useFoodCrud';
import { FoodModal } from '../components/FoodModal';
import { Plus, Edit3, Trash2, UtensilsCrossed, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { type Food } from '../types/types';

const ManageFood = () => {
    const { foods, loading, saveFood, deleteFood } = useFoodCrud();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState<Food | null>(null);

    const openCreate = () => { setSelectedFood(null); setIsModalOpen(true); };
    const openEdit = (food: Food) => { setSelectedFood(food); setIsModalOpen(true); };

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 flex items-center gap-3">
                        <UtensilsCrossed size={40} className="text-blue-600" /> Kelola Menu
                    </h2>
                    <p className="text-slate-500 font-medium mt-1">Tambah, ubah, atau hapus daftar makanan restoranmu.</p>
                </div>
                <button onClick={openCreate} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                    <Plus size={20} /> TAMBAH MENU BARU
                </button>
            </header>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={48} /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {foods.map((food) => (
                        <div key={food.id} className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-full">
                            <div>
                                <div className="aspect-square bg-slate-50 rounded-[2rem] mb-6 flex items-center justify-center text-slate-200 group-hover:bg-blue-50 transition-all overflow-hidden">
                                    <UtensilsCrossed size={64} className="group-hover:scale-110 group-hover:text-blue-200 transition-all duration-500" />
                                </div>
                                <h3 className="font-black text-2xl text-slate-800 mb-2 line-clamp-1">{food.name}</h3>
                                <p className="text-blue-600 font-black text-xl mb-6 italic">Rp {food.price.toLocaleString()}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => openEdit(food)} className="flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-blue-100 hover:text-blue-600 rounded-xl font-bold transition-all"><Edit3 size={16} /> Edit</button>
                                <button onClick={() => deleteFood(food.id)} className="flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-red-100 hover:text-red-600 rounded-xl font-bold transition-all"><Trash2 size={16} /> Hapus</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <FoodModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={saveFood} 
                initialData={selectedFood} 
            />
        </div>
    );
};

export default ManageFood;