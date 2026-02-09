import { useState, useEffect } from 'react';
import api from '../api/api';

interface Table {
  id: number;
  status: 'available' | 'occupied' | "reserved";
}

export const useTables = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTables = async () => {
    try {
      setLoading(true);
      const res = await api.get('/table');
      setTables(res.data.data);
    } catch (err) {
      console.error("Gagal ambil meja:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return { tables, loading, refresh: fetchTables };
};