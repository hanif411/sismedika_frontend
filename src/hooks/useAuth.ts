import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/login', { email, password });
            
            const token = response.data.token;
            localStorage.setItem('token', token);
            
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            navigate('/tables'); 
        } catch (err: any) {
            const message = err.response?.data?.message || 'Email atau password salah, Bro!';
            setError(message);
            console.error('Login Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    return { login, logout, loading, error };
};