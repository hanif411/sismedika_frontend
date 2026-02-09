import { LogOut, LayoutDashboard, UtensilsCrossed, Pizza } from 'lucide-react'; // Tambah Pizza icon
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 
  const handleLogout = () => {
    if(window.confirm('Yakin mau keluar?')) {
      logout();
    }
  };

  const navItems = [
    { label: 'Meja', path: '/tables', icon: <LayoutDashboard size={20}/> },
    { label: 'Pesanan', path: '/orders', icon: <UtensilsCrossed size={20}/> },
    { label: 'Kelola Menu', path: '/food', icon: <Pizza size={20}/> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shadow-sm">
        <div className="p-8">
          <div className="flex items-center gap-3 text-2xl font-black text-blue-600 italic tracking-tighter">
            <div className="bg-blue-600 p-2 rounded-xl text-white not-italic">R</div>
            Restaurant
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 p-4 text-red-500 hover:bg-red-50 rounded-2xl font-bold transition-colors"
          >
            <LogOut size={20}/>
            Keluar
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-slate-50">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};