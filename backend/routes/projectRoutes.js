// routes/projectRoutes.js
const express = require('express');
const projectController = require('../controllers/projectController');
const router = express.Router();

router.get('/all', projectController.getAllProjects);
router.get('/assigned/:userId', projectController.getAssignedProjects);
router.get('/:projectId', projectController.getProjectInfo)


module.exports = router;