import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjectInfo,updatePaymentInfo } from '../services/projectService';
import { getUsersById, getUsersByIds } from '../services/userService';
import {
  Check, Clock, AlertCircle, Calendar, User,
  ArrowLeft, FileText, ChevronRight, Globe,
  Monitor, Smartphone,
  Computer,
  Globe2, CreditCard, DollarSign,
  QrCode
} from 'lucide-react';
import DeveloperList from '../components/ui/DeveloperList';
import ProjectPercentageSelector from '../components/ui/PercentageStatus';
import { useSelector } from 'react-redux';

const UserProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [snapshots, setSnapshots] = useState(['', '', '']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [developers, setDevelopers] = useState([]);
  const [isImageLoading, setIsImageLoading] = useState(true);

 
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
const [selectedPaymentType, setSelectedPaymentType] = useState(null);
const [transactionId, setTransactionId] = useState('');
const { user } = useSelector((state) => state.user);
const [qrCode,setQrCode] = useState('')


  useEffect(() => {
    const fetchProjectAndDevelopers = async () => {
      try {
        const token = localStorage.getItem('token');
        const projectData = await getProjectInfo(projectId, token);
        setProject(projectData);
        setSnapshots(projectData.snapshots || ['', '', '']);

        // Get developer IDs and fetch their details
        let devIds = projectData?.developers || []; // could be string or array
        if (typeof devIds === 'string') devIds = [devIds];

        if (devIds.length > 0) {
          const devData = await getUsersByIds(devIds);
          setDevelopers(devData);
        }

        const QRcodeLink = await getUsersById(user.id)
        console.log(QRcodeLink.projectStatusUrl)
        setQrCode(QRcodeLink.projectStatusUrl)
        

        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch project details');
        setLoading(false);
      }
    };

    fetchProjectAndDevelopers();
  }, [projectId]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPaymentProcessing(true);
    if(selectedPaymentType == 'qrcode' && type = advance){
      updatePaymentInfo(project._id,"advance",transactionId)
    }
    
    // Simulate payment processing
    try {
      // Here you would typically call your payment API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPaymentSuccess(true);
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentSuccess(false);
        setPaymentProcessing(false);
      }, 2000);
    } catch (err) {
      setError('Payment failed. Please try again.');
      setPaymentProcessing(false);
    }
  };
  console.log("QR:", qrCode)

  const StatusBadge = ({ status }) => {
    const config = {
      'Pending': { icon: Clock, color: 'bg-amber-100 text-amber-800' },
      'In Progress': { icon: ChevronRight, color: 'bg-blue-100 text-blue-800' },
      'Completed': { icon: Check, color: 'bg-green-100 text-green-800' },
      'On Hold': { icon: AlertCircle, color: 'bg-yellow-100 text-yellow-800' },
      'Cancelled': { icon: AlertCircle, color: 'bg-red-100 text-red-800' }
    };

    const { icon: Icon, color } = config[status] || { icon: AlertCircle, color: 'bg-gray-100 text-gray-800' };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}`}>
        <Icon className="w-4 h-4 mr-2" />
        {status}
      </span>
    );
  };

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'web':
        return <Globe2 className="h-5 w-5 text-gray-400 mr-2" />;
      case 'mobile app':
        return <Smartphone className="h-5 w-5 text-gray-400 mr-2" />;
      case 'desktop app':
        return <Computer className="h-5 w-5 text-gray-400 mr-2" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Error loading project</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to projects
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto lg:mt-16 px-4 py-6 sm:px-6 lg:px-8">

      {showPaymentModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Choose Payment Method</h3>
        <button
          onClick={() => {
            setShowPaymentModal(false);
            setSelectedPaymentType(null);
            setTransactionId('');
          }}
        >
          ✕
        </button>
      </div>

      {/* Payment Method Buttons */}
      {!selectedPaymentType && (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedPaymentType('qrcode')}
            className="w-full bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
          >
            Pay via QR Code
          </button>
          <button
            onClick={() => setSelectedPaymentType('razorpay')}
            className="w-full bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
          >
            Pay via Razorpay
          </button>
        </div>
      )}

      {/* QR Code Option */}
      {selectedPaymentType === 'qrcode' && (
  <div className="mt-4 space-y-4">
    <div className="w-64 h-64 mx-auto flex items-center justify-center relative">
      {isImageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
        </div>
      )}
     <img
  src={qrCode}
  alt="QR Code"
  className={`w-64 h-auto select-none pointer-events-none mx-auto rounded-2xl ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
  onLoad={() => setIsImageLoading(false)}
  onError={() => {
    setIsImageLoading(false);
    alert("Failed to load QR Code.");
  }}
  onContextMenu={(e) => e.preventDefault()} // ⛔ Disable right-click
  draggable={false} // ⛔ Prevent drag
/>

    </div>

    <input
      type="text"
      value={transactionId}
      onChange={(e) => setTransactionId(e.target.value)}
      placeholder="Enter Transaction ID"
      className="w-full border rounded px-3 py-2"
    />

    <button
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      onClick={() => {
        if (transactionId.trim()) {
          alert(`Transaction ID submitted: ${transactionId}`);
          setShowPaymentModal(false);
          setSelectedPaymentType(null);
          setTransactionId('');
        } else {
          alert('Please enter a transaction ID.');
        }
      }}
    >
      Submit
    </button>
  </div>
)}


      {/* Razorpay Option (future work) */}
      {selectedPaymentType === 'razorpay' && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Razorpay payment integration coming soon.</p>
        </div>
      )}
    </motion.div>
  </div>
)}

        
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project?.projectTitle}</h1>
              <p className="mt-2 text-lg text-gray-600">Description: {project?.projectDescription}</p>
              <div className="flex items-center mt-2 text-gray-500">
                {getPlatformIcon(project?.platform)}
                <p>Platform: {project?.platform}</p>
              </div>
            </div>
            
            {/* Pay Advance Button */}
            <button
              onClick={() => setShowPaymentModal(true)}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Pay Advance
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg p-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Created</p>
                  <p className="mt-1 text-sm text-gray-900">{new Date(project?.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg p-4">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Project ID</p>
                  <p className="mt-1 text-sm text-gray-900">{project?._id}</p>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg p-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Assigned Developers</p>
                  <p className="mt-1 text-sm text-gray-900">{developers.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg p-4">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Project Budget</p>
                  <p className="mt-1 text-sm text-gray-900">${project?.budget || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProjectPercentageSelector />

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['Overview', 'Documents', 'Payments'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.toLowerCase() ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {activeTab === 'overview' && (
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Project Details</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <StatusBadge status={project?.projectStatus} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Repository</p>
                        {project?.projectSource ? (
                          <a href={project.projectSource} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                            <Globe className="h-4 w-4 mr-2" />
                            {project.projectSource}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-500">No repository linked</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Info</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Assigned Developers</p>
                        <DeveloperList developers={developers} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="p-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Payment History</h2>
                {project?.payments?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Method
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {project.payments.map((payment, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(payment.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ${payment.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {payment.method}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                payment.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No payments yet</h3>
                    <p className="mt-1 text-sm text-gray-500 mb-4">
                      Make your first payment to get started.
                    </p>
                    <button
                      onClick={() => setShowPaymentModal(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <DollarSign className="h-5 w-5 mr-2" />
                      Make Payment
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserProjectDetails;