import { useCartStore } from '../store/useCartStore';
import { useMenu } from '../hooks/useMenu';
import { CartItem } from '../components/CartItem';
import { ShoppingCart, Utensils, Search, Loader2 } from 'lucide-react';
import { MenuCard } from '@/components/MenuCard';
import { useCheckout } from '@/hooks/useCheckout';

const MenuPage = () => {
  const { tableId, items, addToCart, updateQuantity, removeFromCart } = useCartStore();
  const { foods, loading, search, setSearch } = useMenu();

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const { handleOrder, isCheckingOut } = useCheckout();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0">
        <header className="p-6 bg-white border-b border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black text-slate-800 flex items-center gap-2">
              <Utensils className="text-blue-600" /> Menu Resto
            </h2>
            <div className="bg-blue-50 text-blue-700 px-6 py-2 rounded-2xl font-black italic">MEJA {tableId}</div>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" placeholder="Cari menu..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-100 rounded-2xl outline-none"
            />
          </div>
        </header>

<div className="flex-1 overflow-y-auto p-6">
  {loading ? (
    <div className="flex justify-center items-center h-full">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  ) : (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
      {foods.map(food => (
        <MenuCard key={food.id} food={food} onAdd={addToCart} />
      ))}
    </div>
  )}
</div>
      </div>

      <aside className="w-[400px] bg-white border-l border-slate-200 flex flex-col shadow-2xl">
        <div className="p-6 border-b flex justify-between items-center font-black text-xl">
          <div className="flex gap-2"><ShoppingCart /> Keranjang</div>
          <span className="text-sm bg-blue-100 p-1 px-3 rounded-lg">{items.length} Item</span>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.map(item => (
            <CartItem key={item.food_id} item={item} onUpdate={updateQuantity} onRemove={removeFromCart} />
          ))}
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-200">
           <div className="text-2xl font-black text-blue-600 flex justify-between mb-4">
             <span>Total</span>
             <span>Rp {totalPrice.toLocaleString()}</span>
           </div>
<button 
             disabled={items.length === 0 || isCheckingOut}
             onClick={handleOrder} 
             className={`w-full py-2 rounded-[2rem] font-black text-xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl
                ${isCheckingOut || items.length === 0 
                  ? 'bg-slate-300 text-slate-500' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'}
             `}
           >
             {isCheckingOut ? <Loader2 className="animate-spin" /> : 'Order'}
           </button>
        </div>
      </aside>
    </div>
  );
};

export default MenuPage;