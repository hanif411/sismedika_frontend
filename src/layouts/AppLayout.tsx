import { LogOut, LayoutDashboard, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
const { logout } = useAuth();
const navigate = useNavigate()

const handleLogout = () => {
    if(window.confirm('Yakin mau keluar?')) {
        logout();
    }
};

    return (
        <div className="flex h-screen bg-slate-50">
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-6 text-2xl font-black text-blue-600 italic">Restaurant</div>
                <nav className="flex-1 p-4 space-y-2">
                    <button onClick={() => navigate('/tables')} className="w-full flex items-center gap-3 p-3 hover:bg-slate-100 rounded-xl font-semibold">
                        <LayoutDashboard size={20}/> Meja
                    </button>
                    <button onClick={() => navigate('/orders')} className="w-full flex items-center gap-3 p-3 hover:bg-slate-100 rounded-xl font-semibold">
                        <UtensilsCrossed size={20}/> Pesanan
                    </button>
                </nav>
                <div className="p-4 border-t border-slate-100">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl font-semibold">
                        <LogOut size={20}/> Keluar
                    </button>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};