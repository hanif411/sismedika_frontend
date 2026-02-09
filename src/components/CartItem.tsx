import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: any;
  onUpdate: (id: number, amount: number) => void;
  onRemove: (id: number) => void;
}

export const CartItem = ({ item, onUpdate, onRemove }: CartItemProps) => (
  <div className="flex flex-col bg-slate-50 p-4 rounded-2xl border border-slate-100">
    <div className="flex justify-between items-start mb-3">
      <h4 className="font-bold text-slate-800 leading-tight flex-1 mr-2">{item.name}</h4>
      <button onClick={() => onRemove(item.food_id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg">
        <Trash2 size={18}/>
      </button>
    </div>
    <div className="flex justify-between items-center">
      <span className="font-black text-blue-600">Rp {(item.price * item.quantity).toLocaleString()}</span>
      <div className="flex items-center gap-3 bg-white border border-slate-200 p-1.5 rounded-xl">
        <button onClick={() => onUpdate(item.food_id, -1)} className="p-1 hover:bg-slate-100 rounded-lg"><Minus size={16}/></button>
        <span className="font-black w-6 text-center">{item.quantity}</span>
        <button onClick={() => onUpdate(item.food_id, 1)} className="p-1 hover:bg-slate-100 rounded-lg"><Plus size={16}/></button>
      </div>
    </div>
  </div>
);