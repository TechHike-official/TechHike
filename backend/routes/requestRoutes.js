// routes/requestRoutes.js
const express = require('express');
const requestController = require('../controllers/requestController');
const router = express.Router();

// Submit a new project request
router.post('/', requestController.submitProjectRequest);

// Get all project requests for a specific client
router.get('/:clientId', requestController.getClientProjectRequests);

// Get all project requests for the admin panel
router.get('/requests/admin', requestController.getAllProjectRequests);

// Approve a project request
router.put('/:requestId/approve', requestController.approveProjectRequest);
router.get('/user/:userId', requestController.getUserRequests);

module.exports = router;