import React from 'react';
import { CheckCircle, Clock, Table as TableIcon } from 'lucide-react';
import { type Order } from '../types/types';

interface OrderCardProps {
    order: Order;
    onComplete: (id: number) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onComplete }) => {
    const isOpen = order.status === 'open';

    return (
        <div className={`
            group bg-white rounded-[2rem] shadow-sm border-2 transition-all duration-300
            ${isOpen ? 'border-blue-500 shadow-blue-50' : 'border-slate-100 opacity-80'}
        `}>
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                            <TableIcon size={14} /> Meja {order.table_id}
                        </div>
                        <h3 className="font-black text-xl text-slate-800">Order #{order.id}</h3>
                    </div>
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest
                        ${isOpen ? 'bg-blue-600 text-white animate-pulse' : 'bg-green-100 text-green-600'}
                    `}>
                        {order.status}
                    </span>
                </div>

                <div className="space-y-3 mb-6 bg-slate-50/50 p-4 rounded-2xl">
                    {order.order_items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <span className="bg-slate-200 text-slate-700 w-6 h-6 flex items-center justify-center rounded-lg text-[10px] font-black">
                                    {item.quantity}x
                                </span>
                                <span className="text-slate-700 font-medium">{item.food.name}</span>
                            </div>
                            <span className="font-bold text-slate-900">
                                Rp {(item.food.price * item.quantity).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-end mb-6">
                    <div className="text-slate-400 text-xs font-bold flex items-center gap-1">
                        <Clock size={14} /> {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Total Tagihan</p>
                        <p className="text-2xl font-black text-slate-900">
                            Rp {Number(order.total_price).toLocaleString()}
                        </p>
                    </div>
                </div>

                {isOpen && (
                    <button 
                        onClick={() => onComplete(order.id)}
                        className="w-full bg-slate-900 hover:bg-green-600 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
                    >
                        <CheckCircle size={18} /> SELESAIKAN PESANAN
                    </button>
                )}
            </div>
        </div>
    );
};