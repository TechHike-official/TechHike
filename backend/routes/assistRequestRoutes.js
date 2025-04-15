const express = require('express');
const router = express.Router();
const { 
  createAssistRequest, 
  getUserAssistRequests, 
  getAllAssistRequests, 
  updateAssistRequest, 
  payAssistRequest,
  submitFeedback 
} = require('../controllers/assistRequestController');

// User routes
router.post('/',  createAssistRequest); // Create assist request
router.get('/user/:userId',  getUserAssistRequests); // Get user's assist requests
router.post('/pay/:id',  payAssistRequest); // Pay for approved request
router.put('/:id/feedback',  submitFeedback); // Submit feedback and rating

// Admin routes
router.get('/',   getAllAssistRequests); // Get all assist requests
router.put('/:id',   updateAssistRequest); // Update status, amount, QR code

module.exports = router;