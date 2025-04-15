import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllRequests, approveRequest } from '../services/requestService';
import { getAllAdmins } from '../services/adminService';
import { Check, X, Clock, Search, UserPlus, DollarSign, Calendar, Eye } from 'lucide-react';

const RequestManagement = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const [requestsData, adminsData] = await Promise.all([
          getAllRequests(token),
          getAllAdmins(token)
        ]);

        setRequests(requestsData || []);
        setFilteredRequests(requestsData || []);
        setAdmins(adminsData || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = requests.filter(request =>
      (request.projectTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.clientId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.clientName || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRequests(filtered);
  }, [searchTerm, requests]);

  const handleApproveClick = (request) => {
    setSelectedRequest(request);
    setSelectedAdmins([]);
    setPrice(request.price || '');
  };

  const handleAdminSelect = (adminId) => {
    setSelectedAdmins(prev =>
      prev.includes(adminId) ? prev.filter(id => id !== adminId) : [...prev, adminId]
    );
  };

  const handleApproveSubmit = async () => {
    if (!selectedAdmins.length) {
      alert('Please select at least one admin.');
      return;
    }

    if (!price || isNaN(price)) {
      alert('Please enter a valid price.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await approveRequest(selectedRequest._id, selectedAdmins, price, selectedRequest.clientName, token);
      setRequests(prev => prev.map(req =>
        req._id === selectedRequest._id ? { 
          ...req, 
          requestStatus: 'approved',
          price: Number(price),
          approvedDate: new Date().toISOString()
        } : req
      ));
      setSelectedRequest(null);
    } catch (err) {
      setError(err.message || 'Failed to approve request');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleViewProgress = (projectId) => {
    navigate(`/dashboard/projects/${projectId}`);
  };

  if (loading) return <div className="flex items-center justify-center h-screen text-black">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-5 w-full mt-16 text-black">
      <h1 className="flex items-center gap-2 mb-5 text-2xl">
        <Search className="icon w-5 h-5" />
        Request Management
      </h1>

      <div className="relative mb-5 max-w-xs">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search requests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-black"
        />
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left">Client</th>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Requested Date</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map(request => (
            <tr key={request._id} className="hover:bg-gray-50">
              <td className="py-3 px-4">
                <div>
                  <div className="font-medium text-red-800">{request.clientName}</div>
                  {/* <div className="text-xs text-gray-500">ID: {request.clientId.slice(-6)}</div> */}
                </div>
              </td>
              <td className="py-3 px-4">{request.projectTitle}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-gray-500" />
                  {formatDate(request.createdAt)}
                </div>
              </td>
              <td className="py-3 px-4">
                {request.requestStatus === 'Pending' ? (
                  <span className="flex items-center gap-1 text-orange-500">
                    <Clock size={14} /> Pending
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-green-500">
                    <Check size={14} /> Approved
                  </span>
                )}
              </td>
              <td className="py-3 px-4">
                {request.requestStatus === 'Pending' ? (
                  <button
                    onClick={() => handleApproveClick(request)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md"
                  >
                    <UserPlus size={14} /> Assign
                  </button>
                ) : (
                  <button
                    onClick={() => handleViewProgress(request.projectStatusUrl)}
                    className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:text-blue-800"
                  >
                    <Eye size={14} /> View Progress
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-full max-w-md max-h-screen overflow-auto text-black">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Assign Team</h2>
              <button onClick={() => setSelectedRequest(null)}>
                <X size={18} />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="font-medium">{selectedRequest.projectTitle}</p>
              <p className="text-sm">Client: {selectedRequest.clientName}</p>
              <p className="text-xs text-gray-500">ID: {selectedRequest.clientId.slice(-6)}</p>
              <p className="text-sm mt-1">
                <Calendar size={14} className="inline mr-1" />
                Requested: {formatDate(selectedRequest.createdAt)}
              </p>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Project Price ($)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign size={16} className="text-gray-400" />
                </div>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="pl-10 w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter project price"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <h3 className="mt-4 mb-2">Select Team Members:</h3>
            <div className="max-h-80 overflow-y-auto mb-4">
              {admins.map(admin => (
                <div key={admin._id} className="flex items-center gap-2 py-2">
                  <input
                    type="checkbox"
                    checked={selectedAdmins.includes(admin._id)}
                    onChange={() => handleAdminSelect(admin._id)}
                    className="form-checkbox rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label>{admin.name}</label>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveSubmit}
                disabled={!selectedAdmins.length || !price}
                className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                <Check size={14} /> Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredRequests.length === 0 && (
        <div className="flex flex-col items-center py-10 text-gray-500">
          <Search size={24} />
          <p>{searchTerm ? 'No matching requests' : 'No requests found'}</p>
        </div>
      )}
    </div>
  );
};

export default RequestManagement;