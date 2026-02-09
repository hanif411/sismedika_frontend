import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import TableList from './pages/TableList';
import MenuPage from './pages/MenuPage';
import OrderList from './pages/OrderList';
import { ProtectedRoute } from './ProtectedRoute';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login /> : <Navigate to="/tables" />} 
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/tables" element={<TableList />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/orders" element={<OrderList />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;