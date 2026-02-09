import { Navigate, Outlet } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';

export const ProtectedRoute = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    );
};