import React, { useState } from 'react';
import { Search, Eye, Clock, CheckCircle, XCircle, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Request } from '../types';

const MyRequests: React.FC = () => {
  const { requests, updateRequestStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const getStatusIcon = (status: Request['status']) => {
    switch (status) {
      case 'pending': return <Clock className="text-yellow-600" size={16} />;
      case 'assigned': return <User className="text-blue-600" size={16} />;
      case 'in-progress': return <Clock className="text-orange-600" size={16} />;
      case 'completed': return <CheckCircle className="text-green-600" size={16} />;
      case 'cancelled': return <XCircle className="text-red-600" size={16} />;
      default: return <Clock className="text-gray-600" size={16} />;
    }
  };

  const getStatusColor = (status: Request['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'verified': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleMarkPaid = (requestId: string) => {
    // Simulate marking as paid - normally this would update payment status
    alert(`Request ${requestId} marked as "I Have Paid". Awaiting admin verification.`);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-800 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">My Requests</h1>
          <p className="text-xl text-red-100">
            Track your service requests and orders
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by Request ID, title, or customer name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{requests.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-yellow-600">
                {requests.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-orange-600">
                {requests.filter(r => r.status === 'in-progress').length}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-green-600">
                {requests.filter(r => r.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-red-600">
                {requests.filter(r => r.status === 'cancelled').length}
              </div>
              <div className="text-sm text-gray-600">Cancelled</div>
            </div>
          </div>
        </div>
      </section>

      {/* Requests List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">No requests found</div>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(request.status)}
                            {request.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(request.paymentStatus)}`}>
                          {request.paymentStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Request ID:</span> {request.id}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> {request.type.replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span> {request.datePreference}
                        </div>
                        <div>
                          <span className="font-medium">Customer:</span> {request.customerName}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span> {request.customerPhone}
                        </div>
                        {request.assignedEmployee && (
                          <div>
                            <span className="font-medium">Assigned to:</span> {request.assignedEmployee}
                          </div>
                        )}
                      </div>

                      {request.description && (
                        <p className="mt-2 text-gray-700 text-sm">{request.description}</p>
                      )}

                      {(request.pickupLocation || request.dropoffLocation) && (
                        <div className="mt-2 text-sm text-gray-600">
                          {request.pickupLocation && <span>From: {request.pickupLocation}</span>}
                          {request.pickupLocation && request.dropoffLocation && <span className="mx-2">→</span>}
                          {request.dropoffLocation && <span>To: {request.dropoffLocation}</span>}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 lg:ml-4">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center gap-2"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                      
                      {request.paymentStatus === 'pending' && (
                        <button
                          onClick={() => handleMarkPaid(request.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 font-medium transition-colors"
                        >
                          I Have Paid
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedRequest.title}</h2>
                  <p className="text-gray-600">Request ID: {selectedRequest.id}</p>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedRequest.status)}`}>
                      {selectedRequest.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Payment Status</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(selectedRequest.paymentStatus)}`}>
                      {selectedRequest.paymentStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium">Name:</span> {selectedRequest.customerName}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> {selectedRequest.customerPhone}
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium">Email:</span> {selectedRequest.customerEmail}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedRequest.description && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p>{selectedRequest.description}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Scheduled Date & Time</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p>{selectedRequest.datePreference} at {selectedRequest.timePreference}</p>
                    </div>
                  </div>
                  {selectedRequest.budget && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Budget</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p>KES {selectedRequest.budget.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>

                {(selectedRequest.pickupLocation || selectedRequest.dropoffLocation) && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Locations</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      {selectedRequest.pickupLocation && (
                        <div><span className="font-medium">Pickup:</span> {selectedRequest.pickupLocation}</div>
                      )}
                      {selectedRequest.dropoffLocation && (
                        <div><span className="font-medium">Drop-off:</span> {selectedRequest.dropoffLocation}</div>
                      )}
                    </div>
                  </div>
                )}

                {selectedRequest.assignedEmployee && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Assigned Employee</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p>{selectedRequest.assignedEmployee}</p>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Timeline</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div><span className="font-medium">Created:</span> {selectedRequest.createdAt.toLocaleString()}</div>
                    <div><span className="font-medium">Last Updated:</span> {selectedRequest.updatedAt.toLocaleString()}</div>
                  </div>
                </div>

                {selectedRequest.notes && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p>{selectedRequest.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Payment Instructions</h3>
                  <p className="text-blue-800 text-sm mb-2">
                    Please make payment using our Paybill or Till number and use your Request ID ({selectedRequest.id}) as the reference.
                  </p>
                  <div className="text-blue-800 text-sm">
                    <p><strong>Paybill:</strong> 123456</p>
                    <p><strong>Account:</strong> {selectedRequest.id}</p>
                  </div>
                  {selectedRequest.paymentStatus === 'pending' && (
                    <button
                      onClick={() => handleMarkPaid(selectedRequest.id)}
                      className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 font-medium transition-colors"
                    >
                      Mark as "I Have Paid"
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequests;