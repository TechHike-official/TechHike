const AssistRequest = require('../models/AssistRequest');

// Create an assist request (User)
const createAssistRequest = async (req, res) => {
  const {userId, projectName, projectType, projectTechnologies } = req.body;
  

  try {
  
    if (!projectName || !projectType) {
      return res.status(400).json({ message: 'Project name and type are required' });
    }

    const assistRequest = new AssistRequest({
      userId,
      projectName,
      projectType,
      projectTechnologies: Array.isArray(projectTechnologies) ? projectTechnologies : [],
    });

    const savedRequest = await assistRequest.save();
    res.status(201).json({
      message: 'Assist request created successfully',
      assistRequest: savedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get assist requests by user (User)
const getUserAssistRequests = async (req, res) => {
    const{userId}=req.params
  try {
    const assistRequests = await AssistRequest.find({userId})
      .sort({ createdAt: -1 });
    res.status(200).json(assistRequests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all assist requests (Admin)
// Get all assist requests (Admin)
const getAllAssistRequests = async (req, res) => {
    try {
      const assistRequests = await AssistRequest.find()
        .populate('userId', 'name') // Populate only the 'name' field for client name
        .sort({ createdAt: -1 }); // Sort by newest first
  
      // Transform the response to explicitly include clientName (optional)
      const response = assistRequests.map(request => ({
        ...request._doc, // Spread the request document
        clientName: request.userId ? request.userId.name : 'Unknown', // Explicitly set clientName
      }));
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

// Update assist request (Admin)
const updateAssistRequest = async (req, res) => {
    const { id } = req.params;
    const { requestStatus, assistStatus, amount, paymentQrCode, developerName, developerPhone, paymentStatus } = req.body;
  
    try {
      const validRequestStatuses = ['Pending', 'Reviewing', 'Approved', 'Declined'];
      const validAssistStatuses = ['Pending', 'In Progress', 'Completed'];
      const validPaymentStatuses = ['Pending', 'Paid'];
  
      if (requestStatus && !validRequestStatuses.includes(requestStatus)) {
        return res.status(400).json({ message: 'Invalid request status' });
      }
      if (assistStatus && !validAssistStatuses.includes(assistStatus)) {
        return res.status(400).json({ message: 'Invalid assist status' });
      }
      if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
        return res.status(400).json({ message: 'Invalid payment status' });
      }
      if (amount !== undefined && (isNaN(amount) || amount < 0)) {
        return res.status(400).json({ message: 'Amount must be a positive number' });
      }
      if (paymentQrCode && !isValidUrl(paymentQrCode)) {
        return res.status(400).json({ message: 'Invalid QR code URL' });
      }
      if (developerPhone && !/^\d{10}$/.test(developerPhone)) {
        return res.status(400).json({ message: 'Invalid phone number (must be 10 digits)' });
      }
      if (developerName && typeof developerName !== 'string') {
        return res.status(400).json({ message: 'Developer name must be a string' });
      }
  
      const assistRequest = await AssistRequest.findById(id);
      if (!assistRequest) {
        return res.status(404).json({ message: 'Assist request not found' });
      }
  
      if (requestStatus) assistRequest.requestStatus = requestStatus;
      if (assistStatus) assistRequest.assistStatus = assistStatus;
      if (amount !== undefined) assistRequest.amount = amount;
      if (paymentQrCode) assistRequest.paymentQrCode = paymentQrCode;
      if (developerName) assistRequest.developerName = developerName;
      if (developerPhone) assistRequest.developerPhone = developerPhone;
      if (paymentStatus) assistRequest.paymentStatus = paymentStatus; // Allow manual update
  
      const updatedRequest = await assistRequest.save();
      res.status(200).json({
        message: 'Assist request updated successfully',
        assistRequest: updatedRequest,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

// Pay for an assist request (User)
const payAssistRequest = async (req, res) => {
    console.log("PAYMENTTT")
  const { id } = req.params;
  const { paymentType, transactionId } = req.body;
  console.log("IDD:", id)

  try {
    if (!['Google Pay', 'Razorpay'].includes(paymentType)) {
      return res.status(400).json({ message: 'Invalid payment type. Use "Google Pay" or "Razorpay"' });
    }
    if (!transactionId || typeof transactionId !== 'string') {
      return res.status(400).json({ message: 'Valid transaction ID is required' });
    }

    const assistRequest = await AssistRequest.findById(id);
    if (!assistRequest) {
      return res.status(404).json({ message: 'Assist request not found' });
    }
    
    if (assistRequest.requestStatus !== 'Approved') {
      return res.status(400).json({ message: 'Payment can only be made for approved requests' });
    }
    if (assistRequest.transactionId) {
      return res.status(400).json({ message: 'Payment already completed' });
    }

    assistRequest.paymentType = paymentType;
    assistRequest.transactionId = transactionId;
    const updatedRequest = await assistRequest.save();

    res.status(200).json({
      message: 'Payment recorded successfully',
      assistRequest: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Submit feedback and rating (User)
const submitFeedback = async (req, res) => {
  const { id } = req.params;
  const { feedback, rating } = req.body;

  try {
    if (feedback && typeof feedback !== 'string') {
      return res.status(400).json({ message: 'Feedback must be a string' });
    }
    if (rating && (isNaN(rating) || rating < 1 || rating > 5)) {
      return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
    }

    const assistRequest = await AssistRequest.findById(id);
    if (!assistRequest) {
      return res.status(404).json({ message: 'Assist request not found' });
    }
    if (assistRequest.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to submit feedback for this request' });
    }
    if (assistRequest.assistStatus !== 'Completed') {
      return res.status(400).json({ message: 'Feedback can only be submitted for completed assists' });
    }

    if (feedback) assistRequest.feedback = feedback;
    if (rating) assistRequest.rating = rating;

    const updatedRequest = await assistRequest.save();
    res.status(200).json({
      message: 'Feedback submitted successfully',
      assistRequest: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Helper function to validate URL (simplified)
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

module.exports = {
  createAssistRequest,
  getUserAssistRequests,
  getAllAssistRequests,
  updateAssistRequest,
  payAssistRequest,
  submitFeedback,
};