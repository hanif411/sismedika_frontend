import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  food_id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  tableId: number | null;
  items: CartItem[];
  setTable: (id: number) => void;
  addToCart: (food: { id: number; name: string; price: number }) => void;
  updateQuantity: (foodId: number, amount: number) => void;
  removeFromCart: (foodId: number) => void;
  resetCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      tableId: null,
      items: [],

      setTable: (id) => set({ tableId: id }),

      addToCart: (food) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.food_id === food.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.food_id === food.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          });
        } else {
          set({
            items: [...currentItems, { food_id: food.id, name: food.name, price: food.price, quantity: 1 }],
          });
        }
      },

      updateQuantity: (foodId, amount) => {
        set({
          items: get().items.map((item) =>
            item.food_id === foodId 
              ? { ...item, quantity: Math.max(1, item.quantity + amount) } 
              : item
          ),
        });
      },

      removeFromCart: (foodId) => {
        set({ items: get().items.filter((item) => item.food_id !== foodId) });
      },

      resetCart: () => set({ tableId: null, items: [] }),
    }),
    { name: 'pos-cart-storage' }
  )
);