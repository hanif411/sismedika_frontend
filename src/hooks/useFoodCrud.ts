import { useState, useEffect } from 'react';
import api from '../api/api';
import { type Food } from '../types/types';

export const useFoodCrud = () => {
    const [foods, setFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFoods = async () => {
        setLoading(true);
        try {
            const res = await api.get('/food');
            setFoods(res.data.data);
        } catch (err) {
            console.error("Gagal ambil makanan", err);
        } finally {
            setLoading(false);
        }
    };

    const saveFood = async (id: number | null, data: any) => {
        try {
            if (id) {
                await api.put(`/food/${id}`, data); // Update
            } else {
                await api.post('/food', data); // Create
            }
            await fetchFoods();
            return { success: true };
        } catch (err: any) {
            return { success: false, msg: err.response?.data?.message || 'Gagal menyimpan data' };
        }
    };

    const deleteFood = async (id: number) => {
        if (!window.confirm('Yakin mau hapus menu ini?')) return;
        try {
            await api.delete(`/food/${id}`);
            await fetchFoods();
            return { success: true };
        } catch (err) {
            return { success: false, msg: 'Gagal menghapus makanan' };
        }
    };

    useEffect(() => { fetchFoods(); }, []);

    return { foods, loading, saveFood, deleteFood };
};