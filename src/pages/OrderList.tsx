import React from 'react';
import { ReceiptText, Loader2, Inbox } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { OrderCard } from '../components/OrderCard';

const OrderList: React.FC = () => {
    const { orders, loading, completeOrder } = useOrders();

    const handleComplete = async (id: number) => {
        const result = await completeOrder(id);
        if (!result?.success && result?.msg) alert(result.msg);
    };

    return (
        <div className="min-h-full bg-slate-50/50 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 flex items-center gap-3">
                            <ReceiptText size={40} className="text-blue-600" /> 
                            Daftar Pesanan
                        </h2>
                        <p className="text-slate-500 mt-1 font-medium italic text-lg">
                            Pantau semua pesanan masuk secara real-time.
                        </p>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center min-w-[120px]">
                            <p className="text-[10px] font-black text-slate-400 uppercase">Total Aktif</p>
                            <p className="text-2xl font-black text-blue-600">
                                {orders.filter(o => o.status === 'open').length}
                            </p>
                        </div>
                    </div>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 text-slate-400">
                        <Loader2 className="animate-spin mb-4" size={48} />
                        <p className="font-bold tracking-widest uppercase text-xs">Menyinkronkan Pesanan...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {orders.map((order) => (
                                <OrderCard key={order.id} order={order} onComplete={handleComplete} />
                            ))}
                        </div>

                        {orders.length === 0 && (
                            <div className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
                                <Inbox size={64} className="mx-auto text-slate-200 mb-4" />
                                <p className="text-slate-400 font-black text-xl uppercase tracking-tighter">Dapur Sedang Kosong, Bro!</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default OrderList;