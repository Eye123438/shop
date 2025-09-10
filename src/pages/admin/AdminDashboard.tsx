import React, { useState } from 'react';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  BarChart3,
  Settings,
  MessageSquare,
  FileText,
  CreditCard,
  Shield
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DashboardCard {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
  change?: string;
}

const AdminDashboard: React.FC = () => {
  const { requests, employees, productList, foodList } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const dashboardCards: DashboardCard[] = [
    {
      title: 'Total Requests',
      value: requests.length.toString(),
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Active Employees',
      value: employees.filter(emp => emp.status === 'active').length.toString(),
      icon: Users,
      color: 'bg-green-500',
      change: '+5%'
    },
    {
      title: 'Products Available',
      value: productList.filter(p => p.stock > 0).length.toString(),
      icon: ShoppingBag,
      color: 'bg-purple-500',
      change: '+8%'
    },
    {
      title: 'Revenue Today',
      value: 'KES 45,320',
      icon: TrendingUp,
      color: 'bg-yellow-500',
      change: '+18%'
    }
  ];

  const statusCards = [
    {
      title: 'Pending',
      count: requests.filter(r => r.status === 'pending').length,
      icon: Clock,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      title: 'In Progress',
      count: requests.filter(r => r.status === 'in-progress').length,
      icon: TrendingUp,
      color: 'text-orange-600 bg-orange-100'
    },
    {
      title: 'Completed',
      count: requests.filter(r => r.status === 'completed').length,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Cancelled',
      count: requests.filter(r => r.status === 'cancelled').length,
      icon: XCircle,
      color: 'text-red-600 bg-red-100'
    }
  ];

  const recentRequests = requests.slice(0, 5);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
              <Settings size={16} />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                {card.change && (
                  <p className="text-sm text-green-600 mt-1">{card.change} from yesterday</p>
                )}
              </div>
              <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                <card.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {statusCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-xl font-bold text-gray-900">{card.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <BarChart3 size={20} className="text-gray-400" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>

        {/* Service Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Distribution</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Service Requests</span>
              <span className="text-sm font-medium">{requests.filter(r => r.type === 'service').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Product Orders</span>
              <span className="text-sm font-medium">{requests.filter(r => r.type === 'product').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Food Orders</span>
              <span className="text-sm font-medium">{requests.filter(r => r.type === 'food').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Requests</h3>
            <button className="text-red-800 hover:text-red-600 font-medium">
              View All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      request.status === 'completed' ? 'bg-green-100 text-green-800' :
                      request.status === 'in-progress' ? 'bg-orange-100 text-orange-800' :
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-500">
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-500">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-6 right-6 flex space-x-3">
        <button className="bg-red-800 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors">
          <MessageSquare size={20} />
        </button>
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500 transition-colors">
          <CreditCard size={20} />
        </button>
        <button className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-500 transition-colors">
          <Shield size={20} />
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;