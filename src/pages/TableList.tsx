import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useTables } from '../hooks/useTables';
import { LayoutDashboard, Loader2, Lock } from 'lucide-react';

const TableList: React.FC = () => {
  const { tables, loading } = useTables();
  const setTable = useCartStore((state) => state.setTable);
  const navigate = useNavigate();

  const handleSelectTable = (id: number) => {
    setTable(id);
    navigate('/menu');
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h2 className="text-4xl font-black text-slate-800 flex items-center gap-3">
          <LayoutDashboard className="text-blue-600" size={36} />
          Pilih Meja
        </h2>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {tables.map((table) => {
          const notAvailable = table.status === 'occupied' || table.status === "reserved";

          return (
            <button
              key={table.id}
              disabled={notAvailable} 
              onClick={() => handleSelectTable(table.id)}
              className={`
                relative h-44 flex flex-col items-center justify-center rounded-3xl border-4 transition-all duration-300
                ${notAvailable 
                  ? 'bg-slate-200 border-slate-300 text-slate-500 cursor-not-allowed pointer-events-none opacity-70' 
                  : 'bg-white border-blue-500 text-blue-600 hover:shadow-2xl hover:-translate-y-2 active:scale-95 shadow-md shadow-blue-100'
                }
              `}
            >
              <div className={`
                absolute top-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                ${notAvailable ? 'bg-slate-400 text-white' : 'bg-blue-600 text-white'}
              `}>
                {table.status}
              </div>

              <span className="text-xs uppercase tracking-[0.2em] font-bold opacity-50 mt-4">Meja</span>
              <span className="text-6xl font-black leading-none my-1">{table.id}</span>
              
              {notAvailable && (
                <div className="flex items-center gap-1 mt-2 text-slate-600 font-bold text-xs">
                  <Lock size={12} /> Not Available
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TableList;