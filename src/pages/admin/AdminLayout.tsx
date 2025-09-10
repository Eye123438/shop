import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  BarChart3, 
  FileText, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  MessageSquare, 
  UserCheck, 
  Download, 
  CreditCard, 
  Settings, 
  Shield, 
  Menu, 
  X, 
  LogOut,
  Home
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AdminLayout: React.FC = () => {
  const { setIsAdmin } = useApp();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3, current: location.pathname === '/admin' },
    { name: 'Requests & Orders', href: '/admin/requests', icon: FileText, current: location.pathname === '/admin/requests' },
    { name: 'Employees', href: '/admin/employees', icon: Users, current: location.pathname === '/admin/employees' },
    { name: 'Marketplace', href: '/admin/marketplace', icon: ShoppingBag, current: location.pathname === '/admin/marketplace' },
    { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp, current: location.pathname === '/admin/analytics' },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare, current: location.pathname === '/admin/messages' },
    { name: 'Customers', href: '/admin/customers', icon: UserCheck, current: location.pathname === '/admin/customers' },
    { name: 'Reports', href: '/admin/reports', icon: Download, current: location.pathname === '/admin/reports' },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard, current: location.pathname === '/admin/payments' },
    { name: 'Settings', href: '/admin/settings', icon: Settings, current: location.pathname === '/admin/settings' },
  ];

  const handleLogout = () => {
    setIsAdmin(false);
    // In a real app, you would clear auth tokens, etc.
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-800 rounded-lg flex items-center justify-center">
              <Shield className="text-white" size={20} />
            </div>
            <span className="text-lg font-bold text-red-800">QUICKLINK ADMIN</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                item.current
                  ? 'bg-red-800 text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon
                className={`mr-3 flex-shrink-0 h-5 w-5 ${
                  item.current ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <Link
            to="/"
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 mb-3"
            onClick={() => setIsAdmin(false)}
          >
            <Home size={16} />
            <span>Back to Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-800"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <div className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-800 rounded flex items-center justify-center">
                <Shield className="text-white" size={14} />
              </div>
              <span className="font-bold text-red-800">QUICKLINK ADMIN</span>
            </div>
            <div className="w-8" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;