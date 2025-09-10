import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isAdmin, setIsAdmin } = useApp();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {!isAdminPage && (
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Q</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-red-800">QUICKLINK SERVICES</h1>
                  <p className="text-xs text-gray-600">Your Time, Our Priority</p>
                </div>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-700 hover:text-red-800 font-medium">Home</Link>
                <Link to="/contact" className="text-gray-700 hover:text-red-800 font-medium">Contact</Link>
                <Link to="/my-requests" className="text-gray-700 hover:text-red-800 font-medium">My Requests</Link>
              </nav>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={isAdminPage ? '' : 'pb-20'}>
        {children}
      </main>

      {/* Sticky Footer with Admin Button */}
      {!isAdminPage && (
        <footer className="fixed bottom-0 left-0 right-0 bg-black text-white py-4 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Phone size={14} />
                  <span>0111679286</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail size={14} />
                  <span>info@quicklinkservices.com</span>
                </div>
                <div className="hidden sm:flex items-center space-x-1">
                  <MapPin size={14} />
                  <span>Serving: Nairobi & Environs</span>
                </div>
              </div>
              
              <Link
                to="/admin"
                className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                onClick={() => setIsAdmin(true)}
              >
                <Shield size={16} />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;