
// 2. App.jsx
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CustomerRegister from './pages/CustomerRegister';
import AdminRegister from './pages/AdminRegister';
import EmailVerification from './pages/EmailVerification';
import AdminLogin from './pages/AdminLogin';
import Verify from './pages/Verify';
import CustomerLogin from './pages/CustomerLogin';
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-register" element={<CustomerRegister />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
      </Routes>
    </div>
  );
}