import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjectInfo, updatePaymentInfo } from "../services/projectService";
import { getUsersById, getUsersByIds } from "../services/userService";
import {
  Check,
  Clock,
  AlertCircle,
  Calendar,
  User,
  ArrowLeft,
  FileText,
  ChevronRight,
  Globe,
  Monitor,
  Smartphone,
  Computer,
  Globe2,
  CreditCard,
  DollarSign,
  QrCode,
  IndianRupeeIcon,
  IndianRupee,
} from "lucide-react";
import DeveloperList from "../components/ui/DeveloperList";
import ProjectPercentageSelector from "../components/ui/PercentageStatus";
import { useSelector } from "react-redux";

const UserProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [snapshots, setSnapshots] = useState(["", "", ""]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [developers, setDevelopers] = useState([]);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const [advanceAmount, setAdvanceAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const { user } = useSelector((state) => state.user);
  const [qrCode, setQrCode] = useState("");
  const [paymentFor,setPaymentFor]=useState('')

  useEffect(() => {
    const fetchProjectAndDevelopers = async () => {
      try {
        const token = localStorage.getItem("token");
        const projectData = await getProjectInfo(projectId, token);
        setProject(projectData);
        setSnapshots(projectData.snapshots || ["", "", ""]);

        // Get developer IDs and fetch their details
        let devIds = projectData?.developers || [];
        if (typeof devIds === "string") devIds = [devIds];

        if (devIds.length > 0) {
          const devData = await getUsersByIds(devIds);
          setDevelopers(devData);
        }

        const QRcodeLink = await getUsersById(user.id);
        setQrCode(QRcodeLink.projectStatusUrl);

        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch project details");
        setLoading(false);
      }
    };

    fetchProjectAndDevelopers();
  }, [projectId, user.id]);
  console.log("PaymentFor:", paymentFor)

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPaymentProcessing(true);

    try {
      if (selectedPaymentType === "qrcode" && transactionId) {
        // Update payment info in the backend
        const updatedProject = await updatePaymentInfo(
          project._id,
          paymentFor,
          transactionId,
          advanceAmount
        );

        const NewProjectData = await getProjectInfo(project._id);
        setProject(NewProjectData);

        setPaymentSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        throw new Error("Please enter transaction ID");
      }
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
      setPaymentProcessing(false);
    }
  };



  const StatusBadge = ({ status }) => {
    const config = {
      Pending: { icon: Clock, color: "bg-amber-100 text-amber-800" },
      "In Progress": { icon: ChevronRight, color: "bg-blue-100 text-blue-800" },
      Completed: { icon: Check, color: "bg-green-100 text-green-800" },
      "On Hold": { icon: AlertCircle, color: "bg-yellow-100 text-yellow-800" },
      Cancelled: { icon: AlertCircle, color: "bg-red-100 text-red-800" },
    };

    const { icon: Icon, color } = config[status] || {
      icon: AlertCircle,
      color: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}`}
      >
        <Icon className="w-4 h-4 mr-2" />
        {status}
      </span>
    );
  };

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "web":
        return <Globe2 className="h-5 w-5 text-gray-400 mr-2" />;
      case "mobile app":
        return <Smartphone className="h-5 w-5 text-gray-400 mr-2" />;
      case "desktop app":
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
              <h3 className="text-sm font-medium text-red-800">
                Error loading project
              </h3>
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
   

      {project.payment.advancePaid
  ? showPaymentModal && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
        >
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-bold text-gray-800">
              Settle Remaining Payment
            </h3>
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setSelectedPaymentType(null);
                setTransactionId("");
              }}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <span className="text-gray-500 text-xl">✕</span>
            </button>
          </div>
      
          {paymentSuccess ? (
            <div className="text-center py-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Payment Successful!
              </h3>
              <p className="text-gray-600">
                Your remaining payment has been recorded.
              </p>
            </div>
          ) : (
            <>
              {/* Payment Method Selection */}
              {!selectedPaymentType && (
                <div className="space-y-5">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remaining Amount
                    </label>
                    <div className="flex items-center">
                      <IndianRupee className="h-6 w-6 text-gray-500 mr-2" />
                      <span className="text-3xl font-bold text-gray-900">
                        {(project.price / 2).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      This is the remaining 50% of the total project cost to complete the work.
                    </p>
                  </div>
      
                  <h4 className="font-medium text-gray-800">Select Payment Method</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => setSelectedPaymentType("qrcode")}
                      className="w-full flex items-center justify-between bg-white border border-gray-200 hover:bg-gray-50 px-4 py-3 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded mr-3">
                          <QrCode className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-medium">Pay via QR Code</span>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>
                    <button
                      onClick={() => setSelectedPaymentType("razorpay")}
                      className="w-full flex items-center justify-between bg-white border border-gray-200 hover:bg-gray-50 px-4 py-3 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded mr-3">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-medium">Pay via Razorpay</span>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>
                  </div>
                </div>
              )}
      
              {/* QR Code Payment */}
              {selectedPaymentType === "qrcode" && (
                <div className="space-y-5">
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center">
                    <div className="w-64 h-64 relative flex items-center justify-center">
                      {isImageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
                        </div>
                      )}
                      <img
                        src={qrCode}
                        alt="QR Code"
                        className={`w-64 h-auto select-none pointer-events-none mx-auto rounded-xl ${
                          isImageLoading ? "opacity-0" : "opacity-100"
                        }`}
                        onLoad={() => setIsImageLoading(false)}
                        onError={() => {
                          setIsImageLoading(false);
                          setError("Failed to load QR Code.");
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                        draggable={false}
                      />
                    </div>
                  </div>
      
                  <div>
                    <label
                      htmlFor="transactionId"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      id="transactionId"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="Enter Transaction ID"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 text-black focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
      
                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={() => {
                        setSelectedPaymentType(null);
                        setTransactionId("");
                      }}
                      className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-medium"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePaymentSubmit}
                      disabled={!transactionId || paymentProcessing}
                      className={`w-2/3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium ${
                        !transactionId || paymentProcessing
                          ? "opacity-70 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {paymentProcessing
                        ? "Processing..."
                        : "Complete Payment"}
                    </button>
                  </div>
                </div>
              )}
      
              {/* Razorpay Notice */}
              {selectedPaymentType === "razorpay" && (
                <div className="space-y-5">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Razorpay integration is coming soon. Please use
                          QR code payment for now.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPaymentType(null)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-medium"
                  >
                    Back to Payment Options
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    )
  : showPaymentModal && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
        >
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-bold text-gray-800">
              Make Advance Payment
            </h3>
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setSelectedPaymentType(null);
                setTransactionId("");
                setAdvanceAmount("");
              }}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <span className="text-gray-500 text-xl">✕</span>
            </button>
          </div>

          {paymentSuccess ? (
            <div className="text-center py-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Payment Successful!
              </h3>
              <p className="text-gray-600">
                Your advance payment has been recorded.
              </p>
            </div>
          ) : (
            <>
              {/* Payment Method Selection */}
              {!selectedPaymentType && (
                <div className="space-y-5">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Advance Amount
                    </label>
                    <div className="flex items-center">
                      <IndianRupee className="h-6 w-6 text-gray-500 mr-2" />
                      <span className="text-3xl font-bold text-gray-900">
                        ₹{(project.price / 2).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      This is 50% of the total project cost to begin the
                      work.
                    </p>
                  </div>

                  <h4 className="font-medium text-gray-800">Select Payment Method</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => setSelectedPaymentType("qrcode")}
                      className="w-full flex items-center justify-between bg-white border border-gray-200 hover:bg-gray-50 px-4 py-3 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded mr-3">
                          <QrCode className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-medium">Pay via QR Code</span>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>
                    <button
                      onClick={() => setSelectedPaymentType("razorpay")}
                      className="w-full flex items-center justify-between bg-white border border-gray-200 hover:bg-gray-50 px-4 py-3 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded mr-3">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-medium">Pay via Razorpay</span>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* QR Code Payment */}
              {selectedPaymentType === "qrcode" && (
                <div className="space-y-5">
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center">
                    <div className="w-64 h-64 relative flex items-center justify-center">
                      {isImageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
                        </div>
                      )}
                      <img
                        src={qrCode}
                        alt="QR Code"
                        className={`w-64 h-auto select-none pointer-events-none mx-auto rounded-xl ${
                          isImageLoading ? "opacity-0" : "opacity-100"
                        }`}
                        onLoad={() => setIsImageLoading(false)}
                        onError={() => {
                          setIsImageLoading(false);
                          setError("Failed to load QR Code.");
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                        draggable={false}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="transactionId"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      id="transactionId"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="Enter Transaction ID"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={() => {
                        setSelectedPaymentType(null);
                        setTransactionId("");
                      }}
                      className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-medium"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePaymentSubmit}
                      disabled={!transactionId || paymentProcessing}
                      className={`w-2/3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium ${
                        !transactionId || paymentProcessing
                          ? "opacity-70 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {paymentProcessing
                        ? "Processing..."
                        : "Submit Payment"}
                    </button>
                  </div>
                </div>
              )}

              {/* Razorpay Notice */}
              {selectedPaymentType === "razorpay" && (
                <div className="space-y-5">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Razorpay integration is coming soon. Please
                          use QR code payment for now.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPaymentType(null)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-medium"
                  >
                    Back to Payment Options
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    )}

      
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {project?.projectTitle}
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Description: {project?.projectDescription}
              </p>
              <div className="flex items-center mt-2 text-gray-500">
                {getPlatformIcon(project?.platform)}
                <p>Platform: {project?.platform}</p>
              </div>
            </div>

            {!(project.payment?.advancePaid && project.payment?.remainingPaid) && (
  !project.payment?.advancePaid ? (
    <button
      onClick={() => {
        setShowPaymentModal(true);
        setPaymentFor('advance');
      }}
      className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      <CreditCard className="h-5 w-5 mr-2" />
      Pay Advance
    </button>
  ) : (
    <button
      onClick={() => {
        setShowPaymentModal(true);
        setPaymentFor('remaining');
      }}
      className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      <CreditCard className="h-5 w-5 mr-2" />
      Settle Payment
    </button>
  )
)}

          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg p-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Created</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(project?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg p-4">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Project ID
                  </p>
                  <p className="mt-1 text-sm text-gray-900">{project?._id}</p>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg p-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Assigned Developers
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {developers.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg p-4">
              <div className="flex items-center">
                <IndianRupeeIcon className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Project Budget
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    ₹{project?.price || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProjectPercentageSelector />

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {["Overview", "Documents", "Payments"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.toLowerCase()
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {activeTab === "overview" && (
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Project Details
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Status
                        </p>
                        <StatusBadge status={project?.projectStatus} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Repository
                        </p>
                        {project?.projectSource ? (
                          <a
                            href={project.projectSource}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <Globe className="h-4 w-4 mr-2" />
                            {project.projectSource}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-500">
                            No repository linked
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Contact Info
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Assigned Developers
                        </p>
                        <DeveloperList developers={developers} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
{activeTab === "payments" && (
  project?.payment ? (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 text-sm text-gray-500">Advance</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">
              {project.payment.advancePaid ? "Paid" : "Unpaid"}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {project.payment.advanceTransactionId || "-"}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {project.payment.advancePaidDate
                ? new Date(project.payment.advancePaidDate).toLocaleDateString()
                : "-"}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-sm text-gray-500">Remaining</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">
              {project.payment.remainingPaid ? "Paid" : "Unpaid"}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {project.payment.remainingTransactionId || "-"}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {project.payment.remainingPaidDate
                ? new Date(project.payment.remainingPaidDate).toLocaleDateString()
                : "-"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    <div>No payments yet</div>
  )
)}


        </div>
      </main>
    </div>
  );
};

export default UserProjectDetails;
