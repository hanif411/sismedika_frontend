import { useState, useEffect } from 'react';
import api from '../api/api';
import { type Food } from '../types/types';

export const useMenu = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/food').then((res) => {
      setFoods(res.data.data);
      setLoading(false);
    });
  }, []);

  const filteredFoods = foods.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  return { foods: filteredFoods, loading, search, setSearch };
};