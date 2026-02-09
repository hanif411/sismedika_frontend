export interface Food {
    id: number;
    name: string;
    price: number;
}

export interface OrderItem {
    id: number;
    food_id: number;
    quantity: number;
    food: Food;
}

export interface Order {
    id: number;
    table_id: number;
    user_id: number;
    total_price: number;
    status: 'open' | 'completed' | 'cancelled';
    created_at: string;
    order_items: OrderItem[];
}