import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useCartStore } from '../store/useCartStore';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, Utensils } from 'lucide-react';

interface Food {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const MenuPage: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const { tableId, items, addToCart, updateQuantity, removeFromCart, resetCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tableId) navigate('/tables');

    api.get('/food').then((res) => setFoods(res.data.data));
  }, [tableId, navigate]);

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    try {
      const payload = {
        table_id: tableId,
        items: items.map(i => ({ food_id: i.food_id, quantity: i.quantity }))
      };
      await api.post('/orders', payload);
      alert('Pesanan berhasil dikirim ke dapur!');
      resetCart();
      navigate('/tables');
    } catch (err) {
      alert('Gagal checkout, cek koneksi/stok!');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
     <div className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black text-gray-800 flex items-center gap-2">
            <Utensils className="text-blue-600" /> Pilih Menu
          </h2>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
             Meja: {tableId}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <div key={food.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="h-32 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-400 italic">No Image</div>
              <h3 className="font-bold text-lg text-gray-800">{food.name}</h3>
              <p className="text-blue-600 font-bold mb-4">Rp {food.price.toLocaleString()}</p>
              <button 
                onClick={() => addToCart(food)}
                className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition"
              >
                Tambah
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Sidebar Cart */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col shadow-2xl">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2 font-bold text-xl text-gray-800">
          <ShoppingCart /> Keranjang
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">Keranjang masih kosong nih...</div>
          ) : (
            items.map((item) => (
              <div key={item.food_id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                  <p className="text-xs text-gray-500">Rp {item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.food_id, -1)} className="p-1 bg-white border rounded shadow-sm"><Minus size={14}/></button>
                  <span className="font-bold text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.food_id, 1)} className="p-1 bg-white border rounded shadow-sm"><Plus size={14}/></button>
                  <button onClick={() => removeFromCart(item.food_id)} className="ml-2 text-red-500"><Trash2 size={16}/></button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Total Bayar:</span>
            <span className="text-2xl font-black text-blue-600 font-mono">Rp {totalPrice.toLocaleString()}</span>
          </div>
          <button 
            disabled={items.length === 0}
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            ORDER SEKARANG
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;