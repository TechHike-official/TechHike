import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllAssistRequests, updateAssistRequest } from '../services/assistRequestService';
import { Clock, Check, AlertCircle, Edit, DollarSign, X, Eye } from 'lucide-react';

const AdminAssistance = () => {
  const [assistRequests, setAssistRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRequest, setEditingRequest] = useState(null);
  const theme = useSelector((state) => state.general.theme);

  useEffect(() => {
    const fetchAssistRequests = async () => {
      try {
        const data = await getAllAssistRequests();
        setAssistRequests(data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch assist requests');
        setLoading(false);
      }
    };

    fetchAssistRequests();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleEditClick = (request) => {
    setEditingRequest({ ...request });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingRequest(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateRequest = async () => {
    try {
      const updatedRequest = await updateAssistRequest(editingRequest._id, {
        clientName: editingRequest.clientName,
        requestStatus: editingRequest.requestStatus,
        assistStatus: editingRequest.assistStatus,
        amount: editingRequest.amount ? parseFloat(editingRequest.amount) : null,
        paymentQrCode: editingRequest.paymentQrCode || null,
        developerName: editingRequest.developerName || null,
        developerPhone: editingRequest.developerPhone || null,
        paymentStatus: editingRequest.paymentStatus,
      });
      setAssistRequests(prev =>
        prev.map(req => (req._id === updatedRequest._id ? updatedRequest : req))
      );
      setEditingRequest(null);
      setError(null);
      alert('Assist request updated successfully!');
      window.location.reload();
    } catch (err) {
      setError(err.message || 'Failed to update assist request');
    }
  };

  if (loading) return (
    <div className={`flex items-center justify-center h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent"
      />
    </div>
  );

  if (error) return (
    <div className={`flex items-center justify-center h-screen ${theme === 'dark' ? 'bg-gray-900 text-red-400' : 'bg-white text-red-500'}`}>
      {error}
    </div>
  );

  return (
    <div className={`container mx-auto p-6 w-full mt-16 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-4xl font-bold mb-8">Manage Assist Requests</h1>

      {assistRequests.length === 0 ? (
        <p className={`text-center text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          No assist requests found.
        </p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <th className={`py-4 px-6 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Project Name</th>
                  <th className={`py-4 px-6 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Client Name</th>
                  <th className={`py-4 px-6 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Requested Date</th>
                  <th className={`py-4 px-6 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Request Status</th>
                  <th className={`py-4 px-6 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Assist Status</th>
                  <th className={`py-4 px-6 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Payment Status</th>
                  <th className={`py-4 px-6 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Amount</th>
                  <th className={`py-4 px-6 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Developer</th>
                  <th className={`py-4 px-6 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assistRequests.map(request => (
                  <motion.tr
                    key={request._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`border-b ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                  >
                    <td className="py-4 px-6">{request.projectName}</td>
                    <td className="py-4 px-6">{request.clientName || request.userId?.name || 'Unknown'}</td>
                    <td className="py-4 px-6">{formatDate(request.createdAt)}</td>
                    <td className="py-4 px-6">
                      {request.requestStatus === 'Pending' || request.requestStatus === 'Reviewing' ? (
                        <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-500'}`}>
                          <Clock size={16} /> {request.requestStatus}
                        </span>
                      ) : request.requestStatus === 'Approved' ? (
                        <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`}>
                          <Check size={16} /> Approved
                        </span>
                      ) : (
                        <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>
                          <AlertCircle size={16} /> Declined
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">{request.assistStatus}</td>
                    <td className="py-4 px-6">
                      {request.transactionId ? (
                        <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`}>
                          <Eye size={16} /> Client Done Payment ({request.paymentType})
                        </span>
                      ) : request.paymentStatus === 'Paid' ? (
                        <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`}>
                          <DollarSign size={16} /> Paid
                        </span>
                      ) : (
                        <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-500'}`}>
                          <Clock size={16} /> Pending
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">{request.amount ? `₹${request.amount}` : 'N/A'}</td>
                    <td className="py-4 px-6">
                      {request.developerName ? `${request.developerName} (${request.developerPhone || 'N/A'})` : 'N/A'}
                    </td>
                    <td className="py-4 px-6">
                      {!(request.paymentStatus === 'Paid' && request.assistStatus === 'Completed') && (
                        <button
                          onClick={() => handleEditClick(request)}
                          className={`flex items-center gap-1 px-4 py-2 rounded-md transition-all duration-200 ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                        >
                          <Edit size={16} /> Edit
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingRequest && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 bg-blue-600 dark:bg-blue-700 text-white flex justify-between items-center">
                <h2 className="text-xl font-medium">Update Assist Request</h2>
                <button
                  onClick={() => setEditingRequest(null)}
                  className="p-1.5 rounded-full hover:bg-blue-500/50 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Status Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                        Request Status
                      </label>
                      <select
                        name="requestStatus"
                        value={editingRequest.requestStatus}
                        onChange={handleInputChange}
                        className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Approved">Approved</option>
                        <option value="Declined">Declined</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                        Assist Status
                      </label>
                      <select
                        name="assistStatus"
                        value={editingRequest.assistStatus}
                        onChange={handleInputChange}
                        className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                        Payment Status
                      </label>
                      <select
                        name="paymentStatus"
                        value={editingRequest.paymentStatus}
                        onChange={handleInputChange}
                        className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </div>
                  </div>

                  {/* Developer & Payment Fields */}
                  <div className="space-y-4">
                    {/* Show Amount field only if requestStatus is Approved */}
                    {editingRequest.requestStatus === 'Approved' && (
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                          Amount (₹)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                          <input
                            type="number"
                            name="amount"
                            value={editingRequest.amount || ''}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            className="w-full p-2.5 pl-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                        QR Code URL
                      </label>
                      <input
                        type="url"
                        name="paymentQrCode"
                        value={editingRequest.paymentQrCode || ''}
                        onChange={handleInputChange}
                        placeholder="https://example.com/qr-code"
                        className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                        Developer Name
                      </label>
                      <input
                        type="text"
                        name="developerName"
                        value={editingRequest.developerName || ''}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                      Developer Phone
                    </label>
                    <input
                      type="text"
                      name="developerPhone"
                      value={editingRequest.developerPhone || ''}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      name="transactionId"
                      value={editingRequest.transactionId || ''} 
                      onChange={handleInputChange}
                      placeholder="Enter transaction ID"
                      className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled 
                    />
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                    {error}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setEditingRequest(null)}
                  className="px-4 py-2 rounded-lg transition-all text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateRequest}
                  className="px-4 py-2 rounded-lg transition-all text-sm font-medium bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
                >
                  Update Request
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminAssistance;