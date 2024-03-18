import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard';
import Inventory from '../../Pages/Inventory';
import Order from '../../Pages/Order';
import Customer from '../../Pages/Customer';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/order" element={<Order />} />
      <Route path="/customer" element={<Customer />} />
    </Routes>
  );
}

export default AppRoutes;
