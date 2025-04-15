// routes/adminRoutes.js
const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, adminController.getAllAdmins);
router.get('/:adminId', auth, adminController.getAdminById);

module.exports = router;