const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to list all roles for client-mentioned accounts
router.get('/all', userController.listClientMentionedRoles);
router.post('/by-ids', userController.getUsersByIds);
router.get('/:id', userController.getUserById)

module.exports = router;