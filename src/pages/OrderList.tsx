import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { CheckCircle, Clock, Table as TableIcon, ReceiptText } from 'lucide-react';
import  {type Order}  from '../types/types'; // Import interface tadi

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/orders');
            setOrders(res.data.data);
        } catch (err) {
            console.error("Gagal ambil orders", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCompleteOrder = async (orderId: number) => {
        if (!window.confirm('Yakin pesanan ini sudah selesai dan meja sudah dikosongkan?')) return;

        try {
            // Sesuai route lu: Route::patch('/orders/{id}/complete')
            await api.patch(`/orders/${orderId}/complete`);
            alert('Pesanan Selesai!');
            fetchOrders(); // Refresh data
        } catch (err) {
            alert('Gagal update status!');
        }
    };

    if (loading) return <div className="p-10 text-center">Loading Data Pesanan...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-black text-gray-800 mb-8 flex items-center gap-3">
                    <ReceiptText size={32} className="text-blue-600" /> Daftar Pesanan
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className={`bg-white rounded-2xl shadow-sm border-t-8 overflow-hidden ${
                            order.status === 'completed' ? 'border-green-500' : 'border-blue-500'
                        }`}>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                            <TableIcon size={16} /> <span>Meja {order.table_id}</span>
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-800">Order #{order.id}</h3>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                        order.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4 border-y border-gray-50 py-3">
                                    {order.order_items.map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-gray-600">{item.food.name} x{item.quantity}</span>
                                            <span className="font-medium">Rp {(item.food.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center mb-5">
                                    <span className="text-gray-500 text-sm italic flex items-center gap-1">
                                        <Clock size={14} /> {new Date(order.created_at).toLocaleTimeString()}
                                    </span>
                                    <span className="text-xl font-black text-gray-900">
                                        Rp {Number(order.total_price).toLocaleString()}
                                    </span>
                                </div>

                                {order.status === 'open' && (
                                    <button 
                                        onClick={() => handleCompleteOrder(order.id)}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                                    >
                                        <CheckCircle size={20} /> Selesaikan Pesanan
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {orders.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-inner">
                        <p className="text-gray-400">Belum ada pesanan masuk, Bro.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderList;