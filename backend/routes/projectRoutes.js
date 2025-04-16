// routes/projectRoutes.js
const express = require('express');
const projectController = require('../controllers/projectController');
const router = express.Router();

router.get('/all', projectController.getAllProjects);
router.get('/assigned/:userId', projectController.getAssignedProjects);
router.get('/:projectId', projectController.getProjectInfo);
router.get('/allProject/:clientId', projectController.getProjectsOfUser);

// 🚀 New routes for payment updates and confirmation
router.put('/update-payment/:projectId', projectController.updatePaymentInfo);
router.put('/confirm-full-payment/:projectId', projectController.confirmFullPayment);

module.exports = router;
