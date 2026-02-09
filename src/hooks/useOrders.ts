import { useState, useEffect } from 'react';
import api from '../api/api';
import { type Order } from '../types/types';

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/orders');
            // Urutkan: yang 'open' di atas, baru yang 'completed'
            const sortedData = res.data.data.sort((a: any, b: any) => 
                a.status === 'open' ? -1 : 1
            );
            setOrders(sortedData);
        } catch (err) {
            console.error("Gagal ambil orders", err);
        } finally {
            setLoading(false);
        }
    };

    const completeOrder = async (orderId: number) => {
        if (!window.confirm('Pesanan ini sudah selesai & meja siap dikosongkan?')) return;
        try {
            await api.patch(`/orders/${orderId}/complete`);
            await fetchOrders(); // Refresh data setelah sukses
            return { success: true };
        } catch (err) {
            return { success: false, msg: 'Gagal update status!' };
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return { orders, loading, completeOrder, refresh: fetchOrders };
};