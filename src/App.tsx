import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import AdminLayout from './pages/admin/AdminLayout';

// Pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import MyRequests from './pages/MyRequests';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import RequestsManagement from './pages/admin/RequestsManagement';
import EmployeeManagement from './pages/admin/EmployeeManagement';
import MarketplaceManagement from './pages/admin/MarketplaceManagement';

// Simple placeholder components for remaining admin pages
const Analytics = () => (
  <div className="p-6 bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics & Reports</h1>
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
      <p className="text-gray-600">Analytics dashboard coming soon...</p>
    </div>
  </div>
);

const Messages = () => (
  <div className="p-6 bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Messages & Notifications</h1>
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
      <p className="text-gray-600">Messaging system coming soon...</p>
    </div>
  </div>
);

const Customers = () => (
  <div className="p-6 bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Customer Management</h1>
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
      <p className="text-gray-600">Customer management coming soon...</p>
    </div>
  </div>
);

const Reports = () => (
  <div className="p-6 bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Reports & Exports</h1>
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
      <p className="text-gray-600">Reports system coming soon...</p>
    </div>
  </div>
);

const Payments = () => (
  <div className="p-6 bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Management</h1>
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
      <p className="text-gray-600">Payment management coming soon...</p>
    </div>
  </div>
);

const AdminSettings = () => (
  <div className="p-6 bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
      <p className="text-gray-600">Settings panel coming soon...</p>
    </div>
  </div>
);

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/my-requests" element={<Layout><MyRequests /></Layout>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="requests" element={<RequestsManagement />} />
            <Route path="employees" element={<EmployeeManagement />} />
            <Route path="marketplace" element={<MarketplaceManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="messages" element={<Messages />} />
            <Route path="customers" element={<Customers />} />
            <Route path="reports" element={<Reports />} />
            <Route path="payments" element={<Payments />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;