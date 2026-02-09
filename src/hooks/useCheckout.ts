import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useCartStore } from '../store/useCartStore';

export const useCheckout = () => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { tableId, items, resetCart } = useCartStore();
  const navigate = useNavigate();

  const handleOrder = async () => {
    if (items.length === 0) return;
    if (!window.confirm("Kirim pesanan ke dapur?")) return;

    setIsCheckingOut(true);

    try {
      const payload = {
        table_id: tableId,
        items: items.map(i => ({
          food_id: i.food_id,
          quantity: i.quantity
        }))
      };

      await api.post('/orders', payload);
      
      alert('Pesanan Berhasil!');
      resetCart();
      navigate('/tables');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Gagal checkout!';
      alert(msg);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return { handleOrder, isCheckingOut };
};